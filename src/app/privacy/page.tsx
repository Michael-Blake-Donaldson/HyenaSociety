export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300">
              We collect information you provide directly, including name, email, shipping address, and payment information. 
              We also automatically collect usage data through cookies and analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <ul className="text-gray-300 space-y-2 ml-6 list-disc">
              <li>Process and fulfill your orders</li>
              <li>Send transactional emails (order confirmation, tracking)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p className="text-gray-300">
              We implement industry-standard security measures including HTTPS encryption, secure password hashing, 
              and HTTP-only cookies to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
            <p className="text-gray-300">
              You have the right to access, modify, or delete your personal information. Contact us to exercise these rights.
              You can delete your account anytime from your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p className="text-gray-300">
              For privacy concerns, email us at support@hyena-society.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
