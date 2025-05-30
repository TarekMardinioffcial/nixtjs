import { Booking } from '@/types';

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: '1001',
    stadium: {
      id: '1',
      name: 'Olympic Stadium',
      location: 'Olympic Park, New York',
      imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    date: 'January 15, 2025',
    time: '09:00 AM - 11:00 AM',
    status: 'Confirmed',
    totalPrice: 2400,
  },
  {
    id: '1002',
    stadium: {
      id: '2',
      name: 'Central Arena',
      location: 'Downtown, Los Angeles',
      imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    date: 'January 18, 2025',
    time: '02:00 PM - 04:00 PM',
    status: 'Pending',
    totalPrice: 1600,
  },
  {
    id: '1003',
    stadium: {
      id: '3',
      name: 'Riverside Tennis Club',
      location: 'Riverside, Chicago',
      imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    date: 'December 10, 2024',
    time: '10:00 AM - 12:00 PM',
    status: 'Completed',
    totalPrice: 1200,
  },
  {
    id: '1004',
    stadium: {
      id: '4',
      name: 'Greenfield Cricket Stadium',
      location: 'Greenfield, Houston',
      imageUrl: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    date: 'December 5, 2024',
    time: '01:00 PM - 03:00 PM',
    status: 'Cancelled',
    totalPrice: 1800,
  },
  {
    id: '1005',
    stadium: {
      id: '5',
      name: 'Diamond Baseball Park',
      location: 'Southside, Philadelphia',
      imageUrl: 'https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    date: 'January 21, 2025',
    time: '05:00 PM - 08:00 PM',
    status: 'Confirmed',
    totalPrice: 4500,
  }
];

// Function to fetch bookings based on status filter
export const fetchBookings = async (filter: string = 'upcoming'): Promise<Booking[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const today = new Date();
  
  // Filter bookings based on the filter type
  switch (filter) {
    case 'upcoming':
      return mockBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate > today && booking.status !== 'Cancelled';
      });
    
    case 'past':
      return mockBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate < today && booking.status !== 'Cancelled';
      });
    
    case 'cancelled':
      return mockBookings.filter(booking => booking.status === 'Cancelled');
    
    default:
      return mockBookings;
  }
};

// Function to create a new booking
export const createBooking = async (bookingData: {
  stadiumId: string;
  date: string;
  timeSlot: string;
  paymentMethod: string;
}): Promise<Booking> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real app, this would send the data to a server
  // For now, just simulate creating a booking
  
  // Find the stadium data
  const mockStadiums = await import('./stadiumService').then(module => module.fetchStadiums());
  const stadium = mockStadiums.find(s => s.id === bookingData.stadiumId);
  
  if (!stadium) {
    throw new Error('Stadium not found');
  }
  
  // Create a new booking object
  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    stadium: {
      id: stadium.id,
      name: stadium.name,
      location: stadium.location,
      imageUrl: stadium.imageUrl
    },
    date: bookingData.date,
    time: bookingData.timeSlot,
    status: 'Confirmed',
    totalPrice: stadium.price * 2, // Assuming 2 hours
  };
  
  // In a real app, we would save this to a database
  // For demo purposes, we'll just return the new booking
  
  return newBooking;
};