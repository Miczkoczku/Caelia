export type City = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
    };

type GeocodingResponse = {
    results?: City[];
    };

export async function searchCities(
    query: string,
    signal?: AbortSignal
    ): Promise<City[]> {
    const url = new URL(
        "https://geocoding-api.open-meteo.com/v1/search"
    );

    url.searchParams.set("name", query.trim());
    url.searchParams.set("count", "5");
    url.searchParams.set("language", "pl");
    url.searchParams.set("format", "json");

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new Error("Nie udało się pobrać miast");
    }

    const data: GeocodingResponse = await response.json();

    return data.results ?? [];
}
