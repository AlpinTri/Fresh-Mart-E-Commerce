import Cart from "~/models/Cart"
import Category from "~/models/Category"
import Product from "~/models/Product"

export default defineEventHandler(async (event) => {
  try {
    const param = getRouterParam(event, '_id')

    const product = await Product.findOne({
      where: {
        id: param
      }
    })

    if (product !== null) {
      return {
        success: true,
        message: 'Success found product',
        data: product
      }
    } else {
      throw createError({
        statusCode: 404,
        message: 'Product not found'
      })
    }
  } catch (err) {
    console.log('product by id err =>' , err)
  }
})