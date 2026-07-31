import { Request, Response, NextFunction } from "express";
import { ComentarioService } from "../services/comentario.service";

const comentarioService = new ComentarioService();

export class ComentarioController {

  /**
   * GET /comentarios
   */
  async listar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const {
        page,
        limit,
        postId,
        autorNome,
        oficial,
        sort,
        order
      } = req.query;

      const comentarios = await comentarioService.listar({
       page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        postId: postId ? Number(postId) : undefined,
        autorNome: autorNome as string,
        oficial: oficial ? oficial === "true" : undefined,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(comentarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /comentarios/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const comentario =
        await comentarioService.buscar(id);

      res.status(200).json(comentario);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /comentarios
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const comentario =
        await comentarioService.criar(req.body);

      res.status(201).json({
        message: "Comentário criado com sucesso.",
        data: comentario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /comentarios/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const comentario =
        await comentarioService.atualizar(id, req.body);

      res.status(200).json({
        message: "Comentário atualizado com sucesso.",
        data: comentario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /comentarios/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await comentarioService.excluir(id);

      res.status(200).json({
        message: "Comentário removido com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /comentarios/post/:postId
   */
  async listarPorPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const postId = Number(req.params.postId);

      const comentarios =
        await comentarioService.listarPorPost(postId);

      res.status(200).json(comentarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /comentarios/autor/:autorId
   */
  
  async listarPorAutor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const autorNome = String(req.params.autorNome);

    const comentarios = await comentarioService.listarPorAutor(autorNome);

    res.status(200).json(comentarios);
  } catch (error) {
    next(error);
  }
}

  /**
   * PATCH /comentarios/:id/oficial
   */
  async marcarComoOficial(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const comentario =
        await comentarioService.marcarComoOficial(id);

      res.status(200).json({
        message: "Comentário marcado como oficial.",
        data: comentario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /comentarios/:id/desoficializar
   */
  async removerOficial(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const comentario =
        await comentarioService.removerOficial(id);

      res.status(200).json({
        message: "Comentário oficial removido.",
        data: comentario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /comentarios/oficiais
   */
  async listarOficiais(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const comentarios =
        await comentarioService.listarOficiais();

      res.status(200).json(comentarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /comentarios/recentes
   */
  async listarRecentes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const comentarios =
        await comentarioService.listarRecentes();

      res.status(200).json(comentarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /comentarios/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await comentarioService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}