import Product from "~/models/Product"

export default defineEventHandler(async (event) => {
  try {
    const products = await Product.findAll()

    return {
      success: true,
      message: 'Success get products',
      data: products
    }
  } catch (err) {
    console.log('prouct index err => ', err)
  }
})