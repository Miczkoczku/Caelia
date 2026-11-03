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
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 rounded-xl border border-white/20 bg-white/10 p-5"
  >
    <h2 className="text-xl font-semibold">
      Sprawdź pogodę
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="latitude" className="text-sm font-medium">
          Szerokość
        </label>
        <input
          id="latitude"
          type="number"
          step="any"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="longitude" className="text-sm font-medium">
          Długość
        </label>
        <input
          id="longitude"
          type="number"
          step="any"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-blue-400"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white cursor-pointer hover:bg-blue-500 transition-colors"
    >
      Sprawdź pogodę
    </button>
  </form>
);
}