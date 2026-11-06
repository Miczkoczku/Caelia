
import { useEffect, useState } from "react";
import { Sunrise, Sunset, Moon, Sun } from "lucide-react";

type SunCycleProps = {
  sunrise: Date;
  sunset: Date;
  nextSunrise: Date;
  currentTime: Date;
  timezone: string;
};

export function SunCycle({
  sunrise,
  sunset,
  nextSunrise,
  currentTime,
  timezone,
}: SunCycleProps) {
  const [now, setNow] = useState(currentTime);

  // aktualizacja pozycji co minutę
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const nowMs = now.getTime();
  const sunriseMs = sunrise.getTime();
  const sunsetMs = sunset.getTime();
  const nextSunriseMs = nextSunrise.getTime();

  const isDaytime =
    nowMs >= sunriseMs && nowMs < sunsetMs;

  const isBeforeSunrise = nowMs < sunriseMs;

  let progress: number;

  if (isDaytime) {
    progress =
      (nowMs - sunriseMs) /
      (sunsetMs - sunriseMs);
  } else if (isBeforeSunrise) {
    // noc przed dzisiejszym wschodem
    const previousSunset =
      sunsetMs - 24 * 60 * 60 * 1000;

    progress =
      (nowMs - previousSunset) /
      (sunriseMs - previousSunset);
  } else {
    // noc po dzisiejszym zachodzie
    progress =
      (nowMs - sunsetMs) /
      (nextSunriseMs - sunsetMs);
  }

  progress = Math.max(0, Math.min(1, progress));

  const angle = Math.PI * (1 - progress);
  const centerX = 150;
  const centerY = 145;
  const radius = 110;

  const markerX = centerX + radius * Math.cos(angle);
  const markerY = centerY - radius * Math.sin(angle);

  const color = isDaytime ? "#fbbf24" : "#93c5fd";

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    });

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        {isDaytime ? (
          <Sun size={20} className="text-amber-300" />
        ) : (
          <Moon size={20} className="text-blue-300" />
        )}

        <h3 className="text-lg font-semibold">
          {isDaytime ? "Dzień" : "Noc"}
        </h3>
      </div>

      <svg
        viewBox="0 0 300 170"
        className="w-full"
        role="img"
        aria-label={
          isDaytime
            ? "Postęp dnia na łuku"
            : "Postęp nocy na łuku"
        }
      >
        {/* horyzont */}
        <line
          x1="20"
          y1="145"
          x2="280"
          y2="145"
          stroke="#64748b"
          strokeWidth="1.5"
        />

        {/* trasa */}
        <path
          d="M 40 145 A 110 110 0 0 1 260 145"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="5 6"
        />

        {/* przebyta droga */}
        <path
          d={`M 40 145 A 110 110 0 0 1 ${markerX} ${markerY}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* slonce/ksiezyc */}
        <circle
          cx={markerX}
          cy={markerY}
          r="9"
          fill={color}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sunrise size={20} className="text-amber-300" />
          <div>
            <p className="text-xs text-white/50">
              Wschód
            </p>
            <p className="font-semibold">
              {formatTime(sunrise)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunset size={20} className="text-orange-300" />
          <div>
            <p className="text-xs text-white/50">
              Zachód
            </p>
            <p className="font-semibold">
              {formatTime(sunset)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
