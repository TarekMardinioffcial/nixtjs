import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { SegmentedControl } from '@/components/inputs/SegmentedControl';
import { fetchBookings } from '@/services/bookingService';
import { Booking } from '@/types';

export default function BookingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBookings(selectedTab);
        setBookings(data);
      } catch (error) {
        console.error('Failed to load bookings', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [selectedTab]);

  const handleBookingPress = (id: string) => {
    router.push(`/booking/${id}`);
  };

  const renderBookingStatus = (status: string) => {
    let statusColor;
    let backgroundColor;

    switch (status.toLowerCase()) {
      case 'confirmed':
        statusColor = colors.success;
        backgroundColor = colors.successLight;
        break;
      case 'pending':
        statusColor = colors.warning;
        backgroundColor = colors.warningLight;
        break;
      case 'cancelled':
        statusColor = colors.error;
        backgroundColor = colors.errorLight;
        break;
      case 'completed':
        statusColor = colors.text;
        backgroundColor = colors.textSecondaryLight;
        break;
      default:
        statusColor = colors.textSecondary;
        backgroundColor = colors.textSecondaryLight;
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Bookings</Text>
      </View>

      <SegmentedControl
        options={[
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'past', label: 'Past' },
          { value: 'cancelled', label: 'Cancelled' }
        ]}
        value={selectedTab}
        onChange={setSelectedTab}
      />

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {isLoading ? 'Loading bookings...' : 'No bookings found'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.bookingCard, { backgroundColor: colors.card }]}
            onPress={() => handleBookingPress(item.id)}
          >
            <View style={styles.cardHeader}>
              <Image source={{ uri: item.stadium.imageUrl }} style={styles.stadiumImage} />
              <View style={styles.headerInfo}>
                <Text 
                  style={[styles.stadiumName, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {item.stadium.name}
                </Text>
                <View style={styles.locationRow}>
                  <MapPin size={12} color={colors.textSecondary} />
                  <Text 
                    style={[styles.locationText, { color: colors.textSecondary }]}
                    numberOfLines={1}
                  >
                    {item.stadium.location}
                  </Text>
                </View>
              </View>
              {renderBookingStatus(item.status)}
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color={colors.primary} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {item.date}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color={colors.primary} />
                <Text style={[styles.detailText, { color: colors.text }]}>
                  {item.time}
                </Text>
              </View>
            </View>

            <View style={styles.bookingFooter}>
              <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>
                Total Price:
              </Text>
              <Text style={[styles.priceValue, { color: colors.primary }]}>
                ${item.totalPrice}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  bookingsList: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  bookingCard: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stadiumImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  stadiumName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  bookingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 8,
  },
  priceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});