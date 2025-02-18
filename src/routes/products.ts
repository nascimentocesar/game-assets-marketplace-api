import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
