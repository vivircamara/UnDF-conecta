import { computed, ref } from 'vue'

export interface Avaliacao {
  id: number
  titulo: string
  subtitulo: string
  nota: number
  comentario: string
  placeholder: string
  dataEnvio?: string
}

export interface Enquete {
  id: number
  pergunta: string
  opcoes: string[]
  respostaSelecionada: string | null
  respondido: boolean
}

export const avaliacoesPendentes = ref<Avaliacao[]>([
  {
    id: 1,
    titulo: 'Cálculo I — Prof. Marina Duarte',
    subtitulo: 'Disciplina · 2º semestre',
    nota: 4,
    comentario: '',
    placeholder: 'Comentário (opcional)...',
  },
  {
    id: 2,
    titulo: 'Biblioteca Central',
    subtitulo: 'Serviço institucional',
    nota: 0,
    comentario: '',
    placeholder:
      'Como avalia a infraestrutura e atendimento da biblioteca?',
  },
  {
    id: 3,
    titulo: 'Restaurante Universitário',
    subtitulo: 'Serviço institucional',
    nota: 5,
    comentario: '',
    placeholder: 'Comentário (opcional)...',
  },
])

export const avaliacoesConcluidas = ref<Avaliacao[]>([])

export const enquetes = ref<Enquete[]>([
  {
    id: 101,
    pergunta:
      'Você utiliza o acervo digital da biblioteca para os seus estudos?',
    opcoes: [
      'Sim, frequentemente',
      'Raramente',
      'Não sabia que existia',
    ],
    respostaSelecionada: null,
    respondido: false,
  },
  {
    id: 102,
    pergunta:
      'Como você avalia a qualidade do Wi-Fi disponibilizado nos blocos acadêmicos?',
    opcoes: [
      'Excelente / Estável',
      'Razoável (oscila às vezes)',
      'Ruim / Instável',
      'Não utilizo',
    ],
    respostaSelecionada: null,
    respondido: false,
  },
  {
    id: 103,
    pergunta:
      'Qual modalidade de atendimento da secretaria do curso você prefere?',
    opcoes: [
      '100% Presencial',
      'Atendimento Online (Teams/WhatsApp)',
      'Híbrido',
    ],
    respostaSelecionada: null,
    respondido: false,
  },
])

export const totalAvaliacoes = computed(() => {
  return (
    avaliacoesPendentes.value.length +
    avaliacoesConcluidas.value.length
  )
})

export const enquetesRespondidasCount = computed(() => {
  return enquetes.value.filter((enquete) => enquete.respondido).length
})

export const porcentagemProgresso = computed(() => {
  if (totalAvaliacoes.value === 0) return 100

  return Math.round(
    (avaliacoesConcluidas.value.length /
      totalAvaliacoes.value) *
      100,
  )
})

export const porcentagemEnquetes = computed(() => {
  if (enquetes.value.length === 0) return 100

  return Math.round(
    (enquetesRespondidasCount.value /
      enquetes.value.length) *
      100,
  )
})

export const quantidadeEnquetesPendentes = computed(() => {
  return enquetes.value.filter((enquete) => !enquete.respondido)
    .length
})

export const totalPendenciasAvaliacao = computed(() => {
  return (
    avaliacoesPendentes.value.length +
    quantidadeEnquetesPendentes.value
  )
})

export const possuiPendenciasAvaliacao = computed(() => {
  return totalPendenciasAvaliacao.value > 0
})