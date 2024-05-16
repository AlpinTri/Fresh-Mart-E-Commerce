import { H3Event } from 'h3'

export default async function checkSession(event: H3Event) {
  try {
    
    const sessionId = getCookie(event, 'fresh_mart_authorization')
  
    if (sessionId) {
      const findIdFromRedis = await useStorage('redis').getItem(sessionId)
  
      if (findIdFromRedis !== null) {
        event.context.user_id = findIdFromRedis
        return Promise.resolve(true)
      } else {      
        return Promise.resolve(false)
      }
    } else {
      return Promise.resolve(false)
    }
  } catch (err) {
    console.log('check session =>', err)
  }
}