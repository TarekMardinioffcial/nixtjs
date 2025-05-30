import { useColorScheme } from 'react-native';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textSecondaryLight: string;
  border: string;
  inputBackground: string;
  white: string;
}

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const lightColors: ThemeColors = {
    primary: '#0A84FF',
    primaryLight: '#E1F0FF',
    secondary: '#5856D6',
    secondaryLight: '#E6E6FF',
    success: '#30D158',
    successLight: '#E2F8E8',
    warning: '#FF9500',
    warningLight: '#FFF0DB',
    error: '#FF3B30',
    errorLight: '#FFE5E5',
    info: '#64D2FF',
    infoLight: '#E5F7FF',
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    textSecondaryLight: '#F2F2F7',
    border: '#E5E5EA',
    inputBackground: '#F2F2F7',
    white: '#FFFFFF',
  };

  const darkColors: ThemeColors = {
    primary: '#0A84FF',
    primaryLight: '#172338',
    secondary: '#5856D6',
    secondaryLight: '#1F1D36',
    success: '#30D158',
    successLight: '#173123',
    warning: '#FF9500',
    warningLight: '#332817',
    error: '#FF3B30',
    errorLight: '#331A19',
    info: '#64D2FF',
    infoLight: '#173035',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    textSecondaryLight: '#28282C',
    border: '#38383A',
    inputBackground: '#1C1C1E',
    white: '#FFFFFF',
  };

  const colors = isDark ? darkColors : lightColors;

  return {
    colors,
    isDark,
  };
}