import { QueryTypes } from "sequelize"
import Cart from "~/models/Cart"
import Product from "~/models/Product"
import sequelize from "~/utils/db"

export default defineEventHandler(async (event) => {
  try {
    // const {count, rows} = await Cart.findAndCountAll({
    //   where: {
    //     user_id: event.context.user_id
    //   }
    // })

    // console.log('cart =>', (await cartItems.getProduct()))
    // console.log(cartItems[0].getProduct())

    // const cartItemsWithDetail = await rows.reduce(async (acc, val) => {
    //   const accPr = await acc
    //   const productDetail = await Product.findOne({
    //     where: {
    //       id: val.id
    //     }
    //   })

    //   val.product = productDetail

    //   accPr.push(val)

    //   return accPr
    // }, Promise.resolve([]))

    const cartItems = await sequelize.query(`SELECT cart_items.id, cart_items.product_id, cart_items.quantity, products.name, products.price FROM cart_items LEFT JOIN products ON cart_items.product_id = products.id WHERE cart_items.user_id = '${event.context.user_id}'`, {
      type: QueryTypes.SELECT
    })

    return {
      success: true,
      message: 'Success get cart items',
      data: cartItems
    }
  } catch (err) {
    console.log(err)
  }
})