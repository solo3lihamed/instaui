# 🚀 Quick Start Guide

## Project Overview
This is a complete Instagram UI clone built with React Native and Expo, featuring:
- ✅ 7 fully themed screens (Home, Search, Profile, Notifications, Messages, Reels, Add)
- ✅ 13 reusable UI components (7 base + 7 advanced)
- ✅ Complete light/dark theme system
- ✅ Instagram-authentic design patterns

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Run the App

**For Web (easiest to test):**
```bash
npm run web
```

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

### 3. View in Browser
The web version will open at `http://localhost:19006` (or similar)

---

## 📁 Project Structure

```
instaui/
├── app/
│   ├── index.tsx              # Home screen (Feed)
│   ├── search.tsx             # Search screen
│   ├── profile.tsx            # Profile screen
│   ├── notifications.tsx       # Notifications screen
│   ├── messages.tsx           # Direct messages screen
│   ├── reels.tsx              # Reels/Videos screen
│   ├── add.tsx                # Create post screen
│   ├── _layout.tsx            # App navigator
│   ├── theme/
│   │   ├── colors.ts          # Color palette
│   │   └── useTheme.ts        # Theme hook
│   └── components/
│       ├── BottomTabNavigator.tsx
│       └── ui/                # Component library
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── Avatar.tsx
│           ├── Input.tsx
│           ├── Divider.tsx
│           ├── PostHeader.tsx
│           ├── PostStats.tsx
│           ├── PostActions.tsx
│           ├── ImageGallery.tsx      # NEW
│           ├── CommentSection.tsx    # NEW
│           ├── StoryRing.tsx         # NEW
│           ├── MessageBubble.tsx     # NEW
│           ├── HashtagText.tsx       # NEW
│           ├── ImagePickerModal.tsx  # NEW
│           ├── FollowButton.tsx      # NEW
│           └── index.ts              # Exports all components
├── assets/                    # Images and icons
├── package.json
├── tsconfig.json
├── app.json                   # Expo config
└── README.md
```

---

## 🎨 Theme System Usage

### How to Use Theme in Components

```typescript
import { useTheme } from './theme/useTheme';
import { View, Text } from 'react-native';

export const MyComponent = () => {
  const theme = useTheme();

  return (
    <View style={{ 
      backgroundColor: theme.background,
      padding: 16 
    }}>
      <Text style={{ color: theme.text }}>
        Content
      </Text>
    </View>
  );
};
```

### Available Theme Colors

