import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from 'app/features/home/screen'
import { ProfileScreen } from 'app/features/profile/profile-screen'
import { BookmarksScreen } from 'app/features/bookmarks/bookmark-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'HomeTab') {
            iconName = 'home'
          } else if (route.name === 'ProfileTab') {
            iconName = 'person'
          } else if (route.name === 'BookmarksTab') {
            iconName = 'bookmark'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 5,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="BookmarksTab"
        component={BookmarksScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}
