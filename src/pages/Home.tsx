import Spline from "@splinetool/react-spline";
import CustomCursor from "../components/ui/cursor";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { BackgroundBeams } from "../components/ui/background-breams";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <>
      <div className="relative w-full h-screen bg-black">
        <CustomCursor />
        {/* Spline 3D Background */}
        <Spline
          className="absolute inset-0 spline pointer-events-none"
          scene="https://prod.spline.design/rgdhqiAjcPRlgu3n/scene.splinecode"
        />

        {/* Texto encima */}
        <div className="absolute top-9/20 left-7 md:top-2/10 md:left-6/10 select-none max-[460px]:left-1/2 max-[460px]:-translate-x-1/2 max-[460px]:w-full">
          <div className="flex flex-col items-center space-y-4 m-0 p-0">
            <h1 className="font-bold text-white text-[90px] sm:text-[120px] md:text-[170px] m-0 p-0">
              Hola!
            </h1>
            <p className="text-gray-400 font-bold text-3xl md:text-4xl">
              Me llamo Ezequiel Melo
            </p>
            <p className="font-cormorant text-white font-extrabold text-xl md:text-3xl italic">
              Full Stack Developer ・ Backend Preference
            </p>
            <div className="flex flex-row space-x-5 mt-2">
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
                <HoverBorderGradient
                  containerClassName=""
                  as="button"
                  className="bg-white text-black font-medium px-4 py-4 cursor-pointer"
                >
                  Descargar CV
                </HoverBorderGradient>
              </div>
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
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
              </div>
              <div className="text-center transform transition-transform duration-200 ease-in-out hover:scale-110">
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
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 md:bottom-5 md:right-2 bg-black w-full h-14 md:w-50 md:h-10"></div>
      </div>

      <div className="text-white bg-gradient-to-b from-black via-[#111111] to-[#111111] flex flex-col items-center h-full">
        <div className="w-[90%] md:w-[75%] lg:mt-10 select-none">
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
        </div>

        <div className="grid-cols-1 md:grid-cols-2 grid gap-4 mt-10 w-[90%] lg:w-[75%]">
          {/* Card 1 */}
          <div className="flex flex-col text-left">
            <motion.div
              className="relative w-full rounded-2xl h-[25rem] md:h-[30rem] overflow-hidden flex items-center justify-center mb-4 group"
              onMouseEnter={() => {
                setIsHovered(true);
                if (videoRef.current) {
                  videoRef.current.currentTime = 0; // Reinicia el video
                  videoRef.current.play();
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0; // Asegura que vuelva al inicio
                }
              }}
            >
              {/* Imagen de fondo */}
              <motion.img
                src="ecommerce.webp"
                alt="ecommerce"
                className="object-cover w-full h-full transition-all duration-300"
                initial={{ filter: "blur(0px)" }}
                animate={
                  isHovered ? { filter: "blur(10px)" } : { filter: "blur(0px)" }
                }
              />

              {/* Video con hover */}
              <motion.video
                ref={videoRef} // Asigna la referencia
                src="anime-project.webm"
                playsInline
                loop
                muted
                className="absolute w-[80%] h-auto rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={
                  isHovered
                    ? { opacity: 1, y: 0, x: "-50%" }
                    : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ left: "50%" }} // Centrar en X
              />
            </motion.div>

            {/* Texto */}
            <motion.span className="text-white text-xl flex flex-col gap-2 mt-3 ml-2">
              <span className="text-[#636363] text-base uppercase font-semibold">
                Entertainment • Web Design
              </span>

              <div className="flex items-center gap-2 proyectTitle relative">
                {/* Flecha animada, ahora con posicionamiento relativo para moverla junto con el texto */}
                <motion.svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex items-center arrow absolute left-0"
                  initial={{ opacity: 0, x: -20 }} // Flecha oculta al borde de la tarjeta
                  animate={
                    isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  } // Animación de la flecha solo al hacer hover
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </motion.svg>

                {/* Texto que se moverá hacia la derecha cuando la flecha aparece */}
                <motion.span
                  className="ml-6" // Espacio inicial para el texto
                  initial={{ x: 0 }} // El texto comienza en su posición original
                  animate={{
                    x: isHovered ? 20 : 0, // Al hacer hover, el texto se mueve a la derecha
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  Anime Project
                </motion.span>
              </div>
            </motion.span>
            <BackgroundBeams />
          </div>
          {/* Card 1 final */}

          <div className="h-[30rem] w-full rounded-2xl bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
              <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Join the waitlist
              </h1>
              <p></p>
              <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Welcome to MailJet, the best transactional email service on the
                web. We provide reliable, scalable, and customizable email
                solutions for your business. Whether you&apos;re sending order
                confirmations, password reset emails, or promotional campaigns,
                MailJet has got you covered.
              </p>
              <input
                type="text"
                placeholder="hi@manuarora.in"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
              />
            </div>
          </div>

          <div className="h-[30rem] w-full rounded-2xl bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
              <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Join the waitlist
              </h1>
              <p></p>
              <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Welcome to MailJet, the best transactional email service on the
                web. We provide reliable, scalable, and customizable email
                solutions for your business. Whether you&apos;re sending order
                confirmations, password reset emails, or promotional campaigns,
                MailJet has got you covered.
              </p>
              <input
                type="text"
                placeholder="hi@manuarora.in"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
              />
            </div>
            <BackgroundBeams />
          </div>

          <div className="h-[30rem] w-full rounded-2xl bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
              <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Join the waitlist
              </h1>
              <p></p>
              <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Welcome to MailJet, the best transactional email service on the
                web. We provide reliable, scalable, and customizable email
                solutions for your business. Whether you&apos;re sending order
                confirmations, password reset emails, or promotional campaigns,
                MailJet has got you covered.
              </p>
              <input
                type="text"
                placeholder="hi@manuarora.in"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
              />
            </div>
            <BackgroundBeams />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
