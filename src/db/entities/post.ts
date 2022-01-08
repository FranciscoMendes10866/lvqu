import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: "boolean", default: false })
  isPublished!: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}