- `primary` - Instagram blue (#0095f6)
- `text` - Main text color
- `textSecondary` - Secondary text color
- `background` - Screen background
- `surface` - Card/surface background
- `border` - Divider/border color
- `success` - Success state color
- `error` - Error state color

---

## 📦 Component Usage Examples

### ImageGallery
```typescript
import { ImageGallery } from './components/ui';

<ImageGallery 
  images={['url1', 'url2', 'url3']}
  height={300}
/>
```

### CommentSection
```typescript
import { CommentSection } from './components/ui';

<CommentSection 
  comments={comments}
  onAddComment={(text) => console.log(text)}
/>
```

### FollowButton
```typescript
import { FollowButton } from './components/ui';

<FollowButton onFollowChange={(isFollowing) => {
  console.log('Following:', isFollowing);
}} />
```

### StoryRing
```typescript
import { StoryRing } from './components/ui';

<StoryRing 
  uri="https://..."
  username="john_doe"
  hasStory={true}
/>
```

### MessageBubble
```typescript
import { MessageBubble } from './components/ui';

<MessageBubble 
  text="Hey! How are you?"
  isSender={true}
  timestamp="2:30 PM"
/>
```

### HashtagText
```typescript
import { HashtagText } from './components/ui';

<HashtagText 
  text="Check #travel with @john"
  onHashtagPress={(tag) => console.log(tag)}
  onMentionPress={(mention) => console.log(mention)}
/>
```

---

## 🔧 Customization

### Change Theme Colors
Edit `/app/theme/colors.ts`:

```typescript
export const COLORS = {
  light: {
    primary: '#0095f6',  // Change Instagram blue
    text: '#000',
    // ... other colors
  },
  dark: {
    primary: '#0095f6',
    text: '#fff',
    // ... other colors
  },
};
```

### Add New Screens
1. Create new file in `/app/` (e.g., `shop.tsx`)
2. Use `useTheme()` hook for theming
3. Import components from `./components/ui`
4. Add route to `_layout.tsx`

### Add New Components
1. Create file in `/app/components/ui/MyComponent.tsx`
2. Use `useTheme()` hook for colors
3. Add export to `/app/components/ui/index.ts`
4. Use in screens

---

## 🎯 Feature Overview

### Home Screen
- Story ring carousel
- Scrollable feed with multiple posts
- Image galleries with pagination
- Like, comment, share actions
- Pull-to-refresh gesture

### Search Screen
- Trending hashtags
- Account search with follow buttons
- Post grid results
- Recent searches
- Tab-based filtering

### Profile Screen
- User stats (posts, followers, following)
- Bio and profile info
- Story highlights
- Post grid with like/comment counts
- Tab navigation (Posts, Tagged, IGTV)

### Notifications Screen
- Like notifications
- Follow notifications
- Comment notifications
- Quick follow actions
- Activity timestamps

### Messages Screen
- Conversation list
- Unread message indicators
- Last message preview
- Search functionality
- User avatars

### Reels Screen
- Full-screen video interface
- User info and captions
- Like, comment, share actions
- Music attribution
- Following/Recommended buttons

### Add Post Screen
- Image selection
- Gallery preview
- Caption input
- Advanced options
- Photo/gallery toggle

---

## 🚨 Troubleshooting

### App Won't Start
1. Clear cache: `expo start --clear`
2. Delete node_modules: `rm -rf node_modules && npm install`
3. Check Node version: `node --version` (should be 14+)

### Theme Not Updating
- Make sure you're using `useTheme()` hook
- Not importing from `COLORS` directly
- Check dark mode setting on your device

### Components Not Showing
- Verify import path (e.g., `from './components/ui'`)
- Check component is exported in `index.ts`
- Ensure props are provided correctly

### TypeScript Errors
- These are warnings, not blocking errors
- App will still run fine
- Consider adding type annotations to callback functions

---

## 📚 Documentation Files

- **ENHANCEMENT_SUMMARY.md** - Complete overview of all changes
- **UI_COMPONENT_GUIDE.md** - Detailed component reference
- **ARCHITECTURE.md** - Project architecture details
- **IMPROVEMENTS.md** - Previous improvements
- **README.md** - Original project README

---

## 🎓 Learning Resources

### React Native
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native ScrollView](https://reactnative.dev/docs/scrollview)
- [React Native FlatList](https://reactnative.dev/docs/flatlist)

### Expo
- [Expo Documentation](https://docs.expo.dev)
- [Expo Icons](https://expo.github.io/vector-icons/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## ✨ Next Steps

### Short Term
1. Test all screens in light and dark modes
2. Try adding new components
3. Customize colors and styling
4. Add real images instead of placeholders

### Medium Term
1. Connect to real Instagram API
2. Add animations with React Native Reanimated
3. Implement real image picker
4. Add camera functionality
5. Set up state management (Redux/Context)

### Long Term
1. Backend authentication
2. Real-time messaging
3. Push notifications
4. Video recording and uploading
5. Deploy to App Store/Play Store

---

## 🤝 Support

### Common Issues & Solutions

**Issue: "Cannot find module" error**
- Solution: Clear cache and reinstall: `npm run reset-project`

**Issue: Styles not applying**
- Solution: Make sure to use `useTheme()` hook, not inline colors

**Issue: Images not loading**
- Solution: Check image URLs and internet connection

---

## 📝 Notes

- This project uses React Native Expo for easy development
- All screens are fully theme-aware (light/dark mode)
- Components are reusable and composable
- TypeScript provides type safety
- Ready for API integration

---

## 🎉 You're Ready!

Your Instagram UI clone is ready to use and customize. Start with the web version to preview, then run on iOS/Android as needed.

**Happy coding!** 🚀