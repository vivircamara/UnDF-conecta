<template>
  <v-container fluid class="pa-0 bg-grey-lighten-4 fill-height align-start">
    <v-dialog v-model="dialogNovaPublicacao" max-width="600px">
  <v-card class="rounded-xl pa-2">
    <v-card-title class="d-flex justify-space-between align-center pa-4">
      <span class="text-h6 font-weight-bold text-blue-grey-darken-4">Criar nova publicação</span>
      <v-btn icon="mdi-close" variant="text" density="compact" @click="dialogNovaPublicacao = false"></v-btn>
    </v-card-title>

    <v-card-text class="pa-4">
      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Título da Publicação</label>
      <v-text-field
        v-model="novaPublicacao.titulo"
        placeholder="Ex: Ar condicionado do auditório com defeito"
        variant="outlined"
        density="compact"
        class="mb-3 rounded-lg"
      ></v-text-field>

      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Categoria</label>
      <v-select
        v-model="novaPublicacao.categoria"
        :items="['Infraestrutura', 'Ensino', 'RU', 'Tecnologia', 'Eventos']"
        placeholder="Selecione uma categoria"
        variant="outlined"
        density="compact"
        class="mb-3 rounded-lg"
      ></v-select>

      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Conteúdo</label>
      <v-textarea
        v-model="novaPublicacao.conteudo"
        placeholder="Descreva detalhadamente a sua publicação ou problema..."
        variant="outlined"
        rows="4"
        class="rounded-lg"
      ></v-textarea>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0 d-flex justify-end gap-2">
      <v-btn variant="text" class="text-none" @click="dialogNovaPublicacao = false">
        Cancelar
      </v-btn>
      <v-btn
        color="#0F2A4A"
        variant="flat"
        class="text-none font-weight-bold rounded-lg px-6"
        :disabled="!novaPublicacao.titulo || !novaPublicacao.conteudo || !novaPublicacao.categoria"
        @click="publicarPost"
      >
        Publicar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
      <!-- TABS DE NAVEGAÇÃO PRINCIPAL -->
      <!--
      <v-sheet color="#0F2A4A" class="d-flex justify-center">
        <div class="d-flex w-100 max-width-content">
          <v-btn variant="flat" color="#0F2A4A" rounded="0" class="flex-1 text-none font-weight-bold py-6 text-white border-b-lg">
            Fórum
          </v-btn>
          <v-btn variant="text" color="white" rounded="0" class="flex-1 text-none py-6 opacity-70">
            Calendário
          </v-btn>
          <v-btn variant="text" color="white" rounded="0" class="flex-1 text-none py-6 opacity-70">
            Avaliação Institucional
          </v-btn>
        </div>
      </v-sheet>
    -->
      <v-container class="max-width-content py-6">
        <v-card class="pa-4 mb-6 rounded-lg elevation-1 bg-white">
          <div class="d-flex align-center gap-4">
            <v-text-field
              v-model="searchQuery"
              placeholder="Buscar no fórum ou por tags relevantes..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              class="bg-grey-lighten-5 rounded-lg flex-grow-1"
            ></v-text-field>

            <v-btn
              color="#0F2A4A"
              size="large"
              prepend-icon="mdi-plus"
              class="text-none rounded-lg font-weight-bold"
              @click="dialogNovaPublicacao = true"
            >
              Nova publicação
  <AppHeader portal-label="Open Campus" module-label="Fórum" @toggle-menu="$emit('toggle-menu')" />
  <v-main>
    <v-container fluid class="pa-0 bg-grey-lighten-4 fill-height align-start">
      <v-dialog v-model="dialogNovaPublicacao" max-width="600px">
    <v-card class="rounded-xl pa-2">
      <v-card-title class="d-flex justify-space-between align-center pa-4">
        <span class="text-h6 font-weight-bold text-blue-grey-darken-4">Criar nova publicação</span>
        <v-btn icon="mdi-close" variant="text" density="compact" @click="dialogNovaPublicacao = false"></v-btn>
      </v-card-title>

      <v-card-text class="pa-4">
        <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Título da Publicação</label>
        <v-text-field
          v-model="novaPublicacao.titulo"
          placeholder="Ex: Ar condicionado do auditório com defeito"
          variant="outlined"
          density="compact"
          class="mb-3 rounded-lg"
        ></v-text-field>

        <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Categoria</label>
        <v-select
          v-model="novaPublicacao.categoria"
          :items="categoriasForum" item-title="nome" item-value="id"
          placeholder="Selecione uma categoria"
          variant="outlined"
          density="compact"
          class="mb-3 rounded-lg"
        ></v-select>

        <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Conteúdo</label>
        <v-textarea
          v-model="novaPublicacao.conteudo"
          placeholder="Descreva detalhadamente a sua publicação ou problema..."
          variant="outlined"
          rows="4"
          class="rounded-lg"
        ></v-textarea>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0 d-flex justify-end gap-2">
        <v-btn variant="text" class="text-none" @click="dialogNovaPublicacao = false">
          Cancelar
        </v-btn>
        <v-btn
          color="#0F2A4A"
          variant="flat"
          class="text-none font-weight-bold rounded-lg px-6"
          :disabled="!novaPublicacao.titulo || !novaPublicacao.conteudo || !novaPublicacao.categoria"
          @click="publicarPost"
        >
          Publicar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
        <!-- TABS DE NAVEGAÇÃO PRINCIPAL -->
        <!--
        <v-sheet color="#0F2A4A" class="d-flex justify-center">
          <div class="d-flex w-100 max-width-content">
            <v-btn variant="flat" color="#0F2A4A" rounded="0" class="flex-1 text-none font-weight-bold py-6 text-white border-b-lg">
              Fórum
            </v-btn>
            <v-btn variant="text" color="white" rounded="0" class="flex-1 text-none py-6 opacity-70">
              Calendário
            </v-btn>
          </div>
        </v-card>

        <v-card class="mb-6 rounded-lg elevation-1 bg-white pa-0 overflow-hidden">
          <div class="d-flex">
            <v-btn
              v-for="cat in categorias"
              :key="cat"
              variant="flat"
              :color="categoriaSelecionada === cat ? '#0F2A4A' : 'white'"
              :class="['text-none flex-1 py-4 font-weight-bold', categoriaSelecionada === cat ? 'text-white' : 'text-grey-darken-2']"
              rounded="0"
              @click="categoriaSelecionada = cat"
            >
              {{ cat }}
            </v-btn>
          </div>
        </v-card>

        <div class="d-flex justify-space-between align-center mb-4">
          <span class="font-weight-bold text-subtitle-1 text-grey-darken-3">
            Discussões Recentes ({{ publicacoesFiltradas.length }})
          </span>
          <div class="d-flex align-center">
            <span class="text-caption text-grey-darken-1 mr-1">Ordenar por:</span>
            <v-select
              v-model="ordenacaoSelecionada"
              :items="[
                { title: 'Mais Recentes', value: 'recents' },
                { title: 'Mais Relevantes (Votos)', value: 'votes' },
                { title: 'Mais Comentados', value: 'comments' }
              ]"
              item-title="title"
              item-value="value"
              variant="plain"
              density="compact"
              hide-details
              single-line
              class="font-weight-bold text-caption pa-0 ma-0"
              style="width: auto; min-width: 150px;"
            ></v-select>
          </div>
        </div>

        <v-card
          v-for="post in publicacoesFiltradas"
          :key="post.id"
          class="mb-4 pa-5 rounded-lg elevation-1 bg-white border-sm"
        >
          <div class="d-flex">
            <v-avatar color="blue-grey-lighten-4" size="44" class="mr-4">
              <span class="text-h6 font-weight-bold text-blue-grey-darken-3">
                {{ post.autor.charAt(0) }}
              </span>
            </v-avatar>

            <div class="flex-grow-1">
              <div class="text-caption text-grey-darken-1 mb-1">
                <strong class="text-blue-grey-darken-4">{{ post.autor }}</strong> • {{ post.dataCriacao }}
              </div>
          <v-card
            v-for="post in publicacoesFiltradas"
            :key="post.id"
            class="mb-4 pa-5 rounded-lg elevation-1 bg-white border-sm"
          >
            <div class="d-flex">
              <v-avatar color="blue-grey-lighten-4" size="44" class="mr-4">
                <span class="text-h6 font-weight-bold text-blue-grey-darken-3">
                  {{ post.autorNome.charAt(0)}}
                </span>
              </v-avatar>

              <div class="flex-grow-1">
                <div class="text-caption text-grey-darken-1 mb-1">
                  <strong class="text-blue-grey-darken-4">{{ post.autorNome }}</strong>
                </div>

                <h3 class="text-h6 font-weight-bold text-blue-grey-darken-4 mb-2">
                  {{ post.titulo }}
                </h3>

                <p class="text-body-2 text-grey-darken-2 mb-3">
                  {{ post.conteudo }}
                </p>

                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex gap-2">
                    <v-chip size="small" variant="flat" color="grey-lighten-3" class="text-caption font-weight-bold text-grey-darken-2">
                      {{ post.categoria?.nome}}
                    </v-chip>
                    <v-chip
                      v-if="post.status"
                      size="small"
                      variant="flat"
                      :color="post.status === 'EM_ANALISE' ? 'amber-lighten-4' : 'blue-lighten-4'"
                      :class="post.status === 'EM_ANALISE' ? 'text-amber-darken-4' : 'text-blue-darken-4'"
                      class="text-caption font-weight-bold"
                    >
                      {{ post.status }}
                    </v-chip>
                  </div>

              <h3 class="text-h6 font-weight-bold text-blue-grey-darken-4 mb-2">
                {{ post.titulo }}
              </h3>

              <p class="text-body-2 text-grey-darken-2 mb-3">
                {{ post.conteudo }}
              </p>

              <div class="d-flex align-center justify-space-between">
                <div class="d-flex gap-2">
                  <v-chip size="small" variant="flat" color="grey-lighten-3" class="text-caption font-weight-bold text-grey-darken-2">
                    {{ post.categoria }}
                  </v-chip>
                  <v-chip
                    v-if="post.status"
                    size="small"
                    variant="flat"
                    :color="post.status === 'EM ANÁLISE' ? 'amber-lighten-4' : 'blue-lighten-4'"
                    :class="post.status === 'EM ANÁLISE' ? 'text-amber-darken-4' : 'text-blue-darken-4'"
                    class="text-caption font-weight-bold"
                  >
                    {{ post.status }}
                  </v-chip>
                </div>

              <div class="d-flex align-center gap-4">
                <v-btn
                  variant="text"
                  density="compact"
                  :prepend-icon="post.curtido ? 'mdi-heart' : 'mdi-heart-outline'"
                  :color="post.curtido ? 'red' : 'grey-darken-1'"
                  class="text-caption font-weight-bold"
                  @click="votar(post.id)"
                >
                  {{ post.votos }}
                </v-btn>

                <v-btn
                  variant="text"
                  density="compact"
                  prepend-icon="mdi-comment-outline"
                  class="text-caption text-grey-darken-1"
                  @click="post.mostrarComentarios = !post.mostrarComentarios"
                >
                  {{ post.comentarios.length }}
                </v-btn>
              </div>

              <v-expand-transition>
                <div v-if="post.mostrarComentarios" class="mt-4 pt-4 border-t-sm">
                  <!-- Lista de comentários já feitos -->
                  <div v-if="post.comentarios && post.comentarios.length > 0" class="mb-3 space-y-2">
                    <div 
                      v-for="comentario in post.comentarios" 
                      :key="comentario.id" 
                      class="bg-grey-lighten-4 pa-3 rounded-lg mb-2"
                    >
                      <div class="d-flex justify-space-between align-center mb-1">
                        <span class="text-caption font-weight-bold text-blue-grey-darken-4">{{ comentario.autor }}</span>
                        <span class="text-caption text-grey">{{ comentario.data }}</span>
                    @click="votar(post)"
                  >
                    {{ post._count?.votos ?? 0}}
                  </v-btn>

                  <v-btn
                    variant="text"
                    density="compact"
                    prepend-icon="mdi-comment-outline"
                    class="text-caption text-grey-darken-1"
                    @click="toggleComentarios(post)"
                  >
                    {{ post._count?.comentarios ?? 0 }}
                  </v-btn>
                </div>

                <v-expand-transition>
                  <div v-if="post.mostrarComentarios" class="mt-4 pt-4 border-t-sm">
                    <!-- Lista de comentários já feitos -->
                    <div v-if="post.comentarios && post.comentarios.length > 0" class="mb-3 space-y-2">
                      <div 
                        v-for="comentario in post.comentarios" 
                        :key="comentario.id" 
                        class="bg-grey-lighten-4 pa-3 rounded-lg mb-2"
                      >
                        <div class="d-flex justify-space-between align-center mb-1">
                          <span class="text-caption font-weight-bold text-blue-grey-darken-4">{{ comentario.autorNome }}</span>
                          <span class="text-caption text-grey">{{ comentario.criadoEm }}</span>
                        </div>
                        <p class="text-body-2 text-grey-darken-3 ma-0">{{ comentario.conteudo }}</p>
                      </div>
                      <p class="text-body-2 text-grey-darken-3 ma-0">{{ comentario.texto }}</p>
                    </div>
                  </div>
                  <div v-else class="text-caption text-grey text-center my-2">
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                  </div>

                  <!-- Input para escrever novo comentário -->
                  <div class="d-flex align-center gap-2 mt-3">
                    <v-text-field
                      v-model="post.novoComentario"
                      placeholder="Escreva um comentário..."
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="bg-grey-lighten-5 rounded-lg flex-grow-1"
                      @keyup.enter="adicionarComentario(post)"
                    ></v-text-field>

                    <v-btn
                      color="#0F2A4A"
                      variant="flat"
                      size="small"
                      class="text-none font-weight-bold rounded-lg px-4"
                      :disabled="!post.novoComentario || !post.novoComentario.trim()"
                      @click="adicionarComentario(post)"
                    >
                      Enviar
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
              </div>
            </div>
          </div>
        </v-card>
      </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Comentario {
  id: number
  autor: string
  data: string
  texto: string
}

