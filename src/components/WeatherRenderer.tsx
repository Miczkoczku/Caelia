import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../api/weatherApi";
import { HourlyChart } from "./HourlyChart";
import { DailyForecast } from "./DailyForecast";
import { SunCycle } from "./SunCycle";
import { WindCompass } from "./WindCompass";
import { WeatherHead } from "./WeatherHead";

type WeatherRendererProps = {
	latitude: number;
	longitude: number;
	locationName: string;
};

export function WeatherRenderer({ latitude, longitude, locationName }: WeatherRendererProps) {
	// ktory dzien jest wybrany
	const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

	// pobiera dane, w ktoryms pliku sa domyslnie ustawione na zakopane
	const { data, isLoading, isError } = useQuery({
		queryKey: ["weather", latitude, longitude],
		queryFn: () => fetchWeatherData(latitude, longitude),
	});

	if (isLoading) return <p>Ładowanie pogody...</p>;
	if (isError || !data) return <p>Error.</p>;

	return (
		<div>
			
			<WeatherHead
				locationName={locationName}
				temperature={data.current.temperature}
				timezone={data.timezone}
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

				<section className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
					<h3 className="mb-3 text-lg font-semibold">
					Prognoza na 7 dni
					</h3>

					<DailyForecast
					days={data.daily.time}
					maxTemp={data.daily.maxTemp}
					minTemp={data.daily.minTemp}
					selectedDayIndex={selectedDayIndex}
					onSelectDay={setSelectedDayIndex}
					weatherCode={data.daily.weatherCode}
					/>
				</section>

				<section className="flex min-h-[420px] flex-col rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl md:col-span-2">
					<h3 className="mb-3 text-lg font-semibold">
					Prognoza godzinowa
					</h3>

					
					<div className="min-h-0 flex-1">
					<HourlyChart
						time={data.hourly.time.slice(
						selectedDayIndex * 24,
						(selectedDayIndex + 1) * 24
						)}
						temperature={data.hourly.temperature.slice(
						selectedDayIndex * 24,
						(selectedDayIndex + 1) * 24
						)}
						precipitationProb={data.hourly.precipitationProb.slice(
						selectedDayIndex * 24,
						(selectedDayIndex + 1) * 24
						)}
					/>
					</div>

				</section>
				
				
				<SunCycle
					key={`${latitude}-${longitude}`}
					sunrise={data.daily.sunrise[0]}
					sunset={data.daily.sunset[0]}
					nextSunrise={data.daily.sunrise[1]}
					currentTime={new Date()}
					timezone={data.timezone}
				/>
				
				<WindCompass
					speed={data.current.windSpeed}
					direction={data.current.windDirection}
				/>
			</div>
		</div>
	);
}
