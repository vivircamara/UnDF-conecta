import prisma from "../config/database";

interface ListarParams {
  page: number;
  limit: number;
  postId?: number;
  usuarioIdentificador?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export class VotoService {

  async listar(params: ListarParams) {
    const { page, limit, postId, usuarioIdentificador, sort, order } = params;

    const where = {
      ...(postId ? { postId } : {}),
      ...(usuarioIdentificador ? { usuarioIdentificador } : {}),
    };

    const [data, total] = await Promise.all([
      prisma.forumVote.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { criadoEm: "desc" },
      }),
      prisma.forumVote.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.forumVote.findUniqueOrThrow({ where: { id } });
  }

  // A constraint única (postId + usuarioIdentificador) no schema impede
  // que o mesmo identificador curta o mesmo post duas vezes.
  async criar(data: { postId: number; usuarioIdentificador: string }) {
    return prisma.forumVote.create({ data });
  }

  async excluir(id: number) {
    return prisma.forumVote.delete({ where: { id } });
  }

  async removerCurtida(postId: number, usuarioIdentificador: string) {
    return prisma.forumVote.delete({
      where: { postId_usuarioIdentificador: { postId, usuarioIdentificador } },
    });
  }

  async verificarCurtida(postId: number, usuarioIdentificador: string) {
    const voto = await prisma.forumVote.findUnique({
      where: { postId_usuarioIdentificador: { postId, usuarioIdentificador } },
    });
    return voto !== null;
  }

  async listarPorPost(postId: number) {
    return prisma.forumVote.findMany({ where: { postId } });
  }

  async quantidadePorPost(postId: number) {
    const quantidade = await prisma.forumVote.count({ where: { postId } });
    return { postId, quantidade };
  }

  async estatisticas() {
    const total = await prisma.forumVote.count();
    return { total };
  }
}