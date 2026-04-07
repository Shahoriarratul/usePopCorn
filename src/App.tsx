'use client';

import Link from 'next/link';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import StarRating from './StarRating';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';
import { useKey } from './useKey';
import {
  getMovieDetails as fetchMovieDetails,
  MovieDetailsData,
  SearchMovie,
} from './tmdb';

type WatchedMovie = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: number;
  countRatingDecison: number;
};

const average = (arr: number[]) =>
  arr.length ? arr.reduce((acc, cur) => acc + cur / arr.length, 0) : 0;

export default function App() {
  const [query, setQuery] = useState('');

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoding, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>(
    [],
    'watched',
  );

  useEffect(
    function () {
      setSelectedId(null);
    },
    [query],
  );

  // const [watched, setWatched] = useState(function () {
  //   const storedvalue = localStorage.getItem("watched");
  //   return JSON.parse(storedvalue);
  // });

  function handleSelecteMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelected() {
    setSelectedId(null);
  }

  function handleaAddWatched(movie: WatchedMovie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <div className='app-frame app-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <NavBar>
        <Search
          query={query}
          setQuery={setQuery}
        />

        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {!isLoding && !error && (
            <MovieList
              movies={movies}
              onSelectedMovie={handleSelecteMovie}
            />
          )}
          {isLoding && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelected}
              onAddWatch={handleaAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WachedSummery watched={watched} />
              <WachedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
function Loader() {
  return <p className='loader'>loading</p>;
}

function ErrorMessage({ message }: { message: string }) {
  return <p className='error'>{message}</p>;
}

function NavBar({ children }: { children: ReactNode }) {
  return (
    <nav className='nav-bar nav-bar-compact'>
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>
        <Link href='/'>popcorn</Link>
      </h1>
    </div>
  );
}

function NumResult({ movies }: { movies: SearchMovie[] }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const inputEl = useRef<HTMLInputElement>(null);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery('');
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Main({ children }: { children: ReactNode }) {
  return <main className='main main-active'>{children}</main>;
}

function Box({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({
  movies,
  onSelectedMovie,
}: {
  movies: SearchMovie[];
  onSelectedMovie: (id: string) => void;
}) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatch,
  watched,
}: {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatch: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}) {
  const [movie, setMovie] = useState<MovieDetailsData | null>(null);
  const [isLoadig, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating],
  );
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const WachedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;
  const title = movie?.Title ?? '';
  const year = movie?.Year ?? 'N/A';
  const poster = movie?.Poster ?? 'N/A';
  const runtime = movie?.Runtime ?? 'N/A';
  const imdbRating = movie?.imdbRating ?? 'N/A';
  const plot = movie?.Plot ?? 'N/A';
  const released = movie?.Released ?? 'N/A';
  const actors = movie?.Actors ?? 'N/A';
  const director = movie?.Director ?? 'N/A';
  const genre = movie?.Genre ?? 'N/A';

  function handlaAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0) ?? 0),
      userRating,
      countRatingDecison: countRef.current,
    };
    onAddWatch(newWatchedMovie);
  }

  useKey('Escape', onCloseMovie);

  useEffect(
    function () {
      const controller = new AbortController();

      async function loadMovieDetails() {
        try {
          setIsLoading(true);
          const data = await fetchMovieDetails(selectedId, controller.signal);
          setMovie(data);
        } catch (error: unknown) {
          if (!(error instanceof DOMException && error.name === 'AbortError')) {
            console.log(error instanceof Error ? error.message : String(error));
          }
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      }

      loadMovieDetails();

      return function () {
        setMovie(null);
        controller.abort();
      };
    },
    [selectedId],
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = 'popcorn';
      };
    },
    [title],
  );
  return (
    <div className='details'>
      {isLoadig ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className='btn-back'
              onClick={() => onCloseMovie()}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`Poster of ${title || 'movie'}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p> {genre}</p>
              <p>
                <span> star</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className='btn-add'
                      onClick={handlaAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>you rated this movie {WachedUserRating}</p>
              )}
            </div>
            <p>
              <em> {plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Movie({
  movie,
  onSelectedMovie,
}: {
  movie: SearchMovie;
  onSelectedMovie: (id: string) => void;
}) {
  if (movie.Poster !== 'N/A') {
    return (
      <li onClick={() => onSelectedMovie(movie.imdbID)}>
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    );
  } else {
    return null;
  }
}

function WachedSummery({ watched }: { watched: WatchedMovie[] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WachedMovieList({
  watched,
  onDeleteWatched,
}: {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({
  movie,
  onDeleteWatched,
}: {
  movie: WatchedMovie;
  onDeleteWatched: (id: string) => void;
}) {
  return (
    <li>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className='btn-delete'
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
