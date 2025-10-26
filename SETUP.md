# Instagram UI - Setup Guide

## 📋 Overview

This is a comprehensive Instagram-like application built with React Native and Expo. It includes all major Instagram features with a professional theme system and reusable components.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Start the App
```bash
npm start
# or
yarn start
```

Then choose:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## 📱 Features Included

### Screens
1. **Home** (`/app/index.tsx`) - Feed with stories and posts
2. **Search** (`/app/search.tsx`) - Discover and search posts/accounts
3. **Add Post** (`/app/add.tsx`) - Create new posts
4. **Reels** (`/app/reels.tsx`) - Short-form video feed
5. **Profile** (`/app/profile.tsx`) - User profile and posts
6. **Messages** (`/app/messages.tsx`) - Direct messaging
7. **Notifications** (`/app/notifications.tsx`) - Activity feed

### Core Features
✅ Dark/Light Mode Support
✅ User Stories (Instagram style)
✅ Post Feed with Carousel
✅ Like/Comment/Share/Bookmark
✅ User Profile with Stats
✅ Search Functionality
✅ Message Conversations
✅ Activity Notifications

## 🎨 Theme System

### Automatic Dark Mode
The app automatically adapts to your device's system theme preference.

**Light Mode Colors:**
- Clean white backgrounds
- Black text
- Light gray accents

**Dark Mode Colors:**
- Black backgrounds
- White text
- Dark gray accents

### Accessing Theme in Components
```tsx
import { useTheme } from './theme/useTheme';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Hello</Text>
    </View>
  );
};
```

## 🧩 UI Components

Pre-built components in `/app/components/ui/`:

### Button Component
```tsx
import { Button } from './components/ui';

<Button 
  title="Follow"
  variant="primary" // primary | secondary | tertiary | danger
  size="medium" // small | medium | large
  onPress={() => {}}
  disabled={false}
/>
```

### Avatar Component
```tsx
import { Avatar } from './components/ui';

<Avatar 
  source={{ uri: 'https://...' }}
  size="large" // small | medium | large
  hasStory={true}
  border={true}
/>
```

### PostHeader Component
```tsx
import { PostHeader } from './components/ui';

<PostHeader 
  username="john_doe"
  avatar="https://..."
  location="New York, NY"
  onMorePress={() => {}}
/>
```

### PostActions Component
```tsx
import { PostActions } from './components/ui';

<PostActions
  liked={false}
  bookmarked={false}
  likes={245}
  comments={12}
  onLikePress={() => {}}
  onCommentPress={() => {}}
  onSharePress={() => {}}
  onBookmarkPress={() => {}}
/>
```

## 📁 Project Structure

```
instaui/
├── app/
│   ├── theme/
│   │   ├── colors.ts          # Color palette
│   │   └── useTheme.ts        # Theme hook
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── PostHeader.tsx
│   │   │   ├── PostActions.tsx
│   │   │   ├── PostStats.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── BottomTabNavigator.tsx # Alternative navigation
│   ├── _layout.tsx            # Root layout
│   ├── index.tsx              # Home screen
│   ├── search.tsx             # Search screen
│   ├── add.tsx                # Add post screen
│   ├── reels.tsx              # Reels screen
│   ├── profile.tsx            # Profile screen
│   ├── messages.tsx           # Messages screen
│   └── notifications.tsx      # Notifications screen
├── assets/                    # Images and icons
├── package.json
├── tsconfig.json
├── eslint.config.js
└── README.md
```

## 🎯 Customization

### Change Primary Color
Edit `/app/theme/colors.ts`:
```tsx
export const COLORS = {
  light: {
    primary: '#YOUR_BLUE_COLOR', // Change Instagram blue
    like: '#YOUR_RED_COLOR',     // Change heart color
    // ...
  },
};
```

### Modify Component Styling
All components are in `/app/components/ui/` and fully customizable:
```tsx
// Example: Modify Button component
<Button 
  title="Custom"
  style={{ borderRadius: 20 }} // Custom styling
/>
```

### Add New Components
1. Create new file in `/app/components/ui/`
2. Add to `/app/components/ui/index.ts` exports
3. Use in any screen

## 🔧 Development Tips

### Using the Developer Menu
- **iOS**: Cmd+D (simulator) or shake device
- **Android**: Cmd+M (emulator) or shake device

### Enable Debug Mode
Press `d` in the terminal while running the app

### View Network Requests
Use React DevTools or React Native Debugger

## 📦 Dependencies

Key packages already installed:
- `expo-router` - File-based routing
- `@react-navigation/bottom-tabs` - Tab navigation
- `expo-linear-gradient` - Gradient backgrounds
- `@expo/vector-icons` - Icon library
- `react-native-reanimated` - Smooth animations

## 🚨 Troubleshooting

### App won't start
```bash
# Clear cache
npm start -c
# or
expo start --clear
```

### Theme not applying
Make sure you're using the hook:
```tsx
const theme = useTheme();
```

### Colors seem wrong
Check your device's theme setting:
- iOS: Settings > Display & Brightness
- Android: Settings > Display > Theme

## 📱 Testing on Device

### iOS Device
```bash
npm run ios
# Requires Xcode and Apple Developer account
```

### Android Device
```bash
npm run android
# Requires Android Studio and emulator setup
```

### Web Browser
```bash
npm run web
# Best for testing layout
```

## 🔐 Next Steps

1. Connect to real backend API
2. Implement image uploading
3. Add user authentication
4. Enable real-time features
5. Add push notifications
6. Implement story recording
7. Add video support for reels

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Router Guide](https://expo.github.io/router)
- [React Navigation](https://reactnavigation.org/)

## 💡 Tips & Tricks

- Use theme colors consistently for brand unity
- Always wrap theme-dependent styles in the hook
- Test in both light and dark modes
- Keep components small and reusable
- Use TypeScript for better type safety

## 🤝 Contributing

Feel free to extend and customize! The architecture is designed to be:
- **Modular**: Easy to add new features
- **Scalable**: Ready for growth
- **Maintainable**: Clean code structure
- **Flexible**: Fully customizable

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

Happy coding! 🎉

For more details, see `IMPROVEMENTS.md`