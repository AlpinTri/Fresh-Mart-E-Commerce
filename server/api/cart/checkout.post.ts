import { Op } from "sequelize"
import Cart from "~/models/Cart"
import Product from "~/models/Product"

export default defineEventHandler(async (event) => {
  try {
    const cartsId = await readBody(event)
    const list = []
  
    if (cartsId.items) {
      const id: any[] = cartsId.items
  
      for (let i = 0; i < id.length; i++){
        const cartItem = await Cart.findOne({
          where: {
            id: id[i],
            user_id: event.context.user_id
          }
        })
  
        if (cartItem !== null) {
          const product = await Product.findOne({
            where: {
              id: cartItem.product_id,
              stock: {
                [Op.gte]: cartItem.quantity 
              }
            }
          })
  
  
          if (product !== null) {
            list.push(cartItem.toJSON())
          }
        }
      }
  
      await useStorage('redis').setItem(`checkout:${event.context.user_id}`, JSON.stringify(list), {
        ttl: 60 * 60 * 24
      })

      return {
        success: true,
        message: 'Success to add session checkout'
      }
    }
  } catch (err) {
    console.error(err)
  }
})