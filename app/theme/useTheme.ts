import { useColorScheme } from 'react-native';
import { COLORS, Theme } from './colors';

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? COLORS.dark : COLORS.light;
};