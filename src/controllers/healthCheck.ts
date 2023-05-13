import { Request, Response } from "express";

export default function healthCheck(req: Request, res: Response) {
  res.status(200);
  res.end();
}