import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { COLORS } from './theme/colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? COLORS.dark : COLORS.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: [styles.tabBar, { 
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        }],
        tabBarShowLabel: false,
        headerShown: false,
        sceneStyle: { backgroundColor: theme.background }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
          title: 'Home',
          headerShown: true,
          headerTitle: () => (
            <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text }}>Instagram</Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
            borderBottomWidth: 1,
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 16 }}>
              <TouchableOpacity style={{ marginHorizontal: 12 }}>
                <Ionicons name="paper-plane-outline" size={26} color={theme.text} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 12 }}>
                <Feather name="heart" size={26} color={theme.text} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Feather name="plus-square" size={size} color={color} />
            </View>
          ),
          title: 'Add',
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <MaterialCommunityIcons 
                name={focused ? "movie" : "movie-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
          title: 'Reels',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "notifications" : "notifications-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
          title: 'Notifications',
          href: null,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons 
                name={focused ? "mail" : "mail-outline"} 
                size={size} 
                color={color} 
              />
            </View>
          ),
          title: 'Messages',
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
