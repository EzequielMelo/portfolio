import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import CaseStudyProjectDetail from "./CaseStudyProjectDetail";
import StandardProjectDetail from "./StandardProjectDetail";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((candidate) => candidate.id === id);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] px-4 pt-20 text-center text-white">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#666]">
            Error 404
          </p>
          <h1 className="mt-3 text-3xl font-bold">Proyecto no encontrado</h1>
        </div>
      </main>
    );
  }

  if (project.detailType === "case-study") {
    return <CaseStudyProjectDetail project={project} />;
  }

  return <StandardProjectDetail project={project} />;
}

export default ProjectDetail;
