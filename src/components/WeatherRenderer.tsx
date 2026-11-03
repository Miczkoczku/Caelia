import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../api/weatherApi";
import { HourlyChart } from "./HourlyChart";
import { DailyForecast } from "./DailyForecast";

type WeatherRendererProps = {
	latitude: number;
	longitude: number;
};

export function WeatherRenderer({ latitude, longitude }: WeatherRendererProps) {
	// ktory dzien jest wybrany
	const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

	// pobiera dane, w ktoryms pliku sa domyslnie ustawione na zakopane
	const { data, isLoading, isError } = useQuery({
		queryKey: ["weather", latitude, longitude],
		queryFn: () => fetchWeatherData(latitude, longitude),
	});

	if (isLoading) return <p>Ładowanie pogody...</p>;
	if (isError || !data) return <p>Error.</p>;

	return (
		<div>
			<h1 className="text-2xl font-bold">{latitude}, {longitude}</h1>
			<h2 className="text-xl">Teraz: {Math.round(data.current.temperature)}°C</h2>
			
			<hr />

			<h3 className="text-lg font-semibold">Prognoza na najbliższe dni:</h3>
			
			<DailyForecast
				days={data.daily.time}
				maxTemp={data.daily.maxTemp}
				minTemp={data.daily.minTemp}
				selectedDayIndex={selectedDayIndex}
				onSelectDay={setSelectedDayIndex}
			/>

			{selectedDayIndex !== null && (
				<div className="mt-5">
					<h4 className="text-lg font-semibold">
						Szczegóły godzinowe dla dnia:{" "}
						{data.daily.time[selectedDayIndex].toLocaleDateString("pl-PL")}
					</h4>
					<HourlyChart 
						time={data.hourly.time.slice(selectedDayIndex * 24, (selectedDayIndex + 1) * 24)} 
						temperature={data.hourly.temperature.slice(selectedDayIndex * 24, (selectedDayIndex + 1) * 24)} 
						precipitationProb={data.hourly.precipitationProb.slice(selectedDayIndex * 24, (selectedDayIndex + 1) * 24)} 
					/>
				</div>
			)}
		</div>
	);
}
