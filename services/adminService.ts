import { AdminStats } from '@/types';

// Function to fetch admin dashboard statistics
export const fetchAdminStats = async (): Promise<AdminStats> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would fetch real data from a server
  // For now, return mock data
  return {
    revenue: '125,750',
    growthRate: 24,
    pendingApprovals: 12,
    users: 845,
    stadiums: 124,
    bookings: 387,
    activeUsers: 623,
    activeOwners: 78,
    completedBookings: 287,
    averageRating: 4.6
  };
};