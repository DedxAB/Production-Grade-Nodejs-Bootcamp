import { Request, Response } from "express";
import { logger } from "../utils/logger.js";

export function healthCheck(req: Request, res: Response) {
  logger.info("Health check pinged");
  res.json({ status: "ok", message: "Server is healthy ✅" });
}
