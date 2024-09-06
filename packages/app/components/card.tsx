import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { XStack, YStack, Text, Input, Avatar, Card, Button, useTheme, Image } from 'tamagui'
import { StyleSheet } from 'react-native'

export function NewCard() {
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
        <XStack ai="center">
          <Image
            style={styles.thumbnail}
            source={{
              uri: 'https://img.freepik.com/free-photo/realistic-stacked-books-shelf_23-2151359536.jpg',
            }}
          />
          <YStack ml="$3">
            <Text fontSize="$5" fontWeight="bold">
              We want justice.
            </Text>
            <Text fontSize="$4" color="$gray10">
              Education
            </Text>
            <XStack ai="center" mt="$1">
              <Avatar circular size="$2" mr="$2">
                <Avatar.Image
                  source={{
                    uri: 'https://i0.wp.com/sportytell.com/wp-content/uploads/2018/11/Cristiano-Ronaldo-celebrates-with-2016-Euros-trophy-.jpg?zoom=1.25&resize=680%2C849&ssl=1',
                  }}
                />
              </Avatar>
              <Text fontSize="$3" color="$gray10">
                Sayan Das
              </Text>
              <Text fontSize="$3" color="$gray10" ml="$3">
                Sep 06, 2024
              </Text>
            </XStack>
          </YStack>
        </XStack>
      </Card>
      {/* Second Card */}
      <Card
        elevate
        animation="bouncy"
        size="$4"
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        bordered
        padding={'$4'}
        borderRadius="$8"
      >
        <XStack ai="center">
          <Image
            style={styles.thumbnail}
            source={{
              uri: 'https://img.freepik.com/free-photo/realistic-stacked-books-shelf_23-2151359536.jpg',
            }}
          />
          <YStack ml="$3">
            <Text fontSize="$5" fontWeight="bold">
              We want justice.
            </Text>
            <Text fontSize="$4" color="$gray10">
              Education
            </Text>
            <XStack ai="center" mt="$1">
              <Avatar circular size="$2" mr="$2">
                <Avatar.Image
                  source={{
                    uri: 'https://i0.wp.com/sportytell.com/wp-content/uploads/2018/11/Cristiano-Ronaldo-celebrates-with-2016-Euros-trophy-.jpg?zoom=1.25&resize=680%2C849&ssl=1',
                  }}
                />
              </Avatar>
              <Text fontSize="$3" color="$gray10">
                Sayan Das
              </Text>
              <Text fontSize="$3" color="$gray10" ml="$3">
                Sep 06, 2024
              </Text>
            </XStack>
          </YStack>
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
