import type { GraphDefinition } from '@composedb/graph-codecs'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm'

import { Model } from './model.js'

@Entity()
export class Composite {
  @PrimaryColumn()
  id!: string

  @Column({ nullable: true })
  label?: string

  @Column({ nullable: true })
  description?: string

  @Column({ type: 'simple-json' })
  graph!: GraphDefinition

  @ManyToMany(() => Model, (model) => model.composites)
  @JoinTable()
  models!: Array<Relation<Model>>

  @Column()
  isEnabled!: boolean

  @Column()
  mutationsEnabled!: boolean

  @Column()
  subscriptionsEnabled!: boolean

  @CreateDateColumn()
  createdAt?: string

  @UpdateDateColumn()
  updatedAt?: string
}
