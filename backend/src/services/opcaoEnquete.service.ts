import prisma from "../config/database";
interface ListarParams {
  page: number;
  limit: number;
  enqueteId?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export class OpcaoEnqueteService {

  async listar(params: ListarParams) {
    const { page, limit, enqueteId, sort, order } = params;

    const where = enqueteId ? { enqueteId } : {};

    const [data, total] = await Promise.all([
      prisma.opcaoEnquete.findMany({
        where,
        include: { _count: { select: { votos: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { id: "asc" },
      }),
      prisma.opcaoEnquete.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.opcaoEnquete.findUniqueOrThrow({
      where: { id },
      include: { _count: { select: { votos: true } } },
    });
  }

  async criar(data: { texto: string; enqueteId: number }) {
    return prisma.opcaoEnquete.create({ data });
  }

  async atualizar(id: number, data: Partial<{ texto: string }>) {
    return prisma.opcaoEnquete.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.opcaoEnquete.delete({ where: { id } });
  }

  async listarPorEnquete(enqueteId: number) {
    return prisma.opcaoEnquete.findMany({ where: { enqueteId } });
  }

  
  async incrementarVotos(id: number) {
    const opcao = await prisma.opcaoEnquete.findUniqueOrThrow({ where: { id } });
    return prisma.votoEnquete.create({ data: { enqueteId: opcao.enqueteId, opcaoId: id } });
    }

  

  async percentual(id: number) {
    const opcao = await prisma.opcaoEnquete.findUniqueOrThrow({
      where: { id },
      include: { _count: { select: { votos: true } } },
    });

    const totalEnquete = await prisma.votoEnquete.count({
      where: { enqueteId: opcao.enqueteId },
    });

    return {
      opcaoId: id,
      votos: opcao._count.votos,
      percentual: totalEnquete > 0 ? Number(((opcao._count.votos / totalEnquete) * 100).toFixed(1)) : 0,
    };
  }

  async maisVotada() {
    const opcoes = await prisma.opcaoEnquete.findMany({
      include: { _count: { select: { votos: true } } },
      orderBy: { votos: { _count: "desc" } },
      take: 1,
    });
    return opcoes[0] ?? null;
  }

  async estatisticas() {
    const total = await prisma.opcaoEnquete.count();
    return { total };
  }
}