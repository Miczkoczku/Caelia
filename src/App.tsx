import { useState } from "react";
import { WeatherRenderer } from "./components/WeatherRenderer";
import { CoordinatesForm } from "./components/CoordinatesForm";

function App() {

  const [latitude, setLatitude] = useState(49.299)
  const [longitude, setLongitude] = useState(19.9489)


return (
  <>
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        <header>
          <h1 className="text-3xl font-bold">Caelia</h1>
        </header>

        <main className="space-y-6">
          <CoordinatesForm
            onSubmit={(lat, lon) => {
              setLatitude(lat);
              setLongitude(lon);
            }}
          />

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