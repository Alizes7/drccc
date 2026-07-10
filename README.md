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

- **Hero 3D**: pedestal de mármore (`MeshPhysicalMaterial`, veios dourados via
  textura de canvas procedural) + emblema dourado montado inteiramente a
  partir de `boxGeometry` (sem GLTF), com 16 segmentos que partem dispersos
  e convergem com stagger e easing `power3-out`, flash emissivo dourado ao
  encaixar, HDRI de estúdio (`Environment preset="studio"`), `ContactShadows`,
  bloom sutil via `@react-three/postprocessing`, dolly de câmera e rotação
  idle contínua após a montagem, e parallax de mouse limitado a ±8°.
- **Fallback obrigatório**: detecção de `prefers-reduced-motion`, ausência de
  WebGL e heurística de mobile de baixo desempenho (`deviceMemory`/`saveData`)
  — nesses casos renderiza a imagem estática do frame final
  (`public/emblem-poster.jpg`, gerada a partir da referência enviada) com
  `alt` descritivo, servindo também como alternativa para leitores de tela.
- **Lazy-load do Three.js**: `next/dynamic(..., { ssr: false })` — o bundle
  de Three.js não entra no First Load JS da página (confirmado no build: a
  rota `/` fica em ~95 kB de First Load JS).
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
components/Hero3D/      Cena 3D (Pedestal, Emblem, Scene) + fallback estático
components/sections/    Hero, About, PracticeAreas, Team, Contact, Footer
components/             Nav, ContactForm
data/                   practiceAreas.ts, team.ts
lib/                    validation.ts, rateLimit.ts
public/                 emblem-poster.jpg (fallback/OG), og-image.jpg
```
