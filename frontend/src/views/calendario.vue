<template>
    <v-container fluid class="pa-6 bg-grey-lighten-4">
      <v-row>
        <v-col cols="12" md="2">
              <v-btn
                color="primary"
                block
                size="large"
                prepend-icon="mdi-plus"
                class="text-none mb-6 rounded-lg elevation-2"
                @click="dialogSolicitar = true"
              >
                Agendar evento
              </v-btn>
            
            <v-dialog v-model="dialogSolicitar" max-width="500px">
              <v-card class="rounded-xl pa-2">
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                  <span class="text-h6 font-weight-bold">Solicitar Auditório</span>
                  <v-btn icon="mdi-close" variant="text" density="compact" @click="dialogSolicitar = false"></v-btn>
                </v-card-title>

                <v-card-text class="pa-4">
                  <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Título do Evento</label>
                  <v-text-field
                    v-model="novoEvento.titulo"
                    placeholder="Ex: Palestra sobre IA"
                    variant="outlined"
                    density="compact"
                    class="mb-3 rounded-lg"
                  ></v-text-field>

                  <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Categoria</label>
                  <v-select
                    v-model="novoEvento.categoria"
                    :items="['Acadêmico', 'Administrativo', 'Auditórios', 'Eventos', 'Palestras']"
                    placeholder="Selecione a categoria"
                    variant="outlined"
                    density="compact"
                    class="mb-3 rounded-lg"
                  ></v-select>

                  <v-row density="compact">
                    <v-col cols="6">
                      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Data</label>
                      <v-text-field
                        v-model="novoEvento.data"
                        type="date"
                        variant="outlined"
                        density="compact"
                        class="mb-3 rounded-lg"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Horário</label>
                      <v-text-field
                        v-model="novoEvento.horario"
                        placeholder="14:00 - 16:00"
                        variant="outlined"
                        density="compact"
                        class="mb-3 rounded-lg"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Local / Auditório</label>
                  <v-text-field
                    v-model="novoEvento.local"
                    placeholder="Ex: Auditório B, Prédio Central"
                    variant="outlined"
                    density="compact"
                    class="mb-3 rounded-lg"
                  ></v-text-field>

                  <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Responsável</label>
                  <v-text-field
                    v-model="novoEvento.responsavel"
                    placeholder="Ex: Prof. Carlos Eduardo"
                    variant="outlined"
                    density="compact"
                    class="rounded-lg"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions class="pa-4 pt-0 d-flex justify-end gap-2">
                  <v-btn variant="text" class="text-none" @click="dialogSolicitar = false">Cancelar</v-btn>
                  <v-btn
                    color="primary"
                    variant="flat"
                    class="text-none font-weight-bold rounded-lg px-6"
                    :disabled="!novoEvento.titulo || !novoEvento.data || !novoEvento.categoria"
                    @click="agendarEvento"
                  >
                    Agendar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- COLE O NOVO MODAL LOGO AQUI DEBAIXO (AINDA DENTRO DO TEMPLATE) -->
            <v-dialog v-model="dialogVerTodos" max-width="650px" scrollable>
              <v-card class="rounded-xl pa-2">
                <v-card-title class="d-flex justify-space-between align-center pa-4 pb-2">
                  <span class="text-h6 font-weight-bold">Todos os Próximos Eventos</span>
                  <v-btn icon="mdi-close" variant="text" density="compact" @click="dialogVerTodos = false"></v-btn>
                </v-card-title>

                <v-card-text class="pa-4" style="max-height: 450px;">
                  <div v-if="eventosFiltrados.length === 0" class="text-center py-6 text-grey-darken-1">
                    <v-icon size="40" class="mb-2">mdi-calendar-remove</v-icon>
                    <p>Nenhum evento encontrado para os filtros selecionados.</p>
                  </div>

                  <v-card 
                    v-for="evt in eventosFiltrados" 
                    :key="evt.id" 
                    class="mb-3 pa-3 rounded-lg border elevation-0 bg-white"
                  >
                    <div class="d-flex justify-space-between align-center mb-1">
                      <v-chip :color="obterCorCategoria(evt.categoria)" size="x-small" label class="font-weight-bold">
                        {{ evt.categoria.toUpperCase() }}
                      </v-chip>
                      <span class="text-caption text-grey-darken-1 font-weight-bold">{{ evt.dataFormatted }}</span>
                    </div>

                    <div class="font-weight-bold text-subtitle-2 mb-1">{{ evt.titulo }}</div>
                    
                    <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
                      <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon> {{ evt.horario }}
                    </div>
                    <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
                      <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon> {{ evt.local }}
                    </div>
                    <div v-if="evt.responsavel" class="text-caption text-grey-darken-1 d-flex align-center">
                      <v-icon size="14" class="mr-1">mdi-account-outline</v-icon> {{ evt.responsavel }}
                    </div>
                  </v-card>
                </v-card-text>

                <v-card-actions class="pa-4 pt-0 d-flex justify-end">
                  <v-btn color="primary" variant="flat" class="text-none rounded-lg px-6" @click="dialogVerTodos = false">
                    Fechar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        
          <v-card variant="outlined" class="pa-3 mb-6 bg-white rounded-lg border">
            <div class="d-flex align-center justify-space-between mb-1">
              <span class="font-weight-bold text-subtitle-2">{{ currentMonthYear }}</span>
              <div>
                <v-btn icon="mdi-chevron-left" variant="text" density="compact" @click="prevMonth"></v-btn>
                <v-btn icon="mdi-chevron-right" variant="text" density="compact" @click="nextMonth"></v-btn>
              </div>
            </div>
            <span class="text-caption text-grey-darken-1">8 eventos agendados este mês.</span>
          </v-card>

        
          <div class="text-caption font-weight-bold text-grey-darken-1 mb-2">CATEGORIAS</div>
          <v-checkbox v-model="categories.academico" label="Acadêmico" color="blue" hide-details density="compact"></v-checkbox>
          <v-checkbox v-model="categories.administrativo" label="Administrativo" color="orange" hide-details density="compact"></v-checkbox>
          <v-checkbox v-model="categories.auditorios" label="Auditórios" color="teal" hide-details density="compact"></v-checkbox>
          <v-checkbox v-model="categories.eventos" label="Eventos" color="grey" hide-details density="compact"></v-checkbox>
          <v-checkbox v-model="categories.palestras" label="Palestras" color="purple" hide-details density="compact"></v-checkbox>
        </v-col>

        
        <v-col cols="12" md="7">
          <v-card class="pa-4 rounded-lg elevation-1 bg-white">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center gap-2">
                <h2 class="text-h5 font-weight-bold mr-2">{{ currentMonthYear }}</h2>
                <v-btn size="small" variant="outlined" color="primary" @click="goToToday">Hoje</v-btn>
                <div class="ml-2">
                  <v-btn icon="mdi-chevron-left" variant="text" density="compact" @click="previousPeriod"></v-btn>
                  <v-btn icon="mdi-chevron-right" variant="text" density="compact" @click="nextPeriod"></v-btn>
                </div>
              </div>
              
              <v-btn-toggle v-model="viewType" mandatory color="primary" density="compact">
                <v-btn value="mes">Mês</v-btn>
                <v-btn value="semana">Semana</v-btn>
                <v-btn value="dia">Dia</v-btn>
              </v-btn-toggle>
            </div>

          
            <v-sheet border class="rounded-lg">
              <div :class="['calendar-grid', `view-${viewType}`]">
                <div  v-for="day in (viewType === 'dia' ? [weekDays[(selectedDate || currentDate).getDay()]] : weekDays)" :key="day" class="weekday-header">
                  {{ day }}
                </div>

                
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  :class="[
                    'calendar-day',
                    { 'other-month': !day.isCurrentMonth },
                    { 'today': day.isToday },
                    { 'selected': day.isSelected }
                  ]"
                  @click="selectDate(day)"
                >
                  <span class="day-number">{{ day.dateNumber }}</span>
                  
                
                  <div v-if="day.events && day.events.length" class="event-list">
                    <span
                      v-for="event in day.events"
                      :key="event.id"
                      class="event-badge"
                      :style="{ backgroundColor: event.color || '#1867C0' }"
                    >
                      {{ event.title }}
                    </span>
                  </div>
                </div>
              </div>
            </v-sheet>
          </v-card>
        </v-col>

        
        <v-col cols="12" md="3">
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="font-weight-bold text-subtitle-1">Próximos Eventos</span>
            <v-btn variant="text" color="primary" density="compact" class="text-none" @click="dialogVerTodos = true">Ver todos</v-btn>
          </div>

          <v-card 
            v-for="evt in eventosFiltrados" 
            :key="evt.id" 
            class="mb-3 pa-3 rounded-lg border elevation-0 bg-white"
          >
            <v-chip :color="obterCorCategoria(evt.categoria)" size="x-small" label class="mb-2 font-weight-bold">
              {{ evt.categoria.toUpperCase() }}
            </v-chip>
            <div class="font-weight-bold text-subtitle-2 mb-1">{{ evt.titulo }}</div>
            <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
              <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon> {{ evt.dataFormatted }}, {{ evt.horario }}
            </div>
            <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
              <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon> {{ evt.local }}
            </div>
            <div v-if="evt.responsavel" class="text-caption text-grey-darken-1 d-flex align-center">
              <v-icon size="14" class="mr-1">mdi-account-outline</v-icon> {{ evt.responsavel }}
            </div>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CalendarEvent {
  id: number
  title: string
  color?: string
}

