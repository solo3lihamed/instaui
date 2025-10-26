import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data for stories
const stories = [
  { id: '1', user: 'Your Story', avatar: 'https://placehold.co/60x60/4A90E2/FFFFFF?text=YS', hasStory: false },
  { id: '2', user: 'johndoe', avatar: 'https://placehold.co/60x60/FF6B6B/FFFFFF?text=JD', hasStory: true },
  { id: '3', user: 'janedoe', avatar: 'https://placehold.co/60x60/4ECDC4/FFFFFF?text=JA', hasStory: true },
  { id: '4', user: 'alexsmith', avatar: 'https://placehold.co/60x60/FFD166/000000?text=AS', hasStory: true },
  { id: '5', user: 'sarahj', avatar: 'https://placehold.co/60x60/6A0572/FFFFFF?text=SJ', hasStory: true },
  { id: '6', user: 'mikeb', avatar: 'https://placehold.co/60x60/1A535C/FFFFFF?text=MB', hasStory: true },
];

// Sample data for posts
const posts = [
  {
    id: '1',
    user: 'johndoe',
    avatar: 'https://placehold.co/40x40/FF6B6B/FFFFFF?text=JD',
    location: 'New York, NY',
    image: 'https://placehold.co/400x400/FF6B6B/FFFFFF?text=Post+1',
    likes: 245,
    caption: 'Beautiful sunset today! #sunset #nature',
    comments: 12,
    time: '2 hours ago',
    liked: false
  },
  {
    id: '2',
    user: 'janedoe',
    avatar: 'https://placehold.co/40x40/4ECDC4/FFFFFF?text=JA',
    location: 'Los Angeles, CA',
    image: 'https://placehold.co/400x400/4ECDC4/000000?text=Post+2',
    likes: 521,
    caption: 'Coffee and coding! ☕️ #coding #developer',
    comments: 24,
    time: '4 hours ago',
    liked: true
  },
  {
    id: '3',
    user: 'alexsmith',
    avatar: 'https://placehold.co/40x40/FFD166/000000?text=AS',
    location: 'San Francisco, CA',
    image: 'https://placehold.co/400x400/FFD166/000000?text=Post+3',
    likes: 876,
    caption: 'Exploring the city! 🌆 #travel #adventure',
    comments: 34,
    time: '6 hours ago',
    liked: false
  }
];

const { width } = Dimensions.get('window');

const Index = () => {
  const [animateLike, setAnimateLike] = useState({});
  const [postsData, setPostsData] = useState(posts);

  // Toggle like for a post
  const toggleLike = (postId) => {
    setPostsData(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              liked: !post.liked, 
              likes: post.liked ? post.likes - 1 : post.likes + 1 
            } 
          : post
      )
    );
    
    // Trigger animation
    setAnimateLike({ [postId]: true });
    setTimeout(() => {
      setAnimateLike({ [postId]: false });
    }, 500);
  };

  // Story Item Component
  const StoryItem = ({ story }) => (
    <TouchableOpacity style={styles.storyItem}>
      <LinearGradient 
        start={{x: 0.1, y: 0.1}} 
        end={{x: 0.9, y: 0.9}} 
        colors={story.hasStory ? ['#833ab4', '#fd1d1d', '#fcb045'] : ['#f5f5f5', '#f5f5f5']} 
        style={[styles.storyBorder, !story.hasStory && styles.noStoryBorder]}
      >
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
      </LinearGradient>
      <Text style={styles.storyUsername} numberOfLines={1}>{story.user.length > 10 ? story.user.substring(0, 10) + '...' : story.user}</Text>
    </TouchableOpacity>
  );

  // Post Item Component
  const PostItem = ({ post }) => {
    const scaleValue = new Animated.Value(1);
    
    const handleDoubleTap = () => {
      // Double tap animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Toggle like
      if (!post.liked) {
        toggleLike(post.id);
      }
    };

    return (
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postUserContainer}>
            <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
            <View>
              <Text style={styles.postUsername}>{post.user}</Text>
              <Text style={styles.postLocation}>{post.location}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Post Image with double tap to like */}
        <TouchableOpacity onPress={handleDoubleTap} activeOpacity={1}>
          <Animated.Image 
            source={{ uri: post.image }} 
            style={[
              styles.postImage,
              { transform: [{ scale: scaleValue }] }
            ]} 
          />
        </TouchableOpacity>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => toggleLike(post.id)}
            >
              <AntDesign 
                name={post.liked ? "heart" : "hearto"} 
                size={28} 
                color={post.liked ? "#FF0000" : "#000"} 
              />
              {animateLike[post.id] && (
                <Animated.View 
                  style={[
                    styles.heartAnimation, 
                    { transform: [{ scale: scaleValue }] }
                  ]}
                >
                  <AntDesign name="heart" size={28} color="#FF0000" />
                </Animated.View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="send" size={28} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="bookmark" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Post Stats */}
        <View style={styles.postStats}>
          <Text style={styles.postLikes}>{post.likes.toLocaleString()} likes</Text>
        </View>

        {/* Post Caption */}
        <View style={styles.postCaption}>
          <Text style={styles.postUsernameCaption}>{post.user}</Text>
          <Text style={styles.postText}>{post.caption}</Text>
        </View>

        {/* Post Time */}
        <Text style={styles.postTime}>{post.time}</Text>
        <View style={styles.postComments}>
          <TouchableOpacity>
            <Text style={styles.addCommentText}>Add a comment...</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Stories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.storiesContainer}
        contentContainerStyle={styles.storiesContent}
      >
        {stories.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
      </ScrollView>

      {/* Posts */}
      <FlatList
        data={postsData}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesContainer: {
    height: 100,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  storiesContent: {
    paddingRight: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  storyBorder: {
    borderRadius: 35,
    padding: 2,
    marginBottom: 5,
  },
  noStoryBorder: {
    padding: 1.5,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
    width: 70,
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 14,
  },
  postLocation: {
    fontSize: 12,
    color: '#8e8e8e',
  },
  postImage: {
    width: '100%',
    height: width,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 20,
    position: 'relative',
  },
  postStats: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postLikes: {
    fontWeight: '600',
    fontSize: 14,
  },
  postCaption: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postUsernameCaption: {
    fontWeight: '600',
    marginRight: 8,
  },
  postText: {
    fontSize: 14,
    lineHeight: 18,
  },
  postTime: {
    paddingHorizontal: 16,
    color: '#8e8e8e',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  postComments: {
    paddingHorizontal: 16,
  },
  addCommentText: {
    color: '#8e8e8e',
    fontSize: 14,
  },
  postsContainer: {
    paddingBottom: 24,
  },
  heartAnimation: {
    position: 'absolute',
    top: -10,
    left: -10,
  }
});

export default Index;
