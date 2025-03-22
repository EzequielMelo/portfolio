import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectProps {
  id: string;
  image: string;
  video: string;
  title: string;
  category: string;
}

function ProjectCards({ id, image, video, title, category }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <Link to={`/projects/${id}`}>
      <div
        className="flex flex-col text-left group select-none cursor-pointer"
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
        {/* Contenedor de imagen/video */}
        <motion.div className="relative w-full rounded-2xl h-[25rem] md:h-[30rem] overflow-hidden flex items-center justify-center mb-4">
          {/* Imagen de fondo */}
          <motion.img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-all duration-300 group-hover:blur-lg"
            initial={{ filter: "blur(0px)" }}
            animate={{ filter: isHovered ? "blur(10px)" : "blur(0px)" }}
          />

          {/* Video con hover */}
          <motion.video
            ref={videoRef}
            src={video}
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
            style={{ left: "50%" }}
          />
        </motion.div>

        {/* Texto */}
        <motion.span className="text-white text-xl flex flex-col gap-2 mt-3 ml-2 ">
          <span className="text-[#636363] text-base uppercase font-semibold">
            {category}
          </span>

          <div className="flex items-center gap-2 proyectTitle relative">
            {/* Flecha animada */}
            <motion.svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center arrow absolute left-0"
              initial={{ opacity: 0, x: -20 }}
              animate={
                isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.44, ease: "easeOut" }}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </motion.svg>

            {/* Texto con movimiento al hacer hover */}
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 28 : 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {title}
            </motion.span>
          </div>
        </motion.span>
      </div>
    </Link>
  );
}

export default ProjectCards;
