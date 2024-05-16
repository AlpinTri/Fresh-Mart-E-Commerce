import getShippingInfo from "~/server/utils/rajaongkir"

export default defineEventHandler(async (event) => {
  try {
    const data = await getShippingInfo()

    if (data) {
      return {
        success: true,
        message: 'Success get shipping data',
        data: data
      }
    } else {
      throw createError({
        statusCode: 500,
        message: 'Internal server error'
      })
    }
  } catch (err) {
    console.error(err)
  }
})