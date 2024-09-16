import axios from 'axios'
const key = process.env.EXPO_PUBLIC_STRAPI_API_KEY

export async function createUser(name: string, email: string) {
  const response = axios.post(
    'https://strapi-prod-q6ba.onrender.com/api/customers',
    {
      data: {
        name: name,
        email: email,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  )
  return response
}
