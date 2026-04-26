export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Shipping Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Processing Time</h2>
            <p className="text-gray-300">
              All orders are processed within 1-2 business days (excluding weekends and holidays). 
              You'll receive a tracking number via email once your order ships.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Shipping Methods</h2>
            <div className="text-gray-300 space-y-3">
              <div>
                <p className="font-semibold text-white">Standard Shipping (5-7 business days)</p>
                <p>Continental US only. Free shipping on orders over $100.</p>
              </div>
              <div>
                <p className="font-semibold text-white">Express Shipping (2-3 business days)</p>
                <p>Available for additional charge. Tracking included.</p>
              </div>
              <div>
                <p className="font-semibold text-white">International Shipping</p>
                <p>Available to select countries. Duties and taxes are customer's responsibility.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Shipping Costs</h2>
            <p className="text-gray-300">
              Shipping costs are calculated at checkout based on destination and weight. 
              Free shipping applies to orders over $100 within the continental US.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Tracking</h2>
            <p className="text-gray-300">
              Once your order ships, you'll receive a tracking number. Track your package through the carrier's website. 
              You can also view tracking information in your account order details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Delivery Address</h2>
            <p className="text-gray-300">
              Please ensure your shipping address is correct before checkout. We cannot redirect packages after they're shipped.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Lost or Damaged Packages</h2>
            <p className="text-gray-300">
              If your package arrives damaged or doesn't arrive within the expected timeframe, 
              contact support@hyena-society.com with tracking information and photos. We'll file a claim or send a replacement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
