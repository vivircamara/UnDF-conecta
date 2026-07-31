import { Request, Response, NextFunction } from "express";
import { EventoService } from "../services/evento.service";

const eventoService = new EventoService();

export class EventoController {
  /**
   * GET /eventos
   * Lista todos os eventos
   */
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        page,
        limit,
        categoriaId,
        campus,
        curso,
        inicio,
        fim,
      } = req.query;

      const eventos = await eventoService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
        campus: campus as string,
        curso: curso as string,
        inicio: inicio as string,
        fim: fim as string,
      });

      res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /eventos/:id
   */
  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);

      const evento = await eventoService.buscar(id);

      res.status(200).json(evento);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /eventos
   */
  async criar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const evento = await eventoService.criar(req.body);

      res.status(201).json({
        message: "Evento criado com sucesso.",
        data: evento,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /eventos/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);

      const evento = await eventoService.atualizar(id, req.body);

      res.status(200).json({
        message: "Evento atualizado com sucesso.",
        data: evento,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /eventos/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);

      await eventoService.excluir(id);

      res.status(200).json({
        message: "Evento removido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /eventos/categoria/:categoriaId
   */
  async listarPorCategoria(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoriaId = Number(req.params.categoriaId);

      const eventos =
        await eventoService.listarPorCategoria(categoriaId);

      res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /eventos/campus/:campus
   */
  async listarPorCampus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { campus } = req.params;

      const eventos = await eventoService.listarPorCampus(String(campus));

      res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /eventos/proximos
   */
  async listarProximos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const eventos = await eventoService.listarProximos();

      res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }
}