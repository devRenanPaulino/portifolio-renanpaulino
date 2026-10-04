# Portfólio · Renan Paulino

Site estático em HTML, CSS e JavaScript (módulos ES). Sem framework e sem etapa de build para o CSS e o JS.
O HTML é dividido em partials e montado por um script de uma linha de comando.

## Estrutura

```
portfolio-renan/
├── index.html                 ← GERADO (não edite). É o que o navegador e o GitHub Pages usam
├── html/
│   ├── template.html          ← <head>, ordem das seções e scripts
│   └── partials/              ← uma seção por arquivo
│       ├── decor.html         (grão e cursor)
│       ├── header.html        (navegação)
│       ├── hero.html · ticker-tech.html · stats.html
│       ├── about.html · now.html (Vivo) · projects.html
│       ├── career.html · ticker-learning.html · skills.html
│       └── education.html · contact.html · footer.html
├── css/
│   ├── main.css               ← só @imports, define a ordem
│   ├── base/                  tokens (cores/fontes), reset, tipografia, reduced-motion
│   ├── layout/                container, section, nav, footer
│   ├── components/            grain, cursor, live-dot, buttons, ticker, card, project-art, project-modal
│   └── sections/              hero, stats, about, now, projects, career, skills, education, contact
├── js/
│   ├── main.js                ← ponto de entrada: chama tudo na ordem
│   ├── config/                dados editáveis (skills.js, career.js, projects.js)
│   ├── utils/                 dom, env, scroll
│   ├── modules/               comportamento sem GSAP (DOM, timer, canvas, mouse, circuito)
│   ├── animations/            tudo que usa GSAP/ScrollTrigger/Lenis (uma seção por arquivo)
│   └── file-warning.js        aviso se abrir com duplo clique
├── assets/img/                renan-redondo.webp · palco.webp
├── scripts/build.mjs          ← monta index.html
└── package.json
```

## Como rodar

Módulos ES só funcionam por `http://`, então **não abra o index.html com duplo clique**.

- **VS Code:** botão direito em `index.html` → _Open with Live Server_.
- **Terminal:** `npm start` (usa `npx serve`) e abra o endereço mostrado.

As animações carregam GSAP e Lenis por CDN, então precisa de internet. Se o CDN falhar,
o site aparece normalmente, só sem animação.

## Fluxo de edição

### HTML (precisa de Node)

1. Edite o arquivo da seção em `html/partials/`.
2. Rode `npm run build` (ou deixe `npm run watch` aberto: ele regenera ao salvar).
3. Atualize o navegador.

> `index.html` é sobrescrito a cada build. Mudanças feitas direto nele se perdem.
> Para mudar `<title>`, descrição ou ordem das seções, edite `html/template.html`.

### CSS

- **Cores, fontes e espaçamento:** `css/base/tokens.css`. Mudar `--volt` troca o verde neon do site inteiro.
- **Uma seção:** `css/sections/<seção>.css`. Cada arquivo cobre só aquela seção, incluindo o responsivo dela.
- **Algo reutilizável** (botão, card, faixa): `css/components/`.
- **Arquivo novo:** crie e adicione o `@import` em `css/main.css`. A ordem importa; `reduced-motion` fica por último.

### JavaScript

- **Mudar dados:** `js/config/skills.js` (nome e % de cada skill) e `js/config/career.js` (rótulos do circuito).
- **Comportamento sem animação:** `js/modules/`.
- **Animação de uma seção:** `js/animations/<seção>.js`.
- **Módulo novo:** crie o arquivo, importe e chame em `js/main.js`.

## Tarefas comuns

| Quero…                       | Edite                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Atualizar o cargo na Vivo    | `html/partials/now.html` (e `hero.html`, no texto de apresentação)                                |
| Adicionar um projeto         | copie um `<a class="card view" data-project="id">` em `projects.html` e crie o `id` em `js/config/projects.js` (modal) |
| Editar a autocrítica (modal) | `js/config/projects.js`                                                                            |
| Arte do card de projeto novo | `css/components/project-art.css`                                                                  |
| Trocar skills e porcentagens | `js/config/skills.js`                                                                             |
| Atualizar números do topo    | `html/partials/stats.html` (`data-count`)                                                         |
| Mudar o mapa de carreira     | `html/partials/career.html` (e `js/config/career.js` para os rótulos)                             |
| Mudar as faixas de texto     | `html/partials/ticker-tech.html` e `ticker-learning.html`                                         |
| Atualizar cursos e idiomas   | `html/partials/education.html`                                                                    |
| Trocar cores                 | `css/base/tokens.css`                                                                             |

## Publicar no GitHub Pages

1. Rode `npm run build` e confirme que `index.html` está atualizado.
2. Envie a pasta para um repositório (o `index.html` gerado vai junto).
3. _Settings → Pages → Deploy from a branch → `main` / root_.

## Formatação (opcional)

O projeto foi formatado com Prettier (`.prettierrc`): `npx prettier --write .`
