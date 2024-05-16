import checkSession from "~/server/utils/check-session"

export default defineEventHandler(async (event) => {
  try {
    const protectedAPI = ['/cart', '/cart/checkout', '/api/cart', '/api/cart/checkout', '/api/pay']

    if (protectedAPI.includes(event.path)) {
      const isValidSession = await checkSession(event)
      
      if (!isValidSession) {
        deleteCookie(event, 'fresh_mart_authorization')
        if (event.method === 'GET') {
          return sendRedirect(event, '/auth/login')
        } else {
          throw createError({
            statusCode: 401,
            message: 'Unauthorize, please login'
          })
        }
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      if (event.method === 'GET') {
        
      }
    }
  }
})