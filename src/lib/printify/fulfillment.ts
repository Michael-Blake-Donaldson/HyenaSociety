import { prisma } from "@/lib/db/prisma";
import { createPrintifyOrder } from "@/lib/printify/client";

export async function sendOrderToPrintify(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found for Printify submission");
  }

  if (order.printifyOrderId) {
    return order.printifyOrderId;
  }

  const lineItems = order.items
    .map((item) => {
      const matchedVariant = item.product.variants.find((variant) => variant.size === item.size && variant.isEnabled);
      const printifyVariantId = matchedVariant?.printifyVariantId
        ? Number(matchedVariant.printifyVariantId)
        : null;

      if (!printifyVariantId) {
        return null;
      }

      return {
        variant_id: printifyVariantId,
        quantity: item.quantity,
      };
    })
    .filter((entry): entry is { variant_id: number; quantity: number } => Boolean(entry));

  if (lineItems.length === 0) {
    throw new Error("Order has no Printify-ready variants");
  }

  const printifyOrder = await createPrintifyOrder({
    external_id: order.id,
    line_items: lineItems,
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: {
      name: order.shippingName,
      email: order.shippingEmail,
      phone: order.shippingPhone ?? undefined,
      country: order.shippingCountry,
      region: order.shippingState,
      city: order.shippingCity,
      address1: order.shippingLine1,
      address2: order.shippingLine2 ?? undefined,
      zip: order.shippingPostalCode,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      printifyOrderId: printifyOrder.id,
    },
  });

  return printifyOrder.id;
}
