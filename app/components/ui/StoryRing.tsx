import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface StoryRingProps {
  uri: string;
  username: string;
  hasStory: boolean;
  isViewed?: boolean;
  onPress?: () => void;
}

export const StoryRing: React.FC<StoryRingProps> = ({
  uri,
  username,
  hasStory,
  isViewed = false,
  onPress,
}) => {
  const getBorderColors = () => {
    if (!hasStory) return ['#e0e0e0', '#e0e0e0'];
    if (isViewed) return ['#d0d0d0', '#d0d0d0'];
    return ['#ff4458', '#fcb045']; // Gradient: Red to Yellow (Instagram style)
  };

  const borderColors = getBorderColors();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {hasStory && !isViewed ? (
        <LinearGradient
          colors={borderColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerContainer}>
            <Image source={{ uri }} style={styles.avatar} />
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.borderContainer,
            {
              borderColor: borderColors[0],
              borderWidth: hasStory ? 2 : 1.5,
            },
          ]}
        >
          <Image source={{ uri }} style={styles.avatar} />
        </View>
      )}
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 32,
    marginBottom: 8,
  },
  innerContainer: {
    padding: 2,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  borderContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  username: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 64,
    color: '#000',
  },
});