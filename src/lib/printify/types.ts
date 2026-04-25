export type PrintifyVariant = {
  id: number;
  title: string;
  sku: string | null;
  price: number;
  is_enabled: boolean;
  options: Record<string, string>;
};

export type PrintifyProduct = {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  images: Array<{ src: string }>;
  variants: PrintifyVariant[];
};

export type PrintifyOrderRecipient = {
  name: string;
  email: string;
  phone?: string;
  country: string;
  region: string;
  city: string;
  address1: string;
  address2?: string;
  zip: string;
};

export type PrintifyOrderLine = {
  variant_id: number;
  quantity: number;
};

export type PrintifyOrderPayload = {
  external_id: string;
  line_items: PrintifyOrderLine[];
  shipping_method: number;
  send_shipping_notification: boolean;
  address_to: PrintifyOrderRecipient;
};
