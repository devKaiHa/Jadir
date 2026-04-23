import Link from "next/link";

export default function Custom404() {
  return (
    <main className="site-dark-band" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div className="auto-container site-thanks">
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="site-btn" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