interface Post {
  id: number
  autor: string
  dataCriacao: string
  titulo: string
  conteudo: string
  categoria: string
  status?: string
  votos: number
  curtido?: boolean
  mostrarComentarios: boolean
  novoComentario: string
  comentarios: Comentario[]
import AppHeader from '@/components/common/AppHeader.vue'
import { ref, computed, onMounted } from 'vue'
import {
  listarPosts, criarPost, listarCategoriasForum,
  curtirPost, removerCurtida, verificarCurtida,
  criarComentario, listarComentariosDoPost,
  type ForumPost, type ForumCategoria, type ForumComment,
} from '@/services/forum'

type PostUI = ForumPost & {
  curtido?: boolean
  mostrarComentarios?: boolean
  novoComentario?: string
  comentarios?: ForumComment[]
}


const searchQuery = ref('')
const categoriaSelecionada = ref('Todas')
const ordenacaoSelecionada = ref('recents')
const dialogNovaPublicacao = ref(false)
const novaPublicacao = ref({
  titulo: '',
  categoria: null,
  conteudo: ''
})

const categorias = ref(['Todas', 'Infraestrutura', 'Ensino', 'RU', 'Tecnologia', 'Eventos'])

const publicacoes = ref<Post[]>([
  {
    id: 1,
    autor: 'Camila R.',
    dataCriacao: 'há 2h',
    titulo: 'WiFi instável no bloco C há uma semana',
    conteudo: 'Sinal cai constantemente durante as aulas práticas no segundo andar do bloco. Inviabiliza o uso de ferramentas de programação.',
    categoria: 'Infraestrutura',
    status: 'EM ANÁLISE',
    votos: 18,
    mostrarComentarios: false,
    novoComentario: '',
    comentarios: []
  },
  {
    id: 2,
    autor: 'Grêmio Acadêmico',
    dataCriacao: 'há 1 dia',
    titulo: 'Proposta: ampliar horário da biblioteca em período de provas',
    conteudo: 'Solicitamos a abertura até as 22h nas duas semanas que antecedem as avaliações finais para melhor acolhimento dos estudantes.',
    categoria: 'Ensino',
    status: 'PLANEJADA',
    votos: 42,
    mostrarComentarios: false,
    novoComentario: '',
    comentarios: []
  },
  {
    id: 3,
    autor: 'Mateus Santana',
    dataCriacao: 'há 2 dias',
    titulo: 'Ar condicionado do auditório principal com defeito',
    conteudo: 'Equipamento está desligando sozinho no meio das palestras, deixando o ambiente abafado e desconfortável para eventos longos.',
    categoria: 'Infraestrutura',
    status: 'EM ANÁLISE',
    votos: 28,
    mostrarComentarios: false,
    novoComentario: '',
    comentarios: []
const categorias = computed(() => ['Todas', ...categoriasForum.value.map(c => c.nome)])

const categoriasForum = ref<ForumCategoria[]>([])
const publicacoes = ref<PostUI[]>([])
const carregando = ref(false)
const erro = ref<string | null>(null)

onMounted(async () => {
  carregando.value = true
  erro.value = null
  try {
    const [resCategorias, resPosts] = await Promise.all([
      listarCategoriasForum({ limit: 100 }),
      listarPosts({ limit: 100 }),
    ])
    categoriasForum.value = resCategorias.data.data
    publicacoes.value = resPosts.data.data

    for (const post of publicacoes.value) {
  const { data } = await verificarCurtida(
    post.id,
    'mock-user-1'
  )

  post.curtido = data.curtido
}
  } catch (e) {
    erro.value = 'Não foi possível carregar o fórum.'
    console.error(e)
  } finally {
    carregando.value = false
  }
})

const publicacoesFiltradas = computed(() => {
  let lista = publicacoes.value.filter(post => {
    const atendeCategoria = categoriaSelecionada.value === 'Todas' || post.categoria?.nome === categoriaSelecionada.value
    const atendeBusca = post.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        post.conteudo.toLowerCase().includes(searchQuery.value.toLowerCase())
    return atendeCategoria && atendeBusca
  })

  if (ordenacaoSelecionada.value === 'votes') {
    return lista.sort((a, b) => (b.votos || 0) - (a.votos || 0))
  }
  
  if (ordenacaoSelecionada.value === 'comments') {
    return lista.sort((a, b) => b.comentarios.length - a.comentarios.length)
  }
  return lista.sort((a, b) => (b._count?.votos ?? 0) - (a._count?.votos ?? 0))
}

if (ordenacaoSelecionada.value === 'comments') {
  return lista.sort((a, b) => (b._count?.comentarios ?? 0) - (a._count?.comentarios ?? 0))
}

  return lista.sort((a, b) => b.id - a.id)
})

async function votar(post: PostUI) {
  const usuarioIdentificador = 'mock-user-1'

  try {
    if (post.curtido) {
      await removerCurtida(post.id, usuarioIdentificador)

      post.curtido = false

      if (post._count) {
        post._count.votos--
      }
    } else {
      await curtirPost(post.id, usuarioIdentificador)

      post.curtido = true

      if (!post._count) {
        post._count = {
          votos: 0,
          comentarios: 0
        }
      }

      post._count.votos++
    }
  } catch (err) {
    console.error(err)
  }
}

async function publicarPost() {
  if (!novaPublicacao.value.titulo || !novaPublicacao.value.conteudo || !novaPublicacao.value.categoria) return
  const { data } = await criarPost({
    titulo: novaPublicacao.value.titulo,
    conteudo: novaPublicacao.value.conteudo,
    categoria: novaPublicacao.value.categoria,
    status: 'EM ANÁLISE',
    votos: 0,
    mostrarComentarios: false,
    novoComentario: '',
    comentarios: []
    categoriaId: novaPublicacao.value.categoria, 
    autorNome: 'Ana Silva Santos', 
  })
  publicacoes.value.unshift(data.data)
  novaPublicacao.value = { titulo: '', categoria: null, conteudo: '' }
  dialogNovaPublicacao.value = false
}

function adicionarComentario(post: Post) {
  const texto = post.novoComentario.trim()

  if (!texto) return

  post.comentarios.push({
    id: Date.now(),
    autor: 'Ana Silva Santos',
    data: 'agora mesmo',
    texto
  })

async function adicionarComentario(post: ForumPost & { novoComentario?: string; comentarios?: ForumComment[] }) {
  if (!post.novoComentario?.trim()) return
  const { data } = await criarComentario({
    postId: post.id,
    autorNome: 'Ana Silva Santos', // TODO: usuário autenticado
    conteudo: post.novoComentario.trim(),
  })
  if (!post.comentarios) post.comentarios = []
  post.comentarios.push(data.data)
  post.novoComentario = ''
}
async function toggleComentarios(post: ForumPost & { comentarios?: ForumComment[]; mostrarComentarios?: boolean }) {
  post.mostrarComentarios = !post.mostrarComentarios
  if (post.mostrarComentarios && !post.comentarios) {
    const { data } = await listarComentariosDoPost(post.id)
    post.comentarios = data
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/forum.scss';
</style>
