import syncRelation from "./models"
import db from './utils/db'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt"
  ],
  css: [
    '~/assets/css/main.css'
  ],
  hooks: {
    ready: async (nuxt) => {
      try {
        await db.authenticate()
        await db.sync()
        syncRelation()
      } catch (err) {
        console.error('Hooks error =>', err)
      }
    }
  },
  nitro: {
    storage: {
      redis: {
        driver: 'redis'
      }
    }
  }
})