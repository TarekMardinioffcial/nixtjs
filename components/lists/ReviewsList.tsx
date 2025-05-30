import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Star } from 'lucide-react-native';
import { Review } from '@/types';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  const { colors } = useTheme();

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          No reviews yet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reviews.map((review, index) => (
        <View 
          key={review.id} 
          style={[
            styles.reviewCard,
            index !== reviews.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
          ]}
        >
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.userAvatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {review.userName}
              </Text>
              <Text style={[styles.reviewDate, { color: colors.textSecondary }]}>
                {review.date}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={14} color={colors.warning} fill={colors.warning} />
              <Text style={[styles.rating, { color: colors.text }]}>
                {review.rating}
              </Text>
            </View>
          </View>
          <Text style={[styles.reviewText, { color: colors.text }]}>
            {review.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  reviewCard: {
    paddingVertical: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  reviewDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  reviewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});