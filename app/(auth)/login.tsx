import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(email, password);
      // Navigation will happen automatically in the root component
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&h=350' }}
          style={styles.logo}
        />
        <Text style={[styles.appName, { color: colors.text }]}>StadiumSpot</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue</Text>

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </View>
        )}

        <View style={styles.inputWrapper}>
          <View style={[styles.iconContainer, { backgroundColor: colors.inputBackground }]}>
            <Mail size={20} color={colors.textSecondary} />
          </View>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBackground, color: colors.text }
            ]}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <View style={[styles.iconContainer, { backgroundColor: colors.inputBackground }]}>
            <Lock size={20} color={colors.textSecondary} />
          </View>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBackground, color: colors.text }
            ]}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.textSecondary} />
            ) : (
              <Eye size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/forgot-password')}
          style={styles.forgotPassword}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <PrimaryButton 
          title="Sign In" 
          onPress={handleLogin} 
          isLoading={isLoading} 
        />

        <View style={styles.orContainer}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.orText, { color: colors.textSecondary }]}>OR</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={[styles.signUpText, { color: colors.textSecondary }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={[styles.signUpLink, { color: colors.primary }]}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.roleButtonsContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, { backgroundColor: colors.inputBackground }]}
            onPress={() => {
              signIn('user@example.com', 'password', 'user');
            }}
          >
            <Text style={[styles.roleButtonText, { color: colors.primary }]}>Demo User</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleButton, { backgroundColor: colors.inputBackground }]}
            onPress={() => {
              signIn('owner@example.com', 'password', 'owner');
            }}
          >
            <Text style={[styles.roleButtonText, { color: colors.primary }]}>Demo Owner</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleButton, { backgroundColor: colors.inputBackground }]}
            onPress={() => {
              signIn('admin@example.com', 'password', 'admin');
            }}
          >
            <Text style={[styles.roleButtonText, { color: colors.primary }]}>Demo Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginTop: 16,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconContainer: {
    padding: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    height: 56,
    justifyContent: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  orText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginHorizontal: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  signUpText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  signUpLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  roleButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});