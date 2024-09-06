import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { XStack, YStack, Text, Button, useTheme } from 'tamagui'
import { Bell } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'

export function BookmarksScreen() {
  const theme = useTheme()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack f={1} backgroundColor={'white'} p="$5" pt="$8">
          <XStack ai="center" jc="space-between" mb="$4">
            <Text fontSize="$6" fontWeight="bold">
              Bookmarks
            </Text>
          </XStack>

          <Text fontSize="$4" fontWeight="bold" mb="$4">
            Welcome to the Bookmarks Screen
          </Text>
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
