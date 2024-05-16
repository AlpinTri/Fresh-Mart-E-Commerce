import { z } from "zod"
import User from "~/models/User"
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const schema = z.object({
    nomor_hp: z.string().min(12),
    password: z.string().trim()
  }).required()

  const { data } = schema.safeParse(body)
  
  if (data) {
    try {
      const user = await User.findOne({
        where: {
          nomor_hp: data.nomor_hp
        }
      })

      if (user !== null) {
        const userData = user.toJSON()
        const id = crypto.randomUUID()
        const timeToActive = 60 * 60 * 24 * 7

        setCookie(event, 'fresh_mart_authorization', id, {
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: timeToActive
        })

        await useStorage('redis').setItem(id, userData.id, { ttl: timeToActive })

        return {
          success: true,
          message: 'Success login',
          data: {
            username: userData.username,
            nomor_hp: userData.nomor_hp
          }
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
})