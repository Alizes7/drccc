# DRC Advogados

Site institucional estático do DRC Advogados, construído com Next.js, Tailwind CSS, Framer Motion e uma sequência de 240 frames para o hero controlado pelo scroll.

## Desenvolvimento

```powershell
npm ci
npm run dev
```

## Verificações

```powershell
npm run test:sequence
npm run validate:frames
npm run security:check
npm run lint
npm audit --audit-level=high
npm run build
```

O build gera a pasta `out/` para hospedagem estática. O arquivo `public/_headers` precisa ser aplicado pelo host de deploy; ele não é aplicado automaticamente pelo `output: export` do Next.

## Deploy seguro

- Publique somente por HTTPS e mantenha HSTS ativo apenas no domínio de produção correto.
- Aplique `public/_headers` no host e confirme CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy` na resposta de produção.
- Configure `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` apenas com um endpoint HTTPS do Formspree aprovado. A variável é pública e não deve conter API keys.
- Sem esse endpoint, o formulário permanece bloqueado e o site oferece WhatsApp, telefone e e-mail como canais diretos.
- O provedor do formulário precisa fazer validação no servidor, rate limiting, proteção contra spam, política de origem, retenção segura e tratamento compatível com LGPD.
- Não publique `.env`, `node_modules`, `.next`, `out` intermediário, source maps ou arquivos de desenvolvimento.
- Faça `npm audit --audit-level=high` antes de cada deploy. O framework está na linha Next 16; o audit atual pode reportar um advisory moderado no PostCSS interno do Next, sem vulnerabilidades altas ou críticas e sem entrada de usuário no pipeline CSS.
- Verifique no host final que os 240 frames são servidos por `/frames/` e que o contato não tenta usar endpoint placeholder.

## Estrutura visual

- Hero fixo por scroll: `320vh` no desktop e `240vh` no mobile.
- Mobile usa a sequência amostrada e preserva a revelação do frame final.
- Reduced motion apresenta o símbolo completo sem scrubbing.
- A navegação permanece nativa e os anchors usam scroll vertical previsível.
