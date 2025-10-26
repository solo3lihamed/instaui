import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'other';
  timestamp?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  sender,
  timestamp,
}) => {
  const theme = useTheme();
  const isUser = sender === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isUser ? '#0095f6' : theme.surface,
            borderColor: isUser ? '#0095f6' : theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: isUser ? '#fff' : theme.text,
            },
          ]}
        >
          {text}
        </Text>
      </View>
      {timestamp && (
        <Text
          style={[
            styles.timestamp,
            {
              color: theme.textSecondary,
              textAlign: isUser ? 'right' : 'left',
            },
          ]}
        >
          {timestamp}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '85%',
    borderWidth: 0.5,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    marginHorizontal: 8,
  },
});