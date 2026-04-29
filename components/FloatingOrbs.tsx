"use client";

// CSS-animated gradient orbs — placed inside position:relative + overflow:hidden parent.
// Significantly higher opacity than subtle variants for visible background animation.

type OrbConfig = {
  style: React.CSSProperties;
};

type Variant = "pink" | "violet" | "warm" | "cool" | "hero" | "section";

const configs: Record<Variant, OrbConfig[]> = {
  hero: [
    {
      style: {
        position: "absolute",
        top: "-25%",
        right: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(236,72,153,0.50) 0%, rgba(236,72,153,0.18) 45%, transparent 70%)",
        filter: "blur(45px)",
        animation: "float1 14s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        bottom: "-20%",
        left: "-8%",
        width: "520px",
        height: "520px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 55% 55%, rgba(139,92,246,0.46) 0%, rgba(139,92,246,0.16) 45%, transparent 70%)",
        filter: "blur(50px)",
        animation: "float2 18s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        top: "30%",
        left: "25%",
        width: "320px",
        height: "320px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0.10) 55%, transparent 80%)",
        filter: "blur(40px)",
        animation: "float3 12s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
  ],

  pink: [
    {
      style: {
        position: "absolute",
        top: "-30%",
        right: "-8%",
        width: "520px",
        height: "520px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(236,72,153,0.45) 0%, rgba(249,168,212,0.18) 50%, transparent 75%)",
        filter: "blur(50px)",
        animation: "float1 16s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        bottom: "-20%",
        left: "5%",
        width: "420px",
        height: "420px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(244,63,94,0.38) 0%, rgba(244,63,94,0.12) 55%, transparent 80%)",
        filter: "blur(45px)",
        animation: "float3 14s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
  ],

  violet: [
    {
      style: {
        position: "absolute",
        top: "-22%",
        left: "-8%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 45% 45%, rgba(139,92,246,0.46) 0%, rgba(167,139,250,0.16) 50%, transparent 75%)",
        filter: "blur(55px)",
        animation: "float2 17s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        bottom: "-18%",
        right: "3%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.38) 0%, rgba(236,72,153,0.12) 55%, transparent 80%)",
        filter: "blur(45px)",
        animation: "float4 20s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
  ],

  warm: [
    {
      style: {
        position: "absolute",
        top: "-15%",
        right: "3%",
        width: "440px",
        height: "440px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.40) 0%, rgba(251,191,36,0.14) 55%, transparent 80%)",
        filter: "blur(55px)",
        animation: "float1 15s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        bottom: "-12%",
        left: "-4%",
        width: "380px",
        height: "380px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(236,72,153,0.10) 55%, transparent 80%)",
        filter: "blur(45px)",
        animation: "float3 13s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
  ],

  cool: [
    {
      style: {
        position: "absolute",
        top: "-18%",
        left: "3%",
        width: "470px",
        height: "470px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.42) 0%, rgba(139,92,246,0.14) 55%, transparent 80%)",
        filter: "blur(60px)",
        animation: "float2 16s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        bottom: "-18%",
        right: "-4%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0.10) 55%, transparent 80%)",
        filter: "blur(50px)",
        animation: "float4 19s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
  ],

  section: [
    {
      style: {
        position: "absolute",
        top: "-35%",
        right: "-5%",
        width: "420px",
        height: "420px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.30) 0%, rgba(236,72,153,0.08) 55%, transparent 80%)",
        filter: "blur(55px)",
        animation: "pulseBlob 8s ease-in-out infinite",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
    {
      style: {
        position: "absolute",
        bottom: "-35%",
        left: "-5%",
        width: "380px",
        height: "380px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(139,92,246,0.08) 55%, transparent 80%)",
        filter: "blur(50px)",
        animation: "pulseBlob 10s ease-in-out infinite 2s",
        pointerEvents: "none",
        willChange: "transform",
      },
    },
  ],
};

interface FloatingOrbsProps {
  variant?: Variant;
  className?: string;
}

export function FloatingOrbs({ variant = "section", className }: FloatingOrbsProps) {
  const orbs = configs[variant];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div key={i} style={orb.style} />
      ))}
    </div>
  );
}
