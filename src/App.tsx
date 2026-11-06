import { useState } from "react";
import { WeatherRenderer } from "./components/WeatherRenderer";
import { CitySearch } from "./components/CitySearch";

function App() {

  const [latitude, setLatitude] = useState(49.299)
  const [longitude, setLongitude] = useState(19.9489)


return (
  <>
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        <header className="relative flex min-h-12 items-center justify-center">
        <h1 className="absolute left-0 text-3xl font-bold">
            Caelia
        </h1>

        <CitySearch
            onSelect={(lat, lon) => {
            setLatitude(lat);
            setLongitude(lon);
            }}
        />
        </header>

        <main className="space-y-6">
          <WeatherRenderer
            latitude={latitude}
            longitude={longitude}
          />
        </main>

      </div>
    </div>
  </>
);}

export default App