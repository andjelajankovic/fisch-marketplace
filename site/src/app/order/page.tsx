import Link from "next/link";

type OrderSearchParams = {
  habitat?: string;
  fish?: string;
  cut?: string;
  qty?: string;
  unitPrice?: string;
  subtotal?: string;
};

function valueOrFallback(value: string | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<OrderSearchParams>;
}) {
  const params = await searchParams;

  const habitat = valueOrFallback(params.habitat, "Not selected");
  const fish = valueOrFallback(params.fish, "Not selected");
  const cut = valueOrFallback(params.cut, "Not selected");
  const quantity = valueOrFallback(params.qty, "0");
  const unitPrice = valueOrFallback(params.unitPrice, "0");
  const subtotal = valueOrFallback(params.subtotal, "0.00");

  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-6 md:px-8 md:py-8">
      <section className="scene-shell mx-auto max-w-5xl p-6 md:p-10">
        <div className="glass-panel mx-auto max-w-3xl rounded-[1.5rem] p-6 md:p-8">
          <p className="eyebrow">Order Review</p>
          <h1 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Confirm your catch
          </h1>
          <p className="mt-3 text-[var(--color-ink-soft)]">
            This is the desktop handoff checkpoint before payment and delivery
            details.
          </p>

          <div className="mt-6 space-y-3">
            <OrderRow label="Habitat" value={habitat} />
            <OrderRow label="Species" value={fish} />
            <OrderRow label="Cut" value={cut} />
            <OrderRow label="Quantity" value={`${quantity} kg`} />
            <OrderRow label="Unit Price" value={`$${unitPrice}/kg`} />
          </div>

          <div className="mt-6 rounded-[1rem] border border-[rgba(236,218,176,0.4)] bg-[rgba(236,218,176,0.1)] px-5 py-4">
            <p className="text-xs tracking-[0.08em] text-[var(--color-ink-soft)] uppercase">
              Estimated Subtotal
            </p>
            <p className="mt-2 font-display text-3xl text-white">${subtotal}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-[rgba(236,245,248,0.2)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[rgba(238,244,246,0.08)]"
            >
              Back to map
            </Link>
            <p className="rounded-full border border-[rgba(128,215,216,0.3)] bg-[rgba(128,215,216,0.12)] px-5 py-2 text-sm font-semibold text-white">
              Payment flow next
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

type OrderRowProps = {
  label: string;
  value: string;
};

function OrderRow({ label, value }: OrderRowProps) {
  return (
    <div className="flex items-center justify-between rounded-full border border-[rgba(236,245,248,0.12)] bg-[rgba(238,244,246,0.06)] px-4 py-3">
      <span className="text-sm text-[var(--color-ink-soft)]">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
