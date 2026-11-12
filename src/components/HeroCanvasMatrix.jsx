import React, { useEffect, useRef } from 'react';

/**
 * HiDPI Canvas Magnetic Vector & Ripple Field
 * Crisp Swiss micro-crosshair lattice that subtly aligns toward cursor velocity
 * and emits circular wave impulses on click. Zero WebGL bloat.
 */
export default function HeroCanvasMatrix({ theme = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx >= 0 && cx <= width && cy >= 0 && cy <= height) {
        ripples.push({ x: cx, y: cy, r: 0, alpha: 0.9 });
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onClick, { passive: true });

    const spacing = 36;
    const isDark = theme === 'dark';
    const baseStroke = isDark ? 'rgba(255,255,255,0.11)' : 'rgba(12,12,14,0.10)';
    const signalRgb = '255, 59, 0';

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Advance click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 8;
        ripples[i].alpha *= 0.94;
        if (ripples[i].alpha < 0.03) ripples.splice(i, 1);
      }

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          let influence = 0;
          let angle = 0;

          if (pointer.active && !prefersReduced) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const dist = Math.hypot(dx, dy);
            if (dist < 170) {
              influence = 1 - dist / 170;
              angle = Math.atan2(dy, dx);
            }
          }

          let rippleBoost = 0;
          for (let k = 0; k < ripples.length; k++) {
            const rp = ripples[k];
            const d = Math.hypot(rp.x - x, rp.y - y);
            const band = Math.abs(d - rp.r);
            if (band < 36) {
              rippleBoost = Math.max(rippleBoost, (1 - band / 36) * rp.alpha);
            }
          }

          const energy = Math.min(1, influence + rippleBoost);
          if (energy > 0.05) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            const len = 3 + energy * 6;
            ctx.strokeStyle = `rgba(${signalRgb}, ${0.18 + energy * 0.65})`;
            ctx.lineWidth = 1.2 + energy * 0.6;
            ctx.beginPath();
            ctx.moveTo(-len * 0.5, 0);
            ctx.lineTo(len * 0.5, 0);
            ctx.stroke();
            ctx.restore();
          } else {
            ctx.fillStyle = baseStroke;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onClick);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-85"
    />
  );
}

