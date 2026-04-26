export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300">
              By accessing and using Hyena Society, you agree to be bound by these terms. 
              If you disagree with any part, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p className="text-gray-300">
              Permission is granted to temporarily download one copy of materials for personal, non-commercial viewing. 
              You may not reproduce, distribute, or transmit content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Product Information</h2>
            <p className="text-gray-300">
              We strive for accuracy in product descriptions and pricing. However, we do not warrant that descriptions 
              or pricing are entirely accurate, complete, or error-free. We reserve the right to refuse or cancel orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-300">
              In no event shall Hyena Society be liable for any damages (including, without limitation, indirect, 
              incidental, special, consequential, or punitive damages) arising from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Modifications</h2>
            <p className="text-gray-300">
              We may modify these terms at any time. Continued use following modifications constitutes acceptance. 
              Check this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
            <p className="text-gray-300">
              These terms are governed by applicable laws. Any disputes shall be resolved in the appropriate jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
