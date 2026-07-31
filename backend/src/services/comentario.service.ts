import prisma from "../config/database";
interface ListarParams {
  page: number;
  limit: number;
  postId?: number;
  autorNome?: string;
  oficial?: boolean;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarComentarioInput {
  postId: number;
  autorNome: string;
  conteudo: string;
}

export class ComentarioService {

  async listar(params: ListarParams) {
    const { page, limit, postId, autorNome, oficial, sort, order } = params;

    const where = {
      ...(postId ? { postId } : {}),
      ...(autorNome ? { autorNome } : {}),
      ...(oficial !== undefined ? { oficial } : {}),
    };

    const [data, total] = await Promise.all([
      prisma.forumComment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { criadoEm: "desc" },
      }),
      prisma.forumComment.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.forumComment.findUniqueOrThrow({ where: { id } });
  }

  async criar(data: CriarComentarioInput) {
    return prisma.forumComment.create({ data });
  }

  async atualizar(id: number, data: Partial<{ conteudo: string }>) {
    return prisma.forumComment.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.forumComment.delete({ where: { id } });
  }

  async listarPorPost(postId: number) {
    return prisma.forumComment.findMany({
      where: { postId },
      orderBy: { criadoEm: "asc" },
    });
  }

  async listarPorAutor(autorNome: string) {
    return prisma.forumComment.findMany({
      where: { autorNome },
      orderBy: { criadoEm: "desc" },
    });
  }

  async marcarComoOficial(id: number) {
    return prisma.forumComment.update({
      where: { id },
      data: { oficial: true },
    });
  }

  async removerOficial(id: number) {
    return prisma.forumComment.update({
      where: { id },
      data: { oficial: false },
    });
  }

  async listarOficiais() {
    return prisma.forumComment.findMany({
      where: { oficial: true },
      orderBy: { criadoEm: "desc" },
    });
  }

  async listarRecentes() {
    return prisma.forumComment.findMany({
      orderBy: { criadoEm: "desc" },
      take: 10,
    });
  }

  async estatisticas() {
    const total = await prisma.forumComment.count();
    const oficiais = await prisma.forumComment.count({ where: { oficial: true } });
    return { total, oficiais };
  }
}