import Link from "next/link";

const habitats = [
  {
    slug: "stream",
    name: "Stream",
    description: "Cold, clear water for refined freshwater species.",
    className: "left-[18%] top-[28%] w-[18%] h-[18%]",
  },
  {
    slug: "river",
    name: "River",
    description:
      "The central freshwater catalog with the strongest daily selection.",
    className: "left-[31%] top-[52%] w-[28%] h-[22%]",
  },
  {
    slug: "sea",
    name: "Sea",
    description: "Open-water premium selection with the broadest range.",
    className: "left-[67%] top-[39%] w-[24%] h-[24%]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-6 md:px-8 md:py-8">
      <section className="map-shell mx-auto max-w-7xl overflow-hidden">
        <div className="relative isolate min-h-[78vh] overflow-hidden md:min-h-[86vh]">
          <div className="absolute inset-0 bg-[url('/images/map/nature.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,27,0.42)_0%,rgba(7,16,27,0.18)_30%,rgba(7,16,27,0.34)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center px-6 py-10 text-center md:min-h-[86vh] md:px-10 md:py-14">
            <p className="eyebrow">Interactive Fish Market</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-white md:text-6xl md:leading-[1.05]">
              Choose the water. Find the catch.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[rgba(240,247,255,0.86)] md:text-lg">
              Explore the selection through stream, river, and sea, then choose
              the species and cut you want.
            </p>
            <p className="mt-3 text-sm font-medium tracking-[0.12em] text-[rgba(234,240,245,0.8)] uppercase">
              Click a habitat to open the underwater scene.
            </p>
          </div>

          {habitats.map((habitat) => (
            <Link
              key={habitat.slug}
              href={`/habitat/${habitat.slug}`}
              className={`habitat-zone ${habitat.className}`}
              aria-label={`Open the ${habitat.name.toLowerCase()} habitat scene`}
            >
              <span className="habitat-zone__pulse" aria-hidden />
              <span className="habitat-zone__label">
                <strong>{habitat.name}</strong>
                <small>{habitat.description}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
