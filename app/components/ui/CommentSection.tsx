import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface Comment {
  id: string;
  user: string;
  text: string;
  likes: number;
  timestamp: string;
  liked?: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
  onLikeComment?: (commentId: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const theme = useTheme();
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const displayComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <View style={styles.container}>
      {/* Comments List */}
      <FlatList
        data={displayComments}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.commentItem,
              { borderBottomColor: theme.border },
            ]}
          >
            <View style={styles.commentContent}>
              <View style={styles.commentTextContainer}>
                <Text style={[styles.username, { color: theme.text }]}>
                  {item.user}
                </Text>
                <Text
                  style={[
                    styles.commentText,
                    { color: theme.textSecondary },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onLikeComment?.(item.id)}
              >
                <AntDesign
                  name={item.liked ? 'heart' : 'hearto'}
                  size={14}
                  color={item.liked ? '#ed4956' : theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.commentMeta}>
              <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
                {item.timestamp}
              </Text>
              <Text style={[styles.likes, { color: theme.textSecondary }]}>
                {item.likes} likes
              </Text>
            </View>
          </View>
        )}
      />

      {/* Show More Button */}
      {!showAllComments && comments.length > 2 && (
        <TouchableOpacity onPress={() => setShowAllComments(true)}>
          <Text
            style={[
              styles.showMore,
              { color: theme.textSecondary },
            ]}
          >
            View all {comments.length} comments
          </Text>
        </TouchableOpacity>
      )}

      {/* Comment Input */}
      <View
        style={[
          styles.inputContainer,
          { borderTopColor: theme.border, backgroundColor: theme.background },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              borderColor: theme.border,
              backgroundColor: theme.surface,
            },
          ]}
          placeholder="Add a comment..."
          placeholderTextColor={theme.textSecondary}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          onPress={() => {
            if (commentText.trim()) {
              onAddComment?.(commentText);
              setCommentText('');
            }
          }}
          disabled={!commentText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={commentText.trim() ? '#0095f6' : theme.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  commentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  commentTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  username: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
  },
  commentMeta: {
    flexDirection: 'row',
    marginTop: 6,
  },
  timestamp: {
    fontSize: 11,
    marginRight: 16,
  },
  likes: {
    fontSize: 11,
  },
  showMore: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 13,
  },
});