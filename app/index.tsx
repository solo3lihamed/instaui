import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Modal,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { CommentSection, ImageGallery, PostActions, PostHeader, PostStats, StoryRing } from './components/ui';
import { useTheme } from './theme/useTheme';

// Sample data for stories
const stories = [
  { id: '1', user: 'Your Story', avatar: 'https://placehold.co/60x60/4A90E2/FFFFFF?text=YS', hasStory: false },
  { id: '2', user: 'johndoe', avatar: 'https://placehold.co/60x60/FF6B6B/FFFFFF?text=JD', hasStory: true },
  { id: '3', user: 'janedoe', avatar: 'https://placehold.co/60x60/4ECDC4/FFFFFF?text=JA', hasStory: true },
  { id: '4', user: 'alexsmith', avatar: 'https://placehold.co/60x60/FFD166/000000?text=AS', hasStory: true },
  { id: '5', user: 'sarahj', avatar: 'https://placehold.co/60x60/6A0572/FFFFFF?text=SJ', hasStory: true },
  { id: '6', user: 'mikeb', avatar: 'https://placehold.co/60x60/1A535C/FFFFFF?text=MB', hasStory: true },
];

// Sample data for posts with carousel support
const posts = [
  {
    id: '1',
    user: 'johndoe',
    avatar: 'https://placehold.co/40x40/FF6B6B/FFFFFF?text=JD',
    location: 'New York, NY',
    images: [
      'https://placehold.co/400x400/FF6B6B/FFFFFF?text=Post+1',
      'https://placehold.co/400x400/FF6B6B/FFFFFF?text=Post+1B',
    ],
    likes: 245,
    caption: 'Beautiful sunset today! #sunset #nature',
    comments: 12,
    time: '2 hours ago',
    liked: false,
    bookmarked: false,
    commentsList: [
      { user: 'jane_doe', text: 'Amazing shot! 🌅' },
      { user: 'alex_smith', text: 'Love the colors!' },
    ]
  },
  {
    id: '2',
    user: 'janedoe',
    avatar: 'https://placehold.co/40x40/4ECDC4/FFFFFF?text=JA',
    location: 'Los Angeles, CA',
    images: ['https://placehold.co/400x400/4ECDC4/000000?text=Post+2'],
    likes: 521,
    caption: 'Coffee and coding! ☕️ #coding #developer',
    comments: 24,
    time: '4 hours ago',
    liked: true,
    bookmarked: false,
    commentsList: [
      { user: 'john_dev', text: 'Keep coding! 💻' },
      { user: 'dev_community', text: 'Great work!' },
    ]
  },
  {
    id: '3',
    user: 'alexsmith',
    avatar: 'https://placehold.co/40x40/FFD166/000000?text=AS',
    location: 'San Francisco, CA',
    images: ['https://placehold.co/400x400/FFD166/000000?text=Post+3'],
    likes: 876,
    caption: 'Exploring the city! 🌆 #travel #adventure',
    comments: 34,
    time: '6 hours ago',
    liked: false,
    bookmarked: false,
    commentsList: [
      { user: 'wanderer', text: 'Where is this exactly?' },
      { user: 'city_lover', text: 'Beautiful city vibes!' },
    ]
  }
];

const { width } = Dimensions.get('window');

