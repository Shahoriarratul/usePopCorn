const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || "999d101c2eceedb81116cb35128bbdba";
const TMDB_READ_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN || "";

function normalizePosterUrl(poster) {
  if (!poster) return "N/A";
  return poster.startsWith("http")
    ? poster
    : `${TMDB_IMAGE_BASE_URL}${poster}`;
}

function toYear(dateString) {
  if (!dateString) return "N/A";
  return String(dateString).slice(0, 4);
}

function toRuntimeLabel(minutes) {
  if (!minutes) return "N/A";
  return `${minutes} min`;
}

function mapSearchMovie(movie) {
  return {
    imdbID: String(movie.id),
    Title: movie.title || movie.name || "Untitled",
    Year: toYear(movie.release_date),
    Poster: normalizePosterUrl(movie.poster_path),
  };
}

function mapDetailsMovie(movie) {
  const cast = movie?.credits?.cast ?? [];
  const crew = movie?.credits?.crew ?? [];
  const director = crew.find((person) => person.job === "Director")?.name;

  return {
    imdbID: String(movie.id),
    Title: movie.title || movie.name || "Untitled",
    Year: toYear(movie.release_date),
    Poster: normalizePosterUrl(movie.poster_path),
    Runtime: toRuntimeLabel(movie.runtime),
    imdbRating: movie.vote_average
      ? Number(movie.vote_average).toFixed(1)
      : "N/A",
    Plot: movie.overview || "No overview available.",
    Released: movie.release_date || "N/A",
    Actors:
      cast.slice(0, 5).map((person) => person.name).join(", ") || "N/A",
    Director: director || "N/A",
    Genre:
      movie.genres?.map((genre) => genre.name).join(", ") || "N/A",
  };
}

function withApiKey(url) {
  if (!TMDB_API_KEY) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}api_key=${TMDB_API_KEY}`;
}

async function fetchTmdb(url, signal) {
  const res = await fetch(withApiKey(url), {
    signal,
    headers: TMDB_READ_ACCESS_TOKEN
      ? {
          Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
        }
      : undefined,
  });

  if (!res.ok) {
    throw new Error("Something went wrong while contacting TMDB");
  }

  const data = await res.json();

  if (data.success === false) {
    throw new Error(data.status_message || "TMDB request failed");
  }

  return data;
}

export async function searchMovies(query, signal) {
  if (!TMDB_API_KEY && !TMDB_READ_ACCESS_TOKEN) {
    throw new Error(
      "Missing TMDB credentials: set NEXT_PUBLIC_TMDB_API_KEY or NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN"
    );
  }

  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
    query.trim()
  )}&include_adult=false&language=en-US&page=1`;
  const data = await fetchTmdb(url, signal);

  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new Error("No movies found");
  }

  return data.results.map(mapSearchMovie).filter((movie) => movie.Poster !== "N/A");
}

export async function getMovieDetails(id, signal) {
  if (!TMDB_API_KEY && !TMDB_READ_ACCESS_TOKEN) {
    throw new Error(
      "Missing TMDB credentials: set NEXT_PUBLIC_TMDB_API_KEY or NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN"
    );
  }

  const url = `${TMDB_BASE_URL}/movie/${encodeURIComponent(
    id
  )}?language=en-US&append_to_response=credits`;
  const movie = await fetchTmdb(url, signal);
  return mapDetailsMovie(movie);
}
