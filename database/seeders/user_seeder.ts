import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: "admin@efrei.net",
      fullName: "Admin",
      password: "admin",
    })
  }
}
