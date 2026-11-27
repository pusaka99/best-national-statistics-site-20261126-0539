// Indonesia in Numbers — the figures behind the site.
// Every number below was checked against a public source before it was
// written here; each indicator names its source and year on the pages that
// show it, and the Sources page lists them all in one place.
//
// Sources used: Badan Pusat Statistik (BPS — Statistics Indonesia),
// Bank Indonesia, International Monetary Fund (IMF), World Bank.

export const META = {
  country: 'Indonesia',
  updated: '27 November 2026',
  note: 'Figures are the latest published for each indicator at the time this site was built. Where two official sources disagree, the site says so.',
};

export const HEADLINE = [
  { label: 'Population', value: '281.6m', detail: '2024, BPS', id: 'population' },
  { label: 'GDP (nominal)', value: 'US$1.40tn', detail: '2024, IMF / BPS', id: 'economy' },
  { label: 'GDP growth', value: '5.03%', detail: '2024, BPS', id: 'economy' },
  { label: 'Poverty rate', value: '8.57%', detail: 'Sep 2024, BPS', id: 'wellbeing' },
  { label: 'Unemployment', value: '4.76%', detail: 'Aug 2024, BPS', id: 'wellbeing' },
  { label: 'Inflation', value: '1.57%', detail: 'Dec 2024 yoy, BPS', id: 'economy' },
];

// --- People -----------------------------------------------------------------
export const POPULATION_TREND = {
  title: 'Population, 2020–2024',
  unit: 'million people',
  source: 'BPS (Statistics Indonesia), mid-year estimates',
  points: [
    { year: 2020, value: 269.9 },
    { year: 2021, value: 272.8 },
    { year: 2022, value: 275.7 },
    { year: 2023, value: 278.7 },
    { year: 2024, value: 281.6 },
  ],
};

export const POPULATION_FACTS = [
  { label: 'Land area', value: '1,904,569 km²', source: 'BPS' },
  { label: 'Islands', value: '17,508', source: 'BPS' },
  { label: 'Provinces', value: '38', source: 'BPS, since 2022' },
  { label: 'Share living on Java', value: '55.7%', source: 'BPS 2024: 156.9m of 281.6m' },
  { label: 'Capital', value: 'Jakarta', source: '—' },
  { label: 'Life expectancy', value: '71.3 years', source: 'World Bank, 2024' },
  { label: 'Internet users', value: '72.8% of people', source: 'World Bank, 2024' },
  { label: 'Labour force', value: '143.1 million', source: 'BPS, 2024' },
];

// Province populations, millions, 2024 (BPS). One decimal on purpose: the
// site rounds so a small revision in the source never makes the site wrong.
export const PROVINCES = [
  { name: 'West Java', pop: 50.3, region: 'Java' },
  { name: 'East Java', pop: 41.8, region: 'Java' },
  { name: 'Central Java', pop: 37.9, region: 'Java' },
  { name: 'North Sumatra', pop: 15.6, region: 'Sumatra' },
  { name: 'Banten', pop: 12.4, region: 'Java' },
  { name: 'Jakarta', pop: 10.7, region: 'Java' },
  { name: 'Lampung', pop: 9.2, region: 'Sumatra' },
  { name: 'South Sumatra', pop: 8.8, region: 'Sumatra' },
  { name: 'Riau', pop: 6.7, region: 'Sumatra' },
  { name: 'Yogyakarta', pop: 3.8, region: 'Java' },
  { name: 'West Papua', pop: 0.6, region: 'Papua' },
  { name: 'Southwest Papua', pop: 0.6, region: 'Papua' },
  { name: 'South Papua', pop: 0.5, region: 'Papua' },
];

