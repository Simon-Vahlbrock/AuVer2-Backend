import express from "express";
import { getlool } from "./sql";

const app = express();

const PORT = process.env.PORT || 1627;

app.get("/", (req, res) => {
  getlool();
  res.send("Hello from server!");
});

app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 https://localhost:${PORT}`)
);
