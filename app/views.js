// Pages for Indonesia in Numbers.
// One function per page. Each returns HTML; charts are drawn after the HTML
// is in the page, by the function the page names in `draw`.

import {
  HEADLINE,
  POPULATION_TREND,
  POPULATION_FACTS,
  PROVINCES,
  GDP_GROWTH,
  INFLATION,
  TRADE,
  ECONOMY_FACTS,
  POVERTY,
  UNEMPLOYMENT,
  POVERTY_BY_PROVINCE,
  WELLBEING_FACTS,
  SOURCES,
  META,
} from './data.js';
import { drawBarChart, drawLineChart, drawGroupedBars } from './charts.js';

function factCards(facts) {
  return '<div class="facts">' + facts.map((f) =>
    `<div class="fact"><span class="fact-value">${f.value}</span><span class="fact-label">${f.label}</span><span class="fact-source">${f.source}</span></div>`,
  ).join('') + '</div>';
}

function chartCard(id, title, unit, source, note) {
  return `<section class="card"><h2>${title}</h2><p class="unit">${unit} · Source: ${source}</p><canvas id="${id}" role="img" aria-label="${title}"></canvas>${note ? `<p class="note">${note}</p>` : ''}</section>`;
}

function pageHead(title, intro) {
  return `<h1>${title}</h1><p class="intro">${intro}</p>`;
}

function overview() {
  return {
    html: `
      ${pageHead('Indonesia in Numbers', 'The country at a glance: how many people live here, how the economy is doing, and how life is changing — every figure with its source and year.')}
      <div class="kpis">` + HEADLINE.map((k) =>
        `<a class="kpi" href="#/${k.id}"><span class="kpi-value">${k.value}</span><span class="kpi-label">${k.label}</span><span class="kpi-detail">${k.detail}</span></a>`,
      ).join('') + `</div>
      <div class="grid2">
        ${chartCard('chart-pop', POPULATION_TREND.title, POPULATION_TREND.unit, POPULATION_TREND.source)}
        ${chartCard('chart-gdp', GDP_GROWTH.title, GDP_GROWTH.unit, GDP_GROWTH.source)}
      </div>
      <section class="card"><h2>At a glance</h2>
        <p>Indonesia is the world’s fourth most populous country and Southeast Asia’s largest economy. 55.7% of its people live on Java, an island smaller than the province of Kalimantan. The economy has grown about 5% a year since the pandemic, poverty is at its lowest on record, and most Indonesians are now online.</p>
        <p class="note">Figures updated ${META.updated}. ${META.note}</p>
      </section>`,
    draw() {
      drawLineChart(document.getElementById('chart-pop'), POPULATION_TREND, { format: (v) => v.toFixed(1), axis: (v) => v.toFixed(0) });
      drawBarChart(document.getElementById('chart-gdp'), GDP_GROWTH, { format: (v) => v.toFixed(2) + '%', axis: (v) => v.toFixed(0) + '%' });
    },
  };
}

function population() {
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return {
    html: `
      ${pageHead('People', '281.6 million people (BPS, 2024) live across 17,508 islands in 38 provinces — more than half of them on Java.')}
      <div class="grid2">
        ${chartCard('chart-pop', POPULATION_TREND.title, POPULATION_TREND.unit, POPULATION_TREND.source)}
        <section class="card"><h2>Largest provinces, 2024</h2><p class="unit">Million people · Source: BPS</p>
          <ul class="bars">` + top.map((p) =>
            `<li><span class="bar-name">${p.name}</span><span class="bar-track"><span class="bar-fill" style="width:${(p.pop / 50.3 * 100).toFixed(1)}%"></span></span><span class="bar-value">${p.pop.toFixed(1)}m</span></li>`,
          ).join('') + `</ul>
          <p class="note">West Java alone has more people than Spain. <a href="#/regions">See all provinces →</a></p>
        </section>
      </div>
      ${factCards(POPULATION_FACTS)}`,
    draw() {
      drawLineChart(document.getElementById('chart-pop'), POPULATION_TREND, { format: (v) => v.toFixed(1), axis: (v) => v.toFixed(0) });
    },
  };
}

