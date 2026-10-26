import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../api/weatherApi";

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
		<div style={{ padding: "20px", fontFamily: "sans-serif" }}>
			<h1>{latitude}, {longitude}, </h1>
			<h2>Teraz: {Math.round(data.current.temperature)}°C</h2>
			
			<hr />

			<h3>Prognoza na najbliższe dni:</h3>
			<div style={{ display: "flex", gap: "10px" }}>
				{data.daily.time.map((date, index) => (
					<button
						key={index}
						onClick={() => setSelectedDayIndex(index)}
						style={{
							padding: "10px",
							border:
								selectedDayIndex === index
									? "2px solid blue"
									: "1px solid #ccc",
							borderRadius: "8px",
							cursor: "pointer",
						}}
					>
						<div>
							<strong>
								{date.toLocaleDateString("pl-PL", { weekday: "short" })}
							</strong>
						</div>
						<div>Max: {Math.round(data.daily.maxTemp[index])}°C</div>
						<div>Min: {Math.round(data.daily.minTemp[index])}°C</div>
					</button>
				))}
			</div>

			{selectedDayIndex !== null && (
				<div style={{ marginTop: "20px" }}>
					<h4>
						Szczegóły godzinowe dla dnia:{" "}
						{data.daily.time[selectedDayIndex].toLocaleDateString("pl-PL")}
					</h4>

					<div style={{ display: "flex", overflowX: "auto", gap: "8px" }}>
						{data.hourly.time
							.slice(selectedDayIndex * 24, (selectedDayIndex + 1) * 24)
							.map((time, hIndex) => {
								const globalIndex = selectedDayIndex * 24 + hIndex;
								return (
									<div
										key={hIndex}
										style={{
											minWidth: "60px",
											textAlign: "center",
											border: "1px solid #eee",
											padding: "5px",
										}}
									>
										<div>{time.getHours()}:00</div>
										<div>
											<strong>
												{Math.round(data.hourly.temperature[globalIndex])}°C
											</strong>
										</div>
										<div style={{ fontSize: "12px", color: "#666" }}>
											{data.hourly.precipitationProb[globalIndex]}% deszczu
										</div>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
