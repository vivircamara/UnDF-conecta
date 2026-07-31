import { Router, Request, Response } from "express";
import prisma from "../config/database";

const router = Router();

/**
 * GET /api/health
 * Verifica se o servidor está de pé e se a conexão com o banco responde.
 * Útil para checar rapidamente o ambiente antes de testar os recursos de fato.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
