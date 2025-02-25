import React, { useState } from 'react';
import { useThemeStore, useOrdersStore, useProductsStore, useClientsStore } from '../lib/store';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export default function Orders() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { orders, cart, addToCart, removeFromCart, clearCart, createOrder } = useOrdersStore();
  const { products } = useProductsStore();
  const { clients } = useClientsStore();
  const [selectedClient, setSelectedClient] = useState('');

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0,
    };
  });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleCreateOrder = () => {
    if (!selectedClient) {
      alert('Please select a client');
      return;
    }
    createOrder(selectedClient, cartTotal);
    setSelectedClient('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Orders
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow p-6`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Available Products
            </h2>
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product.id, 1)}
                    className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Shopping Cart
              </h2>
              <button
                onClick={clearCart}
                className="text-gray-400 hover:text-gray-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.product?.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ${item.product?.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item.productId, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item.productId, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total
                </span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${cartTotal}
                </span>
              </div>
              <div className="space-y-4">
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleCreateOrder}
                  disabled={cart.length === 0 || !selectedClient}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Create Order
                </button>
              </div>
            </div>
          </div>

          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow p-6`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Orders
            </h2>
            <div className="space-y-4">
              {orders.map((order) => {
                const client = clients.find((c) => c.id === order.clientId);
                return (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {client?.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Order #{order.id}
                        </p>
                      </div>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${order.total}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Status: {order.status}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}