
import { useState } from "react";
import { Header } from "./components/Header";
import { WeatherRenderer } from "./components/WeatherRenderer";
import type { City } from "./api/geocodingApi";

function App() {
  const [latitude, setLatitude] = useState(49.299);
  const [longitude, setLongitude] = useState(19.9489);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const locationName = selectedCity
    ? [selectedCity.name, selectedCity.country]
        .filter(Boolean)
        .join(", ")
    : "Zakopane, Polska";

  function handleSelectCity(city: City) {
    setSelectedCity(city);
    setLatitude(city.latitude);
    setLongitude(city.longitude);
  }

  return (
    <div className="relative min-h-screen bg-slate-900 p-4 text-white md:p-8">
      <Header
        latitude={latitude}
        longitude={longitude}
        locationName={locationName}
        onSelectCity={handleSelectCity}
      />

      <main className="mx-auto max-w-6xl space-y-6 pt-16">
        <WeatherRenderer
          latitude={latitude}
          longitude={longitude}
          locationName={locationName}
        />
      </main>
    </div>
  );
}

export default App;
