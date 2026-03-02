import Kid from '#models/kid'
import { createKidValidator } from '#validators/kid'
import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { Readable } from 'node:stream'

export default class KidsController {
  async index({ inertia }: HttpContext) {
    const kids = await Kid.all()
    return inertia.render('admin/kids/index', {
      kids: kids,
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/kids/create', {})
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createKidValidator)
    await Kid.create({
      avatar: await attachmentManager.createFromFile(payload.avatar),
      firstName: payload.firstName.toLowerCase(),
      lastName: payload.lastName.toLowerCase(),
      age: payload.age,
    })
    return response.redirect().toRoute('kids.index')
  }

  async destroy({ params, response }: HttpContext) {
    const kid = await Kid.findOrFail(params.id)
    await kid.delete()
    return response.redirect().toRoute('kids.index')
  }

  async getAvatar({ params, response }: HttpContext) {
    const kid = await Kid.query()
      .where('first_name', params.name)
      .where('last_name', params.lastname)
      .firstOrFail()
    response.header('Content-Type', kid.avatar.mimeType)

    const stream = await kid.avatar.getStream()
    return response.stream(Readable.from(stream))
  }
}
