# 🚀 Quick Reference Guide

## Theme System

### Use Theme in Any Component
```tsx
import { useTheme } from './theme/useTheme';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Hello!</Text>
    </View>
  );
};
```

### Available Theme Colors
```tsx
theme.background      // Main background
theme.surface         // Secondary background
theme.text           // Main text
theme.textSecondary  // Secondary text
theme.border         // Borders & dividers
theme.primary        // Instagram blue
theme.like           // Heart red
theme.accent         // Purple accent
```

## UI Components

### Button
```tsx
import { Button } from './components/ui';

// Primary button
<Button 
  title="Follow" 
  variant="primary"
  onPress={() => console.log('Pressed')}
/>

// Secondary button
<Button title="Message" variant="secondary" />

// Danger button
<Button title="Delete" variant="danger" />

// With size
<Button title="Click" size="large" />
```

**Props:**
- `title` (string) - Button text
- `onPress` (function) - Callback
- `variant` - 'primary' | 'secondary' | 'tertiary' | 'danger'
- `size` - 'small' | 'medium' | 'large'
- `disabled` - boolean
- `style` - Custom ViewStyle

### Avatar
```tsx
import { Avatar } from './components/ui';

// Small avatar
<Avatar 
  source={{ uri: 'https://...' }}
  size="small"
/>

// Large with story border
<Avatar 
  source={{ uri: 'https://...' }}
  size="large"
  hasStory={true}
/>

// With border
<Avatar 
  source={{ uri: 'https://...' }}
  border={true}
/>
```

**Props:**
- `source` - Image source
- `size` - 'small' | 'medium' | 'large'
- `hasStory` - Show story gradient
- `border` - Show border

### PostHeader
```tsx
import { PostHeader } from './components/ui';

<PostHeader 
  username="john_doe"
  avatar="https://..."
  location="New York, NY"
  onMorePress={() => console.log('More')}
/>
```

**Props:**
- `username` - User's handle
- `avatar` - Profile image URL
- `location` - Location text (optional)
- `onMorePress` - More options callback (optional)

### PostActions
```tsx
import { PostActions } from './components/ui';

<PostActions
  liked={false}
  bookmarked={false}
  likes={245}
  comments={12}
  onLikePress={() => toggleLike()}
  onCommentPress={() => openComments()}
  onSharePress={() => share()}
  onBookmarkPress={() => toggleBookmark()}
/>
```

**Props:**
- `likes` - Number of likes
- `comments` - Number of comments
- `liked` - Like status
- `bookmarked` - Bookmark status
- `onLikePress` - Like callback
- `onCommentPress` - Comment callback
- `onSharePress` - Share callback
- `onBookmarkPress` - Bookmark callback

### PostStats
```tsx
import { PostStats } from './components/ui';

<PostStats
  likes={245}
  comments={12}
  time="2 hours ago"
  onViewComments={() => openComments()}
/>
```

**Props:**
- `likes` - Number of likes
- `comments` - Number of comments
- `time` - Time string
- `onViewComments` - Callback

### Card
```tsx
import { Card } from './components/ui';

<Card padding={16} rounded={true}>
  <Text>Card content</Text>
</Card>
```

**Props:**
- `padding` - Padding amount (default: 12)
- `rounded` - Border radius (default: true)
- `style` - Custom style

### IconButton
```tsx
import { IconButton } from './components/ui';
import { Ionicons } from '@expo/vector-icons';

<IconButton
  Icon={<Ionicons name="heart" size={24} color="#000" />}
  onPress={() => console.log('Pressed')}
  size={40}
  variant="filled"
/>
```

**Props:**
- `Icon` - React element
- `onPress` - Callback
- `size` - Icon size
- `variant` - 'ghost' | 'filled'
- `disabled` - boolean

## Common Patterns

### Dark Mode Testing
```tsx
// In StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background color should be in component using theme
  }
});

// In component
const theme = useTheme();
<View style={[styles.container, { backgroundColor: theme.background }]}>
```

### List with Theme
```tsx
const theme = useTheme();

<FlatList
  data={items}
  renderItem={({ item }) => (
    <View style={{ borderBottomColor: theme.border }}>
      <Text style={{ color: theme.text }}>{item.title}</Text>
    </View>
  )}
  contentContainerStyle={{ backgroundColor: theme.background }}
/>
```

### Tab Navigation
```tsx
const theme = useTheme();

<TouchableOpacity
  style={[
    styles.tabButton,
    activeTab === 'posts' && { borderBottomColor: theme.text }
  ]}
>
  <Text style={{ color: activeTab === 'posts' ? theme.text : theme.textSecondary }}>
    Posts
  </Text>
</TouchableOpacity>
```

