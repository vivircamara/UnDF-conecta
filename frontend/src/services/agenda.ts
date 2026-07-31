/**
 * services/agenda.ts
 *
 * Camada de acesso ao módulo Calendário/Eventos.
 * Espelha os endpoints de backend/src/routes/evento.routes.ts
 * e categoriaEvento.routes.ts.
 */
import api from './api'

export interface CategoriaEvento {
  id: number
  nome: string
  cor: string
}

export interface Evento {
  id: number
  titulo: string
  descricao?: string | null
  inicio: string // ISO string — Date é serializado como string na API
  fim: string
  local: string
  campus: string
  curso?: string | null
  categoriaId: number
  categoria?: CategoriaEvento
  criadoPorNome: string
  criadoEm?: string
  atualizadoEm?: string
}

export interface ListarEventosParams {
  page?: number
  limit?: number
  categoriaId?: number
  campus?: string
  curso?: string
  inicio?: string
  fim?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type NovoEventoInput = Omit<
  Evento,
  'id' | 'categoria' | 'criadoEm' | 'atualizadoEm'
>

// --- Eventos --------------------------------------------------------------

export function listarEventos(params?: ListarEventosParams) {
  return api.get<PaginatedResponse<Evento>>('/eventos', { params })
}

export function buscarEvento(id: number) {
  return api.get<Evento>(`/eventos/${id}`)
}

export function criarEvento(payload: NovoEventoInput) {
  return api.post<{ message: string; data: Evento }>('/eventos', payload)
}

export function atualizarEvento(id: number, payload: Partial<NovoEventoInput>) {
  return api.put<{ message: string; data: Evento }>(`/eventos/${id}`, payload)
}

export function excluirEvento(id: number) {
  return api.delete<{ message: string }>(`/eventos/${id}`)
}

export function listarEventosProximos() {
  return api.get<Evento[]>('/eventos/proximos')
}

export function listarEventosPorCampus(campus: string) {
  return api.get<Evento[]>(`/eventos/campus/${encodeURIComponent(campus)}`)
}

export function listarEventosPorCategoria(categoriaId: number) {
  return api.get<Evento[]>(`/eventos/categoria/${categoriaId}`)
}

// --- Categorias de evento ---------------------------------------------------

export function listarCategoriasEvento(params?: {
  page?: number
  limit?: number
  nome?: string
}) {
  return api.get<PaginatedResponse<CategoriaEvento>>('/categorias-evento', {
    params,
  })
}

export function buscarCategoriaEvento(id: number) {
  return api.get<CategoriaEvento>(`/categorias-evento/${id}`)
}

export function criarCategoriaEvento(payload: Omit<CategoriaEvento, 'id'>) {
  return api.post<{ message: string; data: CategoriaEvento }>(
    '/categorias-evento',
    payload,
  )
}