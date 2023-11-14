import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User"; // Import the User entity
import { Task } from "./Task"; // Import the Task entity

@Entity({ name: "User_Task" })
export class UserTask {
  @PrimaryColumn()
  User_user_name: string;

  @PrimaryColumn()
  Task_id: number;

  @ManyToOne(() => User, (user) => user.userTasks)
  @JoinColumn({ name: "User_user_name" })
  user: User;

  @ManyToOne(() => Task, (task) => task.userTasks)
  @JoinColumn({ name: "Task_id" })
  task: Task;
}
