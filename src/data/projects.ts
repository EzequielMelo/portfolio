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
      caption?: string;
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
  imageMobile?: string;
  imageDesktop?: string;
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
  liveCtaLabel?: string;
  footerEyebrow?: string;
  footerTitle?: string;
  sourceNote?: string;
  metadataDescription?: string;
  introFigure?: Extract<CaseStudyContentBlock, { type: "figure" }>;
  summary: string;
  participation: string;
  technologies: string[];
  sections: CaseStudySection[];
}

export type Project = StandardProject | CaseStudyProject;

export const projects: Project[] = [
  {
    detailType: "case-study",
    id: "b2b-autopartes",
    category: "B2B Commerce Platform • Cliente real",
    title: "Plataforma B2B H&A",
    image: "/imagen-HYA.png",
    imageMobile: "/imagen-HYA-mobile.png",
    imageDesktop: "/imagen-HYA.png",
    cardStack: ".NET 10 · Angular 21 · PostgreSQL",
    linkToLive: "https://distribuidorahya.com/",
    liveCtaLabel: "Visitar sistema",
    footerEyebrow: "Sistema en producción",
    footerTitle: "Distribuidora H&A",
    sourceNote:
      "Código fuente privado por tratarse de una solución comercial para un cliente real.",
    metadataDescription:
      "Plataforma B2B desarrollada para una distribuidora mayorista de autopartes, con cuentas corrientes, crédito, proveedores, inventario, automatización y despliegue continuo.",
    summary:
      "Plataforma B2B desarrollada para digitalizar la operación comercial de una distribuidora mayorista de autopartes. Construida sobre nuestra base modular de comercio electrónico, reutiliza capacidades comunes e incorpora cuentas corrientes, crédito, vencimientos, proveedores, equivalencias de productos, reposición de stock y herramientas operativas específicas del negocio.",
    participation:
      "Participé junto a mi socio en el relevamiento, la arquitectura, el desarrollo backend y frontend, el modelado financiero, las pruebas, la infraestructura y la puesta en producción. Actualmente continuamos con el mantenimiento evolutivo, correctivo y de seguridad del sistema.",
    technologies: [
      ".NET 10",
      "C#",
      "Angular 21",
      "PostgreSQL",
      "Entity Framework Core",
      "xUnit",
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Cloudflare",
      "Sentry",
    ],
    sections: [
      {
        id: "contexto-del-cliente",
        number: 2,
        title: "El contexto del cliente",
        blocks: [
          {
            type: "paragraph",
            text: "El proyecto nació para una distribuidora mayorista de autopartes que necesitaba centralizar su catálogo, clientes, condiciones comerciales, inventario y operación administrativa en una única plataforma.",
          },
          {
            type: "paragraph",
            text: "La solución debía atender dos experiencias diferentes: un catálogo público para presentar la oferta comercial y un entorno autenticado donde cada cliente pudiera operar según sus condiciones, mientras el personal administraba productos, ventas, cuentas y proveedores.",
          },
          {
            type: "paragraph",
            text: "Los requerimientos se validaron mediante demostraciones frecuentes con el cliente. Esto permitió convertir procesos reales del negocio en reglas de dominio y ajustar el producto antes de cada entrega.",
          },
        ],
      },
      {
        id: "de-plataforma-a-solucion-b2b",
        number: 3,
        title: "De plataforma reutilizable a solución B2B",
        blocks: [
          {
            type: "paragraph",
            text: "El sistema se construyó a partir de la arquitectura de ECommerce Modular. En lugar de comenzar nuevamente desde cero, conservamos los dominios comunes, adaptamos los flujos comerciales y desarrollamos las capacidades exclusivas del negocio mayorista.",
          },
          {
            type: "table",
            columns: ["Decisión", "Capacidades", "Resultado"],
            rows: [
              [
                "Reutilizado",
                "Identidad, roles, catálogo, inventario, pedidos y procesos en segundo plano",
                "Una base probada para concentrar el esfuerzo en las reglas diferenciales",
              ],
              [
                "Adaptado",
                "Clientes, ventas, administración y experiencia frontend",
                "Flujos alineados con una operación mayorista y sus distintos usuarios",
              ],
              [
                "Incorporado",
                "Proveedores, cuentas corrientes, crédito, vencimientos, equivalencias e importaciones",
                "Cobertura de procesos específicos que la plataforma original no necesitaba",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "El proyecto validó la modularidad con evidencia concreta: permitió reutilizar capacidades técnicas sin imponer al cliente un producto genérico ni mezclar sus reglas particulares con la base común.",
          },
        ],
      },
      {
        id: "dominio-financiero-b2b",
        number: 4,
        title: "Dominio financiero B2B",
        blocks: [
          {
            type: "paragraph",
            text: "El núcleo diferencial del sistema es la gestión de cuentas corrientes. Cada operación puede generar movimientos, saldos y cuentas por cobrar con sus propios vencimientos y condiciones de pago.",
          },
          {
            type: "list",
            items: [
              "Límites de crédito, saldo utilizado y crédito disponible por cliente.",
              "Cuentas por cobrar abiertas, vencidas o canceladas y seguimiento de vencimientos.",
              "Registro de pagos y distribución de importes entre múltiples obligaciones.",
              "Notas de crédito, ajustes y excepciones de condiciones de pago.",
              "Historial de movimientos para reconstruir la situación comercial de cada cuenta.",
              "Reglas financieras implementadas en el dominio y no únicamente en la interfaz.",
            ],
          },
          {
            type: "paragraph",
            text: "El siguiente flujo representa de forma simplificada cómo una operación comercial impacta sobre la cuenta corriente del cliente, desde la validación de sus condiciones hasta la aplicación de pagos y actualización del crédito disponible.",
          },
          {
            type: "figure",
            src: "/H&A B2B — Diagramas para Portfolio - ciclo comercial.svg",
            alt: "Diagrama del ciclo comercial y financiero de una operación B2B, desde la validación del cliente hasta la aplicación del pago y la actualización del crédito disponible",
            caption:
              "Flujo conceptual de una operación B2B y su impacto financiero.",
          },
          {
            type: "paragraph",
            text: "Este modelado permite que los saldos y estados se deriven de operaciones trazables, evitando depender de valores aislados o cálculos exclusivos del frontend.",
          },
        ],
      },
      {
        id: "catalogo-proveedores-inventario",
        number: 5,
        title: "Catálogo, proveedores e inventario",
        blocks: [
          {
            type: "paragraph",
            text: "El catálogo fue extendido para representar la realidad de una distribuidora: productos relacionados con proveedores, referencias equivalentes y disponibilidad que debe mantenerse actualizada para clientes y administradores.",
          },
          {
            type: "list",
            items: [
              "Administración de proveedores y sus relaciones con productos y categorías.",
              "Importación masiva de productos desde archivos XLSX, XLS y CSV.",
              "Agrupación de equivalencias para ofrecer alternativas compatibles.",
              "Reposición y control de stock con detección de existencias bajas.",
              "Ofertas de proveedores y datos de referencia para la toma de decisiones.",
              "Auditoría de movimientos para conservar la trazabilidad del inventario.",
            ],
          },
        ],
      },
      {
        id: "usuarios-permisos-experiencias",
        number: 6,
        title: "Usuarios, permisos y experiencias",
        blocks: [
          {
            type: "paragraph",
            text: "La aplicación distingue visitantes, clientes comerciales y personal administrativo. Cada perfil encuentra una experiencia diferente y solamente puede acceder a las operaciones correspondientes a su responsabilidad.",
          },
          {
            type: "paragraph",
            text: "El catálogo público permite explorar la oferta, mientras el entorno autenticado incorpora pedidos, cuenta, condiciones y seguimiento comercial. El panel administrativo concentra clientes, ventas, inventario, proveedores, finanzas, auditoría e indicadores de la operación.",
          },
          {
            type: "paragraph",
            text: "La autorización se aplica en el backend mediante roles y permisos; ocultar opciones en la interfaz es una mejora de experiencia, no el mecanismo principal de seguridad.",
          },
        ],
      },
      {
        id: "arquitectura-modular-aplicada",
        number: 7,
        title: "Arquitectura modular aplicada",
        blocks: [
          {
            type: "paragraph",
            text: "El backend conserva una organización por dominios funcionales: Identity, Customer, Catalog, Shopping, Sales, Finance, Suppliers, Invoicing y Staff. Cada módulo reúne su modelo, reglas y operaciones, utilizando componentes compartidos solamente cuando existe una responsabilidad transversal real.",
          },
          {
            type: "paragraph",
            text: "Esta separación fue especialmente importante en Finance y Suppliers, incorporados para H&A sin obligar a reestructurar la identidad, el catálogo o las ventas. El resultado mantiene una única unidad de despliegue con límites internos explícitos.",
          },
          {
            type: "paragraph",
            text: "Esta organización permite separar identidad, operación comercial, abastecimiento y finanzas sin convertir cada dominio en un servicio distribuido independiente.",
          },
          {
            type: "figure",
            src: "/H&A B2B — Diagramas para Portfolio - arquitectura funcional.svg",
            alt: "Diagrama de la arquitectura funcional de la plataforma B2B con sus dominios de identidad, operación comercial, abastecimiento y finanzas",
            caption:
              "Organización conceptual de los principales dominios del sistema B2B.",
          },
          {
            type: "paragraph",
            text: "La arquitectura técnica de la plataforma base se desarrolla con mayor profundidad en el caso de estudio ECommerce Modular; este proyecto muestra su aplicación frente a necesidades comerciales reales.",
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
            text: "Las tareas que no deben depender de una solicitud interactiva se ejecutan mediante procesos en segundo plano. Entre ellas se encuentran el control de vencimientos financieros, la detección de stock bajo, determinadas notificaciones y el procesamiento de contenido multimedia.",
          },
          {
            type: "paragraph",
            text: "Esto permite responder al usuario sin bloquear la operación, aislar tareas costosas y aplicar reintentos o controles específicos cuando una integración externa no está disponible.",
          },
        ],
      },
      {
        id: "calidad-y-validacion",
        number: 9,
        title: "Calidad y validación automatizada",
        blocks: [
          {
            type: "paragraph",
            text: "A diferencia de la primera versión de la plataforma base, los pipelines de H&A incorporan validaciones de calidad antes del despliegue. La API ejecuta suites de pruebas de los principales módulos, compila los servicios y audita dependencias vulnerables.",
          },
          {
            type: "paragraph",
            text: "El frontend ejecuta lint, pruebas y una compilación de producción. Solamente después de superar estas etapas se construyen las imágenes versionadas que pueden avanzar hacia el entorno productivo.",
          },
          {
            type: "list",
            items: [
              "Pruebas automatizadas para Catalog, Customer, Finance, Sales, Staff y Suppliers.",
              "Compilación independiente de la API y del worker de contenido multimedia.",
              "Lint, pruebas y build de producción para la aplicación Angular.",
              "Auditoría de dependencias como control previo a la publicación.",
            ],
          },
        ],
      },
      {
        id: "infraestructura-y-despliegue",
        number: 10,
        title: "Infraestructura y despliegue",
        blocks: [
          {
            type: "paragraph",
            text: "La solución se ejecuta mediante servicios contenerizados para PostgreSQL, migraciones, API, worker, aplicación web con renderizado del lado del servidor y proxy inverso. Los servicios internos se comunican mediante redes privadas y no se exponen directamente a Internet.",
          },
          {
            type: "paragraph",
            text: "En producción, cada responsabilidad se ejecuta como un servicio contenerizado, manteniendo aislados los componentes internos y exponiendo un único punto de entrada controlado.",
          },
          {
            type: "figure",
            src: "/H&A B2B — Diagramas para Portfolio - arquitectura de ejecucion.svg",
            alt: "Diagrama de la arquitectura de ejecución en producción con servicios contenerizados, redes privadas, almacenamiento externo y un único punto de entrada",
            caption:
              "Arquitectura pública simplificada del entorno de producción.",
          },
          {
            type: "paragraph",
            text: "La base de datos utiliza responsabilidades separadas para la aplicación y las migraciones. Los cambios de esquema se aplican mediante un proceso efímero y controlado antes de actualizar los servicios que dependen de ellos.",
          },
          {
            type: "paragraph",
            text: "Nginx centraliza el ingreso de tráfico y el acceso externo se canaliza mediante Cloudflare. El contenido multimedia y las copias de seguridad utilizan almacenamiento externo, evitando depender exclusivamente del disco del servidor.",
          },
        ],
      },
      {
        id: "cicd-trazabilidad-recuperacion",
        number: 11,
        title: "CI/CD, trazabilidad y recuperación",
        blocks: [
          {
            type: "paragraph",
            text: "La API, el frontend y la infraestructura cuentan con flujos de validación y despliegue independientes. Cada imagen queda asociada al commit que la generó, permitiendo identificar con precisión qué versión está ejecutándose.",
          },
          {
            type: "paragraph",
            text: "Cada componente atraviesa validaciones acordes con su responsabilidad antes de generar una versión desplegable. La publicación conserva la relación entre código, imagen y servicio actualizado.",
          },
          {
            type: "figure",
            src: "/H&A B2B — Diagramas para Portfolio - cicd operacion.svg",
            alt: "Diagrama del flujo de CI/CD con validación, publicación, despliegue y verificación operativa de los componentes del sistema",
            caption:
              "Flujo simplificado de validación, publicación, despliegue y verificación operativa.",
          },
          {
            type: "paragraph",
            text: "Antes de una actualización se realizan controles y respaldos, se ejecutan las migraciones necesarias y se verifican los servicios mediante health checks. El versionado de imágenes permite recuperar una versión conocida sin recompilar el sistema dentro del servidor.",
          },
          {
            type: "paragraph",
            text: "Este proceso reduce tareas manuales, limita el consumo de recursos del VPS y hace que las publicaciones sean repetibles y auditables.",
          },
        ],
      },
      {
        id: "seguridad-y-operacion",
        number: 12,
        title: "Seguridad y operación",
        blocks: [
          {
            type: "list",
            items: [
              "Autenticación y autorización por roles y permisos en las operaciones protegidas.",
              "Servicios internos sin publicación directa de puertos y base de datos aislada.",
              "Secretos y configuración sensible proporcionados fuera del código y de las imágenes.",
              "Contenedores con privilegios limitados, límites de recursos y controles de salud.",
              "Auditorías periódicas de dependencias y seguimiento de errores mediante Sentry.",
              "Copias de seguridad, verificación de disponibilidad y tareas operativas programadas.",
            ],
          },
          {
            type: "paragraph",
            text: "La información pública se mantiene deliberadamente conceptual: este caso demuestra las decisiones adoptadas sin revelar direcciones, puertos, rutas, credenciales ni configuraciones operativas del cliente.",
          },
        ],
      },
      {
        id: "mantenimiento-continuo",
        number: 13,
        title: "Mantenimiento continuo",
        blocks: [
          {
            type: "paragraph",
            text: "La puesta en producción no marcó el final del proyecto. Continuamos acompañando el sistema mediante corrección de errores, actualización de dependencias, revisión de vulnerabilidades, monitoreo de incidentes y evolución de funcionalidades según las necesidades del cliente.",
          },
          {
            type: "paragraph",
            text: "Esta etapa transforma el proyecto en una responsabilidad operativa sostenida: no solamente desarrollamos funcionalidades, también preservamos la estabilidad, seguridad y capacidad de evolución del producto publicado.",
          },
        ],
      },
      {
        id: "resultado",
        number: 14,
        title: "Resultado",
        blocks: [
          {
            type: "paragraph",
            text: "El resultado es una plataforma B2B funcional y disponible en producción, que reúne la experiencia pública, el espacio de clientes y la administración interna en una solución adaptada a una distribuidora real.",
          },
          {
            type: "paragraph",
            text: "El proyecto comprobó que la base modular podía reducir trabajo repetido sin limitar la personalización. También convirtió una decisión arquitectónica en un resultado comercial: reutilizar lo común y concentrar el desarrollo en las reglas que diferencian al negocio.",
          },
        ],
      },
      {
        id: "aprendizajes",
        number: 15,
        title: "Aprendizajes",
        blocks: [
          {
            type: "paragraph",
            text: "El mayor aprendizaje fue traducir conceptos comerciales —crédito, deuda, vencimientos, pagos y ajustes— a un modelo consistente, trazable y comprensible tanto para el equipo técnico como para el cliente.",
          },
          {
            type: "paragraph",
            text: "También profundicé en la diferencia entre construir una demostración y operar un producto real: pruebas como condición de despliegue, migraciones compatibles, observabilidad, respaldos, recuperación y mantenimiento pasan a ser parte del diseño, no tareas posteriores.",
          },
          {
            type: "paragraph",
            text: "La experiencia reforzó mi interés por backend con .NET, arquitectura de software, DevOps y seguridad de aplicaciones, trabajando sobre problemas de negocio concretos y con responsabilidad más allá de la entrega inicial.",
          },
        ],
      },
    ],
  },
  {
    detailType: "case-study",
    id: "ecommerce-modular",
    category: "E-commerce Platform • Full Stack & DevOps",
    title: "ECommerce Modular",
    image: "/portada-ecommerce.webp",
    imageMobile: "/portada-ecommerce-mobile.png",
    imageDesktop: "/portada-ecommerce.webp",
    cardStack: ".NET 10 · Angular · PostgreSQL",
    linkToLive: "https://core-gamer.com/",
    liveCtaLabel: "Ver demo en vivo",
    footerEyebrow: "Demo comercial",
    footerTitle: "Core Gamer",
    sourceNote: "Código fuente privado por tratarse de una solución comercial.",
    metadataDescription:
      "Plataforma e-commerce modular desarrollada con .NET 10, Angular y PostgreSQL, con arquitectura modular, Docker, CI/CD y despliegue automatizado.",
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
    introFigure: {
      type: "figure",
      src: "/portada-ecommerce.webp",
      alt: "Tienda Core Gamer presentada en una notebook y un teléfono para mostrar su diseño responsive",
      caption:
        "Plataforma modular de comercio electrónico diseñada para ofrecer una experiencia de compra responsive y centralizar la operación comercial desde un panel administrativo.",
    },
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
      {
        id: "producto-en-funcionamiento",
        number: 15,
        title: "El producto en funcionamiento",
        blocks: [
          {
            type: "paragraph",
            text: "La arquitectura se materializa en dos experiencias conectadas: una tienda responsive orientada al cliente y un panel administrativo para gestionar la operación comercial. Las siguientes pantallas utilizan información demostrativa y permiten observar algunas de las capacidades construidas sobre la plataforma.",
          },
          {
            type: "subheading",
            text: "Experiencia de compra de principio a fin",
          },
          {
            type: "figure",
            src: "/ecommerce-1.webp",
            alt: "Secuencia mobile de la tienda Core Gamer desde la exploración de productos hasta la confirmación del pedido",
          },
          {
            type: "paragraph",
            text: "La aplicación ofrece una experiencia adaptada a dispositivos móviles que acompaña al usuario durante las principales etapas de compra: exploración del catálogo, consulta detallada de productos, administración del carrito y confirmación del pedido.",
          },
          {
            type: "paragraph",
            text: "La interfaz reorganiza el contenido y los controles según el tamaño de pantalla, conservando la información necesaria para completar cada operación sin depender de una versión exclusiva para escritorio.",
          },
          {
            type: "subheading",
            text: "Visibilidad sobre la operación comercial",
          },
          {
            type: "figure",
            src: "/ecommerce-2.webp",
            alt: "Panel administrativo de Core Gamer con indicadores y gráficos de la operación comercial",
          },
          {
            type: "paragraph",
            text: "El panel administrativo centraliza indicadores relacionados con ventas, reembolsos, contracargos, ingresos, márgenes y devoluciones. La información se presenta mediante métricas resumidas y gráficos temporales para facilitar el seguimiento de la actividad comercial.",
          },
          {
            type: "paragraph",
            text: "El acceso a estas herramientas se encuentra separado de la experiencia del cliente y sujeto a las responsabilidades asignadas al personal administrativo.",
          },
          {
            type: "subheading",
            text: "Trazabilidad de movimientos de inventario",
          },
          {
            type: "figure",
            src: "/ecommerce-3.webp",
            alt: "Historial administrativo de stock con rentabilidad y bitácora de movimientos de inventario",
          },
          {
            type: "paragraph",
            text: "El sistema conserva el historial de movimientos de cada producto, relacionando variaciones de stock con su origen y registrando los valores anteriores y posteriores a cada operación.",
          },
          {
            type: "paragraph",
            text: "Esta trazabilidad permite diferenciar ventas, asignaciones y cargas iniciales, además de consultar información histórica de costos, ingresos y rentabilidad asociada al inventario. Los registros administrativos también permiten identificar cuándo ocurrió cada cambio y qué actor o proceso lo produjo.",
          },
          {
            type: "paragraph",
            text: "Estas interfaces representan solamente la capa visible de una plataforma que integra autenticación y autorización, catálogo, inventario, ventas, pagos, facturación, procesamiento en segundo plano y despliegue automatizado.",
          },
          {
            type: "paragraph",
            text: "Las capturas anteriores presentan una selección de sus principales funcionalidades, pero el sistema incluye otros flujos y herramientas que pueden explorarse directamente en su entorno de demostración. La aplicación se encuentra desplegada y disponible para probar la experiencia completa, tanto desde la perspectiva del cliente como desde el panel administrativo.",
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
