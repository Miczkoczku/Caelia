
import { useState } from "react";
import { WeatherRenderer } from "./components/WeatherRenderer";
import { CitySearch } from "./components/CitySearch";
import type { City } from "./api/geocodingApi";
import { Account } from "./components/Account";

function App() {
  const [latitude, setLatitude] = useState(49.299);
  const [longitude, setLongitude] = useState(19.9489);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        <header className="relative mx-auto flex w-full max-w-6xl min-h-12 items-center justify-center">
          <CitySearch
            onSelect={(city) => {
              setSelectedCity(city);
              setLatitude(city.latitude);
              setLongitude(city.longitude);
            }}
          />
        </header>
        <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
            <Account />
        </div>

        <main className="space-y-6">
          <WeatherRenderer
            latitude={latitude}
            longitude={longitude}
            locationName={
              selectedCity
                ? `${selectedCity.name}, ${selectedCity.country ?? ""}`
                : "Zakopane, Polska"
            }
          />
        </main>

      </div>
    </div>
  );
}

export default App;
