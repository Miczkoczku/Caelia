import { fetchWeatherApi } from "openmeteo";

export async function fetchWeatherData(lat: number, lng: number) {
  const params = {
    latitude: lat,
    longitude: lng,
    current: ["temperature_2m", "weather_code", "wind_speed_10m", "wind_direction_10m"],
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
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


  const dailyCount =
    (Number(daily.timeEnd()) - Number(daily.time())) /
    daily.interval();

  const sunrise = Array.from(
    { length: dailyCount },
    (_, i) => {
      const timestamp = daily.variables(3)!.valuesInt64(i);
      return new Date(Number(timestamp) * 1000);
    }
  );

  const sunset = Array.from(
    { length: dailyCount },
    (_, i) => {
      const timestamp = daily.variables(4)!.valuesInt64(i);
      return new Date(Number(timestamp) * 1000);
    }
  );



  return {
    timezone: response.timezone() ?? "UTC",
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature: current.variables(0)!.value(),
      weatherCode: current.variables(1)!.value(),
      windSpeed: current.variables(2)!.value(),
      windDirection: current.variables(3)!.value(),
    },
    daily: {
      weatherCode: daily.variables(0)!.valuesArray()!,
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      maxTemp: daily.variables(1)!.valuesArray()!,
      minTemp: daily.variables(2)!.valuesArray()!,
      sunrise,
      sunset,
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