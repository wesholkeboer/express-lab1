import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", itemsRouter);
const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));