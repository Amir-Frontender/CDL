import Link from "next/link";

export default function RootPage() {
  return (
    <main
      style={{
        display: "grid",
        minHeight: "100svh",
        placeItems: "center",
        padding: "32px",
        background: "#f5efe6",
        color: "#0f0e0c",
        textAlign: "center",
      }}
    >
      <section style={{ maxWidth: 560 }}>
        <p
          style={{
            marginBottom: 16,
            color: "#b99a5b",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Casa di Lusso
        </p>
        <h1
          style={{
            margin: "0 0 18px",
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(42px, 8vw, 82px)",
            lineHeight: 1,
          }}
        >
          Перенаправляем вас в коллекцию
        </h1>
        <p style={{ margin: "0 0 28px", color: "#7a7a7a", lineHeight: 1.7 }}>
          Через несколько секунд откроется русская версия сайта.
        </p>
        <Link
          href="/ru/"
          style={{
            display: "inline-flex",
            minHeight: 52,
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            border: "1px solid #b99a5b",
            background: "#b99a5b",
            color: "#0f0e0c",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.09em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Перейти сейчас
        </Link>
      </section>
    </main>
  );
}
