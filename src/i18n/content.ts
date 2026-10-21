import { site } from "../config/site";

type LegalSection = { title: string; paragraphs: string[]; items?: string[] };
type LegalDoc = { label: string; intro: string; sections: LegalSection[] };
export type LegalDocId = "termos" | "privacidade" | "cookies";

/** Garante as 3 páginas legais e tipa `items` como opcional em todas as seções. */
const legalDocs = (docs: Record<LegalDocId, LegalDoc>) => docs;

const pt = {
  htmlLang: "pt-BR",
  nav: {
    label: "Navegação principal",
    menu: "Menu",
    open: "Abrir menu",
    close: "Fechar menu",
    contact: "Contato",
    items: [
      { id: "top", label: "Início" },
      { id: "projects", label: "Projetos" },
      { id: "processo", label: "Entrega" },
      { id: "diferenciais", label: "Diferenciais" },
    ],
  },
  language: { label: "Mudar idioma", en: "English", pt: "Português" },
  cta: {
    quote: "Solicitar orçamento",
    quoteShort: "Solicite Orçamento",
  },
  hero: {
    title: {
      before: "FAÇA SUA EMPRESA TER",
      rotating: ["UM SITE", "UM SISTEMA", "UMA IA"],
      after: "QUE TRABALHA POR VOCÊ",
      label: "Faça sua empresa ter um site, um sistema ou uma IA que trabalha por você",
    },
    text: "Sites que vendem, sistemas que organizam e IA que atende seus clientes 24h. Tudo feito do zero para o seu negócio.",
    projectsButton: "Projetos",
    sideTitle: ["PROJETOS", "DO ZERO"],
    sideText:
      "Não uso templates! Odeio isso. Cada site, sistema ou IA nasce da necessidade real do seu negócio, pensado para gerar resultado.",
  },
  value: {
    tag: "DIRETO AO PONTO",
    title: ["Seu cliente decide", "em poucos segundos"],
    highlight: "se confia em você.",
    socialProof: (count: number) => `+${count} negócios atendidos`,
    lead: "Antes mesmo de falar com você, ele já te avaliou pelo site, pela demora na resposta e pela experiência que teve. Um site amador, um atendimento lento ou uma operação bagunçada passam a mensagem errada, e ele fecha com o concorrente sem você nem saber.",
    muted:
      "Eu uno design, tecnologia e inteligência artificial para a sua empresa transmitir confiança logo de cara, responder na hora e transformar mais visitas em vendas.",
  },
  wallet: {
    lines: ["A tecnologia certa", "faz sua empresa", "vender muito mais"],
    artAlt: "Carteira com notas de cem reais sobre uma rocha",
    left: ["Seu negócio ganha credibilidade,", "agilidade e atendimento 24h."],
    right: ["Menos tarefas manuais.", "Mais pessoas virando clientes."],
  },
  stats: {
    label: "Resultados em números",
    items: ["Clientes atendidos", "Nichos diferentes", "Pessoas acompanham meu trabalho", "Projetos personalizados"],
  },
  projects: {
    title: { before: "Veja na prática alguns ", highlight: "projetos reais", after: "feitos recentemente:" },
    sub: {
      before: "Cada projeto nasce de uma estratégia para ",
      strong: "valorizar sua marca, prender atenção e facilitar a decisão do cliente.",
    },
    imageAlt: (name: string) => `Site do projeto ${name}`,
  },
  process: {
    title: "Do contato inicial à entrega:",
    highlight: "Seis passos.",
    steps: [
      {
        title: "Briefing",
        description:
          "Envio um briefing para entender o que você precisa, seu momento, seu objetivo e o que o projeto deve resolver.",
      },
      {
        title: "Imersão",
        description:
          "Com tudo fechado, reúno as informações do briefing e organizo o que preciso para começar o projeto.",
      },
      {
        title: "Desenvolvimento",
        description: "Transformo o briefing em estrutura, design e código, construindo seu site, sistema ou IA do zero.",
      },
      {
        title: "Apresentação",
        description:
          "Apresento a primeira versão. Se aprovada, seguimos. Se precisar, faço os ajustes finos antes da próxima etapa.",
      },
      {
        title: "Otimização",
        description:
          "Com tudo aprovado, otimizo, integro e faço os últimos testes para deixar tudo pronto para ir ao ar.",
      },
      {
        title: "Entrega",
        description: "Seu projeto entra no ar 100% funcional, revisado e pronto para gerar novas oportunidades.",
      },
    ],
  },
  why: {
    title: ["Por que você", "deve escolher"],
    highlight: "trabalhar comigo?",
    cards: [
      {
        title: "Sites que vendem",
        text: "Sites e landing pages feitos do zero, rápidos e estratégicos, pensados para transformar visitantes em clientes.",
      },
      {
        title: "Sistemas sob medida",
        text: "Sistemas web que organizam sua operação, automatizam tarefas e colocam a gestão do seu negócio na palma da mão.",
      },
      {
        title: "IA que trabalha por você",
        text: "Agentes de IA que atendem, qualificam e vendem 24h no seu WhatsApp, integrados aos processos da sua empresa.",
      },
    ],
  },
  gateways: {
    title: "Sua empresa atendendo e vendendo",
    titleLine2: "mesmo enquanto ",
    highlight: "você dorme",
    sub: "Com inteligência artificial e automações, sua empresa responde na hora, qualifica clientes e fecha mais vendas, sem depender de alguém online o tempo todo.",
    panelTitle: ["Soluções que", "impulsionam o", "seu negócio"],
    panelText: ["Sites, sistemas e inteligência artificial", "trabalhando juntos pela sua empresa."],
    features: [
      {
        title: "Atendimento 24h",
        text: "Um agente de IA no seu WhatsApp responde dúvidas, envia orçamentos e agenda clientes a qualquer hora.",
      },
      {
        title: "Menos trabalho manual",
        text: "Automações e sistemas cuidam das tarefas repetitivas para sua equipe focar no que realmente importa.",
      },
      {
        title: "Apareça no Google e nas IAs",
        text: "SEO bem feito faz sua empresa ser encontrada no Google e até indicada pelas inteligências artificiais.",
      },
    ],
  },
  brandHand: {
    title: "Meu objetivo é aumentar",
    titleLine2: "seus ",
    highlight: "resultados.",
    text: "Cada empresa tem um objetivo diferente. Por isso, eu busco entender o que precisa acontecer para o seu investimento gerar retorno.",
    artAlt: "Mão segurando uma peça luminosa com o símbolo da marca",
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      {
        q: "Em quanto tempo meu projeto fica pronto?",
        a: "Depende do escopo. Sites e landing pages ficam prontos, em média, entre 5 dias úteis e 3 semanas. Sistemas e soluções com IA têm o prazo definido no orçamento, de acordo com a complexidade.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento pode ser realizado via Pix. Você pode optar pelo pagamento à vista (com desconto) ou em 50% no início do projeto e 50% na entrega.",
      },
      {
        q: "Você desenvolve sistemas e soluções com IA?",
        a: "Sim. Além de sites e landing pages, desenvolvo sistemas web sob medida, agentes de IA para atendimento no WhatsApp e automações integradas aos seus processos.",
      },
      {
        q: "Como a IA pode ajudar o meu negócio?",
        a: "A IA pode atender seus clientes 24h, responder dúvidas, qualificar contatos, agendar horários e automatizar tarefas repetitivas, liberando seu tempo para o que importa.",
      },
      {
        q: "Preciso ter todo o conteúdo pronto para começar?",
        a: "Não. Caso seja necessário, eu ajudo na estruturação do conteúdo para que seu projeto tenha uma comunicação clara, profissional e focada em resultados.",
      },
      {
        q: "Como funciona o suporte após a entrega?",
        a: "Após a entrega do projeto, você conta com 7 dias de suporte para resolver qualquer questão relacionada ao funcionamento. Além disso, estão incluídas até duas rodadas de ajustes, para garantir que tudo fique exatamente como esperado.",
      },
    ],
  },
  footer: {
    tagline: "Sites, sistemas e IA para o seu negócio crescer",
    navLabel: "Navegação",
    sectionsLabel: "Seções",
    legalLabel: "Legal",
    links: {
      home: "Início",
      projects: "Projetos",
      process: "Processo",
      faq: "FAQ",
      advantages: "Vantagens",
      results: "Resultados",
      why: "Diferenciais",
      platform: "Inteligência Artificial",
    },
    rights: (year: number) => `${year} © Todos os direitos reservados`,
    backToTop: "Voltar ao topo",
  },
  logoAlt: (name: string) => `Logo ${name}`,
  legal: {
    close: "Fechar",
    updated: (date: string) => `Última atualização: ${date}`,
    docs: legalDocs({
      termos: {
        label: "Termos e Condições",
        intro: `Estes Termos e Condições regulam o uso deste site e a contratação dos serviços de criação de sites, sistemas e soluções de inteligência artificial prestados por ${site.name}. Ao utilizar este site, você declara ter lido e aceitado estes termos.`,
        sections: [
          {
            title: "1. Objeto",
            paragraphs: [
              "Estes termos estabelecem as condições gerais de uso do site e de prestação dos serviços de design e desenvolvimento de sites, lojas virtuais, sistemas web, automações e soluções de inteligência artificial.",
            ],
          },
          {
            title: "2. Orçamento e contratação",
            paragraphs: [
              "Todo serviço é precedido de um orçamento que descreve escopo, prazos e valores. A contratação somente se considera formalizada após a aceitação do orçamento pelo cliente, por escrito ou por meio eletrônico.",
              "Solicitações fora do escopo aprovado podem gerar orçamento complementar, sempre informado antes da execução.",
            ],
          },
          {
            title: "3. Prazos e entregas",
            paragraphs: [
              "Os prazos de desenvolvimento começam a contar a partir do recebimento das informações, textos, imagens e acessos necessários. Atrasos no envio desses materiais pelo cliente podem prorrogar as datas de entrega proporcionalmente.",
            ],
          },
          {
            title: "4. Pagamentos",
            paragraphs: [
              "Os valores, formas de pagamento e eventuais entradas são definidos no orçamento aceito. A inadimplência pode suspender o andamento dos serviços e a publicação do projeto.",
            ],
          },
          {
            title: "5. Revisões e alterações",
            paragraphs: [
              "O número de rodadas de revisão é informado no orçamento. Alterações após a aprovação final do projeto podem ser cobradas à parte.",
            ],
          },
          {
            title: "6. Propriedade intelectual",
            paragraphs: [
              `Após a quitação total do projeto, os arquivos finais do projeto desenvolvido pertencem ao cliente. Métodos, códigos de uso geral, ferramentas e conhecimentos empregados no processo permanecem de propriedade de ${site.name}.`,
              "O cliente declara ser titular ou ter autorização para uso de todo material (textos, imagens, marcas e logotipos) fornecido para o projeto, sendo o único responsável por eventuais reclamações de terceiros.",
            ],
          },
          {
            title: "7. Responsabilidades",
            paragraphs: [
              `${site.name} compromete-se a entregar o projeto conforme o escopo aprovado, com boa técnica e dentro dos prazos acordados. ${site.name} não se responsabiliza por conteúdo de terceiros, indisponibilidade de serviços externos (hospedagem, domínios, gateways de pagamento, provedores de IA e APIs) ou uso indevido do projeto após a entrega.`,
            ],
          },
          {
            title: "8. Suporte e manutenção",
            paragraphs: [
              "O suporte após a entrega segue o período definido no orçamento. Manutenções contínuas, atualizações e novos recursos podem ser contratados separadamente.",
            ],
          },
          {
            title: "9. Cancelamento",
            paragraphs: [
              "O cancelamento do projeto por iniciativa do cliente implica o pagamento proporcional das etapas já executadas, conforme o valor contratado.",
            ],
          },
          {
            title: "10. Foro e legislação",
            paragraphs: [
              "Estes termos são regidos pelas leis brasileiras, especialmente o Código de Defesa do Consumidor (Lei nº 8.078/1990). Fica eleito o foro do domicílio do consumidor para dirimir eventuais controvérsias.",
            ],
          },
          {
            title: "11. Contato",
            paragraphs: [`Dúvidas sobre estes termos podem ser enviadas pelo WhatsApp ${site.whatsapp.display}.`],
          },
        ],
      },
      privacidade: {
        label: "Política de Privacidade",
        intro:
          "Esta Política de Privacidade explica como seus dados pessoais são coletados, usados e protegidos, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, a LGPD).",
        sections: [
          {
            title: "1. Dados que coletamos",
            paragraphs: ["Coletamos apenas os dados necessários para atender você e responder às suas solicitações:"],
            items: [
              "Dados de contato informados voluntariamente, como nome e email, ao enviar uma mensagem ou solicitar um orçamento;",
              "Dados de navegação de forma anonimizada, como páginas visitadas, tempo de permanência e tipo de dispositivo;",
              "Cookies e tecnologias semelhantes, conforme descrito na Política de Cookies.",
            ],
          },
          {
            title: "2. Finalidades do tratamento",
            paragraphs: [
              "Utilizamos seus dados para: responder contatos e pedidos de orçamento; elaborar propostas comerciais; melhorar o desempenho e a experiência do site; e cumprir obrigações legais.",
            ],
          },
          {
            title: "3. Base legal",
            paragraphs: [
              "O tratamento ocorre com base no seu consentimento, quando você envia seus dados ou aceita os cookies, e no legítimo interesse para a melhoria do site, sempre conforme o art. 7º da LGPD.",
              "Você pode retirar o consentimento a qualquer momento, sem afetar a licitude dos tratamentos anteriores.",
            ],
          },
          {
            title: "4. Compartilhamento",
            paragraphs: [
              "Seus dados não são vendidos nem cedidos. Eles podem ser compartilhados apenas com provedores que apoiam a operação do site, como serviços de hospedagem e análise, sempre limitados à finalidade informada e com obrigação de proteção dos dados.",
            ],
          },
          {
            title: "5. Segurança",
            paragraphs: [
              "Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou alteração indevida.",
            ],
          },
          {
            title: "6. Retenção",
            paragraphs: [
              "Mantemos seus dados pessoais apenas pelo tempo necessário às finalidades informadas ou para cumprir obrigações legais. Após esse período, os dados são eliminados ou anonimizados.",
            ],
          },
          {
            title: "7. Seus direitos",
            paragraphs: ["Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:"],
            items: [
              "A confirmação da existência de tratamento e o acesso aos seus dados;",
              "A correção de dados incompletos, inexatos ou desatualizados;",
              "A anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em excesso;",
              "A portabilidade dos seus dados;",
              "A eliminação dos dados tratados com base no consentimento;",
              "Informações sobre com quem os dados foram compartilhados;",
              "A revogação do consentimento.",
            ],
          },
          {
            title: "8. Encarregado e autoridade",
            paragraphs: [
              `Para exercer seus direitos ou esclarecer dúvidas sobre esta política, fale com a gente pelo WhatsApp ${site.whatsapp.display}.`,
              "Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
            ],
          },
        ],
      },
      cookies: {
        label: "Política de Cookies",
        intro:
          "Esta Política de Cookies explica o que são cookies, quais usamos neste site e como você pode gerenciá-los.",
        sections: [
          {
            title: "1. O que são cookies",
            paragraphs: [
              "Cookies são pequenos arquivos armazenados no seu navegador quando você visita um site. Eles ajudam o site a funcionar corretamente, a lembrar suas preferências e a entender como as páginas são usadas.",
            ],
          },
          {
            title: "2. Cookies que utilizamos",
            paragraphs: ["Utilizamos as seguintes categorias:"],
            items: [
              "Cookies essenciais: necessários para o funcionamento básico do site, como lembrar o estado de elementos visuais. Não podem ser desativados;",
              "Cookies de preferência: guardam escolhas que você faz no site, como idioma e tema, para melhorar sua experiência;",
              "Cookies de análise: coletam informações anonimizadas sobre a navegação, como páginas mais visitadas e tempo de permanência, para melhorar o conteúdo e o desempenho.",
            ],
          },
          {
            title: "3. Cookies de terceiros",
            paragraphs: [
              "Alguns serviços integrados ao site, como players de vídeo e ferramentas de análise, podem definir seus próprios cookies. Esses terceiros tratam os dados conforme suas próprias políticas de privacidade.",
            ],
          },
          {
            title: "4. Como gerenciar cookies",
            paragraphs: [
              "Você pode aceitar, bloquear ou apagar cookies a qualquer momento nas configurações do seu navegador. Cada navegador tem um caminho próprio, geralmente em Privacidade ou Segurança.",
              "Ao desativar cookies essenciais, algumas partes do site podem não funcionar como esperado.",
            ],
          },
          {
            title: "5. Atualizações",
            paragraphs: [
              "Esta política pode ser atualizada para refletir mudanças nos cookies utilizados. A data da última revisão está sempre indicada no topo desta página.",
            ],
          },
          {
            title: "6. Contato",
            paragraphs: [`Dúvidas sobre esta política podem ser enviadas pelo WhatsApp ${site.whatsapp.display}.`],
          },
        ],
      },
    }),
  },
};

