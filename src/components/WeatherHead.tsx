import { Clock3, MapPin } from "lucide-react";
import { useLocalTime } from "../hooks/useLocalTime";

type WeatherHeadProps = {
  locationName: string;
  temperature: number;
  timezone: string;
};

export function WeatherHead({
  locationName,
  temperature,
  timezone,
}: WeatherHeadProps) {
  const now = useLocalTime();

  const time = new Intl.DateTimeFormat("pl-PL", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  const date = new Intl.DateTimeFormat("pl-PL", {
    timeZone: timezone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <div className="flex flex-col items-center gap-3 pt-6 pb-14 text-center">
      {/* lokalizacja */}
      <div className="flex items-center gap-3 text-white/80">
        <MapPin className="h-6 w-6 text-blue-300" />

        <h2 className="text-2xl font-medium tracking-wide md:text-3xl">
          {locationName}
        </h2>
      </div>

      {/* temp */}
      <div className="text-7xl font-light leading-none tracking-tighter md:text-9xl">
        {Math.round(temperature)}°
      </div>

      {/* godzina i data */}
      <div className="flex items-center gap-3 text-sm text-white/60 md:text-base">
        <Clock3 className="h-4 w-4 text-blue-300" />

        <span className="font-medium text-white/80">
          {time}
        </span>

        <span className="text-white/30">•</span>

        <span className="capitalize">{date}</span>
      </div>
    </div>
  );
}