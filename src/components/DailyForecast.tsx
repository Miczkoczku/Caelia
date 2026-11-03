type DailyForecastProps = {
    days: Date[];
    maxTemp: Float32Array;
    minTemp: Float32Array;
    selectedDayIndex: number | null;
    onSelectDay: (index: number) => void;
};

export function DailyForecast({ days, maxTemp, minTemp, selectedDayIndex, onSelectDay }: DailyForecastProps) {
    
    
    return (
        <div className="flex gap-3 overflow-x-auto p-2">
            {days.map((date, index) => (
                <button
                key={index}
                type="button"
                onClick={() => onSelectDay(index)}
                className={`flex flex-col items-center gap-2 border-2 p-3 bg-white/20 cursor-pointer rounded-2xl backdrop-blur-md ${
                    selectedDayIndex === index
                    ? "border-red-500"
                    : "border-gray-300"
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