import type { ContentDefinition } from '@composedb/model-codecs'
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, type Relation } from 'typeorm'

import { Composite } from './composite.js'
import { Document } from './document.js'

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

  @OneToMany(() => Document, (document) => document.model)
  documents?: Array<Relation<Document>>

  @ManyToMany(() => Composite, (composite) => composite.models)
  composites?: Array<Relation<Composite>>
}
