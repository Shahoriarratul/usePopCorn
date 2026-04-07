import "./globals.css";

export const metadata = {
  title: "popcorn",
  description: "Search movies and build a watched list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}