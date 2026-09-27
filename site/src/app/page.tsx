"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";

const waterZones = [
  {
    slug: "potok",
    name: "Potok",
    className: "left-[calc(23%+50px)] top-[calc(35%+50px)]",
    zoomOrigin: "34% 42%",
  },
  {
    slug: "reka",
    name: "Reka",
    className: "left-[34%] top-[calc(74%+50px)]",
    zoomOrigin: "45% 74%",
  },
  {
    slug: "more",
    name: "More",
    className: "left-[calc(77%+30px)] top-[58%]",
    zoomOrigin: "82% 60%",
  },
];

export default function Home() {
  const router = useRouter();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const activeZone =
    waterZones.find((zone) => zone.slug === activeSlug) ?? null;

  const handleZoneClick = (slug: string) => {
    setActiveSlug(slug);
    timeoutRef.current = window.setTimeout(() => {
      router.push(`/${slug}`);
    }, 560);
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-6 md:px-8 md:py-8">
      <section className="map-shell mx-auto max-w-7xl overflow-hidden">
        <div className="relative isolate min-h-[78vh] overflow-hidden md:min-h-[86vh]">
          <div
            className={`home-map-bg absolute inset-0 bg-[url('/images/map/nature.jpg')] bg-cover bg-center ${activeZone ? "is-zooming" : ""}`}
            style={
              {
                "--zoom-origin": activeZone?.zoomOrigin ?? "50% 50%",
              } as CSSProperties
            }
          />

          <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-between px-6 py-9 md:min-h-[86vh] md:px-10 md:py-12">
            <div className="h-10 md:h-16" />

            <div className="relative mx-auto mt-8 h-[50vh] w-full max-w-5xl md:h-[56vh]">
              {waterZones.map((zone) => {
                const isHovered = hoveredSlug === zone.slug;

                return (
                  <div key={zone.slug} className={`map-zone ${zone.className}`}>
                    <button
                      type="button"
                      className="map-zone__plus"
                      onMouseEnter={() => setHoveredSlug(zone.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      onFocus={() => setHoveredSlug(zone.slug)}
                      onBlur={() => setHoveredSlug(null)}
                      onClick={() => handleZoneClick(zone.slug)}
                      aria-label={`Otvori zonu ${zone.name.toLowerCase()}`}
                    >
                      +
                    </button>
                    <span
                      className={`map-zone__hint ${isHovered ? "is-visible" : ""}`}
                    >
                      {zone.name} - deo slike
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-8" />
          </div>
        </div>
      </section>
    </div>
  );
}
