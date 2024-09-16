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
import {
  Button,
  Input,
  SizeTokens,
  Text,
  XStack,
  YStack,
  Form,
  Spinner,
  View,
  Image,
} from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { createUser } from './api/createUser'
import { Redirect } from 'expo-router'

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
        const name = (await SecureStore.getItemAsync('userName')) as string
        const email = (await SecureStore.getItemAsync('userEmail')) as string

        if (name !== null && email !== null) {
          setIsFirstLaunch(false)
        }
        // await SecureStore.deleteItemAsync('userName')
        // await SecureStore.deleteItemAsync('userEmail')
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
            tabBarActiveTintColor: '#F13B13',
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
          {/* <Tab.Screen
            name="ProfileTab"
            component={ProfileScreen}
            options={{ headerShown: false }}
          /> */}
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
      // try {
      // Save name and email in AsyncStorage
      setButtonState(true)
      createUser(loginDetails.name, loginDetails.email)
        .then(async (res) => {
          if (res.status === 200) {
            await SecureStore.setItemAsync('userName', loginDetails.name)
            await SecureStore.setItemAsync('userEmail', loginDetails.email)
            props.setIsFirstLaunch(false) // Hide form after saving
            setButtonState(false)
          }
        })
        .catch((error) => {
          console.log(error)
          return <Redirect href={'/'} />
        })
      // } catch (error) {
      // console.log('Error saving to SecureStore:', error)
      // }
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
        space="$5"
        paddingHorizontal="$6"
        justifyContent="center"
        height="100%"
        alignItems="center"
      >
        <View alignItems="center">
          {/* <Image
            source={{ uri: './assets/logo.png', width: 100, height: 100 }}
            width={100}
            height={100}
          /> */}
          <Text fontSize={28} fontWeight={'bold'} color="#F13B13" marginBottom={10}>
            Engineered Escape
          </Text>
          <Text fontSize={15} color="black" textAlign="center" marginVertical={16}>
            Please enter your details to start a magical journey with Engineered Escape
          </Text>
        </View>
        <InputDemo size="Enter your name" handleChange={handleChange} id="name" />
        <InputDemo size="Enter your email" handleChange={handleChange} id="email" />
        <Form.Trigger
          asChild
          disabled={
            buttonState || loginDetails.name.length === 0 || loginDetails.email.length === 0
          }
          marginTop="$5"
        >
          <Button
            size="$5"
            theme={'active'}
            onPress={handlePress}
            backgroundColor="#F13B13"
            color={'white'}
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
        autoCapitalize="none"
      />
    </XStack>
  )
}
