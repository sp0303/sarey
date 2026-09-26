import React from 'react';

/**
 * Decorative hero illustration: an animated "agent constellation" — a central
 * orchestrator node linked to specialised agent nodes, with data-flow beams
 * travelling outward along each link, pulsing nodes and a slowly rotating orbit.
 * Purely presentational; opaque parts use theme tokens, translucent accents use
 * explicit rgba so it renders correctly in BOTH light and dark. Marked
 * aria-hidden. All motion is gated by motion-safe (respects reduced motion).
 */
const CENTER = { x: 280, y: 180 };
const R = 132;
const NODE_ANGLES = [0, 60, 120, 180, 240, 300];
const ACCENT_SOFT = 'rgba(99, 102, 241, 0.10)';
const ACCENT_LINE = 'rgba(99, 102, 241, 0.35)';

const nodes = NODE_ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CENTER.x + R * Math.cos(rad),
    y: CENTER.y + R * Math.sin(rad),
  };
});

export const HeroGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 560 360"
      aria-hidden="true"
      className="w-full h-auto max-w-2xl mx-auto text-accent"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* soft glow behind the core */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="150"
        style={{ fill: ACCENT_SOFT }}
        className="motion-safe:animate-[pulse_5s_ease-in-out_infinite]"
      />

      {/* rotating orbit rings */}
      <g
        className="motion-safe:animate-[orbit-spin_60s_linear_infinite]"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' } as React.CSSProperties}
      >
        <circle cx={CENTER.x} cy={CENTER.y} r={R} className="fill-none stroke-border" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx={CENTER.x} cy={CENTER.y} r={R - 56} className="fill-none stroke-border" strokeWidth="1.5" strokeDasharray="4 8" />
      </g>

      {/* connection lines from core to each agent node */}
      {nodes.map((n, i) => (
        <line
          key={`l-${i}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={n.x}
          y2={n.y}
          style={{ stroke: ACCENT_LINE }}
          strokeWidth="1.5"
        />
      ))}

      {/* data-flow beams travelling outward along each link */}
      {nodes.map((n, i) => (
        <circle
          key={`b-${i}`}
          cx={CENTER.x}
          cy={CENTER.y}
          r="3.5"
          className="fill-accent motion-safe:animate-[beam-flow_2.8s_ease-in-out_infinite]"
          style={{
            ['--tx' as string]: `${n.x - CENTER.x}px`,
            ['--ty' as string]: `${n.y - CENTER.y}px`,
            animationDelay: `${i * 0.32}s`,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}

      {/* agent nodes */}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r="20" className="fill-bg stroke-accent" strokeWidth="2" />
          <circle
            cx={n.x}
            cy={n.y}
            r="7"
            className="fill-accent motion-safe:animate-[pulse_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        </g>
      ))}

      {/* small satellite dots (vendors) */}
      <circle cx={CENTER.x + 96} cy={CENTER.y - 108} r="4" className="fill-accent" />
      <circle cx={CENTER.x - 118} cy={CENTER.y + 70} r="4" className="fill-accent" />
      <circle cx={CENTER.x + 120} cy={CENTER.y + 96} r="4" className="fill-accent" />

      {/* central orchestrator core */}
      <circle cx={CENTER.x} cy={CENTER.y} r="40" style={{ fill: ACCENT_SOFT }} />
      <circle cx={CENTER.x} cy={CENTER.y} r="40" className="fill-none stroke-accent" strokeWidth="2.5" />
      <path
        d="M280 158 q6 16 22 22 q-16 6 -22 22 q-6 -16 -22 -22 q16 -6 22 -22 z"
        className="fill-accent motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
      />
    </svg>
  );
};
