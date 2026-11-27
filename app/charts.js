// Canvas charts for Indonesia in Numbers.
// Plain canvas, no library: the first load stays small and every chart is
// drawn from the same two helpers, so the site has one clear job per file.

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

function niceMax(max) {
  if (max <= 0) return 1;
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / step) * step;
}

function drawAxes(ctx, box, min, max, formatValue) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = box.bottom - ((v - min) / (max - min)) * box.height;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.right, y);
    ctx.stroke();
    ctx.fillText(formatValue(v), box.left - 8, y);
  }
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.moveTo(box.left, box.bottom);
  ctx.lineTo(box.right, box.bottom);
  ctx.stroke();
}

// A bar chart: one bar per point, value labels on top.
export function drawBarChart(canvas, series, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const box = { left: 52, right: width - 12, top: 14, bottom: height - 30 };
  box.height = box.bottom - box.top;
  const values = series.points.map((p) => p.value);
  const min = Math.min(0, ...values);
  const max = niceMax(Math.max(...values));
  const fmt = options.format || ((v) => String(v));
  drawAxes(ctx, box, min, max, fmt);
  const n = series.points.length;
  const slot = (box.right - box.left) / n;
  const barWidth = Math.min(46, slot * 0.6);
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  series.points.forEach((p, i) => {
    const x = box.left + slot * i + slot / 2;
    const y0 = box.bottom - ((0 - min) / (max - min)) * box.height;
    const y1 = box.bottom - ((p.value - min) / (max - min)) * box.height;
    const top = Math.min(y0, y1);
    const h = Math.abs(y1 - y0);
    ctx.fillStyle = p.value < 0 ? RED : options.color || TEAL;
    ctx.fillRect(x - barWidth / 2, top, barWidth, Math.max(h, 2));
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.value), x, top - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), x, box.bottom + 8);
  });
}

// A line chart with dots and value labels.
export function drawLineChart(canvas, series, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const box = { left: 52, right: width - 12, top: 18, bottom: height - 30 };
  box.height = box.bottom - box.top;
  const values = series.points.map((p) => p.value);
  const min = Math.min(0, ...values);
  const max = niceMax(Math.max(...values));
  const fmt = options.format || ((v) => String(v));
  drawAxes(ctx, box, min, max, fmt);
  const n = series.points.length;
  const xAt = (i) => box.left + ((box.right - box.left) * i) / (n - 1);
  const yAt = (v) => box.bottom - ((v - min) / (max - min)) * box.height;
  ctx.strokeStyle = options.color || TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.stroke();
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  series.points.forEach((p, i) => {
    ctx.fillStyle = options.color || TEAL;
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.value), xAt(i), yAt(p.value) - 8);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), xAt(i), box.bottom + 8);
  });
}

// A grouped bar chart: two series side by side (used for exports/imports).
export function drawGroupedBars(canvas, a, b, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const box = { left: 52, right: width - 12, top: 18, bottom: height - 30 };
  box.height = box.bottom - box.top;
  const all = [...a.points, ...b.points].map((p) => p.value);
  const max = niceMax(Math.max(...all));
  const fmt = options.format || ((v) => String(v));
  drawAxes(ctx, box, 0, max, fmt);
  const n = a.points.length;
  const slot = (box.right - box.left) / n;
  const barWidth = Math.min(26, slot * 0.28);
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  a.points.forEach((p, i) => {
    const cx = box.left + slot * i + slot / 2;
    const y = (v) => box.bottom - (v / max) * box.height;
    ctx.fillStyle = TEAL;
    ctx.fillRect(cx - barWidth - 2, y(p.value), barWidth, box.bottom - y(p.value));
    ctx.fillStyle = AMBER;
    ctx.fillRect(cx + 2, y(b.points[i].value), barWidth, box.bottom - y(b.points[i].value));
    ctx.fillStyle = INK;
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.value), cx - barWidth / 2 - 2, y(p.value) - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), cx, box.bottom + 8);
  });
  // Legend, drawn under the title area is crowded; put it at top-right.
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
