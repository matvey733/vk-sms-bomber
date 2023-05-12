import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { bomb } from "./bomb";
const app = express();
const PORT = process.env.PORT ?? 3001;

app.get("/", (req, res) => res.send("root"));
app.get("/bomb", bomb);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
