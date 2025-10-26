import React, { useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface FollowButtonProps {
  isFollowing: boolean;
  onPress?: () => void;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing: initialFollowing,
  onPress,
}) => {
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const scaleValue = new Animated.Value(1);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFollowing(!isFollowing);
    onPress?.();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isFollowing ? theme.surface : '#0095f6',
            borderColor: isFollowing ? theme.border : '#0095f6',
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.text,
            {
              color: isFollowing ? theme.text : '#fff',
            },
          ]}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});