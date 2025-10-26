import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Sample data for user's posts
const userPosts = [
  { id: '1', image: 'https://placehold.co/400x400/FF6B6B/FFFFFF?text=Post+1', likes: 245, comments: 12 },
  { id: '2', image: 'https://placehold.co/400x400/4ECDC4/000000?text=Post+2', likes: 521, comments: 24 },
  { id: '3', image: 'https://placehold.co/400x400/FFD166/000000?text=Post+3', likes: 876, comments: 34 },
  { id: '4', image: 'https://placehold.co/400x400/6A0572/FFFFFF?text=Post+4', likes: 321, comments: 18 },
  { id: '5', image: 'https://placehold.co/400x400/1A535C/FFFFFF?text=Post+5', likes: 654, comments: 29 },
  { id: '6', image: 'https://placehold.co/400x400/F72585/FFFFFF?text=Post+6', likes: 432, comments: 15 },
  { id: '7', image: 'https://placehold.co/400x400/4361EE/FFFFFF?text=Post+7', likes: 789, comments: 42 },
  { id: '8', image: 'https://placehold.co/400x400/4CC9F0/000000?text=Post+8', likes: 123, comments: 8 },
  { id: '9', image: 'https://placehold.co/400x400/7209B7/FFFFFF?text=Post+9', likes: 456, comments: 21 },
];

// Sample data for user's tagged posts
const taggedPosts = [
  { id: '1', image: 'https://placehold.co/400x400/3A86FF/FFFFFF?text=Tag+1', likes: 123, comments: 5 },
  { id: '2', image: 'https://placehold.co/400x400/38B000/FFFFFF?text=Tag+2', likes: 234, comments: 12 },
  { id: '3', image: 'https://placehold.co/400x400/FF9E00/000000?text=Tag+3', likes: 345, comments: 18 },
];

// Sample data for user's stories highlights
const highlights = [
  { id: '1', title: 'Travel', avatar: 'https://placehold.co/60x60/FF6B6B/FFFFFF?text=T' },
  { id: '2', title: 'Work', avatar: 'https://placehold.co/60x60/4ECDC4/FFFFFF?text=W' },
  { id: '3', title: 'Food', avatar: 'https://placehold.co/60x60/FFD166/000000?text=F' },
  { id: '4', title: 'Nature', avatar: 'https://placehold.co/60x60/6A0572/FFFFFF?text=N' },
];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('posts'); // posts, tagged, igTV
  const [followStatus, setFollowStatus] = useState(false); // true if following

  const renderGridItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridItemImage} />
      <View style={styles.gridItemOverlay}>
        <View style={styles.gridItemAction}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
          <Text style={styles.gridItemText}>{item.likes}</Text>
        </View>
        <View style={styles.gridItemAction}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.gridItemText}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleFollow = () => {
    setFollowStatus(!followStatus);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: 'https://placehold.co/100x100/4A90E2/FFFFFF?text=Profile' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>127</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>432</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.profileEdit}>
          <TouchableOpacity style={styles.profileActionButton} onPress={handleFollow}>
            <Text style={styles.actionButtonText}>
              {followStatus ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.profileActionButton, styles.messageButton]}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileActionButton}>
            <Feather name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Profile Bio */}
      <View style={styles.bioContainer}>
        <Text style={styles.username}>@username</Text>
        <Text style={styles.fullName}>Full Stack Developer</Text>
        <Text style={styles.bio}>Photography Enthusiast | Traveler | Tech Lover</Text>
        <Text style={styles.bio}>https://myportfolio.com</Text>
      </View>
      
      {/* Highlights */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.highlightsContainer}
        contentContainerStyle={styles.highlightsContent}
      >
        <TouchableOpacity style={styles.addHighlight}>
          <View style={styles.addHighlightIcon}>
            <Feather name="plus" size={24} color="#000" />
          </View>
          <Text style={styles.addHighlightText}>New</Text>
        </TouchableOpacity>
        {highlights.map(highlight => (
          <TouchableOpacity key={highlight.id} style={styles.highlightItem}>
            <Image source={{ uri: highlight.avatar }} style={styles.highlightAvatar} />
            <Text style={styles.highlightTitle}>{highlight.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Ionicons 
            name={activeTab === 'posts' ? "grid" : "grid-outline"} 
            size={24} 
            color={activeTab === 'posts' ? "#000" : "#8e8e8e"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'igTV' && styles.activeTab]}
          onPress={() => setActiveTab('igTV')}
        >
          <MaterialCommunityIcons 
            name={activeTab === 'igTV' ? "play-box" : "play-box-outline"} 
            size={24} 
            color={activeTab === 'igTV' ? "#000" : "#8e8e8e"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'tagged' && styles.activeTab]}
          onPress={() => setActiveTab('tagged')}
        >
          <Feather 
            name={activeTab === 'tagged' ? "user" : "user"} 
            size={24} 
            color={activeTab === 'tagged' ? "#000" : "#8e8e8e"} 
            style={{ opacity: activeTab === 'tagged' ? 1 : 0.5 }}
          />
        </TouchableOpacity>
      </View>
      
      {/* Content based on active tab */}
      {activeTab === 'posts' && (
        <View style={styles.postsGrid}>
          <FlatList
            data={userPosts}
            renderItem={renderGridItem}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      )}
      
      {activeTab === 'tagged' && (
        <View style={styles.postsGrid}>
          <FlatList
            data={taggedPosts}
            renderItem={renderGridItem}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      )}
      
      {activeTab === 'igTV' && (
        <View style={styles.postsGrid}>
          <Text style={styles.noContentText}>No IGTV videos yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileStats: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 14,
    color: '#8e8e8e',
    marginTop: 4,
  },
  profileEdit: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profileActionButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  messageButton: {
    backgroundColor: '#000',
  },
  actionButtonText: {
    fontWeight: '600',
  },
  messageButtonText: {
    fontWeight: '600',
    color: '#fff',
  },
  bioContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
  fullName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  highlightsContainer: {
    height: 100,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  highlightsContent: {
    paddingRight: 16,
  },
  addHighlight: {
    alignItems: 'center',
    marginRight: 20,
  },
  addHighlightIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  addHighlightText: {
    fontSize: 12,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  highlightAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginBottom: 4,
  },
  highlightTitle: {
    fontSize: 12,
    width: 70,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  postsGrid: {
    flex: 1,
  },
  gridContainer: {
    paddingBottom: 24,
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    position: 'relative',
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
  },
  gridItemOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 8,
    display: 'none', // Hidden by default, shown on hover in web
  },
  gridItemAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridItemText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  noContentText: {
    textAlign: 'center',
    paddingVertical: 40,
    fontSize: 16,
    color: '#8e8e8e',
  },
});

export default ProfileScreen;