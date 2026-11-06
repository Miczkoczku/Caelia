
import { Wind } from "lucide-react";

type WindCompassProps = {
  speed: number;
  direction: number;
};

export function WindCompass({
  speed,
  direction,
}: WindCompassProps) {
  const directions = [
    "N", "NE", "E", "SE",
    "S", "SW", "W", "NW",
  ];

  const normalizedDirection =
    ((direction % 360) + 360) % 360;

  const directionIndex =
    Math.round(normalizedDirection / 45) % 8;

  const directionLabel = directions[directionIndex];

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">

      <div className="mb-4 flex items-center gap-2">
        <Wind size={20} className="text-blue-300" />
        <h3 className="text-lg font-semibold">
          Wiatr
        </h3>
      </div>

      <div className="mx-auto w-full max-w-[240px]">
        <svg
          viewBox="0 18 300 300"
          className="w-full"
          role="img"
          aria-label={`Wiatr ${speed} km/h, kierunek ${directionLabel}`}
        >
          {/* zewnetrzny pierscien */}
          <circle
            cx="150"
            cy="150"
            r="125"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* podzialka */}
          {Array.from({ length: 72 }, (_, i) => {
            const major = i % 9 === 0;
            const medium = i % 3 === 0;

            return (
              <line
                key={i}
                x1="150"
                y1="27"
                x2="150"
                y2={major ? "43" : medium ? "37" : "32"}
                stroke={major ? "#e2e8f0" : "#64748b"}
                strokeWidth={major ? 2.5 : 1}
                transform={`rotate(${i * 5} 150 150)`}
              />
            );
          })}

          {/* kierunki */}
          <text
            x="150" y="65"
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="16"
            fontWeight="600"
          >
            N
          </text>

          <text
            x="235" y="156"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="16"
          >
            E
          </text>

          <text
            x="150" y="244"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="16"
          >
            S
          </text>

          <text
            x="65" y="156"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="16"
          >
            W
          </text>

          
        {/* strzalka */}
        <g
        transform={`rotate(${normalizedDirection} 150 150)`}
        style={{
            transition: "transform 700ms ease-in-out",
        }}
        >
        <path
            d="M150 65 L163 92 Q150 83 137 92 Z"
            fill="#93c5fd"
            stroke="#bfdbfe"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{
            filter: "drop-shadow(0 0 6px rgba(147,197,253,0.5))",
            }}
        />
        </g>

        {/* kierunek */}
        <text
        x="150"
        y="140"
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="15"
        fontWeight="500"
        >
        {directionLabel} · {Math.round(normalizedDirection)}°
        </text>

        {/* predkosc */}
        <text
        x="150"
        y="178"
        textAnchor="middle"
        fill="white"
        fontSize="38"
        fontWeight="300"
        >
        {Math.round(speed)}
        </text>

        <text
        x="150"
        y="196"
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="12"
        >
        km/h
        </text>

        </svg>
      </div>
    </div>
  );
}
