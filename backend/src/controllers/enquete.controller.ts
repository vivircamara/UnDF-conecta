import { Request, Response, NextFunction } from "express";
import { EnqueteService } from "../services/enquete.service";

const enqueteService = new EnqueteService();

export class EnqueteController {

  /**
   * GET /enquetes
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
        ativa,
        sort,
        order
      } = req.query;

      const enquetes = await enqueteService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        ativa: ativa ? ativa === "true" : undefined,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(enquetes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /enquetes/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const enquete = await enqueteService.buscar(id);

      res.status(200).json(enquete);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /enquetes
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const enquete = await enqueteService.criar(req.body);

      res.status(201).json({
        message: "Enquete criada com sucesso.",
        data: enquete
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /enquetes/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const enquete =
        await enqueteService.atualizar(id, req.body);

      res.status(200).json({
        message: "Enquete atualizada com sucesso.",
        data: enquete
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /enquetes/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await enqueteService.excluir(id);

      res.status(200).json({
        message: "Enquete removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /enquetes/:id/encerrar
   */
  async encerrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const enquete =
        await enqueteService.encerrar(id);

      res.status(200).json({
        message: "Enquete encerrada com sucesso.",
        data: enquete
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /enquetes/:id/opcoes
   */
  async listarOpcoes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const opcoes =
        await enqueteService.listarOpcoes(id);

      res.status(200).json(opcoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /enquetes/:id/votar
   */
  async votar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const enqueteId = Number(req.params.id);

      const resultado =
        await enqueteService.votar(
          enqueteId,
          req.body
        );

      res.status(200).json({
        message: "Voto registrado com sucesso.",
        data: resultado
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /enquetes/:id/resultado
   */
  async resultado(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const enqueteId = Number(req.params.id);

      const resultado =
        await enqueteService.resultado(enqueteId);

      res.status(200).json(resultado);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /enquetes/ativas
   */
  async listarAtivas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const enquetes =
        await enqueteService.listarAtivas();

      res.status(200).json(enquetes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /enquetes/finalizadas
   */
  async listarFinalizadas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const enquetes =
        await enqueteService.listarFinalizadas();

      res.status(200).json(enquetes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /enquetes/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await enqueteService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}