import { Stadium } from '@/types';

// Mock data for stadiums
const mockStadiums: Stadium[] = [
  {
    id: '1',
    name: 'Olympic Stadium',
    description: 'A state-of-the-art multi-purpose stadium with a seating capacity of 60,000. Features include a retractable roof, modern locker rooms, and premium hospitality areas.',
    location: 'Olympic Park, New York',
    price: 1200,
    rating: 4.8,
    reviewCount: 243,
    type: 'Football',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&h=350',
    images: [
      'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2648977/pexels-photo-2648977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    amenities: [
      'Locker Rooms',
      'Showers',
      'Restrooms',
      'Parking',
      'Floodlights',
      'Scoreboard'
    ],
    openingHours: [
      { day: 'Monday - Friday', hours: '08:00 AM - 10:00 PM' },
      { day: 'Saturday', hours: '09:00 AM - 11:00 PM' },
      { day: 'Sunday', hours: '10:00 AM - 08:00 PM' }
    ],
    availableDates: [
      '2025-01-15',
      '2025-01-16',
      '2025-01-17',
      '2025-01-18',
      '2025-01-22',
      '2025-01-23'
    ],
    timeSlots: [
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '01:00 PM - 02:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '04:00 PM - 05:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM'
    ],
    reviews: [
      {
        id: '101',
        userName: 'James Wilson',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 5.0,
        date: 'December 10, 2024',
        text: 'Amazing stadium! The facilities were top-notch and the staff was very helpful. Would definitely book again.'
      },
      {
        id: '102',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.5,
        date: 'November 28, 2024',
        text: 'Great experience overall. The stadium was clean and well-maintained. The only issue was limited parking space.'
      }
    ],
    bookings: 56,
  },
  {
    id: '2',
    name: 'Central Arena',
    description: 'A versatile indoor arena perfect for basketball and volleyball tournaments. Features include professional-grade courts, digital scoreboards, and excellent acoustics.',
    location: 'Downtown, Los Angeles',
    price: 800,
    rating: 4.6,
    reviewCount: 182,
    type: 'Basketball',
    imageUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&h=350',
    images: [
      'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    amenities: [
      'Locker Rooms',
      'Showers',
      'Restrooms',
      'Concession Stand',
      'Equipment Rental',
      'First Aid Station'
    ],
    openingHours: [
      { day: 'Monday - Friday', hours: '07:00 AM - 11:00 PM' },
      { day: 'Saturday', hours: '08:00 AM - 10:00 PM' },
      { day: 'Sunday', hours: '09:00 AM - 09:00 PM' }
    ],
    availableDates: [
      '2025-01-15',
      '2025-01-16',
      '2025-01-20',
      '2025-01-21',
      '2025-01-22',
      '2025-01-23'
    ],
    timeSlots: [
      '08:00 AM - 09:00 AM',
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '01:00 PM - 02:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM'
    ],
    reviews: [
      {
        id: '201',
        userName: 'Michael Brown',
        userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.8,
        date: 'December 5, 2024',
        text: 'Perfect venue for our basketball tournament. The courts were in excellent condition and the staff was very accommodating.'
      },
      {
        id: '202',
        userName: 'Emily Davis',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.2,
        date: 'November 22, 2024',
        text: 'Good facilities but the air conditioning could be improved. It got quite warm during our intensive training session.'
      }
    ],
    bookings: 42,
  },
  {
    id: '3',
    name: 'Riverside Tennis Club',
    description: 'Premium tennis facility featuring 8 clay courts and 4 hard courts. Includes a clubhouse with changing rooms, a pro shop, and a viewing area for spectators.',
    location: 'Riverside, Chicago',
    price: 600,
    rating: 4.9,
    reviewCount: 156,
    type: 'Tennis',
    imageUrl: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&h=350',
    images: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2403408/pexels-photo-2403408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2519217/pexels-photo-2519217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    amenities: [
      'Clubhouse',
      'Pro Shop',
      'Changing Rooms',
      'Showers',
      'Ball Machines',
      'Coaching Services'
    ],
    openingHours: [
      { day: 'Monday - Friday', hours: '06:00 AM - 09:00 PM' },
      { day: 'Saturday', hours: '07:00 AM - 08:00 PM' },
      { day: 'Sunday', hours: '08:00 AM - 07:00 PM' }
    ],
    availableDates: [
      '2025-01-15',
      '2025-01-16',
      '2025-01-17',
      '2025-01-18',
      '2025-01-19',
      '2025-01-20'
    ],
    timeSlots: [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '01:00 PM - 02:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM'
    ],
    reviews: [
      {
        id: '301',
        userName: 'Robert Taylor',
        userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 5.0,
        date: 'December 8, 2024',
        text: 'The best tennis facility in the city! The clay courts are maintained impeccably and the staff is very professional.'
      },
      {
        id: '302',
        userName: 'Jennifer Clark',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.7,
        date: 'November 30, 2024',
        text: 'Excellent courts and amenities. The coaching services are top-notch. Highly recommend for both beginners and advanced players.'
      }
    ],
    bookings: 38,
  },
  {
    id: '4',
    name: 'Greenfield Cricket Stadium',
    description: 'Dedicated cricket facility with international standard pitch and outfield. Features include practice nets, electronic scoreboard, and spectator seating for up to 15,000 people.',
    location: 'Greenfield, Houston',
    price: 900,
    rating: 4.5,
    reviewCount: 120,
    type: 'Cricket',
    imageUrl: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&h=350',
    images: [
      'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/163398/cricket-ball-wicket-stumps-163398.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3532158/pexels-photo-3532158.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    amenities: [
      'Practice Nets',
      'Changing Rooms',
      'Electronic Scoreboard',
      'Floodlights',
      'Spectator Seating',
      'Media Facilities'
    ],
    openingHours: [
      { day: 'Monday - Friday', hours: '09:00 AM - 08:00 PM' },
      { day: 'Saturday', hours: '08:00 AM - 09:00 PM' },
      { day: 'Sunday', hours: '10:00 AM - 07:00 PM' }
    ],
    availableDates: [
      '2025-01-17',
      '2025-01-18',
      '2025-01-19',
      '2025-01-23',
      '2025-01-24',
      '2025-01-25'
    ],
    timeSlots: [
      '09:00 AM - 11:00 AM',
      '11:00 AM - 01:00 PM',
      '01:00 PM - 03:00 PM',
      '03:00 PM - 05:00 PM',
      '05:00 PM - 07:00 PM'
    ],
    reviews: [
      {
        id: '401',
        userName: 'David Lee',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.6,
        date: 'December 2, 2024',
        text: 'Excellent cricket facility with great pitch conditions. The practice nets are particularly well-maintained.'
      },
      {
        id: '402',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.3,
        date: 'November 18, 2024',
        text: 'Good stadium for local tournaments. The floodlights work well for evening matches, but the canteen options could be improved.'
      }
    ],
    bookings: 30,
  },
  {
    id: '5',
    name: 'Diamond Baseball Park',
    description: 'Professional baseball stadium with seating for 25,000 spectators. Features include premium dugouts, bullpens, batting cages, and a state-of-the-art scoreboard.',
    location: 'Southside, Philadelphia',
    price: 1500,
    rating: 4.7,
    reviewCount: 208,
    type: 'Baseball',
    imageUrl: 'https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?auto=compress&cs=tinysrgb&h=350',
    images: [
      'https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2362868/pexels-photo-2362868.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    amenities: [
      'Dugouts',
      'Bullpens',
      'Batting Cages',
      'Locker Rooms',
      'Concession Stands',
      'VIP Suites'
    ],
    openingHours: [
      { day: 'Monday - Friday', hours: '08:00 AM - 10:00 PM' },
      { day: 'Saturday', hours: '09:00 AM - 11:00 PM' },
      { day: 'Sunday', hours: '10:00 AM - 09:00 PM' }
    ],
    availableDates: [
      '2025-01-16',
      '2025-01-17',
      '2025-01-18',
      '2025-01-21',
      '2025-01-22',
      '2025-01-23'
    ],
    timeSlots: [
      '09:00 AM - 12:00 PM',
      '01:00 PM - 04:00 PM',
      '05:00 PM - 08:00 PM'
    ],
    reviews: [
      {
        id: '501',
        userName: 'Thomas Garcia',
        userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.9,
        date: 'December 12, 2024',
        text: 'Incredible baseball stadium with excellent facilities. The field was in perfect condition and the staff was extremely helpful.'
      },
      {
        id: '502',
        userName: 'Amanda Wilson',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&h=100',
        rating: 4.5,
        date: 'November 25, 2024',
        text: 'Great venue for our college tournament. The batting cages and bullpens are well-designed and maintained. Would book again!'
      }
    ],
    bookings: 45,
  }
];

