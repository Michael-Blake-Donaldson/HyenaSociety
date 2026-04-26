export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Refund & Returns Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">30-Day Returns</h2>
            <p className="text-gray-300">
              We offer a 30-day return window from the date of purchase. Items must be unworn, unwashed, 
              with tags intact, and in original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Return Process</h2>
            <ol className="text-gray-300 space-y-2 ml-6 list-decimal">
              <li>Contact support@hyena-society.com with your order number</li>
              <li>Receive return shipping label via email</li>
              <li>Ship item back to us (prepaid)</li>
              <li>Upon receipt and inspection, refund is issued within 5-7 business days</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Non-Returnable Items</h2>
            <ul className="text-gray-300 space-y-2 ml-6 list-disc">
              <li>Final sale items (marked at checkout)</li>
              <li>Items with visible wear or damage</li>
              <li>Custom or personalized items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Defective Items</h2>
            <p className="text-gray-300">
              For defective items, we offer free replacements or full refunds regardless of condition. 
              Contact support within 7 days of receipt with photos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Refund Method</h2>
            <p className="text-gray-300">
              Refunds are issued to the original payment method. Card refunds may take 3-5 business days 
              to appear depending on your bank.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
            <p className="text-gray-300">
              Contact our support team at support@hyena-society.com for return or refund inquiries.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
