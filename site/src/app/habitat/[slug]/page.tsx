import Link from "next/link";
import { notFound } from "next/navigation";

const habitatConfig = {
  stream: {
    name: "Stream",
    image: "/images/scenes/stream.jpg",
    description:
      "Cold, clear water for a smaller and more refined freshwater selection.",
    species: ["Trout", "Brook Trout"],
  },
  river: {
    name: "River",
    image: "/images/scenes/river.jpg",
    description:
      "The core freshwater catalog for everyday cooking and the broadest practical selection.",
    species: ["Carp", "Catfish", "Zander"],
  },
  sea: {
    name: "Sea",
    image: "/images/scenes/sea.jpg",
    description:
      "The premium saltwater catalog with open-water species and elevated cuts.",
    species: ["Salmon", "Sea Bream", "Sea Bass", "Tuna"],
  },
} as const;

type HabitatSlug = keyof typeof habitatConfig;

export function generateStaticParams() {
  return Object.keys(habitatConfig).map((slug) => ({ slug }));
}

export default async function HabitatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const habitat = habitatConfig[slug as HabitatSlug];

  if (!habitat) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-6 md:px-8 md:py-8">
      <section className="scene-shell mx-auto max-w-7xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${habitat.image})` }}
        />
        <div className="scene-scrim" />

        <div className="relative z-10 flex min-h-[calc(100vh-3rem)] flex-col justify-between gap-8 p-6 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="glass-panel max-w-xl rounded-[1.5rem] px-5 py-4 md:px-6 md:py-5">
              <p className="eyebrow">Habitat Scene</p>
              <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">
                {habitat.name}
              </h1>
              <p className="mt-4 max-w-lg text-[var(--color-ink-soft)] md:text-lg">
                {habitat.description}
              </p>
            </div>

            <Link
              href="/"
              className="glass-panel rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-[rgba(15,31,44,0.74)]"
            >
              Back to map
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.25fr_0.9fr] md:items-end">
            <div className="glass-panel rounded-[1.5rem] px-5 py-5 md:px-6">
              <p className="eyebrow">Underwater Flow</p>
              <h2 className="mt-3 font-display text-2xl text-white md:text-3xl">
                Fish focus and cut interaction will live here.
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
                This screen is the implementation shell for the upcoming fish
                hotspots, focus overlay, and `+` cut interaction layer. It is
                intentionally data-driven so final art can be swapped in later.
              </p>
            </div>

            <aside className="glass-panel rounded-[1.5rem] px-5 py-5 md:px-6">
              <p className="eyebrow">Primary Species</p>
              <ul className="mt-4 space-y-3 text-[var(--color-ink)]">
                {habitat.species.map((species) => (
                  <li
                    key={species}
                    className="rounded-full border border-[rgba(236,245,248,0.12)] bg-[rgba(238,244,246,0.06)] px-4 py-3"
                  >
                    {species}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
