import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({ title, onPress, isLoading = false, disabled = false }: PrimaryButtonProps) {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.textSecondary : colors.primary },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={[styles.buttonText, { color: colors.white }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});