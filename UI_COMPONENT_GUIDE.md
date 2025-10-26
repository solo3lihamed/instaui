# Instagram UI - Component Library Guide

## 📚 Complete Component Reference

### Base UI Components (7 original)
Located in `/app/components/ui/`

```
Button.tsx
├── Features: Basic, outline, and disabled states
├── Props: text, onPress, variant, disabled
└── Usage: Throughout the app for primary actions

Card.tsx
├── Features: Container with shadow and border radius
├── Props: children, style, onPress
└── Usage: Content containers and feed items

Avatar.tsx
├── Features: User profile images with fallback
├── Props: uri, size, name
└── Usage: User profile displays

Input.tsx
├── Features: Text input with validation states
├── Props: placeholder, value, onChangeText, error
└── Usage: Text entry fields

Divider.tsx
├── Features: Visual separator between sections
├── Props: color, style
└── Usage: Visual hierarchy and organization

PostHeader.tsx
├── Features: Post metadata (user, time, menu)
├── Props: username, avatar, timestamp, onMenuPress
└── Usage: Top section of feed posts

PostStats.tsx
├── Features: Display likes and comments count
├── Props: likes, comments
└── Usage: Below post images
```

### Advanced Instagram Components (7 new)
Located in `/app/components/ui/`

```
ImageGallery.tsx
├── Purpose: Post image carousel with pagination
├── Key Features:
│   ├── Horizontal scrolling
│   ├── Image counter display (e.g., "2/5")
│   ├── FlatList optimization
│   └── Configurable height
├── Props: images: string[], height?: number
└── Usage Example:
    <ImageGallery 
      images={postImages} 
      height={300} 
    />

CommentSection.tsx
├── Purpose: Full-featured comments interface
├── Key Features:
│   ├── Like individual comments
│   ├── Expandable comments list
│   ├── Integrated comment input
│   ├── User avatar and timestamps
│   └── Maximum 2 visible before expansion
├── Props: comments: Comment[], onAddComment, onLikeComment
└── Usage Example:
    <CommentSection 
      comments={postComments}
      onAddComment={handleAddComment}
    />

StoryRing.tsx
├── Purpose: Instagram-authentic story display
├── Key Features:
│   ├── Gradient border (unwatched: red-yellow)
│   ├── Grey border (watched)
│   ├── Touch feedback (activeOpacity)
│   └── User avatar display
├── Props: uri: string, username: string, hasStory: boolean
└── Usage Example:
    <StoryRing 
      uri={userAvatar}
      username="john_doe"
      hasStory={true}
    />

MessageBubble.tsx
├── Purpose: Chat message styling
├── Key Features:
│   ├── Sender/receiver differentiation
│   ├── Blue for user, surface color for others
│   ├── Optional timestamps
│   └── Proper alignment
├── Props: text: string, isSender: boolean, timestamp?: string
└── Usage Example:
    <MessageBubble 
      text="Hey! How are you?"
      isSender={true}
    />

HashtagText.tsx
├── Purpose: Smart text parsing and highlighting
├── Key Features:
│   ├── Auto-detect hashtags (#)
│   ├── Auto-detect mentions (@)
│   ├── Callback handlers
│   └── Blue highlight styling
├── Props: text: string, onHashtagPress?, onMentionPress?
└── Usage Example:
    <HashtagText 
      text="Check out #travel with @john_doe"
      onHashtagPress={(tag) => console.log(tag)}
    />

ImagePickerModal.tsx
├── Purpose: Image selection interface
├── Key Features:
│   ├── 3-column grid layout
│   ├── Single/multi-select modes
│   ├── Selection overlays
│   ├── Header and footer
│   └── Mock image library
├── Props: visible: boolean, onSelect, onCancel, multiSelect?: boolean
└── Usage Example:
    <ImagePickerModal 
      visible={pickerOpen}
      onSelect={handleImageSelect}
      onCancel={closePicker}
    />

FollowButton.tsx
├── Purpose: Interactive follow/unfollow button
├── Key Features:
│   ├── Toggle state management
│   ├── Animated press effect
│   ├── Blue when not following
│   ├── Border when following
│   └── Smooth transitions
├── Props: onFollowChange?: (isFollowing: boolean) => void
└── Usage Example:
    <FollowButton onFollowChange={(status) => {
      console.log('User follow status:', status)
    }} />
```

