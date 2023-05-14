import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import healthCheck from "./controllers/healthCheck";
import bomb from "./controllers/bomb";
import cors from "cors";
import btoa from "btoa";
globalThis.btoa = btoa;
const PORT = process.env.PORT ?? 3000;


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/health", healthCheck);
app.get("/bomb", bomb);

(async () => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
})();
