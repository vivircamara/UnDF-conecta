// src/middlewares/notFoundHandler.ts
import { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: 'Rota não encontrada.',
    path: req.originalUrl,
  });
}