import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, Star, MapPin, Check, Info, Clock, Calendar as CalendarIcon } from 'lucide-react-native';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { ReviewsList } from '@/components/lists/ReviewsList';
import { Calendar } from '@/components/calendar/Calendar';
import { fetchStadiumById } from '@/services/stadiumService';
import { Stadium } from '@/types';

const { width } = Dimensions.get('window');

export default function StadiumDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  
  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    const loadStadium = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStadiumById(id);
        setStadium(data);
      } catch (error) {
        console.error('Failed to load stadium', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadStadium();
    }
  }, [id]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      // Show error or alert user to select date and time
      return;
    }

    router.push({
      pathname: '/booking/confirm',
      params: {
        stadiumId: id,
        date: selectedDate,
        timeSlot: selectedTimeSlot
      }
    });
  };

  if (isLoading || !stadium) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.card }]} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveImageIndex(newIndex);
          }}
        >
          {stadium.images.map((image, index) => (
            <Image 
              key={index} 
              source={{ uri: image }} 
              style={styles.image} 
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.paginationContainer}>
          {stadium.images.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot, 
                { 
                  backgroundColor: index === activeImageIndex ? colors.primary : colors.border,
                  width: index === activeImageIndex ? 20 : 8
                }
              ]} 
            />
          ))}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{stadium.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.warning} fill={colors.warning} />
              <Text style={[styles.rating, { color: colors.text }]}>{stadium.rating}</Text>
              <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>
                ({stadium.reviewCount} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              {stadium.location}
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {stadium.description}
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {stadium.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Check size={16} color={colors.success} />
                  <Text style={[styles.amenityText, { color: colors.text }]}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Opening Hours</Text>
            <View style={styles.hoursContainer}>
              {stadium.openingHours.map((item, index) => (
                <View key={index} style={styles.hourRow}>
                  <Text style={[styles.dayText, { color: colors.text }]}>{item.day}</Text>
                  <Text style={[styles.timeText, { color: colors.textSecondary }]}>{item.hours}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Availability</Text>
              <TouchableOpacity onPress={() => {/* Show more info about availability */}}>
                <Info size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <Calendar 
              onSelectDate={setSelectedDate} 
              selectedDate={selectedDate}
              availableDates={stadium.availableDates}
            />

            {selectedDate && (
              <>
                <View style={styles.timeSlotHeader}>
                  <Clock size={16} color={colors.primary} />
                  <Text style={[styles.timeSlotTitle, { color: colors.text }]}>
                    Available Time Slots
                  </Text>
                </View>

                <View style={styles.timeSlotContainer}>
                  {stadium.timeSlots.map((slot, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeSlot,
                        { 
                          backgroundColor: selectedTimeSlot === slot 
                            ? colors.primary 
                            : colors.inputBackground,
                        }
                      ]}
                      onPress={() => setSelectedTimeSlot(slot)}
                    >
                      <Text
                        style={[
                          styles.timeSlotText,
                          { 
                            color: selectedTimeSlot === slot 
                              ? colors.white 
                              : colors.text,
                          }
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Reviews</Text>
              <TouchableOpacity onPress={() => router.push(`/stadium/${id}/reviews`)}>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>

            <ReviewsList reviews={stadium.reviews} />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bookingBar, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.priceText, { color: colors.text }]}>
            ${stadium.price}
            <Text style={[styles.priceUnit, { color: colors.textSecondary }]}>/hour</Text>
          </Text>
        </View>
        <PrimaryButton 
          title="Book Now" 
          onPress={handleBooking} 
          disabled={!selectedDate || !selectedTimeSlot}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  header: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height: 300,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100, // Extra padding for booking bar
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  hoursContainer: {
    gap: 8,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  timeSlotTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timeSlotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  priceUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});