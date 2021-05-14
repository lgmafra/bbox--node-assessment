import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export enum UserEvent {
  CREATION = 'CREATION',
  ACCEPTANCE = 'ACCEPTANCE',
  REFUSAL = 'REFUSLA'
}

@Entity('users')
export default class User extends BaseEntity {
  constructor () {
    super();
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }

  @PrimaryColumn()
  uuid: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: UserRole })
  role: UserRole = UserRole.CLIENT;

  @Column({ name: 'created_at' })
  creationDate: Date = new Date();

  @Column({ name: 'current_event', type: 'enum', enum: UserEvent })
  currentEvent: UserEvent = UserEvent.CREATION;

  @BeforeInsert()
  cryptPassword () {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
