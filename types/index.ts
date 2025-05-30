// Stadium Types
export interface Stadium {
  id: string;
  name: string;
  description?: string;
  location: string;
  price: number;
  rating: number;
  reviewCount?: number;
  type: string;
  imageUrl: string;
  images?: string[];
  amenities?: string[];
  openingHours?: { day: string; hours: string }[];
  availableDates?: string[];
  timeSlots?: string[];
  reviews?: Review[];
  bookings?: number;
}

// Booking Types
export interface Booking {
  id: string;
  stadium: {
    id: string;
    name: string;
    location: string;
    imageUrl: string;
  };
  date: string;
  time: string;
  status: string;
  totalPrice: number;
}

// Review Types
export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
}

// Owner Stats
export interface OwnerStats {
  revenue: string;
  bookings: number;
  rating: number;
  customers: number;
}

// Admin Stats
export interface AdminStats {
  revenue: string;
  growthRate: number;
  pendingApprovals: number;
  users: number;
  stadiums: number;
  bookings: number;
  activeUsers: number;
  activeOwners: number;
  completedBookings: number;
  averageRating: number;
}