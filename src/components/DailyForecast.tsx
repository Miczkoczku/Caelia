import { ArrowUp, ArrowDown } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";

type DailyForecastProps = {
  days: Date[];
  maxTemp: Float32Array;
  minTemp: Float32Array;
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
  weatherCode: Float32Array;
};

export function DailyForecast({
  days,
  maxTemp,
  minTemp,
  selectedDayIndex,
  onSelectDay,
  weatherCode,
}: DailyForecastProps) {
  return (
    <div className="flex flex-col">
      {days.map((date, index) => {
        const selected = selectedDayIndex === index;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelectDay(index)}
            aria-pressed={selected}
            className={`relative flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-3 text-left transition-colors duration-200 ${
              selected
                ? "bg-white/10"
                : "hover:bg-white/5"
            }`}
          >
            {/* aktywny dzien */}
            <span
              className={`absolute inset-y-2 left-0 w-[3px] rounded-full bg-blue-400 transition-opacity duration-200 ${
                selected ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* dzien tyg i data */}
            <div className="flex min-w-0 items-center gap-2">
            <span className="w-[66px] shrink-0 text-sm font-medium capitalize">
                {index === 0
                ? "Dzisiaj"
                : date.toLocaleDateString("pl-PL", {
                    weekday: "short",
                    timeZone: "UTC",
                    })}
            </span>

            <span className="whitespace-nowrap text-xs text-white/50">
                {date.toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "short",
                timeZone: "UTC",
                })}
            </span>
            </div>
            {/* Dzień i data */}
            <div className="flex min-w-0 items-center gap-2">
            {/* dzień + data */}
            </div>

            {/* Ikona pogody */}
            <div className="flex shrink-0 items-center justify-center">
            <WeatherIcon code={weatherCode[index]} size={21} />
            </div>

            {/* Temperatury */}
            <div className="flex shrink-0 items-center gap-3">
            {/* strzałki i temperatury */}
            </div>

            {/* temperatury */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex items-center gap-1">
                <ArrowUp
                  size={15}
                  className="text-orange-400"
                />
                <span className="text-sm font-medium tabular-nums">
                  {Math.round(maxTemp[index])}°
                </span>
              </div>

              <div className="flex items-center gap-1">
                <ArrowDown
                  size={15}
                  className="text-blue-300"
                />
                <span className="text-sm tabular-nums text-white/60">
                  {Math.round(minTemp[index])}°
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
