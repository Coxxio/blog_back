import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IPost } from "../models/IPost";
import { CATEGORY } from "../utils/enums/CATEGORY.enum";
import { UserEntity } from "./UserEntity";

@Entity("post")
export class PostEntity extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "varchar" })
  resume: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "text", nullable: true })
  category: CATEGORY;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  pub_date: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (author) => author.post, { eager: true })
  author: UserEntity;
}
