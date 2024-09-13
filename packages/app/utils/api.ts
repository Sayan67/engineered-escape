import axios from 'axios'

const KEY = process.env.API_KEY

export const fetchBlogPosts = async () => {
  // console.log('API Key:', KEY)

  try {
    const response = await axios.get('http://strapi-prod-q6ba.orender.com/api/blog-posts', {
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}
