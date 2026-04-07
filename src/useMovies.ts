import { useEffect, useState } from "react";
import { searchMovies, SearchMovie } from "./tmdb";

export function useMovies(query: string) {
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const movieResults = await searchMovies(query, controller.signal);
          setMovies(movieResults);
        } catch (err: unknown) {
          if (!(err instanceof DOMException && err.name === "AbortError")) {
            const message = err instanceof Error ? err.message : String(err);
            console.log(message);
            setError(message);
            setMovies([]);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoding, error };
}
