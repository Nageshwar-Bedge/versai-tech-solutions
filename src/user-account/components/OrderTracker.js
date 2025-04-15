// File: /client/user-account/components/OrderTracker.js
import React from 'react';

// A reusable 3-step order tracking component
const OrderTracker = ({ status }) => {
  // Define the steps and their completion status based on current order status
  const steps = [
    { 
      id: 'processing', 
      name: 'Processing', 
      description: 'Order confirmed and being prepared',
      isComplete: ['processing', 'shipped', 'delivered'].includes(status),
      isCurrent: status === 'processing'
    },
    { 
      id: 'shipped', 
      name: 'Shipped', 
      description: 'Package is on the way',
      isComplete: ['shipped', 'delivered'].includes(status),
      isCurrent: status === 'shipped'
    },
    { 
      id: 'delivered', 
      name: 'Delivered', 
      description: 'Order has been delivered',
      isComplete: ['delivered'].includes(status),
      isCurrent: status === 'delivered'
    }
  ];

  return (
    <div className="w-full">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 
                  ${step.isComplete 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'bg-white border-gray-300'}`}
                >
                  {step.isComplete ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-gray-500 font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="text-center mt-2">
                  <div className={`text-sm font-medium ${step.isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 max-w-xs">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-0.5 ${
                    steps[index].isComplete && steps[index + 1].isComplete 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Version - Vertical layout */}
      <div className="md:hidden">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              {/* Vertical line connecting steps */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 z-10 
                  ${step.isComplete 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'bg-white border-gray-300'}`}
                >
                  {step.isComplete ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-gray-500 font-medium text-sm">{index + 1}</span>
                  )}
                </div>
                
                {/* Vertical connecting line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`w-0.5 h-10 ${
                      steps[index].isComplete && steps[index + 1].isComplete 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              
              {/* Step details */}
              <div className="ml-4">
                <div className={`text-sm font-medium ${step.isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;