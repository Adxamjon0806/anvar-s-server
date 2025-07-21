import express from "express";
import path from "path";
import https from "https";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import router from "./router.js";
import cors from "cors";
import { SetupWebsocket } from "./wss.js";
import mongoose from "mongoose";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = 3000;
const DbUrl = process.env.DbURL;

const sslOptions =
  process.env.develop_procces === "development"
    ? {
        key: fs.readFileSync("./key.pem"),
        cert: fs.readFileSync("./cert.pem"),
      }
    : {};

console.log(sslOptions);

const server = https.createServer(sslOptions, app);

app.use(express.json());
app.use(cors());
app.use("", router);
SetupWebsocket(server);

const start = async () => {
  try {
    await mongoose.connect(DbUrl);

    server.listen(port, () => {
      console.log(`Server work's at https://localhost:${port}`);
    });
  } catch (e) {
    console.error("Failed to start the server", e.message);
  }
};

start();
export { __dirname };
