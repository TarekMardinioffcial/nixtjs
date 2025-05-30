import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Calendar, Settings, Radius as Stadium, Star, DollarSign, Users, ArrowUpRight } from 'lucide-react-native';
import { fetchOwnerStats, fetchOwnerStadiums } from '@/services/ownerService';
import { OwnerStats, Stadium as StadiumType } from '@/types';

export default function OwnerDashboardScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, signOut } = useAuth();
  
  const [stats, setStats] = useState<OwnerStats | null>(null);
  const [stadiums, setStadiums] = useState<StadiumType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const statsData = await fetchOwnerStats();
        const stadiumsData = await fetchOwnerStadiums();
        
        setStats(statsData);
        setStadiums(stadiumsData);
      } catch (error) {
        console.error('Failed to load owner data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.ownerName, { color: colors.text }]}>{user?.name || 'Stadium Owner'}</Text>
        </View>
        <TouchableOpacity onPress={() => signOut()}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <View style={styles.statIconContainer}>
              <DollarSign size={20} color={colors.white} />
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>
              ${stats?.revenue || '0'}
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Total Revenue
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.success }]}>
            <View style={styles.statIconContainer}>
              <Calendar size={20} color={colors.white} />
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>
              {stats?.bookings || '0'}
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Bookings
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.warning }]}>
            <View style={styles.statIconContainer}>
              <Star size={20} color={colors.white} />
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>
              {stats?.rating || '0.0'}
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Avg. Rating
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.info }]}>
            <View style={styles.statIconContainer}>
              <Users size={20} color={colors.white} />
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>
              {stats?.customers || '0'}
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Customers
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>My Stadiums</Text>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/add-stadium')}
          >
            <Plus size={20} color={colors.white} />
            <Text style={[styles.addButtonText, { color: colors.white }]}>
              Add New
            </Text>
          </TouchableOpacity>
        </View>

        {stadiums.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card }]}>
            <Stadium size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Stadiums Yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Add your first stadium to start receiving bookings
            </Text>
            <TouchableOpacity 
              style={[styles.emptyButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/add-stadium')}
            >
              <Text style={[styles.emptyButtonText, { color: colors.white }]}>
                Add Stadium
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.stadiumsContainer}>
            {stadiums.map((stadium) => (
              <TouchableOpacity
                key={stadium.id}
                style={[styles.stadiumCard, { backgroundColor: colors.card }]}
                onPress={() => router.push(`/stadium/${stadium.id}`)}
              >
                <Image source={{ uri: stadium.imageUrl }} style={styles.stadiumImage} />
                <View style={styles.stadiumOverlay}>
                  <View style={styles.stadiumInfo}>
                    <Text style={[styles.stadiumName, { color: colors.white }]}>
                      {stadium.name}
                    </Text>
                    <View style={styles.stadiumStats}>
                      <View style={styles.statRow}>
                        <Calendar size={14} color={colors.white} />
                        <Text style={[styles.statText, { color: colors.white }]}>
                          {stadium.bookings} Bookings
                        </Text>
                      </View>
                      <View style={styles.statRow}>
                        <Star size={14} color={colors.white} />
                        <Text style={[styles.statText, { color: colors.white }]}>
                          {stadium.rating} Rating
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.viewButton, { backgroundColor: colors.white }]}>
                    <ArrowUpRight size={16} color={colors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Bookings</Text>
          <TouchableOpacity onPress={() => router.push('/bookings')}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.bookingsCard, { backgroundColor: colors.card }]}
          onPress={() => router.push('/bookings')}
        >
          <View style={styles.bookingCardContent}>
            <Calendar size={24} color={colors.primary} />
            <View style={styles.bookingCardText}>
              <Text style={[styles.bookingCardTitle, { color: colors.text }]}>
                Manage Bookings
              </Text>
              <Text style={[styles.bookingCardSubtitle, { color: colors.textSecondary }]}>
                View and manage all your stadium bookings
              </Text>
            </View>
            <ArrowUpRight size={20} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  ownerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    opacity: 0.8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  emptyCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  stadiumsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  stadiumCard: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
  },
  stadiumImage: {
    width: '100%',
    height: '100%',
  },
  stadiumOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  stadiumInfo: {
    flex: 1,
  },
  stadiumName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  stadiumStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  viewButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  bookingsCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
  },
  bookingCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingCardText: {
    flex: 1,
    marginLeft: 16,
  },
  bookingCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  bookingCardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});