---

## 🎨 Theme System

### useTheme Hook
Located in `/app/theme/useTheme.ts`

```typescript
const theme = useTheme();

// Available theme properties:
{
  primary: '#0095f6',        // Instagram blue
  text: '#000' | '#fff',     // Text color
  textSecondary: '#8e8e8e',  // Secondary text
  background: '#fff' | '#121212',
  surface: '#f0f0f0' | '#1e1e1e',
  border: '#efefef' | '#262626',
  success: '#31a24c',
  error: '#ed4956',
}
```

### Usage in Components
```typescript
import { useTheme } from '../../theme/useTheme';

export const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Hello</Text>
    </View>
  );
};
```

---

## 📱 Screen Integration Map

### Home Screen (`/app/index.tsx`)
```
├── Uses: useTheme hook ✅
├── Components Used:
│   ├── StoryRing (stories carousel)
│   ├── ImageGallery (post images)
│   ├── PostActions (like, comment, share)
│   ├── PostHeader (user info)
│   ├── CommentSection (comments modal)
│   └── PostStats (likes count)
└── Features:
    ├── Pull-to-Refresh
    ├── Multiple posts in feed
    └── Interactive comments
```

### Search Screen (`/app/search.tsx`)
```
├── Uses: useTheme hook ✅
├── Components Used:
│   ├── FollowButton (on search results)
│   └── Avatar (user thumbnails)
└── Features:
    ├── Recent searches
    ├── Trending hashtags
    ├── Account results
    └── Post grid
```

### Profile Screen (`/app/profile.tsx`)
```
├── Uses: useTheme hook ✅
├── Components Used:
│   ├── Avatar (profile picture)
│   ├── FollowButton (follow action)
│   └── Card (post grid items)
└── Features:
    ├── Profile stats
    ├── Bio and link
    ├── Story highlights
    ├── Post grid
    └── Tab navigation
```

### Notifications Screen (`/app/notifications.tsx`)
```
├── Uses: useTheme hook ✅
├── Components Used:
│   ├── Avatar (notification user)
│   ├── FollowButton (quick follow)
│   └── Card (notification items)
└── Features:
    ├── Like notifications
    ├── Follow notifications
    ├── Comment notifications
    └── Tab filtering
```

### Messages Screen (`/app/messages.tsx`)
```
├── Uses: useTheme hook ✅
├── Components Used:
│   ├── Avatar (conversation user)
│   ├── MessageBubble (ready for chat screen)
│   └── Input (search)
└── Features:
    ├── Conversation list
    ├── Search functionality
    ├── Unread indicators
    └── Last message preview
```

### Reels Screen (`/app/reels.tsx`)
```
├── Uses: useTheme hook ✅ (maintains black background)
├── Features:
│   ├── Full-screen video interface
│   ├── User info
│   ├── Caption display
│   ├── Like counter
│   ├── Share actions
│   └── Music attribution
└── Note: Black background intentional for video content
```

### Add Screen (`/app/add.tsx`)
```
├── Uses: useTheme hook ✅
├── Components Used:
│   ├── ImagePickerModal (ready for integration)
│   ├── Button (next/cancel)
│   └── Input (caption)
└── Features:
    ├── Image selection
    ├── Gallery preview
    ├── Caption input
    ├── Advanced options
    └── Photo/Gallery tabs
```

---

## 🔄 Component Composition Examples

