import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  size = 'medium',
}) => {
  const theme = useTheme();

  const variants = {
    primary: {
      backgroundColor: theme.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    tertiary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.textSecondary,
    },
    danger: {
      backgroundColor: theme.like,
      borderWidth: 0,
    },
  };

  const sizes = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
    },
    medium: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14,
    },
    large: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  };

  const buttonStyle = {
    ...variants[variant],
    ...sizes[size],
  };

  const textColor = variant === 'primary' || variant === 'danger' ? '#fff' : theme.text;
  const disabledOpacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        buttonStyle,
        { opacity: disabledOpacity },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor, fontSize: sizes[size].fontSize }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});