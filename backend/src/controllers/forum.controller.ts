import { Request, Response, NextFunction } from "express";
import { ForumService } from "../services/forum.service";

const forumService = new ForumService();

export class ForumController {

  /**
   * GET /forum
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
        categoriaId,
        status,
        autorNome,
        texto,
        sort,
        order
      } = req.query;

      const posts = await forumService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
        autorNome: autorNome as string,
        status: status as string,
        texto: texto as string,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(posts);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const post = await forumService.buscar(id);

      res.status(200).json(post);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /forum
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const post = await forumService.criar(req.body);

      res.status(201).json({
        message: "Publicação criada com sucesso.",
        data: post
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /forum/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const post = await forumService.atualizar(
        id,
        req.body
      );

      res.status(200).json({
        message: "Publicação atualizada com sucesso.",
        data: post
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /forum/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await forumService.excluir(id);

      res.status(200).json({
        message: "Publicação removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/categoria/:categoriaId
   */
  async listarPorCategoria(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const categoriaId = Number(req.params.categoriaId);

      const posts =
        await forumService.listarPorCategoria(categoriaId);

      res.status(200).json(posts);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/status/:status
   */
  async listarPorStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const { status } = req.params;

      const posts =
        await forumService.listarPorStatus(String(status));

      res.status(200).json(posts);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/autor/:autorId
   */
  async listarPorAutor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const autorNome = String(req.params.autorNome);

    const posts = await forumService.listarPorAutor(autorNome);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

  /**
   * GET /forum/busca
   * ?texto=wifi
   */
  async pesquisar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const { texto } = req.query;

      const posts =
        await forumService.pesquisar(String(texto));

      res.status(200).json(posts);

    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /forum/:id/status
   */
  async alterarStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const { status } = req.body;

      const post =
        await forumService.alterarStatus(id, status);

      res.status(200).json({
        message: "Status atualizado com sucesso.",
        data: post
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/:id/comentarios
   */
  async listarComentarios(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const comentarios =
        await forumService.listarComentarios(id);

      res.status(200).json(comentarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/:id/curtidas
   */
  async listarCurtidas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const curtidas =
        await forumService.listarCurtidas(id);

      res.status(200).json(curtidas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/populares
   */
  async listarPopulares(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const posts =
        await forumService.listarPopulares();

      res.status(200).json(posts);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/recentes
   */
  async listarRecentes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const posts =
        await forumService.listarRecentes();

      res.status(200).json(posts);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /forum/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await forumService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}