function economy() {
  return {
    html: `
      ${pageHead('Economy', 'A US$1.40 trillion economy (IMF, 2024) that has grown about 5% a year for three years running, with inflation back near 1.6%.')}
      <section class="card"><h2 id="metric-title">${GDP_GROWTH.title}</h2>
        <p class="unit"><span id="metric-unit">${GDP_GROWTH.unit}</span> · Source: <span id="metric-source">${GDP_GROWTH.source}</span></p>
        <div class="switcher" role="group" aria-label="Choose indicator">
          <button type="button" data-metric="growth" class="on">GDP growth</button>
          <button type="button" data-metric="inflation">Inflation</button>
          <button type="button" data-metric="trade">Trade in goods</button>
        </div>
        <canvas id="chart-metric" role="img" aria-label="Economy chart"></canvas>
        <p class="note" id="metric-note"></p>
      </section>
      ${factCards(ECONOMY_FACTS)}`,
    draw() {
      const canvas = document.getElementById('chart-metric');
      const title = document.getElementById('metric-title');
      const unit = document.getElementById('metric-unit');
      const source = document.getElementById('metric-source');
      const note = document.getElementById('metric-note');
      const buttons = [...document.querySelectorAll('.switcher button')];
      function show(which) {
        buttons.forEach((b) => b.classList.toggle('on', b.dataset.metric === which));
        if (which === 'growth') {
          title.textContent = GDP_GROWTH.title;
          unit.textContent = GDP_GROWTH.unit;
          source.textContent = GDP_GROWTH.source;
          note.textContent = 'The 2020 dip is the pandemic: the economy shrank 2.07% that year, then recovered.';
          drawBarChart(canvas, GDP_GROWTH, { format: (v) => v.toFixed(2) + '%', axis: (v) => v.toFixed(0) + '%' });
        } else if (which === 'inflation') {
          title.textContent = INFLATION.title;
          unit.textContent = INFLATION.unit;
          source.textContent = INFLATION.source;
          note.textContent = 'Prices spiked in 2022 when fuel subsidies were cut, then fell back below 2%.';
          drawBarChart(canvas, INFLATION, { format: (v) => v.toFixed(2) + '%', axis: (v) => v.toFixed(0) + '%' });
        } else {
          title.textContent = TRADE.title;
          unit.textContent = TRADE.unit;
          source.textContent = TRADE.source;
          note.textContent = 'Exports peaked in 2022 on high commodity prices. The 2024 surplus was US$31.0bn.';
          drawGroupedBars(canvas, { label: 'Exports', points: TRADE.exports }, { label: 'Imports', points: TRADE.imports }, { format: (v) => '$' + v.toFixed(0) + 'bn', axis: (v) => '$' + v.toFixed(0) + 'bn' });
        }
      }
      buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.metric)));
      show('growth');
    },
  };
}

function wellbeing() {
  return {
    html: `
      ${pageHead('Wellbeing', 'Poverty is at its lowest on record and unemployment at its lowest since 2019 — but the gains are uneven across the country.')}
      <div class="grid2">
        ${chartCard('chart-pov', POVERTY.title, POVERTY.unit, POVERTY.source, POVERTY.note)}
        ${chartCard('chart-unemp', UNEMPLOYMENT.title, UNEMPLOYMENT.unit, UNEMPLOYMENT.source, UNEMPLOYMENT.note)}
      </div>
      <section class="card"><h2>Poverty by province, 2024</h2><p class="unit">% of population · Source: BPS</p>
        <table><thead><tr><th>Province</th><th>Poverty rate</th></tr></thead><tbody>
        ${POVERTY_BY_PROVINCE.map((p) => `<tr><td>${p.name}</td><td>${p.rate.toFixed(2)}%</td></tr>`).join('')}
        </tbody></table>
        <p class="note">The four highest rates are all in Papua. The national rate is 8.57%.</p>
      </section>
      ${factCards(WELLBEING_FACTS)}`,
    draw() {
      drawLineChart(document.getElementById('chart-pov'), POVERTY, { format: (v) => v.toFixed(2) + '%', axis: (v) => v.toFixed(1) + '%' });
      drawBarChart(document.getElementById('chart-unemp'), UNEMPLOYMENT, { format: (v) => v.toFixed(2) + '%', axis: (v) => v.toFixed(0) + '%' });
    },
  };
}