interface CalendarDay {
  date: Date
  dateNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

interface EventoCompleto {
  id: number
  titulo: string
  categoria: string
  data: string
  dataFormatted: string
  horario: string
  local: string
  responsavel?: string
}

const viewType = ref('mes')
const dialogSolicitar = ref(false)
const dialogVerTodos = ref(false)

const novoEvento = ref({
  titulo: '',
  categoria: 'Auditórios',
  data: '',
  horario: '',
  local: '',
  responsavel: ''
})

const categories = ref({
  academico: true,
  administrativo: true,
  auditorios: true,
  eventos: false,
  palestras: true
})

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// currentDate controla o mês exibido; selectedDate controla as visões Semana e Dia.
// Começamos no dia 1 para que os botões não abram sempre na última semana/dia
// quando o hackathon acontece no fim do mês. O botão "Hoje" continua levando à data atual.
const hoje = new Date()
const currentDate = ref(new Date(hoje.getFullYear(), hoje.getMonth(), 1))
const selectedDate = ref<Date | null>(
  new Date(hoje.getFullYear(), hoje.getMonth(), 1)
)

const listaEventos = ref<EventoCompleto[]>([
  {
    id: 1,
    titulo: 'Defesa de TCC - Engenharia Civil',
    categoria: 'Acadêmico',
    data: '2026-07-08',
    dataFormatted: '08 Julho',
    horario: '14:00 - 16:00',
    local: 'Auditório B, Prédio Central',
    responsavel: 'Prof. Carlos Eduardo'
  },
  {
    id: 2,
    titulo: 'Reunião Conselho Administrativo',
    categoria: 'Administrativo',
    data: '2026-07-08',
    dataFormatted: '08 Julho',
    horario: '09:30 - 12:00',
    local: 'Sala de Reuniões, Reitoria'
  }
])

const eventosFiltrados = computed(() => {
  return listaEventos.value.filter(evt => {
    if (evt.categoria === 'Acadêmico') return categories.value.academico
    if (evt.categoria === 'Administrativo') return categories.value.administrativo
    if (evt.categoria === 'Auditórios') return categories.value.auditorios
    if (evt.categoria === 'Eventos') return categories.value.eventos
    if (evt.categoria === 'Palestras') return categories.value.palestras
    return true
  })
})

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).replace(/^\w/, (c) => c.toUpperCase())
})

