import type { ReactNode } from "react";
import BackToProjectsLink from "../components/BackToProjectsLink";
import ImageSlider from "../components/ui/ImageSlider";
import type { StandardProject } from "../data/projects";

interface StandardProjectDetailProps {
  project: StandardProject;
}

function DetailLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-base text-[#636363] lg:text-xl">
      <svg
        aria-hidden="true"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z" />
      </svg>
      {children}
    </p>
  );
}

function StandardProjectDetail({ project }: StandardProjectDetailProps) {
  return (
    <main className="select-none bg-gradient-to-b from-black via-[#111111] to-[#111111] px-4 pb-20 pt-[7rem] md:px-8 lg:px-16">
      <div className="m-auto max-w-[1500px]">
        <BackToProjectsLink />
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-bold text-white md:text-left lg:text-5xl">
            {project.title}
          </h1>
          <span className="text-center text-xl text-[#636363] md:text-left lg:text-2xl">
            {project.category}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 py-10 text-left md:grid-cols-2">
          <DetailLabel>Descripción</DetailLabel>
          <p className="text-base text-[#636363] lg:text-xl">
            {project.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:grid-cols-2">
          <DetailLabel>Aprendizajes o desafíos</DetailLabel>
          <p className="text-base text-[#636363] lg:text-xl">
            {project.learnings}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:grid-cols-2">
          <DetailLabel>Tecnologías</DetailLabel>
          <p className="text-base text-[#636363] lg:text-xl">
            {project.technologies}
          </p>
        </div>

        {project.linkToVideos && (
          <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:grid-cols-2">
            <DetailLabel>
              <a
                target="_blank"
                rel="noreferrer"
                href={project.linkToVideos}
                className="transition-colors hover:text-white"
              >
                Ver videos del proyecto
              </a>
            </DetailLabel>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:grid-cols-2">
          <DetailLabel>
            {project.linkToGithub ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={project.linkToGithub}
                className="transition-colors hover:text-white"
              >
                Ver código y más en GitHub
              </a>
            ) : (
              <span>Ver código en GitHub (repositorio privado)</span>
            )}
          </DetailLabel>
        </div>

        {project.linkToLive && (
          <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:grid-cols-2">
            <DetailLabel>
              <a
                target="_blank"
                rel="noreferrer"
                href={project.linkToLive}
                className="transition-colors hover:text-white"
              >
                Ver sitio web en vivo
              </a>
            </DetailLabel>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-10">
          <video
            src={project.video}
            playsInline
            loop
            muted
            autoPlay
            className="w-full rounded-3xl"
          />
          <ImageSlider
            images={project.images || [project.image]}
            projectTitle={project.title}
          />
        </div>
      </div>
    </main>
  );
}

export default StandardProjectDetail;
