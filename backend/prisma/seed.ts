import "dotenv/config";
import { PrismaClient, TipoPergunta, StatusPublicacao } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

function diasAPartirDeHoje(dias: number): Date {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  return data;
}

async function main() {
  console.log("Iniciando seed...");

  // ------------------------------------------------------------------
  // CALENDÁRIO
  // ------------------------------------------------------------------
  const categoriaAcademica = await prisma.categoriaEvento.create({
    data: { nome: "Acadêmico", cor: "#1B3358" },
  });
  const categoriaCultural = await prisma.categoriaEvento.create({
    data: { nome: "Cultural", cor: "#4A7FE8" },
  });
  const categoriaAdministrativa = await prisma.categoriaEvento.create({
    data: { nome: "Administrativo", cor: "#E8A94A" },
  });

  await prisma.event.createMany({
    data: [
      {
        titulo: "Semana de Provas — Bimestre 2",
        descricao: "Período de avaliações do segundo bimestre.",
        inicio: diasAPartirDeHoje(3),
        fim: diasAPartirDeHoje(7),
        local: "Salas de Aula",
        campus: "Asa Norte",
        curso: null,
        categoriaId: categoriaAcademica.id,
        criadoPorNome: "Coordenação Acadêmica",
      },
      {
        titulo: "Mostra Cultural UNDF",
        descricao: "Apresentações artísticas e culturais dos cursos.",
        inicio: diasAPartirDeHoje(10),
        fim: diasAPartirDeHoje(11),
        local: "Auditório Central",
        campus: "Taguatinga",
        curso: null,
        categoriaId: categoriaCultural.id,
        criadoPorNome: "Núcleo de Extensão",
      },
      {
        titulo: "Prazo de Rematrícula",
        descricao: "Último dia para renovação de matrícula sem multa.",
        inicio: diasAPartirDeHoje(-1),
        fim: diasAPartirDeHoje(1),
        local: "Secretaria Acadêmica",
        campus: "Asa Norte",
        curso: null,
        categoriaId: categoriaAdministrativa.id,
        criadoPorNome: "Secretaria Acadêmica",
      },
    ],
  });

  // ------------------------------------------------------------------
  // FÓRUM
  // ------------------------------------------------------------------
  const catDuvidas = await prisma.forumCategoria.create({ data: { nome: "Dúvidas Acadêmicas" } });
  const catInfra = await prisma.forumCategoria.create({ data: { nome: "Infraestrutura" } });
  await prisma.forumCategoria.create({ data: { nome: "Sugestões" } });

  const post1 = await prisma.forumPost.create({
    data: {
      titulo: "Wi-Fi caindo no bloco B",
      conteudo: "O sinal do Wi-Fi tem caído bastante nas salas do bloco B durante a tarde. Alguém mais está passando por isso?",
      categoriaId: catInfra.id,
      autorNome: "Ana Beatriz Souza",
      autorCurso: "Engenharia de Software",
      autorCampus: "Asa Norte",
      status: StatusPublicacao.APROVADA,
    },
  });

  const post2 = await prisma.forumPost.create({
    data: {
      titulo: "Como funciona a segunda chamada de prova?",
      conteudo: "Perdi a prova por motivo de saúde, alguém sabe o prazo pra solicitar segunda chamada?",
      categoriaId: catDuvidas.id,
      autorNome: "Carlos Eduardo Lima",
      autorCurso: "Administração",
      autorCampus: "Taguatinga",
      status: StatusPublicacao.RESOLVIDA,
    },
  });

  await prisma.forumPost.create({
    data: {
      titulo: "Ar-condicionado quebrado na sala 204",
      conteudo: "Já tá assim há duas semanas, alguém abriu chamado?",
      categoriaId: catInfra.id,
      autorNome: "Fernanda Costa",
      autorCurso: "Direito",
      autorCampus: "Asa Norte",
      status: StatusPublicacao.EM_ANALISE,
    },
  });

  await prisma.forumComment.createMany({
    data: [
      { postId: post1.id, conteudo: "Também notei, principalmente depois das 14h.", autorNome: "João Pedro Alves", oficial: false },
      { postId: post1.id, conteudo: "Já encaminhamos para o setor de TI, obrigado pelo relato.", autorNome: "Suporte de TI", oficial: true },
      { postId: post2.id, conteudo: "O prazo é de até 3 dias úteis após a data da prova, com atestado.", autorNome: "Secretaria Acadêmica", oficial: true },
    ],
  });

  await prisma.forumVote.createMany({
    data: [
      { postId: post1.id, usuarioIdentificador: "mock-user-1" },
      { postId: post1.id, usuarioIdentificador: "mock-user-2" },
      { postId: post1.id, usuarioIdentificador: "mock-user-3" },
      { postId: post2.id, usuarioIdentificador: "mock-user-1" },
    ],
  });

  // ------------------------------------------------------------------
  // AVALIAÇÃO INSTITUCIONAL
  // ------------------------------------------------------------------
  const questionario = await prisma.questionario.create({
    data: {
      titulo: "Avaliação do Semestre — 2026.2",
      descricao: "Avalie a experiência do semestre nos aspectos abaixo.",
      inicio: diasAPartirDeHoje(-5),
      fim: diasAPartirDeHoje(10),
    },
  });

  const perguntaNota = await prisma.pergunta.create({
    data: {
      enunciado: "Como você avalia a qualidade das aulas neste semestre?",
      tipo: TipoPergunta.ESTRELAS,
      questionarioId: questionario.id,
    },
  });

  const perguntaTexto = await prisma.pergunta.create({
    data: {
      enunciado: "Deixe sugestões de melhoria, se houver.",
      tipo: TipoPergunta.TEXTO,
      questionarioId: questionario.id,
    },
  });

  const perguntaMultipla = await prisma.pergunta.create({
    data: {
      enunciado: "Qual aspecto mais impactou sua experiência?",
      tipo: TipoPergunta.MULTIPLA_ESCOLHA,
      questionarioId: questionario.id,
    },
  });

  const [opcaoProfessores, opcaoInfra, opcaoMaterial] = await Promise.all([
    prisma.opcaoPergunta.create({ data: { texto: "Professores", perguntaId: perguntaMultipla.id } }),
    prisma.opcaoPergunta.create({ data: { texto: "Infraestrutura", perguntaId: perguntaMultipla.id } }),
    prisma.opcaoPergunta.create({ data: { texto: "Material didático", perguntaId: perguntaMultipla.id } }),
  ]);

  await prisma.avaliacao.create({
    data: {
      questionarioId: questionario.id,
      respostas: {
        create: [
          { perguntaId: perguntaNota.id, nota: 4 },
          { perguntaId: perguntaTexto.id, texto: "Poderia ter mais laboratórios disponíveis." },
          { perguntaId: perguntaMultipla.id, opcaoId: opcaoProfessores.id },
        ],
      },
    },
  });

  await prisma.avaliacao.create({
    data: {
      questionarioId: questionario.id,
      respostas: {
        create: [
          { perguntaId: perguntaNota.id, nota: 5 },
          { perguntaId: perguntaMultipla.id, opcaoId: opcaoInfra.id },
        ],
      },
    },
  });

  // ------------------------------------------------------------------
  // ENQUETES
  // ------------------------------------------------------------------
  const enquete = await prisma.enquete.create({
    data: {
      pergunta: "Qual tema você quer ver na próxima Semana Acadêmica?",
      inicio: diasAPartirDeHoje(-2),
      fim: diasAPartirDeHoje(12),
      opcoes: {
        create: [
          { texto: "Inteligência Artificial" },
          { texto: "Empreendedorismo" },
          { texto: "Sustentabilidade" },
        ],
      },
    },
    include: { opcoes: true },
  });

  const [opcaoIA, opcaoEmpreendedorismo] = enquete.opcoes;

  await prisma.votoEnquete.createMany({
    data: [
      { enqueteId: enquete.id, opcaoId: opcaoIA.id },
      { enqueteId: enquete.id, opcaoId: opcaoIA.id },
      { enqueteId: enquete.id, opcaoId: opcaoIA.id },
      { enqueteId: enquete.id, opcaoId: opcaoEmpreendedorismo.id },
    ],
  });

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao rodar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
