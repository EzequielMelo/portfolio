import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import BackToProjectsLink from "../components/BackToProjectsLink";
import type {
  CaseStudyContentBlock,
  CaseStudyProject,
} from "../data/projects";

type FigureBlock = Extract<CaseStudyContentBlock, { type: "figure" }>;
const FIRST_SECTION_ID = "encabezado-del-proyecto";

interface CaseStudyProjectDetailProps {
  project: CaseStudyProject;
}

interface DiagramViewerProps {
  diagram: FigureBlock | null;
  onClose: () => void;
}

function DiagramViewer({ diagram, onClose }: DiagramViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  useEffect(() => {
    if (!diagram) return;

    setZoom(1);
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
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
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
  }, [diagram, onClose]);

  if (!diagram) return null;

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !viewportRef.current) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewportRef.current.scrollLeft,
      scrollTop: viewportRef.current.scrollTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const dragDiagram = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active || !viewportRef.current) return;

    event.preventDefault();
    viewportRef.current.scrollLeft =
      dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
    viewportRef.current.scrollTop =
      dragState.current.scrollTop - (event.clientY - dragState.current.startY);
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada: ${diagram.alt}`}
      tabIndex={-1}
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 p-3 backdrop-blur-md md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#161616] px-3 py-2">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-white md:text-base">
          {diagram.caption ?? diagram.alt}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((current) => Math.max(1, current - 0.25))}
            disabled={zoom === 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Alejar imagen"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="h-10 rounded-full border border-white/15 px-3 text-sm text-white transition-colors hover:bg-white/10"
            aria-label="Restablecer zoom de la imagen"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={() => setZoom((current) => Math.min(3, current + 0.25))}
            disabled={zoom === 3}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Acercar imagen"
          >
            +
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-black transition-transform hover:scale-105"
            aria-label="Cerrar imagen ampliada"
          >
            ×
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`diagram-pan-container min-h-0 flex-1 overflow-auto rounded-2xl bg-[#ececec] select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        style={{ touchAction: "none" }}
        onPointerDown={startDragging}
        onPointerMove={dragDiagram}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <img
          src={diagram.src}
          alt={diagram.alt}
          draggable={false}
          className="mx-auto h-auto max-w-none origin-top transition-[width] duration-200"
          style={{ width: `${zoom * 100}%` }}
        />
      </div>
    </div>
  );
}

