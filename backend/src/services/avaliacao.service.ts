import prisma from "../config/database";
interface ListarParams {
  page: number;
  limit: number;
  questionarioId?: number;
  sort?: string;
  order?: "asc" | "desc";
}

interface CriarAvaliacaoInput {
  questionarioId: number;
  respostas: {
    perguntaId: number;
    nota?: number;
    texto?: string;
    opcaoId?: number;
  }[];
}

export class AvaliacaoService {

  async buscar(id: number) {
    return prisma.avaliacao.findUniqueOrThrow({
      where: { id },
      include: { respostas: true },
    });
  }

  // Cria a avaliação e todas as respostas numa transação — a avaliação
  // não deve existir sem pelo menos as respostas enviadas junto.
  async criar(data: { questionarioId: number; respostas: { perguntaId: number; nota?: number; texto?: string; opcaoId?: number }[] }) {
    const { respostas, ...avaliacaoData } = data;
    return prisma.avaliacao.create({
        data: { ...avaliacaoData, respostas: { create: respostas } },
        include: { respostas: true },
    });
}

  async atualizar(id: number, data: Partial<{ questionarioId: number }>) {
    return prisma.avaliacao.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return prisma.avaliacao.delete({ where: { id } });
  }

  async listarPorQuestionario(questionarioId: number) {
    return prisma.avaliacao.findMany({ where: { questionarioId } });
  }

  async listarRespostas(id: number) {
    return prisma.resposta.findMany({ where: { avaliacaoId: id } });
  }

  async adicionarResposta(
    avaliacaoId: number,
    data: { perguntaId: number; nota?: number; texto?: string; opcaoId?: number }
  ) {
    return prisma.resposta.create({
      data: { ...data, avaliacaoId },
    });
  }

  // Média das notas (perguntas tipo ESTRELAS) de um questionário
   async calcularMedia(questionarioId: number) {
     const respostas = await prisma.resposta.findMany({
       where: {
         avaliacao: { questionarioId },
         nota: { not: null },
       },
       select: { nota: true },
     });

     if (respostas.length === 0) return { questionarioId, media: null, totalRespostas: 0 };

     const soma = respostas.reduce((acc, r) => acc + (r.nota ?? 0), 0);
     return {
       questionarioId,
       media: Number((soma / respostas.length).toFixed(2)),
       totalRespostas: respostas.length,
     };
   }

  // % de participação — requer um total esperado de participantes.
  // Sem tabela de usuários, esse total precisa vir de outra fonte (ex.: config por curso).
  // Por ora, retorna só a contagem de avaliações enviadas.
  async participacao(questionarioId: number) {
    const totalRespondentes = await prisma.avaliacao.count({
      where: { questionarioId },
    });
    return { questionarioId, totalRespondentes };
  }

  async dashboard() {
    const totalAvaliacoes = await prisma.avaliacao.count();
    const totalQuestionarios = await prisma.questionario.count();
    return { totalAvaliacoes, totalQuestionarios };
  }

  async estatisticas() {
    const total = await prisma.avaliacao.count();
    return { total };
  }
}