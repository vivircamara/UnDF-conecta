import prisma from "../config/database";

interface ListarParams {
  page: number;
  limit: number;
  titulo?: string;
  ativo?: boolean;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarQuestionarioInput {
  titulo: string;
  descricao?: string;
  inicio: Date;
  fim: Date;
}

export class QuestionarioService {

  async listar(params: ListarParams) {
    const { page, limit, titulo, ativo, sort, order } = params;
    const agora = new Date();

    const where = {
      ...(titulo ? { titulo: { contains: titulo } } : {}),
      ...(ativo !== undefined
        ? ativo
          ? { inicio: { lte: agora }, fim: { gte: agora } }
          : { fim: { lt: agora } }
        : {}),
    };

    const [data, total] = await Promise.all([
      prisma.questionario.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { criadoEm: "desc" },
      }),
      prisma.questionario.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.questionario.findUniqueOrThrow({
      where: { id },
      include: { perguntas: true },
    });
  }

  async criar(data: CriarQuestionarioInput) {
    return prisma.questionario.create({ data });
  }

  async atualizar(id: number, data: Partial<CriarQuestionarioInput>) {
    return prisma.questionario.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.questionario.delete({ where: { id } });
  }

  async encerrar(id: number) {
    return prisma.questionario.update({
      where: { id },
      data: { fim: new Date() },
    });
  }

  async listarPerguntas(id: number) {
    return prisma.pergunta.findMany({
      where: { questionarioId: id },
      include: { opcoes: true },
    });
  }

  async listarRespostas(id: number) {
    return prisma.resposta.findMany({
      where: { avaliacao: { questionarioId: id } },
    });
  }

  async listarAtivos() {
    const agora = new Date();
    return prisma.questionario.findMany({
      where: { inicio: { lte: agora }, fim: { gte: agora } },
    });
  }

  async listarFinalizados() {
    const agora = new Date();
    return prisma.questionario.findMany({
      where: { fim: { lt: agora } },
    });
  }

  async estatisticas() {
    const total = await prisma.questionario.count();
    const agora = new Date();
    const ativos = await prisma.questionario.count({
      where: { inicio: { lte: agora }, fim: { gte: agora } },
    });
    return { total, ativos };
  }
}