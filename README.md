# Aureon Partners — Plataforma Institucional

Plataforma enterprise para gestão patrimonial: site institucional, blog (Insights), área do cliente autenticada, CMS headless, billing via Stripe e captação/gestão de leads.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, React 19, Server Components/Actions) |
| Linguagem | TypeScript estrito |
| Estilo | Tailwind CSS 3 + shadcn/ui (Radix Primitives) |
| Animação | Framer Motion |
| CMS | Payload CMS 3 (embarcado no Next.js) |
| Banco de dados | PostgreSQL — Prisma (domínio de produto) + Payload (domínio de conteúdo) |
| Autenticação | Auth.js v5 (Credentials + Google OAuth opcional) |
| E-mail | Resend + React Email |
| Pagamentos | Stripe (Checkout + Billing Portal + Webhooks) |
| Upload de arquivos | UploadThing |
| Deploy | Vercel |

## Decisões de arquitetura importantes

### 1. Dois ORMs, um banco, dois domínios

O Prisma gerencia o schema `public` (contas de usuário, autenticação, leads, assinaturas, documentos, auditoria). O Payload gerencia seu próprio schema `payload` (páginas, posts, mídia, configurações do site) no **mesmo banco Postgres**. Isso evita que duas ORMs disputem as mesmas tabelas, enquanto permite operar com um único banco gerenciado (ex: um único projeto no Neon/Supabase/RDS).

Se preferir bancos totalmente separados, basta apontar `DATABASE_URL` do Payload (dentro de `payload.config.ts`) para outra connection string.

### 2. Auth.js dividido em `auth.config.ts` (edge-safe) e `auth.ts` (Node)

O middleware roda no Edge Runtime, que não suporta o Prisma Adapter nem `bcryptjs`. Por isso a configuração é dividida: `auth.config.ts` contém apenas o que é seguro no Edge (callback `authorized` para proteção de rotas); `auth.ts` estende essa config com o adapter, os providers e a lógica de hash de senha, usada em Server Components, Route Handlers e Server Actions.

### 3. CRM como adapter plugável

`src/lib/crm/` define uma interface `CrmAdapter` única. A implementação concreta (`hubspot.ts`) pode ser trocada por Salesforce, Pipedrive, RD Station etc. sem alterar nenhuma rota ou Server Action — apenas a variável `CRM_PROVIDER`.

### 4. Server Actions como API principal; Route Handlers para integrações externas

Formulários do site usam Server Actions (`src/server/actions/*`) — menos boilerplate, type-safe ponta a ponta. Os Route Handlers REST (`/api/leads`, `/api/stripe/webhook`, `/api/uploadthing`) existem para consumidores que não são o próprio Next.js (webhooks do Stripe, integrações externas, o SDK do UploadThing).

## Estrutura de pastas

```
src/
├── app/
│   ├── (app)/                 # Root layout do site (fontes, JSON-LD, Toaster)
│   │   ├── (marketing)/       # Landing, Sobre, Serviços, Insights, Contato, Legal
│   │   ├── (auth)/            # Login, Cadastro, Recuperar/Redefinir senha
│   │   └── (dashboard)/       # Área autenticada (cliente/consultor/admin)
│   ├── (payload)/             # Admin UI + REST/GraphQL do Payload (root layout próprio)
│   └── api/                   # Auth.js, leads, Stripe webhook, UploadThing, cron
├── components/
│   ├── ui/                    # Design system (button, card, dialog, table...)
│   ├── marketing/              # Seções da landing/institucionais
│   ├── dashboard/               # Sidebar, Topbar, billing, documentos...
│   ├── auth/                    # Formulários de autenticação
│   ├── seo/                      # JSON-LD (schema.org)
│   └── shared/                    # Container, SectionHeading, AnimatedSection...
├── server/
│   ├── actions/                # Server Actions (leads, auth, billing, conta)
│   └── services/                 # E-mail, dashboard queries
├── lib/                         # auth, prisma, stripe, resend, crm, seo, utils, env
├── payload/                     # payload.config.ts, collections, globals, blocks
├── emails/                       # Templates React Email
└── types/                         # Module augmentation (next-auth.d.ts)

prisma/
├── schema.prisma                 # Domínio de aplicação
└── seed/index.ts                   # Usuário admin + leads de exemplo
```

## Como rodar localmente

### 1. Pré-requisitos
- Node.js 20.9+
- PostgreSQL 16 rodando localmente ou em provedor gerenciado (Neon, Supabase, RDS)
- Conta no Stripe, Resend e UploadThing (todas têm modo de teste gratuito)

### 2. Instalação

```bash
npm install
cp .env.example .env
# edite .env com suas credenciais reais
```

### 3. Banco de dados

```bash
npm run db:push          # cria as tabelas do domínio Prisma
npm run db:seed          # cria usuário admin + consultor + leads de exemplo
npm run payload:generate-types     # gera src/payload/payload-types.ts a partir das collections
npm run payload:generate-importmap # gera o importMap.js real do admin (placeholder incluído)
```

### 4. Desenvolvimento

```bash
npm run dev
```

- Site institucional: `http://localhost:3000`
- Área do cliente: `http://localhost:3000/login` (use as credenciais impressas pelo seed)
- CMS: `http://localhost:3000/admin` (primeiro acesso usa o usuário Payload — crie um na primeira tela do `/admin`, que é independente do usuário Prisma)

### 5. Webhooks do Stripe (local)

```bash
npm run stripe:listen
```

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Configure todas as variáveis de `.env.example` em **Project Settings → Environment Variables**.
3. Configure o webhook do Stripe apontando para `https://seu-dominio.com/api/stripe/webhook` e copie o `STRIPE_WEBHOOK_SECRET` gerado.
4. O `vercel.json` já configura o cron de ressincronização de CRM (`/api/cron/sync-crm`, a cada hora).
5. Rode as migrations de produção via `npm run db:migrate:deploy` (pipeline de CI/CD) ou `npm run db:push` para o primeiro deploy.

## Segurança implementada

- Cabeçalhos de segurança globais (CSP, HSTS, X-Frame-Options) em `next.config.mjs`.
- Validação de variáveis de ambiente fail-fast (`src/lib/env.ts`).
- Senhas com `bcryptjs` (12 rounds) — nunca armazenadas em texto plano.
- Tokens de redefinição de senha de uso único, com expiração de 1 hora.
- Mensagens de erro de autenticação deliberadamente genéricas (evitam enumeração de contas).
- RBAC (`CLIENT` / `ADVISOR` / `ADMIN`) reforçado tanto no middleware quanto em cada Server Action sensível (defesa em profundidade).
- Honeypot + rate limiting básico nos formulários públicos de lead.
- Auditoria (`AuditLog`) de eventos sensíveis (login, troca de senha, mudança de papel).

## O que é ponto de extensão deliberado (não "faltando por esquecimento")

- **Rate limiting**: a implementação em `src/lib/rate-limit.ts` é em memória (single-instance). Para múltiplas instâncias na Vercel, troque por `@upstash/ratelimit`.
- **CRM**: apenas o adapter HubSpot está implementado como referência concreta; a interface já suporta outros provedores.
- **Testes automatizados**: a CI já roda lint/type-check/build; adicionar Vitest/Playwright é o próximo passo natural.
- **Internacionalização**: o conteúdo está em pt-BR; o Payload e o Next.js App Router suportam i18n nativamente se o produto expandir para outros mercados.
- **Imagens de marca**: ver `public/README.md` — logo e OG image reais precisam ser adicionados antes do lançamento.
