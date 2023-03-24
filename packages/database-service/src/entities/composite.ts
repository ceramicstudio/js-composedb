import type { GraphDefinition } from '@composedb/graph-codecs'
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'

import { Model } from './model.js'

@Entity()
export class Composite {
  @PrimaryColumn()
  id!: string

  @Column({ nullable: true })
  description?: string

  @Column({ type: 'simple-json' })
  graph!: GraphDefinition

  @ManyToMany(() => Model, (model) => model.composites)
  @JoinTable()
  models!: Array<Model>

  @Column()
  enable!: boolean

  @Column()
  enableMutations!: boolean

  @Column()
  enableSubscriptions!: boolean
}