function CaseStudyProjectDetail({ project }: CaseStudyProjectDetailProps) {
  const [activeSection, setActiveSection] = useState(FIRST_SECTION_ID);
  const [selectedDiagram, setSelectedDiagram] =
    useState<FigureBlock | null>(null);
  const lastDiagramTrigger = useRef<HTMLButtonElement | null>(null);
  const mobileIndexRef = useRef<HTMLDetailsElement>(null);

  const indexItems = useMemo(
    () => [
      { id: FIRST_SECTION_ID, number: 1, title: "Encabezado del proyecto" },
      ...project.sections.map(({ id, number, title }) => ({
        id,
        number,
        title,
      })),
    ],
    [project.sections],
  );

  useEffect(() => {
    const sectionElements = indexItems
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          )[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      {
        rootMargin: "-18% 0px -66% 0px",
        threshold: 0,
      },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [indexItems]);

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    window.requestAnimationFrame(() => {
      section.scrollIntoView({ block: "start" });
      setActiveSection(sectionId);
    });
  }, []);

  const handleIndexClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${sectionId}`);

    if (mobileIndexRef.current) mobileIndexRef.current.open = false;
  };

  const closeDiagram = useCallback(() => {
    setSelectedDiagram(null);
    window.requestAnimationFrame(() => lastDiagramTrigger.current?.focus());
  }, []);

  const renderIndexLinks = () => (
    <ol className="space-y-1">
      {indexItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => handleIndexClick(event, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={`grid grid-cols-[2rem_1fr] gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${isActive
                ? "bg-white/10 text-white"
                : "text-[#777] hover:bg-white/5 hover:text-[#bdbdbd]"
                }`}
            >
              <span className="font-mono text-xs leading-5">
                {String(item.number).padStart(2, "0")}
              </span>
              <span className="leading-5">{item.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  const renderBlock = (block: CaseStudyContentBlock, index: number) => {
    if (block.type === "paragraph") {
      return (
        <p
          key={index}
          className="text-pretty text-base leading-8 text-[#929292] md:text-lg md:leading-9"
        >
          {block.text}
        </p>
      );
    }

    if (block.type === "subheading") {
      return (
        <h3
          key={index}
          className="pt-4 font-cormorant text-2xl font-bold italic text-white md:text-3xl"
        >
          {block.text}
        </h3>
      );
    }

    if (block.type === "figure") {
      return (
        <figure
          key={index}
          className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#171717] p-2 md:rounded-3xl md:p-3"
        >
          <button
            type="button"
            onClick={(event) => {
              lastDiagramTrigger.current = event.currentTarget;
              setSelectedDiagram(block);
            }}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#ececec] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:rounded-2xl"
            aria-label={`Ampliar: ${block.alt}`}
          >
            <img
              src={block.src}
              alt={block.alt}
              loading="lazy"
              decoding="async"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm md:hidden">
              Tocá para ampliar
            </span>
            <span className="absolute bottom-4 right-4 hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {block.caption && (
            <figcaption className="px-2 pb-1 pt-4 text-sm leading-6 text-[#777] md:px-3 md:text-base">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (block.type === "list") {
      return (
        <ul key={index} className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-[#a3a3a3] md:text-base"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div
        key={index}
        className="overflow-x-auto rounded-2xl border border-white/10"
      >
        <table className="min-w-[760px] w-full border-collapse text-left">
          <thead className="bg-white/[0.07] text-sm uppercase tracking-wider text-white">
            <tr>
              {block.columns.map((column) => (
                <th key={column} className="px-5 py-4 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr
                key={row[0]}
                className="border-t border-white/10 text-sm leading-6 text-[#929292] md:text-base"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cell}
                    className={`px-5 py-5 align-top ${cellIndex === 0 ? "font-semibold text-white" : ""
                      }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="bg-gradient-to-b from-black via-[#0d0d0d] to-[#111111] px-4 pb-20 pt-[7rem] md:px-8 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <section
          id={FIRST_SECTION_ID}
          className="scroll-mt-28 border-b border-white/10 pb-16 md:pb-24"
        >
          <BackToProjectsLink />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#777] md:text-base">
                {project.category}
              </p>
              <h1 className="max-w-5xl text-balance text-5xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-[7rem]">
                {project.title}
              </h1>
              <p className="mt-8 max-w-4xl text-pretty text-lg leading-8 text-[#929292] md:text-2xl md:leading-10">
                {project.summary}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#666]">
                Mi participación
              </p>
              <p className="mt-4 text-base leading-7 text-[#b0b0b0]">
                {project.participation}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-[#aaa]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            {project.linkToLive && (
              <a
                href={project.linkToLive}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                Ver demo en vivo
              </a>
            )}
            <p className="text-sm text-[#666]">
              Código fuente privado por tratarse de una solución comercial.
            </p>
          </div>

          {project.introFigure && (
            <div className="mt-14 md:mt-20">
              {renderBlock(project.introFigure, -1)}
            </div>
          )}
        </section>

        <details
          ref={mobileIndexRef}
          className="sticky top-20 z-30 my-8 rounded-2xl border border-white/10 bg-[#111]/95 p-4 shadow-2xl backdrop-blur-md lg:hidden"
        >
          <summary className="cursor-pointer list-none text-sm font-semibold text-white">
            <span className="flex items-center justify-between gap-4">
              Índice del caso de estudio
              <span aria-hidden="true" className="text-[#777]">
                {String(
                  indexItems.find((item) => item.id === activeSection)?.number ??
                  1,
                ).padStart(2, "0")}
                /{indexItems.length}
              </span>
            </span>
          </summary>
          <nav aria-label="Secciones del caso de estudio" className="mt-4">
            {renderIndexLinks()}
          </nav>
        </details>

        <div className="grid gap-14 pt-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20 lg:pt-20 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-28">
          <aside className="hidden lg:block">
            <nav
              aria-label="Secciones del caso de estudio"
              className="sticky top-28"
            >
              <p className="mb-5 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#555]">
                Contenido
              </p>
              {renderIndexLinks()}
            </nav>
          </aside>

          <article className="min-w-0">
            {project.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-white/10 py-14 first:pt-0 last:border-b-0 md:py-20"
              >
                <div className="mb-8 md:mb-10">
                  <h2 className="max-w-4xl text-balance text-3xl font-bold leading-tight text-white md:text-5xl">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="mt-3 font-cormorant text-2xl font-bold italic text-[#a7a7a7] md:text-3xl">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  {section.blocks.map(renderBlock)}
                </div>
              </section>
            ))}

            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center md:p-8">
              <div>
                <p className="text-sm text-[#666]">Demo comercial</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  Core Gamer
                </p>
              </div>
              <a
                href={project.linkToLive}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                Visitar proyecto
              </a>
            </div>
          </article>
        </div>
      </div>

      <DiagramViewer diagram={selectedDiagram} onClose={closeDiagram} />
    </main>
  );
}

export default CaseStudyProjectDetail;
