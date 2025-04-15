// Mock user profile data
export const fetchUserProfile = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'USA'
          }
        });
      }, 500);
    });
  };
  
  // Mock orders data
  export const fetchOrders = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'ORD-1234',
            date: '2025-04-10',
            total: 129.99,
            items: 3,
            status: 'delivered',
            // ... other order details
          },
          // ... more orders
        ]);
      }, 700);
    });
  };