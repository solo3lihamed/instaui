import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface AvatarProps {
  source: { uri: string };
  size?: 'small' | 'medium' | 'large';
  hasStory?: boolean;
  border?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'medium',
  hasStory = false,
  border = false,
}) => {
  const theme = useTheme();

  const sizes = {
    small: 40,
    medium: 50,
    large: 80,
  };

  const actualSize = sizes[size];
  const borderWidth = 2;

  const gradientColors = hasStory
    ? ['#833ab4', '#fd1d1d', '#fcb045']
    : ['#f5f5f5', '#f5f5f5'];

  return (
    <LinearGradient
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
      colors={gradientColors}
      style={[
        styles.gradient,
        {
          width: actualSize + borderWidth * 2,
          height: actualSize + borderWidth * 2,
          borderRadius: (actualSize + borderWidth * 2) / 2,
        },
      ]}
    >
      <Image
        source={source}
        style={[
          styles.image,
          {
            width: actualSize,
            height: actualSize,
            borderRadius: actualSize / 2,
            borderWidth: border ? 2 : 0,
            borderColor: theme.background,
          },
        ]}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  image: {
    backgroundColor: '#f0f0f0',
  },
});