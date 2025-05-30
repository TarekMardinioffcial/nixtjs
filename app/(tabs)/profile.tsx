import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, CreditCard, Bell, Star, Shield, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User size={20} color={colors.primary} />,
      onPress: () => router.push('/profile/personal-info'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={20} color={colors.primary} />,
      onPress: () => router.push('/profile/payment-methods'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color={colors.primary} />,
      onPress: () => router.push('/profile/notifications'),
    },
    {
      id: 'reviews',
      title: 'My Reviews',
      icon: <Star size={20} color={colors.primary} />,
      onPress: () => router.push('/profile/reviews'),
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={20} color={colors.primary} />,
      onPress: () => router.push('/profile/security'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={20} color={colors.primary} />,
      onPress: () => router.push('/profile/settings'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
            <Image 
              source={{ uri: user?.avatarUrl || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' }} 
              style={styles.avatar} 
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.name || 'User Name'}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {user?.email || 'user@example.com'}
              </Text>
              <TouchableOpacity
                style={[styles.editProfileButton, { borderColor: colors.primary }]}
                onPress={() => router.push('/profile/edit')}
              >
                <Text style={[styles.editProfileText, { color: colors.primary }]}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { backgroundColor: colors.card }]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={[styles.menuItemText, { color: colors.text }]}>
                  {item.title}
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.errorLight }]}
          onPress={() => signOut()}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Log Out
          </Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Version 1.0.0
          </Text>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  editProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  menuSection: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});