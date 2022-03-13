import express, { Request, Response } from "express";
import { NotFoundError } from "@sage-mode/common";

const router = express.Router();

router.get("/api/orders/:orderId", async (req: Request, res: Response) => {
  res.send({});
});

export { router as getOneOrderRouter };
