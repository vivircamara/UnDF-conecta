import { Request, Response, NextFunction } from "express";
import { CategoriaEventoService } from "../services/categoriaEvento.service";

const categoriaEventoService = new CategoriaEventoService();

export class CategoriaEventoController {

  /**
   * GET /categorias-evento
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

      const categorias = await categoriaEventoService.listar({
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
   * GET /categorias-evento/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);

      const categoria = await categoriaEventoService.buscar(id);

      res.status(200).json(categoria);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /categorias-evento
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const categoria = await categoriaEventoService.criar(req.body);

      res.status(201).json({
        message: "Categoria criada com sucesso.",
        data: categoria
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /categorias-evento/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const id = Number(req.params.id);

      const categoria = await categoriaEventoService.atualizar(
        id,
        req.body
      );

      res.status(200).json({
        message: "Categoria atualizada com sucesso.",
        data: categoria
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /categorias-evento/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await categoriaEventoService.excluir(id);

      res.status(200).json({
        message: "Categoria removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-evento/:id/eventos
   */
  async listarEventos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const eventos = await categoriaEventoService.listarEventos(id);

      res.status(200).json(eventos);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-evento/nome/:nome
   */
  async buscarPorNome(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const { nome } = req.params;

      const categoria =
        await categoriaEventoService.buscarPorNome(String(nome));

      res.status(200).json(categoria);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-evento/com-eventos
   */
  async listarComEventos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const categorias =
        await categoriaEventoService.listarComEventos();

      res.status(200).json(categorias);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /categorias-evento/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await categoriaEventoService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}