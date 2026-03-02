import { KidSchema } from '#database/schema'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

export default class Kid extends KidSchema {
  @attachment({preComputeUrl: true})
  declare avatar: Attachment
}
