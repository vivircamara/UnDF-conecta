import { Request, Response, NextFunction } from "express";
import { QuestionarioService } from "../services/questionario.service";

const questionarioService = new QuestionarioService();

export class QuestionarioController {

  /**
   * GET /questionarios
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
        titulo,
        ativo,
        sort,
        order
      } = req.query;

      const questionarios = await questionarioService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        titulo: titulo as string,
        ativo: ativo ? ativo === "true" : undefined,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(questionarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /questionarios/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const questionario =
        await questionarioService.buscar(id);

      res.status(200).json(questionario);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /questionarios
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionario =
        await questionarioService.criar(req.body);

      res.status(201).json({
        message: "Questionário criado com sucesso.",
        data: questionario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /questionarios/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const questionario =
        await questionarioService.atualizar(id, req.body);

      res.status(200).json({
        message: "Questionário atualizado com sucesso.",
        data: questionario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /questionarios/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await questionarioService.excluir(id);

      res.status(200).json({
        message: "Questionário removido com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /questionarios/:id/encerrar
   */
  async encerrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const questionario =
        await questionarioService.encerrar(id);

      res.status(200).json({
        message: "Questionário encerrado com sucesso.",
        data: questionario
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /questionarios/:id/perguntas
   */
  async listarPerguntas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const perguntas =
        await questionarioService.listarPerguntas(id);

      res.status(200).json(perguntas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /questionarios/:id/respostas
   */
  async listarRespostas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const respostas =
        await questionarioService.listarRespostas(id);

      res.status(200).json(respostas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /questionarios/ativos
   */
  async listarAtivos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionarios =
        await questionarioService.listarAtivos();

      res.status(200).json(questionarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /questionarios/finalizados
   */
  async listarFinalizados(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionarios =
        await questionarioService.listarFinalizados();

      res.status(200).json(questionarios);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /questionarios/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await questionarioService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}