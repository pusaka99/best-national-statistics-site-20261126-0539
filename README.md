# Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/pusaka99/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/pusaka99/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia, for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539): population, economy, wellbeing and regions, every figure with its source and year.

## What it is

Six pages on hash routes, all static files, no network at run time:

- **Overview** — six headline indicators, population and GDP-growth charts, at a glance.
- **People** — population trend 2020–2024, largest provinces, key facts.
- **Economy** — one chart area with a working switcher (GDP growth / inflation / trade in goods) plus ten key facts.
- **Wellbeing** — poverty and unemployment trends, poverty by province.
- **Regions** — a searchable, sortable table of the 10 largest and 3 smallest provinces.
- **Sources & methods** — every source, and the two places where official sources disagree (population counts, unemployment rates).

All figures were checked against public sources before they were written in: BPS (Statistics Indonesia), Bank Indonesia, the IMF and the World Bank. Province populations are rounded to one decimal place on purpose.

## How it works

`app/` is plain HTML, CSS and ES modules — no build step, no framework, no external request. Charts are drawn on canvas by `app/charts.js`; the data lives in `app/data.js`; the pages live in `app/views.js`; `app/main.js` routes. `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored make.fun library.

Run it locally:

```sh
cd app && python3 -m http.server 8000
# open http://localhost:8000
```

Hand it in:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run twice, the bytes are identical.
