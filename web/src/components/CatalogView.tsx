"use client";

import { useMemo, useState } from "react";
import { CaseCard } from "@/components/CaseCard";
import {
  CatalogEmptyFilters,
  CatalogFilters,
} from "@/components/CatalogFilters";
import {
  AREA_FILTERS,
  catalogComplexes,
  catalogPreviewSrc,
  objectTypeLabel,
  publishedCases,
  type ObjectType,
} from "@/data/cases";

export function CatalogView() {
  const [objectType, setObjectType] = useState("all");
  const [area, setArea] = useState("all");
  const [complex, setComplex] = useState("all");

  const complexes = useMemo(() => catalogComplexes(), []);

  const filtered = useMemo(() => {
    const areaRule =
      AREA_FILTERS.find((item) => item.id === area) ?? AREA_FILTERS[0];

    return publishedCases().filter((item) => {
      if (objectType !== "all" && item.objectType !== objectType) {
        return false;
      }
      if (complex !== "all" && item.complex !== complex) {
        return false;
      }
      if (area === "all") return true;
      if (item.area == null) return false;
      return item.area >= areaRule.min && item.area < areaRule.max;
    });
  }, [objectType, area, complex]);

  function reset() {
    setObjectType("all");
    setArea("all");
    setComplex("all");
  }

  return (
    <div className="flex flex-col gap-8">
      <CatalogFilters
        objectType={objectType}
        area={area}
        complex={complex}
        complexes={complexes}
        onObjectTypeChange={setObjectType}
        onAreaChange={setArea}
        onComplexChange={setComplex}
      />

      {filtered.length === 0 ? (
        publishedCases().length === 0 ? (
          <p className="max-w-xl text-sm text-mute">
            Объекты появятся здесь по мере подготовки фото и коротких видео.
            Сырые материалы лежат в архиве проекта и не публикуются напрямую.
          </p>
        ) : (
          <CatalogEmptyFilters onReset={reset} />
        )
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <CaseCard
              key={item.slug}
              href={`/catalog/${item.slug}`}
              title={item.title}
              cover={catalogPreviewSrc(item)}
              plate={item.area != null ? `${item.area} м²` : ""}
              meta={objectTypeLabel(item.objectType as ObjectType)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
