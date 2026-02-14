"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Flower } from "lucide-react"; // Lucide flower icon

// Configuration
const FLOWER_LIFESPAN = 1000;
const MAX_FLOWERS = 50;
const COLORS = ["#FFD700", "#FF69B4", "#9370DB", "#ADFF2F", "#87CEEB"];

// Flower particle
function FlowerParticle({ id, x, y, color, onAnimationEnd }) {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const age = now - startTimeRef.current;
      const progress = age / FLOWER_LIFESPAN;

      if (progress < 1) {
        setOpacity(1 - progress);
        setScale(1 - progress * 0.5);
        setTranslateY(-progress * 20);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onAnimationEnd(id);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [id, onAnimationEnd]);

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: x,
        top: y,
        opacity: opacity,
        transform: `translate(-50%, -50%) scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: "20px", color: color }}>🌸</div>
    </div>
  );
}

// Main flower cursor component
export default function FlowerCursor() {
  const [flowers, setFlowers] = useState([]);
  const nextId = useRef(0);

  const handleMouseMove = useCallback((e) => {
    setFlowers((prevFlowers) => {
      const newFlower = {
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
      return [
        ...prevFlowers.slice(Math.max(0, prevFlowers.length - MAX_FLOWERS + 1)),
        newFlower,
      ];
    });
  }, []);

  const handleAnimationEnd = useCallback((idToRemove) => {
    setFlowers((prev) => prev.filter((flower) => flower.id !== idToRemove));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {flowers.map((flower) => (
        <FlowerParticle
          key={flower.id}
          id={flower.id}
          x={flower.x}
          y={flower.y}
          color={flower.color}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </>
  );
}
