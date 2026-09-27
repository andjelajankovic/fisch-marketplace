import Link from "next/link";
import { notFound } from "next/navigation";
import { HabitatExperience } from "./HabitatExperience";

type FishCut = {
  id: string;
  label: string;
  pricePerKg: number;
};

type HabitatFish = {
  id: string;
  name: string;
  note: string;
  left: string;
  top: string;
  cuts: FishCut[];
};

type HabitatData = {
  name: string;
  image: string;
  description: string;
  species: string[];
  fish: HabitatFish[];
};

const habitatConfig: Record<string, HabitatData> = {
  stream: {
    name: "Stream",
    image: "/images/scenes/stream.jpg",
    description:
      "Cold, clear water for a smaller and more refined freshwater selection.",
    species: ["Trout", "Brook Trout"],
    fish: [
      {
        id: "stream-trout",
        name: "Rainbow Trout",
        note: "Lean, clean flavor with bright finish.",
        left: "26%",
        top: "54%",
        cuts: [
          { id: "filet", label: "Filet", pricePerKg: 18 },
          { id: "steak", label: "Steak", pricePerKg: 16 },
          { id: "whole", label: "Whole cleaned", pricePerKg: 14 },
        ],
      },
      {
        id: "stream-brook",
        name: "Brook Trout",
        note: "Delicate meat for gentle pan or oven prep.",
        left: "58%",
        top: "42%",
        cuts: [
          { id: "filet", label: "Filet", pricePerKg: 20 },
          { id: "steak", label: "Steak", pricePerKg: 17 },
          { id: "whole", label: "Whole cleaned", pricePerKg: 15 },
        ],
      },
    ],
  },
  river: {
    name: "River",
    image: "/images/scenes/river.jpg",
    description:
      "The core freshwater catalog for everyday cooking and the broadest practical selection.",
    species: ["Carp", "Catfish", "Zander"],
    fish: [
      {
        id: "river-zander",
        name: "Zander",
        note: "Firm texture, ideal for precise portions.",
        left: "33%",
        top: "60%",
        cuts: [
          { id: "filet", label: "Filet", pricePerKg: 23 },
          { id: "steak", label: "Steak", pricePerKg: 20 },
          { id: "whole", label: "Whole cleaned", pricePerKg: 17 },
        ],
      },
      {
        id: "river-catfish",
        name: "Catfish",
        note: "Rich freshwater cut with high yield.",
        left: "64%",
        top: "48%",
        cuts: [
          { id: "filet", label: "Filet", pricePerKg: 19 },
          { id: "steak", label: "Steak", pricePerKg: 18 },
          { id: "whole", label: "Whole cleaned", pricePerKg: 15 },
        ],
      },
    ],
  },
  sea: {
    name: "Sea",
    image: "/images/scenes/sea.jpg",
    description:
      "The premium saltwater catalog with open-water species and elevated cuts.",
    species: ["Salmon", "Sea Bream", "Sea Bass", "Tuna"],
    fish: [
      {
        id: "sea-bass",
        name: "Sea Bass",
        note: "Versatile white fish with crisp skin potential.",
        left: "30%",
        top: "56%",
        cuts: [
          { id: "filet", label: "Filet", pricePerKg: 28 },
          { id: "steak", label: "Steak", pricePerKg: 25 },
          { id: "whole", label: "Whole cleaned", pricePerKg: 22 },
        ],
      },
      {
        id: "sea-tuna",
        name: "Bluefin Tuna",
        note: "Premium line with deep color and bold flavor.",
        left: "62%",
        top: "38%",
        cuts: [
          { id: "filet", label: "Filet", pricePerKg: 42 },
          { id: "steak", label: "Steak", pricePerKg: 39 },
          { id: "whole", label: "Whole cleaned", pricePerKg: 34 },
        ],
      },
    ],
  },
};

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
            <HabitatExperience habitat={habitat} />
          </div>
        </div>
      </section>
    </div>
  );
}
