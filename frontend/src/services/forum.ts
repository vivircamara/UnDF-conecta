/**
 * services/forum.ts
 *
 * Camada de acesso ao módulo Fórum.
 * Espelha backend/src/routes/{forum,categoriaForum,comentario,voto}.routes.ts
 */
import api from './api'
import type { PaginatedResponse } from './agenda'

export type StatusPublicacao =
  | 'PENDENTE'
  | 'EM_ANALISE'
  | 'APROVADA'
  | 'RESOLVIDA'
  | 'REJEITADA'

export interface ForumCategoria {
  id: number
  nome: string
}

export interface ForumPost {
  id: number
  titulo: string
  conteudo: string
  categoriaId: number
  categoria?: ForumCategoria
  autorNome: string
  autorCurso?: string | null
  autorCampus?: string | null
  status: StatusPublicacao
  criadoEm?: string
  atualizadoEm?: string
  _count?: { comentarios: number; votos: number }
}

export interface ForumComment {
  id: number
  conteudo: string
  oficial: boolean
  postId: number
  autorNome: string
  criadoEm?: string
}

export interface ForumVote {
  id: number
  tipo: 'CURTIDA'
  postId: number
  usuarioIdentificador: string
  criadoEm?: string
}

export interface ListarPostsParams {
  page?: number
  limit?: number
  categoriaId?: number
  status?: StatusPublicacao
  autorNome?: string
  texto?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export type NovoPostInput = {
  titulo: string
  conteudo: string
  categoriaId: number
  autorNome: string
  autorCurso?: string
  autorCampus?: string
}

// --- Categorias de fórum -----------------------------------------------------

export function listarCategoriasForum(params?: {
  page?: number
  limit?: number
  nome?: string
}) {
  return api.get<PaginatedResponse<ForumCategoria>>('/categorias-forum', { params })
}

export function buscarCategoriaForum(id: number) {
  return api.get<ForumCategoria>(`/categorias-forum/${id}`)
}

export function criarCategoriaForum(payload: { nome: string }) {
  return api.post<{ message: string; data: ForumCategoria }>('/categorias-forum', payload)
}

// --- Posts -------------------------------------------------------------------

export function listarPosts(params?: ListarPostsParams) {
  return api.get<PaginatedResponse<ForumPost>>('/forum', { params })
}

export function buscarPost(id: number) {
  return api.get<ForumPost>(`/forum/${id}`)
}

export function criarPost(payload: NovoPostInput) {
  return api.post<{ message: string; data: ForumPost }>('/forum', payload)
}

export function atualizarPost(id: number, payload: Partial<NovoPostInput>) {
  return api.put<{ message: string; data: ForumPost }>(`/forum/${id}`, payload)
}

export function excluirPost(id: number) {
  return api.delete<{ message: string }>(`/forum/${id}`)
}

export function alterarStatusPost(id: number, status: StatusPublicacao) {
  return api.patch<{ message: string; data: ForumPost }>(`/forum/${id}/status`, { status })
}

export function pesquisarPosts(texto: string) {
  return api.get<ForumPost[]>('/forum/busca', { params: { texto } })
}

export function listarPostsPopulares() {
  return api.get<ForumPost[]>('/forum/populares')
}

export function listarPostsRecentes() {
  return api.get<ForumPost[]>('/forum/recentes')
}

// --- Comentários ---------------------------------------------------------------

export function listarComentariosDoPost(postId: number) {
  return api.get<ForumComment[]>(`/forum/${postId}/comentarios`)
}

export function criarComentario(payload: {
  postId: number
  autorNome: string
  conteudo: string
}) {
  return api.post<{ message: string; data: ForumComment }>('/comentarios', payload)
}

export function atualizarComentario(id: number, conteudo: string) {
  return api.put<{ message: string; data: ForumComment }>(`/comentarios/${id}`, { conteudo })
}

export function excluirComentario(id: number) {
  return api.delete<{ message: string }>(`/comentarios/${id}`)
}

export function marcarComentarioOficial(id: number) {
  return api.patch<{ message: string; data: ForumComment }>(`/comentarios/${id}/oficial`)
}

// --- Votos (curtidas) ------------------------------------------------------------

export function listarVotosDoPost(postId: number) {
  return api.get<ForumVote[]>(`/forum/${postId}/curtidas`)
}

export function quantidadeVotosDoPost(postId: number) {
  return api.get<{ postId: number; quantidade: number }>(`/votos/post/${postId}/quantidade`)
}

export function verificarCurtida(postId: number, usuarioIdentificador: string) {
  return api.get<{ curtido: boolean }>(
    `/votos/post/${postId}/usuario/${encodeURIComponent(usuarioIdentificador)}`,
  )
}

export function curtirPost(postId: number, usuarioIdentificador: string) {
  return api.post<{ message: string; data: ForumVote }>('/votos', {
    postId,
    usuarioIdentificador,
  })
}

export function removerCurtida(postId: number, usuarioIdentificador: string) {
  return api.delete<{ message: string }>(
    `/votos/post/${postId}/usuario/${encodeURIComponent(usuarioIdentificador)}`,
  )
}