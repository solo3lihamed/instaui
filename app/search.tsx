import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FollowButton } from './components/ui';
import { useTheme } from './theme/useTheme';

const { width } = Dimensions.get('window');

// Sample data for top search results
const topSearches = [
  { id: '1', name: 'Nature', type: 'hashtag', icon: 'leaf' },
  { id: '2', name: 'Travel', type: 'hashtag', icon: 'compass' },
  { id: '3', name: 'Food', type: 'hashtag', icon: 'utensils' },
  { id: '4', name: 'Photography', type: 'hashtag', icon: 'camera' },
  { id: '5', name: 'Fitness', type: 'hashtag', icon: 'dumbbell' },
  { id: '6', name: 'Art', type: 'hashtag', icon: 'palette' },
];

// Sample data for account search results
const accounts = [
  { id: '1', username: 'nature_lover', avatar: 'https://placehold.co/60x60/4A90E2/FFFFFF?text=NL' },
  { id: '2', username: 'travel_explorer', avatar: 'https://placehold.co/60x60/FF6B6B/FFFFFF?text=TE' },
  { id: '3', username: 'foodie_adventures', avatar: 'https://placehold.co/60x60/4ECDC4/FFFFFF?text=FA' },
  { id: '4', username: 'artistic_soul', avatar: 'https://placehold.co/60x60/FFD166/000000?text=AS' },
  { id: '5', username: 'fitness_guru', avatar: 'https://placehold.co/60x60/6A0572/FFFFFF?text=FG' },
  { id: '6', username: 'tech_ninja', avatar: 'https://placehold.co/60x60/1A535C/FFFFFF?text=TN' },
];

// Sample data for recent searches
const recentSearches = [
  { id: '1', query: 'sunset photography' },
  { id: '2', query: 'coffee art' },
  { id: '3', query: 'mountain hiking' },
  { id: '4', query: 'street art' },
];

const SearchScreen = () => {
  const theme = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('top');

  // Grid items for top posts
  const gridItems = Array.from({ length: 9 }, (_, index) => ({
    id: `${index + 1}`,
    image: `https://placehold.co/120x120/FF6B6B/FFFFFF?text=Post+${index + 1}`,
  }));

  const renderTopPosts = () => (
    <View style={styles.gridContainer}>
      {gridItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.gridItem}>
          <Image source={{ uri: item.image }} style={styles.gridItemImage} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTopSearches = () => (
    <FlatList
      data={topSearches}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.topSearchItem, { backgroundColor: theme.surface }]}>
          <Feather name={item.icon as any} size={20} color={theme.text} style={styles.topSearchIcon} />
          <Text style={[styles.topSearchText, { color: theme.text }]}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.topSearchesContainer}
    />
  );

  const renderAccounts = () => (
    <FlatList
      data={accounts}
      renderItem={({ item }) => (
        <View style={styles.accountItem}>
          <Image source={{ uri: item.avatar }} style={styles.accountAvatar} />
          <Text style={[styles.accountUsername, { color: theme.text }]}>{item.username}</Text>
          <FollowButton />
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );

  const renderRecentSearches = () => (
    <View>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent searches</Text>
      {recentSearches.map((item) => (
        <TouchableOpacity key={item.id} style={styles.recentSearchItem}>
          <Feather name="clock" size={20} color={theme.textSecondary} />
          <Text style={[styles.recentSearchText, { color: theme.text }]}>{item.query}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.clearAllButton}>
        <Text style={styles.clearAllText}>Clear all</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (searchQuery.trim()) {
      // If there's a search query, show filtered results
      return (
        <>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Accounts</Text>
          {renderAccounts()}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Posts</Text>
          {renderTopPosts()}
        </>
      );
    }

    // If no search query, show default content
    return (
      <>
        <View style={[styles.tabContainer, { borderBottomColor: theme.border }]}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'top' && { ...styles.activeTab, borderBottomColor: theme.text }]}
            onPress={() => setActiveTab('top')}
          >
            <Text style={[styles.tabText, activeTab === 'top' && { ...styles.activeTabText, color: theme.text }]}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'accounts' && { ...styles.activeTab, borderBottomColor: theme.text }]}
            onPress={() => setActiveTab('accounts')}
          >
            <Text style={[styles.tabText, activeTab === 'accounts' && { ...styles.activeTabText, color: theme.text }]}>Accounts</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'top' ? (
          <>
            {renderTopSearches()}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Posts</Text>
            {renderTopPosts()}
          </>
        ) : (
          renderAccounts()
        )}

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Suggestions for you</Text>
        {renderAccounts()}
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <View style={[styles.searchInputContainer, { backgroundColor: theme.surface }]}>
          <Feather name="search" size={20} color={theme.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={[styles.content, { backgroundColor: theme.background }]}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#000',
  },
  topSearchesContainer: {
    paddingHorizontal: 16,
  },
  topSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  topSearchIcon: {
    marginRight: 8,
  },
  topSearchText: {
    fontSize: 14,
    color: '#000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    marginBottom: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accountAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  accountUsername: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  recentSearchText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  clearAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  clearAllText: {
    color: '#ed4956',
    fontWeight: '600',
  },
});

export default SearchScreen;