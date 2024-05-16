import { defineStore } from "pinia"
import type { City, Province } from "~/server/utils/rajaongkir"

export const useShippingStore = defineStore('shipping_store', {
  state: () => ({
    provinces: [] as Array<Province>,
    cities: [] as Array<City>
  }),
  actions: {
    setCity(city: City[]) {
      this.cities.length = 0

      city.forEach(item => this.cities.push(item))
    },
    setProvince(province: Province[]) {
      this.provinces.length = 0

      province.forEach(item => this.provinces.push(item))
    }
  },
  persist: true
})