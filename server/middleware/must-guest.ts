export default defineEventHandler(async (event) => {
  try {
    const cookie = getCookie(event, 'fresh_mart_authorization')

    if (event.path.startsWith('/auth') && cookie) {
      const sessionId = await useStorage('redis').getItem(cookie)
      
      if (!sessionId) {
        deleteCookie(event, 'fresh_mart_authorization')
      } else {
        return sendRedirect(event, '/')
      }
    }
  } catch (err) {
    console.log(err)
  }
})