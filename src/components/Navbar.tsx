import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../lib/Utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // Estado para controlar la visibilidad
  const [visible, setVisible] = useState(false);
  // Estado para saber si ya hemos scrolleado hacia abajo
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const handleProjectLinkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir que el enlace navegue de inmediato

    // Navegar a la página de inicio
    navigate("/");

    // Usar un pequeño delay para esperar la carga y luego hacer scroll
    setTimeout(() => {
      const projectSection = document.getElementById("projects");
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Pequeña espera para asegurar que la navegación esté lista
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      // Si el scroll está por debajo de un umbral, marcar como scrolleado
      if (scrollYProgress.get() < 0.05) {
        // Si estamos en el top, podemos ocultarlo si no hemos scrolleado antes
        if (!scrolled) {
          setVisible(false);
        }
      } else {
        if (direction < 0 && !scrolled) {
          // Si hemos scrolleado hacia abajo por primera vez
          setVisible(true);
          setScrolled(true); // Marca que ya hemos scrolleado
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-3 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-transparent backdrop-grayscale px-4 py-2.5 items-center justify-center space-x-4 z-50",
          className
        )}
      >
        {navItems.map((navItem) => (
          <Link
            key={navItem.name}
            to={navItem.link}
            className={cn(
              "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300 "
            )}
            onClick={
              navItem.name === "Proyectos" ? handleProjectLinkClick : undefined
            }
          >
            <span className="block text-md font-semibold">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
