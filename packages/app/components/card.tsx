import React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { XStack, YStack, Text, Input, Avatar, Card, Button, useTheme, Image } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import { useBookmarks } from '../features/bookmarks/context'

export function NewCard(props: {
  id: number
  title: string
  // content?: string
  author?: string
  date?: string
  category?: string
  image?: string
}) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()

  function isBookmarked(cardId: number) {
    return bookmarks.some((val) => val.blogId === cardId)
  }

  const handleBookmarkToggle = (cardID: number, title: string) => {
    if (isBookmarked(cardID)) {
      removeBookmark(cardID)
    } else {
      addBookmark(cardID, title)
    }
  }

  return (
    <Card
      backgroundColor={'#FFFFFF'}
      elevate
      animation="bouncy"
      size="$4"
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      padding={'$4'}
      borderRadius="$8"
      width={'100%'}
    >
      <XStack ai="center" justifyContent="space-between">
        <XStack ai="center">
          <Image
            style={styles.thumbnail}
            source={{
              uri: props.image,
            }}
          />
          <YStack ml="$3">
            <Text fontSize="$5" fontWeight="bold" justifyContent="center">
              {props.title}
              <TouchableOpacity onPress={() => handleBookmarkToggle(props.id, props.title)}>
                <Ionicons
                  name={isBookmarked(props.id) ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </Text>
            <Text fontSize="$4" color="$gray10">
              {props.category}
            </Text>
            <XStack ai="center" mt="$1">
              <Text fontSize="$3" color="$gray10">
                {props.author}
              </Text>
              <Text fontSize="$3" color="$gray10" ml="$3">
                {props.date}
              </Text>
            </XStack>
          </YStack>
        </XStack>
      </XStack>
    </Card>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
})
