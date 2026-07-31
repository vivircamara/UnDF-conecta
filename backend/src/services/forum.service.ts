import prisma from "../config/database";
import { StatusPublicacao } from "@prisma/client";

interface ListarParams {
  page: number;
  limit: number;
  categoriaId?: number;
  status?: string;
  autorNome?: string;
  texto?: string;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarPostInput {
  titulo: string;
  conteudo: string;
  categoriaId: number;
  autorNome: string;
  autorCurso?: string;
  autorCampus?: string;
}

export class ForumService {

  async listar(params: ListarParams) {
    const { page, limit, categoriaId, status, autorNome, texto, sort, order } = params;

    const where = {
      ...(categoriaId ? { categoriaId } : {}),
      ...(status ? { status: status as StatusPublicacao } : {}),
      ...(autorNome ? { autorNome: { contains: autorNome } } : {}),
      ...(texto
        ? {
            OR: [
              { titulo: { contains: texto } },
              { conteudo: { contains: texto } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      prisma.forumPost.findMany({
        where,
        include: {
          categoria: true,
          _count: { select: { comentarios: true, votos: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sort ? { [sort]: order ?? "asc" } : { criadoEm: "desc" },
      }),
      prisma.forumPost.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async buscar(id: number) {
    return prisma.forumPost.findUniqueOrThrow({
      where: { id },
      include: {
        categoria: true,
        _count: { select: { comentarios: true, votos: true } },
      },
    });
  }

  async criar(data: CriarPostInput) {
    return prisma.forumPost.create({ data });
  }

  async atualizar(id: number, data: Partial<CriarPostInput>) {
    return prisma.forumPost.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.forumPost.delete({ where: { id } });
  }

  async listarPorCategoria(categoriaId: number) {
    return prisma.forumPost.findMany({
      where: { categoriaId },
      orderBy: { criadoEm: "desc" },
    });
  }

  async listarPorStatus(status: string) {
    return prisma.forumPost.findMany({
      where: { status: status as StatusPublicacao },
      orderBy: { criadoEm: "desc" },
    });
  }

  async listarPorAutor(autorNome: string) {
    return prisma.forumPost.findMany({
      where: { autorNome },
      orderBy: { criadoEm: "desc" },
    });
  }

  async pesquisar(texto: string) {
    return prisma.forumPost.findMany({
      where: {
        OR: [
          { titulo: { contains: texto } },
          { conteudo: { contains: texto } },
        ],
      },
      orderBy: { criadoEm: "desc" },
    });
  }

  async alterarStatus(id: number, status: string) {
    return prisma.forumPost.update({
      where: { id },
      data: { status: status as StatusPublicacao },
    });
  }

  async listarComentarios(id: number) {
    return prisma.forumComment.findMany({
      where: { postId: id },
      orderBy: { criadoEm: "asc" },
    });
  }

  async listarCurtidas(id: number) {
    return prisma.forumVote.findMany({ where: { postId: id } });
  }

  async listarPopulares() {
    const posts = await prisma.forumPost.findMany({
      include: { _count: { select: { votos: true } } },
      orderBy: { votos: { _count: "desc" } },
      take: 10,
    });
    return posts;
  }

  async listarRecentes() {
    return prisma.forumPost.findMany({
      orderBy: { criadoEm: "desc" },
      take: 10,
    });
  }

  async estatisticas() {
    const total = await prisma.forumPost.count();
    const porStatus = await prisma.forumPost.groupBy({
      by: ["status"],
      _count: { _all: true },
    });
    return { total, porStatus };
  }
}