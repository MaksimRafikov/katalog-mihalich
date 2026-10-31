"use client";

import { AREA_FILTERS, OBJECT_FILTERS } from "@/data/cases";

type CatalogFiltersProps = {
  objectType?: string;
  area?: string;
  complex?: string;
  complexes?: string[];
  onObjectTypeChange?: (value: string) => void;
  onAreaChange?: (value: string) => void;
  onComplexChange?: (value: string) => void;
};

const chipBase =
  "shrink-0 whitespace-nowrap border px-3 py-1.5 text-sm transition-[border-color,color,background-color] duration-150 ease-out";
const chipIdle = `${chipBase} border-line bg-transparent text-mute hover:border-ink hover:text-ink`;
const chipActive = `${chipBase} border-ink bg-ink text-paper`;

const filterRow =
  "flex flex-nowrap items-center gap-2 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible";

const selectClass =
  "min-h-10 w-full max-w-sm border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-[border-color] duration-150 hover:border-ink focus-visible:border-ink";

export function CatalogEmptyFilters({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-4 py-2">
      <p className="text-sm text-mute">Нет проектов по выбранным фильтрам.</p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-11 items-center border border-line px-5 py-3 text-sm text-ink transition-colors duration-200 hover:border-ink"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}

export function CatalogFilters({
  objectType = "all",
  area = "all",
  complex = "all",
  complexes = [],
  onObjectTypeChange,
  onAreaChange,
  onComplexChange,
}: CatalogFiltersProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5">
      <div className={filterRow} role="group" aria-label="Тип объекта">
        {OBJECT_FILTERS.map((item) => {
          const active = objectType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onObjectTypeChange?.(item.id)}
              className={active ? chipActive : chipIdle}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {complexes.length > 0 ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="catalog-complex" className="title-block shrink-0">
            ЖК
          </label>
          <select
            id="catalog-complex"
            className={selectClass}
            value={complex}
            onChange={(event) => onComplexChange?.(event.target.value)}
          >
            <option value="all">Все ЖК</option>
            {complexes.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className={filterRow} role="group" aria-label="Площадь">
        {AREA_FILTERS.map((item) => {
          const active = area === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onAreaChange?.(item.id)}
              className={active ? chipActive : chipIdle}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
