import React from 'react';
import {
    StyleSheet,
    Text,
    TextProps
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface HashtagTextProps extends TextProps {
  text: string;
  onHashtagPress?: (hashtag: string) => void;
  onMentionPress?: (mention: string) => void;
}

export const HashtagText: React.FC<HashtagTextProps> = ({
  text,
  onHashtagPress,
  onMentionPress,
  style,
  ...props
}) => {
  const theme = useTheme();

  // Parse text for hashtags (#word) and mentions (@word)
  const parts = text.split(/(\s+|#\w+|@\w+)/);

  return (
    <Text style={style} {...props}>
      {parts.map((part, index) => {
        if (part.startsWith('#')) {
          return (
            <Text
              key={index}
              style={[styles.hashtag, { color: '#0095f6' }]}
              onPress={() => onHashtagPress?.(part)}
            >
              {part}
            </Text>
          );
        } else if (part.startsWith('@')) {
          return (
            <Text
              key={index}
              style={[styles.mention, { color: '#0095f6' }]}
              onPress={() => onMentionPress?.(part)}
            >
              {part}
            </Text>
          );
        }
        return (
          <Text key={index} style={{ color: theme.textSecondary }}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  hashtag: {
    fontWeight: '500',
  },
  mention: {
    fontWeight: '500',
  },
});