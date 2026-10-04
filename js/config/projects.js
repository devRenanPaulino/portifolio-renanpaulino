// Conteúdo do modal de cada projeto: links, contexto e a autocrítica (pontos fortes e melhorias).
// A chave (id) bate com o atributo data-project do card em html/partials/projects.html.
// Para editar um texto, mexa só aqui; o modal é montado por js/modules/project-modal.js.
export const PROJECTS = {
  sandbox: {
    num: "P1",
    title: "MS Sandbox Manager",
    role: "Back-End · Microserviço",
    summary:
      "Microserviço de comunicação da Raiz do Bem: uma API FastAPI que integra o WhatsApp (via Twilio), recebe webhooks, guarda o histórico de conversas no MongoDB e usa templates de mensagem.",
    links: [
      { label: "Repositório", href: "https://github.com/devRenanPaulino/ms-sandbox-manager" },
    ],
    context:
      "Foi meu primeiro projeto de back-end de verdade, feito com arquitetura em camadas (router, service, repository e gateway).",
    strengths: [
      "O Twilio fica atrás de uma interface (INotificationGateway), então dá para trocar o provedor sem mexer na regra de negócio.",
      "Tem 26 testes (pytest, mongomock e httpx) com fakes próprios em tests/fakes.py.",
      "README extenso, com endpoints, exemplos e passo a passo para expor com túnel, e um .env.example.",
    ],
    improve: [
      {
        t: "Rotas sem autenticação",
        d: "Nenhuma rota de /chat/* exige API key ou JWT, mesmo com Authorization liberado no CORS. Qualquer um que descubra a URL consegue chamar a API.",
      },
      {
        t: "Webhook sem validar a assinatura",
        d: "Não verifico o X-Twilio-Signature (o RequestValidator da Twilio resolveria). Além disso, o webhook engole exceções e responde sempre 200, escondendo falhas.",
      },
      {
        t: "Erros e logs",
        d: "Devolvo str(e) ao cliente, o que vaza detalhe interno, e uso print em vez de logging estruturado.",
      },
      {
        t: "Configuração e entrega",
        d: "As variáveis de ambiente são lidas sem validação (a MONGO_URI pode vir vazia), faltam versões fixadas no requirements.txt, Dockerfile e CI rodando o pytest.",
      },
    ],
    next: [
      "Validar a assinatura da Twilio e proteger as rotas.",
      "Migrar a configuração para pydantic-settings e adicionar Docker e CI.",
    ],
  },

  eleven: {
    num: "P4",
    title: "Eleven",
    role: "Full-Stack · UI/UX · Gestor de produto",
    summary:
      "Plataforma de trilhas de aprendizado. Criei a identidade visual, o UX e a estrutura das trilhas, e desenvolvi o front-end, com quiz alimentado por uma API.",
    links: [
      { label: "Ver o site", href: "https://eleven-gs.github.io/Front-End-Eleven/" },
      { label: "Repositório", href: "https://github.com/Eleven-GS/Front-End-Eleven" },
    ],
    context:
      "HTML, CSS e JavaScript puros, sem build. Foi um projeto em que eu cuidei do produto, do design e do código ao mesmo tempo.",
    strengths: [
      "Menu hambúrguer acessível, com aria-expanded, aria-controls e nav com aria-label.",
      "Quase todas as imagens de conteúdo têm alt descritivo.",
      "CSS separado por faixa de tela (extra small, small, medium e large) e identidade visual consistente.",
    ],
    improve: [
      {
        t: "Peso das imagens",
        d: "A pasta assets soma cerca de 36 MB: só o backgroundtest.gif tem 21 MB e o background-city.gif, 7,6 MB. Trocar por vídeo ou WebP e usar loading=lazy (não uso em nenhuma página) deixaria o carregamento muito mais leve.",
      },
      {
        t: "Foco do teclado removido",
        d: "Há 6 ocorrências de outline: none em global.css sem um indicador de foco no lugar, o que prejudica quem navega pelo teclado.",
      },
      {
        t: "Formulários e semântica",
        d: "Os inputs do login só têm placeholder, sem label. O e-mail do cadastro usa type=text, e há imagens sem alt no contato.",
      },
      {
        t: "SEO",
        d: "Nenhuma página tem meta description e o title da home é só “Eleven”.",
      },
      {
        t: "Login de fachada",
        d: "O login redireciona direto para o painel e guarda só o nome no localStorage. Serviu para o protótipo, mas não é autenticação.",
      },
    ],
    next: [
      "Otimizar as mídias, adicionar labels, foco visível e metas por página.",
      "Atualizar o README, que cita arquivos que não existem mais.",
    ],
  },

  raiz: {
    num: "P2",
    title: "Raiz do Bem",
    role: "Full Stack · Front-End",
    summary:
      "Plataforma de gestão de uma ONG de saúde bucal: cadastros e designações de dentistas, beneficiários e coordenadores, com acesso por perfil e recursos de acessibilidade por voz.",
    links: [
      { label: "Ver o site", href: "https://raiz-do-bem.vercel.app/" },
      { label: "Repositório", href: "https://github.com/TdB-PlataformaRaizDoBem/Raiz-do-Bem" },
    ],
    context:
      "React 19, TypeScript estrito, Vite, Tailwind, React Router e React Hook Form, com GSAP e Lenis nas animações. São mais de 160 arquivos .ts/.tsx e cerca de 13 mil linhas.",
    evolution:
      "É onde eu mais evoluí em componentização desde o Rivalix: uma base de UI reutilizável (Modal, Toast, Button, FilterBar), mais de 30 hooks, camada de serviços e mappers separando o contrato da API do modelo da tela.",
    strengths: [
      "Camada de API centralizada em httpClient.ts, com tratamento por status HTTP e mappers em domain/ entre a API e a UI.",
      "Rotas protegidas por perfil (ProtectedRoutes), token só em memória (sem localStorage) e páginas carregadas sob demanda com lazy().",
      "A mesma tela de gestão (UserManagementPage) serve dentistas, beneficiários e coordenadores, guiada por configuração.",
      "Acessibilidade acima da média para um projeto acadêmico: lang pt-BR, cerca de 97 atributos aria e leitura por voz (useSpeech, useVoiceSearch).",
    ],
    improve: [
      {
        t: "Sem testes automatizados",
        d: "Não há nenhum teste nem script de test. O maior risco está nos mappers, no tratamento do JWT e nas regras de permissão. Eu começaria com Vitest e Testing Library.",
      },
      {
        t: "Componentes ainda grandes",
        d: "Home.tsx (551 linhas), UserManagementPage (550) e Designacao (511) misturam dados, lógica e JSX. Parte dos dados poderia ir para arquivos próprios, como já faço em aboutData e faqData.",
      },
      {
        t: "Formulários duplicados",
        d: "Criar e atualizar dentista, beneficiário e coordenador são pares quase idênticos. Um formulário parametrizado por entidade cortaria bastante código.",
      },
      {
        t: "Configuração espalhada",
        d: "A BASE_URL é redeclarada em 8 services mesmo existindo no httpClient, e o ChatService ainda usa fetch direto, com fallback fixo para localhost.",
      },
      {
        t: "Resíduos e erros engolidos",
        d: "Há um arquivo de credenciais mock sem uso (data/auth.tsx) que deveria sair, dois catch vazios e nenhum ErrorBoundary.",
      },
      {
        t: "Sem cache de requisições",
        d: "Cada hook busca por conta própria. Migrar os hooks de domínio para o TanStack Query evitaria requisições repetidas.",
      },
    ],
    next: [
      "Adicionar testes e rodar numa pipeline de CI.",
      "Unificar os formulários, centralizar a BASE_URL e quebrar as páginas grandes.",
      "Fazer uma auditoria de acessibilidade (axe ou Lighthouse) e atualizar o README.",
    ],
  },

  rivalix: {
    num: "P5",
    title: "Rivalix",
    role: "Front-End · UI/UX Designer",
    summary:
      "Plataforma para a comunidade gamer, com torneios, chaveamento, perfil, loja e feed. Fui web designer, da criação da marca ao desenvolvimento do front-end em React.",
    links: [
      { label: "Ver o site", href: "https://plataforma-rivalix.vercel.app/" },
      { label: "Repositório", href: "https://github.com/RivalixGaming/PlataformaRivalix" },
    ],
    context:
      "Fiz para o Demo Day com apenas uns dois meses de contato com a área, e o uso de React foi uma exigência do projeto. Por isso quase não aproveitei a principal vantagem do framework, a componentização. É o projeto em que eu mais vejo o que melhorar, e que me levou a evoluir no Raiz do Bem.",
    strengths: [
      "Arquitetura coerente para o tamanho: DefaultLayout com rotas filhas e quatro contexts (tema, perfil, artes salvas e nível).",
      "Componentes de domínio bem pensados, como o chaveamento de torneio (TorneioChave, TorneioPartida, MatchModal), e a pasta Perfil fatiada em seções.",
      "CSS Modules em 33 dos 46 arquivos de estilo e um esforço real de responsividade (81 media queries).",
    ],
    improve: [
      {
        t: "Duas navbars quase iguais",
        d: "Navbar e NavBarHome têm CSS separado (300 e 470 linhas). E 17 páginas importam a navbar por conta própria, quando o DefaultLayout poderia entregá-la uma vez só via Outlet.",
      },
      {
        t: "Home gigante e repetitiva",
        d: "Home.jsx tem 551 linhas, cerca de 30 imports de imagem e cards copiados em vez de um .map sobre um array. O ScrollReveal usa seletores nth-child, mexendo no DOM por fora do React.",
      },
      {
        t: "Estilo global colidindo",
        d: "Há um Home.css global de 1.407 linhas com classes genéricas como .title, ao lado dos CSS Modules. Misturar os dois convida colisões.",
      },
      {
        t: "Modais sem base comum",
        d: "Cada modal reimplementa overlay e fechamento, e um deles até importa o CSS de outro. Um componente Modal genérico resolveria.",
      },
      {
        t: "Estado repetido",
        d: "O padrão useState + localStorage + useEffect se repete em vários arquivos (28 usos de localStorage), sem um hook useLocalStorage, e o JSON.parse não tem tratamento de erro.",
      },
      {
        t: "Dependência morta e organização",
        d: "O Tailwind está instalado mas não é usado. Os dados de exemplo ficam dentro dos componentes (Feed, Loja), e as pastas Components/Home.page e pages/HomePage se confundem.",
      },
    ],
    next: [
      "Mover a navbar para o layout e criar um Modal base.",
      "Quebrar a Home em seções alimentadas por arrays e extrair o useLocalStorage.",
      "Escolher um único sistema de estilo e remover o que não é usado.",
    ],
  },

  bikcraft: {
    num: "P3",
    title: "Bikcraft",
    role: "Front-End · Curso Origamid",
    summary:
      "Site responsivo de uma marca de bicicletas, com catálogo, página de produto, seguros, FAQ, contato e orçamento. Projeto de estudo em HTML, CSS e JavaScript puros.",
    links: [
      { label: "Ver o site", href: "https://bikcraft-seven-alpha.vercel.app/" },
      { label: "Repositório", href: "https://github.com/devRenanPaulino/bikcraft" },
    ],
    context: "Foi onde treinei CSS modular e boas práticas de HTML antes de entrar nos frameworks.",
    strengths: [
      "CSS dividido por componente e página, importado em um único style.css, e meta description própria em cada página.",
      "Imagens com width e height (evitam deslocamento do layout), fontes com preconnect e FAQ com aria-expanded e aria-controls.",
      "Formulários com label associado a cada campo.",
    ],
    improve: [
      {
        t: "Erro de JavaScript no console",
        d: "A última linha do script chama galeria.forEach(eventosGaleria), mas essa função não existe. Gera um ReferenceError em todas as páginas.",
      },
      {
        t: "Estilo de foco inválido",
        d: "Em formulario.css usei ::focus (com dois pontos), que não é um seletor válido. O correto é :focus, então o destaque do campo nunca aparece.",
      },
      {
        t: "Imagens sem otimização",
        d: "Nenhuma imagem usa loading=lazy e tudo está em JPG, sem WebP.",
      },
      {
        t: "SEO e compartilhamento",
        d: "Faltam Open Graph e canonical, algumas descriptions são fracas e há erros de digitação nos textos.",
      },
      {
        t: "Formulários e galeria",
        d: "Os formulários não têm backend (o action aponta para a própria página) e a galeria só responde ao clique, não ao teclado.",
      },
    ],
    next: [
      "Corrigir o :focus e o erro do script, converter imagens para WebP com lazy-loading e escrever um README.",
    ],
  },

  arquitetura: {
    num: "P6",
    title: "Arquitetura de Software",
    role: "Documentação · Estudo",
    summary:
      "Documento que conta a evolução de uma arquitetura passo a passo, de um servidor único até multi-região: separação de app e banco, load balancer, replicação, cache (cache-aside), auto scaling, mensageria e CI/CD com observabilidade. Tem 16 diagramas.",
    links: [
      { label: "Repositório", href: "https://github.com/devRenanPaulino/Arquitetura-de-Software" },
    ],
    context:
      "Escrevi estudando o livro System Design, com exemplos do contexto do Rivalix. É a base do meu objetivo de chegar a arquiteto de software.",
    strengths: [
      "Progressão didática: cada etapa expõe o problema (ponto único de falha), a solução e o novo desafio que ela cria.",
      "Um diagrama ao lado de cada etapa, inclusive do padrão cache-aside.",
      "Discute trade-offs reais, como a consistência eventual, com tabela de mitigações.",
    ],
    improve: [
      {
        t: "Faltam requisitos com números",
        d: "Não defino carga (requisições por segundo), SLA/SLO, RTO/RPO nem orçamento, então a conclusão “milhões de usuários” fica sem base.",
      },
      {
        t: "Decisões não registradas",
        d: "Não há ADRs. A decisão de aceitar consistência eventual aparece uma vez, sem alternativas, custos ou data.",
      },
      {
        t: "Temas só citados",
        d: "Segurança (WAF, autenticação, criptografia), observabilidade, CI/CD e custo ficam em uma lista curta no final.",
      },
      {
        t: "Erros no texto",
        d: "O exemplo de replicação mistura IPs (192.168 e 196.168) e o texto cita um master que não bate com o bloco. O trecho de cache é rotulado como php, mas a sintaxe é de Python. Também afirmo “zero downtime” de forma absoluta.",
      },
    ],
    next: [
      "Criar uma pasta docs/adr com 3 ou 4 decisões (replicação, cache e mensageria) e uma seção de requisitos com números.",
      "Corrigir os exemplos de código e adicionar um índice.",
    ],
  },

  mapa: {
    num: "P7",
    title: "Mapa de Carreira",
    role: "Front-End · Planejamento pessoal",
    summary:
      "Meu primeiro portfólio: um roadmap de carreira com barras de skills, linha do tempo, soft skills, download do currículo e o VLibras para acessibilidade em Libras.",
    links: [
      { label: "Ver o site", href: "https://devrenanpaulino.github.io/Mapa-de-Carreira/" },
      { label: "Repositório", href: "https://github.com/devRenanPaulino/Mapa-de-Carreira" },
    ],
    context:
      "É a origem da seção de Carreira desta página. Aqui eu aprendi a estruturar um roadmap, e hoje o refaço com mais clareza.",
    strengths: [
      "Preocupação com acessibilidade: VLibras, alt na foto, lang pt-br e rel=noopener nos links externos.",
      "Roadmap claro por estágio, com soft skills e tecnologias.",
      "Identidade visual consistente, com animações de entrada.",
    ],
    improve: [
      {
        t: "HTML com deslizes",
        d: "Há um </div> sobrando no fim do arquivo, imagens de onda sem alt e aria-labelledby apontando para ids que não existem.",
      },
      {
        t: "Percentuais de skills arbitrários",
        d: "As barras (React 65%, Figma 85%…) são autoavaliação e não dizem nada verificável. Níveis ligados a projetos reais seriam mais honestos, e foi isso que passei a fazer aqui no portfólio novo.",
      },
      {
        t: "Responsividade rasa",
        d: "Só tenho duas media queries (1024px e 767px).",
      },
      {
        t: "Dependências e documentação",
        d: "O ScrollReveal vem do CDN sem versão fixa, o script é type=module sem necessidade, e faltam README, meta description e Open Graph.",
      },
    ],
    next: ["Corrigir o HTML, fixar a versão do CDN e escrever um README com o deploy."],
  },
};
