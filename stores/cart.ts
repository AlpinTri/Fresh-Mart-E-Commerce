import { defineStore } from "pinia"

export const useCartStore = defineStore('cart', {
  state: () => ({
    totalItems: 0
  }),
  actions: {
    addItems(count: number) {
      this.totalItems += count
    },
    setItems(total: number) {
      this.totalItems = total
    }
  },
  persist: true
})