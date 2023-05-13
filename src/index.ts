import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import healthCheck from "./controllers/healthCheck";
import bomb from "./controllers/bomb";
dotenv.config();
const PORT = process.env.PORT ?? 3000;
import btoa from "btoa";
globalThis.btoa = btoa;


const app = express();

app.use(express.json());

app.get("/health", healthCheck);
app.get("/bomb", bomb);

(async () => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
})();
