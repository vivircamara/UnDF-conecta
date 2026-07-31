/**
 * services/avaliacao.ts
 *
 * Camada de acesso ao módulo Avaliação Institucional + Enquetes.
 * Espelha backend/src/routes/{questionario,pergunta,avaliacao,enquete,opcaoEnquete}.routes.ts
 */
import api from './api'
import type { PaginatedResponse } from './agenda'

export type TipoPergunta = 'ESTRELAS' | 'TEXTO' | 'MULTIPLA_ESCOLHA'

export interface OpcaoPergunta {
  id: number
  texto: string
  perguntaId: number
}

export interface Pergunta {
  id: number
  enunciado: string
  tipo: TipoPergunta
  questionarioId: number
  opcoes?: OpcaoPergunta[]
}

export interface Questionario {
  id: number
  titulo: string
  descricao?: string | null
  inicio: string
  fim: string
  perguntas?: Pergunta[]
  criadoEm?: string
}

export interface RespostaInput {
  perguntaId: number
  nota?: number
  texto?: string
  opcaoId?: number
}

export interface Resposta extends RespostaInput {
  id: number
  avaliacaoId: number
}

export interface Avaliacao {
  id: number
  questionarioId: number
  respostas: Resposta[]
  enviadaEm?: string
}

// --- Enquetes rápidas --------------------------------------------------------

export interface OpcaoEnquete {
  id: number
  texto: string
  enqueteId: number
  _count?: { votos: number }
}

export interface Enquete {
  id: number
  pergunta: string
  inicio: string
  fim: string
  opcoes: OpcaoEnquete[]
  criadaEm?: string
}

export interface ResultadoEnquete {
  enqueteId: number
  totalVotos: number
  opcoes: { id: number; texto: string; votos: number; percentual: number }[]
}

// --- Questionários -------------------------------------------------------------

export function listarQuestionarios(params?: {
  page?: number
  limit?: number
  titulo?: string
  ativo?: boolean
  sort?: string
  order?: 'asc' | 'desc'
}) {
  return api.get<PaginatedResponse<Questionario>>('/questionarios', { params })
}

export function buscarQuestionario(id: number) {
  return api.get<Questionario>(`/questionarios/${id}`)
}

export function listarQuestionariosAtivos() {
  return api.get<Questionario[]>('/questionarios/ativos')
}

export function listarPerguntasDoQuestionario(questionarioId: number) {
  return api.get<Pergunta[]>(`/questionarios/${questionarioId}/perguntas`)
}

// --- Perguntas -------------------------------------------------------------------

export function listarOpcoesDaPergunta(perguntaId: number) {
  return api.get<OpcaoPergunta[]>(`/perguntas/${perguntaId}/opcoes`)
}

// --- Avaliações ------------------------------------------------------------------

export function buscarAvaliacao(id: number) {
  return api.get<Avaliacao>(`/avaliacoes/${id}`)
}

export function criarAvaliacao(payload: {
  questionarioId: number
  respostas: RespostaInput[]
}) {
  return api.post<{ message: string; data: Avaliacao }>('/avaliacoes', payload)
}

export function listarAvaliacoesDoQuestionario(questionarioId: number) {
  return api.get<Avaliacao[]>(`/avaliacoes/questionario/${questionarioId}`)
}

export function calcularMediaQuestionario(questionarioId: number) {
  return api.get<{ questionarioId: number; media: number | null; totalRespostas: number }>(
    `/avaliacoes/questionario/${questionarioId}/media`,
  )
}

export function participacaoQuestionario(questionarioId: number) {
  return api.get<{ questionarioId: number; totalRespondentes: number }>(
    `/avaliacoes/questionario/${questionarioId}/participacao`,
  )
}

// --- Enquetes ----------------------------------------------------------------------

export function listarEnquetesAtivas() {
  return api.get<Enquete[]>('/enquetes/ativas')
}

export function buscarEnquete(id: number) {
  return api.get<Enquete>(`/enquetes/${id}`)
}

export function votarEnquete(enqueteId: number, opcaoId: number) {
  return api.post<{ message: string; data: unknown }>(`/enquetes/${enqueteId}/votar`, {
    opcaoId,
  })
}

export function resultadoEnquete(enqueteId: number) {
  return api.get<ResultadoEnquete>(`/enquetes/${enqueteId}/resultado`)
}