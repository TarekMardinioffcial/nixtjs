import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin, SquareCheck as CheckSquare, Info } from 'lucide-react-native';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { fetchStadiumById } from '@/services/stadiumService';
import { createBooking } from '@/services/bookingService';
import { Stadium } from '@/types';

export default function BookingConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ stadiumId: string, date: string, timeSlot: string }>();
  const { colors } = useTheme();
  
  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const loadStadium = async () => {
      if (!params.stadiumId) return;
      
      setIsLoading(true);
      try {
        const data = await fetchStadiumById(params.stadiumId);
        setStadium(data);
      } catch (error) {
        console.error('Failed to load stadium', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStadium();
  }, [params.stadiumId]);

  const handleConfirmBooking = async () => {
    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions to proceed.');
      return;
    }

    if (!stadium || !params.date || !params.timeSlot) {
      Alert.alert('Error', 'Missing booking information. Please try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createBooking({
        stadiumId: params.stadiumId,
        date: params.date,
        timeSlot: params.timeSlot,
        paymentMethod,
      });
      
      router.replace('/booking/success');
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !stadium) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Calculate booking details
  const bookingHours = 1; // Assuming 1 hour booking for simplicity
  const subtotal = stadium.price * bookingHours;
  const serviceFee = subtotal * 0.1; // 10% service fee
  const total = subtotal + serviceFee;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Confirm Booking</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.stadiumCard, { backgroundColor: colors.card }]}>
          <Image source={{ uri: stadium.imageUrl }} style={styles.stadiumImage} />
          <View style={styles.stadiumInfo}>
            <Text style={[styles.stadiumName, { color: colors.text }]}>{stadium.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={colors.textSecondary} />
              <Text style={[styles.locationText, { color: colors.textSecondary }]}>
                {stadium.location}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.detailsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Booking Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Date</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{params.date}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Clock size={16} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Time</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{params.timeSlot}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Clock size={16} color={colors.primary} />
              <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Duration</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{bookingHours} hour</Text>
            </View>
          </View>
        </View>

        <View style={[styles.paymentCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Method</Text>
          
          <TouchableOpacity 
            style={[
              styles.paymentMethod, 
              { 
                backgroundColor: paymentMethod === 'card' ? colors.primaryLight : colors.inputBackground,
                borderColor: paymentMethod === 'card' ? colors.primary : colors.border,
              }
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <CreditCard size={20} color={paymentMethod === 'card' ? colors.primary : colors.textSecondary} />
            <Text 
              style={[
                styles.paymentMethodText, 
                { color: paymentMethod === 'card' ? colors.primary : colors.text }
              ]}
            >
              Credit/Debit Card
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.paymentMethod, 
              { 
                backgroundColor: paymentMethod === 'paypal' ? colors.primaryLight : colors.inputBackground,
                borderColor: paymentMethod === 'paypal' ? colors.primary : colors.border,
              }
            ]}
            onPress={() => setPaymentMethod('paypal')}
          >
            <Image 
              source={{ uri: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg' }}
              style={styles.paypalIcon}
            />
            <Text 
              style={[
                styles.paymentMethodText, 
                { color: paymentMethod === 'paypal' ? colors.primary : colors.text }
              ]}
            >
              PayPal
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
              ${stadium.price} x {bookingHours} hour
            </Text>
            <Text style={[styles.summaryText, { color: colors.text }]}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={styles.serviceFeeContainer}>
              <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
                Service Fee
              </Text>
              <TouchableOpacity style={styles.infoIcon}>
                <Info size={14} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.summaryText, { color: colors.text }]}>
              ${serviceFee.toFixed(2)}
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.totalRow}>
            <Text style={[styles.totalText, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.termsContainer}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <CheckSquare 
            size={20} 
            color={acceptTerms ? colors.primary : colors.textSecondary}
            fill={acceptTerms ? colors.primary : 'transparent'}
          />
          <Text style={[styles.termsText, { color: colors.textSecondary }]}>
            I agree to the <Text style={{ color: colors.primary }}>Terms & Conditions</Text> and <Text style={{ color: colors.primary }}>Cancellation Policy</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.card }]}>
        <PrimaryButton 
          title="Confirm & Pay" 
          onPress={handleConfirmBooking}
          isLoading={isSubmitting}
          disabled={!acceptTerms}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  stadiumCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  stadiumImage: {
    width: 100,
    height: 100,
  },
  stadiumInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  stadiumName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  detailsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginVertical: 4,
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  paymentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  paymentMethodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  paypalIcon: {
    width: 24,
    height: 18,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  serviceFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: 8,
  },
  summaryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});