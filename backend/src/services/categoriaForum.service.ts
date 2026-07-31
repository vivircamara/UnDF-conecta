import prisma from "../config/database";

interface ListarParams {
  page: number;
  limit: number;
  nome?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class CategoriaForumService {

  async listar(params: ListarParams) {
    const { page, limit, nome, sort, order } = params;
    const where = nome ? { nome: { contains: nome } } : {};

    const [data, total] = await Promise.all([
      prisma.forumCategoria.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { id: "asc" },
      }),
      prisma.forumCategoria.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.forumCategoria.findUniqueOrThrow({ where: { id } });
  }

  async criar(data: { nome: string }) {
    return prisma.forumCategoria.create({ data });
  }

  async atualizar(id: number, data: Partial<{ nome: string }>) {
    return prisma.forumCategoria.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.forumCategoria.delete({ where: { id } });
  }

  async listarPublicacoes(id: number) {
    return prisma.forumPost.findMany({
      where: { categoriaId: id },
      orderBy: { criadoEm: "desc" },
    });
  }

  async buscarPorNome(nome: string) {
    return prisma.forumCategoria.findUniqueOrThrow({ where: { nome } });
  }

  async listarComPublicacoes() {
    return prisma.forumCategoria.findMany({ include: { posts: true } });
  }

  async listarMaisUtilizadas() {
    const grupos = await prisma.forumPost.groupBy({
      by: ["categoriaId"],
      _count: { _all: true },
      orderBy: { _count: { categoriaId: "desc" } },
    });

    const categorias = await prisma.forumCategoria.findMany({
      where: { id: { in: grupos.map((g) => g.categoriaId) } },
    });

    return grupos.map((g) => ({
      categoria: categorias.find((c) => c.id === g.categoriaId),
      totalPublicacoes: g._count._all,
    }));
  }

  async estatisticas() {
    const total = await prisma.forumCategoria.count();
    return { total };
  }
}