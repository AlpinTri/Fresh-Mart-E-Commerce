import { rajaongkirResponse } from "~/server/utils/rajaongkir"

type cost = {
  code: string,
  name: string,
  costs: Array<{
    service: string,
    description: string,
    cost: Array<{value: number, etd: string, note: string}>
  }>
  
}

interface rajaongkirCostResponse {
  rajaongkir: {
    query?: {},
    status: {
      code: number,
      description: string
    },
    results?: Array<cost>
  }
}

export default defineEventHandler(async (event) => {
  try {
    const queries = getQuery(event)
    const origin = {
      city_id: '171',
      province_id: '9'
    }

    if (queries.city && queries.courier) {
      const headers = new Headers()
      headers.append('key', (process.env.RAJA_ONGKIR_API_KEY as string))

      if (origin) {
        const response: rajaongkirCostResponse | undefined = await $fetch(`${process.env.RAJA_ONGKIR_URL}/cost`, {
          headers,
          body: {
            destination: queries.city,
            origin: origin.city_id,
            weight: 1000,
            courier: queries.courier
          },
          method: 'POST'
        })
  
        if (response) {
          if (response.rajaongkir.status.code === 200) {
            return {
              success: true,
              message: 'Success get cost',
              data: response.rajaongkir.results
            }
          }
        }  
      }
    }
  } catch (error) {
    console.log(error)
  }
})
