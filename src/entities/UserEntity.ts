import { hashSync } from "bcrypt";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUser } from "../models/IUser";
import { ROLES } from "../utils/enums/ROLES.enum";
import { PostEntity } from "./PostEntity";

@Entity("User")
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", default: ROLES.CUSTOMER })
  role: ROLES;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  // Relations
  @OneToMany(() => PostEntity, (post) => post.author)
  post: PostEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hashSync(this.password, 10);
  }
}
