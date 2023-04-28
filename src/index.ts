import express from "express";
import { bomb } from "./bomb";
const app = express();

app.get("/bomb", bomb);
