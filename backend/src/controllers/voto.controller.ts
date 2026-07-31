import { Request, Response, NextFunction } from "express";
import { VotoService } from "../services/voto.service";

const votoService = new VotoService();

export class VotoController {

  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, postId, usuarioIdentificador, sort, order } = req.query;

      const votos = await votoService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        postId: postId ? Number(postId) : undefined,
        usuarioIdentificador: usuarioIdentificador as string,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(votos);
    } catch (error) {
      next(error);
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const voto = await votoService.buscar(id);
      res.status(200).json(voto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /votos
   * { "postId": 1, "usuarioIdentificador": "mock-user-1" }
   */
  async criar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const voto = await votoService.criar(req.body);
      res.status(201).json({ message: "Curtida registrada com sucesso.", data: voto });
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await votoService.excluir(id);
      res.status(200).json({ message: "Curtida removida com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /votos/post/:postId/usuario/:usuarioIdentificador
   */
  async removerCurtida(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const postId = Number(req.params.postId);
    const usuarioIdentificador = String(req.params.usuarioIdentificador);

    await votoService.removerCurtida(postId, usuarioIdentificador);

    res.status(200).json({ message: "Curtida removida com sucesso." });
  } catch (error) {
    next(error);
  }
}

  async listarPorPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postId = Number(req.params.postId);
      const votos = await votoService.listarPorPost(postId);
      res.status(200).json(votos);
    } catch (error) {
      next(error);
    }
  }

  async quantidadePorPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postId = Number(req.params.postId);
      const quantidade = await votoService.quantidadePorPost(postId);
      res.status(200).json(quantidade);
    } catch (error) {
      next(error);
    }
  }

  /**
 * GET /votos/post/:postId/usuario/:usuarioIdentificador
 */
async verificarCurtida(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const postId = Number(req.params.postId);
    const usuarioIdentificador = String(req.params.usuarioIdentificador);

    const curtido = await votoService.verificarCurtida(postId, usuarioIdentificador);

    res.status(200).json({ curtido });
  } catch (error) {
    next(error);
  }
}

  async estatisticas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const estatisticas = await votoService.estatisticas();
      res.status(200).json(estatisticas);
    } catch (error) {
      next(error);
    }
  }
}