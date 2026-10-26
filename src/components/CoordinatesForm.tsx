import { useState } from "react";

type CoordinatesFormProps = {
  onSubmit: (latitude: number, longitude: number) => void;
};

export function CoordinatesForm({ onSubmit }: CoordinatesFormProps) {
	const [latitude, setLatitude] = useState("49.299");
  const [longitude, setLongitude] = useState("19.9489");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const lat = Number(latitude);
    const lon = Number(longitude);

    if (
      latitude.trim() === "" ||
      longitude.trim() === "" ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      alert("Podaj poprawne współrzędne geograficzne.");
      return;
    }

    onSubmit(lat, lon);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="latitude">Szerokość</label>
        <input
          id="latitude"
          type="number"
          step="any"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="longitude">Długość</label>
        <input
          id="longitude"
          type="number"
          step="any"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
          required
        />
      </div>

      <button type="submit">Sprawdź pogodę</button>
    </form>
  );
}