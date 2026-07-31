import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/home.vue'
import LoginLayout from '@/loginLayout.vue'
import MainLayout from '../mainLayout.vue'
import Login from '../views/login.vue'
import Calendario from '../views/calendario.vue'
import Forum from '@/views/forum.vue'
import Avaliacao from '../views/avaliacao.vue'


const routes = [
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: Login,
        meta: { title: 'Login' }
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { title: '' } // Na Home fica vazio para não exibir nada ao lado de Open Campus
      },
      {
        path: 'calendario',
        name: 'calendario',
        component: Calendario,
        meta: { title: 'Calendário de Eventos' }
      },
      {
        path: 'forum',
        name: 'forum',
        component: Forum,
        meta: { title: 'Fórum de Discussões' }
      },
      {
        path: 'avaliacao',
        name: 'avaliacao',
        component: Avaliacao,
        meta: { title: 'Avaliação Institucional' }
      }
    ]
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router