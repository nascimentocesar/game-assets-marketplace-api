import { Router, Request, Response } from "express";
import os from "os";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`I am ${os.hostname()}`);
});

export default router;
