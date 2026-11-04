import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProjectProps {
  id: string;
  image?: string;
  video?: string;
  title: string;
  category: string;
  cardStack?: string;
}

function ProjectCards({
  id,
  image,
  video,
  title,
  category,
  cardStack,
}: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(video);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    void videoRef.current.play().catch(() => undefined);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <Link to={`/projects/${id}`}>
      <div
        className="group flex cursor-pointer select-none flex-col text-left"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div className="relative mb-4 flex h-[25rem] w-full items-center justify-center overflow-hidden rounded-2xl border border-transparent md:h-[30rem]">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-all duration-300"
              initial={{ filter: "blur(0px)" }}
              animate={{
                filter: hasVideo && isHovered ? "blur(10px)" : "blur(0px)",
                scale: !hasVideo && isHovered ? 1.015 : 1,
              }}
            />
          ) : (
            <motion.div
              aria-label={`Portada temporal de ${title}`}
              role="img"
              className="relative flex h-full w-full flex-col justify-between overflow-hidden border border-white/10 bg-[#111] p-7 sm:p-9"
              animate={{ scale: isHovered ? 1.015 : 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#3275F8]/20 blur-[90px]"
              />
              <div className="relative flex items-center justify-between gap-4">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[#777] sm:text-xs">
                  {category.split("•")[0].trim()}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.8)]" />
              </div>
              <div className="relative">
                <span className="mb-4 block font-mono text-xs text-[#666]">
                  CASE STUDY
                </span>
                <span className="block max-w-xl text-5xl font-bold leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                  {title.split(" ").map((word, index) => (
                    <span key={`${word}-${index}`} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </div>
              <div className="relative flex items-end justify-between gap-6 border-t border-white/10 pt-5">
                <span className="font-mono text-xs leading-5 text-[#888] sm:text-sm">
                  {cardStack}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="h-10 w-10 shrink-0 text-white"
                  fill="none"
                >
                  <path
                    d="M10 38 38 10M18 10h20v20"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </motion.div>
          )}

          {video && (
            <motion.video
              ref={videoRef}
              src={video}
              playsInline
              loop
              muted
              className="absolute h-auto w-[80%] rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={
                isHovered
                  ? { opacity: 1, y: 0, x: "-50%" }
                  : { opacity: 0, y: 50, x: "-50%" }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ left: "50%" }}
            />
          )}
        </motion.div>

        <motion.span className="ml-2 mt-3 flex flex-col gap-2 text-xl text-white">
          <span className="text-base font-semibold uppercase text-[#636363]">
            {category}
          </span>

          <span className="relative flex items-center gap-2">
            <motion.svg
              aria-hidden="true"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              className="absolute left-0 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={
                isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.44, ease: "easeOut" }}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </motion.svg>

            <motion.span
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 28 : 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {title}
            </motion.span>
          </span>
        </motion.span>
      </div>
    </Link>
  );
}

export default ProjectCards;
