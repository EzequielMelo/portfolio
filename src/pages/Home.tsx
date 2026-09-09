import Spline from "@splinetool/react-spline";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { projects } from "../data/projects";
import ProjectCards from "../components/ProjectCards";
import { useEffect, useRef, useState } from "react";

const CV_PATH = "/Ezequiel-Melo-CV-Backend-NET.pdf";
const CV_PREVIEW_PATH = "/Ezequiel-Melo-CV-Backend-NET-preview.png";

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CvPreviewModal({ isOpen, onClose }: CvPreviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-preview-title"
      tabIndex={-1}
      className="fixed inset-0 z-[250] flex flex-col bg-black/95 p-3 backdrop-blur-md md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#161616] px-3 py-2 md:px-4">
        <div className="min-w-0 basis-full flex-1 sm:basis-auto">
          <p
            id="cv-preview-title"
            className="truncate text-sm font-semibold text-white md:text-base"
          >
            CV · Ezequiel Melo
          </p>
          <p className="hidden text-xs text-[#777] sm:block">
            Backend Developer · .NET &amp; DevOps
          </p>
        </div>

        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
          <a
            href={CV_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-white/15 px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
          >
            <span className="sm:hidden">Abrir</span>
            <span className="hidden sm:inline">Abrir en otra pestaña</span>
          </a>
          <a
            href={CV_PATH}
            download="Ezequiel-Melo-CV-Backend-NET.pdf"
            className="inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Descargar PDF
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-2xl text-white transition-colors hover:bg-white/10"
            aria-label="Cerrar vista previa del CV"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#222] p-2 md:p-4">
        <img
          src={CV_PREVIEW_PATH}
          alt="Vista previa de la página completa del CV de Ezequiel Melo"
          loading="eager"
          decoding="async"
          draggable={false}
          className="h-full w-full object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeCvPreview = () => {
    setIsCvPreviewOpen(false);
    window.requestAnimationFrame(() => {
      document.getElementById("cv-preview-trigger")?.focus();
    });
  };

  return (
    <>
      <div className="relative w-full h-screen bg-black">
        {/* Imagen para mobile */}
        <img
          src="backgroundRobot.jpg"
          alt="Render"
          className="block md:hidden w-full h-full object-cover"
        />

        {/* Escena de Spline para desktop */}
        {!isMobile && (
          <Spline
            className="absolute inset-0 pointer-events-none"
            scene="https://prod.spline.design/rgdhqiAjcPRlgu3n/scene.splinecode"
          />
        )}

        {/* Texto encima */}
        <div className="absolute top-9/20 left-7 md:top-2/10 md:left-6/10 select-none max-[460px]:left-1/2 max-[460px]:-translate-x-1/2 max-[460px]:w-full z-20">
          <div className="flex flex-col items-center space-y-4 md:m-0 md:p-0 bg-gray-950/40 rounded-lg md:rounded-none md:bg-transparent shadow-lg p-4 m-2">
            <h1 className="font-bold text-white text-[90px] sm:text-[120px] md:text-[170px] m-0 p-0">
              Hola!
            </h1>
            <p className="text-gray-400 font-bold text-3xl md:text-4xl">
              Me llamo Ezequiel Melo
            </p>
            <p className="text-center font-cormorant text-white font-extrabold text-xl md:text-3xl italic">
              Backend Developer · .NET &amp; DevOps
            </p>
            <div className="flex flex-row space-x-5 mt-2">
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
                <HoverBorderGradient
                  id="cv-preview-trigger"
                  containerClassName=""
                  as="button"
                  className="bg-white text-black font-medium px-4 py-4 cursor-pointer"
                  onClick={() => setIsCvPreviewOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isCvPreviewOpen}
                >
                  Ver CV
                </HoverBorderGradient>
              </div>
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/melo-ezequiel/"
                >
                  <HoverBorderGradient
                    containerClassName=""
                    as="button"
                    className="bg-black text-white px-4 py-4 cursor-pointer"
                  >
                    <img
                      width="26"
                      height="26"
                      src="https://img.icons8.com/FFFFFF/ios/50/linkedin.png"
                      alt="linkedin"
                    />
                  </HoverBorderGradient>
                </a>
              </div>
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
                <a target="_blank" href="https://github.com/EzequielMelo">
                  <HoverBorderGradient
                    containerClassName=""
                    as="button"
                    className="bg-black text-white px-4 py-4 cursor-pointer"
                  >
                    <img
                      width="26"
                      height="26"
                      src="https://img.icons8.com/FFFFFF/external-those-icons-lineal-those-icons/24/external-GitHub-social-media-those-icons-lineal-those-icons-2.png"
                      alt="external-GitHub-social-media-those-icons-lineal-those-icons-2"
                    />
                  </HoverBorderGradient>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute md:bottom-5 md:right-2 md:bg-black md:w-50 md:h-10"></div>
      </div>

      <div className="bg-gradient-to-b from-black via-[#111111] to-[#111111] flex flex-col items-center h-full px-4 md:px-8 lg:px-16 pt-4">
        <div className="max-w-[1500px] m-auto select-none">
          <section className="bg-[url('/me.webp')] bg-[50%_40%] md:bg-[25%_28%] w-full h-[60vh] lg:h-[90vh] mt-10 bg-cover rounded-3xl border-2 border-[#272727]"></section>
          <section>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem] mt-8">
              Mi experiencia se encuentra principalmente en el{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                desarrollo backend con C# y .NET
              </span>
              . Me interesa diseñar{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                sistemas mantenibles
              </span>
              , comprender las decisiones arquitectónicas que los sostienen y
              acompañar el código hasta su{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                funcionamiento en producción
              </span>{" "}
              mediante bases de datos relacionales, contenedores y despliegues
              automatizados.
            </p>
          </section>
          <section className="mt-10 lg:mt-20">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                Cofundé SoftCore junto a otro desarrollador
              </span>
              , donde construimos una{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                plataforma modular de comercio electrónico
              </span>
              {" "}y comenzamos a utilizarla como base para soluciones
              comerciales personalizadas. Esta experiencia me permitió
              participar en{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                todo el ciclo de un producto
              </span>
              : análisis, arquitectura, desarrollo full stack, modelado de
              datos, integraciones, seguridad, infraestructura, despliegue y
              comunicación directa con clientes.
            </p>
          </section>
          <section className="mt-10 lg:mt-20">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              Mi experiencia con{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                Angular, React, Node.js y TypeScript
              </span>{" "}
              me permite comprender el producto de extremo a extremo, aunque
              actualmente estoy orientando mi crecimiento profesional hacia{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                backend con .NET, arquitectura de software, DevOps y seguridad
                de aplicaciones
              </span>
              .
            </p>
          </section>
          <section className="mt-10 lg:mt-20">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              Cursé la{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                Tecnicatura Universitaria en Programación en la UTN
              </span>{" "}
              y actualmente estoy completando sus instancias finales. Busco mi{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                primera oportunidad laboral formal como desarrollador backend
              </span>
              , donde pueda aportar la experiencia adquirida en proyectos
              reales y continuar profundizando mis conocimientos con criterio
              propio.
            </p>
          </section>

          <section
            aria-labelledby="experiencia-profesional"
            className="mt-24 border-t border-white/10 pt-16 lg:mt-32 lg:pt-24"
          >
            <header className="mb-10 max-w-5xl md:mb-14">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#666] md:text-sm">
                Trayectoria
              </p>
              <h2
                id="experiencia-profesional"
                className="text-balance text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl"
              >
                Experiencia profesional
              </h2>
            </header>

            <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:rounded-3xl md:p-9 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,1fr)] lg:gap-16">
                <header>
                  <h3 className="font-cormorant text-4xl font-bold italic text-white md:text-5xl">
                    SoftCore
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-6 text-[#b5b5b5] md:text-lg">
                    Cofundador y desarrollador de software
                  </p>
                  <p className="mt-3 font-mono text-xs leading-5 text-[#666] md:text-sm">
                    <time dateTime="2026">2026</time> — Actualidad
                  </p>
                </header>

                <div className="space-y-6 text-pretty text-base leading-8 text-[#8b8b8b] md:text-lg md:leading-9">
                  <p>
                    Emprendimiento de desarrollo de software que fundé junto a
                    otro desarrollador para construir soluciones web
                    personalizadas y productos tecnológicos reutilizables
                    orientados a negocios.
                  </p>
                  <p>
                    SoftCore formalizó una dinámica de trabajo que ya habíamos
                    comenzado como equipo en proyectos comerciales anteriores.
                    Dentro del emprendimiento participo en el análisis de
                    requerimientos, las decisiones de arquitectura, el
                    desarrollo backend y frontend, el modelado de datos, las
                    integraciones, la seguridad, la infraestructura y el
                    despliegue. También mantengo comunicación directa con los
                    clientes mediante reuniones, demostraciones frecuentes y
                    ciclos de corrección.
                  </p>
                </div>
              </div>
            </article>

            <div className="mt-16 md:mt-20">
              <h3 className="mb-3 text-2xl font-bold uppercase tracking-[-0.02em] text-white md:text-3xl">
                Proyectos y antecedentes del equipo
              </h3>
              <div className="divide-y divide-white/10 border-y border-white/10">
                <article className="grid gap-7 py-10 md:py-12 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,1fr)] lg:gap-16">
                  <header>
                    <h4 className="font-cormorant text-3xl font-bold italic text-white md:text-4xl">
                      Toque Gourmet
                    </h4>
                    <p className="mt-3 font-mono text-xs leading-5 text-[#666] md:text-sm">
                      <time dateTime="2025">2025</time> · Cliente real ·
                      Publicado
                    </p>
                  </header>
                  <div className="space-y-5 text-pretty text-base leading-8 text-[#858585] md:text-lg md:leading-9">
                    <p>
                      Sitio web desarrollado para un cliente del sector
                      gastronómico antes de la fundación formal de SoftCore,
                      pero realizado por el mismo equipo que posteriormente
                      creó el emprendimiento.
                    </p>
                    <p>
                      El trabajo incluyó relevamiento de necesidades,
                      adaptación a la identidad visual del negocio, diseño
                      responsive, implementación, configuración de dominio y
                      despliegue. Actualmente, el sitio reconoce a SoftCore en
                      su footer como el equipo responsable de su desarrollo y
                      forma parte del portfolio comercial del emprendimiento.
                    </p>
                  </div>
                </article>

                <article className="grid gap-7 py-10 md:py-12 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,1fr)] lg:gap-16">
                  <header>
                    <h4 className="font-cormorant text-3xl font-bold italic text-white md:text-4xl">
                      ECommerce Modular
                    </h4>
                    <p className="mt-3 font-mono text-xs leading-5 text-[#666] md:text-sm">
                      <time dateTime="2026">2026</time> — Actualidad · Producto
                      propio
                    </p>
                  </header>
                  <div className="space-y-5 text-pretty text-base leading-8 text-[#858585] md:text-lg md:leading-9">
                    <p>
                      Plataforma desarrollada con .NET 10, Angular y PostgreSQL
                      para funcionar como base reutilizable de soluciones
                      comerciales personalizadas. Incluye autenticación y
                      autorización, catálogo, inventario, ventas, pagos,
                      facturación, procesamiento en segundo plano e
                      infraestructura de despliegue automatizado con Docker y
                      GitHub Actions.
                    </p>
                    <p>
                      La plataforma también funciona como demostración comercial
                      y permitió validar la reutilización de capacidades comunes
                      en un segundo sistema construido para un cliente real.
                    </p>
                  </div>
                </article>

                <article className="grid gap-7 py-10 md:py-12 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,1fr)] lg:gap-16">
                  <header>
                    <h4 className="font-cormorant text-3xl font-bold italic text-white md:text-4xl">
                      Plataforma B2B para empresa mayorista de autopartes
                    </h4>
                    <p className="mt-3 font-mono text-xs leading-5 text-[#666] md:text-sm">
                      <time dateTime="2026">2026</time> — Actualidad · Cliente
                      real · En desarrollo
                    </p>
                  </header>
                  <div className="space-y-5 text-pretty text-base leading-8 text-[#858585] md:text-lg md:leading-9">
                    <p>
                      Sistema diseñado para digitalizar y centralizar los
                      procesos comerciales de un negocio mayorista. Parte de la
                      arquitectura y las capacidades del ECommerce Modular,
                      reutilizando autenticación, usuarios, productos,
                      inventario y procesos internos, e incorporando módulos
                      específicos como proveedores, rubros, cuentas comerciales
                      y gestión financiera.
                    </p>
                    <p>
                      El producto se desarrolla mediante conversaciones y
                      demostraciones periódicas con el cliente, lo que permite
                      validar los avances y adaptar las funcionalidades a sus
                      procesos reales.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="mb-18 mt-20 lg:mt-28">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              Los siguientes proyectos muestran cómo fui aplicando estos
              conocimientos: desde experiencias académicas y aplicaciones full
              stack hasta una{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                plataforma modular desplegada, reutilizada y validada en un
                contexto comercial real
              </span>
              .
            </p>
          </section>

          <h3
            id="projects"
            className="text-white w-[90%] lg:w-[75%] text-left font-bold text-6xl select-none"
          >
            Proyectos destacados
          </h3>
          <div className="grid-cols-1 md:grid-cols-2 grid gap-4 gap-y-6 mt-8">
            {projects.map((project) => (
              <ProjectCards key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>

      <CvPreviewModal
        isOpen={isCvPreviewOpen}
        onClose={closeCvPreview}
      />
    </>
  );
};

export default Home;
