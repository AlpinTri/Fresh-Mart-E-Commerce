import { QueryTypes } from "sequelize"
import Product from "~/models/Product"
import sequelize from "~/utils/db"

export default defineEventHandler(async (event) => {
  const sessionCheckout: any[] | null = await useStorage('redis').getItem(`checkout:${event.context.user_id}`)
  
  try { 
    if (sessionCheckout) {
      const data = []
      for (let i = 0; i < sessionCheckout.length; i++) {
        const searchDetailData = await Product.findOne({
          where: {
            id: sessionCheckout[i].product_id
          },
          attributes: ['name', 'price']
        })

        if (searchDetailData) {
          data.push({
            ...searchDetailData.toJSON(),
            ...sessionCheckout[i]
          })
        }

      }

      const subtotal = data.reduce((acc, val) => {
        return acc + (val.quantity * parseFloat(val.price))
      }, 0)

      return {
        success: true,
        message: 'Success get checkout items',
        data: {
          items: data,
          subtotal
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
})