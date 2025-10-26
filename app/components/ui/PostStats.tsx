import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface PostStatsProps {
  likes: number;
  comments: number;
  time: string;
  onViewComments?: () => void;
}

export const PostStats: React.FC<PostStatsProps> = ({
  likes,
  comments,
  time,
  onViewComments,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.likes, { color: theme.text }]}>
        {likes.toLocaleString()} likes
      </Text>
      <TouchableOpacity onPress={onViewComments}>
        <Text style={[styles.comments, { color: theme.textSecondary }]}>
          View all {comments} comments
        </Text>
      </TouchableOpacity>
      <Text style={[styles.time, { color: theme.textSecondary }]}>
        {time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  likes: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  comments: {
    fontSize: 13,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
});