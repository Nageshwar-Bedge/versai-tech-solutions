// File: /client/user-account/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ProfileSection from './components/ProfileSection';
import OrdersList from './components/OrdersList';
import Card from '../common/Card';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for authentication token on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('userToken');
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Account</h1>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`pb-2 px-4 ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === 'orders'
              ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
      </div>

      {/* Tab Content */}
      <Card>
        {activeTab === 'profile' ? (
          <ProfileSection />
        ) : (
          <OrdersList />
        )}
      </Card>
    </div>
  );
};

export default Dashboard;