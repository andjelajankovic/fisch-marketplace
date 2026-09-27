import Link from "next/link";

export default function PotokPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-6 md:px-8 md:py-8">
      <section className="scene-shell mx-auto max-w-7xl overflow-hidden">
        <div className="relative isolate min-h-[78vh] md:min-h-[86vh]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out hover:scale-[1.04]"
            style={{ backgroundImage: "url('/images/scenes/stream.jpg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,27,0.45)_0%,rgba(7,16,27,0.22)_28%,rgba(7,16,27,0.62)_100%)]" />

          <div className="relative z-10 flex min-h-[78vh] flex-col justify-between p-6 md:min-h-[86vh] md:p-10">
            <div className="glass-panel inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold text-white">
              Potok
            </div>

            <Link
              href="/"
              className="glass-panel inline-flex w-fit rounded-full border border-[rgba(236,218,176,0.44)] bg-[rgba(236,218,176,0.16)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[rgba(236,218,176,0.26)]"
            >
              Nazad na mapu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