export type Content = typeof pt;

const en: Content = {
  htmlLang: "en",
  nav: {
    label: "Main navigation",
    menu: "Menu",
    open: "Open menu",
    close: "Close menu",
    contact: "Contact",
    items: [
      { id: "top", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "processo", label: "Delivery" },
      { id: "diferenciais", label: "Why me" },
    ],
  },
  language: { label: "Change language", en: "English", pt: "Português" },
  cta: {
    quote: "Request a quote",
    quoteShort: "Request a Quote",
  },
  hero: {
    title: {
      before: "GIVE YOUR BUSINESS",
      rotating: ["A WEBSITE", "A SYSTEM", "AN AI"],
      after: "THAT WORKS FOR YOU",
      label: "Give your business a website, a system or an AI that works for you",
    },
    text: "Websites that sell, systems that organize and AI that serves your clients 24/7. All built from scratch for your business.",
    projectsButton: "Projects",
    sideTitle: ["CUSTOM", "PROJECTS"],
    sideText:
      "I don't use templates! I hate them. Every website, system or AI is born from your business's real needs, designed to deliver results.",
  },
  value: {
    tag: "STRAIGHT TO THE POINT",
    title: ["Your client decides", "in a few seconds"],
    highlight: "whether to trust you.",
    socialProof: (count: number) => `+${count} businesses served`,
    lead: "Before they even talk to you, they have already judged you by your website, how long you take to reply and the experience they had. An amateur website, slow replies or a messy operation send the wrong message, and they buy from your competitor without you ever knowing.",
    muted:
      "I combine design, technology and artificial intelligence so your business earns trust at first sight, replies instantly and turns more visits into sales.",
  },
  wallet: {
    lines: ["The right technology", "makes your company", "sell much more"],
    artAlt: "Wallet with hundred reais bills on a rock",
    left: ["Your business gains credibility,", "speed and 24/7 support."],
    right: ["Fewer manual tasks.", "More people becoming clients."],
  },
  stats: {
    label: "Results in numbers",
    items: ["Clients served", "Different niches", "People follow my work", "Custom projects"],
  },
  projects: {
    title: { before: "See in practice some ", highlight: "real projects", after: "made recently:" },
    sub: {
      before: "Each project stems from a strategy to ",
      strong: "elevate your brand, capture attention, and facilitate the customer's decision.",
    },
    imageAlt: (name: string) => `Website of project ${name}`,
  },
  process: {
    title: "From first contact to delivery:",
    highlight: "Six steps.",
    steps: [
      {
        title: "Briefing",
        description:
          "I send a briefing to understand what you need, your moment, your goal and what the project should solve.",
      },
      {
        title: "Immersion",
        description:
          "With everything settled, I gather the briefing information and organize what I need to start the project.",
      },
      {
        title: "Development",
        description: "I turn the briefing into structure, design and code, building your website, system or AI from scratch.",
      },
      {
        title: "Presentation",
        description:
          "I present the first version. If approved, we move on. If needed, I make fine adjustments before the next step.",
      },
      {
        title: "Optimization",
        description:
          "With everything approved, I optimize, integrate and run the final tests so it's all ready to go live.",
      },
      {
        title: "Delivery",
        description: "Your project goes live 100% functional, reviewed and ready to create new opportunities.",
      },
    ],
  },
  why: {
    title: ["Why should you", "choose to work"],
    highlight: "with me?",
    cards: [
      {
        title: "Websites that sell",
        text: "Websites and landing pages built from scratch, fast and strategic, designed to turn visitors into clients.",
      },
      {
        title: "Custom systems",
        text: "Web systems that organize your operation, automate tasks and put your business management in the palm of your hand.",
      },
      {
        title: "AI that works for you",
        text: "AI agents that serve, qualify and sell 24/7 on your WhatsApp, integrated with your company's processes.",
      },
    ],
  },
  gateways: {
    title: "Your business serving and selling",
    titleLine2: "even while ",
    highlight: "you sleep",
    sub: "With artificial intelligence and automations, your business answers right away, qualifies clients and closes more sales, without depending on someone online all the time.",
    panelTitle: ["Solutions that", "boost", "your business"],
    panelText: ["Websites, systems and artificial intelligence", "working together for your company."],
    features: [
      {
        title: "24/7 support",
        text: "An AI agent on your WhatsApp answers questions, sends quotes and books clients at any time.",
      },
      {
        title: "Less manual work",
        text: "Automations and systems handle repetitive tasks so your team can focus on what really matters.",
      },
      {
        title: "Show up on Google and in AIs",
        text: "Well done SEO gets your business found on Google and even recommended by artificial intelligence.",
      },
    ],
  },
  brandHand: {
    title: "My goal is to increase",
    titleLine2: "your ",
    highlight: "results.",
    text: "Every company has a different goal. That's why I seek to understand what needs to happen for your investment to pay off.",
    artAlt: "Hand holding a glowing piece with the brand symbol",
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How long until my project is ready?",
        a: "It depends on the scope. Websites and landing pages take, on average, between 5 business days and 3 weeks. Systems and AI solutions have their timeline defined in the quote, according to complexity.",
      },
      {
        q: "How does payment work?",
        a: "Payment can be made via Pix. You can choose to pay upfront (with a discount) or 50% at the start of the project and 50% on delivery.",
      },
      {
        q: "Do you build systems and AI solutions?",
        a: "Yes. Besides websites and landing pages, I build custom web systems, AI agents for WhatsApp support and automations integrated with your processes.",
      },
      {
        q: "How can AI help my business?",
        a: "AI can serve your clients 24/7, answer questions, qualify leads, book appointments and automate repetitive tasks, freeing your time for what matters.",
      },
      {
        q: "Do I need all the content ready to start?",
        a: "No. If needed, I help structure the content so your project has clear, professional and results focused communication.",
      },
      {
        q: "How does support work after delivery?",
        a: "After delivery, you get 7 days of support to solve any issue related to how everything works. Plus, up to two rounds of adjustments are included to make sure everything is exactly as expected.",
      },
    ],
  },
  footer: {
    tagline: "Websites, systems and AI to grow your business",
    navLabel: "Navigation",
    sectionsLabel: "Sections",
    legalLabel: "Legal",
    links: {
      home: "Home",
      projects: "Projects",
      process: "Process",
      faq: "FAQ",
      advantages: "Advantages",
      results: "Results",
      why: "Why me",
      platform: "Artificial Intelligence",
    },
    rights: (year: number) => `${year} © All rights reserved`,
    backToTop: "Back to top",
  },
  logoAlt: (name: string) => `${name} logo`,
  legal: {
    close: "Close",
    updated: (date: string) => `Last updated: ${date}`,
    docs: {
      termos: {
        label: "Terms and Conditions",
        intro: `These Terms and Conditions govern the use of this website and the hiring of website, system and artificial intelligence services provided by ${site.name}. By using this website, you declare that you have read and accepted these terms.`,
        sections: [
          {
            title: "1. Purpose",
            paragraphs: [
              "These terms set out the general conditions for using the website and for the provision of design and development services for websites, online stores, web systems, automations and artificial intelligence solutions.",
            ],
          },
          {
            title: "2. Quote and hiring",
            paragraphs: [
              "Every service is preceded by a quote describing scope, deadlines and prices. The engagement is only considered formalized once the client accepts the quote, in writing or electronically.",
              "Requests outside the approved scope may require a complementary quote, always shared before any work is done.",
            ],
          },
          {
            title: "3. Deadlines and deliveries",
            paragraphs: [
              "Development deadlines start counting once the required information, texts, images and access are received. Delays by the client in sending these materials may extend delivery dates proportionally.",
            ],
          },
          {
            title: "4. Payments",
            paragraphs: [
              "Prices, payment methods and any down payments are defined in the accepted quote. Late payment may suspend the progress of the services and the publication of the project.",
            ],
          },
          {
            title: "5. Revisions and changes",
            paragraphs: [
              "The number of revision rounds is stated in the quote. Changes after the final approval of the project may be charged separately.",
            ],
          },
          {
            title: "6. Intellectual property",
            paragraphs: [
              `Once the project is fully paid, the final files of the project belong to the client. Methods, general purpose code, tools and know-how used in the process remain the property of ${site.name}.`,
              "The client declares to own or be authorized to use all material (texts, images, brands and logos) provided for the project, being solely responsible for any third party claims.",
            ],
          },
          {
            title: "7. Responsibilities",
            paragraphs: [
              `${site.name} commits to delivering the project according to the approved scope, with sound technique and within the agreed deadlines. ${site.name} is not responsible for third party content, unavailability of external services (hosting, domains, payment gateways, AI providers and APIs) or misuse of the project after delivery.`,
            ],
          },
          {
            title: "8. Support and maintenance",
            paragraphs: [
              "Support after delivery follows the period defined in the quote. Ongoing maintenance, updates and new features can be hired separately.",
            ],
          },
          {
            title: "9. Cancellation",
            paragraphs: [
              "Cancellation of the project by the client implies proportional payment for the stages already completed, according to the contracted price.",
            ],
          },
          {
            title: "10. Jurisdiction and law",
            paragraphs: [
              "These terms are governed by Brazilian law, especially the Consumer Protection Code (Law No. 8,078/1990). The courts of the consumer's domicile are elected to settle any disputes.",
            ],
          },
          {
            title: "11. Contact",
            paragraphs: [`Questions about these terms can be sent via WhatsApp ${site.whatsapp.display}.`],
          },
        ],
      },
      privacidade: {
        label: "Privacy Policy",
        intro:
          "This Privacy Policy explains how your personal data is collected, used and protected, in accordance with the Brazilian General Data Protection Law (Law No. 13,709/2018, the LGPD).",
        sections: [
          {
            title: "1. Data we collect",
            paragraphs: ["We only collect the data needed to serve you and respond to your requests:"],
            items: [
              "Contact data provided voluntarily, such as name and email, when sending a message or requesting a quote;",
              "Anonymized browsing data, such as pages visited, time on page and device type;",
              "Cookies and similar technologies, as described in the Cookie Policy.",
            ],
          },
          {
            title: "2. Purposes of processing",
            paragraphs: [
              "We use your data to: answer contacts and quote requests; prepare commercial proposals; improve the website's performance and experience; and comply with legal obligations.",
            ],
          },
          {
            title: "3. Legal basis",
            paragraphs: [
              "Processing is based on your consent, when you send your data or accept cookies, and on legitimate interest for improving the website, always in accordance with art. 7 of the LGPD.",
              "You may withdraw your consent at any time, without affecting the lawfulness of prior processing.",
            ],
          },
          {
            title: "4. Sharing",
            paragraphs: [
              "Your data is not sold or transferred. It may only be shared with providers that support the website's operation, such as hosting and analytics services, always limited to the stated purpose and with an obligation to protect the data.",
            ],
          },
          {
            title: "5. Security",
            paragraphs: [
              "We adopt appropriate technical and organizational measures to protect your data against unauthorized access, loss or improper alteration.",
            ],
          },
          {
            title: "6. Retention",
            paragraphs: [
              "We keep your personal data only for as long as needed for the stated purposes or to comply with legal obligations. After that period, the data is deleted or anonymized.",
            ],
          },
          {
            title: "7. Your rights",
            paragraphs: ["Under art. 18 of the LGPD, you may request at any time:"],
            items: [
              "Confirmation that processing exists and access to your data;",
              "Correction of incomplete, inaccurate or outdated data;",
              "Anonymization, blocking or deletion of unnecessary or excessive data;",
              "Portability of your data;",
              "Deletion of data processed based on consent;",
              "Information about whom the data was shared with;",
              "Withdrawal of consent.",
            ],
          },
          {
            title: "8. Data officer and authority",
            paragraphs: [
              `To exercise your rights or ask questions about this policy, talk to us via WhatsApp ${site.whatsapp.display}.`,
              "You can also file a complaint with the Brazilian National Data Protection Authority (ANPD).",
            ],
          },
        ],
      },
      cookies: {
        label: "Cookie Policy",
        intro: "This Cookie Policy explains what cookies are, which ones we use on this website and how you can manage them.",
        sections: [
          {
            title: "1. What cookies are",
            paragraphs: [
              "Cookies are small files stored in your browser when you visit a website. They help the website work properly, remember your preferences and understand how pages are used.",
            ],
          },
          {
            title: "2. Cookies we use",
            paragraphs: ["We use the following categories:"],
            items: [
              "Essential cookies: required for the website's basic operation, such as remembering the state of visual elements. They cannot be disabled;",
              "Preference cookies: store choices you make on the website, such as language and theme, to improve your experience;",
              "Analytics cookies: collect anonymized browsing information, such as most visited pages and time on page, to improve content and performance.",
            ],
          },
          {
            title: "3. Third party cookies",
            paragraphs: [
              "Some services embedded in the website, such as video players and analytics tools, may set their own cookies. These third parties process data according to their own privacy policies.",
            ],
          },
          {
            title: "4. How to manage cookies",
            paragraphs: [
              "You can accept, block or delete cookies at any time in your browser settings. Each browser has its own path, usually under Privacy or Security.",
              "If you disable essential cookies, some parts of the website may not work as expected.",
            ],
          },
          {
            title: "5. Updates",
            paragraphs: [
              "This policy may be updated to reflect changes in the cookies used. The date of the latest revision is always shown at the top of this page.",
            ],
          },
          {
            title: "6. Contact",
            paragraphs: [`Questions about this policy can be sent via WhatsApp ${site.whatsapp.display}.`],
          },
        ],
      },
    },
  },
};

export const content = { pt, en };
export type Lang = keyof typeof content;