### Example 1: Feed Post
```typescript
import {
  PostHeader,
  ImageGallery,
  PostActions,
  PostStats,
  CommentSection
} from './components/ui';

const FeedPost = ({ post }) => {
  return (
    <Card>
      <PostHeader 
        username={post.user}
        avatar={post.avatar}
        timestamp={post.time}
      />
      <ImageGallery images={post.images} />
      <PostActions 
        onLike={handleLike}
        onComment={handleComment}
      />
      <PostStats 
        likes={post.likes}
        comments={post.comments}
      />
      <CommentSection comments={post.comments} />
    </Card>
  );
};
```

### Example 2: Search Result Item
```typescript
import { Avatar, FollowButton } from './components/ui';

const SearchUserResult = ({ user }) => {
  return (
    <View style={styles.item}>
      <Avatar uri={user.avatar} size={50} />
      <Text>{user.username}</Text>
      <FollowButton />
    </View>
  );
};
```

### Example 3: Theme-Aware Component
```typescript
import { useTheme } from './theme/useTheme';
import { View, Text } from 'react-native';

const ThemedComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>
        This component automatically adapts to light/dark mode
      </Text>
    </View>
  );
};
```

---

## 🚀 Usage in Different Screens

### Quick Reference Table

| Component | Home | Search | Profile | Notifications | Messages | Reels | Add |
|-----------|------|--------|---------|---|---|---|---|
| ImageGallery | ✅ | - | - | - | - | - | - |
| CommentSection | ✅ | - | - | - | - | - | - |
| StoryRing | ✅ | - | - | - | - | - | - |
| MessageBubble | - | - | - | - | ⭕ | - | - |
| HashtagText | - | - | ✅ | - | - | ✅ | - |
| ImagePickerModal | - | - | - | - | - | - | ⭕ |
| FollowButton | - | ✅ | ✅ | ✅ | - | - | - |
| Avatar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Button | ✅ | - | ✅ | - | - | - | ✅ |
| PostHeader | ✅ | - | - | - | - | ✅ | - |
| PostStats | ✅ | - | ✅ | - | - | - | - |

**Legend**: ✅ = Currently used | ⭕ = Ready for integration | - = Not applicable

---

## 🎯 Best Practices

### 1. Always Use Theme Hook
```typescript
// ✅ Good
const theme = useTheme();
<Text style={{ color: theme.text }} />

// ❌ Avoid
<Text style={{ color: '#000' }} />
```

### 2. Compose Components
```typescript
// ✅ Good - Multiple small components
<View>
  <PostHeader />
  <ImageGallery />
  <PostActions />
</View>

// ❌ Avoid - Monolithic component
<ComplexPostComponent />
```

### 3. Type Your Props
```typescript
// ✅ Good
interface StoryRingProps {
  uri: string;
  username: string;
  hasStory: boolean;
}

// ❌ Avoid
const StoryRing = (props: any) => { }
```

### 4. Use FlatList for Long Lists
```typescript
// ✅ Good - Efficient rendering
<FlatList 
  data={comments}
  renderItem={renderComment}
  keyExtractor={item => item.id}
/>

// ❌ Avoid - Performance issue
{comments.map(comment => <Comment key={comment.id} />)}
```

---

## 📋 Component Checklist

When creating a new component, ensure:
- [ ] Uses `useTheme()` hook for colors
- [ ] Has TypeScript interfaces for props
- [ ] Follows naming conventions (PascalCase)
- [ ] Exports from `index.ts`
- [ ] Has JSDoc comments for props
- [ ] Responsive design considerations
- [ ] Accessibility features included
- [ ] Works in both light and dark modes
- [ ] Uses Theme-aware colors throughout
- [ ] No hardcoded colors in styles

---

## 🔗 Import Paths

### From anywhere in the app:
```typescript
// Single import
import { Button } from './components/ui';

// Multiple imports
import {
  Button,
  Card,
  Avatar,
  FollowButton,
  ImageGallery,
  CommentSection
} from './components/ui';

// Theme hook
import { useTheme } from './theme/useTheme';
```

---

This component library provides a solid foundation for building an Instagram-like application with consistent design and reusable, composable components!