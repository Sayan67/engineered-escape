import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { XStack, YStack, Text, Avatar, Button, useTheme } from 'tamagui'
import { useNavigation } from '@react-navigation/native'

export function ProfileScreen() {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <YStack
          ai="center"
          jc="center"
          style={{ height: '100%', width: '100%' }}
          backgroundColor={'white'}
          p="$5"
          pt="$8"
        >
          <Avatar circular size="$10" mb="$4">
            <Avatar.Image
              source={{
                uri: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR5v-SBWNA4W3KIwVOu4KhEGgfApbflgLXWsrgtTsASqs2cw-wJsyaLoQaWc7fV8jEksnDqfvA3Bv5kco0',
              }}
            />
          </Avatar>
          <Text fontSize="$6" fontWeight="bold" mb="$2">
            Username
          </Text>
          <Text fontSize="$4" color="$gray10">
            Joined on January 1, 2023
          </Text>
          <Text fontSize="$4" color="$gray10" mb="$2">
            Number of Blogs Written: 10
          </Text>
          <Button mt="$4" onPress={() => navigation.goBack()}>
            Back
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
})
