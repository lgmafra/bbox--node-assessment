import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import User from "./User";
import { v4 as uuidv4 } from "uuid";

@Entity("projects")
export default class Project extends BaseEntity {
  constructor() {
    super();
    if(!this.uuid) {
      this.uuid = uuidv4();
    }
  }

  @PrimaryColumn()
  uuid: string;

  @Column({ name: "description" })
  description: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "owner" })
  owner: User;

  @Column({ name: "created_at" })
  creationDate: Date = new Date();
}
