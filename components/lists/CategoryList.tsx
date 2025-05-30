import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

interface Category {
  id: string;
  name: string;
  icon: string;
}

export function CategoryList() {
  const router = useRouter();
  const { colors } = useTheme();

  const categories: Category[] = [
    {
      id: 'football',
      name: 'Football',
      icon: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&h=100'
    },
    {
      id: 'basketball',
      name: 'Basketball',
      icon: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&h=100'
    },
    {
      id: 'tennis',
      name: 'Tennis',
      icon: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&h=100'
    },
    {
      id: 'cricket',
      name: 'Cricket',
      icon: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&h=100'
    },
    {
      id: 'baseball',
      name: 'Baseball',
      icon: 'https://images.pexels.com/photos/209841/pexels-photo-209841.jpeg?auto=compress&cs=tinysrgb&h=100'
    }
  ];

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: '/explore',
      params: { category: categoryId }
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(category.id)}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
            <Image source={{ uri: category.icon }} style={styles.icon} />
          </View>
          <Text style={[styles.categoryName, { color: colors.text }]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});