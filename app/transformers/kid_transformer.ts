import type Kid from '#models/kid'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class KidTransformer extends BaseTransformer<Kid> {
  toObject() {
    return this.pick(this.resource, ['id', 'firstName', 'lastName', 'avatar', 'age', 'createdAt'])
  }
}
