import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from './theme/useTheme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample data for reels
const reels = [
  {
    id: '1',
    username: 'travel_explorer',
    avatar: 'https://placehold.co/40x40/FF6B6B/FFFFFF?text=TE',
    caption: 'Beautiful sunset at the beach! 🌅 #travel #sunset #beach',
    likes: 2450,
    comments: 120,
    shares: 45,
    liked: false,
  },
  {
    id: '2',
    username: 'fitness_guru',
    avatar: 'https://placehold.co/40x40/4ECDC4/FFFFFF?text=FG',
    caption: 'Morning workout motivation! 💪 #fitness #workout #morning',
    likes: 5210,
    comments: 240,
    shares: 87,
    liked: true,
  },
  {
    id: '3',
    username: 'artistic_soul',
    avatar: 'https://placehold.co/40x40/FFD166/000000?text=AS',
    caption: 'Just finished this painting! What do you think? 🎨 #art #painting #creative',
    likes: 8760,
    comments: 340,
    shares: 120,
    liked: false,
  },
];

const ReelsScreen = () => {
  const theme = useTheme();
  
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [reelsData, setReelsData] = useState(reels);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const handleLike = (reelId: string) => {
    setReelsData(prev => 
      prev.map(reel => 
        reel.id === reelId 
          ? { 
              ...reel, 
              liked: !reel.liked, 
              likes: reel.liked ? reel.likes - 1 : reel.likes + 1 
            } 
          : reel
      )
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveReelIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderReel = ({ item: reel, index }) => {
    
    return (
      <View key={reel.id} style={styles.reelContainer}>
        {/* Background Video Placeholder */}
        <Image 
          source={{ uri: `https://placehold.co/${SCREEN_WIDTH}x${SCREEN_HEIGHT}/4A90E2/FFFFFF?text=REEL+${index + 1}` }} 
          style={styles.reelVideo} 
        />
        
        {/* Left Actions */}
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image source={{ uri: reel.avatar }} style={styles.avatar} />
          </TouchableOpacity>
          
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(reel.id)}>
              <AntDesign 
                name={reel.liked ? "heart" : "hearto"} 
                size={32} 
                color={reel.liked ? "#FF0000" : "#fff"} 
              />
              <Text style={styles.actionText}>{reel.likes.toLocaleString()}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={32} color="#fff" />
              <Text style={styles.actionText}>{reel.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="send" size={30} color="#fff" />
              <Text style={styles.actionText}>{reel.shares}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="plus-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Right Side Info */}
        <View style={styles.rightInfo}>
          <View style={styles.userInfo}>
            <Text style={[styles.username, { color: '#fff' }]}>@{reel.username}</Text>
            <Text style={[styles.caption, { color: '#fff' }]}>{reel.caption}</Text>
            <View style={styles.musicInfo}>
              <MaterialCommunityIcons name="music-note" size={16} color="#fff" />
              <Text style={[styles.musicText, { color: '#fff' }]}>Original Sound - {reel.username}</Text>
            </View>
          </View>
          
          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.bottomActionItem}>
              <Feather name="search" size={20} color="#fff" />
              <Text style={styles.bottomActionText}>Following</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bottomActionItem}>
              <Feather name="user-plus" size={20} color="#fff" />
              <Text style={styles.bottomActionText}>Recommended</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={reelsData}
        renderItem={renderReel}
        keyExtractor={item => item.id}
        pagingEnabled
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollIndicatorInsets={{ bottom: 0 }}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  reelContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  reelVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  leftActions: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff',
  },
  actionIcons: {
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 16,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  rightInfo: {
    position: 'absolute',
    left: 16,
    bottom: 120,
    width: '70%',
  },
  userInfo: {
    marginBottom: 32,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  bottomActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  bottomActionText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  reelsBottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 16,
  },
  navButton: {
    padding: 8,
  },
});

export default ReelsScreen;