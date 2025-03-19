import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const smoothMove = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.current.x - prev.x) * 0.15, // Ajusta la suavidad aquí
        y: prev.y + (targetPosition.current.y - prev.y) * 0.15,
      }));
      animationFrame.current = requestAnimationFrame(smoothMove);
    };

    animationFrame.current = requestAnimationFrame(smoothMove);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] mix-blend-difference">
      <div
        className="w-0 h-0 md:w-14 md:h-14 bg-white rounded-full absolute transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
