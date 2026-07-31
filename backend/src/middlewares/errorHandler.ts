// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  // JSON malformado no body (gerado pelo express.json())
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'JSON inválido no corpo da requisição.' });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Registro não encontrado.' });
      return;
    }
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Registro duplicado.', campos: err.meta?.target });
      return;
    }
  }

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
  });
}