import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Label } from "./Label"; // Import the Label entity
import { Task } from "./Task"; // Import the Task entity

@Entity()
export class LabelTask {
  @PrimaryColumn()
  Label_id: number;

  @PrimaryColumn()
  Task_id: number;

  @ManyToOne(() => Label, (label) => label.labelTasks)
  @JoinColumn({ name: "Label_id" })
  label: Label;

  @ManyToOne(() => Task, (task) => task.labelTasks)
  @JoinColumn({ name: "Task_id" })
  task: Task;
}
