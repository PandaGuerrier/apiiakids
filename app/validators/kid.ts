import vine from '@vinejs/vine'

export const createKidValidator = vine.create({
  firstName: vine.string().trim().minLength(1),
  lastName: vine.string().trim().minLength(1),
  avatar: vine.file({
    size: '200mb',
    extnames: ['jpg', 'jpeg', 'png', 'gif'],
  }),
  age: vine.number().positive().optional().nullable(),
})
