export const projects = [
  {
    id: "the-last-dance-restaurant",
    category: "Full-Stack Application • Mobile App",
    title: "The Last Dance - Restaurant",
    description:
      "Aplicación móvil full-stack desarrollada como proyecto final universitario para simular la gestión real de un restaurante. Permite a los usuarios explorar el menú, realizar pedidos, gestionar reservas y operar con distintos roles dentro del sistema, integrando funcionalidades en tiempo real y validaciones similares a un entorno profesional.",
    learnings:
      "Este proyecto me permitió trabajar con una visión integral del desarrollo full-stack en un entorno colaborativo. Me desempeñé como líder del equipo, coordinando tareas, comunicándome con los docentes y adaptando el sistema a cambios de requerimientos simulando un cliente real. Aprendí a diseñar una arquitectura escalable, validar datos tanto en frontend como en backend, manejar sesiones con renovación automática y trabajar con estados en tiempo real mediante sockets. Fue una experiencia muy cercana a un entorno profesional real.",
    technologies:
      "React Native (Expo) • Node.js (Express) • TypeScript • PostgreSQL (Supabase) • Socket.IO • Axios • Tailwind • Google Services",
    linkToGithub: "https://github.com/EzequielMelo/TheLastDance-2025",
    linkToLive: "",
    image: "/thelastdance-mockup.webp",
    video: "/thelastdance-video.webm",
  },
  {
    id: "toque-gourmet",
    category: "Landing Page • Web Development",
    title: "Toque Gourmet",
    description:
      "Landing page desarrollada para un cliente real del rubro gastronómico, dedicada a la venta de viandas y servicios para eventos medianos y grandes. El sitio presenta los productos de forma clara y visual, respetando la identidad de marca existente y ofreciendo múltiples canales de contacto. Fue pensada como una base sólida para una futura expansión funcional.",
    learnings:
      "Este proyecto representó mi primera experiencia trabajando con un cliente real y con un producto comercializado. Implicó adaptarse a una identidad visual ya definida (tipografías, colores y estilo), mantener un ida y vuelta constante de ideas y propuestas, y tomar decisiones técnicas en conjunto con otro desarrollador. Utilizamos Angular pensando en la escalabilidad del proyecto ante posibles futuras funcionalidades como registros o secciones dinámicas. También fue la primera vez que trabajé con un dominio propio, realicé el presupuesto del sitio, gestioné el despliegue en Firebase y apliqué optimizaciones de SEO y rendimiento para asegurar una buena experiencia en todo tipo de dispositivos.",
    technologies: "Angular • Firebase • Tailwind • Typescript • EmailJS",
    linkToGithub: "https://github.com/EzequielMelo/toque-gourmet",
    linkToLive: "https://toquegourmet.com.ar",
    image: "/toquegourmet-mockup.webp",
    video: "/toquegourmet-video.webm",
  },
  {
    id: "clinical-center",
    category: "Healthcare Web App • Frontend & Cloud Services",
    title: "Clinical Center",
    description:
      "Aplicación web que simula la gestión integral de una clínica online. Permite administrar turnos médicos, usuarios con distintos roles y el historial clínico de los pacientes, integrando autenticación, base de datos y hosting en la nube mediante Firebase.",
    learnings:
      "Profundicé en el desarrollo de aplicaciones web con Angular utilizando una arquitectura completamente orientada a servicios en la nube. Aprendí a trabajar con Firebase como plataforma integral, implementando autenticación, base de datos NoSQL, almacenamiento y hosting. Desarrollé lógica de negocio para la gestión de turnos médicos, validando fechas, estados y roles de usuario, así como funcionalidades avanzadas como historial clínico, métricas para administradores, internacionalización y exportación de datos. Este proyecto reforzó mi capacidad para modelar sistemas reales, aplicar reglas complejas y construir interfaces escalables y mantenibles.",
    technologies:
      "Angular • Firebase (Auth, Firestore, Hosting) • Tailwind CSS • TypeScript",
    linkToGithub:
      "https://github.com/EzequielMelo/TP_LaboratorioIV_ClinicaOnLine",
    linkToLive: "https://clinicaonline-ezequiel-melo.web.app/home",
    image: "/clinicalcenter-mockup.webp",
    video: "/clinicalcenter-video.webm",
  },
  {
    id: "anime-project",
    category: "Anime Community Platform • Full-Stack Web Development",
    title: "Anime Project",
    description:
      "Aplicación web full-stack orientada a la comunidad, que permite explorar un catálogo de animes, interactuar mediante comentarios y gestionar perfiles de usuario. El proyecto incluye autenticación, sistema de valoraciones, favoritos y roles de administrador, utilizando una arquitectura clásica basada en servidor.",
    learnings:
      "Primer proyecto web full-stack con persistencia de datos real utilizando MySQL. Aprendí a diseñar y consultar una base de datos relacional, manejar autenticación de usuarios, roles (usuario y administrador) y sesiones. Implementé un backend con Node.js y Express, renderizado dinámico con Handlebars y despliegue en un servidor real mediante SSH. También trabajé en la moderación de contenido, gestión de permisos y estructura MVC básica.",
    technologies:
      "HTML • CSS • JavaScript • Node.js • Express • Handlebars • MySQL",
    linkToGithub: "https://github.com/EzequielMelo/CodoACodo_Anime-Page",
    linkToLive: "https://anime-project.alwaysdata.net/",
    image: "/animeproject-mockup.webp",
    video: "/animeproject-video.webm",
  },
  {
    id: "juegoteca",
    category: "Web Game • Full-Stack Development",
    title: "Juegoteca",
    description:
      "Página web de minijuegos en línea con sistema de usuarios y rankings para competir con tus amigos. Cuenta con un chat en vivo y muchas más funciones para que te diviertas y pases horas jugando.",
    technologies:
      "Angular • Firebase hosting • Firebase firestore • Tailwind • Typescript",
    linkToGithub:
      "https://github.com/EzequielMelo/TP_LaboratorioIV_SalaDeJuegos",
    linkToLive: "https://sala-de-juegos-ezequiel-melo.web.app/home",
    image: "/juegoteca-mockup.webp",
    video: "/juegoteca-video.webm",
  },
  {
    id: "sube",
    category: "Desktop Aplication • Software Development",
    title: "Sube",
    description:
      "Aplicación de escritorio que busca simular el Sistema Único de Boletos Electrónicos de Argentina. Cuenta con una interfaz amigable y fácil de usar, así como un sistema de usuarios, recargas, viajes y mucho más.",
    technologies: "C# • SQL • Windows Forms",
    linkToGithub: "https://github.com/JpCortezF/Sistema-SUBE",
    linkToLive: "",
    image: "/sube-mockup.webp",
    video: "/sube-video.webm",
  },
  {
    id: "flia",
    category: "Landing Page • Web Design",
    title: "Flia",
    description:
      "Landing page para una empresa dedicada a la venta de diversos productos para el hogar. Cuenta con formularios de contacto y de descuentos, además de permitirte visualizar algunos de los productos de la empresa.",
    technologies: "HTML • CSS • Javascript • JQuery",
    linkToGithub:
      "https://github.com/EzequielMelo/ArgPrograma_4.0_Landing-Page/tree/main",
    linkToLive: "https://flia.netlify.app/",
    image: "/flia-mockup.webp",
    video: "/flia-video.webm",
  },
];
