import { Op } from "sequelize"
import Cart from "~/models/Cart"
import Product from "~/models/Product"

export default defineEventHandler(async (event) => {
  try {
    const { product_id } = await readBody(event)

    const product = await Product.findOne({
      where: {
        id: product_id,
        stock: {
          [Op.gt]: 0
        }
      }
    })

    
    if (product !== null) {
      const [cartItem, created] = await Cart.findOrCreate({
        where: {
          user_id: event.context.user_id,
          product_id
        },
        defaults: {
          user_id: event.context.user_id,
          product_id,
          quantity: 1
        }
      })

      if (!created) {
        await cartItem.update({
          quantity: cartItem.quantity + 1
        })
      }

      const total = await Cart.count({
        where: {
          user_id: event.context.user_id
        }
      })

      return {
        success: true,
        message: 'Product added to box',
        data: total
      }
    }
  } catch (err) {
    
  }
})