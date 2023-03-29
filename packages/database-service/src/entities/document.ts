import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Model } from './model.js'

@Entity()
@Index(['documentId', 'key'], { unique: true })
export class IndexedStringField {
  @Column()
  documentId!: string

  @ManyToOne(() => Document, (document) => document.stringFields)
  document?: Document

  @Column()
  key!: string

  @Column()
  value!: string
}

@Entity()
@Index(['modelId', 'controller', 'unique'], { unique: true })
export class Document<Content extends Record<string, unknown> = Record<string, unknown>> {
  @PrimaryColumn()
  id!: string

  @Column()
  @Index()
  cursor!: string

  @Column()
  unique!: string

  @Column()
  @Index()
  controller!: string

  @Column()
  @Index()
  modelId!: string

  @ManyToOne(() => Model, (model) => model.documents)
  model?: Model

  @Column()
  tip!: string

  @Column({ type: 'simple-json' })
  content!: Content

  @OneToMany(() => IndexedStringField, (field) => field.document)
  stringFields?: Array<IndexedStringField>

  @CreateDateColumn()
  firstIndexedAt?: Date

  @UpdateDateColumn()
  lastUpdatedAt?: Date
}
