import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { SearchBar } from '@/components/inputs/SearchBar';
import { FilterChip } from '@/components/inputs/FilterChip';
import { MapPin, Star, ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import { fetchStadiums } from '@/services/stadiumService';
import { Stadium } from '@/types';

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string, category?: string }>();
  const { colors } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState(params.query || '');
  const [selectedFilter, setSelectedFilter] = useState<string>(params.category || 'all');
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'football', label: 'Football' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'cricket', label: 'Cricket' },
    { id: 'baseball', label: 'Baseball' },
  ];

  useEffect(() => {
    const loadStadiums = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStadiums(searchQuery, selectedFilter);
        setStadiums(data);
      } catch (error) {
        console.error('Failed to load stadiums', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStadiums();
  }, [searchQuery, selectedFilter]);

  const handleSearch = () => {
    // Trigger search with current query
    if (searchQuery.trim()) {
      fetchStadiums(searchQuery, selectedFilter)
        .then(data => setStadiums(data))
        .catch(error => console.error('Search failed', error));
    }
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  const handleStadiumPress = (id: string) => {
    router.push(`/stadium/${id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Explore Stadiums</Text>
        <TouchableOpacity onPress={() => router.push('/filters')} style={styles.filterButton}>
          <SlidersHorizontal size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
        placeholder="Search stadiums..."
      />

      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          renderItem={({ item }) => (
            <FilterChip
              label={item.label}
              isSelected={selectedFilter === item.id}
              onPress={() => handleFilterChange(item.id)}
            />
          )}
        />
      </View>

      <FlatList
        data={stadiums}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.stadiumList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {isLoading ? 'Loading stadiums...' : 'No stadiums found'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.stadiumCard, { backgroundColor: colors.card }]}
            onPress={() => handleStadiumPress(item.id)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.stadiumImage} />
            <View style={styles.stadiumInfo}>
              <Text style={[styles.stadiumName, { color: colors.text }]}>
                {item.name}
              </Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={colors.textSecondary} />
                <Text 
                  style={[styles.locationText, { color: colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {item.location}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={colors.warning} fill={colors.warning} />
                  <Text style={[styles.ratingText, { color: colors.text }]}>
                    {item.rating}
                  </Text>
                </View>
                <View style={styles.typeContainer}>
                  <Text style={[styles.typeText, { color: colors.textSecondary }]}>
                    {item.type}
                  </Text>
                </View>
                <Text style={[styles.priceText, { color: colors.primary }]}>
                  ${item.price}/hr
                </Text>
              </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  filtersList: {
    paddingHorizontal: 24,
    gap: 8,
  },
  stadiumList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  stadiumCard: {
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
  },
  stadiumImage: {
    width: 120,
    height: '100%',
  },
  stadiumInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  stadiumName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
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
  typeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  typeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  priceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
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