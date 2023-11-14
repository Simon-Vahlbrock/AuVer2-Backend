import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Board } from "./Board"; // Import the Board entity
import { LabelTask } from "./LabelTask"; // Import the LabelTask entity
import { UserTask } from "./UserTask"; // Import the UserTask entity

@Entity({ name: "Task" })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  title: string;

  @Column("text", { nullable: true })
  text: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  creation_time: Date;

  @Column({ nullable: true })
  deletion_time: Date;

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  @OneToMany(() => LabelTask, (labelTask) => labelTask.task)
  labelTasks: LabelTask[];

  @OneToMany(() => UserTask, (userTask) => userTask.task)
  userTasks: UserTask[]; // Add this line to represent the relationship with UserTask
}
