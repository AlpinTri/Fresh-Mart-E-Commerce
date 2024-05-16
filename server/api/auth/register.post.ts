import { H3Event } from 'h3'
import { z } from 'zod'
import User from '~/models/User'
import crypto from 'node:crypto'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  const schema = z.object({
    username: z.string().trim(),
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

      if (user === null) {
        const newUser = await User.create({
          username: data.username,
          nomor_hp: data.nomor_hp,
          password: data.password
        })

        const userData = newUser.toJSON()

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
          message: 'Success register',
          data: {
            username: userData.username,
            nomor_hp: userData.nomor_hp
          }
        }
      } else {
        throw createError({
          statusCode: 409,
          message: 'Nomor hp sudah digunakan'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
})
