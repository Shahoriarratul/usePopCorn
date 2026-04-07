import Link from "next/link";

export default function HomePage() {
  const posters = [
    "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
  ];

  return (
    <div className="landing-shell">
      <section className="home-hero">
        <div className="hero-backdrop" aria-hidden="true">
          {posters.map((poster, index) => (
            <img
              src={poster}
              alt=""
              key={poster}
              className="hero-poster"
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Movie Night Starts Here</p>
          <h2>Welcome to popcorn</h2>
          <p>
            Start from this cinematic home page, then jump into a dedicated
            search and rating workspace powered by TMDB.
          </p>
          <div className="hero-actions">
            <Link href="/search" className="hero-search-btn landing-cta">
              Enter Search and Rating
            </Link>
            <Link href="/search" className="hero-chip">
              Explore Movies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}