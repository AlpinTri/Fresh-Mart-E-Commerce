export interface Province {
  province_id: string
  province: string
}

export interface City extends Province { 
  city_id: string
  type: string
  city_name: string
  postal_code: string
}

export type rajaongkirResponse = {
  rajaongkir: {
    query?: {},
    status: {
      code: number,
      description: string
    },
    results?: Array<Province | City>
  }
}

export type shippingData = {
  cities: Array<City>,
  province: Array<Province>
}


const getShippingInfo = async (): Promise<shippingData | null | undefined> => {
  const shipping: shippingData | null = await useStorage('redis').getItem('shippingProvince&City')

  if (!shipping) {

    const headers = new Headers()

    headers.append('key', (process.env.RAJA_ONGKIR_API_KEY as string))
    
    const [province, city] = await Promise.all<[Promise<rajaongkirResponse>, Promise<rajaongkirResponse>]>([
      $fetch(`${process.env.RAJA_ONGKIR_URL}/province`, {
        headers: headers
      }),
      $fetch(`${process.env.RAJA_ONGKIR_URL}/city`, {
        headers: headers
      })
    ])

    if (city.rajaongkir.status.code === 200 && province.rajaongkir.status.code === 200) {
      const data = {
        cities: city.rajaongkir.results,
        provinces: province.rajaongkir.results
      }

      await useStorage('redis').setItem('shippingProvince&City', JSON.stringify(data), { ttl: 60 * 60 * 24 * 7 })
    } else {
      return null
    }
  } else {
    return shipping
  }
}

export default getShippingInfo