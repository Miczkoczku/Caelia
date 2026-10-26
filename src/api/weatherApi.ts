import { fetchWeatherApi } from "openmeteo";

export async function fetchWeatherData(lat: number, lng: number) {
  const params = {
    latitude: lat,
    longitude: lng,
    current: ["temperature_2m", "weather_code", "wind_speed_10m"],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["temperature_2m", "weather_code", "precipitation_probability"],
    timezone: "auto",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0]; // Bierzemy pierwszą lokalizację

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value(),
      weatherCode: current.variables(1)!.value(),
      windSpeed: current.variables(2)!.value(),
    },
    daily: {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      maxTemp: daily.variables(1)!.valuesArray()!,
      minTemp: daily.variables(2)!.valuesArray()!,
    },
    hourly: {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature: hourly.variables(0)!.valuesArray()!,
      precipitationProb: hourly.variables(2)!.valuesArray()!,
    }
  };
}