import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useInView
} from 'framer-motion';

/**
 * Top hairline scroll progress bar with Swiss telemetry readout
 */
export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-[var(--signal)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

/**
 * Masked Swiss typographic reveal (vertical clip-mask slide-up)
 */
export function MaskReveal({ children, delay = 0, className = '' }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom pt-[0.22em] pb-[0.06em] -mt-[0.22em] -mb-[0.06em] ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%', opacity: 0.2 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Monospace glyph scramble-decode on mount or hover
 */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_+#';
export function ScrambleText({ text, triggerOnHover = true, className = '' }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);

  const runScramble = () => {
    let iteration = 0;
    cancelAnimationFrame(frameRef.current);

    const step = () => {
      const next = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iteration) return text[idx];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplay(next);
      iteration += 0.65;
      if (iteration <= text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <span
      onMouseEnter={triggerOnHover ? runScramble : undefined}
      className={className}
    >
      {display}
    </span>
  );
}

/**
 * Tactile Magnetic Button/Wrapper using Framer Motion spring physics
 */
export function MagneticButton({ children, className = '', strength = 0.22, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 20, mass: 0.4 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Bento Container with subtle cursor radial spotlight sheen
 */
export function SpotlightBentoCard({ children, className = '', accentGlow = false }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: -200, y: -200, active: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCoords((prev) => ({ ...prev, active: false }))}
      className="bento-card relative overflow-hidden group h-full"
    >
      {/* Pointer Radial Sheen */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: coords.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${coords.x}px ${coords.y}px, ${
            accentGlow ? 'rgba(255, 59, 0, 0.11)' : 'var(--spotlight)'
          }, transparent 70%)`
        }}
      />
      <div className={`relative z-10 h-full ${className}`}>{children}</div>
    </div>
  );
}

/**
 * Smoothly interpolated numerical counter (works on mount-in-view & live updates)
 */
export function AnimatedNumber({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const startVal = prevRef.current;
    const endVal = Number(value) || 0;
    const duration = 550;
    const startTime = performance.now();
    let raf;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * eased;
      setDisplay(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        prevRef.current = endVal;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('en-US');

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

