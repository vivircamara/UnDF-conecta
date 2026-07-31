import prisma from "../config/database";

interface ListarParams {
  page: number;
  limit: number;
  nome?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class CategoriaEventoService {

  async listar(params: ListarParams) {
    const { page, limit, nome, sort, order } = params;

    const where = nome
      ? { nome: { contains: nome } }
      : {};

    const [data, total] = await Promise.all([
      prisma.categoriaEvento.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { id: "asc" },
      }),
      prisma.categoriaEvento.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.categoriaEvento.findUniqueOrThrow({ where: { id } });
  }

  async criar(data: { nome: string; cor: string }) {
    return prisma.categoriaEvento.create({ data });
  }

  async atualizar(id: number, data: Partial<{ nome: string; cor: string }>) {
    return prisma.categoriaEvento.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.categoriaEvento.delete({ where: { id } });
  }

  async listarEventos(id: number) {
    return prisma.event.findMany({
      where: { categoriaId: id },
      orderBy: { inicio: "asc" },
    });
  }

  async buscarPorNome(nome: string) {
    return prisma.categoriaEvento.findUniqueOrThrow({ where: { nome } });
  }

  async listarComEventos() {
    return prisma.categoriaEvento.findMany({
      include: { eventos: true },
    });
  }

  async estatisticas() {
    const total = await prisma.categoriaEvento.count();
    const porCategoria = await prisma.event.groupBy({
      by: ["categoriaId"],
      _count: { _all: true },
    });
    return { total, porCategoria };
  }
}