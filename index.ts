import { AppDataSource } from "./DB/datasource";

AppDataSource.initialize()
  .then(() => {
    require("./server");
  })
  .catch((error) => console.log(error));
