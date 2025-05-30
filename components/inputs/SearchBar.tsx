import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, onSubmit, placeholder = 'Search' }: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.inputBackground }]}>
      <View style={styles.searchIcon}>
        <Search size={20} color={colors.textSecondary} />
      </View>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  searchIcon: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});