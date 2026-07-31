import { Request, Response, NextFunction } from "express";
import { OpcaoEnqueteService } from "../services/opcaoEnquete.service";

const opcaoEnqueteService = new OpcaoEnqueteService();

export class OpcaoEnqueteController {

  /**
   * GET /opcoes-enquete
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
        enqueteId,
        sort,
        order
      } = req.query;

      const opcoes = await opcaoEnqueteService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        enqueteId: enqueteId ? Number(enqueteId) : undefined,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(opcoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /opcoes-enquete/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const opcao =
        await opcaoEnqueteService.buscar(id);

      res.status(200).json(opcao);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /opcoes-enquete
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const opcao =
        await opcaoEnqueteService.criar(req.body);

      res.status(201).json({
        message: "Opção criada com sucesso.",
        data: opcao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /opcoes-enquete/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const opcao =
        await opcaoEnqueteService.atualizar(id, req.body);

      res.status(200).json({
        message: "Opção atualizada com sucesso.",
        data: opcao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /opcoes-enquete/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await opcaoEnqueteService.excluir(id);

      res.status(200).json({
        message: "Opção removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /opcoes-enquete/enquete/:enqueteId
   */
  async listarPorEnquete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const enqueteId = Number(req.params.enqueteId);

      const opcoes =
        await opcaoEnqueteService.listarPorEnquete(enqueteId);

      res.status(200).json(opcoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /opcoes-enquete/:id/incrementar
   */
  async incrementarVotos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const opcao =
        await opcaoEnqueteService.incrementarVotos(id);

      res.status(200).json({
        message: "Voto contabilizado com sucesso.",
        data: opcao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /opcoes-enquete/:id/percentual
   */
  async percentual(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const percentual =
        await opcaoEnqueteService.percentual(id);

      res.status(200).json(percentual);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /opcoes-enquete/mais-votada
   */
  async maisVotada(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const opcao =
        await opcaoEnqueteService.maisVotada();

      res.status(200).json(opcao);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /opcoes-enquete/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await opcaoEnqueteService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}
