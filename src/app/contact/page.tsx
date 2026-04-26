'use client';

import { useState } from 'react';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      // In a real app, this would send to a backend endpoint
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 mb-12">
          Have questions? We'd love to hear from you. Get in touch with our team.
        </p>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-6">
            <Mail className="w-8 h-8 text-[#c8f000] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Email</h3>
            <a href="mailto:support@hyena-society.com" className="text-[#c8f000] hover:underline">
              support@hyena-society.com
            </a>
            <p className="text-gray-400 text-sm mt-2">Response within 24 hours</p>
          </div>

          <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-2">Support Hours</h3>
            <p className="text-gray-300">Monday - Friday: 9am - 5pm EST</p>
            <p className="text-gray-300">Saturday - Sunday: Limited support</p>
            <p className="text-gray-400 text-sm mt-2">We'll respond to weekend emails Monday</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

          {formState === 'success' && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-200 font-semibold">Message sent!</p>
                <p className="text-green-200/70 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          {formState === 'error' && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-200 font-semibold">Error sending message</p>
                <p className="text-red-200/70 text-sm">Please email us directly at support@hyena-society.com</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#c8f000]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#c8f000]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#c8f000]"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#c8f000] resize-none"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full px-6 py-3 bg-[#c8f000] text-black font-semibold rounded-lg hover:bg-[#b8df00] transition disabled:opacity-50"
            >
              {formState === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping takes 5-7 business days. Express shipping available for 2-3 business days.',
              },
              {
                q: 'What is your return policy?',
                a: 'We offer 30-day returns for unworn, unwashed items in original packaging. See our returns policy for details.',
              },
              {
                q: 'Do you offer international shipping?',
                a: 'Yes! We ship to select countries. International customers are responsible for duties and taxes.',
              },
              {
                q: 'Can I modify my order?',
                a: 'Contact us immediately after placing your order. We can often modify orders within 1 hour of purchase.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-900/40 border border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
