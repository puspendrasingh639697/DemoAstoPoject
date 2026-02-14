import React, { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";

const ButtonAnimation = forwardRef(
  ({ children, className = "", onClick }, ref) => {
    const buttonRef = useRef(null);
    const flairRef = useRef(null);
    let xSet, ySet;

    useEffect(() => {
      const button = buttonRef.current;
      const flair = flairRef.current;

      const getXY = (e) => {
        const { left, top, width, height } = button.getBoundingClientRect();

        const x = gsap.utils.pipe(
          gsap.utils.mapRange(0, width, 0, 100),
          gsap.utils.clamp(0, 100)
        )(e.clientX - left);

        const y = gsap.utils.pipe(
          gsap.utils.mapRange(0, height, 0, 100),
          gsap.utils.clamp(0, 100)
        )(e.clientY - top);

        return { x, y };
      };

      xSet = gsap.quickSetter(flairRef.current, "xPercent");
      ySet = gsap.quickSetter(flairRef.current, "yPercent");

      const handleMouseEnter = (e) => {
        const { x, y } = getXY(e);
        xSet(x);
        ySet(y);

        gsap.to(flairRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e) => {
        const { x, y } = getXY(e);
        gsap.killTweensOf(flairRef.current);

        gsap.to(flairRef.current, {
          xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
          yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseMove = (e) => {
        const { x, y } = getXY(e);

        gsap.to(flairRef.current, {
          xPercent: x,
          yPercent: y,
          duration: 0.4,
          ease: "power2",
        });
      };

      const btn = buttonRef.current;
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);
      btn.addEventListener("mousemove", handleMouseMove);

      return () => {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
        btn.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer ${className}`}
      >
        <span
          ref={flairRef}
          className="absolute inset-0 scale-0 origin-top-left pointer-events-none z-0"
        >
          <span className="block w-[170%] aspect-square bg-yellow-400 rounded-full absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
        </span>

        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

export default ButtonAnimation;
