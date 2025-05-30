import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, Users, Radius as Stadium, Calendar, DollarSign, TrendingUp, TriangleAlert as AlertTriangle, ChartBar as BarChart3, ArrowUpRight } from 'lucide-react-native';
import { fetchAdminStats } from '@/services/adminService';
import { AdminStats } from '@/types';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, signOut } = useAuth();
  
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const statsData = await fetchAdminStats();
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load admin stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const navigationCards = [
    {
      id: 'users',
      title: 'User Management',
      subtitle: 'Manage users and owner accounts',
      icon: <Users size={24} color={colors.primary} />,
      onPress: () => router.push('/users'),
      count: stats?.users || 0,
    },
    {
      id: 'stadiums',
      title: 'Stadium Management',
      subtitle: 'Review and manage stadiums',
      icon: <Stadium size={24} color={colors.primary} />,
      onPress: () => router.push('/stadiums'),
      count: stats?.stadiums || 0,
    },
    {
      id: 'bookings',
      title: 'Booking Management',
      subtitle: 'Track and manage all bookings',
      icon: <Calendar size={24} color={colors.primary} />,
      onPress: () => router.push('/bookings'),
      count: stats?.bookings || 0,
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      subtitle: 'View platform statistics and reports',
      icon: <BarChart3 size={24} color={colors.primary} />,
      onPress: () => router.push('/reports'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.adminName, { color: colors.text }]}>{user?.name || 'Admin'}</Text>
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
              <TrendingUp size={20} color={colors.white} />
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>
              {stats?.growthRate || '0'}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Growth Rate
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.warning }]}>
            <View style={styles.statIconContainer}>
              <AlertTriangle size={20} color={colors.white} />
            </View>
            <Text style={[styles.statValue, { color: colors.white }]}>
              {stats?.pendingApprovals || '0'}
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Pending Approvals
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {navigationCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={card.onPress}
            >
              <View style={styles.actionCardContent}>
                {card.icon}
                <View style={styles.actionCardText}>
                  <Text style={[styles.actionCardTitle, { color: colors.text }]}>
                    {card.title}
                  </Text>
                  <Text style={[styles.actionCardSubtitle, { color: colors.textSecondary }]}>
                    {card.subtitle}
                  </Text>
                </View>
                {card.count !== undefined && (
                  <View style={[styles.countBadge, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.countText, { color: colors.primary }]}>
                      {card.count}
                    </Text>
                  </View>
                )}
                <ArrowUpRight size={20} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Platform Overview</Text>
        </View>

        <View style={[styles.overviewCard, { backgroundColor: colors.card }]}>
          <View style={styles.overviewRow}>
            <Text style={[styles.overviewLabel, { color: colors.textSecondary }]}>
              Active Users
            </Text>
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              {stats?.activeUsers || '0'}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.overviewRow}>
            <Text style={[styles.overviewLabel, { color: colors.textSecondary }]}>
              Active Stadium Owners
            </Text>
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              {stats?.activeOwners || '0'}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.overviewRow}>
            <Text style={[styles.overviewLabel, { color: colors.textSecondary }]}>
              Completed Bookings
            </Text>
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              {stats?.completedBookings || '0'}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.overviewRow}>
            <Text style={[styles.overviewLabel, { color: colors.textSecondary }]}>
              Average Rating
            </Text>
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              {stats?.averageRating || '0.0'}
            </Text>
          </View>
        </View>
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
  adminName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '31%',
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
    fontSize: 18,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    opacity: 0.8,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  actionCard: {
    borderRadius: 16,
    padding: 16,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCardText: {
    flex: 1,
    marginLeft: 16,
  },
  actionCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  countText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  overviewCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  overviewLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  overviewValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  divider: {
    height: 1,
  },
});