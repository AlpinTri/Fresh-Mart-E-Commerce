import crypto from 'node:crypto'

interface TransactionDetail {
  order_id: string,
  gross_amount: number,
}

interface Response {
  status_code: string
  transaction_status?: string,
  actions?: [
      {
          name: string,
          method: string,
          url: string
      }
  ]
}

export default async function createTransaction(payment_type: string, transaction_details: TransactionDetail ) {
  const midtransURL = process.env.MIDTRANS_URL
  const token = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`)
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Basic ${token}`
  })

  if (payment_type === 'qris') {
    const response: Response = await $fetch(midtransURL as string, {
      method: 'POST',
      headers,
      body: {
        payment_type,
        transaction_details,
        qris: {
          acquirer: 'gopay'
        },
        custom_expiry: {
          unit: 'hour',
          expiry_duration: 7
        }
      }
    })

    console.log(response)
  }
}