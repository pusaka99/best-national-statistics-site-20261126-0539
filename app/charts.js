// Canvas charts for Indonesia in Numbers.
// Plain canvas, no library: the first load stays small and every chart is
// drawn from the same helpers, so the site has one clear job per file.
//
// Axis ticks are always round numbers (1 / 2 / 2.5 / 5 / 10 times a power
// of ten), so a reader never sees a label like 3.98%. Line charts scale
// from just below the data, so a slow trend is visible instead of flat;
// bar charts always start at zero, so a bar's height means what it shows.

const INK = '#1d2b2a';
const MUTED = '#5c6b68';
const GRID = '#dfe6e2';
const TEAL = '#0e4f4a';
const AMBER = '#e8a33d';
const RED = '#b3402e';

function setupCanvas(canvas, heightCss) {
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 640;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(heightCss * dpr);
  canvas.style.height = heightCss + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width, height: heightCss };
}

// Round ticks that cover [min, max] with about four gridlines.
function niceTicks(min, max) {
  const span = max - min || 1;
  const mag = Math.pow(10, Math.floor(Math.log10(span / 4)));
  let step = 10 * mag;
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (span / (m * mag) <= 5) { step = m * mag; break; }
  }
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return { lo, hi, ticks };
}

function drawAxes(ctx, box, ticks, axisFmt) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const v of ticks.ticks) {
    const y = box.bottom - ((v - ticks.lo) / (ticks.hi - ticks.lo)) * box.height;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.right, y);
    ctx.stroke();
    ctx.fillText(axisFmt(v), box.left - 8, y);
  }
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.moveTo(box.left, box.bottom);
  ctx.lineTo(box.right, box.bottom);
  ctx.stroke();
}

function chartBox(width, height) {
  const box = { left: 52, right: width - 12, top: 18, bottom: height - 30 };
  box.height = box.bottom - box.top;
  return box;
}

// A bar chart: one bar per point, value labels on top. Always starts at
// zero (or below zero when a value is negative, so the 2020 dip shows).
export function drawBarChart(canvas, series, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const box = chartBox(width, height);
  const values = series.points.map((p) => p.value);
  const ticks = niceTicks(Math.min(0, ...values), Math.max(...values));
  const yAt = (v) => box.bottom - ((v - ticks.lo) / (ticks.hi - ticks.lo)) * box.height;
  drawAxes(ctx, box, ticks, options.axis);
  const n = series.points.length;
  const slot = (box.right - box.left) / n;
  const barWidth = Math.min(46, slot * 0.6);
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  series.points.forEach((p, i) => {
    const x = box.left + slot * i + slot / 2;
    const y0 = yAt(0);
    const y1 = yAt(p.value);
    const top = Math.min(y0, y1);
    const h = Math.abs(y1 - y0);
    ctx.fillStyle = p.value < 0 ? RED : options.color || TEAL;
    ctx.fillRect(x - barWidth / 2, top, barWidth, Math.max(h, 2));
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(options.format(p.value), x, top - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), x, box.bottom + 8);
  });
}

// A line chart with dots and value labels. Scales from just below the
// data, so a trend of a few points is visible. The first point's label is
// left-aligned and the last point's right-aligned, so neither label runs
// off the edge or over the axis numbers; a label too close to the top
// goes under its dot instead of over it.
export function drawLineChart(canvas, series, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const box = chartBox(width, height);
  const values = series.points.map((p) => p.value);
  const span = Math.max(...values) - Math.min(...values);
  const ticks = niceTicks(Math.min(...values) - span * 0.25, Math.max(...values) + span * 0.1);
  const yAt = (v) => box.bottom - ((v - ticks.lo) / (ticks.hi - ticks.lo)) * box.height;
  drawAxes(ctx, box, ticks, options.axis);
  const n = series.points.length;
  const xAt = (i) => box.left + ((box.right - box.left) * i) / (n - 1);
  ctx.strokeStyle = options.color || TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.stroke();
  ctx.font = '12px system-ui, sans-serif';
  series.points.forEach((p, i) => {
    const x = xAt(i);
    const y = yAt(p.value);
    ctx.fillStyle = options.color || TEAL;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = i === 0 ? 'left' : i === n - 1 ? 'right' : 'center';
    const lx = i === 0 ? x + 8 : i === n - 1 ? x - 8 : x;
    if (y - box.top < 26) {
      ctx.textBaseline = 'top';
      ctx.fillText(options.format(p.value), lx, y + 8);
    } else {
      ctx.textBaseline = 'bottom';
      ctx.fillText(options.format(p.value), lx, y - 8);
    }
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), x, box.bottom + 8);
  });
}

// A grouped bar chart: two series side by side (used for exports/imports).
export function drawGroupedBars(canvas, a, b, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const box = chartBox(width, height);
  const all = [...a.points, ...b.points].map((p) => p.value);
  const ticks = niceTicks(0, Math.max(...all));
  const yAt = (v) => box.bottom - ((v - ticks.lo) / (ticks.hi - ticks.lo)) * box.height;
  drawAxes(ctx, box, ticks, options.axis);
  const n = a.points.length;
  const slot = (box.right - box.left) / n;
  const barWidth = Math.min(26, slot * 0.28);
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  a.points.forEach((p, i) => {
    const cx = box.left + slot * i + slot / 2;
    ctx.fillStyle = TEAL;
    ctx.fillRect(cx - barWidth - 2, yAt(p.value), barWidth, box.bottom - yAt(p.value));
    ctx.fillStyle = AMBER;
    ctx.fillRect(cx + 2, yAt(b.points[i].value), barWidth, box.bottom - yAt(b.points[i].value));
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(options.format(p.value), cx - barWidth / 2 - 2, yAt(p.value) - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), cx, box.bottom + 8);
  });
  // Legend at the top-right, clear of the bars.
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillStyle = TEAL;
  ctx.fillRect(box.right - 150, 0, 12, 12);
  ctx.fillStyle = INK;
  ctx.fillText(a.label, box.right - 134, 0);
  ctx.fillStyle = AMBER;
  ctx.fillRect(box.right - 150, 18, 12, 12);
  ctx.fillStyle = INK;
  ctx.fillText(b.label, box.right - 134, 18);
}
