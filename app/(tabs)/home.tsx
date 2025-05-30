import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Search, MapPin, Star, Calendar, Filter } from 'lucide-react-native';
import { SearchBar } from '@/components/inputs/SearchBar';
import { CategoryList } from '@/components/lists/CategoryList';
import { fetchPopularStadiums, fetchNearbyStadiums } from '@/services/stadiumService';
import { Stadium } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [popularStadiums, setPopularStadiums] = useState<Stadium[]>([]);
  const [nearbyStadiums, setNearbyStadiums] = useState<Stadium[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const popularData = await fetchPopularStadiums();
        const nearbyData = await fetchNearbyStadiums();
        
        setPopularStadiums(popularData);
        setNearbyStadiums(nearbyData);
      } catch (error) {
        console.error('Failed to load stadiums', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = () => {
    router.push({
      pathname: '/explore',
      params: { query: searchQuery }
    });
  };

  const handleStadiumPress = (id: string) => {
    router.push(`/stadium/${id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Welcome back</Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Find your stadium</Text>
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.inputBackground }]}
          onPress={() => router.push('/filters')}
        >
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
        placeholder="Search stadiums..."
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CategoryList />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Stadiums</Text>
          <TouchableOpacity onPress={() => router.push('/explore?category=popular')}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stadiumsScrollContent}
          >
            {popularStadiums.map((stadium) => (
              <TouchableOpacity 
                key={stadium.id} 
                style={[styles.stadiumCard, { backgroundColor: colors.card }]}
                onPress={() => handleStadiumPress(stadium.id)}
              >
                <Image source={{ uri: stadium.imageUrl }} style={styles.stadiumImage} />
                <View style={styles.stadiumInfo}>
                  <Text style={[styles.stadiumName, { color: colors.text }]}>
                    {stadium.name}
                  </Text>
                  <View style={styles.stadiumLocation}>
                    <MapPin size={14} color={colors.textSecondary} />
                    <Text style={[styles.locationText, { color: colors.textSecondary }]}>
                      {stadium.location}
                    </Text>
                  </View>
                  <View style={styles.stadiumFooter}>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color={colors.warning} fill={colors.warning} />
                      <Text style={[styles.ratingText, { color: colors.text }]}>
                        {stadium.rating}
                      </Text>
                    </View>
                    <Text style={[styles.priceText, { color: colors.primary }]}>
                      ${stadium.price}/hr
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nearby Stadiums</Text>
          <TouchableOpacity onPress={() => router.push('/explore?category=nearby')}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : (
          <View style={styles.nearbyContainer}>
            {nearbyStadiums.map((stadium) => (
              <TouchableOpacity 
                key={stadium.id} 
                style={[styles.nearbyCard, { backgroundColor: colors.card }]}
                onPress={() => handleStadiumPress(stadium.id)}
              >
                <Image source={{ uri: stadium.imageUrl }} style={styles.nearbyImage} />
                <View style={styles.nearbyInfo}>
                  <Text 
                    style={[styles.nearbyName, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {stadium.name}
                  </Text>
                  <View style={styles.nearbyLocation}>
                    <MapPin size={12} color={colors.textSecondary} />
                    <Text 
                      style={[styles.nearbyLocationText, { color: colors.textSecondary }]}
                      numberOfLines={1}
                    >
                      {stadium.location}
                    </Text>
                  </View>
                  <View style={styles.nearbyFooter}>
                    <View style={styles.nearbyRating}>
                      <Star size={12} color={colors.warning} fill={colors.warning} />
                      <Text style={[styles.nearbyRatingText, { color: colors.text }]}>
                        {stadium.rating}
                      </Text>
                    </View>
                    <View style={styles.calendarIndicator}>
                      <Calendar size={12} color={colors.success} />
                      <Text style={[styles.availableText, { color: colors.success }]}>Available</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginTop: 4,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  loader: {
    marginVertical: 24,
  },
  stadiumsScrollContent: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  stadiumCard: {
    width: 260,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  stadiumImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  stadiumInfo: {
    padding: 16,
  },
  stadiumName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  stadiumLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  stadiumFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  priceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  nearbyContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  nearbyCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
  },
  nearbyImage: {
    width: 100,
    height: 100,
  },
  nearbyInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  nearbyName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  nearbyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyLocationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },
  nearbyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyRatingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    marginLeft: 4,
  },
  calendarIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
});