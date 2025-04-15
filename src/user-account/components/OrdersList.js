// File: /client/user-account/components/OrdersList.js
import React, { useState, useEffect } from 'react';
import Table from '../../common/Table';
import OrderTracker from './OrderTracker';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders - simulating API call
  useEffect(() => {
    const fetchOrders = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setOrders([
          {
            id: 'ORD-1234',
            date: '2025-04-10',
            total: 129.99,
            items: 3,
            status: 'delivered',
            trackingNumber: 'TRK-789012',
            products: [
              { id: 1, name: 'Premium Headphones', price: 89.99, quantity: 1 },
              { id: 2, name: 'Phone Case', price: 19.99, quantity: 2 }
            ]
          },
          {
            id: 'ORD-5678',
            date: '2025-04-08',
            total: 56.50,
            items: 1,
            status: 'shipped',
            trackingNumber: 'TRK-345678',
            products: [
              { id: 3, name: 'Wireless Charger', price: 56.50, quantity: 1 }
            ]
          },
          {
            id: 'ORD-9012',
            date: '2025-04-03',
            total: 210.75,
            items: 4,
            status: 'processing',
            trackingNumber: 'TRK-901234',
            products: [
              { id: 4, name: 'Smart Watch', price: 159.99, quantity: 1 },
              { id: 5, name: 'Watch Band', price: 16.99, quantity: 3 }
            ]
          }
        ]);
        setLoading(false);
      }, 700);
    };

    fetchOrders();
  }, []);

  // View order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status display properties
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'processing':
        return { text: 'Processing', color: 'bg-yellow-100 text-yellow-800' };
      case 'shipped':
        return { text: 'Shipped', color: 'bg-blue-100 text-blue-800' };
      case 'delivered':
        return { text: 'Delivered', color: 'bg-green-100 text-green-800' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Return to orders list
  const handleBack = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Display selected order details
  if (selectedOrder) {
    const statusDisplay = getStatusDisplay(selectedOrder.status);
    
    return (
      <div className="p-4">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-500 mb-6 hover:text-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Orders
        </button>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order #{selectedOrder.id}</h2>
            <p className="text-gray-500">Placed on {formatDate(selectedOrder.date)}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.color}`}>
              {statusDisplay.text}
            </span>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Order Status</h3>
          <OrderTracker status={selectedOrder.status} />
          {selectedOrder.trackingNumber && (
            <p className="mt-3 text-sm">
              Tracking Number: <span className="font-medium">{selectedOrder.trackingNumber}</span>
            </p>
          )}
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedOrder.products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">{formatCurrency(product.price * product.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-500">Order Total:</td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">{formatCurrency(selectedOrder.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Define table columns
  const columns = [
    { 
      header: 'Order #',
      accessor: 'id',
      cell: (value) => <span className="font-medium">{value}</span>
    },
    { 
      header: 'Date',
      accessor: 'date',
      cell: (value) => formatDate(value)
    },
    { 
      header: 'Items',
      accessor: 'items',
    },
    { 
      header: 'Total',
      accessor: 'total',
      cell: (value) => formatCurrency(value),
      className: 'text-right'
    },
    { 
      header: 'Status',
      accessor: 'status',
      cell: (value) => {
        const status = getStatusDisplay(value);
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        );
      }
    },
    {
      header: 'Action',
      accessor: 'id',
      cell: (_, row) => (
        <button
          onClick={() => handleViewOrder(row)}
          className="text-blue-500 hover:text-blue-700"
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="py-6 text-center text-gray-500">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <Table
          columns={columns}
          data={orders}
          className="min-w-full"
        />
      )}
    </div>
  );
};

export default OrdersList;