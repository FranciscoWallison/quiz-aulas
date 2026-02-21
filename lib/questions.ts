import { Question } from "@/types/quiz";

export const questions: Question[] = [
  // ═══════════════════════════════════════
  // FASE 1 — Fundamentos (Terminal, Git, Conceitos)
  // ═══════════════════════════════════════
  {
    id: 1,
    phase: 1,
    phaseLabel: "Fundamentos",
    question: "Qual comando mostra o diretório atual no terminal?",
    type: "multiple-choice",
    options: ["ls", "pwd", "cd", "mkdir"],
    correctAnswer: "pwd",
    explanation:
      "O comando 'pwd' (print working directory) exibe o caminho completo do diretório onde você está. 'ls' lista ficheiros, 'cd' muda de diretório e 'mkdir' cria pastas.",
  },
  {
    id: 2,
    phase: 1,
    phaseLabel: "Fundamentos",
    question:
      "Qual sequência de comandos cria uma pasta 'projeto' e entra nela?",
    type: "multiple-choice",
    options: [
      "mkdir projeto && cd projeto",
      "cd projeto && mkdir projeto",
      "touch projeto && cd projeto",
      "new projeto && open projeto",
    ],
    correctAnswer: "mkdir projeto && cd projeto",
    explanation:
      "Primeiro criamos a pasta com 'mkdir', depois entramos com 'cd'. O operador '&&' garante que o segundo comando só executa se o primeiro der certo. 'touch' cria ficheiros (não pastas) e 'new/open' não são comandos de terminal.",
  },
  {
    id: 3,
    phase: 1,
    phaseLabel: "Fundamentos",
    question: "Qual comando inicializa um repositório Git?",
    type: "multiple-choice",
    options: ["git start", "git init", "git create", "git new"],
    correctAnswer: "git init",
    explanation:
      "'git init' cria um repositório Git vazio na pasta atual, gerando a pasta oculta '.git' que guarda todo o histórico de versões. Os outros comandos não existem no Git.",
  },
  {
    id: 4,
    phase: 1,
    phaseLabel: "Fundamentos",
    question:
      "Qual comando cria uma branch chamada 'feature/login' e muda para ela?",
    type: "multiple-choice",
    options: [
      "git branch feature/login",
      "git checkout -b feature/login",
      "git new branch feature/login",
      "git switch feature/login",
    ],
    correctAnswer: "git checkout -b feature/login",
    explanation:
      "'git checkout -b' faz duas coisas de uma vez: cria a branch e muda para ela. 'git branch' apenas cria sem mudar. 'git switch feature/login' só funciona se a branch já existir (para criar seria 'git switch -c'). 'git new branch' não existe.",
  },
  {
    id: 5,
    phase: 1,
    phaseLabel: "Fundamentos",
    question: "O que é o back-end de uma aplicação?",
    type: "multiple-choice",
    options: [
      "A parte visual que o utilizador vê no browser",
      "O servidor, lógica de negócio e banco de dados",
      "O CSS e o design do site",
      "O domínio e a hospedagem",
    ],
    correctAnswer: "O servidor, lógica de negócio e banco de dados",
    explanation:
      "O back-end é tudo o que roda no servidor: a lógica de negócio (regras da aplicação), acesso ao banco de dados, autenticação, processamento de pagamentos, etc. O utilizador não vê diretamente — só interage através do front-end.",
  },
  {
    id: 6,
    phase: 1,
    phaseLabel: "Fundamentos",
    question: "O que significa ser um desenvolvedor 'full-stack'?",
    type: "multiple-choice",
    options: [
      "Só trabalha com front-end",
      "Só trabalha com banco de dados",
      "Trabalha com front-end e back-end",
      "Só faz deploy de aplicações",
    ],
    correctAnswer: "Trabalha com front-end e back-end",
    explanation:
      "Um dev full-stack domina ambos os lados: o front-end (interface, HTML/CSS/JS, React) e o back-end (servidor, APIs, banco de dados). Consegue construir uma aplicação completa, da UI ao servidor.",
  },
  {
    id: 7,
    phase: 1,
    phaseLabel: "Fundamentos",
    question: "Qual a principal função de uma API REST?",
    type: "multiple-choice",
    options: [
      "Estilizar páginas web",
      "Permitir comunicação entre sistemas via HTTP",
      "Criar animações no browser",
      "Compilar código JavaScript",
    ],
    correctAnswer: "Permitir comunicação entre sistemas via HTTP",
    explanation:
      "Uma API REST é uma interface que permite que sistemas diferentes comuniquem entre si usando o protocolo HTTP (GET, POST, PUT, DELETE). Por exemplo, o front-end faz um GET para /api/users e o back-end devolve a lista de utilizadores em JSON.",
  },

  // ═══════════════════════════════════════
  // FASE 2 — JavaScript/TypeScript e React
  // ═══════════════════════════════════════
  {
    id: 8,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question:
      "Qual o resultado de: [1, 2, 3, 4, 5].filter(n => n % 2 === 0).map(n => n ** 2)",
    type: "multiple-choice",
    options: ["[1, 4, 9, 16, 25]", "[4, 16]", "[2, 4]", "[1, 9, 25]"],
    correctAnswer: "[4, 16]",
    explanation:
      "Passo a passo: filter(n => n % 2 === 0) filtra apenas os pares → [2, 4]. Depois, map(n => n ** 2) eleva cada um ao quadrado → [4, 16]. O filter vem antes do map, então primeiro filtramos, depois transformamos.",
  },
  {
    id: 9,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question:
      "Em TypeScript, como definir que a propriedade 'tags' é um array de strings opcional?",
    type: "multiple-choice",
    options: [
      "tags: string[]",
      "tags?: string[]",
      "tags: optional string[]",
      "tags: string[] | null",
    ],
    correctAnswer: "tags?: string[]",
    explanation:
      "O '?' depois do nome da propriedade indica que ela é opcional em TypeScript — pode existir ou não. 'tags: string[]' obrigaria a passar sempre. 'optional' não é palavra-chave do TS. 'string[] | null' permite null mas obriga a declarar a propriedade.",
  },
  {
    id: 10,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question:
      "Qual hook do React é usado para guardar estado local num componente?",
    type: "multiple-choice",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctAnswer: "useState",
    explanation:
      "'useState' cria uma variável de estado que persiste entre renders e dispara re-render quando atualizada. 'useEffect' executa efeitos colaterais. 'useContext' acede a contexto global. 'useRef' guarda uma referência mutável que NÃO causa re-render.",
  },
  {
    id: 11,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question: "O que faz o código: const [count, setCount] = useState(0)?",
    type: "multiple-choice",
    options: [
      "Cria uma variável global chamada count",
      "Cria um estado local com valor inicial 0 e uma função para atualizá-lo",
      "Importa o valor 0 de outro componente",
      "Define uma constante imutável",
    ],
    correctAnswer:
      "Cria um estado local com valor inicial 0 e uma função para atualizá-lo",
    explanation:
      "useState(0) retorna um array com 2 elementos: o valor atual do estado (count = 0) e a função para atualizá-lo (setCount). Usamos destructuring para extrair ambos. Quando chamamos setCount(1), o componente re-renderiza com count = 1.",
  },
  {
    id: 12,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question: "Qual a forma correta de renderizar uma lista em React/JSX?",
    type: "multiple-choice",
    codeBlock: "const items = ['A', 'B', 'C'];",
    options: [
      "items.forEach(item => <li>{item}</li>)",
      "items.map(item => <li key={item}>{item}</li>)",
      "for (item of items) { <li>{item}</li> }",
      "items.filter(item => <li>{item}</li>)",
    ],
    correctAnswer: "items.map(item => <li key={item}>{item}</li>)",
    explanation:
      "Em JSX, usamos .map() porque retorna um novo array de elementos — que é o que o React precisa para renderizar. forEach não retorna nada, for...of não funciona dentro de JSX, e filter é para filtrar, não renderizar. A prop 'key' é obrigatória para ajudar o React a identificar cada item.",
  },
  {
    id: 13,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question: "O que é uma Promise em JavaScript?",
    type: "multiple-choice",
    options: [
      "Uma função que executa imediatamente",
      "Um objeto que representa o resultado futuro de uma operação assíncrona",
      "Uma variável que guarda múltiplos valores",
      "Um tipo de loop especial",
    ],
    correctAnswer:
      "Um objeto que representa o resultado futuro de uma operação assíncrona",
    explanation:
      "Uma Promise representa uma operação que ainda não terminou mas vai terminar no futuro — pode resolver (sucesso) ou rejeitar (erro). É a base para async/await. Exemplo: fetch() retorna uma Promise que resolve quando a resposta HTTP chega.",
  },
  {
    id: 14,
    phase: 2,
    phaseLabel: "JS/TS e React",
    question: "Qual a diferença entre '==' e '===' em JavaScript?",
    type: "multiple-choice",
    options: [
      "Não há diferença",
      "'==' compara valor e tipo, '===' só compara valor",
      "'==' só compara valor (com coerção), '===' compara valor e tipo",
      "'===' é usado apenas para strings",
    ],
    correctAnswer:
      "'==' só compara valor (com coerção), '===' compara valor e tipo",
    explanation:
      "'==' faz coerção de tipo antes de comparar: '5' == 5 é true (converte string para número). '===' compara valor E tipo sem conversão: '5' === 5 é false (string !== number). Na prática, use sempre '===' para evitar bugs inesperados.",
  },

  // ═══════════════════════════════════════
  // FASE 3 — Next.js e Arquitetura
  // ═══════════════════════════════════════
  {
    id: 15,
    phase: 3,
    phaseLabel: "Next.js",
    question:
      "Qual a principal diferença entre um Server Component e um Client Component no Next.js?",
    type: "multiple-choice",
    options: [
      "Server Components são mais rápidos, Client Components são mais bonitos",
      "Server Components rodam no servidor (sem JS no browser), Client Components rodam no browser (interatividade)",
      "Não há diferença, são apenas nomes diferentes",
      "Server Components só funcionam com banco de dados",
    ],
    correctAnswer:
      "Server Components rodam no servidor (sem JS no browser), Client Components rodam no browser (interatividade)",
    explanation:
      "Server Components renderizam no servidor e enviam HTML puro (zero JavaScript no bundle). Client Components incluem JS e rodam no browser, permitindo interatividade (useState, onClick, etc). Por padrão, todos os componentes no Next.js são Server Components.",
  },
  {
    id: 16,
    phase: 3,
    phaseLabel: "Next.js",
    question:
      "Qual diretiva transforma um componente em Client Component no Next.js?",
    type: "multiple-choice",
    options: ["'use server'", "'use client'", "'client-side'", "export client"],
    correctAnswer: "'use client'",
    explanation:
      "A diretiva 'use client' no topo do ficheiro marca o componente (e todos os seus filhos) como Client Component, permitindo usar hooks e event handlers. 'use server' é usado para Server Actions (funções que rodam no servidor), não para componentes.",
  },
  {
    id: 17,
    phase: 3,
    phaseLabel: "Next.js",
    question:
      "No App Router, como criar uma rota dinâmica para /products/123?",
    type: "multiple-choice",
    options: [
      "app/products/id/page.tsx",
      "app/products/[id]/page.tsx",
      "app/products/:id/page.tsx",
      "app/products/{id}/page.tsx",
    ],
    correctAnswer: "app/products/[id]/page.tsx",
    explanation:
      "No App Router do Next.js, pastas com colchetes [param] criam rotas dinâmicas. O nome dentro dos colchetes vira um parâmetro acessível via props.params. A sintaxe ':id' é do Express/React Router, '{id}' não existe no Next.js.",
  },
  {
    id: 18,
    phase: 3,
    phaseLabel: "Next.js",
    question: "O que é SSR (Server-Side Rendering)?",
    type: "multiple-choice",
    options: [
      "O HTML é gerado uma vez no build e nunca muda",
      "O HTML é gerado no servidor a cada pedido do utilizador",
      "O HTML é gerado no browser com JavaScript",
      "O HTML é carregado de um CDN",
    ],
    correctAnswer:
      "O HTML é gerado no servidor a cada pedido do utilizador",
    explanation:
      "No SSR, cada vez que um utilizador acede à página, o servidor executa o código, busca dados e gera o HTML fresco naquele momento. Isso garante dados sempre atualizados, mas é mais lento que SSG. A primeira opção descreve SSG (Static Site Generation) e a terceira descreve CSR (Client-Side Rendering).",
  },
  {
    id: 19,
    phase: 3,
    phaseLabel: "Next.js",
    question: "O que é um Server Action no Next.js?",
    type: "multiple-choice",
    options: [
      "Uma função que roda no browser",
      "Uma função assíncrona que roda no servidor, usada para mutações de dados",
      "Um componente que só renderiza no servidor",
      "Um middleware de autenticação",
    ],
    correctAnswer:
      "Uma função assíncrona que roda no servidor, usada para mutações de dados",
    explanation:
      "Server Actions são funções marcadas com 'use server' que rodam no servidor. São usadas para mutações (criar, atualizar, apagar dados) diretamente de formulários ou event handlers, sem precisar criar API Routes separadas. O Next.js cuida de toda a comunicação cliente-servidor automaticamente.",
  },
  {
    id: 20,
    phase: 3,
    phaseLabel: "Next.js",
    question: "Para que serve o ficheiro loading.tsx no App Router?",
    type: "multiple-choice",
    options: [
      "Para configurar o carregamento do webpack",
      "Para exibir um UI de loading enquanto a página ou dados carregam",
      "Para definir variáveis de ambiente",
      "Para importar bibliotecas externas",
    ],
    correctAnswer:
      "Para exibir um UI de loading enquanto a página ou dados carregam",
    explanation:
      "O loading.tsx é um ficheiro especial do App Router que funciona como fallback do Suspense automático. Enquanto o page.tsx da mesma pasta está a carregar dados ou componentes, o Next.js exibe o conteúdo do loading.tsx (ex.: skeleton, spinner). É instant — o utilizador vê feedback visual imediatamente.",
  },

  // ═══════════════════════════════════════
  // FASE 4 — Bibliotecas vs. Frameworks
  // ═══════════════════════════════════════
  {
    id: 21,
    phase: 4,
    phaseLabel: "Libs vs Frameworks",
    question:
      "Qual a principal diferença entre uma biblioteca e um framework?",
    type: "multiple-choice",
    options: [
      "Não há diferença, são sinónimos",
      "A biblioteca é chamada pelo seu código; o framework chama o seu código (inversão de controlo)",
      "Frameworks são sempre mais rápidos que bibliotecas",
      "Bibliotecas só existem no back-end",
    ],
    correctAnswer:
      "A biblioteca é chamada pelo seu código; o framework chama o seu código (inversão de controlo)",
    explanation:
      "A diferença fundamental é a inversão de controlo (IoC). Com uma biblioteca (ex.: Axios, Lodash), VOCÊ decide quando e como chamar as funções. Com um framework (ex.: Next.js, Django), ELE define a estrutura e chama o seu código nos momentos certos. Você preenche os espaços que o framework disponibiliza.",
  },
  {
    id: 22,
    phase: 4,
    phaseLabel: "Libs vs Frameworks",
    question: "React é oficialmente classificado como:",
    type: "multiple-choice",
    options: [
      "Um framework full-stack",
      "Uma biblioteca (library) para construir interfaces",
      "Um sistema operativo para web",
      "Uma linguagem de programação",
    ],
    correctAnswer:
      "Uma biblioteca (library) para construir interfaces",
    explanation:
      "React se define como 'a JavaScript library for building user interfaces'. Ele cuida apenas da camada de UI (componentes, renderização, estado). Não inclui roteamento, SSR, nem fetch de dados — por isso surgiram frameworks como Next.js e Remix que adicionam essas camadas em cima do React.",
  },
  {
    id: 23,
    phase: 4,
    phaseLabel: "Libs vs Frameworks",
    question:
      "Qual destas opções é uma BIBLIOTECA e não um framework?",
    type: "multiple-choice",
    options: ["Next.js", "Angular", "Axios", "Django"],
    correctAnswer: "Axios",
    explanation:
      "Axios é uma biblioteca HTTP — você a chama quando quer fazer um pedido (fetch). Next.js (React), Angular (TypeScript) e Django (Python) são frameworks que definem a estrutura da aplicação e controlam o fluxo de execução.",
  },
  {
    id: 24,
    phase: 4,
    phaseLabel: "Libs vs Frameworks",
    question:
      "O que é um ORM (Object-Relational Mapping)?",
    type: "multiple-choice",
    options: [
      "Um tipo de banco de dados NoSQL",
      "Uma biblioteca que permite interagir com o banco de dados usando objetos em vez de SQL puro",
      "Um framework de front-end",
      "Um protocolo de comunicação entre servidores",
    ],
    correctAnswer:
      "Uma biblioteca que permite interagir com o banco de dados usando objetos em vez de SQL puro",
    explanation:
      "Um ORM mapeia tabelas do banco para classes/objetos no código. Em vez de escrever 'SELECT * FROM users WHERE id = 1', escrevemos algo como User.findById(1). Exemplos: Prisma e Drizzle (JavaScript/TypeScript), SQLAlchemy (Python), Eloquent (PHP/Laravel).",
  },

  // ═══════════════════════════════════════
  // FASE 5 — SQL Básico
  // ═══════════════════════════════════════
  {
    id: 25,
    phase: 5,
    phaseLabel: "SQL Básico",
    question: "Qual comando SQL retorna todos os registos da tabela 'users'?",
    type: "multiple-choice",
    options: [
      "GET ALL FROM users",
      "SELECT * FROM users",
      "FETCH users ALL",
      "READ * FROM users",
    ],
    correctAnswer: "SELECT * FROM users",
    explanation:
      "SELECT é o comando de leitura em SQL. O '*' significa 'todas as colunas' e FROM indica a tabela. É a consulta mais básica: SELECT (o quê) FROM (de onde). Os outros comandos não existem em SQL.",
  },
  {
    id: 26,
    phase: 5,
    phaseLabel: "SQL Básico",
    question:
      "Qual comando SQL filtra apenas os utilizadores com idade maior que 18?",
    type: "multiple-choice",
    options: [
      "SELECT * FROM users FILTER age > 18",
      "SELECT * FROM users WHERE age > 18",
      "SELECT * FROM users IF age > 18",
      "SELECT * FROM users HAVING age > 18",
    ],
    correctAnswer: "SELECT * FROM users WHERE age > 18",
    explanation:
      "WHERE é a cláusula de filtro em SQL. FILTER e IF não existem nesse contexto. HAVING existe mas é usado apenas com GROUP BY para filtrar resultados agrupados, não registos individuais.",
  },
  {
    id: 27,
    phase: 5,
    phaseLabel: "SQL Básico",
    question: "Qual comando SQL insere um novo registo na tabela 'products'?",
    type: "multiple-choice",
    options: [
      "ADD INTO products (name, price) VALUES ('Camisa', 29.90)",
      "INSERT INTO products (name, price) VALUES ('Camisa', 29.90)",
      "CREATE products (name, price) SET ('Camisa', 29.90)",
      "PUT INTO products (name, price) VALUES ('Camisa', 29.90)",
    ],
    correctAnswer:
      "INSERT INTO products (name, price) VALUES ('Camisa', 29.90)",
    explanation:
      "INSERT INTO é o comando SQL para adicionar registos. A sintaxe é: INSERT INTO tabela (colunas) VALUES (valores). ADD, CREATE (que cria tabelas, não registos) e PUT não são comandos de inserção de dados em SQL.",
  },

  // ═══════════════════════════════════════
  // FASE 6 — Ecossistema Full-Stack e Mercado
  // ═══════════════════════════════════════
  {
    id: 28,
    phase: 6,
    phaseLabel: "Ecossistema Fullstack",
    question:
      "Qual das seguintes combinações representa uma stack full-stack JavaScript moderna?",
    type: "multiple-choice",
    options: [
      "React + Next.js + Prisma + PostgreSQL",
      "HTML + CSS + jQuery",
      "Photoshop + Figma + Canva",
      "Python + Java + C++",
    ],
    correctAnswer: "React + Next.js + Prisma + PostgreSQL",
    explanation:
      "Uma stack full-stack JavaScript moderna inclui: React (UI) + Next.js (framework full-stack) + Prisma (ORM para banco de dados) + PostgreSQL (banco relacional). Tudo usando JavaScript/TypeScript do front ao back. jQuery é legado, as outras opções não são stacks web.",
  },
  {
    id: 29,
    phase: 6,
    phaseLabel: "Ecossistema Fullstack",
    question:
      "Associe corretamente: qual framework pertence a qual linguagem?",
    type: "multiple-choice",
    options: [
      "Django → Python, Laravel → PHP, Spring → Java, Next.js → JavaScript",
      "Django → Java, Laravel → Python, Spring → PHP, Next.js → Ruby",
      "Django → PHP, Laravel → Java, Spring → Python, Next.js → C#",
      "Django → Ruby, Laravel → JavaScript, Spring → Python, Next.js → PHP",
    ],
    correctAnswer:
      "Django → Python, Laravel → PHP, Spring → Java, Next.js → JavaScript",
    explanation:
      "Cada linguagem tem seus frameworks principais: Python → Django/FastAPI, PHP → Laravel, Java → Spring Boot, JavaScript/TypeScript → Next.js/Express/NestJS, Ruby → Rails, C# → ASP.NET. Saber isto ajuda a entender o mercado e escolher a stack certa para cada projeto.",
  },
  {
    id: 30,
    phase: 6,
    phaseLabel: "Ecossistema Fullstack",
    question:
      "Qual a vantagem principal de usar a mesma linguagem (JavaScript/TypeScript) no front-end e no back-end?",
    type: "multiple-choice",
    options: [
      "JavaScript é sempre mais rápido que outras linguagens",
      "Partilha de código, tipos e lógica entre cliente e servidor, com uma única linguagem para toda a equipa",
      "Não é possível usar JavaScript no back-end",
      "Obriga a usar apenas MongoDB como banco de dados",
    ],
    correctAnswer:
      "Partilha de código, tipos e lógica entre cliente e servidor, com uma única linguagem para toda a equipa",
    explanation:
      "A principal vantagem é a unificação: mesmos tipos TypeScript, mesmas validações (ex.: Zod) e mesma linguagem do front ao back. Isso reduz contexto switching, facilita code sharing e permite que uma equipa trabalhe em toda a stack. Não significa que JS é mais rápido, e funciona com qualquer banco (PostgreSQL, MySQL, MongoDB, etc.).",
  },
];
