"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import flowerimg from "../../assets/image/flower.png";

// Add more flower images if you have them
const FLOWER_IMAGES = [flowerimg];

const MAX_FLOWERS = 50;
const SPAWN_INTERVAL_MS = 100;
const FLOWER_MIN_SIZE = 20;
const FLOWER_MAX_SIZE = 40;
const FLOWER_MIN_SPEED = 0.5;
const FLOWER_MAX_SPEED = 2;
const FLOWER_MIN_ROTATION_SPEED = -0.05;
const FLOWER_MAX_ROTATION_SPEED = 0.05;

export default function FlowerDroppingEffect() {
  const [flowers, setFlowers] = useState([]);
  const [isActive, setIsActive] = useState(true); // Control generation
  const animationFrameId = useRef(null);
  const lastSpawnTime = useRef(0);

  // Create a new flower
  const generateFlower = useCallback(() => {
    const viewportWidth = window.innerWidth;
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * viewportWidth,
      y: -FLOWER_MAX_SIZE,
      size:
        FLOWER_MIN_SIZE + Math.random() * (FLOWER_MAX_SIZE - FLOWER_MIN_SIZE),
      speed:
        FLOWER_MIN_SPEED +
        Math.random() * (FLOWER_MAX_SPEED - FLOWER_MIN_SPEED),
      opacity: 1,
      rotation: Math.random() * 360,
      rotationSpeed:
        FLOWER_MIN_ROTATION_SPEED +
        Math.random() * (FLOWER_MAX_ROTATION_SPEED - FLOWER_MIN_ROTATION_SPEED),
      imageSrc: FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)],
    };
  }, []);

  // Animation loop
  const animateFlowers = useCallback(
    (time) => {
      setFlowers((prevFlowers) => {
        const vh = window.innerHeight;

        const updatedFlowers = prevFlowers
          .map((f) => ({
            ...f,
            y: f.y + f.speed,
            rotation: f.rotation + f.rotationSpeed,
            opacity:
              f.y < vh * 0.8
                ? 1
                : Math.max(0, 1 - (f.y - vh * 0.8) / (vh * 0.2)),
          }))
          .filter((f) => f.y < vh + FLOWER_MAX_SIZE); // remove when off screen

        // Spawn only if animation is active
        if (
          isActive &&
          time - lastSpawnTime.current > SPAWN_INTERVAL_MS &&
          updatedFlowers.length < MAX_FLOWERS
        ) {
          updatedFlowers.push(generateFlower());
          lastSpawnTime.current = time;
        }

        return updatedFlowers;
      });

      animationFrameId.current = requestAnimationFrame(animateFlowers);
    },
    [generateFlower, isActive]
  );

  useEffect(() => {
    // Start animation on mount
    setFlowers(Array.from({ length: 5 }).map(generateFlower));
    animationFrameId.current = requestAnimationFrame(animateFlowers);

    // Stop generation after 5 seconds
    const timeout = setTimeout(() => {
      setIsActive(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateFlowers, generateFlower]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]"
      aria-hidden="true"
    >
      {flowers.map((f) => (
        <img
          key={f.id}
          src={f.imageSrc}
          alt="flower petal"
          className="absolute will-change-transform transition-opacity duration-1000"
          style={{
            left: f.x,
            top: f.y,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            transform: `rotate(${f.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
