import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="text-white text-center mt-20">Proyecto no encontrado</div>
    );
  }

  return (
    <main className="pt-[7rem] bg-gradient-to-b from-black via-[#111111] to-[#111111] px-4 md:px-8 lg:px-16">
      <div className="max-w-[1500px] m-auto">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <p className="text-[#636363] text-base lg:text-lg flex gap-1 items-center transition-all duration-200 hover:text-[#a8a8a8] text-center md:text-left md:ml-[2.5rem] lg:ml-[4.75rem]">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
              </svg>
              <Link to="/">Volver</Link>
            </p>
          </div>
          <h2 className="font-bold text-3xl lg:text-5xl text-white text-center md:text-left md:ml-[2.5rem] lg:ml-[4.75rem]">
            {project.title}
          </h2>
          <span className="text-xl lg:text-2xl text-[#636363] text-center md:text-left md:ml-[2.5rem] lg:ml-[4.75rem]">
            {project.category}
          </span>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-left md:ml-[2.5rem] lg:ml-[4.75rem] py-10">
          <p className="text-[#636363] text-base lg:text-xl flex gap-4 items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path>
            </svg>
            Descripción
          </p>
          <p className="text-[#636363] text-base lg:text-xl">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left md:ml-[2.5rem] lg:ml-[4.75rem] border-t-2 border-[#636363] py-10">
          <p className="text-[#636363] text-base lg:text-xl flex gap-4 items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path>
            </svg>
            Tecnologías
          </p>
          <p className="text-[#636363] text-base lg:text-xl">
            {project.technologies}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left md:ml-[2.5rem] lg:ml-[4.75rem] border-t-2 border-[#636363] py-10">
          <p className="text-[#636363] text-base lg:text-xl flex gap-4 items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path>
            </svg>
            Ver Código en GitHub
          </p>
          <p className="text-[#636363] text-base lg:text-xl"></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left md:ml-[2.5rem] lg:ml-[4.75rem] border-t-2 border-[#636363] py-10">
          <p className="text-[#636363] text-base lg:text-xl flex gap-4 items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path>
            </svg>
            Ver sitio web en vivo
          </p>
          <p className="text-[#636363] text-base lg:text-xl"></p>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <video
            src={project.video}
            playsInline
            loop
            muted
            autoPlay
            className="w-full rounded-3xl"
          />
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={1500}
            height={1500}
            decoding="async"
            className="w-full rounded-3xl"
          />
        </div>
      </div>
    </main>
  );
}

export default ProjectDetail;
