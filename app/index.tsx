import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  // While checking authentication status, we can show a loading screen
  if (isLoading) {
    return <Redirect href="/loading" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Redirect to the appropriate dashboard based on user role
  if (userRole === 'owner') {
    return <Redirect href="/(owner)/dashboard" />;
  } else if (userRole === 'admin') {
    return <Redirect href="/(admin)/dashboard" />;
  } else {
    return <Redirect href="/(tabs)/home" />;
  }
}