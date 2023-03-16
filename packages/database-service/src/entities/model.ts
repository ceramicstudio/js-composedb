import { Column, Entity, PrimaryColumn } from 'typeorm'

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

  @Column()
  description?: string

  @Column({ type: 'simple-json' })
  content!: unknown

  @Column()
  indexDocuments!: boolean
}
