
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, MapPin } from "lucide-react";
import { searchCities, type City } from "../api/geocodingApi";

type CitySearchProps = {
  onSelect: (city: City) => void;
  expandDirection?: "center" | "left";
};

export function CitySearch({
  onSelect,
  expandDirection = "center",
}: CitySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: results = [],
    isFetching: loading,
    isError,
  } = useQuery({
    queryKey: ["cities", debouncedQuery],
    queryFn: ({ signal }) => searchCities(debouncedQuery, signal),
    enabled: isOpen && debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
  });

  const isSearching =
    query.trim() !== debouncedQuery || loading;

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
    setDebouncedQuery("");
  }

  function selectCity(city: City) {
    onSelect(city);
    closeSearch();
  }

  // Zamknij wyszukiwarkę przy przejściu między trybami.
  const previousDirection = useRef(expandDirection);

  useEffect(() => {
    if (previousDirection.current !== expandDirection) {
      previousDirection.current = expandDirection;
      // Zmiana trybu nagłówka resetuje wyszukiwanie.
      setIsOpen(false);
      setQuery("");
      setDebouncedQuery("");
    }
  }, [expandDirection]);

  const positionClass =
    expandDirection === "center"
      ? "left-1/2 -translate-x-1/2"
      : "right-0";

  return (
    <div className="relative z-50 h-12 w-12">
      {/* Pasek wyszukiwania */}
      <div
        className={`absolute top-0 z-20 flex h-12 items-center overflow-hidden rounded-full border border-white/20 bg-slate-800/95 backdrop-blur-xl transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-[400px]" : "w-12"
        } ${positionClass}`}
        style={{
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.28)",
        }}
      >
        <button
          type="button"
          aria-label="Otwórz wyszukiwarkę"
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center"
        >
          <Search size={20} />
        </button>

        {isOpen && (
          <>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Wyszukaj miasto..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
            />

            <button
              type="button"
              aria-label="Zamknij wyszukiwarkę"
              onClick={closeSearch}
              className="mr-3 cursor-pointer text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </>
        )}
      </div>

      {/* Panel podpowiedzi */}
      {isOpen && query.trim().length >= 2 && (
        <div
          className={`absolute top-6 z-10 w-[400px] overflow-hidden rounded-b-3xl border border-white/10 bg-slate-800/95 px-2 pb-2 pt-9 backdrop-blur-xl ${positionClass}`}
          style={{
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.16)",
          }}
        >
          {isSearching ? (
            <p className="p-3 text-sm text-white/60">
              Wyszukiwanie...
            </p>
          ) : isError ? (
            <p className="p-3 text-sm text-red-300">
              Nie udało się pobrać lokalizacji.
            </p>
          ) : results.length > 0 ? (
            results.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => selectCity(city)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10"
              >
                <MapPin
                  size={18}
                  className="text-blue-300"
                />

                <div>
                  <p className="font-medium">{city.name}</p>
                  <p className="text-xs text-white/50">
                    {[city.admin1, city.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="p-3 text-sm text-white/60">
              Nie znaleziono lokalizacji.
            </p>
          )}
        </div>
      )}
    </div>
  );
}