// Function to fetch popular stadiums
export const fetchPopularStadiums = async (): Promise<Stadium[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Sort by rating and return top 3
  return [...mockStadiums].sort((a, b) => b.rating - a.rating).slice(0, 3);
};

// Function to fetch nearby stadiums
export const fetchNearbyStadiums = async (): Promise<Stadium[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would use geolocation
  // For now, just return some random stadiums
  return mockStadiums.slice(2, 5);
};

// Function to fetch stadiums with filtering
export const fetchStadiums = async (query: string = '', category: string = 'all'): Promise<Stadium[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let filtered = [...mockStadiums];
  
  // Filter by search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(
      stadium => 
        stadium.name.toLowerCase().includes(lowerQuery) ||
        stadium.location.toLowerCase().includes(lowerQuery) ||
        stadium.type.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Filter by category
  if (category !== 'all') {
    if (category === 'popular') {
      filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else if (category === 'nearby') {
      filtered = filtered.slice(2, 5); // Simulated nearby
    } else {
      filtered = filtered.filter(
        stadium => stadium.type.toLowerCase() === category.toLowerCase()
      );
    }
  }
  
  return filtered;
};

// Function to fetch a stadium by ID
export const fetchStadiumById = async (id: string): Promise<Stadium> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const stadium = mockStadiums.find(s => s.id === id);
  
  if (!stadium) {
    throw new Error('Stadium not found');
  }
  
  return stadium;
};