# L1 atoms — plan-only cases

- 19 plan-only cases added at top of `cases.ts`; cover `#070B14`; `plan: /cases/<slug>/plan.webp`
- Area from folder name after comma (`40 кв м` → `area: 40`); not in title
- Titles: ул./пр./п./д.; no кв № / ФИО; Губайдуллина с д. 10/12 для различия
- Crop: `scripts/crop_plan_pdfs.py` — redact legends/stamp, heatmap crop drawings+dims
- UI: `CasePlan` + CTA «Смотреть план» on case page
- Re-run crop: `python scripts/crop_plan_pdfs.py`
