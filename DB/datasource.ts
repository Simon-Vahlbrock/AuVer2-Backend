import { DataSource } from "typeorm";
import { Board } from "./entities/Board";
import { Label } from "./entities/Label";
import { LabelTask } from "./entities/LabelTask";
import { Task } from "./entities/Task";
import { User } from "./entities/User";
import { UserTask } from "./entities/UserTask";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",

  port: 3306,
  username: "root",
  password: "3333",
  database: "AUVER2_DB",
  synchronize: false,
  logging: false,
  entities: [User, Board, Label, LabelTask, Task, UserTask],
  subscribers: [],
  migrations: [],
});
