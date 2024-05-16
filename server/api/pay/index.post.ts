import Cart from "~/models/Cart"
import Order from "~/models/Order"
import Product from "~/models/Product"
import Transaction from "~/models/Transaction"
import createTransaction from "~/server/utils/midtrans"
import sequelize from "~/utils/db"

export default defineEventHandler(async (event) => {
  
  const t = await sequelize.transaction()
  try {
    const sessionCheckout: any[] | null = await useStorage('redis').getItem(`checkout:${event.context.user_id}`)
    const body = await readBody(event)

    if (sessionCheckout) {
      const transaction = await Transaction.create({
        user_id: event.context.user_id,
        total: parseFloat(body.total),
        address: body.address,
        status: 'pending'
      }, { transaction: t })


      for (const item of sessionCheckout){
        const product = await Product.findOne({
          where: {
            id: item.product_id
          },
          transaction: t
        })

        if (product !== null && product?.stock >= item.quantity) {
          
          product.stock -= item.quantity

          await product?.save({ transaction: t })

          await Order.create({
            product_id: item.product_id,
            transaction_id: transaction.id,
            quantity: item.quantity
          }, { transaction: t })
  
          await Cart.destroy({
            where: {
              id: item.id
            },
            transaction: t
          })
        } else {
          throw createError({
            message: ''
          })
        }
      }

      await createTransaction('qris', { order_id: transaction.id, gross_amount: parseInt(`${transaction.total}`) })

      await t.commit()

      return {
        success: true,
        message: 'Transaction created',
        data: {
          transaction_id: transaction.id
        }
      }
    }
  } catch (err) {
    await t.rollback()
    console.log(err)
  }

})