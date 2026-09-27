"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

type HabitatExperienceProps = {
  habitat: HabitatData;
};

export function HabitatExperience({ habitat }: HabitatExperienceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialFishFromUrl = searchParams.get("fish");
  const initialFish =
    habitat.fish.find((fish) => fish.id === initialFishFromUrl) ?? null;
  const initialCutFromUrl = searchParams.get("cut");
  const initialCut =
    initialFish?.cuts.find((cut) => cut.id === initialCutFromUrl) ?? null;
  const initialQtyFromUrl = Number(searchParams.get("qty") ?? "1");

  const [selectedFishId, setSelectedFishId] = useState<string | null>(
    initialFish?.id ?? null,
  );
  const [selectedCutId, setSelectedCutId] = useState<string | null>(
    initialCut?.id ?? null,
  );
  const [quantityKg, setQuantityKg] = useState(
    Number.isFinite(initialQtyFromUrl) && initialQtyFromUrl > 0
      ? Math.floor(initialQtyFromUrl)
      : 1,
  );
  const [isCutPickerOpen, setIsCutPickerOpen] = useState(Boolean(initialFish));

  const selectedFish = useMemo(
    () => habitat.fish.find((fish) => fish.id === selectedFishId) ?? null,
    [habitat.fish, selectedFishId],
  );

  const selectedCut = useMemo(
    () => selectedFish?.cuts.find((cut) => cut.id === selectedCutId) ?? null,
    [selectedCutId, selectedFish],
  );

  const subtotal = selectedCut ? selectedCut.pricePerKg * quantityKg : 0;
  const canContinue = Boolean(selectedFish && selectedCut);

  useEffect(() => {
    if (!selectedFish) {
      return;
    }

    const currentParams = searchParams.toString();
    const params = new URLSearchParams(currentParams);
    params.set("fish", selectedFish.id);
    params.set("qty", String(quantityKg));

    if (selectedCut) {
      params.set("cut", selectedCut.id);
    } else {
      params.delete("cut");
    }

    const nextParams = params.toString();
    if (nextParams !== currentParams) {
      router.replace(`${pathname}?${nextParams}`, { scroll: false });
    }
  }, [pathname, quantityKg, router, searchParams, selectedCut, selectedFish]);

  const handleFishSelect = (fishId: string) => {
    setSelectedFishId(fishId);
    setSelectedCutId(null);
    setIsCutPickerOpen(false);
  };

  const handleOpenCutPicker = (fishId: string) => {
    setSelectedFishId(fishId);
    setIsCutPickerOpen(true);
  };

  const handleContinueToOrder = () => {
    if (!selectedFish || !selectedCut) {
      return;
    }

    const params = new URLSearchParams({
      habitat: habitat.name,
      fish: selectedFish.name,
      cut: selectedCut.label,
      qty: String(quantityKg),
      unitPrice: String(selectedCut.pricePerKg),
      subtotal: subtotal.toFixed(2),
    });

    router.push(`/order?${params.toString()}`);
  };

  return (
    <>
      <div className="glass-panel rounded-[1.5rem] p-5 md:p-6">
        <div className="scene-summary" aria-live="polite">
          <span>{habitat.name}</span>
          <span>{selectedFish?.name ?? "Choose species"}</span>
          <span>{selectedCut?.label ?? "Choose cut"}</span>
          <span>{quantityKg} kg</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Underwater Selection</p>
          <p className="text-xs tracking-[0.08em] text-[var(--color-ink-soft)] uppercase">
            Click fish, then + for cut options
          </p>
        </div>

        <div
          className="fish-scene mt-4"
          role="region"
          aria-label="Fish selection scene"
        >
          {habitat.fish.map((fish) => {
            const isActive = selectedFishId === fish.id;

            return (
              <div
                key={fish.id}
                className="fish-hotspot"
                style={{ left: fish.left, top: fish.top }}
              >
                <button
                  type="button"
                  className={`fish-hotspot__fish ${isActive ? "is-active" : ""}`}
                  onClick={() => handleFishSelect(fish.id)}
                  aria-pressed={isActive}
                  aria-label={`Select species ${fish.name}`}
                >
                  <span className="fish-hotspot__title">{fish.name}</span>
                  <span className="fish-hotspot__note">{fish.note}</span>
                </button>
                <button
                  type="button"
                  className="fish-hotspot__plus"
                  onClick={() => handleOpenCutPicker(fish.id)}
                  aria-label={`Open cut picker for ${fish.name}`}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-[1rem] border border-[rgba(236,245,248,0.14)] bg-[rgba(8,18,29,0.58)] p-4">
          <p className="eyebrow">Focus Panel</p>
          {!selectedFish ? (
            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              Choose a fish hotspot to load details, then use + to open the cut
              picker.
            </p>
          ) : (
            <>
              <h3 className="mt-3 font-display text-2xl text-white">
                {selectedFish.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {selectedFish.note}
              </p>

              {!isCutPickerOpen ? (
                <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
                  Cut picker is closed. Use + on the active fish to choose
                  filet, steak, or whole cleaned.
                </p>
              ) : (
                <div className="mt-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--color-ink-soft)] uppercase">
                    Select Cut
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedFish.cuts.map((cut) => {
                      const isSelected = selectedCutId === cut.id;

                      return (
                        <button
                          key={cut.id}
                          type="button"
                          className={`cut-chip ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedCutId(cut.id)}
                          aria-pressed={isSelected}
                          aria-label={`Choose ${cut.label} at ${cut.pricePerKg} dollars per kilogram`}
                        >
                          <span>{cut.label}</span>
                          <span className="cut-chip__price">
                            ${cut.pricePerKg}/kg
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <aside
        className="selection-tray glass-panel rounded-[1.5rem] p-5 md:p-6"
        aria-live="polite"
      >
        <p className="eyebrow">Selection Tray</p>

        <div className="mt-4 space-y-3 text-sm text-[var(--color-ink)]">
          <TrayRow label="Habitat" value={habitat.name} />
          <TrayRow
            label="Species"
            value={selectedFish?.name ?? "Not selected"}
          />
          <TrayRow label="Cut" value={selectedCut?.label ?? "Not selected"} />
        </div>

        <div className="mt-4">
          <label
            className="block text-xs tracking-[0.08em] text-[var(--color-ink-soft)] uppercase"
            htmlFor="quantity-kg"
          >
            Quantity (kg)
          </label>
          <input
            id="quantity-kg"
            type="number"
            min={1}
            step={1}
            value={quantityKg}
            onChange={(event) => {
              const next = Number(event.target.value);
              setQuantityKg(
                Number.isFinite(next) && next > 0 ? Math.floor(next) : 1,
              );
            }}
            className="mt-2 w-full rounded-full border border-[rgba(236,245,248,0.16)] bg-[rgba(10,22,33,0.76)] px-4 py-2 text-white outline-none focus-visible:border-[rgba(236,218,176,0.56)]"
          />
        </div>

        <div className="mt-5 rounded-[1rem] border border-[rgba(236,245,248,0.14)] bg-[rgba(8,18,29,0.58)] p-4">
          <p className="text-xs tracking-[0.08em] text-[var(--color-ink-soft)] uppercase">
            Subtotal
          </p>
          <p className="mt-2 font-display text-3xl text-white">
            ${subtotal.toFixed(2)}
          </p>
          <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
            Based on price per kg and selected quantity.
          </p>
        </div>

        <button
          type="button"
          disabled={!canContinue}
          onClick={handleContinueToOrder}
          className="mt-5 w-full rounded-full border border-[rgba(236,218,176,0.58)] bg-[rgba(236,218,176,0.16)] px-4 py-3 text-sm font-semibold tracking-[0.06em] text-white uppercase transition enabled:cursor-pointer enabled:hover:bg-[rgba(236,218,176,0.26)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Continue to Order
        </button>
      </aside>
    </>
  );
}

type TrayRowProps = {
  label: string;
  value: string;
};

function TrayRow({ label, value }: TrayRowProps) {
  return (
    <div className="flex items-center justify-between rounded-full border border-[rgba(236,245,248,0.12)] bg-[rgba(238,244,246,0.06)] px-4 py-2">
      <span className="text-[var(--color-ink-soft)]">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
