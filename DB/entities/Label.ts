import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LabelTask } from "./LabelTask"; // Import the LabelTask entity

@Entity({ name: "Label" })
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  creation_time: Date;

  @Column({ nullable: true })
  deletion_time: Date;

  @OneToMany(() => LabelTask, (labelTask) => labelTask.label)
  labelTasks: LabelTask[];
}
