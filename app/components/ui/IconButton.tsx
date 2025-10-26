import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface IconButtonProps {
  onPress: () => void;
  Icon: React.ReactNode;
  size?: number;
  disabled?: boolean;
  variant?: 'ghost' | 'filled';
}

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  Icon,
  size = 24,
  disabled = false,
  variant = 'ghost',
}) => {
  const theme = useTheme();

  const backgroundColor = variant === 'filled' ? theme.surface : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor,
          width: size + 16,
          height: size + 16,
          borderRadius: (size + 16) / 2,
        },
      ]}
    >
      <View style={styles.iconContainer}>{Icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});