import { Link } from "react-router-dom";

function BackToProjectsLink() {
  return (
    <Link
      to="/#projects"
      className="mb-10 inline-flex w-fit items-center gap-1 text-base text-[#636363] transition-colors duration-200 hover:text-[#a8a8a8] lg:text-lg"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 512 512"
        fill="currentColor"
        className="h-4 w-4 shrink-0"
      >
        <path d="M217.9 256 345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
      </svg>
      Volver a proyectos
    </Link>
  );
}

export default BackToProjectsLink;
