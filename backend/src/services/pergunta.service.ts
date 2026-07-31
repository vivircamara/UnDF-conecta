import prisma from "../config/database";
import { TipoPergunta } from "@prisma/client";

interface ListarParams {
  page: number;
  limit: number;
  questionarioId?: number;
  tipo?: string;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarPerguntaInput {
  enunciado: string;
  tipo: TipoPergunta;
  questionarioId: number;
}

export class PerguntaService {

  async listar(params: ListarParams) {
    const { page, limit, questionarioId, tipo, sort, order } = params;

    const where = {
      ...(questionarioId ? { questionarioId } : {}),
      ...(tipo ? { tipo: tipo as TipoPergunta } : {}),
    };

    const [data, total] = await Promise.all([
      prisma.pergunta.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { id: "asc" },
      }),
      prisma.pergunta.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.pergunta.findUniqueOrThrow({
      where: { id },
      include: { opcoes: true },
    });
  }

  async criar(data: CriarPerguntaInput) {
    return prisma.pergunta.create({ data });
  }

  async atualizar(id: number, data: Partial<CriarPerguntaInput>) {
    return prisma.pergunta.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.pergunta.delete({ where: { id } });
  }

  async listarPorQuestionario(questionarioId: number) {
    return prisma.pergunta.findMany({ where: { questionarioId } });
  }

  async listarPorTipo(tipo: string) {
    return prisma.pergunta.findMany({ where: { tipo: tipo as TipoPergunta } });
  }

  async listarOpcoes(id: number) {
    return prisma.opcaoPergunta.findMany({ where: { perguntaId: id } });
  }

  async listarRespostas(id: number) {
    return prisma.resposta.findMany({ where: { perguntaId: id } });
  }

  async adicionarOpcao(perguntaId: number, data: { texto: string }) {
    return prisma.opcaoPergunta.create({
      data: { ...data, perguntaId },
    });
  }

  async removerOpcao(perguntaId: number, opcaoId: number) {
    return prisma.opcaoPergunta.delete({
      where: { id: opcaoId, perguntaId },
    });
  }

  async estatisticas() {
    const total = await prisma.pergunta.count();
    const porTipo = await prisma.pergunta.groupBy({
      by: ["tipo"],
      _count: { _all: true },
    });
    return { total, porTipo };
  }
}