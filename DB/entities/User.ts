import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { UserTask } from "./UserTask"; // Import the UserTask entity

@Entity({ name: "User" })
export class User {
  @PrimaryColumn()
  user_name: string;

  @Column()
  password: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  creation_time: Date;

  @Column({ nullable: true })
  deletion_time: Date;

  @OneToMany(() => UserTask, (userTask) => userTask.user)
  userTasks: UserTask[];
}