function obterCorCategoria(cat: string) {
  const cores: Record<string, string> = {
    'Acadêmico': 'blue',
    'Administrativo': 'orange',
    'Auditórios': 'teal',
    'Eventos': 'grey',
    'Palestras': 'purple'
  }
  return cores[cat] || 'primary'
}

const calendarDays = computed(() => {
  const days: CalendarDay[] = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const today = new Date()

  if (viewType.value === 'dia') {
    const targetDate = selectedDate.value || currentDate.value
    days.push(createDayObject(targetDate, true, today))
    return days
  }

  if (viewType.value === 'semana') {
    const baseDate = selectedDate.value || currentDate.value
    const dayOfWeek = baseDate.getDay() // 0 (Dom) a 6 (Sáb)
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate)
      d.setDate(baseDate.getDate() - dayOfWeek + i)
      const isCurrentMonth = d.getMonth() === month
      days.push(createDayObject(d, isCurrentMonth, today))
    }
    return days
  }

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startDayOfWeek = firstDayOfMonth.getDay()
  const totalDays = lastDayOfMonth.getDate()

  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i)
    days.push(createDayObject(date, false, today))
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d)
    days.push(createDayObject(date, true, today))
  }

  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push(createDayObject(date, false, today))
  }

  return days
})

function createDayObject(date: Date, isCurrentMonth: boolean, today: Date): CalendarDay {
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  const eventosDoDia = eventosFiltrados.value
    .filter(e => {
      const parts = e.data.split('-')
      if (parts.length !== 3) return false
      const eDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
      return isSameDay(eDate, date)
    })
    .map(e => ({
      id: e.id,
      title: e.titulo,
      color: obterCorCategoria(e.categoria)
    }))

  return {
    date,
    dateNumber: date.getDate(),
    isCurrentMonth,
    isToday: isSameDay(date, today),
    isSelected: selectedDate.value ? isSameDay(date, selectedDate.value) : false,
    events: eventosDoDia
  }
}

