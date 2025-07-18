import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import router from "./router.js";
import cors from "cors";
import { SetupWebsocket } from "./wss.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("", router);
SetupWebsocket(server);

app.listen(port, () => {
  console.log(`Server work's at http://localhost:${port}`);
});

export { __dirname };
