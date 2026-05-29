interface Props {
  size?: number
}

// Side-view stylized walker. Legs/arms swing via CSS walk-cycle classes;
// the whole figure bobs. Lime glow keeps it on-brand with the neon highway.
export default function Walker({ size = 96 }: Props) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Ground shadow */}
      <div
        className="absolute left-1/2 bottom-0 h-2 -translate-x-1/2 rounded-[50%] bg-black/50 blur-[3px]"
        style={{ width: size * 0.5 }}
      />

      <div className="walk-bob absolute inset-0">
        <svg
          viewBox="0 0 64 96"
          width={size}
          height={size}
          className="drop-shadow-[0_0_10px_rgba(184,239,67,0.55)]"
        >
          <defs>
            <linearGradient id="walker-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6ff7a" />
              <stop offset="100%" stopColor="#b8ef43" />
            </linearGradient>
          </defs>

          {/* Back arm */}
          <g
            className="walk-arm-b"
            style={{ transformOrigin: '32px 40px' }}
          >
            <rect
              x="29"
              y="40"
              width="6"
              height="22"
              rx="3"
              fill="#7ea52a"
            />
          </g>

          {/* Back leg */}
          <g
            className="walk-leg-b"
            style={{ transformOrigin: '32px 62px' }}
          >
            <rect
              x="28"
              y="62"
              width="8"
              height="26"
              rx="4"
              fill="#7ea52a"
            />
          </g>

          {/* Front leg */}
          <g
            className="walk-leg-a"
            style={{ transformOrigin: '32px 62px' }}
          >
            <rect
              x="28"
              y="62"
              width="8"
              height="26"
              rx="4"
              fill="url(#walker-body)"
            />
          </g>

          {/* Torso */}
          <rect
            x="24"
            y="34"
            width="16"
            height="32"
            rx="8"
            fill="url(#walker-body)"
          />

          {/* Head */}
          <circle cx="32" cy="20" r="11" fill="url(#walker-body)" />
          <circle
            cx="32"
            cy="20"
            r="11"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />

          {/* Front arm */}
          <g
            className="walk-arm-a"
            style={{ transformOrigin: '32px 40px' }}
          >
            <rect
              x="29"
              y="40"
              width="6"
              height="22"
              rx="3"
              fill="url(#walker-body)"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