### Form Input
```tsx
const theme = useTheme();

<TextInput
  style={[
    styles.input,
    {
      color: theme.text,
      backgroundColor: theme.surface,
      borderColor: theme.border
    }
  ]}
  placeholderTextColor={theme.textSecondary}
  placeholder="Enter text..."
/>
```

## Color Combinations

### Text on Background
```tsx
<Text style={{ color: theme.text }}>Primary text</Text>
<Text style={{ color: theme.textSecondary }}>Secondary text</Text>
```

### Buttons
```tsx
// Primary button
backgroundColor: theme.primary
color: theme.background

// Secondary button
backgroundColor: theme.surface
color: theme.text
borderColor: theme.border
```

### Borders & Dividers
```tsx
borderColor: theme.border
borderBottomColor: theme.border
borderTopColor: theme.border
```

### Backgrounds
```tsx
backgroundColor: theme.background    // Main screens
backgroundColor: theme.surface       // Cards, inputs
backgroundColor: theme.primary       // Active state
```

## Screens Reference

### Home (`/app/index.tsx`)
- Stories with gradients
- Posts with carousel
- Like animation
- Comments modal
- **Uses:** PostHeader, PostActions, PostStats

### Search (`/app/search.tsx`)
- Search bar with theme
- Grid posts
- Account suggestions
- Recent searches

### Profile (`/app/profile.tsx`)
- User stats
- Highlights
- Post grid
- Tab navigation
- **Uses:** Avatar, Button

### Add Post (`/app/add.tsx`)
- Image selection
- Caption input
- Advanced options
- **Uses:** Button, Card

### Reels (`/app/reels.tsx`)
- Full-screen videos
- Interactions
- User info overlay

### Messages (`/app/messages.tsx`)
- Conversation list
- Search conversations
- **Uses:** Avatar, Button

### Notifications (`/app/notifications.tsx`)
- Activity feed
- Follow suggestions
- **Uses:** Button, Avatar

## File Organization

```
/app/theme/
├── colors.ts       # Edit here to change brand colors
└── useTheme.ts     # No need to edit

/app/components/ui/
├── Button.tsx      # Customize button styles
├── Avatar.tsx      # Avatar customization
├── *.tsx           # All other components
└── index.ts        # Exports for easy importing

/app/
├── _layout.tsx     # Navigation & theme
├── index.tsx       # Home screen
├── search.tsx      # Search
├── profile.tsx     # Profile
├── add.tsx         # Create post
├── reels.tsx       # Reels
├── messages.tsx    # Messages
└── notifications.tsx # Notifications
```

## Tips & Tricks

### 1. Change Brand Colors
Edit `/app/theme/colors.ts`:
```tsx
export const COLORS = {
  light: {
    primary: '#FF1493',  // Your brand color
  }
};
```

### 2. Global Style Updates
Update all buttons by editing `/app/components/ui/Button.tsx`

### 3. Reuse Component Styles
Copy component to new variant instead of duplicating

### 4. Test Dark Mode
```bash
# Terminal while app running
# iOS: Cmd+D → Toggle Appearance
# Android: Cmd+M → Toggle Theme
```

### 5. Add New Component
1. Create in `/app/components/ui/NewComponent.tsx`
2. Export from `/app/components/ui/index.ts`
3. Use as: `import { NewComponent } from './components/ui'`

## Common Issues & Solutions

### Q: Colors not changing in dark mode?
**A:** Make sure using `useTheme()` hook, not hard-coded colors

### Q: Component not showing?
**A:** Check if imported from correct path and exported in index.ts

### Q: Theme colors look wrong?
**A:** Device setting might be overriding. Check system theme settings.

### Q: How to add new color?
**A:** Add to `colors.ts` COLORS object, update Theme interface

### Q: Want to ignore system theme?
**A:** Edit `useTheme.ts` to return specific theme directly

## Performance Tips

- Use `React.memo()` for expensive components
- Wrap theme-dependent styles in `useMemo()`
- Use FlatList instead of ScrollView for lists
- Memoize callbacks with `useCallback()`

## Accessibility

- Use good contrast ratios (already done!)
- Add `hitSlop` to small buttons
- Use semantic color names
- Test with screen readers

---

## Quick Start Command
```bash
npm start              # Start the app
# Choose: i(OS) | a(Android) | w(Web)
```

## Need Help?
- 📄 See `SETUP.md` for setup
- 📐 See `ARCHITECTURE.md` for design
- 📚 See `IMPROVEMENTS.md` for features

---

**Happy Coding! 🎉**