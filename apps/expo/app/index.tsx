import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { HomeScreen } from 'app/features/home/screen'
import { ProfileScreen } from 'app/features/profile/profile-screen'
import { BookmarksScreen } from 'app/features/bookmarks/bookmark-screen'
import { BookmarksProvider } from 'app/features/bookmarks/context'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, SizeTokens, Text, XStack, YStack, Form, Spinner } from 'tamagui'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'Bookmarks' }} />
    </Stack.Navigator>
  )
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const name = await SecureStore.getItemAsync('userName')
        const email = await SecureStore.getItemAsync('userEmail')
        if (name !== null && email !== null) {
          setIsFirstLaunch(false)
        }
        console.log(name, email)
      } catch (error) {
        console.log('Error :', error)
      }
    }
    fetchData()
  }, [])

  if (isFirstLaunch) return <Landing setIsFirstLaunch={setIsFirstLaunch} />
  return (
    <BookmarksProvider>
      <NavigationContainer independent={true}>
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
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 0,
              elevation: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          })}
        >
          <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="BookmarksTab"
            component={BookmarksScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BookmarksProvider>
  )
}

interface LoginProp {
  name: string
  email: string
}

function Landing(props: { setIsFirstLaunch: (a: boolean) => void }) {
  // State to store login details
  const [loginDetails, setLoginDetails] = React.useState<LoginProp>({ name: '', email: '' })
  const [buttonState, setButtonState] = React.useState(false)
  // Handle change in input and update state
  function handleChange(e: string, id: string) {
    // Update the state with the new email value
    if (id === 'email') {
      setLoginDetails({ ...loginDetails, email: e })
    } else {
      setLoginDetails({ ...loginDetails, name: e })
    }
  }
  const handlePress = async () => {
    if (loginDetails.name && loginDetails.email) {
      try {
        // Save name and email in AsyncStorage
        await SecureStore.setItemAsync('userName', loginDetails.name)
        await SecureStore.setItemAsync('userEmail', loginDetails.email)
        props.setIsFirstLaunch(false) // Hide form after saving
      } catch (error) {
        console.log('Error saving to SecureStore:', error)
      }
    } else {
      alert('Please enter both name and email.')
    }
  }
  return (
    <SafeAreaView>
      <Form
        width="100%"
        minHeight={250}
        overflow="hidden"
        space="$2"
        margin="$3"
        paddingHorizontal="$4"
        justifyContent="center"
        height="100%"
        alignItems="center"
      >
        <InputDemo size="Enter your name" handleChange={handleChange} id="name" />
        <InputDemo size="Enter your email" handleChange={handleChange} id="email" />
        <Text>{loginDetails.email}</Text>
        <Form.Trigger
          asChild
          disabled={
            buttonState || loginDetails.name.length === 0 || loginDetails.email.length === 0
          }
        >
          <Button
            size="$5"
            theme={'active'}
            onPress={handlePress}
            icon={buttonState ? () => <Spinner /> : undefined}
          >
            Get started
          </Button>
        </Form.Trigger>
      </Form>
    </SafeAreaView>
  )
}

function InputDemo(props: {
  size: SizeTokens
  handleChange: (e: string, divid: string) => void
  id: string
}) {
  return (
    <XStack alignItems="center">
      <Input
        id={props.id}
        flex={1}
        placeholder={props.size}
        onChangeText={(e: string) => props.handleChange(e, props.id)}
      />
    </XStack>
  )
}
