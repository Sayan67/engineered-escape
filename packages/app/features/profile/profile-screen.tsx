import React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { XStack, YStack, Text, Avatar, Button, useTheme } from 'tamagui'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function ProfileScreen() {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack f={1} backgroundColor={'white'} p="$5" pt="$8">
          <XStack ai="center" jc="space-between" mb="$4">
            <Button onPress={() => navigation.goBack()}>Back</Button>
            <Avatar circular size="$5">
              <Avatar.Image
                source={{
                  uri: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR5v-SBWNA4W3KIwVOu4KhEGgfApbflgLXWsrgtTsASqs2cw-wJsyaLoQaWc7fV8jEksnDqfvA3Bv5kco0',
                }}
              />
            </Avatar>
          </XStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  gap10: {
    marginRight: 10,
  },
})
