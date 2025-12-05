import { useEffect, useRef, useState } from "react";

// WandCursor renders a soft glowing light that follows the cursor.
// It can be toggled on/off via a custom window event 'wand-light-toggle'.
export const WandCursor = () => {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(() => {
    return localStorage.getItem("wand-light") === "on";
  });

  useEffect(() => {
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setEnabled(!!detail?.on);
    };
    window.addEventListener("wand-light-toggle", onToggle as EventListener);
    return () => window.removeEventListener("wand-light-toggle", onToggle as EventListener);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${x - 60}px, ${y - 60}px)`;
      }
      // Update CSS variables on documentElement for torch mask positioning
      const root = document.documentElement;
      root.style.setProperty("--torch-x", `${x}px`);
      root.style.setProperty("--torch-y", `${y}px`);
    };
    if (enabled) {
      document.addEventListener("mousemove", onMove);
    }
    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Dark overlay acting as torch effect: transparent near cursor, dark elsewhere */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9997,
          // Slightly lighter global dim to allow more content visibility
          background: "rgba(0,0,0,0.5)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Small luminous orb near the cursor */}
      <div
        ref={orbRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 16px hsl(43 74% 49% / 0.7), 0 0 32px hsl(43 74% 49% / 0.4)",
          background: "radial-gradient(circle, hsl(43 87% 94%) 0%, hsl(43 74% 49% / 0.8) 40%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Larger soft glow trail */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 120,
          height: 120,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          background:
            "radial-gradient(circle, hsl(43 74% 49% / 0.18) 0%, hsl(43 74% 49% / 0.08) 35%, transparent 70%)",
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
      />
      {/* Torch mask to reveal content under cursor more strongly */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9996,
          // Larger, brighter torch radius with softer falloff
          background:
            "radial-gradient(200px circle at var(--torch-x, 50%) var(--torch-y, 50%), rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 35%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)",
          transition: "background-position 30ms ease-out",
        }}
      />
    </>
  );
};
