export interface Session {
  day: string
  time: string
  topic: string
  points: string[]
}

export interface Sprint {
  id: number
  sprintNo: string
  title: string
  tagline: string
  dayRange: string
  accent: string
  icon: string
  sessions: Session[]
  outcomes: string[]
  tools: string[]
  note?: string
}

export const sprints: Sprint[] = [
  {
    id: 0,
    sprintNo: '0',
    title: 'Kick Off & Python Basecamp',
    tagline:
      'Set the foundation: roadmap walkthrough, installations, and a Python refresher built for AI-native engineering.',
    dayRange: 'Day 0–1 · Fri–Sun',
    accent: '#D5A6BD',
    icon: 'Rocket',
    sessions: [
      {
        day: 'Friday',
        time: '7pm – 9pm',
        topic: 'Kick Off Session — Circle Walkthrough & Installations QnA',
        points: [
          'Go through the Roadmap and Platform to access your program contents',
          'QnA for Installations',
        ],
      },
      {
        day: 'Saturday – Sunday',
        time: 'Pre-recorded',
        topic: 'Python Basecamp — Foundations for AI Native Engineering',
        points: [
          'Core Python data structures and string handling',
          'Using iterators, generators, and exception handling',
          'Introduction to numpy and pandas for data manipulation',
          'Python functions, modules, packages, and basic file handling',
          'Working with threads and processes for parallelism',
        ],
      },
    ],
    outcomes: [
      'Refresh your understanding of Python’s core data structures, functions, exceptions, and file handling.',
      'Gain hands-on experience with iterators, generators, modules, and packages for building efficient Python code.',
      'Practice basic data manipulation using NumPy and pandas fundamentals.',
      'Understand threading and multiprocessing to manage parallel processes in Python.',
      'Build confidence to use Python as a foundation for advanced AI and automation workflows throughout the program.',
    ],
    tools: ['Python', 'NumPy', 'pandas'],
    note: 'Pre-recorded videos uploaded along with all the necessary documents.',
  },
  {
    id: 1,
    sprintNo: '1',
    title: 'Advanced Prompt Engineering & AI Automations',
    tagline:
      'Move beyond simple chat. Build deterministic, user-driven systems with structured prompting and n8n orchestration.',
    dayRange: 'Day 1–3 · Mon–Wed',
    accent: '#D9D2E9',
    icon: 'Wand2',
    sessions: [
      {
        day: 'Monday',
        time: '7pm – 11pm',
        topic: 'Prompt Engineering + Chat Completion / OpenAI Standard',
        points: [
          'How do you build something like ChatGPT app?',
          'Learn advanced techniques in Prompt Engineering like XML & JSON prompting',
          'As an Engineer, you will not prompt your models — your users will. How do you manage that?',
          'Learn about the world of AI models — who all has them and how to use them as an Engineer?',
        ],
      },
      {
        day: 'Tuesday',
        time: '7pm – 11pm',
        topic: 'n8n',
        points: [
          'Learn the fundamentals of workflow automation using n8n, including how triggers, nodes, and data flow work together to build powerful automations.',
          'Understand how to identify repetitive or manual tasks that can be automated in both personal and professional workflows using n8n.',
          'Get hands-on experience building workflows in n8n’s visual canvas — from basic triggers to multi-step automations that integrate multiple apps.',
          'Explore essential n8n features such as HTTP requests, data transformation, authentication, and scheduling to create end-to-end automation pipelines.',
          'Master automation best practices in n8n: workflow organization, versioning, error handling, debugging, and optimizing nodes for production.',
        ],
      },
      {
        day: 'Wednesday',
        time: '7pm – 11pm',
        topic: 'Build app: n8n + Google AI Studio',
        points: [
          'A full-stack application with n8n as the backend workflow automation platform and AI Studio as the frontend interface.',
          'Custom workflow automations that connect multiple APIs and services — streamlining repetitive personal or professional tasks.',
        ],
      },
    ],
    outcomes: [
      'Build end-to-end AI-powered applications by combining prompt engineering, chat completion APIs, and workflow automation using n8n.',
      'Design intelligent user-driven systems where prompts are dynamically generated, structured (JSON/XML), and handled reliably within applications.',
      'Automate real-world workflows (lead processing, notifications, data pipelines) using n8n with multi-step logic, branching, and integrations.',
      'Integrate AI models into workflows using tools like Google AI Studio and APIs to create context-aware, multi-step decision systems.',
      'Develop scalable, production-ready systems with proper error handling, retries, debugging, and optimized workflow performance.',
      'Connect and orchestrate multiple tools and APIs (HTTP requests, databases, third-party apps) to build fully automated pipelines.',
      'Understand the AI ecosystem as an engineer — how to choose, use, and integrate different models while managing user inputs effectively.',
    ],
    tools: ['OpenAI API', 'n8n', 'Google AI Studio'],
  },
  {
    id: 2,
    sprintNo: '2',
    title: 'Full Stack Open Source AI Applications',
    tagline:
      'Deploy local and open-source models and build real-time interfaces with HuggingFace and Gradio.',
    dayRange: 'Day 4–5 · Thu–Fri',
    accent: '#9FC5E8',
    icon: 'Boxes',
    sessions: [
      {
        day: 'Thursday',
        time: '7pm – 11pm',
        topic: 'HuggingFace, Gradio, Local Models',
        points: [
          'How do you use Hugging Face to access and run thousands of open-source AI models?',
          'Learn how to work with local models and understand when to use them vs APIs',
          'Build simple interfaces using Gradio to interact with models in real-time',
          'Explore practical use cases across NLP, vision, and multimodal AI applications',
        ],
      },
      {
        day: 'Friday',
        time: '7pm – 11pm',
        topic: 'Build your own ChatGPT App with Gradio + Revision',
        points: [
          'How do you build a ChatGPT-like application from scratch using Gradio?',
          'Learn how to handle user inputs, context, and conversation flow effectively',
          'Understand how to integrate models and manage responses in real-time',
          'Revise key concepts from previous sessions to strengthen your AI app-building foundation',
        ],
      },
    ],
    outcomes: [
      'Build a ChatGPT-like application using Gradio with a functional chat interface and real-time responses.',
      'Work with Hugging Face models and pipelines to power NLP, vision, and basic multimodal use cases.',
      'Run and experiment with local/open-source models, understanding when to use local vs API-based approaches.',
      'Integrate model inference into applications, handling input processing, context, and output generation.',
      'Create and deploy interactive AI apps using Gradio for demos and real-world usage.',
      'Understand key trade-offs in AI engineering — latency, cost, performance, and scalability.',
    ],
    tools: ['HuggingFace', 'Gradio', 'Local Models'],
  },
  {
    id: 3,
    sprintNo: '3',
    title: "Customising AI & RAG's",
    tagline:
      'The core of modern AI: retrieve over your own data with vector databases, LanceDB, and LlamaIndex.',
    dayRange: 'Day 6–7 · Sat–Sun',
    accent: '#FFF2CC',
    icon: 'Database',
    sessions: [
      {
        day: 'Saturday',
        time: '10am – 2pm',
        topic: 'RAG Basics + LanceDB + LlamaIndex',
        points: [
          'What is Retrieval-Augmented Generation (RAG) and why is it needed?',
          'Learn how to chunk, embed, and store data using vector databases like LanceDB',
          'Understand how LlamaIndex helps in building retrieval pipelines',
          'Build the foundation for querying your own data using LLMs',
        ],
      },
      {
        day: 'Saturday',
        time: '3pm – 7pm',
        topic: 'Building Atlas',
        points: [
          'What is Atlas and how does it act as a structured knowledge base?',
          'Learn how to organize, index, and manage large datasets for retrieval',
          'Design scalable data pipelines for storing and querying information',
          'Prepare your system for efficient and accurate RAG-based applications',
        ],
      },
      {
        day: 'Sunday',
        time: '10am – 3pm',
        topic: 'Build RAG app',
        points: [
          'How do you build a complete RAG-based application end-to-end?',
          'Integrate retrieval pipelines with LLMs to answer user queries',
          'Handle context injection, ranking, and response generation',
          'Deploy a working app that can query and reason over your own data',
        ],
      },
    ],
    outcomes: [
      'Understand and implement RAG systems end-to-end, from data ingestion to response generation.',
      'Build and manage vector databases using LanceDB for efficient similarity search and retrieval.',
      'Design structured knowledge systems (Atlas) to organize and scale data for AI applications.',
      'Integrate retrieval pipelines with LLMs using tools like LlamaIndex for accurate, context-aware responses.',
      'Develop a fully functional RAG application that can query and reason over custom datasets.',
      'Understand trade-offs in retrieval systems, including chunking strategies, latency, and accuracy.',
    ],
    tools: ['LanceDB', 'LlamaIndex', 'Atlas'],
  },
  {
    id: 4,
    sprintNo: '4',
    title: 'AI Coding Agents — Code Generation & Evaluation',
    tagline:
      'Automate the engineering workflow itself with Codex, Claude Code, MCP, and rigorous evals.',
    dayRange: 'Day 8–9 · Mon–Tue',
    accent: '#CFE2F3',
    icon: 'TerminalSquare',
    sessions: [
      {
        day: 'Monday',
        time: '7pm – 11pm',
        topic: 'Codex + Evals',
        points: [
          'Understand how automation workflows can be built using Codex for engineering and product use cases without relying on connectors or external integrations',
          'Learn where evaluations (evals) fit into product development and how to think about model-level and application-level evaluation strategies',
          'Explore how Codex can support security reviews, code understanding, and engineering quality checks',
          'Get exposure to browser-based automation workflows and practical AI-assisted development patterns',
        ],
      },
      {
        day: 'Tuesday',
        time: '7pm – 11pm',
        topic: 'Claude Code + MCP',
        points: [
          'Learn how coding agents can interact with tools, systems, and workflows using MCP-based integrations',
          'Understand how to structure engineering workflows with reusable capabilities and external system access',
          'Explore practical coding and automation workflows using AI agents for development tasks',
          'Gain exposure to orchestration concepts and how multiple AI-driven workflows can collaborate in engineering systems',
        ],
      },
    ],
    outcomes: [
      'Understand where evals fit into AI product and engineering workflows and how to think about model and application-level evaluation.',
      'Learn AI-assisted automation workflows for coding, security review, and engineering productivity.',
      'Understand how coding agents interact with tools, systems, and reusable capabilities in development workflows.',
      'Explore browser-based automation, engineering workflow variations, and practical coding use cases.',
      'Gain exposure to MCP-powered integrations and orchestration concepts for AI-driven engineering systems.',
      'Understand how AI coding workflows can improve productivity, quality, and automation in software development.',
    ],
    tools: ['OpenAI Codex', 'Claude Code', 'MCP', 'Evals'],
  },
  {
    id: 5,
    sprintNo: '5',
    title: 'AI Agents — Observability & Agent Building',
    tagline:
      'Build, orchestrate, observe, and cost-optimize multi-agent systems with the LangChain ecosystem.',
    dayRange: 'Day 10–12 · Wed–Fri',
    accent: '#EAD1DC',
    icon: 'Workflow',
    sessions: [
      {
        day: 'Wednesday',
        time: '7pm – 11pm',
        topic: 'LangChain + Langsmith',
        points: [
          'What is LangChain and how does it help in building AI applications',
          'Learn core components like chains, prompts, memory, and agents',
          'Understand how to structure and orchestrate multi-step AI workflows',
          'Use LangSmith for debugging, tracing, and monitoring LLM applications',
        ],
      },
      {
        day: 'Thursday',
        time: '7pm – 11pm',
        topic: 'LangGraph',
        points: [
          'What is LangGraph and how does it enable agentic workflows',
          'Learn how to build stateful, multi-step AI systems using graph-based logic',
          'Handle complex flows with branching, loops, and memory',
          'Design and orchestrate multi-agent systems for real-world use cases',
        ],
      },
      {
        day: 'Friday',
        time: '7pm – 11pm',
        topic: 'Cost Optimization',
        points: [
          'How does pricing work across different AI models (tokens, modalities, context windows)?',
          'Learn practical strategies like caching, batching, and prompt optimization to reduce costs',
          'Understand how to choose the right model based on use case and budget',
          'Optimize AI systems for performance vs cost trade-offs in real-world applications',
        ],
      },
    ],
    outcomes: [
      'Understand how to build, structure, and orchestrate AI applications using frameworks for multi-step workflows and agentic systems.',
      'Learn core concepts such as prompts, chains, memory, agents, graph-based workflows, and state management for AI systems.',
      'Design and orchestrate complex AI workflows with branching, loops, multi-agent collaboration, and real-world automation patterns.',
      'Debug, trace, monitor, and improve AI application performance using observability and workflow monitoring practices.',
      'Understand AI model pricing, token usage, context windows, and cost considerations across different model types and modalities.',
      'Learn practical cost optimization strategies and make informed trade-offs between performance, quality, latency, and budget.',
    ],
    tools: ['LangChain', 'LangSmith', 'LangGraph'],
  },
  {
    id: 6,
    sprintNo: '6',
    title: 'Building AI Coding Agent',
    tagline:
      'The capstone build: Orion — a Discord-integrated AI engineering agent that ships real PRs.',
    dayRange: 'Day 13 · Saturday',
    accent: '#D9EAD3',
    icon: 'Bot',
    sessions: [
      {
        day: 'Saturday',
        time: '10am – 2pm',
        topic: 'Building Orion',
        points: [
          'Build your own AI Engineering Agent',
          'Learn to Create a Discord Bot that can make changes to your projects and raise PRs',
          'Utilize OpenAI Codex — Cloud and Software Engineering Agents in Parallel',
          'Combine LangChain, LangSmith, LangGraph and OpenAI Codex',
        ],
      },
    ],
    outcomes: [
      'Build an AI engineering agent capable of understanding tasks, making code changes, and executing workflows autonomously.',
      'Create a Discord-based interface to interact with the agent and trigger actions like updates and PR creation.',
      'Leverage OpenAI Codex and parallel agents to automate real-world software engineering tasks efficiently.',
      'Orchestrate multi-tool workflows using LangChain, LangGraph, and LangSmith for structured execution and monitoring.',
    ],
    tools: ['Discord', 'OpenAI Codex', 'LangChain', 'LangGraph', 'LangSmith'],
  },
  {
    id: 7,
    sprintNo: '7',
    title: 'The AI-Native Hackathon',
    tagline:
      'At this point, you build your own tools. Secure, deploy, and optimize complex agents — perks of being an engineer.',
    dayRange: 'Day 13–14 · Sat–Sun',
    accent: '#FFE08A',
    icon: 'Trophy',
    sessions: [
      {
        day: 'Saturday – Sunday',
        time: '3pm (13 June) – 5pm (14 June)',
        topic: 'Hackathon',
        points: [
          'Secure, deploy, and optimize AI systems by chaining complex agents, ensuring scalability, and cost-efficiency.',
        ],
      },
    ],
    outcomes: [
      'Apply all acquired skills to design, build, and ship original AI-powered tools or solutions.',
      'Demonstrate the capability to tackle open-ended, real-world engineering challenges.',
      'Collaborate, present, and compete in a supportive, fast-paced hackathon environment.',
      'Graduate with a portfolio-ready project that showcases your AI engineering expertise.',
    ],
    tools: ['Full AI-native stack'],
    note: 'As an AI-engineer, at this point you will be building your own tools! Perks of being an engineer.',
  },
]

export const programStats = [
  { label: 'Sprints', value: '8' },
  { label: 'Days', value: '14' },
  { label: 'Live Hours', value: '40+' },
  { label: 'Capstone', value: 'Orion' },
]
