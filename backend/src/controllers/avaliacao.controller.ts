import { Request, Response, NextFunction } from "express";
import { AvaliacaoService } from "../services/avaliacao.service";

const avaliacaoService = new AvaliacaoService();

export class AvaliacaoController {

  /**
   * GET /avaliacoes/:id
   */
  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const avaliacao = await avaliacaoService.buscar(id);

      res.status(200).json(avaliacao);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /avaliacoes
   */
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const avaliacao = await avaliacaoService.criar(req.body);

      res.status(201).json({
        message: "Avaliação enviada com sucesso.",
        data: avaliacao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /avaliacoes/:id
   */
  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const avaliacao =
        await avaliacaoService.atualizar(id, req.body);

      res.status(200).json({
        message: "Avaliação atualizada com sucesso.",
        data: avaliacao
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /avaliacoes/:id
   */
  async excluir(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      await avaliacaoService.excluir(id);

      res.status(200).json({
        message: "Avaliação removida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  

  /**
   * GET /avaliacoes/questionario/:questionarioId
   */
  async listarPorQuestionario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionarioId = Number(req.params.questionarioId);

      const avaliacoes =
        await avaliacaoService.listarPorQuestionario(questionarioId);

      res.status(200).json(avaliacoes);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /avaliacoes/:id/respostas
   */
  async listarRespostas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const id = Number(req.params.id);

      const respostas =
        await avaliacaoService.listarRespostas(id);

      res.status(200).json(respostas);

    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /avaliacoes/:id/respostas
   */
  async adicionarResposta(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const avaliacaoId = Number(req.params.id);

      const resposta =
        await avaliacaoService.adicionarResposta(
          avaliacaoId,
          req.body
        );

      res.status(201).json({
        message: "Resposta adicionada com sucesso.",
        data: resposta
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /avaliacoes/questionario/:questionarioId/media
   */
  async calcularMedia(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionarioId = Number(req.params.questionarioId);

      const media =
        await avaliacaoService.calcularMedia(questionarioId);

      res.status(200).json(media);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /avaliacoes/questionario/:questionarioId/participacao
   */
  async participacao(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const questionarioId = Number(req.params.questionarioId);

      const participacao =
        await avaliacaoService.participacao(questionarioId);

      res.status(200).json(participacao);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /avaliacoes/dashboard
   */
  async dashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const dashboard =
        await avaliacaoService.dashboard();

      res.status(200).json(dashboard);

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /avaliacoes/estatisticas
   */
  async estatisticas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const estatisticas =
        await avaliacaoService.estatisticas();

      res.status(200).json(estatisticas);

    } catch (error) {
      next(error);
    }
  }

}