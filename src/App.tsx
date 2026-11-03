import { useState } from "react";
import { WeatherRenderer } from "./components/WeatherRenderer";
import { CoordinatesForm } from "./components/CoordinatesForm";

function App() {

  const [latitude, setLatitude] = useState(49.299)
  const [longitude, setLongitude] = useState(19.9489)

  return (
    <div className="min-h-screen bg-slate-900 text-white p-5">

      <CoordinatesForm onSubmit={(lat, lon) => { setLatitude(lat); setLongitude(lon); }}/>

      <WeatherRenderer latitude={latitude} longitude={longitude} />
      
    </div>
  )
}

export default App
