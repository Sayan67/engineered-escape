import React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { XStack, YStack, Text, Input, Avatar, Card, Button, useTheme, Image } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'
import { useBookmarks } from 'app/features/bookmarks/context'

export function NewCard() {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()

  const cardData = {
    id: 1,
    title: 'We want justice.',
    category: 'Education',
    uri: 'https://img.freepik.com/free-photo/realistic-stacked-books-shelf_23-2151359536.jpg',
    author: 'Sayan Das',
    date: 'Sep 06, 2024',
  }

  const isBookmarked = (cardId) => bookmarks.some((card) => card.id === cardId)

  const handleBookmarkToggle = (card) => {
    if (isBookmarked(card.id)) {
      removeBookmark(card.id)
    } else {
      addBookmark(card)
    }
  }

  return (
    <YStack space="$4" backgroundColor={'#FFFFFF'}>
      {/* First Card */}
      <Card
        backgroundColor={'#FFFFFF'}
        elevate
        animation="bouncy"
        size="$4"
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        padding={'$4'}
        borderRadius="$8"
      >
        <XStack ai="center" justifyContent="space-between">
          <XStack ai="center">
            <Image
              style={styles.thumbnail}
              source={{
                uri: cardData.uri,
              }}
            />
            <YStack ml="$3">
              <Text fontSize="$5" fontWeight="bold">
                {cardData.title}
                <XStack ai="center" jc="space-between">
                  <TouchableOpacity onPress={() => handleBookmarkToggle(cardData)}>
                    <Ionicons
                      name={isBookmarked(cardData.id) ? 'bookmark' : 'bookmark-outline'}
                      size={24}
                      color="black"
                      style={{ marginLeft: 25, marginBottom: -5 }}
                    />
                  </TouchableOpacity>
                </XStack>
              </Text>
              <Text fontSize="$4" color="$gray10">
                {cardData.category}
              </Text>
              <XStack ai="center" mt="$1">
                <Text fontSize="$3" color="$gray10">
                  {cardData.author}
                </Text>
                <Text fontSize="$3" color="$gray10" ml="$3">
                  {cardData.date}
                </Text>
              </XStack>
            </YStack>
          </XStack>
        </XStack>
      </Card>
    </YStack>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
})
