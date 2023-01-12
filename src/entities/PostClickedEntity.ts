import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IPostClicked } from "../models/IPostClicked";
import { CATEGORY } from "../utils/enums/CATEGORY.enum";

@Entity("post_clicked")
export class PostClickedEntity extends BaseEntity implements IPostClicked {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  post_title: string;

  @Column({ type: "text", nullable: true })
  post_category: CATEGORY;

  @CreateDateColumn({
    type: "time",
    default: () => "CURRENT_TIMESTAMP(0)",
  })
  date: Date;
}