// --- Economy ----------------------------------------------------------------
export const GDP_GROWTH = {
  title: 'Real GDP growth, 2019–2024',
  unit: '% per year',
  source: 'BPS (Statistics Indonesia)',
  points: [
    { year: 2019, value: 5.02 },
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
};

export const INFLATION = {
  title: 'Consumer price inflation, 2019–2024',
  unit: '% (December, year on year)',
  source: 'BPS (Statistics Indonesia)',
  points: [
    { year: 2019, value: 2.72 },
    { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
};

export const TRADE = {
  title: 'Trade in goods, 2020–2024',
  unit: 'US$ billion',
  source: 'BPS / Bank Indonesia',
  exports: [
    { year: 2020, value: 163.2 },
    { year: 2021, value: 231.6 },
    { year: 2022, value: 291.9 },
    { year: 2023, value: 258.8 },
    { year: 2024, value: 264.7 },
  ],
  imports: [
    { year: 2020, value: 141.6 },
    { year: 2021, value: 196.2 },
    { year: 2022, value: 237.4 },
    { year: 2023, value: 221.9 },
    { year: 2024, value: 233.7 },
  ],
};

export const ECONOMY_FACTS = [
  { label: 'GDP, nominal', value: 'US$1,396.3bn', source: 'IMF, 2024' },
  { label: 'GDP per person', value: 'US$4,958', source: 'IMF, 2024' },
  { label: 'GDP, PPP', value: 'US$4.67tn', source: 'IMF, 2024' },
  { label: 'GDP per person, PPP', value: 'US$16,515', source: 'IMF, 2024' },
  { label: 'Exports of goods', value: 'US$264.7bn', source: 'BPS, 2024' },
  { label: 'Imports of goods', value: 'US$233.7bn', source: 'BPS, 2024' },
  { label: 'Trade surplus', value: 'US$31.0bn', source: 'BPS, 2024' },
  { label: 'Current account', value: '−0.6% of GDP', source: 'Bank Indonesia, 2024' },
  { label: 'Government debt', value: '39.1% of GDP', source: 'Ministry of Finance, 2024' },
  { label: 'Rupiah, average', value: 'Rp 15,865 / US$', source: 'Bank Indonesia, 2024' },
];

// --- Wellbeing ---------------------------------------------------------------
export const POVERTY = {
  title: 'Poverty rate, 2019–2024',
  unit: '% of population',
  source: 'BPS (Statistics Indonesia)',
  points: [
    { year: 2019, value: 9.22 },
    { year: 2020, value: 9.78 },
    { year: 2021, value: 9.71 },
    { year: 2022, value: 9.54 },
    { year: 2023, value: 9.36 },
    { year: 2024, value: 8.57 },
  ],
  note: '8.57% in September 2024 is 24.06 million people.',
};

export const UNEMPLOYMENT = {
  title: 'Open unemployment rate, 2019–2024',
  unit: '% of labour force',
  source: 'BPS (Statistics Indonesia)',
  points: [
    { year: 2019, value: 5.28 },
    { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 },
    { year: 2023, value: 5.45 },
    { year: 2024, value: 4.76 },
  ],
  note: 'The ILO modelled estimate for 2024 is lower, 3.3%: it counts work differently. This site uses the BPS open unemployment rate.',
};

export const POVERTY_BY_PROVINCE = [
  { name: 'Papua Mountains', rate: 29.66 },
  { name: 'Central Papua', rate: 27.60 },
  { name: 'West Papua', rate: 21.09 },
  { name: 'South Papua', rate: 19.35 },
  { name: 'Yogyakarta', rate: 10.40 },
  { name: 'Central Java', rate: 9.58 },
  { name: 'East Java', rate: 9.56 },
];

export const WELLBEING_FACTS = [
  { label: 'People in poverty', value: '24.06 million', source: 'BPS, Sep 2024' },
  { label: 'Life expectancy', value: '71.3 years', source: 'World Bank, 2024' },
  { label: 'Internet users', value: '72.8% of people', source: 'World Bank, 2024' },
  { label: 'Labour force', value: '143.1 million', source: 'BPS, 2024' },
  { label: 'Working-age share', value: '≈ 69% aged 15–64', source: 'BPS / Ministry of Home Affairs' },
];

// --- Sources ------------------------------------------------------------------
export const SOURCES = [
  { name: 'Badan Pusat Statistik (BPS) — Statistics Indonesia', what: 'Population, GDP growth, inflation, poverty, unemployment, provinces', url: 'bps.go.id' },
  { name: 'Bank Indonesia', what: 'Trade, current account, exchange rate', url: 'bi.go.id' },
  { name: 'International Monetary Fund (IMF)', what: 'GDP nominal and PPP, GDP per person', url: 'imf.org' },
  { name: 'World Bank', what: 'Life expectancy, internet users', url: 'worldbank.org' },
  { name: 'Ministry of Finance, Indonesia', what: 'Government debt', url: 'kemenkeu.go.id' },
  { name: 'Ministry of Home Affairs (Dukcapil)', what: 'Civil-registry population counts, cross-checked against BPS', url: 'dukcapil.kemendagri.go.id' },
];
