import React from 'react';

export const HeroArt: React.FC = () => {
  // 5 nodes evenly spaced
  const nodes = [
    { name: 'Architect', angle: 0, d: 'M3 21l9-18 9 18H3z M10 21v-4a2 2 0 114 0v4 M12 7v.01' },
    { name: 'Designer', angle: 72, d: 'M12 22a10 10 0 1110-10 1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 01-2 2h-3z M7 14h.01 M7 10h.01 M11 7h.01 M15 10h.01' },
    { name: 'Developer', angle: 144, d: 'M16 18l6-6-6-6 M8 6l-6 6 6 6' },
    { name: 'QA', angle: 216, d: 'M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H6v-4L3 12l3-3V6h4L12 2z M9 12l2 2 4-4' },
    { name: 'Security', angle: 288, d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4 M12 16h.01' },
  ];

  // 24 rays
  const rays = Array.from({ length: 24 }).map((_, i) => i * 15);

  const cx = 200;
  const cy = 200;
  const rRing = 150;

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      aria-hidden="true"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="halftone" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" className="text-accent fill-current" />
        </pattern>
        
        {/* Halftone mask */}
        <radialGradient id="halftone-mask-grad" cx="50%" cy="42%" r="50%">
          <stop offset="25%" stopColor="white" stopOpacity="1" />
          <stop offset="72%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="halftone-mask">
          <rect width="400" height="400" fill="url(#halftone-mask-grad)" />
        </mask>

        {/* Crest Gradient (matches headline) */}
        <radialGradient id="crest-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#B91C1C" />
        </radialGradient>

        <linearGradient id="beam-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="400">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0" />
          <stop offset="50%" stopColor="#EA580C" stopOpacity="1" />
          <stop offset="100%" stopColor="#B91C1C" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Speed lines */}
      <g id="rays" className="text-fg opacity-[0.35] dark:opacity-50">
        {rays.map((angle) => (
          <line
            key={angle}
            x1={cx + Math.cos((angle * Math.PI) / 180) * 70}
            y1={cy + Math.sin((angle * Math.PI) / 180) * 70}
            x2={cx + Math.cos((angle * Math.PI) / 180) * 195}
            y2={cy + Math.sin((angle * Math.PI) / 180) * 195}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ))}
      </g>

      {/* 2. Halftone field */}
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="url(#halftone)"
        mask="url(#halftone-mask)"
        className="opacity-60"
      />

      {/* Orbit group */}
      <g className="motion-safe:animate-[orbit-spin_60s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
        {/* 3. Orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={rRing}
          fill="none"
          strokeDasharray="2 10"
          strokeWidth="2"
          className="text-accent stroke-current opacity-60"
        />

        {/* 4. Energy Beams & 6. Nodes */}
        {nodes.map((node, i) => {
          // Angle offset by -90 so 0 is top-center
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const nx = cx + Math.cos(rad) * rRing;
          const ny = cy + Math.sin(rad) * rRing;
          
          return (
            <g key={node.name}>
              {/* Beam */}
              <line
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke="url(#beam-grad)"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                className="motion-safe:animate-[beam-dash_1.6s_linear_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              
              {/* Node (counter-rotate) */}
              <g
                className="motion-safe:animate-[orbit-spin_60s_linear_infinite_reverse]"
                style={{ transformOrigin: `${nx}px ${ny}px` }}
              >
                <circle
                  cx={nx}
                  cy={ny}
                  r="22"
                  className="fill-surface text-fg stroke-current"
                  strokeWidth="2.5"
                />
                <path
                  d={node.d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform={`translate(${nx - 12}, ${ny - 12})`}
                  className="text-fg"
                />
              </g>
            </g>
          );
        })}
      </g>

      {/* 5. Central Crest */}
      <g 
        className="origin-center motion-safe:animate-[crest-pulse_3.5s_ease-in-out_infinite]"
        style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'fill-box' }}
      >
        {/* Glow halo */}
        <circle cx={cx} cy={cy} r="64" className="text-accent fill-current opacity-40 blur-xl" />
        
        {/* Starburst polygon */}
        <polygon
          points={Array.from({ length: 24 }).map((_, i) => {
            const r = i % 2 === 0 ? 58 : 40;
            const a = (i * 15 * Math.PI) / 180;
            return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
          }).join(' ')}
          fill="url(#crest-grad)"
          stroke="currentColor"
          strokeWidth="3"
          className="text-fg"
        />
        
        {/* Spark glyph (chevron) */}
        <path
          d="M 190 185 L 210 195 L 190 205 M 200 185 L 220 195 L 200 205"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="translate-x-[-5px]"
        />
      </g>
    </svg>
  );
};
