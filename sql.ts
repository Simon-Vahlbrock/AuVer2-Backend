import "reflect-metadata";
import { AppDataSource } from "./DB/datasource";
import { Board } from "./DB/entities/Board";

export const getlool = async () => {
  const test = AppDataSource.getRepository(Board);
  console.log(await test.find());
};
