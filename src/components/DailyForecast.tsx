type DailyForecastProps = {
    days: Date[];
    maxTemp: Float32Array;
    minTemp: Float32Array;
    selectedDayIndex: number;
    onSelectDay: (index: number) => void;
};

export function DailyForecast({ days, maxTemp, minTemp, selectedDayIndex, onSelectDay }: DailyForecastProps) {
    
    
    return (
        <div className="flex gap-2 overflow-x-auto p-2 md:flex-col md:overflow-visible">
            {days.map((date, index) => (
                <button
                key={index}
                type="button"
                onClick={() => onSelectDay(index)}
                className={`flex shrink-0 items-center justify-between gap-3 rounded-xl border p-3 transition-colors cursor-pointer ${
                selectedDayIndex === index
                    ? "border-blue-400 bg-blue-500/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
                >
                    <span>
                        {date.toLocaleDateString("pl-PL", { weekday: "long" })}
                    </span>
                    <div>Max: {Math.round(maxTemp[index])}°C</div>
                    <div>Min: {Math.round(minTemp[index])}°C</div>
                </button>
            ))}
        </div>
    );
}