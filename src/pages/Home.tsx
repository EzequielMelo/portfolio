import Spline from "@splinetool/react-spline";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { projects } from "../data/projects";
import ProjectCards from "../components/ProjectCards";
import { useEffect, useState } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para detectar si el ancho es menor a 768px (mobile)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verifica el tamaño al cargar
    handleResize();

    // Escucha los cambios de tamaño
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openCV = () => {
    // Abre una nueva ventana para mostrar el archivo PDF del CV
    const newWindow = window.open(
      "/CV-Ezequiel_Melo.pdf",
      "_blank",
      "width=800,height=600"
    );

    if (newWindow) {
      // Asegúrate de que la ventana se enfoque una vez abierta
      newWindow.focus();
    }
  };

  return (
    <>
      <div className="relative w-full h-screen bg-black">
        {/* Imagen para mobile */}
        <img
          src="backgroundRobot.jpg" // <- poné la ruta a tu imagen aquí
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
            <p className="font-cormorant text-white font-extrabold text-xl md:text-3xl italic">
              Full Stack Developer
            </p>
            <div className="flex flex-row space-x-5 mt-2">
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
                <HoverBorderGradient
                  containerClassName=""
                  as="button"
                  className="bg-white text-black font-medium px-4 py-4 cursor-pointer"
                  onClick={openCV}
                >
                  Descargar CV
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
          <section>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              Apasionado por el mundo de la programación y la tecnología, me
              dedico a desarrollar{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                aplicaciones web excepcionales
              </span>
              . Me gusta trabajar en equipo y aprender de los demás. Siempre
              estoy dispuesto a dar lo mejor de mí y a{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                afrontar nuevos desafíos
              </span>
              .
            </p>
          </section>
          <section className="mt-10 lg:mt-20">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              Como{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                fullstack developer
              </span>
              , mi stack principal de tecnologias incluye{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                React, Node.js, y Angular
              </span>
              . También tengo experiencia con tecnologías como{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                TypeScript, Firebase, C#, y SQL entre otras
              </span>{" "}
              .
            </p>
          </section>
          <section className="mt-10 lg:mt-18 mb-18">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#636363] text-pretty md:leading-[2rem] lg:leading-[3rem]">
              Actualmente curso la{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                tecnicatura en programación en la UTN
              </span>{" "}
              y me encuentro en la búsqueda de mi primer empleo en el mundo de
              la programación.{" "}
              <span className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic  font-bold text-white">
                Estos son algunos de los proyectos en los que he trabajado:
              </span>
            </p>
          </section>

          <h3
            id="projects"
            className="text-white w-[90%] lg:w-[75%] text-left font-bold text-6xl select-none"
          >
            Proyectos
          </h3>
          <div className="grid-cols-1 md:grid-cols-2 grid gap-4 gap-y-6 mt-10">
            {projects.map((project) => (
              <ProjectCards key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
