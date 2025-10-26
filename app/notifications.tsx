import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FollowButton } from './components/ui';
import { useTheme } from './theme/useTheme';

const activities = [
  {
    id: '1',
    user: 'johndoe',
    avatar: 'https://placehold.co/40x40/FF6B6B/FFFFFF?text=JD',
    action: 'liked your post',
    time: '2 minutes ago',
    type: 'like'
  },
  {
    id: '2',
    user: 'janedoe',
    avatar: 'https://placehold.co/40x40/4ECDC4/FFFFFF?text=JA',
    action: 'started following you',
    time: '1 hour ago',
    type: 'follow'
  },
  {
    id: '3',
    user: 'alexsmith',
    avatar: 'https://placehold.co/40x40/FFD166/000000?text=AS',
    action: 'commented: Amazing content!',
    time: '3 hours ago',
    type: 'comment'
  },
  {
    id: '4',
    user: 'fitness_guru',
    avatar: 'https://placehold.co/40x40/6A0572/FFFFFF?text=FG',
    action: 'liked your photo',
    time: '5 hours ago',
    type: 'like'
  },
  {
    id: '5',
    user: 'nature_lover',
    avatar: 'https://placehold.co/40x40/1A535C/FFFFFF?text=NL',
    action: 'started following you',
    time: '1 day ago',
    type: 'follow'
  },
  {
    id: '6',
    user: 'tech_ninja',
    avatar: 'https://placehold.co/40x40/2EC4B6/FFFFFF?text=TN',
    action: 'liked your post',
    time: '2 days ago',
    type: 'like'
  },
];

const NotificationsScreen = () => {
  const theme = useTheme();
  
  const [activeTab, setActiveTab] = useState('all');

  const getActivityIcon = (type) => {
    switch (type) {
      case 'like':
        return <Ionicons name="heart" size={20} color="#FF0000" />;
      case 'follow':
        return <Ionicons name="person-add" size={20} color="#0095f6" />;
      case 'comment':
        return <Ionicons name="chatbubble" size={20} color="#000" />;
      default:
        return <Ionicons name="notifications" size={20} color="#000" />;
    }
  };

  const renderActivityItem = ({ item }) => (
    <View style={[styles.activityItem, { borderBottomColor: theme.border }]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.activityContent}>
        <Text style={[styles.activityText, { color: theme.text }]}>
          <Text style={[styles.username, { color: theme.text }]}>{item.user}</Text>
          {' '}<Text style={{ color: theme.textSecondary }}>{item.action}</Text>
        </Text>
        <Text style={[styles.timeText, { color: theme.textSecondary }]}>{item.time}</Text>
      </View>
      <View style={styles.activityIcon}>
        {getActivityIcon(item.type)}
      </View>
      <FollowButton />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Notifications</Text>
      </View>

      <View style={[styles.tabContainer, { borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'all' && { ...styles.activeTab, borderBottomColor: theme.text }]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && { ...styles.activeTabText, color: theme.text }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'follows' && { ...styles.activeTab, borderBottomColor: theme.text }]}
          onPress={() => setActiveTab('follows')}
        >
          <Text style={[styles.tabText, activeTab === 'follows' && { ...styles.activeTabText, color: theme.text }]}>Follows</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#8e8e8e',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  listContainer: {
    paddingVertical: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginBottom: 4,
  },
  username: {
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#8e8e8e',
  },
  activityIcon: {
    marginRight: 12,
  },
});

export default NotificationsScreen;
