import prisma from "../config/database";
interface ListarParams {
  page: number;
  limit: number;
  categoriaId?: number;
  campus?: string;
  curso?: string;
  inicio?: string;
  fim?: string;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarEventoInput {
  titulo: string;
  descricao?: string;
  inicio: Date;
  fim: Date;
  local: string;
  campus: string;
  curso?: string;
  categoriaId: number;
  criadoPorNome: string;
}

export class EventoService {

  async listar(params: ListarParams) {
  const { page, limit, categoriaId, campus, curso, inicio, fim, sort, order } = params;

  const where = {
    ...(categoriaId ? { categoriaId } : {}),
    ...(campus ? { campus } : {}),
    ...(curso ? { curso } : {}),
    ...(inicio || fim ? {
      inicio: {
        ...(inicio ? { gte: new Date(inicio) } : {}),
        ...(fim ? { lte: new Date(fim) } : {}),
      }
    } : {}),
  };

    const [data, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: { categoria: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { inicio: "asc" },
      }),
      prisma.event.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.event.findUniqueOrThrow({
      where: { id },
      include: { categoria: true },
    });
  }

  async criar(data: CriarEventoInput) {
    return prisma.event.create({ data });
  }

  async atualizar(id: number, data: Partial<CriarEventoInput>) {
    return prisma.event.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.event.delete({ where: { id } });
  }

  async listarPorCategoria(categoriaId: number) {
    return prisma.event.findMany({
      where: { categoriaId },
      orderBy: { inicio: "asc" },
    });
  }

  async listarProximos() {
    return prisma.event.findMany({
      where: { inicio: { gte: new Date() } },
      orderBy: { inicio: "asc" },
      take: 10,
    });
  }

  async listarPorCampus(campus: string) {
    return prisma.event.findMany({
      where: { campus },
      orderBy: { inicio: "asc" },
    });
  }

  async estatisticas() {
    const total = await prisma.event.count();
    const proximos = await prisma.event.count({
      where: { inicio: { gte: new Date() } },
    });
    return { total, proximos };
  }
}