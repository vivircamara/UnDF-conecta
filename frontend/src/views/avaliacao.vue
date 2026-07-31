<template>
  <AppHeader portal-label="Open Campus" module-label="Avaliação institucional" @toggle-menu="$emit('toggle-menu')"/>
  <v-main class="w-100 bg-grey-lighten-4">
    <v-container fluid class="pa-0 bg-grey-lighten-4 fill-height align-start">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="12" md="3">
            <!-- Menu de Navegação -->
            <v-card variant="flat" class="pa-2 mb-4 bg-transparent">
              <v-list density="compact" class="bg-transparent">
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :active="menuAtivo === item.value"
                  color="#0F2A4A"
                  rounded="lg"
                  class="mb-1 text-none font-weight-medium"
                  @click="menuAtivo = item.value"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>

            <!-- CARD 1: SEU PROGRESSO PESSOAL (Muda conforme a aba) -->
            <v-card variant="outlined" color="blue-lighten-4" class="pa-4 rounded-xl bg-blue-lighten-5 border-blue mb-4">
              <!-- Aba de Enquetes -->
              <template v-if="menuAtivo === 'enquetes'">
                <h4 class="text-subtitle-2 font-weight-bold text-blue-grey-darken-4 mb-2">
                  Seu progresso em enquetes
                </h4>
                <div class="text-caption font-weight-bold text-blue-grey-darken-3 mb-2">
                  {{ enquetesRespondidasCount }} de {{ enquetes.length }} respondidas
                </div>
                <v-progress-linear
                  :model-value="porcentagemEnquetes"
                  color="#0F2A4A"
                  height="8"
                  rounded
                  class="mb-2"
                ></v-progress-linear>
                <p class="text-caption text-grey-darken-2 line-height-tight mb-0">
                  Sua opinião rápida ajuda a gestão em decisões diárias.
                </p>
              </template>

              <!-- Abas de Avaliações (Pendentes / Minhas) -->
              <template v-else>
                <h4 class="text-subtitle-2 font-weight-bold text-blue-grey-darken-4 mb-2">
                  Seu progresso de avaliação
                </h4>
                <div class="text-caption font-weight-bold text-blue-grey-darken-3 mb-2">
                  {{ avaliacoesConcluidas.length }} de {{ totalAvaliacoes }} concluídas
                </div>
                <v-progress-linear
                  :model-value="porcentagemProgresso"
                  color="#0F2A4A"
                  height="8"
                  rounded
                  class="mb-2"
                ></v-progress-linear>
                <p class="text-caption text-grey-darken-2 line-height-tight mb-0">
                  Respostas individuais são anônimas.
                </p>
              </template>
            </v-card>

            <!-- CARD 2: ENGAJAMENTO GERAL DA TURMA (Charme/Estatística) -->
            <v-card variant="outlined" color="amber-lighten-4" class="pa-4 rounded-xl bg-amber-lighten-5 border-amber">
              <div class="d-flex align-center mb-2">
                <v-icon color="amber-darken-3" class="mr-2" size="20">mdi-account-group</v-icon>
                <h4 class="text-subtitle-2 font-weight-bold text-amber-darken-4">
                  Engajamento da Turma
                </h4>
              </div>
              <h3 class="text-h6 font-weight-bold text-blue-grey-darken-4 mb-1">
                73% dos alunos
              </h3>
              <p class="text-caption text-grey-darken-3 line-height-tight mb-2">
                já participaram da avaliação institucional deste semestre.
              </p>
              <v-progress-linear
                model-value="73"
                color="amber-darken-2"
                height="6"
                rounded
              ></v-progress-linear>
            </v-card>
          </v-col>

          <!-- CONTEÚDO PRINCIPAL (Dinamizado por abas) -->
          <v-col cols="12" md="9">
            
            <!-- ABA 1: AVALIAÇÕES PENDENTES -->
            <div v-if="menuAtivo === 'pendentes'">
              <div class="mb-6">
                <h2 class="text-h5 font-weight-bold text-blue-grey-darken-4 mb-1">
                  Avaliações Pendentes
                </h2>
                <p class="text-body-2 text-grey-darken-1">
                  Selecione as estrelas e envie sua nota para contribuir com o relatório institucional.
                </p>
              </div>

              <!-- Estado Vazio quando responder todas -->
              <v-card v-if="avaliacoesPendentes.length === 0" class="pa-8 text-center rounded-xl bg-white elevation-1">
                <v-icon size="50" color="success" class="mb-3">mdi-check-circle-outline</v-icon>
                <h3 class="text-h6 font-weight-bold mb-1">Tudo em dia!</h3>
                <p class="text-body-2 text-grey-darken-1 mb-0">Você já respondeu a todas as avaliações deste semestre.</p>
              </v-card>

              <!-- Lista de Pendentes -->
              <v-card
                v-for="item in avaliacoesPendentes"
                :key="item.id"
                class="mb-4 pa-5 rounded-xl elevation-1 bg-white border-sm"
              >
                <div class="d-flex align-center mb-3">
                  <v-avatar color="blue-grey-lighten-5" size="44" class="mr-4">
                    <span class="text-h6 font-weight-bold text-blue-grey-darken-3">
                      {{ item.titulo.charAt(0) }}
                    </span>
                  </v-avatar>

                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4 mb-0">
                      {{ item.titulo }}
                    </h3>
                    <span class="text-caption text-grey-darken-1">
                    {{ item.descricao }}
                  </span>
                  </div>
                </div>

                <div class="mb-3">
                  <v-rating
                    v-model="item.nota"
                    color="amber-darken-2"
                    active-color="amber-darken-1"
                    density="compact"
                    size="28"
                    hover
                  ></v-rating>
                </div>

                <v-text-field
                  v-model="item.comentario"
                  :placeholder="item.placeholder || 'Comentário (opcional)...'"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="bg-grey-lighten-5 rounded-lg mb-4"
                ></v-text-field>

                <div class="d-flex justify-end">
                  <v-btn
                    color="#0F2A4A"
                    size="large"
                    class="text-none rounded-lg font-weight-bold px-6"
                    @click="abrirConfirmacao(item)"
                  >
                    Enviar avaliação
                  </v-btn>
                </div>
              </v-card>
            </div>

            <!-- ABA 2: MINHAS AVALIAÇÕES (RESPONDIDAS) -->
            <div v-if="menuAtivo === 'minhas'">
              <div class="mb-6">
                <h2 class="text-h5 font-weight-bold text-blue-grey-darken-4 mb-1">
                  Minhas Avaliações
                </h2>
                <p class="text-body-2 text-grey-darken-1">
                  Histórico das suas contribuições para a melhoria da instituição.
                </p>
              </div>

              <v-card v-if="avaliacoesConcluidas.length === 0" class="pa-8 text-center rounded-xl bg-white elevation-1">
                <v-icon size="40" color="grey" class="mb-2">mdi-history</v-icon>
                <p class="text-body-2 text-grey-darken-1 mb-0">Você ainda não enviou avaliações neste semestre.</p>
              </v-card>

              <v-card
                v-for="item in avaliacoesConcluidas"
                :key="item.id"
                class="mb-3 pa-4 rounded-xl elevation-0 bg-white border"
              >
                <div class="d-flex justify-space-between align-center mb-2">
                  <h3 class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4">{{ item.titulo }}</h3>
                  <v-chip size="x-small" color="success" label class="font-weight-bold">ENVIADO ({{ item.dataEnvio }})</v-chip>
                </div>

                <v-rating :model-value="item.nota" readonly color="amber-darken-2" density="compact" size="20" class="mb-2"></v-rating>
                
                <p v-if="item.comentario" class="text-caption text-grey-darken-2 bg-grey-lighten-4 pa-2 rounded-lg mb-0">
                  "{{ item.comentario }}"
                </p>
              </v-card>
            </div>

            <!-- ABA 3: ENQUETES -->
            <div v-if="menuAtivo === 'enquetes'">
              <div class="mb-6">
                <h2 class="text-h5 font-weight-bold text-blue-grey-darken-4 mb-1">
                  Enquetes Rápidas
                </h2>
                <p class="text-body-2 text-grey-darken-1">
                  Responda enquentes e ajude a melhorar a UnDF.
                </p>
              </div>

              <v-card v-for="enq in enquetes" :key="enq.id" class="pa-5 rounded-xl bg-white border mb-4 elevation-1">
                <h3 class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4 mb-3">{{ enq.pergunta }}</h3>

                <div v-if="!enq.respondido">
                  <v-radio-group v-model="enq.respostaSelecionada">
                    <v-radio
                      v-for="op in enq.opcoes"
                      :key="op.id"
                      :label="op.texto"
                      :value="op.id"
                      color="#0F2A4A"
                    />
                  </v-radio-group>
                  <v-btn
                    color="#0F2A4A"
                    class="text-none rounded-lg font-weight-bold mt-2"
                    :disabled="!enq.respostaSelecionada"
                    @click="responderEnquete(enq)"
                  >
                    Votar
                  </v-btn>
                </div>

                <v-alert v-else type="success" variant="tonal" class="mt-2 rounded-lg" density="compact">
                  Voto registrado! Sua opinião foi enviada.
                </v-alert>
              </v-card>
            </div>

          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-main>

  <!-- MODAL DE CONFIRMAÇÃO DE ENVIO -->
  <v-dialog v-model="dialogConfirmar" max-width="450px">
    <v-card class="rounded-xl pa-2">
      <v-card-title class="text-h6 font-weight-bold pa-4 pb-2">
        Confirmar envio?
      </v-card-title>

      <v-card-text class="pa-4 text-body-2 text-grey-darken-2">
        Você está prestes a enviar sua avaliação para 
        <strong class="text-blue-grey-darken-4" v-if="itemSelecionado">
          "{{ itemSelecionado.titulo }}"
        </strong>.
        <br><br>
        Após o envio, suas respostas não poderão ser alteradas.
      </v-card-text>

      <v-card-actions class="pa-4 pt-0 d-flex justify-end ga-2">
        <v-btn 
          variant="outlined" 
          color="grey-darken-1" 
          class="text-none rounded-lg font-weight-bold" 
          @click="dialogConfirmar = false"
        >
          Cancelar
        </v-btn>
        
        <v-btn 
          color="#0F2A4A" 
          variant="flat" 
          class="text-none rounded-lg font-weight-bold px-4" 
          @click="processarEnvioFinal"
        >
          Sim, enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- SNACKBAR DE NOTIFICAÇÃO -->
  <v-snackbar v-model="snackbar" timeout="3000" color="#0F2A4A" rounded="lg">
    {{ mensagemFeedback }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import {
  listarQuestionariosAtivos,
  criarAvaliacao,
  buscarAvaliacao,
  listarEnquetesAtivas,
  votarEnquete,
  resultadoEnquete,
  type Questionario,
  type Enquete
} from '@/services/avaliacao'
import AppHeader from '@/components/common/AppHeader.vue'
import { listarPerguntasDoQuestionario } from '@/services/avaliacao'

onMounted(async () => {
  await carregarQuestionarios()
  await carregarEnquetes()
})

// --- ESTADOS NAVEGAÇÃO E NOTIFICAÇÃO ---
const menuAtivo = ref('pendentes')
const snackbar = ref(false)
const mensagemFeedback = ref('')

// --- ESTADOS DO MODAL DE CONFIRMAÇÃO ---
const dialogConfirmar = ref(false)
const itemSelecionado = ref<any>(null)

type RespondidaInfo = { questionarioId: number; avaliacaoId: number }

async function carregarQuestionarios() {
  try {
    const { data: questionarios } = await listarQuestionariosAtivos()

    const respondidas: RespondidaInfo[] = JSON.parse(
      localStorage.getItem('avaliacoesRespondidas') ?? '[]'
    )

    const pendentes: AvaliacaoUI[] = []
    const concluidas: any[] = []

    for (const q of questionarios) {
      const info = respondidas.find(r => r.questionarioId === q.id)

      if (info) {
        try {
          const { data: avaliacao } = await buscarAvaliacao(info.avaliacaoId)

          const respostaNota = avaliacao.respostas.find(r => r.nota != null)
          const respostaTexto = avaliacao.respostas.find(r => r.texto)

          concluidas.push({
            ...q,
            subtitulo: q.descricao ?? '',
            nota: respostaNota?.nota ?? 0,
            comentario: respostaTexto?.texto ?? '',
            dataEnvio: avaliacao.enviadaEm
              ? new Date(avaliacao.enviadaEm).toLocaleDateString('pt-BR')
              : '-',
          })
        } catch (err) {
          // Avaliação referenciada no localStorage não existe mais no backend
          // (ex.: banco resetado). Trata como pendente para não perder o questionário.
          console.warn(`Avaliação ${info.avaliacaoId} não encontrada, tratando como pendente.`, err)
          pendentes.push({
            ...q,
            subtitulo: q.descricao ?? '',
            nota: 0,
            comentario: '',
            placeholder: 'Comentário (opcional)...',
          })
        }
      } else {
        pendentes.push({
          ...q,
          subtitulo: q.descricao ?? '',
          nota: 0,
          comentario: '',
          placeholder: 'Comentário (opcional)...',
        })
      }
    }

    avaliacoesPendentes.value = pendentes
    avaliacoesConcluidas.value = concluidas
    totalAvaliacoes.value = pendentes.length + concluidas.length

  } catch (err) {
    console.error(err)
  }
}

// --- MENU LATERAL ---
const menuItems = ref([
  { title: 'Avaliações pendentes', value: 'pendentes' },
  { title: 'Minhas avaliações', value: 'minhas' },
  { title: 'Enquetes', value: 'enquetes' }
])

// --- LISTA DE PENDENTES ---
type AvaliacaoUI = Questionario & {
  subtitulo: string
  nota: number
  comentario: string
  placeholder: string
}

const avaliacoesPendentes = ref<AvaliacaoUI[]>([])

// --- LISTA DE CONCLUÍDAS ---
const avaliacoesConcluidas = ref<any[]>([])

// --- CÁLCULO DE PROGRESSO DINÂMICO ---
const totalAvaliacoes = ref(3) // Total de avaliações do semestre

const porcentagemProgresso = computed(() => {
  return Math.round((avaliacoesConcluidas.value.length / totalAvaliacoes.value) * 100)
})

// --- CÁLCULO DE PROGRESSO DAS ENQUETES ---
const enquetesRespondidasCount = computed(() => {
  return enquetes.value.filter(e => e.respondido).length
})

const porcentagemEnquetes = computed(() => {
  if (enquetes.value.length === 0) return 0
  return Math.round((enquetesRespondidasCount.value / enquetes.value.length) * 100)
})

// --- LISTA DE ENQUETES ---
const enquetes = ref<any[]>([])

async function carregarEnquetes() {
  try {
    const resposta = await listarEnquetesAtivas()

    console.log('Enquetes:', resposta.data)

    enquetes.value = resposta.data.map(enquete => ({
    ...enquete,
    respondido: false,
    respostaSelecionada: null,
    resultado: null
  }))
  } catch (err) {
    console.error('Erro ao carregar enquetes:', err)
  }
}

// --- FUNÇÕES DE ENVIO ---

// 1. Valida se marcou estrelas e abre o modal de confirmação
function abrirConfirmacao(item: any) {
  if (item.nota === 0) {
    mensagemFeedback.value = 'Por favor, selecione ao menos 1 estrela para avaliar.'
    snackbar.value = true
    return
  }
  
  itemSelecionado.value = item
  dialogConfirmar.value = true
}

// 2. Processa o envio definitivo após o usuário clicar em "Sim, enviar" no modal
async function processarEnvioFinal() {
  if (!itemSelecionado.value) return

  const item = itemSelecionado.value

  try {
    // Busca as perguntas do questionário
    const { data: perguntas } =
      await listarPerguntasDoQuestionario(item.id)

    const { data: avaliacaoCriada } = await criarAvaliacao({
      questionarioId: item.id,
      respostas: [
        {
          perguntaId: perguntas[0].id,
          nota: item.nota,
          texto: item.comentario
        }
      ]
    })

    // Salva localmente o par questionarioId -> avaliacaoId
    // (necessário para recuperar a nota real ao recarregar a página,
    // já que ainda não há autenticação/usuário para consultar no backend)
    const respondidas: RespondidaInfo[] = JSON.parse(
      localStorage.getItem('avaliacoesRespondidas') ?? '[]'
    )

    if (!respondidas.some(r => r.questionarioId === item.id)) {
      respondidas.push({
        questionarioId: item.id,
        avaliacaoId: avaliacaoCriada.data.id,
      })

      localStorage.setItem(
        'avaliacoesRespondidas',
        JSON.stringify(respondidas)
      )
    }

    avaliacoesPendentes.value =
      avaliacoesPendentes.value.filter(a => a.id !== item.id)

    avaliacoesConcluidas.value.unshift({
      ...item,
      dataEnvio: new Date().toLocaleDateString('pt-BR')
    })

    dialogConfirmar.value = false
    itemSelecionado.value = null

    mensagemFeedback.value = 'Avaliação enviada com sucesso!'
    snackbar.value = true

  } catch (err) {
    console.error(err)
    mensagemFeedback.value = 'Não foi possível enviar sua avaliação. Tente novamente.'
    snackbar.value = true
  }
}
// 3. Processa o voto da enquete
async function responderEnquete(enquete: any) {

  if (!enquete.respostaSelecionada) return

  try {

    await votarEnquete(
      enquete.id,
      enquete.respostaSelecionada
    )

    enquete.respondido = true

    const { data } =
      await resultadoEnquete(enquete.id)

    enquete.resultado = data

    mensagemFeedback.value =
      'Obrigado por responder à enquete!'

    snackbar.value = true

  } catch (err) {
    console.error(err)
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/avaliacao.scss';
</style>