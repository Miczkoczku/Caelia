
import { useQuery } from "@tanstack/react-query";
import { CitySearch } from "./CitySearch";
import { Account } from "./Account";
import { useScrolled } from "../hooks/useScrolled";
import { fetchWeatherData } from "../api/weatherApi";
import type { City } from "../api/geocodingApi";

type HeaderProps = {
  latitude: number;
  longitude: number;
  locationName: string;
  onSelectCity: (city: City) => void;
};

export function Header({
  latitude,
  longitude,
  locationName,
  onSelectCity,
}: HeaderProps) {
  const scrolled = useScrolled(120);

  const { data: weather } = useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => fetchWeatherData(latitude, longitude),
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-slate-900/85 backdrop-blur-xl"
          : "pointer-events-none bg-transparent"
      }`}
    >
      {/* lokalizacja */}
      <div
        className={`absolute left-8 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          scrolled
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-4 opacity-0"
        }`}
      >
        <span className="text-lg font-medium text-white/80">
          {locationName}
        </span>
      </div>

      {/* temperatura */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          scrolled
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-75 opacity-0"
        }`}
      >
        <span className="text-4xl font-light">
          {weather
            ? `${Math.round(weather.current.temperature)}°`
            : "—"}
        </span>
      </div>

        <div
        className={`pointer-events-auto absolute top-4 z-20 ${
            scrolled
            ? "right-24"
            : "left-1/2 -translate-x-1/2"
        }`}
        >
        <div
            className={
            scrolled
                ? "animate-[searchEnter_300ms_ease-out]"
                : "animate-[searchDrop_350ms_ease-out]"
            }
        >
            <CitySearch
            onSelect={onSelectCity}
            expandDirection={scrolled ? "left" : "center"}
            />
        </div>
        </div>

      <div className="pointer-events-auto absolute right-8 top-4">
        <Account />
      </div>
    </header>
  );
}
