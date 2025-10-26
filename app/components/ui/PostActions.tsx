import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface PostActionsProps {
  likes: number;
  comments: number;
  liked: boolean;
  onLikePress: () => void;
  onCommentPress: () => void;
  onSharePress?: () => void;
  onBookmarkPress?: () => void;
  bookmarked?: boolean;
}

export const PostActions: React.FC<PostActionsProps> = ({
  likes,
  comments,
  liked,
  onLikePress,
  onCommentPress,
  onSharePress,
  onBookmarkPress,
  bookmarked = false,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLikePress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <AntDesign
            name={liked ? 'heart' : 'hearto'}
            size={24}
            color={liked ? theme.like : theme.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCommentPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onSharePress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="send" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onBookmarkPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Feather
          name={bookmarked ? 'bookmark' : 'bookmark'}
          size={24}
          color={bookmarked ? theme.text : theme.textSecondary}
          fill={bookmarked ? theme.text : 'none'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
    padding: 4,
  },
});