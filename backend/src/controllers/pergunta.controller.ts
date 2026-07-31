import { Request, Response, NextFunction } from "express";
import { PerguntaService } from "../services/pergunta.service";

const perguntaService = new PerguntaService();

export class PerguntaController {

  /**
   * GET /perguntas
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
        questionarioId,
        tipo,
        sort,
        order
      } = req.query;

      const perguntas = await perguntaService.listar({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        questionarioId: questionarioId ? Number(questionarioId) : undefined,
        tipo: tipo as string,
        sort: sort as string,
        order: order as "asc" | "desc"
      });

      res.status(200).json(perguntas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /perguntas/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const pergunta = await perguntaService.buscar(id);

      res.status(200).json(pergunta);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /perguntas
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const pergunta = await perguntaService.criar(req.body);

      res.status(201).json({
        message: "Pergunta criada com sucesso.",
        data: pergunta
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /perguntas/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const pergunta = await perguntaService.atualizar(
        id,
        req.body
      );

      res.status(200).json({
        message: "Pergunta atualizada com sucesso.",
        data: pergunta
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /perguntas/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await perguntaService.excluir(id);

      res.status(200).json({
        message: "Pergunta removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /perguntas/questionario/:questionarioId
   */
  async listarPorQuestionario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionarioId = Number(req.params.questionarioId);

      const perguntas =
        await perguntaService.listarPorQuestionario(questionarioId);

      res.status(200).json(perguntas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /perguntas/tipo/:tipo
   */
  async listarPorTipo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const { tipo } = req.params;

      const perguntas =
        await perguntaService.listarPorTipo(String(tipo));

      res.status(200).json(perguntas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /perguntas/:id/opcoes
   */
  async listarOpcoes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const opcoes =
        await perguntaService.listarOpcoes(id);

      res.status(200).json(opcoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /perguntas/:id/respostas
   */
  async listarRespostas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const respostas =
        await perguntaService.listarRespostas(id);

      res.status(200).json(respostas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /perguntas/:id/opcoes
   */
  async adicionarOpcao(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const perguntaId = Number(req.params.id);

      const opcao =
        await perguntaService.adicionarOpcao(
          perguntaId,
          req.body
        );

      res.status(201).json({
        message: "Opção adicionada com sucesso.",
        data: opcao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /perguntas/:id/opcoes/:opcaoId
   */
  async removerOpcao(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const perguntaId = Number(req.params.id);
      const opcaoId = Number(req.params.opcaoId);

      await perguntaService.removerOpcao(
        perguntaId,
        opcaoId
      );

      res.status(200).json({
        message: "Opção removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /perguntas/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await perguntaService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}