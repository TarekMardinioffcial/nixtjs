import { OwnerStats, Stadium } from '@/types';

// Function to fetch owner statistics
export const fetchOwnerStats = async (): Promise<OwnerStats> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would fetch real data from a server
  // For now, return mock data
  return {
    revenue: '14,500',
    bookings: 87,
    rating: 4.7,
    customers: 42
  };
};

// Function to fetch stadiums owned by the current owner
export const fetchOwnerStadiums = async (): Promise<Stadium[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Import the stadium service to reuse mock data
  const mockStadiums = await import('./stadiumService').then(module => module.fetchStadiums());
  
  // In a real app, this would filter stadiums by owner ID
  // For now, just return a subset of the mock stadiums
  return mockStadiums.slice(0, 3);
};