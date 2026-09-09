export type CaseStudyContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "subheading";
      text: string;
    }
  | {
      type: "figure";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "table";
      columns: [string, string, string];
      rows: [string, string, string][];
    };

export interface ProjectBase {
  id: string;
  category: string;
  title: string;
  image?: string;
  video?: string;
  cardStack?: string;
  linkToGithub?: string;
  linkToLive?: string;
  linkToVideos?: string;
}

export interface StandardProject extends ProjectBase {
  detailType: "standard";
  description: string;
  learnings: string;
  technologies: string;
  image: string;
  video: string;
  images?: string[];
}

export interface CaseStudySection {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  blocks: CaseStudyContentBlock[];
}

export interface CaseStudyProject extends ProjectBase {
  detailType: "case-study";
  linkToLive: string;
  summary: string;
  participation: string;
  technologies: string[];
  sections: CaseStudySection[];
}

export type Project = StandardProject | CaseStudyProject;

export const projects: Project[] = [
  {
    detailType: "case-study",
    id: "ecommerce-modular",
    category: "E-commerce Platform • Full Stack & DevOps",
    title: "ECommerce Modular",
    cardStack: ".NET 10 · Angular · PostgreSQL",
    linkToLive: "https://core-gamer.com/",
    summary:
      "Plataforma modular de comercio electrónico desarrollada con .NET 10, Angular y PostgreSQL. Es una base tecnológica diseñada para construir soluciones de comercio electrónico personalizadas sin comenzar cada proyecto desde cero. El sistema combina una arquitectura modular, procesamiento en segundo plano, integraciones externas y un flujo automatizado de despliegue mediante contenedores.",
    participation:
      "Participé junto a mi socio en todo el ciclo del producto: análisis, decisiones de arquitectura, desarrollo full-stack, modelado de datos, integraciones, seguridad, contenerización, infraestructura y despliegue.",
    technologies: [
      ".NET 10",
      "C#",
      "Angular",
      "PostgreSQL",
      "Entity Framework Core",
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Cloudflare",
    ],
    sections: [
      {
        id: "el-desafio",
        number: 2,
        title: "El desafío",
        blocks: [
          {
            type: "paragraph",
            text: "El objetivo no era desarrollar una tienda para un único negocio, sino construir una base capaz de adaptarse a diferentes clientes y modelos comerciales.",
          },
          {
            type: "paragraph",
            text: "Para lograrlo, el sistema debía mantener separadas sus distintas responsabilidades, permitir incorporar reglas particulares sin afectar funcionalidades existentes y operar inicialmente sobre una infraestructura de costos moderados.",
          },
          {
            type: "paragraph",
            text: "También debía contemplar necesidades propias de una plataforma comercial real: autenticación, autorización, administración de productos e inventario, procesamiento de pagos, facturación, trabajos en segundo plano y despliegues reproducibles.",
          },
        ],
      },
      {
        id: "decision-arquitectonica",
        number: 3,
        title: "Decisión arquitectónica",
        subtitle: "Monolito modular",
        blocks: [
          {
            type: "paragraph",
            text: "Elegimos una arquitectura de monolito modular para obtener límites claros entre dominios sin asumir desde el comienzo la complejidad operativa de una arquitectura distribuida.",
          },
          {
            type: "paragraph",
            text: "Cada módulo concentra un área funcional y mantiene su propia lógica, entidades y operaciones. El sistema se despliega inicialmente como una unidad, pero la separación interna facilita modificar, reemplazar o extraer funcionalidades si la evolución del producto lo requiere.",
          },
          {
            type: "paragraph",
            text: "Esta decisión permitió equilibrar mantenibilidad, velocidad de desarrollo, costos de infraestructura y capacidad de crecimiento.",
          },
        ],
      },
      {
        id: "organizacion-modular-del-backend",
        number: 4,
        title: "Organización modular del backend",
        blocks: [
          {
            type: "figure",
            src: "/ecommerce-modular-architecture.svg",
            alt: "Diagrama de la organización del monolito modular y sus vertical slices",
            caption: "Organización del backend por dominios funcionales y operaciones verticales.",
          },
          {
            type: "paragraph",
            text: "El backend está dividido por dominios funcionales. La identidad, el catálogo, las ventas, los pagos, la facturación y las demás áreas del sistema no se organizan únicamente como carpetas, sino como módulos con responsabilidades delimitadas.",
          },
          {
            type: "paragraph",
            text: "Esta separación reduce el acoplamiento entre funcionalidades y permite que las personalizaciones de un cliente se concentren en los dominios correspondientes.",
          },
          {
            type: "subheading",
            text: "Vertical slices",
          },
          {
            type: "paragraph",
            text: "Dentro de cada módulo, las operaciones se organizan mediante vertical slices. Cada funcionalidad reúne los componentes necesarios para procesar una acción completa: entrada, validación, lógica, persistencia y respuesta.",
          },
          {
            type: "paragraph",
            text: "Este enfoque facilita encontrar y modificar una funcionalidad porque su implementación no queda distribuida entre múltiples capas genéricas. Por ejemplo, la creación de un producto agrupa su solicitud, validaciones, reglas de negocio y resultado dentro de una misma funcionalidad, manteniendo separadas otras operaciones del catálogo.",
          },
        ],
      },
      {
        id: "arquitectura-de-ejecucion",
        number: 5,
        title: "Arquitectura de ejecución",
        blocks: [
          {
            type: "figure",
            src: "/ecommerce-production-architecture.svg",
            alt: "Diagrama de la arquitectura de ejecución en producción",
            caption: "Servicios contenerizados, redes internas y acceso externo a la infraestructura de producción.",
          },
          {
            type: "paragraph",
            text: "Los componentes se ejecutan en contenedores independientes y se comunican mediante redes internas. Nginx centraliza el ingreso de solicitudes y las dirige hacia la aplicación web o la API según el recurso solicitado.",
          },
          {
            type: "paragraph",
            text: "PostgreSQL permanece aislado de la exposición pública y solamente puede ser utilizado por los componentes autorizados dentro de la infraestructura.",
          },
          {
            type: "paragraph",
            text: "Esta organización permite actualizar frontend y backend de manera independiente, conservar responsabilidades claras y limitar la exposición innecesaria de servicios.",
          },
          {
            type: "paragraph",
            text: "El acceso externo se canaliza mediante Cloudflare Tunnel, evitando exponer directamente los servicios internos del VPS.",
          },
        ],
      },
      {
        id: "persistencia-y-postgresql",
        number: 6,
        title: "Persistencia y PostgreSQL",
        blocks: [
          {
            type: "paragraph",
            text: "PostgreSQL fue seleccionado como base de datos relacional para representar entidades y procesos comerciales que requieren relaciones, restricciones e integridad de datos.",
          },
          {
            type: "paragraph",
            text: "El acceso a la información se implementó mediante Entity Framework Core, utilizando migraciones para versionar la evolución del esquema junto con el código de la aplicación.",
          },
          {
            type: "paragraph",
            text: "Las migraciones forman parte del proceso de actualización del backend, evitando que los cambios de aplicación y base de datos dependan de tareas manuales separadas.",
          },
        ],
      },
      {
        id: "autenticacion-y-autorizacion",
        number: 7,
        title: "Autenticación, autorización y separación de usuarios",
        blocks: [
          {
            type: "paragraph",
            text: "El sistema distingue entre clientes y personal administrativo, asignando permisos según el tipo de usuario y las responsabilidades que puede ejecutar.",
          },
          {
            type: "paragraph",
            text: "La autenticación y la autorización se implementaron como capacidades reutilizables de la plataforma. Esto permitió conservar el manejo de identidades, sesiones, roles y permisos al adaptar la base a nuevos proyectos.",
          },
          {
            type: "paragraph",
            text: "Las operaciones protegidas validan tanto la identidad del usuario como su autorización para acceder a cada recurso. Además, se aplicaron controles complementarios para proteger sesiones, solicitudes autenticadas y operaciones sensibles.",
          },
        ],
      },
      {
        id: "procesamiento-en-segundo-plano",
        number: 8,
        title: "Procesamiento en segundo plano",
        blocks: [
          {
            type: "paragraph",
            text: "Algunas tareas que no deben bloquear una solicitud web se ejecutan mediante workers y procesos en segundo plano.",
          },
          {
            type: "paragraph",
            text: "Esta separación permite responder al usuario sin esperar que finalicen operaciones más costosas, controlar reintentos y mantener aisladas tareas asociadas con integraciones, archivos, notificaciones u otros procesos internos.",
          },
        ],
      },
      {
        id: "contenedores-e-infraestructura",
        number: 9,
        title: "Contenedores e infraestructura",
        blocks: [
          {
            type: "paragraph",
            text: "La API, el frontend, la base de datos, el proxy inverso y los componentes de infraestructura se ejecutan como servicios separados mediante Docker.",
          },
          {
            type: "paragraph",
            text: "Las imágenes de producción utilizan construcciones multietapa para separar el entorno de compilación del entorno de ejecución. Esto evita incluir herramientas de desarrollo innecesarias en la imagen final.",
          },
          {
            type: "paragraph",
            text: "Los servicios incorporan controles de salud y se ejecutan con permisos limitados cuando corresponde. La información sensible se mantiene fuera del código fuente y se proporciona al entorno durante la ejecución.",
          },
        ],
      },
      {
        id: "cicd-y-despliegue",
        number: 10,
        title: "CI/CD y despliegue automatizado",
        blocks: [
          {
            type: "figure",
            src: "/ecommerce-cicd-pipeline.svg",
            alt: "Diagrama del pipeline de integración y despliegue continuo",
            caption: "Pipelines independientes para construir, versionar y desplegar el frontend y la API.",
          },
          {
            type: "paragraph",
            text: "La API y el frontend cuentan con pipelines independientes. Al integrar cambios en la rama principal, GitHub Actions construye el componente correspondiente, genera una imagen Docker y la publica en un registro privado.",
          },
          {
            type: "paragraph",
            text: "Cada imagen se identifica tanto como versión actual como mediante el commit que la produjo. Esto permite relacionar el software desplegado con su código fuente y facilita recuperar una versión anterior.",
          },
          {
            type: "paragraph",
            text: "El VPS no compila la aplicación. Solamente descarga la imagen ya construida y reemplaza el servicio correspondiente, reduciendo el consumo de recursos y permitiendo utilizar una infraestructura de capacidad moderada.",
          },
          {
            type: "paragraph",
            text: "Como frontend y backend se despliegan por separado, una modificación en uno de ellos no requiere reconstruir ni reiniciar todo el sistema.",
          },
          {
            type: "paragraph",
            text: "Actualmente, el pipeline valida que la aplicación pueda construirse correctamente. Como evolución, se incorporarán pruebas automatizadas y controles de calidad como condición previa al despliegue.",
          },
        ],
      },
      {
        id: "seguridad-por-capas",
        number: 11,
        title: "Seguridad por capas",
        blocks: [
          {
            type: "list",
            items: [
              "Acceso externo canalizado mediante una capa intermedia.",
              "Servicios internos sin exposición pública directa.",
              "Base de datos aislada del acceso externo.",
              "Autenticación y autorización por responsabilidades.",
              "Protección de solicitudes autenticadas.",
              "Procesos ejecutados con permisos limitados.",
              "Secretos fuera del repositorio y de las imágenes.",
              "Persistencia y claves protegidas fuera del código.",
              "ORM y consultas parametrizadas para el acceso a datos.",
              "Controles de salud y monitoreo de servicios.",
            ],
          },
        ],
      },
      {
        id: "reutilizacion-comprobada",
        number: 12,
        title: "Reutilización comprobada",
        blocks: [
          {
            type: "paragraph",
            text: "La arquitectura se validó al utilizar el sistema como punto de partida para una solución B2B orientada a un comercio mayorista.",
          },
          {
            type: "table",
            columns: ["Tipo", "Elementos", "Impacto"],
            rows: [
              [
                "Base reutilizada",
                "Autenticación, permisos, usuarios, catálogo, productos, inventario y procesos internos.",
                "Evitó reconstruir capacidades comunes ya validadas.",
              ],
              [
                "Adaptación B2B",
                "Proveedores, cuentas comerciales y reglas financieras.",
                "Concentró el esfuerzo en los diferenciales del nuevo negocio.",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Esto permitió comprobar que la modularidad aportaba un beneficio real de negocio: disminuir el trabajo repetido sin convertir todos los proyectos en copias idénticas.",
          },
        ],
      },
      {
        id: "resultado",
        number: 13,
        title: "Resultado",
        blocks: [
          {
            type: "paragraph",
            text: "El proyecto produjo una base funcional, desplegable y reutilizable que pudo utilizarse tanto como demostración comercial como punto de partida para un sistema real.",
          },
          {
            type: "paragraph",
            text: "La automatización eliminó la necesidad de copiar el código y compilar manualmente dentro del servidor. Las actualizaciones pasaron a ser repetibles, trazables y menos dependientes de intervenciones manuales.",
          },
          {
            type: "paragraph",
            text: "La validación con un segundo sistema permitió comprobar que los dominios comunes podían mantenerse y que las particularidades de cada negocio podían desarrollarse sobre módulos específicos.",
          },
        ],
      },
      {
        id: "aprendizajes",
        number: 14,
        title: "Aprendizajes",
        blocks: [
          {
            type: "paragraph",
            text: "Uno de los aprendizajes principales fue entender que una arquitectura más distribuida no siempre es una arquitectura mejor. El monolito modular permitió mantener límites claros y costos operativos razonables sin introducir complejidad antes de necesitarla.",
          },
          {
            type: "paragraph",
            text: "También profundicé en separación de dominios, control de dependencias, procesamiento en segundo plano, contenerización, redes internas, despliegues automatizados y administración segura de configuración sensible.",
          },
          {
            type: "paragraph",
            text: "La reutilización en un proyecto B2B también permitió identificar qué partes constituían capacidades generales de la plataforma y cuáles debían permanecer específicas de cada cliente.",
          },
        ],
      },
    ],
  },
  {
    detailType: "standard",
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
    linkToVideos:
      "https://youtube.com/playlist?list=PLwNluoTBkh_4kQ6Sn-1aLSRbdmw5-HTfD&si=CxJDunI92GCh3Ejt",
    image: "/thelastdance-mockup2.webp",
    images: [
      "/thelastdance-mockup.webp",
      "/thelastdance-mockup2.webp",
      "/thelastdance-splashscreen.webp",
      "/thelastdance-ordenenmesa.webp",
      "/thelastdance-menu.webp",
      "/thelastdance-pedido.webp",
      "/thelastdance-carrito.webp",
      "/thelastdance-encuesta.webp",
      "/thelastdance-respuestaencuestas.webp",
    ],
    video: "/thelastdance-video.webm",
  },
  {
    detailType: "standard",
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
    images: [
      "/clinicalcenter-mockup.webp",
      "/clinicalcenter-home.webp",
      "/clinicalcenter-myprofileadmin.webp",
      "/clinicalcenter-logsadmin.webp",
      "/clinicalcenter-myprofilespecialist.webp",
      "/clinicalcenter-mypatientsspecialist.webp",
      "/clinicalcenter-myprofilepatient.webp",
      "/clinicalcenter-myappointmentspatient.webp",
    ],
    video: "/clinicalcenter-video.webm",
  },
  {
    detailType: "standard",
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
    images: [
      "/toquegourmet-mockup.webp",
      "/toquegourmet-home.webp",
      "/toquegourmet-services.webp",
      "/toquegourmet-aboutus.webp",
      "/toquegourmet-faqs.webp",
      "/toquegourmet-contact.webp",
    ],
    video: "/toquegourmet-video.webm",
  },
  {
    detailType: "standard",
    id: "adoptme",
    category: "Web App • Full-Stack Web Development",
    title: "AdoptMe",
    description:
      "Aplicación web full-stack orientada a la adopción de mascotas, que permite publicar animales, gestionar solicitudes de adopción y comunicarse mediante un sistema de chat entre adoptantes y responsables. La plataforma incluye autenticación de usuarios, manejo de estados de adopción (disponible, reservado, adoptado), historial de publicaciones y adopciones, búsquedas y filtros por tipo de mascota, y una interfaz completamente responsive optimizada para mobile y desktop.",
    learnings:
      "Diseño e implementación de una API REST completa con Node.js y Express utilizando TypeScript. Modelado de datos y reglas de negocio reales para un sistema de adopciones, integración de Supabase Auth con un backend personalizado, manejo de estados y permisos, y coordinación entre frontend y backend en un proyecto dividido en múltiples repositorios.",
    technologies:
      "React (Vite) • Tailwind CSS • TypeScript • PostgreSQL (Supabase) • Node.js (Express)",
    linkToGithub: "https://github.com/EzequielMelo/Polo-IT_Proyecto_BackEnd",
    linkToLive: "",
    linkToVideos: "https://www.youtube.com/watch?v=-moeX12O1Jc",
    image: "/adoptme-mockup.webp",
    video: "/adoptme-video.webm",
  },
  {
    detailType: "standard",
    id: "juegoteca",
    category: "Web Game Platform • Frontend & Cloud Services",
    title: "Juegoteca",
    description:
      "Plataforma web de minijuegos desarrollada con Angular, que incluye sistema de usuarios, puntuaciones globales y un chat en tiempo real. Los usuarios pueden competir entre sí, registrar su progreso y participar únicamente luego de autenticarse.",
    learnings:
      "Primer proyecto desarrollado con Angular y Firebase. Aprendí a estructurar una aplicación frontend por módulos y componentes, integrar autenticación de usuarios y persistir datos en una base de datos NoSQL. Implementé lógica de juegos con manejo de estados, puntajes y vidas, consumo de APIs externas y un chat global en tiempo real. Este proyecto sentó las bases para el uso posterior de servicios de Google en aplicaciones más complejas.",
    technologies:
      "Angular • Firebase (Auth, Firestore, Hosting) • Tailwind CSS • TypeScript",
    linkToGithub:
      "https://github.com/EzequielMelo/TP_LaboratorioIV_SalaDeJuegos",
    linkToLive: "https://sala-de-juegos-ezequiel-melo.web.app/home",
    image: "/juegoteca-mockup.webp",
    video: "/juegoteca-video.webm",
  },
  {
    detailType: "standard",
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
    detailType: "standard",
    id: "sube",
    category: "Desktop Application • Object-Oriented Programming",
    title: "Sube",
    description:
      "Aplicación de escritorio desarrollada en C# que simula el funcionamiento del Sistema Único de Boleto Electrónico (SUBE) de Argentina. Permite gestionar usuarios, tarjetas, recargas, viajes, tarifas diferenciadas y subsidios, a través de una interfaz gráfica construida con Windows Forms y persistencia de datos en SQL.",
    learnings:
      "Primer acercamiento práctico a la Programación Orientada a Objetos aplicando encapsulamiento, herencia, abstracción y polimorfismo. Diseño de lógica de negocio compleja, manejo de base de datos SQL, desarrollo de interfaces de escritorio con Windows Forms y uso de multihilos para simular procesos concurrentes del sistema.",
    technologies: "C# • SQL • Windows Forms",
    linkToGithub: "https://github.com/JpCortezF/Sistema-SUBE",
    linkToLive: "",
    image: "/sube-mockup.webp",
    video: "/sube-video.webm",
  },
];
