import type { ContentDefinition } from '@composedb/model-codecs'
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm'

import { Composite } from './composite.js'

@Entity()
export class Model {
  @PrimaryColumn()
  id!: string

  @Column()
  controller!: string

  @Column()
  version!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  description?: string

  @Column({ type: 'simple-json' })
  content!: ContentDefinition

  @Column()
  indexDocuments!: boolean

  @ManyToMany(() => Composite, (composite) => composite.models)
  composites?: Array<Composite>
}
