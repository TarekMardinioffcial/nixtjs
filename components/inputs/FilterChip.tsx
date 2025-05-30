import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, isSelected, onPress }: FilterChipProps) {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? colors.primary : colors.inputBackground,
          borderColor: isSelected ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          { color: isSelected ? colors.white : colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});