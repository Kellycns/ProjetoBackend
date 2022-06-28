import express from "express"
import database from "./config/database.js"
import userRouter from "./routes/userRouter.js"
import dotenv from "dotenv-safe"

dotenv.config()

//database.on("open", () => console.log("Conexão aceita com sucesso!"))
//database.on("erro", () => console.log("Ops! Houve algum erro!"))

const app = express();
app.use(express.json());
app.use("/user", userRouter);

export default app;