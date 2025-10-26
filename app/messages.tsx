import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from './theme/useTheme';

const conversations = [
  {
    id: '1',
    user: 'johndoe',
    avatar: 'https://placehold.co/50x50/FF6B6B/FFFFFF?text=JD',
    lastMessage: 'That looks great! 👍',
    time: '2m',
    unread: true
  },
  {
    id: '2',
    user: 'janedoe',
    avatar: 'https://placehold.co/50x50/4ECDC4/FFFFFF?text=JA',
    lastMessage: 'See you soon!',
    time: '1h',
    unread: false
  },
  {
    id: '3',
    user: 'alexsmith',
    avatar: 'https://placehold.co/50x50/FFD166/000000?text=AS',
    lastMessage: 'You: Thanks for sharing!',
    time: '3h',
    unread: false
  },
  {
    id: '4',
    user: 'fitness_guru',
    avatar: 'https://placehold.co/50x50/6A0572/FFFFFF?text=FG',
    lastMessage: 'Let\'s workout together 💪',
    time: '1d',
    unread: false
  },
  {
    id: '5',
    user: 'nature_lover',
    avatar: 'https://placehold.co/50x50/1A535C/FFFFFF?text=NL',
    lastMessage: 'Amazing photos from the trip!',
    time: '2d',
    unread: false
  },
  {
    id: '6',
    user: 'tech_ninja',
    avatar: 'https://placehold.co/50x50/2EC4B6/FFFFFF?text=TN',
    lastMessage: 'Check this out 🔗',
    time: '3d',
    unread: false
  },
];

const MessagesScreen = () => {
  const theme = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <View style={styles.nameTimeRow}>
          <Text style={[styles.username, { color: theme.text }, item.unread && styles.unreadUsername]}>
            {item.user}
          </Text>
          <Text style={[styles.timeText, { color: theme.textSecondary }]}>{item.time}</Text>
        </View>
        <Text 
          style={[styles.lastMessage, { color: theme.textSecondary }, item.unread && { ...styles.unreadMessage, color: theme.text }]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <View style={styles.headerTitleRow}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Direct</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="videocam-outline" size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="edit-3" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: theme.surface }]}>
            <Feather name="search" size={18} color={theme.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search Direct"
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      <View style={[styles.messagesContainer, { backgroundColor: theme.background }]}>
        <View style={styles.messagesLabel}>
          <Text style={[styles.messagesText, { color: theme.textSecondary }]}>Messages</Text>
        </View>
        
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 4,
  },
  searchContainer: {
    marginBottom: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesLabel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messagesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8e8e',
  },
  listContainer: {
    paddingBottom: 24,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  unreadUsername: {
    fontWeight: '600',
  },
  timeText: {
    fontSize: 13,
    color: '#8e8e8e',
  },
  lastMessage: {
    fontSize: 13,
    color: '#8e8e8e',
  },
  unreadMessage: {
    color: '#000',
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0095f6',
    marginLeft: 12,
  },
});

export default MessagesScreen;
