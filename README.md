# Nox Corretores

Plataforma para corretores de seguros realizarem o cadastro e organização de clientes, veículos e apólices, facilitando o controle diário e centralizando informações importantes em um único lugar.

---

## Funcionalidades

- **Landing Page** — Página institucional com foco em conversão, apresentando o sistema e incentivando cadastro
- **Autenticação** — Login com e-mail e senha, sessão via cookie HTTP-only
- **Dashboard** — Área restrita para usuários autenticados
- **Gestão centralizada** — Estrutura preparada para clientes, veículos e apólices (em evolução)

---

## Stack Técnica

| Tecnologia | Versão |
|------------|--------|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Node | 20+ |

---

## Estrutura do Projeto

```
nox-corretores/
├── web/                      # Aplicação Next.js
│   ├── src/
│   │   ├── app/              # App Router
│   │   │   ├── api/          # API Routes (auth)
│   │   │   ├── dashboard/    # Página do dashboard
│   │   │   ├── login/        # Página de login
│   │   │   ├── layout.tsx    # Layout raiz
│   │   │   ├── page.tsx      # Landing page (/)
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── landing/      # Componentes da landing page
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── problem-solution.tsx
│   │   │   │   ├── features.tsx
│   │   │   │   ├── benefits.tsx
│   │   │   │   ├── cta.tsx
│   │   │   │   └── footer.tsx
│   │   │   └── ui/           # Componentes reutilizáveis
│   │   ├── contexts/         # React Context (AuthProvider)
│   │   ├── hooks/            # Custom hooks (useAuth)
│   │   ├── lib/              # Utilitários (auth, cookies)
│   │   ├── services/         # API e mock services
│   │   └── types/            # Tipos TypeScript
│   ├── middleware.ts         # Proteção de rotas
│   ├── next.config.ts
│   └── package.json
└── README.md
```

---

## Arquitetura

### Rotas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | Pública | Landing page |
| `/login` | Pública | Página de login |
| `/register` | Pública | Cadastro (a implementar) |
| `/dashboard` | Protegida | Área do usuário autenticado |

### Autenticação

1. **Login** — O usuário envia e-mail e senha; o serviço retorna `user` e `token`
2. **Cookie** — O token é gravado em cookie HTTP-only via `/api/auth/set-cookie`
3. **Sessão** — O middleware valida o token para rotas protegidas
4. **Logout** — Remove o cookie via `/api/auth/clear-cookie`

A autenticação é baseada em cookies (`auth-token`), com `httpOnly`, `sameSite: lax` e `secure` em produção.

### Camadas

```
UI (React Components)
    ↓
Hooks / Context (useAuth, AuthProvider)
    ↓
Services (userService, apiService)
    ↓
API Routes / Mock Service
```

- **apiService** — Encapsula chamadas HTTP; atualmente redireciona para `mockService`
- **mockService** — Simula backend (login, me, logout) para desenvolvimento
- **AuthProvider** — Disponibiliza `user`, `login`, `logout` e `refreshUser` para a árvore de componentes

### Middleware

O `middleware.ts` roda em toda requisição e:

- Redireciona `/` para `/dashboard` (autenticado) ou `/login` (não autenticado)
- Redireciona usuário autenticado em `/login` para `/dashboard`
- Redireciona rotas protegidas para `/login` quando não autenticado

> **Nota:** Para exibir a landing em `/`, ajuste o middleware para tratar `/` como rota pública.

### Landing Page

Componentes Server Components em `components/landing/`:

- **Navbar** — Fixa, com blur, links Login e Cadastrar
- **Hero** — Headline, subtítulo e CTAs
- **ProblemSolution** — Dores do corretor e solução
- **Features** — Funcionalidades principais
- **Benefits** — Benefícios da plataforma
- **CTA** — Seção de conversão
- **Footer** — Links e copyright

Design em dark mode, cor primária `#9333ea`, estilo SaaS, responsivo (mobile-first).

---

## Como Executar

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Desenvolvimento

```bash
cd web
npm install
npm run dev
```

A aplicação estará em [http://localhost:3000](http://localhost:3000).

### Build e Produção

```bash
cd web
npm install
npm run build
npm start
```

---

## Credenciais de Teste

Para testar o login (ambiente mock):

- **E-mail:** `john@email.com`
- **Senha:** `123456`

---

## Configuração

O projeto usa variáveis de ambiente apenas onde necessário. Para produção, configure:

- `NODE_ENV=production` — Ativa cookie `secure` e otimizações
- Backend real — Substituir `mockService` por chamadas a API externa em `apiService`

---

## Licença

Projeto privado. Todos os direitos reservados.