const Index = () => {
  const theme = useTheme();
  
  const [animateLike, setAnimateLike] = useState({});
  const [postsData, setPostsData] = useState(posts);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [carouselIndices, setCarouselIndices] = useState({});

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

  const toggleBookmark = (postId) => {
    setPostsData(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, bookmarked: !post.bookmarked } 
          : post
      )
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const openCommentsModal = (post) => {
    setSelectedPost(post);
    setCommentsModalVisible(true);
  };

  const handleAddComment = (text: string) => {
    if (text.trim() && selectedPost) {
      setPostsData(prev => prev.map(p => {
        if (p.id === selectedPost.id) {
          return {
            ...p,
            commentsList: [...(p.commentsList || []), { user: 'you', text, id: Math.random().toString(), likes: 0, timestamp: 'now', liked: false }],
            comments: p.comments + 1
          };
        }
        return p;
      }));
      setSelectedPost(prev => ({
        ...prev,
        commentsList: [...(prev.commentsList || []), { user: 'you', text, id: Math.random().toString(), likes: 0, timestamp: 'now', liked: false }],
        comments: prev.comments + 1
      }));
    }
  };

  // Post Item Component
  const PostItem = ({ post }) => {
    const images = post.images || [post.image];

    return (
      <View style={[styles.postContainer, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        {/* Post Header */}
        <PostHeader 
          username={post.user}
          avatar={post.avatar}
          location={post.location}
          onMorePress={() => {}}
        />

        {/* Post Image Gallery */}
        <ImageGallery images={images} height={width} />

        {/* Post Actions */}
        <PostActions
          likes={post.likes}
          comments={post.comments}
          liked={post.liked}
          bookmarked={post.bookmarked}
          onLikePress={() => toggleLike(post.id)}
          onCommentPress={() => openCommentsModal(post)}
          onSharePress={() => {}}
          onBookmarkPress={() => toggleBookmark(post.id)}
        />

        {/* Post Stats */}
        <PostStats
          likes={post.likes}
          comments={post.comments}
          time={post.time}
          onViewComments={() => openCommentsModal(post)}
        />

        {/* Post Caption */}
        <View style={styles.postCaption}>
          <Text style={[styles.postUsernameCaption, { color: theme.text }]}>{post.user}</Text>
          <Text style={[styles.postText, { color: theme.text }]}>{post.caption}</Text>
        </View>

        {animateLike[post.id] && (
          <View style={styles.heartAnimationContainer}>
            <Animated.View 
              style={[
                styles.heartAnimation, 
                { transform: [{ scale: scaleValue }] }
              ]}
            >
              <AntDesign name="heart" size={60} color={theme.like} />
            </Animated.View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      
      {/* Stories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={[styles.storiesContainer, { borderBottomColor: theme.border }]}
        contentContainerStyle={styles.storiesContent}
      >
        {stories.map(story => (
          <StoryRing 
            key={story.id} 
            uri={story.avatar}
            username={story.user}
            hasStory={story.hasStory}
            isViewed={false}
          />
        ))}
      </ScrollView>

      {/* Posts with Pull-to-Refresh */}
      <FlatList
        data={postsData}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      />

      {/* Comments Modal */}
      <Modal
        visible={commentsModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setCommentsModalVisible(false)}
      >
        <SafeAreaView style={[styles.commentsModal, { backgroundColor: theme.background }]}>
          <View style={[styles.commentsHeader, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={() => setCommentsModalVisible(false)}>
              <Text style={[styles.commentsHeaderClose, { color: theme.text }]}>Close</Text>
            </TouchableOpacity>
            <Text style={[styles.commentsHeaderTitle, { color: theme.text }]}>Comments</Text>
            <View style={{ width: 50 }} />
          </View>

          {selectedPost && (
            <CommentSection
              comments={selectedPost.commentsList?.map(c => ({
                id: c.id || Math.random().toString(),
                user: c.user,
                text: c.text,
                likes: c.likes || 0,
                timestamp: c.timestamp || 'now',
                liked: c.liked || false,
              })) || []}
              onAddComment={handleAddComment}
              onLikeComment={(id) => {}}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storiesContainer: {
    height: 110,
    paddingHorizontal: 12,
    marginVertical: 12,
    borderBottomWidth: 1,
  },
  storiesContent: {
    paddingRight: 16,
  },
  postContainer: {
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  postCaption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postUsernameCaption: {
    fontWeight: '600',
    fontSize: 14,
  },
  postText: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  heartAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  heartAnimation: {
    opacity: 0.8,
  },
  postsContainer: {
    paddingBottom: 24,
  },
  commentsModal: {
    flex: 1,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentsHeaderClose: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentsHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  commentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentUser: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    maxHeight: 100,
  },
  commentPostButton: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Index;