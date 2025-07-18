import { Router } from "express";
import { __dirname } from "./index.js";
import path from "path";

const router = new Router();

router.get("/admin-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default router;
