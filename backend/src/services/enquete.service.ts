import prisma from "../config/database";

interface ListarParams {
  page: number;
  limit: number;
  ativa?: boolean;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarEnqueteInput {
  pergunta: string;
  inicio: Date;
  fim: Date;
  opcoes: { texto: string }[];
}

export class EnqueteService {

  async listar(params: ListarParams) {
    const { page, limit, ativa, sort, order } = params;
    const agora = new Date();

    const where = ativa !== undefined
      ? ativa
        ? { inicio: { lte: agora }, fim: { gte: agora } }
        : { fim: { lt: agora } }
      : {};

    const [data, total] = await Promise.all([
      prisma.enquete.findMany({
        where,
        include: { opcoes: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { criadaEm: "desc" },
      }),
      prisma.enquete.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.enquete.findUniqueOrThrow({
      where: { id },
      include: { opcoes: true },
    });
  }

  async criar(data: CriarEnqueteInput) {
    const { opcoes, ...enqueteData } = data;
    return prisma.enquete.create({
      data: { ...enqueteData, opcoes: { create: opcoes } },
      include: { opcoes: true },
    });
  }

  async atualizar(id: number, data: Partial<{ pergunta: string; inicio: Date; fim: Date }>) {
    return prisma.enquete.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.enquete.delete({ where: { id } });
  }

  async encerrar(id: number) {
    return prisma.enquete.update({ where: { id }, data: { fim: new Date() } });
  }

  async listarOpcoes(id: number) {
    return prisma.opcaoEnquete.findMany({
      where: { enqueteId: id },
      include: { _count: { select: { votos: true } } },
    });
  }

  // Voto atômico: garante que a opção pertence à enquete e que o usuário
  async votar(enqueteId: number, data: { opcaoId: number }) {
  const opcao = await prisma.opcaoEnquete.findFirst({
    where: { id: data.opcaoId, enqueteId },
  });
  if (!opcao) throw new Error("Opção não pertence a esta enquete.");

  return prisma.votoEnquete.create({
    data: { enqueteId, opcaoId: data.opcaoId },
  });
}

  async resultado(enqueteId: number) {
    const opcoes = await prisma.opcaoEnquete.findMany({
      where: { enqueteId },
      include: { _count: { select: { votos: true } } },
    });

    const totalVotos = opcoes.reduce((acc, o) => acc + o._count.votos, 0);

    return {
      enqueteId,
      totalVotos,
      opcoes: opcoes.map((o) => ({
        id: o.id,
        texto: o.texto,
        votos: o._count.votos,
        percentual: totalVotos > 0 ? Number(((o._count.votos / totalVotos) * 100).toFixed(1)) : 0,
      })),
    };
  }

  async listarAtivas() {
    const agora = new Date();
    return prisma.enquete.findMany({
      where: { inicio: { lte: agora }, fim: { gte: agora } },
    });
  }

  async listarFinalizadas() {
    const agora = new Date();
    return prisma.enquete.findMany({ where: { fim: { lt: agora } } });
  }

  async estatisticas() {
    const total = await prisma.enquete.count();
    const totalVotos = await prisma.votoEnquete.count();
    return { total, totalVotos };
  }
}