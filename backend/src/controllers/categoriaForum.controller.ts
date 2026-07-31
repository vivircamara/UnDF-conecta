import { Request, Response, NextFunction } from "express";
import { CategoriaForumService } from "../services/categoriaForum.service";

const categoriaForumService = new CategoriaForumService();

export class CategoriaForumController {

  /**
   * GET /categorias-forum
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
        nome,
        sort,
        order
      } = req.query;

      const categorias = await categoriaForumService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        nome: nome as string,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(categorias);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-forum/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const categoria =
        await categoriaForumService.buscar(id);

      res.status(200).json(categoria);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /categorias-forum
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const categoria =
        await categoriaForumService.criar(req.body);

      res.status(201).json({
        message: "Categoria criada com sucesso.",
        data: categoria
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /categorias-forum/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const categoria =
        await categoriaForumService.atualizar(id, req.body);

      res.status(200).json({
        message: "Categoria atualizada com sucesso.",
        data: categoria
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /categorias-forum/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await categoriaForumService.excluir(id);

      res.status(200).json({
        message: "Categoria removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-forum/:id/publicacoes
   */
  async listarPublicacoes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const publicacoes =
        await categoriaForumService.listarPublicacoes(id);

      res.status(200).json(publicacoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-forum/nome/:nome
   */
  async buscarPorNome(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const { nome } = req.params;

      const categoria =
        await categoriaForumService.buscarPorNome(String(nome));

      res.status(200).json(categoria);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-forum/com-publicacoes
   */
  async listarComPublicacoes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const categorias =
        await categoriaForumService.listarComPublicacoes();

      res.status(200).json(categorias);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-forum/mais-utilizadas
   */
  async listarMaisUtilizadas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const categorias =
        await categoriaForumService.listarMaisUtilizadas();

      res.status(200).json(categorias);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-forum/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await categoriaForumService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}