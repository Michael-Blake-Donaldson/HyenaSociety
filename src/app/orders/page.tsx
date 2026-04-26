'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  shippingEmail: string;
  items: OrderItem[];
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#c8f000]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Order History</h1>

        {error ? (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-200">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
            <Link
              href="/collection"
              className="inline-block px-6 py-2 bg-[#c8f000] text-black font-semibold rounded-lg hover:bg-[#b8df00] transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-900/40 border border-gray-700 rounded-lg p-6">
                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-700">
                  <div>
                    <p className="text-gray-400 text-sm">Order ID</p>
                    <p className="text-white font-mono">{order.id.slice(0, 12)}...</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">
                      {format(new Date(order.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className={`font-semibold ${
                      order.status === 'PAID' ? 'text-[#c8f000]' :
                      order.status === 'PENDING' ? 'text-yellow-500' :
                      order.status === 'SHIPPED' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-[#c8f000] text-xl font-bold">
                      ${(order.total / 100).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  <p className="text-gray-400 text-sm font-semibold">Items</p>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-gray-300 text-sm">
                      <span>{item.productName} × {item.quantity} ({item.size})</span>
                      <span>${(item.lineTotal / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Email confirmation */}
                <p className="text-gray-500 text-xs">
                  Order confirmation sent to {order.shippingEmail}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/account" className="text-[#c8f000] hover:underline">
            ← Back to Account
          </Link>
        </div>
      </div>
    </div>
  );
}
