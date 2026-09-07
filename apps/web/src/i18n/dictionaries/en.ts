import type { Dict } from "./ar";

export const en: Dict = {
  brand: {
    workflow: "Workflow",
    "footerLead": "Build better",
    "footerAccent": "together.",
    "heroVision": "Same vision.",
    "heroImpact": "Greater impact.",
    "heroBuild": "Build better",
    "heroTogether": "together.",
    "aboutPillars": "Product · People · Possibilities",
    "contactNote": "Great products start with a conversation.",
    "assistantName": "DevsHub.cc assistant",
    "online": "Online",
    "tests": "Tests",
    "securityOk": "Security verified",
    "deploy": "Deployed",
    "socialLink": "External profile",
    "website": "Website",
    "email": "Email",
    "githubProfile": "GitHub profile"
},
  meta: {
    title: "DevsHub.cc | Ideas to Products. Together.",
    template: "%s · DevsHub.cc",
    description:
      "DevsHub.cc brings product strategy, UI/UX design and engineering together. Your software partner from the first idea to a product ready to grow.",
  },
  nav: {
    home: "Home",
    services: "Services",
    capabilities: "Capabilities",
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
    menu: "Menu",
    switchLang: "Language",
    switchLangAria: "Change site language",
  },
  hero: {
    badge: "Accepting new projects this quarter",
    tagline: "A software partner for what’s next",
    primary: "Build what’s next",
    secondary: "See our work",
    scroll: "Discover more",
    orbit: ["Software", "AI", "Automation", "Mobile", "Cloud", "Data"],
    cards: {
      agent: {
        title: "AI agent running",
        sub: "Answered 1,240 requests this week",
        status: "Live",
      },
      flow: {
        title: "Flow: Order → Invoice → WhatsApp",
        sub: "Completed in 3.2s",
        status: "Success",
      },
      deploy: {
        title: "Secure cloud deployment",
        sub: "99.9% uptime · monitored 24/7",
        status: "Stable",
      },
    },
    stats: [
      { value: "+120", label: "Projects delivered" },
      { value: "+60", label: "Clients trust us" },
      { value: "24/7", label: "Support & monitoring" },
    ],
  },
  trust: { eyebrow: "Trusted by", stackEyebrow: "Technologies we build with" },
  services: {
    eyebrow: "Services",
    title: "One team. ",
    titleAccent: "Every possibility.",
    description:
      "From product direction and thoughtful design to reliable software, AI and automation. Everything your product needs to move forward.",
    more: "Let’s talk about it",
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "What makes ",
    titleAccent: "DevsHub.cc different?",
    description:
      "Explore how thoughtful engineering, AI and connected systems can make your product more useful.",
    ai: {
      title: "Custom AI agents",
      text: "Assistants that understand your data and documents and answer customers in Arabic and English on web and WhatsApp, fully integrated with your systems.",
      chat: [
        { role: "user", text: "Where is my order #4821?" },
        {
          role: "bot",
          text: "It left the warehouse today at 10:40 AM and arrives tomorrow. Want to change the delivery address?",
        },
        { role: "user", text: "Yes, to the Olaya branch" },
        {
          role: "bot",
          text: "Address updated and the courier has been notified ✅",
        },
      ],
      typing: "typing...",
    },
    automation: {
      title: "Automation that connects everything",
      text: "Workflows that run themselves: from incoming order to invoice, notification and report, with zero manual work.",
      nodes: [
        "New order",
        "Check stock",
        "Issue invoice",
        "WhatsApp notify",
        "Update CRM",
        "Daily report",
      ],
      runs: "successful runs",
    },
    code: {
      title: "Engineering at a high standard",
      text: "Clean code, automated tests and continuous deployment. Platforms that scale from the first user to millions.",
    },
    data: {
      title: "Data & decision dashboards",
      text: "We turn scattered data into real-time dashboards that help you decide with confidence.",
      metrics: [
        { label: "Revenue", value: "+38%" },
        { label: "Processing time", value: "-72%" },
        { label: "Customer satisfaction", value: "4.9/5" },
      ],
    },
    integrations: {
      title: "Ready integrations",
      text: "WhatsApp, Salla, Zid, Odoo, SAP, Stripe, HubSpot and 200+ more services.",
    },
  },
  work: {
    eyebrow: "Our work",
    title: "Ideas made real. ",
    titleAccent: "Built with purpose.",
    description:
      "A selection of platforms and systems we built for clients across industries, each with a live preview.",
    all: "View all work",
    details: "Details",
    live: "Live preview",
    featured: "Featured",
  },
  process: {
    eyebrow: "How we work",
    title: "From first conversation ",
    titleAccent: "to what’s next.",
    steps: [
      {
        title: "Discovery & analysis",
        text: "We learn your goals, audience and current systems, then define scope, stack and a clear timeline.",
      },
      {
        title: "Design & prototype",
        text: "Modern interfaces and an interactive prototype you review and approve before a single line of code.",
      },
      {
        title: "Build & integrate",
        text: "Clean, scalable code with AI and automation baked in, plus continuous testing.",
      },
      {
        title: "Launch & grow",
        text: "Deployment on reliable cloud infrastructure, monitoring, continuous improvement and post-launch support.",
      },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "Product. People. ",
    titleAccent: "Possibilities.",
    values: [
      {
        title: "Engineering quality",
        text: "Strict code standards and continuous reviews.",
      },
      {
        title: "Fast delivery",
        text: "Short cycles and tangible results every two weeks.",
      },
      {
        title: "Full transparency",
        text: "Clear reporting and direct access to the team.",
      },
      {
        title: "Long-term support",
        text: "We stay with you after launch for growth and monitoring.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What our ",
    titleAccent: "partners say",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Have a question? ",
    titleAccent: "We have answers",
    items: [
      {
        q: "How long does a full project take?",
        a: "It depends on scope. Mid-size websites and platforms take 4-8 weeks; larger systems 3-6 months with incremental deliveries every two weeks.",
      },
      {
        q: "Can you build AI solutions on our own data?",
        a: "Yes. We build assistants and agents that work on your documents and systems (RAG) with strict data privacy, and they can be hosted on your own cloud.",
      },
      {
        q: "Which systems can be automated and integrated?",
        a: "Anything with an API or files: ERP, CRM, e-commerce stores, WhatsApp, email, spreadsheets and accounting systems. We use n8n, Make and custom solutions.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes, monthly support and monitoring plans that include security updates, backups and continuous development.",
      },
      {
        q: "How do we start?",
        a: "Send us your idea through the form below. We reply within 24 hours with a free discovery session, a clear plan and a quote.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    title: "Have an idea?",
    titleAccent: "Let's make it real.",
    description:
      "Send your project details and our team will reply within 24 hours with a clear plan and a fair quote.",
    email: "Email",
    whatsapp: "WhatsApp",
    whatsappValue: "Chat directly",
    phone: "Phone",
    location: "Location",
    form: {
      name: "Name",
      namePh: "Your full name",
      email: "Email",
      subject: "Project type",
      subjectPh: "Platform, app, AI assistant, automation...",
      body: "Project details",
      bodyPh:
        "Tell us about your idea, goals and approximate budget if known...",
      submit: "Send request",
      doneTitle: "Your request was sent",
      doneText:
        "Thanks for reaching out. Our team will get back to you shortly.",
      again: "Send another request",
      error: "Something went wrong, please try again",
    },
  },
  cta: {
    title: "Ready to build ",
    titleAccent: "the next generation of your product?",
    text: "Book a free discovery session with our team.",
    button: "Book a free session",
  },
  footer: {
    tagline:
      "Product thinking. Design clarity. Engineering execution. Your complete software partner.",
    links: "Links",
    services: "Services",
    contact: "Contact",
    rights: "All rights reserved.",
    built: "BUILD BETTER TOGETHER",
    top: "Back to top",
    serviceLinks: [
      "Software development",
      "AI solutions",
      "Automation & integration",
      "Mobile apps",
      "Cloud & DevOps",
    ],
  },
  projects: {
    title: "Our Work",
    metaDescription:
      "Browse all the platforms, apps, AI solutions and automations we have built, each with a live preview.",
    heading: "Selected ideas. ",
    headingAccent: "Real products.",
    description:
      "The complete collection: platforms, apps, stores, dashboards, AI assistants and automations. Open any project for details or a live preview.",
    all: "All",
    empty: "No projects in this category yet.",
    back: "Back to work",
    client: "Client",
    year: "Year",
    type: "Type",
    tech: "Technologies",
    source: "Source code",
    aboutProject: "About the project",
    similarTitle: "Want something similar?",
    similarText:
      "Tell us your idea and we'll propose the best technical approach with a timeline and quote.",
    start: "Start now",
    shots: "Project screens",
    others: "More projects",
    notFound: "Project not found",
    noImage: "No image",
    close: "Close",
    prev: "Previous",
    next: "Next",
  },
  notFound: {
    title: "Page not found",
    text: "The page may have been moved or deleted.",
    home: "Back to home",
  },
};
