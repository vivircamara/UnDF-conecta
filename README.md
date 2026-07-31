# Open Campus

Plataforma web desenvolvida por três estudantes da **Universidade do Distrito Federal Jorge Amaury (UnDF)** para o **Hackathon UNDF Conecta 2026**, com o objetivo de melhorar a comunicação entre a instituição e a comunidade acadêmica, promovendo transparência, participação e avaliação institucional.

O sistema segue uma arquitetura em camadas inspirada em **MVC** (Model-View-Controller): rotas apenas direcionam requisições, controllers traduzem HTTP em chamadas de aplicação, services concentram a regra de negócio, e os modelos são definidos via Prisma ORM.

---

## Índice

- [Módulos](#módulos)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Padrões de código](#padrões-de-código)
- [Melhorias futuras](#melhorias-futuras)

---

## Módulos

### 1. Fórum
Espaço onde estudantes publicam sugestões, reclamações e propostas.

- Busca por texto
- Criação de nova publicação
- Filtro por categoria
- Curtidas e comentários em cada publicação
- Listagem com autor, título, conteúdo, tag de categoria e tag de status

### 2. Calendário
Permite acompanhar eventos e datas institucionais.

- Visualização em mês, semana e dia
- Listagem de próximos eventos com categoria, horário, local e responsável
- Filtro de eventos por categoria
- Solicitação de novo evento/auditório via formulário

### 3. Avaliação Institucional
Sistema de avaliação de disciplinas/professores.

- Navegação lateral: Avaliações pendentes / Minhas avaliações / Enquetes
- Avaliação por estrelas (1 a 5) + comentário opcional
- Histórico de avaliações já enviadas, com a nota e o comentário realmente registrados no backend
- Indicador de participação (%) com barra de progresso
- Enquetes rápidas com votação e exibição de resultado

> O usuário atualmente é fixo (mockado como *"Ana Silva Santos"*), já que o projeto não possui autenticação. Por isso, o vínculo entre usuário e avaliações já respondidas é mantido no `localStorage` do navegador (associando cada questionário à avaliação criada no backend), e não por uma sessão de usuário real.

---

## Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| Vue 3 | ^3.5 | Framework (Composition API + `<script setup>`) |
| Vite | ^8 | Build tool / dev server |
| TypeScript | ~5.9 | Tipagem estática |
| Vuetify | ^4.0 | Biblioteca de componentes UI |
| Vue Router | ^4.6 | Roteamento |
| Axios | ^1.19 | Cliente HTTP (sempre via `src/services/*.ts`) |
| Sass Embedded | ^1.98 | Pré-processador CSS |

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js + Express | ^5.2 | Servidor HTTP / API REST |
| TypeScript | via `tsx` | Tipagem estática |
| Prisma | ^7.9 | ORM |
| @prisma/adapter-mariadb | ^7.9 | Driver adapter do Prisma para MariaDB/MySQL |
| cors | ^2.8 | Middleware de CORS |
| dotenv | ^17 | Variáveis de ambiente |

### Banco de dados
- **MariaDB / MySQL**

### Controle de versão
- Git + GitHub

---

## Arquitetura

```
Requisição HTTP
     │
     ▼
  routes/          → mapeia URL para o método do controller
     │
     ▼
controllers/       → lê req, chama o service, formata a resposta (res)
     │
     ▼
 services/         → regra de negócio pura (não conhece req/res)
     │
     ▼
Prisma Client       → acessa o banco de dados (models definidos em schema.prisma)
```

No frontend, os componentes Vue nunca chamam `axios` diretamente — todas as chamadas passam por `src/services/*.ts`, que espelham os endpoints do backend por módulo (`agenda.ts`, `forum.ts`, `avaliacao.ts`).

---

## Pré-requisitos

1. **Node.js** — versão **20.19+** ou **22.12+**
   - Verifique com: `node -v`
2. **npm** — instalado junto com o Node.js (gerenciador de pacotes padrão do projeto)
   - Verifique com: `npm -v`
3. **MySQL** ou **MariaDB** (servidor local ou em container)
4. **Git**
5. (Opcional) **Docker** — para subir o banco de dados via container

---

## Estrutura de pastas

```
open-campus/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/        # AppHeader, AppFooter, AppSidebar
│   │   │   ├── home/          # HomeHero, ModuleCard
│   │   │   ├── calendario/
│   │   │   ├── forum/
│   │   │   └── avaliacao/
│   │   ├── layouts/
│   │   │   ├── loginLayout.vue
│   │   │   └── mainLayout.vue
│   │   ├── router/
│   │   ├── services/           # api.ts, agenda.ts, forum.ts, avaliacao.ts
│   │   ├── stores/
│   │   ├── styles/
│   │   ├── views/
│   │   │   ├── home.vue
│   │   │   ├── forum.vue
│   │   │   ├── calendario.vue
│   │   │   └── avaliacao.vue
│   │   ├── plugins/
│   │   │   └── vuetify.ts
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── vite.config.mts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts     # instância do Prisma Client
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   │   ├── errorHandler.ts
│   │   │   └── notFoundHandler.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/vivircamara/UnDF-conecta.git
cd open-campus
```

### 2. Backend

```bash
cd backend
npm install
```

Configure o `.env` (veja [Variáveis de ambiente](#variáveis-de-ambiente)), depois:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed     # opcional: popula o banco com dados de exemplo
```

### 3. Frontend

```bash
cd frontend
npm install
npm install vite
```

### 4. Rodando os dois juntos

Para não precisar de dois terminais manuais, o projeto faz uso do `concurrently`
Execute na raiz do projeto:

```bash
npm install
npm run dev
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do `backend/`:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/open_campus"
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=open_campus

PORT=4000
```

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão usada pelo Prisma |
| `DB_HOST` / `DB_PORT` | Host e porta do servidor de banco |
| `DB_USER` / `DB_PASSWORD` | Credenciais do banco |
| `DB_NAME` | Nome do schema (`open_campus`) |
| `PORT` | Porta em que a API Express escuta |

> Nunca commitar o `.env` real — ele já está no `.gitignore`. Use `.env.example` como referência.

---

## Scripts disponíveis

### Frontend
| Script | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite) |
| `npm run build` | Type-check + build de produção |
| `npm run preview` | Serve o build de produção localmente |
| `npm run type-check` | Roda `vue-tsc --build --force` |

### Backend
| Script | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor com hot reload (`tsx watch src/server.ts`) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Roda a versão compilada |

---

## Padrões de código

**Frontend:**
- Composition API + `<script setup lang="ts">` (nunca Options API)
- Props tipadas via `interface` + `defineProps<Props>()`
- Componentização — extrair componente quando o template se repete ou passa de ~50 linhas
- CSS em `<style scoped>`, nunca inline solto
- Design responsivo com Vuetify
- Chamadas HTTP sempre através de `src/services/*.ts`
- Cores do tema via `rgb(var(--v-theme-*))`, nunca hex hardcoded em componente

**Backend:**
- Rotas só declaram `URL → controller`, sem lógica de negócio
- Controllers traduzem HTTP ↔ aplicação
- Services contêm a regra de negócio pura, sem conhecer `req`/`res`
- Erros tratados de forma centralizada em `middlewares/errorHandler.ts`

---

## Melhorias futuras

- Implementar autenticação real (login, sessão/JWT) e substituir o vínculo via `localStorage` por consulta de avaliações/curtidas por usuário autenticado
- Adicionar testes automatizados (unitários nos services do backend, e2e no fluxo de avaliação e fórum)
- Unificar o padrão visual de cabeçalho entre os módulos
- Adicionar paginação e cache nas listagens do Fórum e Calendário
- Deploy contínuo (CI/CD) com ambiente de homologação