function setActiveDate(date: Date) {
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )

  selectedDate.value = normalizedDate
  currentDate.value = new Date(
    normalizedDate.getFullYear(),
    normalizedDate.getMonth(),
    1
  )
}

function prevMonth() {
  const target = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
  setActiveDate(target)
}

function nextMonth() {
  const target = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
  setActiveDate(target)
}

function previousPeriod() {
  if (viewType.value === 'mes') {
    prevMonth()
    return
  }

  const baseDate = new Date(selectedDate.value || currentDate.value)
  baseDate.setDate(
    baseDate.getDate() - (viewType.value === 'semana' ? 7 : 1)
  )
  setActiveDate(baseDate)
}

function nextPeriod() {
  if (viewType.value === 'mes') {
    nextMonth()
    return
  }

  const baseDate = new Date(selectedDate.value || currentDate.value)
  baseDate.setDate(
    baseDate.getDate() + (viewType.value === 'semana' ? 7 : 1)
  )
  setActiveDate(baseDate)
}

function goToToday() {
  setActiveDate(new Date())
}

function selectDate(day: CalendarDay) {
  setActiveDate(day.date)
}

function agendarEvento() {
  if (!novoEvento.value.titulo || !novoEvento.value.data || !novoEvento.value.categoria) return

  const [ano, mes, dia] = novoEvento.value.data.split('-')
  const dateObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia))
  const dataFormatted = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })

  listaEventos.value.unshift({
    id: Date.now(),
    titulo: novoEvento.value.titulo,
    categoria: novoEvento.value.categoria,
    data: novoEvento.value.data,
    dataFormatted: dataFormatted,
    horario: novoEvento.value.horario || 'Dia Inteiro',
    local: novoEvento.value.local || 'Auditório Central',
    responsavel: novoEvento.value.responsavel
  })

  novoEvento.value = { titulo: '', categoria: 'Auditórios', data: '', horario: '', local: '', responsavel: '' }
  dialogSolicitar.value = false
}
</script>

<style lang="scss" scoped>
@import '@/styles/calendar.scss';
</style>