function regions() {
  return {
    html: `
      ${pageHead('Regions', 'Indonesia has 38 provinces. The table lists the 10 largest and the 3 smallest by population (BPS, 2024) — search or sort it to explore.')}
      <section class="card">
        <div class="tools">
          <label>Search <input id="prov-search" type="search" placeholder="Type a province name…" autocomplete="off"></label>
          <label>Sort by
            <select id="prov-sort">
              <option value="pop-desc">Population: largest first</option>
              <option value="pop-asc">Population: smallest first</option>
              <option value="name">Name A–Z</option>
              <option value="region">Region</option>
            </select>
          </label>
        </div>
        <table id="prov-table"><thead><tr><th>Province</th><th>Region</th><th>Population (millions)</th><th>Share of Indonesia</th></tr></thead>
        <tbody id="prov-body"></tbody></table>
        <p class="note" id="prov-count"></p>
      </section>`,
    draw() {
      const body = document.getElementById('prov-body');
      const count = document.getElementById('prov-count');
      const search = document.getElementById('prov-search');
      const sort = document.getElementById('prov-sort');
      function render() {
        const q = search.value.trim().toLowerCase();
        let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
        const mode = sort.value;
        if (mode === 'pop-desc') rows = [...rows].sort((a, b) => b.pop - a.pop);
        if (mode === 'pop-asc') rows = [...rows].sort((a, b) => a.pop - b.pop);
        if (mode === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
        if (mode === 'region') rows = [...rows].sort((a, b) => a.region.localeCompare(b.region) || b.pop - a.pop);
        body.innerHTML = rows.map((p) =>
          `<tr><td>${p.name}</td><td>${p.region}</td><td>${p.pop.toFixed(1)}</td><td>${(p.pop / 281.6 * 100).toFixed(1)}%</td></tr>`,
        ).join('') || '<tr><td colspan="4">No province matches that search.</td></tr>';
        count.textContent = `${rows.length} of ${PROVINCES.length} provinces shown · Populations in millions, BPS 2024 (rounded to one decimal).`;
      }
      search.addEventListener('input', render);
      sort.addEventListener('change', render);
      render();
    },
  };
}

function sources() {
  return {
    html: `
      ${pageHead('Sources & methods', 'Where every number on this site comes from, and what to watch out for when you compare sources.')}
      <section class="card"><h2>Sources</h2>
        <table><thead><tr><th>Source</th><th>What it is used for</th></tr></thead><tbody>
        ${SOURCES.map((s) => `<tr><td>${s.name}<br><span class="fact-source">${s.url}</span></td><td>${s.what}</td></tr>`).join('')}
        </tbody></table>
      </section>
      <section class="card"><h2>Read this first</h2>
        <ul class="notes">
          <li><strong>Two population counts.</strong> BPS (281.6 million, 2024) estimates the people actually living in each place. The civil registry (Dukcapil) counts registered residents and gives a higher number (288.3 million at the end of 2025). This site uses BPS, and says so on every population figure.</li>
          <li><strong>Two unemployment rates.</strong> The BPS open unemployment rate (4.76%, August 2024) and the ILO modelled estimate (3.3%, 2024) count work differently. This site uses the BPS rate.</li>
          <li><strong>Rounding.</strong> Province populations are rounded to one decimal place, so a small revision in the source never makes this site wrong.</li>
          <li><strong>Updates.</strong> Figures are the latest published for each indicator when this site was built, ${META.updated}.</li>
        </ul>
      </section>`,
    draw() {},
  };
}

export const PAGES = {
  '': overview,
  population,
  economy,
  wellbeing,
  regions,
  sources,
};
