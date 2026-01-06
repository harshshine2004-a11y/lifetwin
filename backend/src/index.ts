import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import messagesRouter from "./routes/messages";
import AppDataSource from "./data-source";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const app = express();
app.use(express.json());

// Connect to DB and then start server
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Azure SQL via TypeORM");
    app.use("/api/messages", messagesRouter);

    app.get("/", (_req, res) => {
      res.json({ status: "ok", message: "Lifetwin backend running" });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize DB connection:", err);
    process.exit(1);
  });
