# DRC Advogados — Site Institucional

Next.js 14 (App Router) + TypeScript + Tailwind CSS, com hero 3D real em
React Three Fiber (emblema dourado montando-se sobre pedestal de mármore).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Build de produção: `npm run build && npm start`.

O projeto foi validado com `npm run build` (compila e pré-renderiza a home
estaticamente) e `tsc --noEmit` (sem erros de tipo). O único requisito de
ambiente é acesso à internet para o download das fontes do Google Fonts
durante o build (`next/font/google`).

## O que foi implementado conforme o briefing

- **Fontes self-hosted**: Cormorant Garamond, Montserrat e IBM Plex Mono são
  servidas via `@fontsource/*` (arquivos de fonte embutidos no pacote npm),
  não via `next/font/google`. O build anterior falhava sempre que o
  ambiente de build não conseguia alcançar `fonts.googleapis.com` — isso
  foi eliminado por completo: build e runtime não dependem de nenhuma
  rede externa para tipografia. A CSP também foi apertada (removidas as
  permissões para `fonts.googleapis.com`/`fonts.gstatic.com`, já que não
  são mais necessárias).
- **Hero com sequência de frames scroll-driven**: em vez de recriar o emblema
  em 3D, o hero usa diretamente os 240 frames de referência que você
  forneceu. Foram selecionados 81 frames (1 a cada 3), redimensionados para
  960px de largura e comprimidos em WebP — **~872 KB no total, ~11 KB por
  frame** — servidos de `public/sequence/`. Um `<canvas>` desenha o frame
  correspondente à posição de rolagem (técnica "scroll-scrub" no estilo
  Apple): a página reserva uma faixa de rolagem de 280vh pinada
  (`position: sticky`) durante a qual o usuário "rola" através da animação
  de montagem do emblema, quadro a quadro, com base na referência real —
  sem tentar recriar a peça proceduralmente.
- **Fallback obrigatório**: detecção de `prefers-reduced-motion` e heurística
  de mobile de baixo desempenho (`deviceMemory`/`saveData`) — nesses casos
  não há rolagem "sequestrada": a seção volta a ser um hero de altura normal
  (`min-h-screen`) com a imagem do frame final como fundo estático, com
  `alt` descritivo (mesma imagem serve de alternativa para leitores de tela).
- **Carregamento progressivo**: o primeiro frame carrega com prioridade alta
  e aparece imediatamente; os demais 80 carregam em segundo plano
  (`fetchPriority="low"`) enquanto a página já está interativa. Isso evita
  penalizar o LCP do resto do site.
- **Sem dependência de WebGL/Three.js**: a versão anterior usava React Three
  Fiber; foi abandonada em favor da sequência de imagens por ser mais fiel
  à referência, mais leve (~0.87 MB vs. bundle Three.js) e por eliminar de
  vez os problemas de CSP com fetch de HDRI externo que a versão 3D tinha.
- **Paleta e tipografia**: tokens `ivory`/`gold`/`charcoal` no Tailwind,
  Cormorant Garamond / Montserrat / IBM Plex Mono via `next/font/google`.
- **Seções**: Hero, Sobre, Áreas de Atuação, Equipe, Contato, Rodapé —
  como uma única página com âncoras (`#sobre`, `#areas`, `#equipe`,
  `#contato`), padrão comum para sites institucionais deste porte.
- **Formulário de contato**: honeypot, sanitização de input (remoção de
  tags, truncagem) e rate limiting em memória (5 req/min por IP) na rota
  `app/api/contact/route.ts`.
- **Headers de segurança**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
  etc. em `next.config.js` (aplicados via `headers()`) e replicados em
  `vercel.json` para deploy na Vercel.
- **Conformidade OAB**: nenhuma estatística de sucesso, nenhum superlativo,
  CTAs institucionais ("Fale conosco", "Agendar uma conversa"), aviso de
  conformidade com o Provimento 94/2000 no rodapé.

## ⚠️ Pontos que precisam de dados reais antes de publicar

O briefing menciona dados "já definidos no projeto" ou "reais fornecidos
pelo cliente" que não estavam presentes nos arquivos enviados nesta
conversa. Estes pontos estão marcados com `TODO` no código:

1. **`data/practiceAreas.ts`** — as 10 áreas de atuação são um placeholder
   plausível para um escritório corporativo; substitua pelos nomes reais.
2. **`data/team.ts`** — os nomes dos quatro sócios(as) são reais, mas a
   *área de atuação* de cada um e as fotos são placeholders
   (`/public/team/placeholder.jpg` não existe — adicione as fotos reais).
3. **`components/sections/Hero.tsx`** e **`Contact.tsx`** — número de
   WhatsApp (`5511000000000`) e endereço do escritório são placeholders.
4. **`app/layout.tsx`** — `metadataBase` usa um domínio placeholder
   (`drcadvogados.com.br`); ajuste para o domínio real antes do deploy.
5. **`app/api/contact/route.ts`** — atualmente apenas loga o contato
   sanitizado no console; integre com um serviço real de e-mail/CRM
   (ex.: Resend, SendGrid) antes de ir para produção.
6. **Rate limiting em memória** funciona para um único processo; em deploy
   multi-instância (ex. Vercel com múltiplas regions), substitua por um
   backend compartilhado (ex. Upstash Redis) — a interface em
   `lib/rateLimit.ts` foi feita para ser trocada sem alterar a rota da API.

## Estrutura

```
app/                    App Router: layout, home, rota de API de contato
components/HeroSequence/  Sequência de frames scroll-driven + fallback estático
components/sections/    Hero, About, PracticeAreas, Team, Contact, Footer
components/             Nav, ContactForm
data/                   practiceAreas.ts, team.ts
lib/                    validation.ts, rateLimit.ts
public/sequence/        81 frames WebG (frame-001.webp … frame-081.webp)
public/                 emblem-poster.webp (fallback/último frame), og-image.jpg
```
