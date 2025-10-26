import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface PostHeaderProps {
  username: string;
  avatar: string;
  location?: string;
  time?: string;
  onMorePress?: () => void;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  username,
  avatar,
  location,
  time,
  onMorePress,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.border }]}>
      <View style={styles.leftContent}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={[styles.username, { color: theme.text }]}>{username}</Text>
          {location && (
            <Text style={[styles.location, { color: theme.textSecondary }]}>
              {location}
            </Text>
          )}
        </View>
      </View>
      {onMorePress && (
        <TouchableOpacity onPress={onMorePress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Feather name="more-horizontal" size={20} color={theme.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
  },
  location: {
    fontSize: 12,
    marginTop: 2,
  },
});