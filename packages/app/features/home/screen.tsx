import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { XStack, YStack, Text, Input, Avatar, Card, Button, useTheme, Image, Anchor } from 'tamagui'
import { Search, Bell } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'
import { NewCard } from 'packages/app/components/card'
import { TouchableOpacity } from 'react-native'
import { fetchBlogs } from '../api/fetchBlogs'
import { Link } from 'expo-router'

interface cardProp {
  data: {
    id: number
    attributes: {
      title: string
      content: string
      author: string
      date: string
      category: string
      image: {
        data: {
          attributes: {
            formats: {
              small: { url: string }
              thumbnail: { url: string }
            }
          }
        }
      }
    }
  }[]
}

export function HomeScreen() {
  const theme = useTheme()
  const [blogs, setBlogs] = React.useState<cardProp['data']>()
  useEffect(() => {
    async function fetchData() {
      try {
        const res = (await fetchBlogs()) as { data: cardProp }
        // console.log(res.data.data)
        if (res.data.data.length > 0) {
          setBlogs(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [blogs])
  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingTop: 8 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack f={1} backgroundColor={'#FFFFFF'} p="$5" pt="$8">
            {/* Fixed Header Section */}
            <YStack backgroundColor={'#FFFFFF'}>
              <XStack ai="center" jc="space-between" mb="$4">
                <Text fontSize="$6" fontWeight="bold" color="#F13B13">
                  Engineered escape
                </Text>
                <Bell size={24} />
              </XStack>

              <Input
                placeholder="Find interesting news"
                mb="$4"
                inputMode="search"
                borderRadius="$10"
              />

              <XStack mb="$6">
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <Button size="$2" style={styles.gap10}>
                    Top News
                  </Button>
                  <Button size="$2" style={styles.gap10}>
                    For You
                  </Button>
                  <Button size="$2" style={styles.gap10}>
                    Politics
                  </Button>
                  <Button size="$2" style={styles.gap10}>
                    Tech Talks
                  </Button>
                  <Button size="$2" style={styles.gap10}>
                    Cooking
                  </Button>
                </ScrollView>
              </XStack>
            </YStack>
            <YStack>
              <Card
                elevate
                animation="bouncy"
                size="$4"
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                mb="$4"
                padding={'$4'}
                borderRadius="$8"
              >
                <XStack>
                  <Card.Header padded>
                    <Button size="$3" theme="active">
                      Hot Topic
                    </Button>
                  </Card.Header>
                </XStack>
                <Card.Footer mb="$2" mt="$10">
                  <XStack flex={1} space gap={'$10'}>
                    <Text color="white" fontSize="$3">
                      34 blogs
                    </Text>
                    <Text color="white" fontSize="$3">
                      1720 followers
                    </Text>
                  </XStack>
                </Card.Footer>
                <Card.Footer>
                  <Text fontSize="$6" fontWeight="bold" mb="$2" color="#ffffff">
                    Engineered-Escape coming soon ft. Parentheses labs
                  </Text>
                </Card.Footer>
                <Card.Background style={styles.cardBackground}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: 'https://img.freepik.com/free-photo/realistic-stacked-books-shelf_23-2151359536.jpg',
                    }}
                  />
                </Card.Background>
              </Card>
              <XStack gap="$14" flex={1} justifyContent="space-between">
                <Text fontSize="$6" fontWeight="bold" mb="$4">
                  Recommended
                </Text>
                <Text fontSize="$6" fontWeight="bold" mb="$4" color="$gray10">
                  See More
                </Text>
              </XStack>
              <YStack gap="10">
                {blogs?.map((item, idx) => {
                  const title = item.attributes.title
                  const date = item.attributes.date
                  const image = item.attributes.image.data.attributes.formats.thumbnail.url
                  const author = item.attributes.author
                  const category = item.attributes.category

                  return (
                    <Link href={`/${item.id}`} key={idx}>
                      <NewCard
                        id={item.id}
                        title={title}
                        date={date}
                        image={image}
                        author={author}
                        category={category}
                      />
                    </Link>
                  )
                })}
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  scrollableContent: {
    marginTop: 180,
    backgroundColor: 'white',
  },
  scrollableContentContainer: {
    backgroundColor: 'white',
  },
  gap10: {
    marginRight: 10,
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
})
