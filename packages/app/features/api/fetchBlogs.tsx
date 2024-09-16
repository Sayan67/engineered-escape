import axios from 'axios'
const key = process.env.EXPO_PUBLIC_STRAPI_API_KEY

export async function fetchBlogs() {
  const response = axios.get('https://strapi-prod-q6ba.onrender.com/api/blog-posts?populate=*', {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })
  return response
}
