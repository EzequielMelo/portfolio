import type { ReactNode } from "react";
import { Link } from "react-router-dom";
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
    <main className="select-none bg-gradient-to-b from-black via-[#111111] to-[#111111] px-4 pt-[7rem] md:px-8 lg:px-16">
      <div className="m-auto max-w-[1500px]">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center gap-1 text-center text-base text-[#636363] transition-colors duration-200 hover:text-[#a8a8a8] md:ml-[2.5rem] md:text-left lg:ml-[4.75rem] lg:text-lg"
            >
              <svg
                aria-hidden="true"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
              </svg>
              Volver
            </Link>
          </div>
          <h1 className="text-center text-3xl font-bold text-white md:ml-[2.5rem] md:text-left lg:ml-[4.75rem] lg:text-5xl">
            {project.title}
          </h1>
          <span className="text-center text-xl text-[#636363] md:ml-[2.5rem] md:text-left lg:ml-[4.75rem] lg:text-2xl">
            {project.category}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 py-10 text-left md:ml-[2.5rem] md:grid-cols-2 lg:ml-[4.75rem]">
          <DetailLabel>Descripción</DetailLabel>
          <p className="text-base text-[#636363] lg:text-xl">
            {project.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:ml-[2.5rem] md:grid-cols-2 lg:ml-[4.75rem]">
          <DetailLabel>Aprendizajes o desafíos</DetailLabel>
          <p className="text-base text-[#636363] lg:text-xl">
            {project.learnings}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:ml-[2.5rem] md:grid-cols-2 lg:ml-[4.75rem]">
          <DetailLabel>Tecnologías</DetailLabel>
          <p className="text-base text-[#636363] lg:text-xl">
            {project.technologies}
          </p>
        </div>

        {project.linkToVideos && (
          <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:ml-[2.5rem] md:grid-cols-2 lg:ml-[4.75rem]">
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

        <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:ml-[2.5rem] md:grid-cols-2 lg:ml-[4.75rem]">
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
          <div className="grid grid-cols-1 gap-4 border-t-2 border-[#636363] py-10 text-left md:ml-[2.5rem] md:grid-cols-2 lg:ml-[4.75rem]">
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
