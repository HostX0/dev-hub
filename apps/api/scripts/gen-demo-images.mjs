// Generates stylised "website screenshot" SVG mockups used as demo images for seeded projects.
// Run: node scripts/gen-demo-images.mjs  -> writes to uploads/seed/*.svg
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'uploads', 'seed');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;

const themes = {
  ecommerce: { bg: '#0b0f19', panel: '#111827', accent: '#f97316', accent2: '#fb923c', text: '#e5e7eb', muted: '#374151' },
  dashboard: { bg: '#0a0a0f', panel: '#13131c', accent: '#8b5cf6', accent2: '#22d3ee', text: '#e5e7eb', muted: '#2a2a3a' },
  booking: { bg: '#f8fafc', panel: '#ffffff', accent: '#0ea5e9', accent2: '#14b8a6', text: '#0f172a', muted: '#e2e8f0' },
  realestate: { bg: '#0f1412', panel: '#171f1b', accent: '#10b981', accent2: '#a3e635', text: '#ecfdf5', muted: '#243029' },
  mobile: { bg: '#120b1f', panel: '#1b1030', accent: '#ec4899', accent2: '#a855f7', text: '#fdf2f8', muted: '#2d1b4d' },
  erp: { bg: '#f5f7fb', panel: '#ffffff', accent: '#2563eb', accent2: '#f59e0b', text: '#0f172a', muted: '#e5e7eb' },
  ai: { bg: '#070b14', panel: '#0f172a', accent: '#6366f1', accent2: '#22d3ee', text: '#e2e8f0', muted: '#1e293b' },
  automation: { bg: '#0a0e0c', panel: '#111a15', accent: '#10b981', accent2: '#f59e0b', text: '#ecfdf5', muted: '#22332b' },
};

const rect = (x, y, w, h, fill, r = 8, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const text = (x, y, s, size, fill, weight = 600, anchor = 'start') =>
  `<text x="${x}" y="${y}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
const line = (x, y, w, fill, h = 10, r = 5) => rect(x, y, w, h, fill, r);
const circle = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;

const defs = (t, id) => `
<defs>
  <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${t.accent}"/><stop offset="100%" stop-color="${t.accent2}"/>
  </linearGradient>
  <radialGradient id="glow${id}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${t.accent}" stop-opacity="0.55"/><stop offset="100%" stop-color="${t.accent}" stop-opacity="0"/>
  </radialGradient>
  <filter id="sh${id}" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000" flood-opacity="0.25"/></filter>
</defs>`;

const wrap = (t, id, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs(t, id)}${rect(0, 0, W, H, t.bg, 0)}${body}</svg>`;

function navbar(t, brand, dark = true) {
  const parts = [rect(0, 0, W, 72, t.panel, 0)];
  parts.push(rect(56, 22, 28, 28, `url(#g${brand})`, 8));
  parts.push(text(96, 46, brand, 22, t.text, 700));
  let x = 620;
  for (let i = 0; i < 5; i++) {
    parts.push(line(x, 32, 70 + (i % 3) * 14, i === 0 ? t.accent : dark ? '#4b5563' : '#94a3b8', 10, 5));
    x += 120;
  }
  parts.push(rect(1380, 20, 164, 34, `url(#g${brand})`, 17));
  return parts.join('');
}

function productCard(t, x, y, w, h, i) {
  const img = `<rect x="${x}" y="${y}" width="${w}" height="${h * 0.62}" rx="14" fill="url(#g${'shop'})" opacity="${0.35 + (i % 3) * 0.2}"/>`;
  return [
    rect(x, y, w, h, t.panel, 14, `filter="url(#shshop)"`),
    img,
    line(x + 18, y + h * 0.62 + 24, w * 0.6, t.text, 12, 6),
    line(x + 18, y + h * 0.62 + 48, w * 0.35, '#6b7280', 9, 4),
    rect(x + w - 82, y + h - 42, 64, 26, t.accent, 13),
  ].join('');
}

function ecommerce(t) {
  const id = 'shop';
  const b = [];
  b.push(navbar(t, id));
  b.push(circle(1250, 300, 320, `url(#glow${id})`));
  b.push(text(90, 210, 'Summer', 84, t.text, 800));
  b.push(text(90, 300, 'Collection', 84, `url(#g${id})`, 800));
  b.push(line(90, 340, 420, '#6b7280', 12));
  b.push(line(90, 366, 360, '#6b7280', 12));
  b.push(rect(90, 410, 190, 56, `url(#g${id})`, 28));
  b.push(rect(300, 410, 170, 56, 'none', 28, `stroke="#374151" stroke-width="2"`));
  b.push(rect(900, 120, 560, 340, t.panel, 24, `filter="url(#sh${id})"`));
  b.push(rect(940, 160, 480, 220, `url(#g${id})`, 18));
  b.push(line(940, 410, 200, t.text, 12));
  b.push(rect(1290, 400, 130, 36, t.accent, 18));
  const cols = 4;
  const cw = 330;
  const gap = 32;
  const startX = 90;
  for (let i = 0; i < cols; i++) b.push(productCard(t, startX + i * (cw + gap), 560, cw, 380, i));
  return wrap(t, id, b.join(''));
}

function dashboard(t) {
  const id = 'dash';
  const b = [];
  b.push(rect(0, 0, 260, H, t.panel, 0));
  b.push(rect(40, 36, 30, 30, `url(#g${id})`, 8));
  b.push(text(84, 59, 'Nova', 22, t.text, 700));
  for (let i = 0; i < 8; i++) {
    b.push(rect(28, 120 + i * 58, 204, 42, i === 1 ? t.muted : 'none', 12));
    b.push(circle(54, 141 + i * 58, 8, i === 1 ? t.accent : '#4b5563'));
    b.push(line(76, 136 + i * 58, 90 + (i % 4) * 18, i === 1 ? t.text : '#6b7280', 10));
  }
  b.push(text(310, 78, 'Overview', 34, t.text, 700));
  b.push(rect(1200, 42, 140, 40, t.panel, 20));
  b.push(rect(1360, 42, 180, 40, `url(#g${id})`, 20));
  const kpis = ['Revenue', 'Users', 'Orders', 'Growth'];
  kpis.forEach((k, i) => {
    const x = 310 + i * 310;
    b.push(rect(x, 120, 280, 130, t.panel, 18));
    b.push(text(x + 24, 158, k, 16, '#9ca3af', 500));
    b.push(text(x + 24, 210, ['$84.2k', '12,480', '3,204', '+24%'][i], 34, t.text, 800));
    b.push(line(x + 24, 226, 60 + i * 20, i === 3 ? t.accent2 : t.accent, 6, 3));
  });
  b.push(rect(310, 290, 830, 400, t.panel, 20));
  b.push(text(340, 330, 'Revenue over time', 18, t.text, 600));
  const bars = 18;
  for (let i = 0; i < bars; i++) {
    const h = 60 + Math.abs(Math.sin(i * 0.9)) * 240;
    b.push(rect(350 + i * 43, 660 - h, 26, h, i === bars - 2 ? `url(#g${id})` : t.muted, 6));
  }
  b.push(rect(1170, 290, 370, 400, t.panel, 20));
  b.push(text(1200, 330, 'Traffic', 18, t.text, 600));
  b.push(`<circle cx="1355" cy="500" r="110" fill="none" stroke="${t.muted}" stroke-width="28"/>`);
  b.push(`<circle cx="1355" cy="500" r="110" fill="none" stroke="url(#g${id})" stroke-width="28" stroke-dasharray="480 700" stroke-linecap="round" transform="rotate(-90 1355 500)"/>`);
  b.push(text(1355, 512, '68%', 36, t.text, 800, 'middle'));
  b.push(rect(310, 720, 1230, 250, t.panel, 20));
  for (let r = 0; r < 4; r++) {
    const y = 760 + r * 50;
    b.push(circle(350, y + 6, 12, r % 2 ? t.accent2 : t.accent));
    b.push(line(380, y, 180, t.text, 10));
    b.push(line(700, y, 120, '#6b7280', 10));
    b.push(line(950, y, 90, '#6b7280', 10));
    b.push(rect(1400, y - 8, 90, 26, r % 3 === 0 ? '#065f46' : t.muted, 13));
  }
  return wrap(t, id, b.join(''));
}

function booking(t) {
  const id = 'book';
  const b = [];
  b.push(navbar(t, id, false));
  b.push(text(80, 170, 'Book your appointment', 48, t.text, 800));
  b.push(line(80, 200, 380, '#94a3b8', 12));
  b.push(rect(80, 250, 900, 660, t.panel, 24, `filter="url(#sh${id})"`));
  b.push(text(120, 305, 'September 2026', 22, t.text, 700));
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  days.forEach((d, i) => b.push(text(160 + i * 115, 360, d, 16, '#94a3b8', 600, 'middle')));
  let n = 1;
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 7; c++) {
      if (n > 30) break;
      const x = 120 + c * 115;
      const y = 385 + r * 95;
      const sel = n === 14;
      const busy = [3, 9, 20, 25].includes(n);
      b.push(rect(x, y, 80, 76, sel ? `url(#g${id})` : busy ? '#f1f5f9' : 'none', 14, sel ? '' : `stroke="${t.muted}" stroke-width="2"`));
      b.push(text(x + 40, y + 46, String(n), 20, sel ? '#fff' : t.text, 600, 'middle'));
      n++;
    }
  b.push(rect(1020, 250, 500, 660, t.panel, 24, `filter="url(#sh${id})"`));
  b.push(text(1060, 305, 'Available slots', 22, t.text, 700));
  for (let i = 0; i < 6; i++) {
    const y = 340 + i * 70;
    b.push(rect(1060, y, 420, 52, i === 2 ? `url(#g${id})` : '#f8fafc', 14, i === 2 ? '' : `stroke="${t.muted}" stroke-width="2"`));
    b.push(text(1084, y + 33, `${9 + i}:00 - ${10 + i}:00`, 18, i === 2 ? '#fff' : t.text, 600));
  }
  b.push(rect(1060, 790, 420, 64, t.accent, 32));
  b.push(text(1270, 831, 'Confirm booking', 20, '#fff', 700, 'middle'));
  return wrap(t, id, b.join(''));
}

function realestate(t) {
  const id = 're';
  const b = [];
  b.push(navbar(t, id));
  b.push(rect(0, 72, W, 520, `url(#g${id})`, 0, 'opacity="0.18"'));
  b.push(circle(1200, 330, 380, `url(#glow${id})`));
  b.push(text(80, 260, 'Find your', 88, t.text, 800));
  b.push(text(80, 355, 'dream home', 88, `url(#g${id})`, 800));
  b.push(rect(80, 420, 980, 84, t.panel, 42, `filter="url(#sh${id})"`));
  [100, 360, 620].forEach((x, i) => b.push(line(x + 30, 456, 150, i === 0 ? t.text : '#6b7280', 12)));
  b.push(rect(880, 432, 160, 60, t.accent, 30));
  for (let i = 0; i < 3; i++) {
    const x = 80 + i * 480;
    b.push(rect(x, 640, 450, 320, t.panel, 20, `filter="url(#sh${id})"`));
    b.push(rect(x, 640, 450, 200, `url(#g${id})`, 20, `opacity="${0.5 + i * 0.2}"`));
    b.push(rect(x + 20, 660, 90, 30, '#000', 15, 'opacity="0.5"'));
    b.push(line(x + 24, 870, 220, t.text, 12));
    b.push(line(x + 24, 896, 150, '#6b7280', 9));
    b.push(text(x + 426, 900, ['$420k', '$1.2M', '$780k'][i], 24, t.accent2, 800, 'end'));
  }
  return wrap(t, id, b.join(''));
}

function mobile(t) {
  const id = 'mob';
  const b = [];
  b.push(circle(800, 500, 520, `url(#glow${id})`));
  const phone = (x, y, s, variant) => {
    const w = 300 * s;
    const h = 620 * s;
    const p = [];
    p.push(rect(x, y, w, h, '#0b0b12', 44 * s, `stroke="#2a2a3a" stroke-width="${6 * s}" filter="url(#sh${id})"`));
    p.push(rect(x + 14 * s, y + 14 * s, w - 28 * s, h - 28 * s, t.panel, 34 * s));
    p.push(rect(x + w / 2 - 50 * s, y + 24 * s, 100 * s, 22 * s, '#0b0b12', 11 * s));
    if (variant === 0) {
      p.push(rect(x + 34 * s, y + 90 * s, w - 68 * s, 160 * s, `url(#g${id})`, 22 * s));
      for (let i = 0; i < 4; i++) {
        p.push(rect(x + 34 * s, y + (280 + i * 78) * s, w - 68 * s, 62 * s, t.muted, 16 * s));
        p.push(circle(x + 62 * s, y + (311 + i * 78) * s, 16 * s, t.accent));
        p.push(line(x + 92 * s, y + (301 + i * 78) * s, 120 * s, t.text, 9 * s));
        p.push(line(x + 92 * s, y + (320 + i * 78) * s, 80 * s, '#7c6a9c', 7 * s));
      }
    } else if (variant === 1) {
      p.push(text(x + 34 * s, y + 120 * s, 'Order', 30 * s, t.text, 800));
      p.push(rect(x + 34 * s, y + 150 * s, w - 68 * s, 220 * s, `url(#g${id})`, 22 * s, 'opacity="0.85"'));
      p.push(line(x + 34 * s, y + 410 * s, 160 * s, t.text, 12 * s));
      p.push(line(x + 34 * s, y + 440 * s, 110 * s, '#7c6a9c', 8 * s));
      p.push(rect(x + 34 * s, y + 520 * s, w - 68 * s, 56 * s, t.accent, 28 * s));
    } else {
      p.push(`<path d="M${x + 40 * s} ${y + 260 * s} L${x + 90 * s} ${y + 200 * s} L${x + 150 * s} ${y + 240 * s} L${x + 210 * s} ${y + 150 * s} L${x + 260 * s} ${y + 180 * s}" fill="none" stroke="url(#g${id})" stroke-width="${8 * s}" stroke-linecap="round"/>`);
      for (let i = 0; i < 3; i++) p.push(rect(x + (34 + i * 82) * s, y + 320 * s, 70 * s, 70 * s, t.muted, 16 * s));
      for (let i = 0; i < 3; i++) p.push(rect(x + 34 * s, y + (420 + i * 52) * s, w - 68 * s, 40 * s, t.muted, 12 * s));
    }
    p.push(rect(x + w / 2 - 60 * s, y + h - 30 * s, 120 * s, 6 * s, '#3a3a4a', 3 * s));
    return p.join('');
  };
  b.push(phone(330, 240, 0.85, 0));
  b.push(phone(650, 150, 1.05, 1));
  b.push(phone(1010, 240, 0.85, 2));
  b.push(text(800, 96, 'FoodGo', 44, t.text, 800, 'middle'));
  return wrap(t, id, b.join(''));
}

function erp(t) {
  const id = 'erp';
  const b = [];
  b.push(rect(0, 0, 240, H, '#0f172a', 0));
  b.push(rect(36, 34, 30, 30, `url(#g${id})`, 8));
  b.push(text(80, 57, 'StockPro', 20, '#fff', 700));
  for (let i = 0; i < 9; i++) {
    b.push(rect(20, 110 + i * 56, 200, 42, i === 2 ? '#1e293b' : 'none', 12));
    b.push(line(52, 126 + i * 56, 80 + (i % 3) * 22, i === 2 ? '#fff' : '#94a3b8', 10));
  }
  b.push(rect(240, 0, W - 240, 70, t.panel, 0, `stroke="${t.muted}" stroke-width="1"`));
  b.push(text(280, 45, 'Inventory', 26, t.text, 700));
  b.push(rect(1300, 17, 230, 36, `url(#g${id})`, 18));
  const kp = ['In stock', 'Low stock', 'Orders today', 'Sales'];
  kp.forEach((k, i) => {
    const x = 280 + i * 315;
    b.push(rect(x, 100, 290, 120, t.panel, 16, `filter="url(#sh${id})"`));
    b.push(text(x + 24, 138, k, 15, '#64748b', 500));
    b.push(text(x + 24, 190, ['4,812', '37', '126', '$18.4k'][i], 32, t.text, 800));
    b.push(circle(x + 250, 160, 22, i === 1 ? '#fef3c7' : '#dbeafe'));
  });
  b.push(rect(280, 250, 1250, 700, t.panel, 16, `filter="url(#sh${id})"`));
  b.push(rect(280, 250, 1250, 56, '#f8fafc', 16));
  ['SKU', 'Product', 'Category', 'Qty', 'Price', 'Status'].forEach((h, i) =>
    b.push(text(310 + i * 205, 285, h, 14, '#64748b', 700)),
  );
  for (let r = 0; r < 11; r++) {
    const y = 340 + r * 56;
    b.push(line(310, y, 90, '#94a3b8', 10));
    b.push(rect(515, y - 10, 30, 30, `url(#g${id})`, 8, `opacity="${0.3 + (r % 5) * 0.15}"`));
    b.push(line(555, y, 120, t.text, 10));
    b.push(line(720, y, 80, '#94a3b8', 10));
    b.push(text(925, y + 10, String(120 - r * 9), 16, t.text, 600));
    b.push(text(1130, y + 10, `$${(24 + r * 7).toFixed(2)}`, 16, t.text, 600));
    b.push(rect(1335, y - 8, 96, 26, r % 4 === 1 ? '#fef3c7' : '#dcfce7', 13));
    b.push(`<line x1="300" y1="${y + 28}" x2="1510" y2="${y + 28}" stroke="${t.muted}" stroke-width="1"/>`);
  }
  return wrap(t, id, b.join(''));
}

// A "detail / secondary page" variant for galleries: simple article layout with theme colors.
function detailPage(t, id, title) {
  const b = [];
  b.push(navbar(t, id, t.bg.startsWith('#0') || t.bg.startsWith('#1')));
  b.push(text(80, 180, title, 56, t.text, 800));
  b.push(line(80, 215, 520, '#6b7280', 12));
  b.push(rect(80, 270, 960, 540, `url(#g${id})`, 24, 'opacity="0.75"'));
  b.push(rect(1080, 270, 440, 260, t.panel, 20, `filter="url(#sh${id})"`));
  for (let i = 0; i < 5; i++) b.push(line(1110, 310 + i * 44, 200 + (i % 3) * 60, i === 0 ? t.text : '#6b7280', 11));
  b.push(rect(1080, 560, 440, 250, t.panel, 20, `filter="url(#sh${id})"`));
  b.push(rect(1110, 600, 380, 56, t.accent, 28));
  b.push(rect(1110, 676, 380, 56, 'none', 28, `stroke="#4b5563" stroke-width="2"`));
  for (let i = 0; i < 3; i++) b.push(line(80, 860 + i * 34, 900 - i * 200, '#6b7280', 12));
  return wrap(t, id, b.join(''));
}

// AI customer-support assistant: sidebar with conversations, chat thread with bubbles and RAG citations, knowledge-base panel.
function aiAssistant(t) {
  const id = 'ai';
  const b = [];
  b.push(circle(1100, 120, 420, `url(#glow${id})`));
  // Sidebar: conversations
  b.push(rect(0, 0, 280, H, t.panel, 0));
  b.push(rect(36, 34, 30, 30, `url(#g${id})`, 8));
  b.push(text(80, 57, 'Sahab AI', 22, t.text, 700));
  b.push(rect(28, 100, 224, 44, `url(#g${id})`, 12));
  b.push(text(140, 129, '+  New conversation', 15, '#fff', 700, 'middle'));
  for (let i = 0; i < 9; i++) {
    const y = 176 + i * 62;
    b.push(rect(28, y, 224, 50, i === 0 ? t.muted : 'none', 12));
    b.push(circle(52, y + 25, 9, i % 3 === 0 ? t.accent : i % 3 === 1 ? t.accent2 : '#475569'));
    b.push(line(72, y + 15, 100 + (i % 3) * 28, i === 0 ? t.text : '#94a3b8', 9));
    b.push(line(72, y + 31, 60 + (i % 4) * 22, '#475569', 7));
  }
  // Chat header
  b.push(rect(280, 0, 900, 72, t.panel, 0, 'opacity="0.7"'));
  b.push(circle(322, 36, 18, `url(#g${id})`));
  b.push(text(354, 43, 'Support Assistant', 20, t.text, 700));
  b.push(circle(546, 37, 6, '#22c55e'));
  b.push(text(560, 42, 'Online · replies in seconds', 14, '#94a3b8', 500));
  b.push(rect(930, 20, 106, 32, '#064e3b', 16));
  b.push(text(983, 41, 'WhatsApp', 14, '#6ee7b7', 600, 'middle'));
  b.push(rect(1050, 20, 106, 32, t.muted, 16));
  b.push(text(1103, 41, 'Web widget', 14, t.text, 600, 'middle'));
  // Chat bubbles
  const bubble = (y, w, h, mine, rows, label) => {
    const x = mine ? 1140 - w : 342;
    const p = [];
    if (!mine) p.push(circle(312, y + 24, 14, `url(#g${id})`));
    p.push(rect(x, y, w, h, mine ? `url(#g${id})` : t.panel, 20, mine ? `filter="url(#sh${id})"` : `stroke="${t.muted}" stroke-width="1.5"`));
    let ty = y + 24;
    if (label) {
      p.push(text(x + 22, ty + 8, label, 17, mine ? '#fff' : t.text, 600));
      ty += 30;
    }
    rows.forEach((rw, i) => p.push(line(x + 22, ty + i * 22, rw, mine ? 'rgba(255,255,255,0.85)' : '#94a3b8', 9)));
    return p.join('');
  };
  b.push(bubble(104, 520, 64, false, [], 'Hi! How can I help you today?'));
  b.push(bubble(190, 430, 64, true, [], 'Where is my order #48213?'));
  b.push(bubble(276, 640, 168, false, [300, 500, 420], 'Your order shipped yesterday and arrives tomorrow.'));
  // Source chips (RAG citations)
  ['orders.db', 'shipping-policy.pdf'].forEach((s, i) => {
    const x = 364 + i * 190;
    b.push(rect(x, 396, 170, 30, t.muted, 15));
    b.push(circle(x + 18, 411, 6, t.accent2));
    b.push(text(x + 32, 416, s, 13, '#cbd5e1', 500));
  });
  b.push(bubble(468, 470, 64, true, [], 'هل يمكنني تغيير عنوان التوصيل؟'));
  b.push(bubble(554, 660, 128, false, [520, 360], 'أكيد! أرسل لي العنوان الجديد وسأحدّثه فوراً.'));
  // Typing indicator
  b.push(circle(312, 728, 14, `url(#g${id})`));
  b.push(rect(342, 704, 96, 48, t.panel, 20, `stroke="${t.muted}" stroke-width="1.5"`));
  [0, 1, 2].forEach((i) => b.push(circle(370 + i * 20, 728, 6, i === 1 ? t.accent : '#475569')));
  // Composer
  b.push(rect(320, 880, 820, 64, t.panel, 32, `stroke="${t.muted}" stroke-width="2"`));
  b.push(line(348, 907, 300, '#475569', 10));
  b.push(rect(1072, 890, 56, 44, `url(#g${id})`, 22));
  b.push(`<path d="M1092 912 L1112 912 M1104 904 L1112 912 L1104 920" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
  // Right panel: knowledge base + metrics
  b.push(rect(1180, 0, 420, H, t.panel, 0, 'opacity="0.85"'));
  b.push(text(1216, 57, 'Knowledge base', 20, t.text, 700));
  b.push(rect(1470, 30, 96, 34, `url(#g${id})`, 17));
  b.push(text(1518, 52, 'Sync', 14, '#fff', 700, 'middle'));
  for (let i = 0; i < 6; i++) {
    const y = 100 + i * 78;
    b.push(rect(1216, y, 350, 62, t.muted, 14));
    b.push(rect(1232, y + 15, 32, 32, `url(#g${id})`, 8, `opacity="${0.45 + (i % 3) * 0.2}"`));
    b.push(line(1280, y + 20, 150 + (i % 3) * 30, t.text, 9));
    b.push(line(1280, y + 38, 90 + (i % 4) * 20, '#64748b', 7));
    b.push(text(1548, y + 38, `${12 + i * 7}p`, 12, '#64748b', 500, 'end'));
  }
  b.push(rect(1216, 600, 350, 150, t.muted, 18));
  b.push(text(1240, 636, 'Resolved automatically', 15, '#94a3b8', 500));
  b.push(text(1240, 690, '82%', 40, t.text, 800));
  b.push(rect(1240, 712, 302, 10, '#0b1220', 5));
  b.push(rect(1240, 712, 248, 10, `url(#g${id})`, 5));
  b.push(rect(1216, 770, 350, 150, t.muted, 18));
  b.push(text(1240, 806, 'Avg. response time', 15, '#94a3b8', 500));
  b.push(text(1240, 860, '2.4s', 40, t.text, 800));
  b.push(text(1542, 860, '↓ 96%', 18, '#22c55e', 700, 'end'));
  return wrap(t, id, b.join(''));
}

// Automation workflow canvas: node palette, connected nodes with gradient edges, executions log.
function automation(t) {
  const id = 'auto';
  const b = [];
  b.push(`<defs>
  <pattern id="grid${id}" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="${t.muted}"/></pattern>
  <linearGradient id="edge${id}" gradientUnits="userSpaceOnUse" x1="220" y1="0" x2="1600" y2="0"><stop offset="0%" stop-color="${t.accent}"/><stop offset="100%" stop-color="${t.accent2}"/></linearGradient>
</defs>`);
  b.push(rect(220, 72, W - 220, H - 72, `url(#grid${id})`, 0));
  b.push(circle(900, 420, 460, `url(#glow${id})`));
  // Top bar
  b.push(rect(0, 0, W, 72, t.panel, 0));
  b.push(rect(36, 21, 30, 30, `url(#g${id})`, 8));
  b.push(text(80, 45, 'Qawafil Flows', 22, t.text, 700));
  b.push(text(420, 45, 'Order → Invoice', 20, t.text, 600));
  b.push(rect(620, 24, 84, 26, '#064e3b', 13));
  b.push(circle(638, 37, 5, '#22c55e'));
  b.push(text(670, 42, 'Active', 13, '#6ee7b7', 700, 'middle'));
  b.push(rect(1300, 18, 110, 36, 'none', 18, `stroke="${t.muted}" stroke-width="2"`));
  b.push(text(1355, 42, 'History', 14, t.text, 600, 'middle'));
  b.push(rect(1430, 18, 134, 36, `url(#g${id})`, 18));
  b.push(text(1497, 42, 'Run flow', 14, '#fff', 700, 'middle'));
  // Left palette
  b.push(rect(0, 72, 220, H - 72, t.panel, 0));
  b.push(text(24, 116, 'NODES', 12, '#64748b', 700));
  ['WhatsApp', 'Email', 'HTTP', 'ERP', 'Database', 'PDF', 'AI Agent', 'Slack', 'Sheets'].forEach((n, i) => {
    const y = 140 + i * 58;
    b.push(rect(16, y, 188, 44, i === 3 ? t.muted : 'none', 12));
    b.push(rect(28, y + 10, 24, 24, i % 2 ? t.accent2 : t.accent, 7, `opacity="${0.5 + (i % 3) * 0.2}"`));
    b.push(text(64, y + 28, n, 15, i === 3 ? t.text : '#94a3b8', 600));
  });
  // Nodes & edges
  const NW = 240;
  const NH = 96;
  const port = (cx, cy) => circle(cx, cy, 7, t.panel) + `<circle cx="${cx}" cy="${cy}" r="7" fill="none" stroke="${t.accent}" stroke-width="2.5"/>`;
  const node = (x, y, title, sub, color, selected = false) =>
    [
      rect(x, y, NW, NH, t.panel, 16, `stroke="${selected ? t.accent : t.muted}" stroke-width="${selected ? 3 : 2}" filter="url(#sh${id})"`),
      rect(x + 16, y + 24, 48, 48, color, 12),
      text(x + 78, y + 44, title, 16, t.text, 700),
      text(x + 78, y + 68, sub, 12, '#64748b', 500),
      port(x, y + NH / 2),
      port(x + NW, y + NH / 2),
      circle(x + NW - 18, y + 18, 8, '#22c55e'),
    ].join('');
  const edge = (x1, y1, x2, y2) => {
    const dx = Math.max(60, (x2 - x1) / 2);
    const d = `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    return (
      `<path d="${d}" fill="none" stroke="url(#edge${id})" stroke-width="4" stroke-linecap="round" opacity="0.9"/>` +
      `<path d="${d}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 18" stroke-linecap="round" opacity="0.45"/>`
    );
  };
  const vedge = (x1, y1, x2, y2) => {
    const dy = Math.max(40, (y2 - y1) / 2);
    return `<path d="M${x1} ${y1} C${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}" fill="none" stroke="url(#edge${id})" stroke-width="4" stroke-linecap="round" opacity="0.9"/>`;
  };
  const N = {
    trigger: [270, 230, 'WhatsApp Order', 'Trigger · new message', '#25d366'],
    extract: [570, 230, 'AI · Extract Order', 'Agent · Claude', t.accent2],
    erp: [870, 230, 'ERP · Create Order', 'HTTP · REST API', t.accent],
    invoice: [870, 440, 'Generate Invoice', 'PDF · template', '#6366f1'],
    email: [1200, 350, 'Email Invoice', 'SMTP · customer', '#0ea5e9'],
    wa: [1200, 530, 'WhatsApp Notify', 'Cloud API · template', '#25d366'],
    dash: [1200, 710, 'Update Dashboard', 'PostgreSQL · insert', '#ec4899'],
  };
  const out = (k) => [N[k][0] + NW, N[k][1] + NH / 2];
  const inp = (k) => [N[k][0], N[k][1] + NH / 2];
  [
    ['trigger', 'extract'],
    ['extract', 'erp'],
    ['invoice', 'email'],
    ['invoice', 'wa'],
    ['invoice', 'dash'],
  ].forEach(([a, c]) => b.push(edge(...out(a), ...inp(c))));
  b.push(vedge(N.erp[0] + NW / 2, N.erp[1] + NH, N.invoice[0] + NW / 2, N.invoice[1]));
  Object.entries(N).forEach(([k, [x, y, title, sub, color]]) => b.push(node(x, y, title, sub, color, k === 'invoice')));
  b.push(port(N.erp[0] + NW / 2, N.erp[1] + NH));
  b.push(port(N.invoice[0] + NW / 2, N.invoice[1]));
  // Executions log
  b.push(rect(250, 840, 1320, 130, t.panel, 18, `stroke="${t.muted}" stroke-width="2"`));
  b.push(text(276, 874, 'Recent executions', 15, t.text, 700));
  b.push(text(1544, 874, '1,284 runs today · 99.6% success', 13, '#94a3b8', 500, 'end'));
  [0, 1].forEach((r) => {
    const y = 912 + r * 30;
    b.push(circle(286, y, 6, '#22c55e'));
    b.push(text(304, y + 5, `#${8421 - r}`, 13, '#94a3b8', 600));
    b.push(line(380, y - 4, 220, '#475569', 8));
    b.push(line(640, y - 4, 140, '#475569', 8));
    b.push(rect(1380, y - 11, 84, 22, '#064e3b', 11));
    b.push(text(1422, y + 4, 'Success', 11, '#6ee7b7', 700, 'middle'));
    b.push(text(1544, y + 5, r === 0 ? '1.8s' : '2.1s', 13, t.text, 600, 'end'));
  });
  return wrap(t, id, b.join(''));
}

const files = {
  'ecommerce-cover.svg': ecommerce(themes.ecommerce),
  'ecommerce-detail.svg': detailPage(themes.ecommerce, 'shop', 'Product details'),
  'dashboard-cover.svg': dashboard(themes.dashboard),
  'dashboard-detail.svg': detailPage(themes.dashboard, 'dash', 'Reports & insights'),
  'booking-cover.svg': booking(themes.booking),
  'booking-detail.svg': detailPage(themes.booking, 'book', 'Doctor profile'),
  'realestate-cover.svg': realestate(themes.realestate),
  'realestate-detail.svg': detailPage(themes.realestate, 're', 'Property listing'),
  'mobile-cover.svg': mobile(themes.mobile),
  'mobile-detail.svg': detailPage(themes.mobile, 'mob', 'Restaurant menu'),
  'erp-cover.svg': erp(themes.erp),
  'erp-detail.svg': detailPage(themes.erp, 'erp', 'Purchase orders'),
  'ai-cover.svg': aiAssistant(themes.ai),
  'ai-detail.svg': detailPage(themes.ai, 'ai', 'Knowledge base'),
  'automation-cover.svg': automation(themes.automation),
  'automation-detail.svg': detailPage(themes.automation, 'auto', 'Execution logs'),
};


// ---------------------------------------------------------------------------
// v2 (Iraqi portfolio) mockups — Arabic RTL helpers
// ---------------------------------------------------------------------------
// NOTE on anchoring: SVG text-anchor is *logical*. With direction="rtl", text-anchor="start"
// puts the RIGHT edge of the run at x (right-aligned, what an RTL UI wants) and
// text-anchor="end" puts the LEFT edge at x. Verified in Chromium and Gecko.
const AR_FONT = 'Segoe UI, Tahoma, Noto Sans Arabic, Arial, sans-serif';
const ar = (x, y, s, size, fill, weight = 600, align = 'right', extra = '') => {
  const anchor = align === 'right' ? 'start' : align === 'left' ? 'end' : 'middle';
  return `<text x="${x}" y="${y}" direction="rtl" text-anchor="${anchor}" font-family="${AR_FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${s}</text>`;
};
// Latin/numeric text in the Arabic UI font (left-to-right, physical anchor).
const lt = (x, y, s, size, fill, weight = 600, anchor = 'start') =>
  `<text x="${x}" y="${y}" font-family="${AR_FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;

const themes2 = {
  law: { bg: '#0b1526', panel: '#12203a', accent: '#c9a227', accent2: '#e8cf7a', text: '#f5eedc', muted: '#1f3152', sub: '#9aa8c2' },
  lawDash: { bg: '#f3f4f8', panel: '#ffffff', accent: '#0f1f3d', accent2: '#c9a227', text: '#0f172a', muted: '#e5e7ee', sub: '#64748b' },
  souq: { bg: '#fff8f1', panel: '#ffffff', accent: '#ea580c', accent2: '#dc2626', text: '#1c1210', muted: '#fde8d8', sub: '#7c6a62' },
  souqAdmin: { bg: '#150d0a', panel: '#221511', accent: '#f97316', accent2: '#ef4444', text: '#fff3ea', muted: '#3a2219', sub: '#b59a8e' },
  souqApp: { bg: '#1b0f0b', panel: '#ffffff', accent: '#f97316', accent2: '#e11d48', text: '#1c1210', muted: '#fff1e6', sub: '#8b7a72' },
  dijla: { bg: '#f3f7fb', panel: '#ffffff', accent: '#0d9488', accent2: '#4f46e5', text: '#0f172a', muted: '#e2e8f0', sub: '#64748b' },
  ayadati: { bg: '#f0fdfa', panel: '#ffffff', accent: '#14b8a6', accent2: '#10b981', text: '#0f172a', muted: '#e6f6f3', sub: '#6b7c78' },
  rawatib: { bg: '#f1f5f9', panel: '#ffffff', accent: '#2563eb', accent2: '#0ea5e9', text: '#0f172a', muted: '#e2e8f0', sub: '#64748b' },
  kashier: { bg: '#0b0f0a', panel: '#151b13', accent: '#a3e635', accent2: '#65a30d', text: '#f1f5e9', muted: '#243020', sub: '#93a38a' },
};

const isDark = (t) => ['#0', '#1'].includes(t.bg.slice(0, 2));

// RTL website navbar: brand on the right, links flowing right-to-left, CTA on the left.
function rtlNavbar(t, brand, links, cta, opts = {}) {
  const id = opts.id;
  const p = [rect(0, 0, W, 76, opts.bar ?? t.panel, 0, isDark(t) ? '' : `stroke="${t.muted}" stroke-width="1"`)];
  p.push(rect(W - 92, 22, 32, 32, `url(#g${id})`, 9));
  p.push(ar(W - 106, 49, brand, 22, opts.brandColor ?? t.text, 700));
  let x = W - 420;
  links.forEach((l, i) => {
    p.push(ar(x, 47, l, 17, i === 0 ? t.accent : (opts.link ?? t.sub), i === 0 ? 700 : 500));
    x -= 110 + l.length * 4;
  });
  p.push(rect(56, 20, 176, 38, `url(#g${id})`, 19));
  p.push(ar(144, 45, cta, 15, opts.ctaText ?? '#fff', 700, 'center'));
  return p.join('');
}

// RTL dashboard shell: sidebar on the RIGHT, top bar to its left. Returns [svg, contentRight, contentLeft].
function rtlShell(t, id, brand, items, active, title, opts = {}) {
  const SW = 264;
  const p = [];
  const sideBg = opts.sideBg ?? t.panel;
  const sideText = opts.sideText ?? t.text;
  const sideSub = opts.sideSub ?? t.sub;
  p.push(rect(W - SW, 0, SW, H, sideBg, 0));
  p.push(rect(W - 72, 34, 34, 34, `url(#g${id})`, 9));
  p.push(ar(W - 86, 59, brand, 21, sideText, 700));
  items.forEach((it, i) => {
    const y = 120 + i * 56;
    const on = i === active;
    p.push(rect(W - SW + 20, y, SW - 40, 42, on ? (opts.activeBg ?? `url(#g${id})`) : 'none', 12));
    p.push(circle(W - SW + 40 + (SW - 40) - 24, y + 21, 5, on ? (opts.activeText ?? '#fff') : sideSub));
    p.push(ar(W - SW + 20 + (SW - 40) - 40, y + 27, it, 15, on ? (opts.activeText ?? '#fff') : sideSub, on ? 700 : 500));
  });
  // user chip at bottom of sidebar
  p.push(rect(W - SW + 20, H - 84, SW - 40, 56, opts.userBg ?? t.muted, 14));
  p.push(circle(W - 54, H - 56, 16, `url(#g${id})`));
  p.push(ar(W - 80, H - 62, opts.user ?? 'المدير العام', 13, sideText, 700));
  p.push(ar(W - 80, H - 42, opts.userSub ?? 'متصل الآن', 11, sideSub, 500));
  // top bar
  const right = W - SW - 32;
  const left = 40;
  p.push(rect(0, 0, W - SW, 72, t.panel, 0, isDark(t) ? '' : `stroke="${t.muted}" stroke-width="1"`));
  p.push(ar(right, 46, title, 24, t.text, 700));
  // search box + actions on the left
  p.push(rect(left, 18, 260, 36, isDark(t) ? t.muted : t.bg, 18, isDark(t) ? '' : `stroke="${t.muted}" stroke-width="1"`));
  p.push(ar(left + 240, 42, 'بحث...', 13, t.sub, 500));
  p.push(rect(left + 280, 18, 38, 36, isDark(t) ? t.muted : t.bg, 12));
  p.push(circle(left + 299, 36, 4, t.accent2));
  return [p.join(''), right, left];
}

function kpi(t, x, y, w, h, label, value, delta, id, color) {
  const p = [rect(x, y, w, h, t.panel, 16, isDark(t) ? '' : `filter="url(#sh${id})"`)];
  p.push(rect(x + w - 4, y + 22, 4, h - 44, color ?? `url(#g${id})`, 2));
  p.push(ar(x + w - 24, y + 38, label, 14, t.sub, 500));
  p.push(ar(x + w - 24, y + 84, value, 30, t.text, 800));
  if (delta) {
    const up = delta.startsWith('+');
    p.push(rect(x + 20, y + h - 40, 84, 24, up ? '#dcfce7' : '#fee2e2', 12));
    p.push(lt(x + 62, y + h - 23, delta, 12, up ? '#15803d' : '#b91c1c', 700, 'middle'));
  }
  return p.join('');
}

// RTL data table: header row + rows; columns are laid out from the right edge.
// cols: [{ w, label }], rows: [[cell...]] where a cell is a string or { s, fill, chip, bold }.
function rtlTable(t, id, x, y, w, cols, rows, opts = {}) {
  const p = [rect(x, y, w, (opts.title ? 56 : 12) + 40 + rows.length * 52 + 16, t.panel, 16, isDark(t) ? '' : `filter="url(#sh${id})"`)];
  if (opts.title) p.push(ar(x + w - 28, y + 36, opts.title, 17, t.text, 700));
  const hy = y + (opts.title ? 56 : 12);
  p.push(rect(x + 12, hy, w - 24, 40, isDark(t) ? t.muted : t.bg, 10));
  let cx = x + w - 28;
  const xs = [];
  cols.forEach((c) => {
    xs.push(cx);
    p.push(ar(cx, hy + 26, c.label, 13, t.sub, 700));
    cx -= c.w;
  });
  rows.forEach((r, ri) => {
    const ry = hy + 40 + ri * 52;
    r.forEach((cell, ci) => {
      const c = typeof cell === 'string' ? { s: cell } : cell;
      if (c.chip) {
        const cw = c.s.length * 9 + 28;
        p.push(rect(xs[ci] - cw, ry + 14, cw, 26, c.chip, 13));
        p.push(ar(xs[ci] - cw / 2, ry + 32, c.s, 12, c.fill ?? '#fff', 700, 'center'));
      } else {
        p.push(ar(xs[ci], ry + 33, c.s, 14, c.fill ?? t.text, c.bold ? 700 : 500));
      }
    });
    p.push(`<line x1="${x + 20}" y1="${ry + 52}" x2="${x + w - 20}" y2="${ry + 52}" stroke="${t.muted}" stroke-width="1"/>`);
  });
  return p.join('');
}

function barChart(t, id, x, y, w, h, title, labels, vals, opts = {}) {
  const p = [rect(x, y, w, h, t.panel, 18, isDark(t) ? '' : `filter="url(#sh${id})"`)];
  p.push(ar(x + w - 28, y + 38, title, 17, t.text, 700));
  if (opts.legend) p.push(ar(x + w - 28, y + 62, opts.legend, 12, t.sub, 500));
  const n = vals.length;
  const gap = 18;
  const bw = Math.min(64, (w - 80 - gap * (n - 1)) / n);
  const base = y + h - 56;
  const maxV = Math.max(...vals);
  for (let g = 0; g < 4; g++) {
    const gy = y + 90 + g * ((base - y - 90) / 4);
    p.push(`<line x1="${x + 30}" y1="${gy}" x2="${x + w - 30}" y2="${gy}" stroke="${t.muted}" stroke-width="1" stroke-dasharray="4 6"/>`);
  }
  vals.forEach((v, i) => {
    const bh = ((base - y - 90) * v) / maxV;
    const bx = x + w - 40 - bw - i * (bw + gap);
    p.push(rect(bx, base - bh, bw, bh, i === (opts.hi ?? n - 1) ? `url(#g${id})` : opts.bar ?? t.muted, 8));
    if (labels[i]) p.push(ar(bx + bw / 2, base + 26, labels[i], 12, t.sub, 500, 'center'));
  });
  return p.join('');
}

function donut(t, id, x, y, w, h, title, segs, centre, centreSub) {
  const p = [rect(x, y, w, h, t.panel, 18, isDark(t) ? '' : `filter="url(#sh${id})"`)];
  p.push(ar(x + w - 28, y + 38, title, 17, t.text, 700));
  const r = Math.min(w / 4.8, (h - 60) / 3);
  const cx = x + w - 40 - r - 12;
  const cy = y + 60 + (h - 60) / 2;
  const C = 2 * Math.PI * r;
  let off = 0;
  p.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${t.muted}" stroke-width="26"/>`);
  segs.forEach((sg) => {
    p.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${sg.color}" stroke-width="26" stroke-dasharray="${C * sg.v} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 ${cx} ${cy})"/>`);
    off += C * sg.v;
  });
  p.push(ar(cx, cy + 8, centre, 28, t.text, 800, 'center'));
  if (centreSub) p.push(ar(cx, cy + 30, centreSub, 12, t.sub, 500, 'center'));
  let ly = cy - (segs.length * 28) / 2 + 10;
  segs.forEach((sg) => {
    p.push(lt(x + 28, ly, `${Math.round(sg.v * 100)}%`, 13, t.text, 700));
    p.push(circle(x + 84, ly - 5, 6, sg.color));
    p.push(ar(x + 98, ly, sg.label, 12, t.sub, 500, 'left'));
    ly += 28;
  });
  return p.join('');
}

// Phone frame with status bar. body(x, y, w, h) draws the screen contents.
function phoneFrame(id, x, y, s, screenBg, body, opts = {}) {
  const w = 320 * s;
  const h = 660 * s;
  const p = [];
  p.push(rect(x, y, w, h, '#0c0c12', 46 * s, `stroke="#2b2b36" stroke-width="${5 * s}" filter="url(#sh${id})"`));
  p.push(rect(x + 12 * s, y + 12 * s, w - 24 * s, h - 24 * s, screenBg, 36 * s));
  // status bar
  p.push(lt(x + 36 * s, y + 46 * s, '9:41', 14 * s, opts.status ?? '#0f172a', 700));
  [0, 1, 2, 3].forEach((i) => p.push(rect(x + w - (70 - i * 8) * s, y + (44 - i * 3) * s, 5 * s, (6 + i * 3) * s, opts.status ?? '#0f172a', 1)));
  p.push(rect(x + w - 40 * s, y + 34 * s, 22 * s, 12 * s, 'none', 3 * s, `stroke="${opts.status ?? '#0f172a'}" stroke-width="${1.5 * s}"`));
  p.push(rect(x + w - 38 * s, y + 36 * s, 14 * s, 8 * s, opts.status ?? '#0f172a', 2 * s));
  p.push(rect(x + w / 2 - 44 * s, y + 24 * s, 88 * s, 24 * s, '#0c0c12', 12 * s));
  p.push(body(x + 12 * s, y + 66 * s, w - 24 * s, h - 100 * s, s));
  p.push(rect(x + w / 2 - 60 * s, y + h - 28 * s, 120 * s, 6 * s, opts.homeBar ?? '#c7c7d1', 3 * s));
  return p.join('');
}

// Bottom tab bar inside a phone screen.
function tabBar(x, y, w, s, labels, active, accent, sub, bg = '#ffffff') {
  const p = [rect(x, y, w, 64 * s, bg, 0)];
  p.push(`<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`);
  const n = labels.length;
  labels.forEach((l, i) => {
    const cx = x + w - (i + 0.5) * (w / n);
    p.push(rect(cx - 10 * s, y + 12 * s, 20 * s, 20 * s, i === active ? accent : '#cbd5e1', 6 * s));
    p.push(ar(cx, y + 50 * s, l, 10 * s, i === active ? accent : sub, i === active ? 700 : 500, 'center'));
  });
  return p.join('');
}


// ---- 1. Al-Rafidain Law Firm — website ------------------------------------
function lawSiteCover(t) {
  const id = 'law';
  const b = [];
  b.push(rtlNavbar(t, 'مكتب الرافدين للمحاماة', ['الرئيسية', 'مجالات الممارسة', 'فريق المحامين', 'المقالات', 'اتصل بنا'], 'احجز استشارة', { id, ctaText: '#0b1526' }));
  b.push(circle(380, 420, 420, `url(#glow${id})`));
  // hero
  b.push(rect(1150, 150, 6, 150, `url(#g${id})`, 3));
  b.push(ar(1120, 200, 'خبرة قانونية تثق بها', 50, t.text, 800));
  b.push(ar(1120, 268, 'في بغداد وعموم العراق', 50, `url(#g${id})`, 800));
  b.push(ar(1120, 330, 'مكتب محاماة واستشارات قانونية يخدم الشركات والأفراد', 17, t.sub, 500));
  b.push(ar(1120, 360, 'في القانون التجاري والعقاري والشركات والتحكيم منذ 2009.', 17, t.sub, 500));
  b.push(rect(920, 410, 200, 56, `url(#g${id})`, 28));
  b.push(ar(1020, 446, 'احجز استشارة مجانية', 16, '#0b1526', 700, 'center'));
  b.push(rect(700, 410, 200, 56, 'none', 28, `stroke="${t.accent}" stroke-width="2"`));
  b.push(ar(800, 446, 'تعرّف على فريقنا', 16, t.accent2, 700, 'center'));
  // hero image card (scales of justice abstract)
  b.push(rect(90, 130, 480, 360, t.panel, 24, `filter="url(#sh${id})"`));
  b.push(rect(110, 150, 440, 320, `url(#g${id})`, 18, 'opacity="0.16"'));
  b.push(`<path d="M330 200 V420 M220 250 H440 M220 250 L180 330 H260 Z M440 250 L400 330 H480 Z M270 420 H390" fill="none" stroke="${t.accent2}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`);
  b.push(rect(120, 420, 210, 46, t.panel, 12));
  b.push(ar(318, 450, 'مسجّل لدى نقابة المحامين', 13, t.accent2, 700));
  // stats strip
  [
    ['+15', 'عاماً من الخبرة'],
    ['+1,200', 'قضية رابحة'],
    ['20', 'محامياً ومستشاراً'],
    ['6', 'محافظات نخدمها'],
  ].forEach(([v, l], i) => {
    const x = 1120 - i * 270;
    b.push(lt(x, 560, v, 34, t.accent2, 800, 'end'));
    b.push(ar(x, 588, l, 14, t.sub, 500));
  });
  // practice areas
  b.push(ar(1510, 660, 'مجالات الممارسة', 30, t.text, 800));
  b.push(ar(1510, 690, 'نقدّم خدمات قانونية متكاملة في مختلف المجالات', 15, t.sub, 500));
  const areas = ['القانون التجاري', 'العقارات والملكية', 'قانون الشركات', 'الأحوال الشخصية', 'التحكيم والتقاضي'];
  areas.forEach((a, i) => {
    const w = 272;
    const x = 1510 - w - i * (w + 24);
    b.push(rect(x, 720, w, 220, t.panel, 18, `stroke="${i === 1 ? t.accent : t.muted}" stroke-width="1.5" filter="url(#sh${id})"`));
    b.push(rect(x + w - 74, 744, 50, 50, i === 1 ? `url(#g${id})` : t.muted, 14));
    b.push(ar(x + w - 24, 840, a, 20, t.text, 700));
    b.push(line(x + 24, 862, w - 48, t.muted, 8, 4));
    b.push(line(x + w - 24 - 160, 882, 160, t.muted, 8, 4));
    b.push(ar(x + w - 24, 920, 'اقرأ المزيد ←', 13, t.accent2, 700));
  });
  return wrap(t, id, b.join(''));
}

function lawSiteDetail(t) {
  const id = 'law';
  const b = [];
  b.push(rtlNavbar(t, 'مكتب الرافدين للمحاماة', ['الرئيسية', 'مجالات الممارسة', 'فريق المحامين', 'المقالات', 'اتصل بنا'], 'احجز استشارة', { id, ctaText: '#0b1526' }));
  b.push(ar(1510, 150, 'الرئيسية / احجز استشارة', 13, t.sub, 500));
  b.push(ar(1510, 210, 'احجز استشارتك القانونية', 44, t.text, 800));
  b.push(ar(1510, 248, 'اختر المحامي والموعد المناسب وسنؤكد الحجز عبر واتساب خلال دقائق', 16, t.sub, 500));
  // lawyers list (right column)
  const lawyers = [
    ['المحامي أحمد الجبوري', 'شريك مؤسس · القانون التجاري', '15 عاماً'],
    ['المحامية زينب الكعبي', 'شريكة · قانون الشركات والتحكيم', '12 عاماً'],
    ['المحامي مصطفى العاني', 'محامٍ أول · العقارات والملكية', '9 أعوام'],
    ['المحامية نور الطائي', 'محامية · الأحوال الشخصية', '7 أعوام'],
  ];
  b.push(ar(1510, 300, 'اختر المحامي', 20, t.text, 700));
  lawyers.forEach(([n, r, e], i) => {
    const y = 320 + i * 118;
    const sel = i === 1;
    b.push(rect(940, y, 570, 100, t.panel, 16, `stroke="${sel ? t.accent : t.muted}" stroke-width="${sel ? 2.5 : 1.5}" filter="url(#sh${id})"`));
    b.push(circle(1456, y + 50, 32, sel ? `url(#g${id})` : t.muted));
    b.push(ar(1408, y + 42, n, 18, t.text, 700));
    b.push(ar(1408, y + 68, r, 13, t.sub, 500));
    b.push(rect(966, y + 34, 96, 30, sel ? `url(#g${id})` : t.muted, 15));
    b.push(ar(1014, y + 54, e, 12, sel ? '#0b1526' : t.sub, 700, 'center'));
  });
  // calendar (left)
  b.push(rect(90, 300, 810, 400, t.panel, 20, `filter="url(#sh${id})"`));
  b.push(ar(870, 344, 'أيلول 2026', 20, t.text, 700));
  b.push(ar(870, 370, 'المواعيد المتاحة للمحامية زينب الكعبي', 13, t.sub, 500));
  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  days.forEach((d, i) => b.push(ar(830 - i * 108, 412, d, 13, t.sub, 600, 'center')));
  let n = 1;
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 7; c++) {
      if (n > 21) break;
      const x = 792 - c * 108;
      const y = 432 + r * 84;
      const sel = n === 10;
      const off = c === 6;
      b.push(rect(x, y, 76, 68, sel ? `url(#g${id})` : off ? 'none' : t.muted, 12, sel || !off ? '' : `stroke="${t.muted}" stroke-width="1"`));
      b.push(lt(x + 38, y + 42, String(n), 18, sel ? '#0b1526' : off ? t.sub : t.text, 700, 'middle'));
      n++;
    }
  // time slots + form
  b.push(rect(90, 730, 810, 210, t.panel, 20, `filter="url(#sh${id})"`));
  b.push(ar(870, 772, 'الوقت', 16, t.text, 700));
  ['10:00 ص', '11:30 ص', '1:00 م', '3:30 م', '5:00 م'].forEach((s, i) => {
    const x = 870 - 150 - i * 152;
    b.push(rect(x, 790, 140, 44, i === 2 ? `url(#g${id})` : 'none', 22, i === 2 ? '' : `stroke="${t.muted}" stroke-width="1.5"`));
    b.push(ar(x + 70, 819, s, 14, i === 2 ? '#0b1526' : t.text, 700, 'center'));
  });
  b.push(rect(110, 860, 300, 56, `url(#g${id})`, 28));
  b.push(ar(260, 896, 'تأكيد الحجز عبر واتساب', 16, '#0b1526', 700, 'center'));
  b.push(ar(870, 896, 'رسوم الاستشارة الأولى: 50,000 د.ع · تُخصم من الأتعاب', 14, t.sub, 500));
  b.push(rect(940, 800, 570, 140, t.panel, 16, `stroke="${t.muted}" stroke-width="1.5"`));
  b.push(ar(1482, 840, 'ملخص الحجز', 16, t.text, 700));
  b.push(ar(1482, 872, 'المحامية زينب الكعبي · الاثنين 10 أيلول · 1:00 م', 14, t.sub, 500));
  b.push(ar(1482, 902, 'المكتب الرئيسي – بغداد، الكرادة · أو عبر مكالمة فيديو', 14, t.sub, 500));
  return wrap(t, id, b.join(''));
}

// ---- 2. Al-Rafidain Law Firm — practice management dashboard ---------------
const LAW_MENU = ['لوحة التحكم', 'القضايا', 'جلسات المحاكم', 'الموكلون', 'المستندات', 'الفواتير والأتعاب', 'التقارير', 'الإعدادات'];

function lawDashCover(t) {
  const id = 'lawd';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'مكتب الرافدين', LAW_MENU, 0, 'لوحة التحكم', {
    sideBg: '#0f1f3d',
    sideText: '#ffffff',
    sideSub: '#9fb0cf',
    activeBg: '#c9a227',
    activeText: '#0f1f3d',
    userBg: '#1a2d52',
    user: 'المحامي أحمد الجبوري',
    userSub: 'شريك مؤسس',
  });
  b.push(shell);
  const cw = (right - left - 3 * 24) / 4;
  [
    ['القضايا النشطة', '128', '+12'],
    ['جلسات هذا الأسبوع', '23', '+4'],
    ['الإيرادات هذا الشهر', '42,500,000 د.ع', '+18%'],
    ['أتعاب مستحقة', '9,750,000 د.ع', '-6%'],
  ].forEach(([l, v, d], i) => b.push(kpi(t, right - cw - i * (cw + 24), 100, cw, 132, l, v, d, id, i === 2 ? '#c9a227' : '#0f1f3d')));
  // hearings table (right, wide)
  b.push(
    rtlTable(
      t,
      id,
      right - 800,
      262,
      800,
      [
        { w: 180, label: 'رقم القضية' },
        { w: 160, label: 'الموكل' },
        { w: 170, label: 'المحكمة' },
        { w: 120, label: 'التاريخ' },
        { w: 100, label: 'الحالة' },
      ],
      [
        [{ s: '2026/ت/418', bold: true }, 'شركة النخيل للنقل', 'بداءة الكرخ', '8 أيلول', { s: 'مجدولة', chip: '#dbeafe', fill: '#1d4ed8' }],
        [{ s: '2026/ب/1027', bold: true }, 'مصرف الفرات', 'بداءة الرصافة', '9 أيلول', { s: 'مجدولة', chip: '#dbeafe', fill: '#1d4ed8' }],
        [{ s: '2025/ت/902', bold: true }, 'سوق بابل', 'استئناف بغداد', '11 أيلول', { s: 'مؤجلة', chip: '#fef3c7', fill: '#b45309' }],
        [{ s: '2026/ش/77', bold: true }, 'علي حسين الربيعي', 'الأحوال الشخصية', '12 أيلول', { s: 'مجدولة', chip: '#dbeafe', fill: '#1d4ed8' }],
        [{ s: '2024/ت/311', bold: true }, 'شركة دجلة للمقاولات', 'تمييز العراق', '15 أيلول', { s: 'صدر الحكم', chip: '#dcfce7', fill: '#15803d' }],
      ],
      { title: 'جلسات المحاكم القادمة' },
    ),
  );
  // donut cases by type (left)
  b.push(
    donut(t, id, left, 262, right - 800 - 24 - left, 350, 'القضايا حسب النوع', [
      { label: 'تجاري', v: 0.42, color: '#0f1f3d' },
      { label: 'عقاري', v: 0.26, color: '#c9a227' },
      { label: 'أحوال شخصية', v: 0.18, color: '#3b82f6' },
      { label: 'أخرى', v: 0.14, color: '#cbd5e1' },
    ], '128', 'قضية نشطة'),
  );
  // revenue bars (bottom)
  b.push(barChart(t, id, left, 636, right - left - 420, 320, 'الإيرادات الشهرية (مليون د.ع)', ['آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول'], [28, 31, 26, 35, 39, 37, 42.5], { bar: '#dfe3ec', hi: 6 }));
  // reminders panel
  const rx = right - 396;
  b.push(rect(rx, 636, 396, 320, t.panel, 18, `filter="url(#sh${id})"`));
  b.push(ar(rx + 396 - 28, 674, 'تذكيرات الجلسات', 17, t.text, 700));
  b.push(rect(rx + 24, 652, 96, 28, '#dcfce7', 14));
  b.push(ar(rx + 72, 671, 'واتساب · SMS', 11, '#15803d', 700, 'center'));
  [
    ['تذكير للموكل: شركة النخيل للنقل', 'جلسة 8 أيلول · أُرسل عبر واتساب', '#22c55e'],
    ['تذكير للمحامي: زينب الكعبي', 'جلسة 9 أيلول · أُرسل عبر SMS', '#22c55e'],
    ['تذكير للموكل: سوق بابل', 'جلسة 11 أيلول · مجدول غداً 9:00 ص', '#f59e0b'],
    ['تذكير للموكل: علي حسين الربيعي', 'جلسة 12 أيلول · مجدول', '#94a3b8'],
  ].forEach(([a, s, c], i) => {
    const y = 704 + i * 60;
    b.push(circle(rx + 396 - 40, y + 14, 7, c));
    b.push(ar(rx + 396 - 58, y + 12, a, 14, t.text, 700));
    b.push(ar(rx + 396 - 58, y + 34, s, 12, t.sub, 500));
  });
  return wrap(t, id, b.join(''));
}

function lawDashDetail(t) {
  const id = 'lawd';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'مكتب الرافدين', LAW_MENU, 1, 'تفاصيل القضية 2026/ت/418', {
    sideBg: '#0f1f3d',
    sideText: '#ffffff',
    sideSub: '#9fb0cf',
    activeBg: '#c9a227',
    activeText: '#0f1f3d',
    userBg: '#1a2d52',
    user: 'المحامي أحمد الجبوري',
    userSub: 'شريك مؤسس',
  });
  b.push(shell);
  // case header
  b.push(rect(left, 100, right - left, 150, t.panel, 18, `filter="url(#sh${id})"`));
  b.push(ar(right - 28, 146, 'شركة النخيل للنقل ضد شركة الجنوب للتأمين', 26, t.text, 800));
  b.push(ar(right - 28, 178, 'مطالبة بتعويض · محكمة بداءة الكرخ · رقم الدعوى 2026/ت/418', 15, t.sub, 500));
  b.push(rect(right - 28 - 120, 200, 120, 30, '#dbeafe', 15));
  b.push(ar(right - 88, 220, 'قيد النظر', 13, '#1d4ed8', 700, 'center'));
  b.push(rect(right - 28 - 260, 200, 128, 30, t.muted, 15));
  b.push(ar(right - 28 - 196, 220, 'المحامي: زينب الكعبي', 12, t.sub, 700, 'center'));
  b.push(rect(left + 24, 120, 190, 44, '#0f1f3d', 22));
  b.push(ar(left + 119, 148, '+ إضافة جلسة', 14, '#fff', 700, 'center'));
  b.push(rect(left + 230, 120, 170, 44, 'none', 22, `stroke="${t.muted}" stroke-width="2"`));
  b.push(ar(left + 315, 148, 'إصدار فاتورة', 14, t.text, 700, 'center'));
  b.push(ar(left + 400, 226, 'قيمة الدعوى: 185,000,000 د.ع', 15, t.text, 700, 'left'));
  // timeline (right column)
  const tx = right - 560;
  b.push(rect(tx, 276, 560, 680, t.panel, 18, `filter="url(#sh${id})"`));
  b.push(ar(right - 28, 316, 'مراحل القضية والجلسات', 17, t.text, 700));
  const steps = [
    ['تقديم عريضة الدعوى', '12 حزيران 2026', 'تم', '#22c55e'],
    ['تبليغ المدعى عليه', '25 حزيران 2026', 'تم', '#22c55e'],
    ['الجلسة الأولى – المرافعة', '14 تموز 2026', 'تم', '#22c55e'],
    ['تقديم اللوائح والبينات', '2 آب 2026', 'تم', '#22c55e'],
    ['جلسة سماع الشهود', '8 أيلول 2026', 'قادمة', '#c9a227'],
    ['المرافعة الختامية', 'لم يُحدد بعد', 'قادمة', '#cbd5e1'],
    ['صدور الحكم', 'لم يُحدد بعد', 'قادمة', '#cbd5e1'],
  ];
  steps.forEach(([s, d, st, c], i) => {
    const y = 360 + i * 82;
    if (i < steps.length - 1) b.push(`<line x1="${right - 52}" y1="${y + 12}" x2="${right - 52}" y2="${y + 82}" stroke="${t.muted}" stroke-width="3"/>`);
    b.push(circle(right - 52, y + 6, 12, c));
    b.push(ar(right - 80, y + 12, s, 16, t.text, 700));
    b.push(ar(right - 80, y + 36, d, 13, t.sub, 500));
    b.push(rect(tx + 24, y - 8, 72, 26, st === 'تم' ? '#dcfce7' : st === 'قادمة' && c === '#c9a227' ? '#fef3c7' : t.muted, 13));
    b.push(ar(tx + 60, y + 10, st, 12, st === 'تم' ? '#15803d' : c === '#c9a227' ? '#b45309' : t.sub, 700, 'center'));
  });
  // documents (left top)
  const dw = tx - 24 - left;
  b.push(rect(left, 276, dw, 330, t.panel, 18, `filter="url(#sh${id})"`));
  b.push(ar(left + dw - 28, 316, 'المستندات', 17, t.text, 700));
  b.push(rect(left + 24, 292, 110, 32, '#0f1f3d', 16));
  b.push(ar(left + 79, 313, '↑ رفع ملف', 12, '#fff', 700, 'center'));
  [
    ['عريضة الدعوى.pdf', '2.4 MB · 12 حزيران', '#ef4444'],
    ['عقد النقل الأصلي.pdf', '1.1 MB · 12 حزيران', '#ef4444'],
    ['وكالة عامة – النخيل.pdf', '640 KB · 10 حزيران', '#ef4444'],
    ['كشف الأضرار.xlsx', '318 KB · 30 تموز', '#22c55e'],
    ['إفادة الشاهد الأول.docx', '92 KB · 1 أيلول', '#3b82f6'],
  ].forEach(([n, m, c], i) => {
    const y = 344 + i * 50;
    b.push(rect(left + dw - 62, y, 34, 34, c, 8, 'opacity="0.18"'));
    b.push(rect(left + dw - 54, y + 8, 18, 18, c, 4));
    b.push(ar(left + dw - 76, y + 16, n, 14, t.text, 700));
    b.push(ar(left + dw - 76, y + 32, m, 11, t.sub, 500));
    b.push(rect(left + 24, y + 6, 26, 22, t.muted, 6));
  });
  // invoices (left bottom)
  b.push(
    rtlTable(
      t,
      id,
      left,
      630,
      dw,
      [
        { w: 150, label: 'الفاتورة' },
        { w: 190, label: 'البيان' },
        { w: 170, label: 'المبلغ' },
        { w: 100, label: 'الحالة' },
      ],
      [
        [{ s: 'INV-2026-091', bold: true }, 'أتعاب المرحلة الأولى', '15,000,000 د.ع', { s: 'مدفوعة', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'INV-2026-134', bold: true }, 'رسوم ومصاريف المحكمة', '2,250,000 د.ع', { s: 'مدفوعة', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'INV-2026-158', bold: true }, 'أتعاب المرحلة الثانية', '10,000,000 د.ع', { s: 'مستحقة', chip: '#fef3c7', fill: '#b45309' }],
      ],
      { title: 'الفواتير والأتعاب' },
    ),
  );
  return wrap(t, id, b.join(''));
}


// ---- 3. Souq Babil — storefront ------------------------------------------
const SOUQ_LINKS = ['الرئيسية', 'إلكترونيات', 'أزياء', 'المنزل', 'العروض'];
const SOUQ_PRODUCTS = [
  ['سماعات لاسلكية برو', '89,000 د.ع', '120,000'],
  ['ساعة ذكية – الجيل الخامس', '145,000 د.ع', ''],
  ['حقيبة ظهر جلدية', '55,000 د.ع', '75,000'],
  ['ماكينة قهوة إسبريسو', '210,000 د.ع', ''],
];

function productCardAr(t, id, x, y, w, h, i, name, price, old) {
  const p = [rect(x, y, w, h, t.panel, 16, `filter="url(#sh${id})"`)];
  p.push(rect(x + 16, y + 16, w - 32, h * 0.55, `url(#g${id})`, 12, `opacity="${0.16 + (i % 3) * 0.14}"`));
  if (old) {
    p.push(rect(x + w - 16 - 74, y + 28, 74, 26, t.accent2, 13));
    p.push(ar(x + w - 16 - 37, y + 46, 'خصم 25%', 12, '#fff', 700, 'center'));
  }
  p.push(ar(x + w - 20, y + h * 0.55 + 46, name, 16, t.text, 700));
  p.push(ar(x + w - 20, y + h * 0.55 + 74, price, 18, t.accent, 800));
  if (old) p.push(`<text x="${x + w - 20 - 130}" y="${y + h * 0.55 + 74}" direction="rtl" text-anchor="start" font-family="${AR_FONT}" font-size="13" fill="${t.sub}" text-decoration="line-through">${old}</text>`);
  p.push(`<text x="${x + w - 20}" y="${y + h * 0.55 + 98}" direction="rtl" text-anchor="start" font-family="${AR_FONT}" font-size="12" fill="#f59e0b">★★★★★</text>`);
  p.push(ar(x + w - 92, y + h * 0.55 + 98, '(214)', 11, t.sub, 500));
  p.push(rect(x + 20, y + h - 52, 118, 36, t.accent, 18));
  p.push(ar(x + 79, y + h - 29, 'أضف للسلة', 13, '#fff', 700, 'center'));
  return p.join('');
}

function souqStoreCover(t) {
  const id = 'souq';
  const b = [];
  // announcement bar
  b.push(rect(0, 0, W, 36, t.accent, 0));
  b.push(ar(800, 24, 'توصيل إلى جميع المحافظات العراقية · الدفع عند الاستلام · زين كاش · بطاقات كي كارد وماستر كارد', 13, '#fff', 600, 'center'));
  b.push(`<g transform="translate(0 36)">${rtlNavbar(t, 'سوق بابل', SOUQ_LINKS, 'السلة (3)', { id })}</g>`);
  // hero banner
  b.push(rect(90, 140, W - 180, 330, `url(#g${id})`, 28, `filter="url(#sh${id})"`));
  b.push(circle(360, 300, 260, 'rgba(255,255,255,0.10)'));
  b.push(circle(280, 380, 120, 'rgba(255,255,255,0.10)'));
  b.push(rect(1290, 182, 150, 32, 'rgba(255,255,255,0.22)', 16));
  b.push(ar(1365, 204, 'عروض العودة للمدارس', 13, '#fff', 700, 'center'));
  b.push(ar(1440, 270, 'خصومات تصل إلى 40%', 54, '#fff', 800));
  b.push(ar(1440, 330, 'على الإلكترونيات والأزياء ومستلزمات المنزل', 22, 'rgba(255,255,255,0.9)', 500));
  b.push(ar(1440, 366, 'توصيل مجاني للطلبات فوق 100,000 د.ع داخل بغداد', 16, 'rgba(255,255,255,0.8)', 500));
  b.push(rect(1250, 396, 190, 52, '#fff', 26));
  b.push(ar(1345, 429, 'تسوّق الآن', 16, t.accent, 800, 'center'));
  // product shapes on the banner (left)
  b.push(rect(180, 200, 220, 220, 'rgba(255,255,255,0.18)', 24));
  b.push(rect(220, 240, 140, 140, 'rgba(255,255,255,0.35)', 18));
  b.push(rect(440, 260, 160, 160, 'rgba(255,255,255,0.18)', 20));
  // categories
  const cats = ['إلكترونيات', 'أزياء رجالية', 'أزياء نسائية', 'المنزل والمطبخ', 'العناية والجمال', 'الأطفال'];
  cats.forEach((c, i) => {
    const w = 218;
    const x = W - 90 - w - i * (w + 22);
    b.push(rect(x, 500, w, 64, t.panel, 16, `filter="url(#sh${id})"`));
    b.push(rect(x + w - 56, 516, 32, 32, i === 0 ? `url(#g${id})` : t.muted, 10));
    b.push(ar(x + w - 70, 538, c, 15, t.text, 700));
  });
  // products
  b.push(ar(W - 90, 620, 'الأكثر مبيعاً هذا الأسبوع', 28, t.text, 800));
  b.push(ar(390, 620, 'عرض الكل ←', 15, t.accent, 700, 'left'));
  const pw = 340;
  SOUQ_PRODUCTS.forEach(([n, p, o], i) => b.push(productCardAr(t, id, W - 90 - pw - i * (pw + 20), 650, pw, 310, i, n, p, o)));
  return wrap(t, id, b.join(''));
}

function souqStoreDetail(t) {
  const id = 'souq';
  const b = [];
  b.push(rtlNavbar(t, 'سوق بابل', SOUQ_LINKS, 'السلة (3)', { id }));
  b.push(ar(W - 90, 120, 'الرئيسية / السلة / إتمام الطلب', 13, t.sub, 500));
  b.push(ar(W - 90, 170, 'إتمام الطلب', 38, t.text, 800));
  // steps
  ['العنوان', 'التوصيل', 'الدفع', 'التأكيد'].forEach((s, i) => {
    const x = W - 90 - 60 - i * 170;
    b.push(circle(x, 226, 16, i <= 2 ? t.accent : t.muted));
    b.push(lt(x, 231, String(i + 1), 13, i <= 2 ? '#fff' : t.sub, 700, 'middle'));
    b.push(ar(x - 24, 232, s, 14, i <= 2 ? t.text : t.sub, i === 2 ? 700 : 500));
    if (i < 3) b.push(rect(x - 150, 224, 60, 4, i < 2 ? t.accent : t.muted, 2));
  });
  // form (right)
  const fx = W - 90 - 900;
  b.push(rect(fx, 270, 900, 680, t.panel, 20, `filter="url(#sh${id})"`));
  b.push(ar(W - 118, 316, 'عنوان التوصيل', 20, t.text, 700));
  const field = (x, y, w, label, val) => [
    ar(x + w, y, label, 13, t.sub, 600),
    rect(x, y + 10, w, 48, t.bg, 12, `stroke="${t.muted}" stroke-width="1.5"`),
    ar(x + w - 16, y + 41, val, 15, t.text, 500),
  ].join('');
  b.push(field(W - 118 - 420, 340, 420, 'الاسم الكامل', 'حسن كريم العبيدي'));
  b.push(field(fx + 28, 340, 420, 'رقم الهاتف', ''));
  b.push(lt(fx + 28 + 420 - 16, 381, '+964 770 123 4567', 15, t.text, 500, 'end'));
  b.push(field(W - 118 - 420, 420, 420, 'المحافظة', 'البصرة'));
  b.push(field(fx + 28, 420, 420, 'المنطقة', 'العشار'));
  b.push(field(fx + 28, 500, 842, 'أقرب نقطة دالة', 'شارع الكورنيش، مقابل فندق الشيراتون، بناية رقم 12'));
  b.push(ar(W - 118, 616, 'طريقة الدفع', 20, t.text, 700));
  const pays = [
    ['الدفع عند الاستلام', 'ادفع نقداً للمندوب عند التسليم', true],
    ['زين كاش', 'دفع فوري من محفظة زين كاش', false],
    ['بطاقة كي كارد / ماستر كارد', 'دفع آمن عبر البطاقة', false],
  ];
  pays.forEach(([n, s, on], i) => {
    const w = 272;
    const x = W - 118 - w - i * (w + 13);
    b.push(rect(x, 640, w, 96, on ? '#fff4ec' : t.bg, 14, `stroke="${on ? t.accent : t.muted}" stroke-width="${on ? 2.5 : 1.5}"`));
    b.push(circle(x + w - 26, 668, 9, 'none') + `<circle cx="${x + w - 26}" cy="668" r="9" fill="none" stroke="${on ? t.accent : t.sub}" stroke-width="2"/>`);
    if (on) b.push(circle(x + w - 26, 668, 5, t.accent));
    b.push(ar(x + w - 44, 674, n, 15, t.text, 700));
    b.push(ar(x + w - 44, 700, s, 12, t.sub, 500));
  });
  b.push(rect(fx + 28, 770, 842, 56, t.bg, 12, `stroke="${t.muted}" stroke-width="1.5" stroke-dasharray="6 6"`));
  b.push(ar(W - 134, 805, 'هل لديك كود خصم؟ أدخله هنا', 14, t.sub, 500));
  b.push(rect(fx + 40, 780, 120, 36, t.muted, 18));
  b.push(ar(fx + 100, 803, 'تطبيق', 13, t.text, 700, 'center'));
  b.push(rect(fx + 28, 860, 842, 60, `url(#g${id})`, 30));
  b.push(ar(fx + 449, 898, 'تأكيد الطلب · 174,000 د.ع', 18, '#fff', 800, 'center'));
  // order summary (left)
  const sw = fx - 24 - 90;
  b.push(rect(90, 270, sw, 560, t.panel, 20, `filter="url(#sh${id})"`));
  b.push(ar(90 + sw - 28, 316, 'ملخص الطلب (3 منتجات)', 18, t.text, 700));
  [
    ['سماعات لاسلكية برو', '1 ×', '89,000 د.ع'],
    ['حقيبة ظهر جلدية', '1 ×', '55,000 د.ع'],
    ['قميص قطني – أزرق', '2 ×', '25,000 د.ع'],
  ].forEach(([n, q, p], i) => {
    const y = 350 + i * 84;
    b.push(rect(90 + sw - 28 - 60, y, 60, 60, `url(#g${id})`, 12, `opacity="${0.25 + i * 0.2}"`));
    b.push(ar(90 + sw - 104, y + 24, n, 14, t.text, 700));
    b.push(ar(90 + sw - 104, y + 46, q, 12, t.sub, 500));
    b.push(ar(118, y + 40, p, 14, t.text, 700, 'left'));
  });
  b.push(`<line x1="118" y1="610" x2="${90 + sw - 28}" y2="610" stroke="${t.muted}" stroke-width="1.5"/>`);
  [
    ['المجموع الفرعي', '169,000 د.ع'],
    ['رسوم التوصيل – البصرة', '5,000 د.ع'],
    ['الخصم', '0 د.ع'],
  ].forEach(([l, v], i) => {
    b.push(ar(90 + sw - 28, 646 + i * 34, l, 14, t.sub, 500));
    b.push(ar(118, 646 + i * 34, v, 14, t.text, 600, 'left'));
  });
  b.push(`<line x1="118" y1="752" x2="${90 + sw - 28}" y2="752" stroke="${t.muted}" stroke-width="1.5"/>`);
  b.push(ar(90 + sw - 28, 796, 'الإجمالي', 18, t.text, 800));
  b.push(ar(118, 796, '174,000 د.ع', 22, t.accent, 800, 'left'));
  b.push(rect(90, 850, sw, 100, '#fff4ec', 20));
  b.push(ar(90 + sw - 28, 890, 'التوصيل خلال 2–3 أيام عمل', 15, t.text, 700));
  b.push(ar(90 + sw - 28, 918, 'يتواصل معك المندوب قبل التسليم عبر واتساب', 12, t.sub, 500));
  return wrap(t, id, b.join(''));
}

// ---- 4. Souq Babil — admin panel ---------------------------------------------
const SOUQ_MENU = ['نظرة عامة', 'الطلبات', 'المنتجات', 'المخزون', 'المندوبون', 'المرتجعات', 'التقارير', 'الإعدادات'];

function souqAdminCover(t) {
  const id = 'souqa';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'سوق بابل · الإدارة', SOUQ_MENU, 0, 'نظرة عامة · اليوم', { user: 'سارة الحسني', userSub: 'مؤسسة · مدير النظام' });
  b.push(shell);
  const cw = (right - left - 3 * 24) / 4;
  [
    ['طلبات اليوم', '342', '+21%'],
    ['مبيعات اليوم', '28,400,000 د.ع', '+14%'],
    ['قيد التوصيل', '186', '+9'],
    ['المرتجعات', '7', '-3'],
  ].forEach(([l, v, d], i) => b.push(kpi(t, right - cw - i * (cw + 24), 100, cw, 132, l, v, d, id, i === 3 ? t.accent2 : undefined)));
  // orders by governorate table (right)
  b.push(
    rtlTable(
      t,
      id,
      right - 760,
      262,
      760,
      [
        { w: 170, label: 'المحافظة' },
        { w: 130, label: 'الطلبات' },
        { w: 190, label: 'المبيعات' },
        { w: 140, label: 'متوسط التسليم' },
        { w: 100, label: 'الحالة' },
      ],
      [
        [{ s: 'بغداد', bold: true }, '148', '12,300,000 د.ع', 'يوم واحد', { s: 'ممتاز', chip: '#14532d', fill: '#86efac' }],
        [{ s: 'البصرة', bold: true }, '54', '4,650,000 د.ع', 'يومان', { s: 'ممتاز', chip: '#14532d', fill: '#86efac' }],
        [{ s: 'أربيل', bold: true }, '41', '3,900,000 د.ع', 'يومان', { s: 'جيد', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: 'النجف', bold: true }, '33', '2,750,000 د.ع', '3 أيام', { s: 'جيد', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: 'الموصل', bold: true }, '29', '2,400,000 د.ع', '3 أيام', { s: 'تأخير', chip: '#78350f', fill: '#fcd34d' }],
        [{ s: 'كربلاء', bold: true }, '37', '2,400,000 د.ع', 'يومان', { s: 'ممتاز', chip: '#14532d', fill: '#86efac' }],
      ],
      { title: 'الطلبات حسب المحافظة' },
    ),
  );
  // payment donut (left)
  b.push(
    donut(t, id, left, 262, right - 760 - 24 - left, 400, 'طرق الدفع', [
      { label: 'عند الاستلام', v: 0.58, color: t.accent },
      { label: 'زين كاش', v: 0.27, color: t.accent2 },
      { label: 'بطاقات', v: 0.15, color: '#fbbf24' },
    ], '342', 'طلب اليوم'),
  );
  // sales bars (bottom)
  b.push(barChart(t, id, left, 690, right - left - 420, 266, 'المبيعات آخر 12 يوماً (مليون د.ع)', ['24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4'], [16, 19, 17, 22, 21, 25, 24, 27, 23, 26, 25, 28.4], { hi: 11, bar: '#4a2d22' }));
  // couriers panel
  const rx = right - 396;
  b.push(rect(rx, 690, 396, 266, t.panel, 18));
  b.push(ar(rx + 396 - 28, 728, 'المندوبون النشطون', 17, t.text, 700));
  [
    ['علي حسين', 'بغداد · 18 طلب', '#22c55e'],
    ['مصطفى جاسم', 'بغداد · 14 طلب', '#22c55e'],
    ['شركة النخيل للنقل', 'المحافظات · 92 طلب', '#3b82f6'],
    ['حيدر كاظم', 'البصرة · 11 طلب', '#f59e0b'],
  ].forEach(([n, s, c], i) => {
    const y = 760 + i * 48;
    b.push(circle(rx + 396 - 44, y + 8, 14, t.muted));
    b.push(circle(rx + 396 - 34, y + 18, 5, c));
    b.push(ar(rx + 396 - 68, y + 6, n, 14, t.text, 700));
    b.push(ar(rx + 396 - 68, y + 26, s, 12, t.sub, 500));
  });
  return wrap(t, id, b.join(''));
}

function souqAdminDetail(t) {
  const id = 'souqa';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'سوق بابل · الإدارة', SOUQ_MENU, 1, 'الطلبات', { user: 'سارة الحسني', userSub: 'مؤسسة · مدير النظام' });
  b.push(shell);
  // filter tabs
  ['الكل (342)', 'جديد (58)', 'قيد التجهيز (71)', 'قيد التوصيل (186)', 'تم التسليم (20)', 'مرتجع (7)'].forEach((s, i) => {
    const w = 150;
    const x = right - w - i * (w + 10);
    b.push(rect(x, 96, w, 40, i === 3 ? `url(#g${id})` : t.panel, 20));
    b.push(ar(x + w / 2, 122, s, 13, i === 3 ? '#fff' : t.sub, 700, 'center'));
  });
  b.push(rect(left, 96, 180, 40, t.panel, 20, `stroke="${t.muted}" stroke-width="1.5"`));
  b.push(ar(left + 90, 122, '↓ تصدير Excel', 13, t.text, 700, 'center'));
  b.push(
    rtlTable(
      t,
      id,
      left,
      160,
      right - left,
      [
        { w: 140, label: 'رقم الطلب' },
        { w: 190, label: 'العميل' },
        { w: 170, label: 'المحافظة' },
        { w: 180, label: 'المبلغ' },
        { w: 180, label: 'الدفع' },
        { w: 180, label: 'المندوب' },
        { w: 140, label: 'الحالة' },
      ],
      [
        [{ s: '#48213', bold: true }, 'حسن كريم العبيدي', 'البصرة – العشار', '174,000 د.ع', 'عند الاستلام', 'حيدر كاظم', { s: 'قيد التوصيل', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: '#48212', bold: true }, 'نور محمد الشمري', 'بغداد – المنصور', '89,000 د.ع', 'زين كاش', 'علي حسين', { s: 'قيد التوصيل', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: '#48211', bold: true }, 'ريام سعد', 'أربيل – عينكاوا', '265,000 د.ع', 'بطاقة', 'النخيل للنقل', { s: 'قيد التوصيل', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: '#48210', bold: true }, 'أحمد فاضل', 'النجف – الكوفة', '55,000 د.ع', 'عند الاستلام', 'النخيل للنقل', { s: 'قيد التوصيل', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: '#48209', bold: true }, 'زهراء علي', 'بغداد – الكرادة', '145,000 د.ع', 'زين كاش', 'مصطفى جاسم', { s: 'تم التسليم', chip: '#14532d', fill: '#86efac' }],
        [{ s: '#48208', bold: true }, 'محمد طالب', 'الموصل – الزهور', '210,000 د.ع', 'عند الاستلام', 'النخيل للنقل', { s: 'متأخر', chip: '#78350f', fill: '#fcd34d' }],
        [{ s: '#48207', bold: true }, 'سجى حيدر', 'كربلاء – الحر', '38,000 د.ع', 'عند الاستلام', 'النخيل للنقل', { s: 'قيد التوصيل', chip: '#1e3a8a', fill: '#93c5fd' }],
        [{ s: '#48206', bold: true }, 'عمر خالد', 'بغداد – زيونة', '120,000 د.ع', 'بطاقة', 'علي حسين', { s: 'مرتجع', chip: '#7f1d1d', fill: '#fca5a5' }],
        [{ s: '#48205', bold: true }, 'دعاء ناصر', 'البصرة – الجزائر', '67,000 د.ع', 'زين كاش', 'حيدر كاظم', { s: 'تم التسليم', chip: '#14532d', fill: '#86efac' }],
        [{ s: '#48204', bold: true }, 'كرار جبار', 'بغداد – الدورة', '95,000 د.ع', 'عند الاستلام', 'مصطفى جاسم', { s: 'تم التسليم', chip: '#14532d', fill: '#86efac' }],
      ],
      { title: 'قائمة الطلبات · مرتبة حسب الأحدث' },
    ),
  );
  // pagination
  b.push(ar(right, 842, 'عرض 1–10 من 186 طلباً', 13, t.sub, 500));
  [1, 2, 3, '…', 19].forEach((n, i) => {
    const x = left + i * 44;
    b.push(rect(x, 818, 36, 36, i === 0 ? `url(#g${id})` : t.panel, 10));
    b.push(lt(x + 18, 842, String(n), 14, i === 0 ? '#fff' : t.sub, 700, 'middle'));
  });
  return wrap(t, id, b.join(''));
}


// ---- 5. Souq Babil — mobile app ---------------------------------------------
function souqAppCover(t) {
  const id = 'souqm';
  const b = [];
  b.push(circle(800, 520, 560, `url(#glow${id})`));
  b.push(ar(800, 90, 'تطبيق سوق بابل', 40, '#fff', 800, 'center'));
  b.push(ar(800, 124, 'تسوّق · تتبّع طلبك · ادفع بزين كاش أو عند الاستلام', 16, 'rgba(255,255,255,0.7)', 500, 'center'));
  // home screen
  const home = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 22 * s, 'مرحباً، نور 👋', 15 * s, t.text, 800));
    p.push(ar(R, y + 42 * s, 'التوصيل إلى: بغداد – المنصور', 10 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + 56 * s, w - 36 * s, 38 * s, t.muted, 12 * s));
    p.push(ar(R - 14 * s, y + 80 * s, 'ابحث عن منتج...', 11 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + 108 * s, w - 36 * s, 120 * s, `url(#g${id})`, 16 * s));
    p.push(ar(R - 14 * s, y + 146 * s, 'خصم 40%', 22 * s, '#fff', 800));
    p.push(ar(R - 14 * s, y + 170 * s, 'عروض العودة للمدارس', 11 * s, 'rgba(255,255,255,0.9)', 500));
    p.push(rect(R - 14 * s - 84 * s, y + 186 * s, 84 * s, 26 * s, '#fff', 13 * s));
    p.push(ar(R - 14 * s - 42 * s, y + 204 * s, 'تسوّق الآن', 10 * s, t.accent, 700, 'center'));
    ['إلكترونيات', 'أزياء', 'المنزل', 'الجمال'].forEach((c, i) => {
      const cx = R - 26 * s - i * ((w - 36 * s) / 4);
      p.push(circle(cx, y + 264 * s, 22 * s, i === 0 ? t.accent : t.muted));
      p.push(ar(cx, y + 302 * s, c, 9 * s, t.text, 600, 'center'));
    });
    p.push(ar(R, y + 336 * s, 'الأكثر مبيعاً', 13 * s, t.text, 800));
    p.push(ar(x + 18 * s, y + 336 * s, 'عرض الكل', 9 * s, t.accent, 700, 'left'));
    [
      ['سماعات لاسلكية برو', '89,000 د.ع'],
      ['ساعة ذكية', '145,000 د.ع'],
    ].forEach(([n, pr], i) => {
      const cw = (w - 48 * s) / 2;
      const cx = R - cw - i * (cw + 12 * s);
      p.push(rect(cx, y + 350 * s, cw, 138 * s, t.panel, 12 * s, `stroke="#eee6df" stroke-width="${1.5 * s}"`));
      p.push(rect(cx + 10 * s, y + 360 * s, cw - 20 * s, 80 * s, `url(#g${id})`, 10 * s, `opacity="${0.25 + i * 0.25}"`));
      p.push(ar(cx + cw - 10 * s, y + 458 * s, n, 10 * s, t.text, 700));
      p.push(ar(cx + cw - 10 * s, y + 478 * s, pr, 11 * s, t.accent, 800));
    });
    p.push(tabBar(x, y + h - 64 * s, w, s, ['الرئيسية', 'التصنيفات', 'السلة', 'طلباتي', 'حسابي'], 0, t.accent, t.sub));
    return p.join('');
  };
  // product screen
  const product = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(rect(x, y, w, 220 * s, `url(#g${id})`, 0, 'opacity="0.35"'));
    p.push(rect(x + 50 * s, y + 24 * s, w - 100 * s, 172 * s, `url(#g${id})`, 20 * s));
    p.push(circle(x + 28 * s, y + 24 * s, 14 * s, '#fff'));
    p.push(circle(x + w - 28 * s, y + 24 * s, 14 * s, '#fff'));
    p.push(ar(R, y + 262 * s, 'سماعات لاسلكية برو', 17 * s, t.text, 800));
    p.push(ar(R, y + 284 * s, '★★★★★ 4.8 · 214 تقييم', 10 * s, '#f59e0b', 600));
    p.push(ar(R, y + 320 * s, '89,000 د.ع', 22 * s, t.accent, 800));
    p.push(`<text x="${R - 130 * s}" y="${y + 320 * s}" direction="rtl" text-anchor="start" font-family="${AR_FONT}" font-size="${11 * s}" fill="${t.sub}" text-decoration="line-through">120,000 د.ع</text>`);
    p.push(rect(R - 90 * s, y + 336 * s, 90 * s, 22 * s, '#fee2e2', 11 * s));
    p.push(ar(R - 45 * s, y + 351 * s, 'وفّر 31,000 د.ع', 9 * s, t.accent2, 700, 'center'));
    p.push(ar(R, y + 386 * s, 'اللون', 11 * s, t.text, 700));
    ['#111827', '#f8fafc', '#f97316'].forEach((c, i) => p.push(circle(R - 14 * s - i * 34 * s, y + 410 * s, 11 * s, c) + (i === 0 ? `<circle cx="${R - 14 * s}" cy="${y + 410 * s}" r="${15 * s}" fill="none" stroke="${t.accent}" stroke-width="${2 * s}"/>` : '')));
    p.push(rect(x + 18 * s, y + 432 * s, w - 36 * s, 58 * s, t.muted, 12 * s));
    p.push(ar(R - 14 * s, y + 456 * s, 'توصيل خلال يوم واحد في بغداد', 10 * s, t.text, 700));
    p.push(ar(R - 14 * s, y + 476 * s, 'الدفع عند الاستلام · زين كاش · بطاقة', 9 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + h - 64 * s, w - 36 * s, 50 * s, `url(#g${id})`, 25 * s));
    p.push(ar(x + w / 2, y + h - 33 * s, 'أضف إلى السلة', 14 * s, '#fff', 800, 'center'));
    return p.join('');
  };
  // tracking screen
  const track = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 24 * s, 'تتبع الطلب #48212', 15 * s, t.text, 800));
    p.push(ar(R, y + 44 * s, 'الوصول المتوقع: اليوم 4:00 – 6:00 م', 10 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + 60 * s, w - 36 * s, 150 * s, '#eef2f7', 14 * s));
    p.push(`<path d="M${x + 40 * s} ${y + 180 * s} C${x + 100 * s} ${y + 120 * s}, ${x + 160 * s} ${y + 160 * s}, ${x + w - 50 * s} ${y + 90 * s}" fill="none" stroke="${t.accent}" stroke-width="${4 * s}" stroke-dasharray="${8 * s} ${6 * s}"/>`);
    p.push(circle(x + w - 50 * s, y + 90 * s, 9 * s, t.accent2));
    p.push(circle(x + 120 * s, y + 138 * s, 11 * s, t.accent));
    p.push(circle(x + 120 * s, y + 138 * s, 5 * s, '#fff'));
    const steps = [
      ['تم تأكيد الطلب', 'اليوم 9:12 ص', true],
      ['جارٍ التجهيز', 'اليوم 10:40 ص', true],
      ['مع المندوب – علي حسين', 'اليوم 2:15 م', true],
      ['تم التسليم', 'قريباً', false],
    ];
    steps.forEach(([n, d, done], i) => {
      const y0 = y + 236 * s + i * 54 * s;
      if (i < 3) p.push(`<line x1="${R - 12 * s}" y1="${y0 + 10 * s}" x2="${R - 12 * s}" y2="${y0 + 54 * s}" stroke="${done ? t.accent : '#e5e7eb'}" stroke-width="${3 * s}"/>`);
      p.push(circle(R - 12 * s, y0 + 4 * s, 9 * s, done ? t.accent : '#e5e7eb'));
      p.push(ar(R - 32 * s, y0 + 8 * s, n, 12 * s, done ? t.text : t.sub, 700));
      p.push(ar(R - 32 * s, y0 + 26 * s, d, 9 * s, t.sub, 500));
    });
    p.push(rect(x + 18 * s, y + 436 * s, w - 36 * s, 46 * s, '#dcfce7', 23 * s));
    p.push(ar(x + w / 2, y + 465 * s, 'تواصل مع المندوب عبر واتساب', 12 * s, '#15803d', 800, 'center'));
    p.push(tabBar(x, y + h - 64 * s, w, s, ['الرئيسية', 'التصنيفات', 'السلة', 'طلباتي', 'حسابي'], 3, t.accent, t.sub));
    return p.join('');
  };
  b.push(phoneFrame(id, 1010, 250, 0.9, t.panel, home));
  b.push(phoneFrame(id, 630, 170, 1.05, t.panel, product));
  b.push(phoneFrame(id, 290, 250, 0.9, t.panel, track));
  return wrap(t, id, b.join(''));
}

function souqAppDetail(t) {
  const id = 'souqm';
  const b = [];
  b.push(circle(500, 500, 520, `url(#glow${id})`));
  b.push(ar(1510, 140, 'سلة الشراء والدفع', 46, '#fff', 800));
  b.push(ar(1510, 190, 'دفع سلس بزين كاش أو البطاقة أو عند الاستلام، وإشعارات فورية بكل تحديث', 18, 'rgba(255,255,255,0.75)', 500));
  ['تسجيل الدخول برقم الهاتف العراقي ورمز التحقق', 'إشعارات فورية عند تغيّر حالة الطلب', 'يعمل بكفاءة على الاتصال الضعيف', 'دعم كامل للغة العربية واتجاه RTL'].forEach((f, i) => {
    const y = 250 + i * 60;
    b.push(rect(1470, y, 40, 40, 'rgba(249,115,22,0.18)', 12));
    b.push(circle(1490, y + 20, 7, t.accent));
    b.push(ar(1450, y + 27, f, 18, '#fff', 600));
  });
  // store badges
  [['App Store', 'متوفر على'], ['Google Play', 'احصل عليه من']].forEach(([n, s], i) => {
    const x = 1510 - 200 - i * 220;
    b.push(rect(x, 520, 200, 60, '#0c0c12', 14, `stroke="#3a3a48" stroke-width="1.5"`));
    b.push(rect(x + 150, 534, 32, 32, t.muted, 8));
    b.push(ar(x + 140, 548, s, 10, '#9ca3af', 500));
    b.push(lt(x + 140, 570, n, 16, '#fff', 700, 'end'));
  });
  // cart screen
  const cart = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 24 * s, 'السلة (3)', 17 * s, t.text, 800));
    [
      ['سماعات لاسلكية برو', '89,000 د.ع', '1'],
      ['حقيبة ظهر جلدية', '55,000 د.ع', '1'],
      ['قميص قطني – أزرق', '50,000 د.ع', '2'],
    ].forEach(([n, pr, q], i) => {
      const y0 = y + 48 * s + i * 92 * s;
      p.push(rect(x + 18 * s, y0, w - 36 * s, 80 * s, t.panel, 12 * s, `stroke="#eee6df" stroke-width="${1.5 * s}"`));
      p.push(rect(R - 70 * s, y0 + 10 * s, 60 * s, 60 * s, `url(#g${id})`, 10 * s, `opacity="${0.25 + i * 0.2}"`));
      p.push(ar(R - 82 * s, y0 + 30 * s, n, 11 * s, t.text, 700));
      p.push(ar(R - 82 * s, y0 + 52 * s, pr, 12 * s, t.accent, 800));
      p.push(rect(x + 30 * s, y0 + 42 * s, 80 * s, 26 * s, t.muted, 13 * s));
      p.push(lt(x + 44 * s, y0 + 60 * s, '−', 14 * s, t.text, 700));
      p.push(lt(x + 70 * s, y0 + 60 * s, q, 12 * s, t.text, 700, 'middle'));
      p.push(lt(x + 96 * s, y0 + 60 * s, '+', 14 * s, t.accent, 700));
    });
    const sy = y + 340 * s;
    p.push(rect(x + 18 * s, sy, w - 36 * s, 120 * s, t.muted, 12 * s));
    [
      ['المجموع الفرعي', '194,000 د.ع'],
      ['التوصيل – بغداد', 'مجاني'],
      ['الإجمالي', '194,000 د.ع'],
    ].forEach(([l, v], i) => {
      p.push(ar(R - 14 * s, sy + 28 * s + i * 34 * s, l, i === 2 ? 12 * s : 10 * s, i === 2 ? t.text : t.sub, i === 2 ? 800 : 500));
      p.push(ar(x + 32 * s, sy + 28 * s + i * 34 * s, v, i === 2 ? 13 * s : 10 * s, i === 2 ? t.accent : t.text, 700, 'left'));
    });
    p.push(rect(x + 18 * s, y + h - 64 * s, w - 36 * s, 50 * s, `url(#g${id})`, 25 * s));
    p.push(ar(x + w / 2, y + h - 33 * s, 'إتمام الشراء', 14 * s, '#fff', 800, 'center'));
    return p.join('');
  };
  // payment screen
  const pay = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 24 * s, 'طريقة الدفع', 17 * s, t.text, 800));
    [
      ['زين كاش', 'ادفع من محفظتك · 0770 *** 4567', true],
      ['الدفع عند الاستلام', 'ادفع نقداً للمندوب', false],
      ['كي كارد / ماستر كارد', 'دفع آمن عبر البطاقة', false],
    ].forEach(([n, d, on], i) => {
      const y0 = y + 48 * s + i * 78 * s;
      p.push(rect(x + 18 * s, y0, w - 36 * s, 66 * s, on ? '#fff4ec' : t.panel, 12 * s, `stroke="${on ? t.accent : '#eee6df'}" stroke-width="${on ? 2.5 : 1.5}"`));
      p.push(`<circle cx="${R - 16 * s}" cy="${y0 + 33 * s}" r="${8 * s}" fill="none" stroke="${on ? t.accent : t.sub}" stroke-width="${2 * s}"/>`);
      if (on) p.push(circle(R - 16 * s, y0 + 33 * s, 4 * s, t.accent));
      p.push(ar(R - 34 * s, y0 + 28 * s, n, 12 * s, t.text, 700));
      p.push(ar(R - 34 * s, y0 + 48 * s, d, 9 * s, t.sub, 500));
    });
    p.push(ar(R, y + 316 * s, 'رمز التحقق من زين كاش', 12 * s, t.text, 700));
    [0, 1, 2, 3, 4, 5].forEach((i) => {
      const cw = (w - 36 * s - 5 * 8 * s) / 6;
      const cx = R - cw - i * (cw + 8 * s);
      p.push(rect(cx, y + 330 * s, cw, 46 * s, t.muted, 10 * s, i < 4 ? `stroke="${t.accent}" stroke-width="${1.5 * s}"` : ''));
      if (i < 4) p.push(lt(cx + cw / 2, y + 361 * s, '●', 12 * s, t.text, 700, 'middle'));
    });
    p.push(ar(x + w / 2, y + 404 * s, 'إعادة إرسال الرمز خلال 00:42', 9 * s, t.sub, 500, 'center'));
    p.push(rect(x + 18 * s, y + 424 * s, w - 36 * s, 58 * s, '#eef2f7', 12 * s));
    p.push(ar(R - 14 * s, y + 447 * s, 'المبلغ المستحق', 10 * s, t.sub, 500));
    p.push(ar(R - 14 * s, y + 470 * s, '194,000 د.ع', 15 * s, t.text, 800));
    p.push(rect(x + 18 * s, y + h - 64 * s, w - 36 * s, 50 * s, `url(#g${id})`, 25 * s));
    p.push(ar(x + w / 2, y + h - 33 * s, 'تأكيد الدفع', 14 * s, '#fff', 800, 'center'));
    return p.join('');
  };
  b.push(phoneFrame(id, 560, 180, 1.0, t.panel, cart));
  b.push(phoneFrame(id, 180, 240, 0.92, t.panel, pay));
  // notification toast
  b.push(rect(940, 640, 560, 96, '#0c0c12', 20, `stroke="#3a3a48" stroke-width="1.5" filter="url(#sh${id})"`));
  b.push(rect(1440, 662, 40, 40, `url(#g${id})`, 10));
  b.push(ar(1424, 678, 'سوق بابل · الآن', 12, '#9ca3af', 500));
  b.push(ar(1424, 706, 'طلبك #48212 مع المندوب علي حسين وسيصلك خلال ساعتين', 15, '#fff', 700));
  b.push(rect(940, 760, 560, 96, '#0c0c12', 20, `stroke="#3a3a48" stroke-width="1.5" filter="url(#sh${id})"`));
  b.push(rect(1440, 782, 40, 40, '#22c55e', 10));
  b.push(ar(1424, 798, 'زين كاش · قبل 5 دقائق', 12, '#9ca3af', 500));
  b.push(ar(1424, 826, 'تم خصم 194,000 د.ع بنجاح لصالح سوق بابل', 15, '#fff', 700));
  return wrap(t, id, b.join(''));
}

// ---- 6. Dijla Academy — e-learning ---------------------------------------
function dijlaCover(t) {
  const id = 'dijla';
  const b = [];
  b.push(rtlNavbar(t, 'أكاديمية دجلة', ['الرئيسية', 'الدورات', 'الفصول المباشرة', 'المعلمون', 'الأسعار'], 'ابدأ التعلم مجاناً', { id }));
  b.push(circle(330, 330, 300, `url(#glow${id})`));
  b.push(rect(1290, 130, 220, 34, '#e0f2f1', 17));
  b.push(ar(1400, 153, 'منصة التعليم الأولى في العراق', 13, t.accent, 700, 'center'));
  b.push(ar(1510, 226, 'تعلّم من أفضل المعلمين', 58, t.text, 800));
  b.push(ar(1510, 296, 'في أي وقت ومن أي محافظة', 58, `url(#g${id})`, 800));
  b.push(ar(1510, 350, 'دورات منهجية للصفوف المنتهية والجامعات، فصول مباشرة تفاعلية، امتحانات إلكترونية', 17, t.sub, 500));
  b.push(ar(1510, 380, 'وشهادات معتمدة. أكثر من 12,000 طالب من بغداد وأربيل والبصرة والموصل يتعلمون معنا.', 17, t.sub, 500));
  b.push(rect(1310, 420, 200, 56, `url(#g${id})`, 28));
  b.push(ar(1410, 456, 'تصفح الدورات', 16, '#fff', 700, 'center'));
  b.push(rect(1090, 420, 200, 56, 'none', 28, `stroke="${t.accent}" stroke-width="2"`));
  b.push(ar(1190, 456, '▶ شاهد درساً تجريبياً', 15, t.accent, 700, 'center'));
  // hero: live class card
  b.push(rect(90, 130, 620, 380, t.panel, 24, `filter="url(#sh${id})"`));
  b.push(rect(110, 150, 580, 260, `url(#g${id})`, 18, 'opacity="0.9"'));
  b.push(rect(122, 162, 96, 28, '#ef4444', 14));
  b.push(ar(170, 181, '● مباشر', 12, '#fff', 700, 'center'));
  b.push(ar(676, 200, 'الرياضيات – السادس العلمي', 22, '#fff', 800));
  b.push(ar(676, 228, 'الأستاذ حيدر الساعدي · 1,240 طالب متصل', 13, 'rgba(255,255,255,0.85)', 500));
  b.push(`<path d="M300 360 L330 300 L370 330 L410 260 L450 290 L500 230" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>`);
  b.push(circle(360, 320, 30, 'rgba(255,255,255,0.25)'));
  b.push(`<path d="M352 306 L374 320 L352 334 Z" fill="#fff"/>`);
  [0, 1, 2, 3].forEach((i) => b.push(circle(140 + i * 26, 460, 16, i === 3 ? t.accent2 : t.muted)));
  b.push(ar(676, 466, 'انضم الآن · تبقّى 18 دقيقة', 15, t.text, 700));
  // stats
  [['+12,000', 'طالب'], ['+350', 'دورة'], ['+120', 'معلم'], ['98%', 'نسبة النجاح']].forEach(([v, l], i) => {
    const x = 1510 - i * 240;
    b.push(lt(x, 560, v, 30, t.accent, 800, 'end'));
    b.push(ar(x, 586, l, 13, t.sub, 500));
  });
  // courses
  b.push(ar(1510, 650, 'الدورات الأكثر طلباً', 28, t.text, 800));
  b.push(ar(90, 650, 'عرض جميع الدورات ←', 15, t.accent, 700, 'left'));
  const courses = [
    ['الفيزياء – السادس العلمي', 'أ. علي الموسوي', '75,000 د.ع', '#0d9488'],
    ['اللغة الإنجليزية – TOEFL', 'أ. زينب أحمد', '120,000 د.ع', '#4f46e5'],
    ['البرمجة بلغة Python', 'م. أحمد الجبوري', '90,000 د.ع', '#0ea5e9'],
    ['الكيمياء – الثالث المتوسط', 'أ. سارة الحسيني', '50,000 د.ع', '#f59e0b'],
  ];
  courses.forEach(([n, tch, pr, c], i) => {
    const w = 340;
    const x = 1510 - w - i * (w + 20);
    b.push(rect(x, 680, w, 280, t.panel, 18, `filter="url(#sh${id})"`));
    b.push(rect(x + 16, 696, w - 32, 130, c, 12, 'opacity="0.85"'));
    b.push(rect(x + 28, 708, 80, 24, 'rgba(255,255,255,0.9)', 12));
    b.push(ar(x + 68, 725, '24 درساً', 11, c, 700, 'center'));
    b.push(ar(x + w - 20, 860, n, 16, t.text, 700));
    b.push(ar(x + w - 20, 886, tch, 12, t.sub, 500));
    b.push(`<text x="${x + w - 20}" y="${912}" direction="rtl" text-anchor="start" font-family="${AR_FONT}" font-size="12" fill="#f59e0b">★★★★★ 4.9</text>`);
    b.push(ar(x + 20, 930, pr, 17, t.accent, 800, 'left'));
    b.push(rect(x + w - 20 - 100, 916, 100, 30, '#e0f2f1', 15));
    b.push(ar(x + w - 70, 936, 'اشترك', 12, t.accent, 700, 'center'));
  });
  return wrap(t, id, b.join(''));
}

function dijlaDetail(t) {
  const id = 'dijla';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'أكاديمية دجلة', ['لوحة المعلم', 'دوراتي', 'الفصول المباشرة', 'الامتحانات', 'الطلاب', 'الشهادات', 'الرسائل', 'الإعدادات'], 0, 'لوحة المعلم · أ. حيدر الساعدي', {
    user: 'أ. حيدر الساعدي',
    userSub: 'معلم رياضيات',
  });
  b.push(shell);
  const cw = (right - left - 3 * 24) / 4;
  [
    ['الطلاب المسجلون', '3,420', '+128'],
    ['نسبة إكمال الدروس', '87%', '+4%'],
    ['امتحانات بانتظار التصحيح', '14', ''],
    ['متوسط درجات الامتحان', '81/100', '+3'],
  ].forEach(([l, v, d], i) => b.push(kpi(t, right - cw - i * (cw + 24), 100, cw, 132, l, v, d, id, i % 2 ? t.accent2 : t.accent)));
  // live class schedule (right)
  b.push(
    rtlTable(
      t,
      id,
      right - 720,
      262,
      720,
      [
        { w: 230, label: 'الدرس' },
        { w: 170, label: 'الصف' },
        { w: 140, label: 'الموعد' },
        { w: 100, label: 'الطلاب' },
        { w: 80, label: 'الحالة' },
      ],
      [
        [{ s: 'التفاضل – الفصل الثالث', bold: true }, 'السادس العلمي', 'اليوم 6:00 م', '1,240', { s: 'مباشر', chip: '#fee2e2', fill: '#b91c1c' }],
        [{ s: 'مراجعة الامتحان الوزاري', bold: true }, 'السادس العلمي', 'غداً 5:00 م', '980', { s: 'مجدول', chip: '#dbeafe', fill: '#1d4ed8' }],
        [{ s: 'الهندسة التحليلية', bold: true }, 'الخامس العلمي', 'الأربعاء 7:00 م', '640', { s: 'مجدول', chip: '#dbeafe', fill: '#1d4ed8' }],
        [{ s: 'حل أسئلة الطلاب', bold: true }, 'جميع الصفوف', 'الخميس 8:00 م', '—', { s: 'مجدول', chip: '#dbeafe', fill: '#1d4ed8' }],
      ],
      { title: 'الفصول المباشرة القادمة' },
    ),
  );
  // students by governorate donut (left)
  b.push(
    donut(t, id, left, 262, right - 720 - 24 - left, 336, 'الطلاب حسب المحافظة', [
      { label: 'بغداد', v: 0.44, color: t.accent },
      { label: 'أربيل', v: 0.21, color: t.accent2 },
      { label: 'البصرة', v: 0.15, color: '#0ea5e9' },
      { label: 'أخرى', v: 0.2, color: '#cbd5e1' },
    ], '3,420', 'طالب'),
  );
  // exam grading list (bottom right)
  const gx = right - 720;
  b.push(rect(gx, 622, 720, 334, t.panel, 18, `filter="url(#sh${id})"`));
  b.push(ar(right - 28, 662, 'الامتحان الشهري – بانتظار التصحيح', 17, t.text, 700));
  b.push(rect(gx + 24, 640, 130, 32, `url(#g${id})`, 16));
  b.push(ar(gx + 89, 661, 'تصحيح تلقائي', 12, '#fff', 700, 'center'));
  [
    ['مريم عبد الله', 'بغداد – الكرخ', '38 / 40', '#22c55e'],
    ['يوسف كريم', 'أربيل', '31 / 40', '#22c55e'],
    ['حوراء حسن', 'البصرة', '27 / 40', '#f59e0b'],
    ['محمد صالح', 'الموصل', '22 / 40', '#f59e0b'],
    ['نبأ علي', 'كربلاء', '—', '#94a3b8'],
  ].forEach(([n, g, sc, c], i) => {
    const y = 700 + i * 50;
    b.push(circle(right - 48, y + 4, 16, t.muted));
    b.push(ar(right - 76, y + 2, n, 14, t.text, 700));
    b.push(ar(right - 76, y + 22, g, 11, t.sub, 500));
    b.push(rect(gx + 24, y - 10, 90, 28, c, 14, 'opacity="0.18"'));
    b.push(lt(gx + 69, y + 9, sc, 13, c === '#94a3b8' ? t.sub : c, 700, 'middle'));
    b.push(rect(gx + 300, y - 2, 240, 8, t.muted, 4));
    b.push(rect(gx + 300 + 240 - (sc === '—' ? 0 : (240 * Number.parseInt(sc)) / 40), y - 2, sc === '—' ? 0 : (240 * Number.parseInt(sc)) / 40, 8, `url(#g${id})`, 4));
  });
  // parent view card (bottom left)
  const pw = right - 720 - 24 - left;
  b.push(rect(left, 622, pw, 334, '#0f172a', 18));
  b.push(ar(left + pw - 28, 662, 'واجهة ولي الأمر', 17, '#fff', 700));
  b.push(ar(left + pw - 28, 690, 'الطالبة: مريم عبد الله · السادس العلمي', 13, '#94a3b8', 500));
  [['الحضور', '96%', 0.96], ['إكمال الواجبات', '88%', 0.88], ['معدل الامتحانات', '84%', 0.84]].forEach(([l, v, r], i) => {
    const y = 730 + i * 56;
    b.push(ar(left + pw - 28, y, l, 13, '#cbd5e1', 600));
    b.push(lt(left + 28, y, v, 14, '#fff', 800));
    b.push(rect(left + 28, y + 12, pw - 56, 8, '#1e293b', 4));
    b.push(rect(left + 28 + (pw - 56) * (1 - r), y + 12, (pw - 56) * r, 8, `url(#g${id})`, 4));
  });
  b.push(rect(left + 28, 906, pw - 56, 36, '#1e293b', 18));
  b.push(ar(left + pw / 2, 929, 'إرسال التقرير الأسبوعي عبر واتساب', 12, '#5eead4', 700, 'center'));
  return wrap(t, id, b.join(''));
}


// ---- 7. Ayadati — doctor booking app -----------------------------------------
const AYA_TABS = ['الرئيسية', 'الأطباء', 'حجوزاتي', 'سجلي الطبي', 'حسابي'];
function ayadatiCover(t) {
  const id = 'aya';
  const b = [];
  b.push(circle(800, 520, 560, `url(#glow${id})`));
  b.push(rect(650, 40, 300, 34, '#ccfbf1', 17));
  b.push(ar(800, 63, 'بغداد · البصرة', 13, '#0f766e', 700, 'center'));
  b.push(ar(800, 118, 'عيادتي — احجز موعدك مع طبيبك', 40, t.text, 800, 'center'));
  b.push(ar(800, 152, 'ابحث حسب التخصص، احجز فوراً، واستلم تذكيراً قبل الموعد', 16, t.sub, 500, 'center'));
  const home = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 22 * s, 'مرحباً، زهراء', 15 * s, t.text, 800));
    p.push(ar(R, y + 42 * s, 'بغداد – الجادرية', 10 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + 56 * s, w - 36 * s, 38 * s, t.muted, 12 * s));
    p.push(ar(R - 14 * s, y + 80 * s, 'ابحث عن طبيب أو تخصص...', 11 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + 108 * s, w - 36 * s, 96 * s, `url(#g${id})`, 16 * s));
    p.push(ar(R - 14 * s, y + 142 * s, 'موعدك القادم', 10 * s, 'rgba(255,255,255,0.85)', 500));
    p.push(ar(R - 14 * s, y + 166 * s, 'د. أحمد الخفاجي · باطنية', 13 * s, '#fff', 800));
    p.push(ar(R - 14 * s, y + 188 * s, 'غداً 10:30 ص · مستشفى الكندي', 10 * s, 'rgba(255,255,255,0.9)', 500));
    p.push(ar(R, y + 240 * s, 'التخصصات', 13 * s, t.text, 800));
    ['باطنية', 'أطفال', 'أسنان', 'نسائية', 'قلبية', 'عيون', 'جلدية', 'عظام'].forEach((c, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const cw = (w - 36 * s - 3 * 10 * s) / 4;
      const cx = R - cw - col * (cw + 10 * s);
      const cy = y + 256 * s + row * 76 * s;
      p.push(rect(cx, cy, cw, 66 * s, t.panel, 12 * s, `stroke="#dfeeea" stroke-width="${1.5 * s}"`));
      p.push(circle(cx + cw / 2, cy + 24 * s, 12 * s, i === 0 ? t.accent : t.muted));
      p.push(ar(cx + cw / 2, cy + 56 * s, c, 9 * s, t.text, 600, 'center'));
    });
    p.push(ar(R, y + 424 * s, 'الأعلى تقييماً', 13 * s, t.text, 800));
    p.push(rect(x + 18 * s, y + 436 * s, w - 36 * s, 54 * s, t.panel, 12 * s, `stroke="#dfeeea" stroke-width="${1.5 * s}"`));
    p.push(circle(R - 30 * s, y + 463 * s, 18 * s, t.muted));
    p.push(ar(R - 58 * s, y + 458 * s, 'د. سارة العامري · نسائية', 11 * s, t.text, 700));
    p.push(ar(R - 58 * s, y + 478 * s, '★ 4.9 · البصرة – العشار', 9 * s, t.sub, 500));
    p.push(tabBar(x, y + h - 64 * s, w, s, AYA_TABS, 0, t.accent, t.sub));
    return p.join('');
  };
  const list = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 24 * s, 'أطباء الباطنية', 17 * s, t.text, 800));
    p.push(ar(R, y + 44 * s, '38 طبيباً في بغداد', 10 * s, t.sub, 500));
    ['الكل', 'الأقرب', 'الأعلى تقييماً', 'متاح اليوم'].forEach((f, i) => {
      const fw = [40, 56, 84, 72][i] * s;
      let fx = R;
      for (let j = 0; j < i; j++) fx -= [40, 56, 84, 72][j] * s + 8 * s;
      p.push(rect(fx - fw, y + 58 * s, fw, 26 * s, i === 3 ? t.accent : t.muted, 13 * s));
      p.push(ar(fx - fw / 2, y + 76 * s, f, 9 * s, i === 3 ? '#fff' : t.text, 700, 'center'));
    });
    [
      ['د. أحمد الخفاجي', 'استشاري باطنية · مستشفى الكندي', '4.9', '25,000 د.ع', 'متاح اليوم'],
      ['د. ليلى الربيعي', 'أخصائية باطنية · عيادة المنصور', '4.8', '20,000 د.ع', 'غداً'],
      ['د. حسين الزبيدي', 'استشاري جهاز هضمي · الحارثية', '4.7', '30,000 د.ع', 'متاح اليوم'],
      ['د. رنا السعدي', 'أخصائية باطنية · الكرادة', '4.9', '20,000 د.ع', 'الخميس'],
    ].forEach(([n, sp, r, pr, av], i) => {
      const y0 = y + 100 * s + i * 100 * s;
      p.push(rect(x + 18 * s, y0, w - 36 * s, 90 * s, t.panel, 12 * s, `stroke="#dfeeea" stroke-width="${1.5 * s}"`));
      p.push(rect(R - 68 * s, y0 + 12 * s, 56 * s, 56 * s, t.muted, 12 * s));
      p.push(ar(R - 78 * s, y0 + 28 * s, n, 12 * s, t.text, 700));
      p.push(ar(R - 78 * s, y0 + 46 * s, sp, 9 * s, t.sub, 500));
      p.push(ar(R - 78 * s, y0 + 66 * s, `★ ${r} · ${pr}`, 9 * s, '#f59e0b', 700));
      p.push(rect(x + 30 * s, y0 + 52 * s, 76 * s, 26 * s, av === 'متاح اليوم' ? '#dcfce7' : t.muted, 13 * s));
      p.push(ar(x + 68 * s, y0 + 70 * s, av, 9 * s, av === 'متاح اليوم' ? '#15803d' : t.sub, 700, 'center'));
    });
    p.push(tabBar(x, y + h - 64 * s, w, s, AYA_TABS, 1, t.accent, t.sub));
    return p.join('');
  };
  const book = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(rect(x, y, w, 120 * s, `url(#g${id})`, 0));
    p.push(circle(R - 30 * s, y + 46 * s, 28 * s, 'rgba(255,255,255,0.3)'));
    p.push(ar(R - 70 * s, y + 42 * s, 'د. أحمد الخفاجي', 14 * s, '#fff', 800));
    p.push(ar(R - 70 * s, y + 62 * s, 'استشاري باطنية · 15 سنة خبرة', 9 * s, 'rgba(255,255,255,0.9)', 500));
    p.push(ar(R - 70 * s, y + 82 * s, 'مستشفى الكندي – بغداد', 9 * s, 'rgba(255,255,255,0.9)', 500));
    p.push(ar(R, y + 152 * s, 'اختر اليوم', 12 * s, t.text, 800));
    [['السبت', '6'], ['الأحد', '7'], ['الاثنين', '8'], ['الثلاثاء', '9'], ['الأربعاء', '10']].forEach(([d, n], i) => {
      const dw = (w - 36 * s - 4 * 8 * s) / 5;
      const dx = R - dw - i * (dw + 8 * s);
      p.push(rect(dx, y + 164 * s, dw, 56 * s, i === 1 ? t.accent : t.muted, 10 * s));
      p.push(ar(dx + dw / 2, y + 184 * s, d, 8 * s, i === 1 ? '#fff' : t.sub, 600, 'center'));
      p.push(lt(dx + dw / 2, y + 208 * s, n, 14 * s, i === 1 ? '#fff' : t.text, 800, 'middle'));
    });
    p.push(ar(R, y + 252 * s, 'الوقت المتاح', 12 * s, t.text, 800));
    ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00'].forEach((tm, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const tw = (w - 36 * s - 2 * 8 * s) / 3;
      const tx = R - tw - col * (tw + 8 * s);
      const ty = y + 264 * s + row * 44 * s;
      const sel = i === 3;
      const busy = i === 1 || i === 6;
      p.push(rect(tx, ty, tw, 36 * s, sel ? t.accent : busy ? '#f1f5f9' : t.panel, 10 * s, sel ? '' : `stroke="${busy ? '#e2e8f0' : t.accent}" stroke-width="${1.5 * s}"`));
      p.push(lt(tx + tw / 2, ty + 23 * s, tm + (i < 6 ? ' ص' : ' م'), 10 * s, sel ? '#fff' : busy ? '#cbd5e1' : t.text, 700, 'middle'));
    });
    p.push(rect(x + 18 * s, y + 410 * s, w - 36 * s, 60 * s, t.muted, 12 * s));
    p.push(ar(R - 14 * s, y + 434 * s, 'الأحد 7 أيلول · 10:30 ص', 11 * s, t.text, 700));
    p.push(ar(R - 14 * s, y + 454 * s, 'رسوم الكشف 25,000 د.ع · ادفع في العيادة أو بزين كاش', 8.5 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + h - 64 * s, w - 36 * s, 50 * s, `url(#g${id})`, 25 * s));
    p.push(ar(x + w / 2, y + h - 33 * s, 'تأكيد الحجز', 14 * s, '#fff', 800, 'center'));
    return p.join('');
  };
  b.push(phoneFrame(id, 1010, 250, 0.9, t.panel, home));
  b.push(phoneFrame(id, 630, 175, 1.05, t.panel, list));
  b.push(phoneFrame(id, 290, 250, 0.9, t.panel, book));
  return wrap(t, id, b.join(''));
}

function ayadatiDetail(t) {
  const id = 'aya';
  const b = [];
  b.push(circle(1100, 500, 520, `url(#glow${id})`));
  b.push(ar(1510, 150, 'تذكيرات ووصفات إلكترونية', 46, t.text, 800));
  b.push(ar(1510, 200, 'يُذكّر المريض قبل الموعد عبر الإشعارات وواتساب، ويستلم وصفته إلكترونياً بعد الزيارة', 18, t.sub, 500));
  ['تذكير تلقائي قبل 24 ساعة وقبل ساعة من الموعد', 'وصفة إلكترونية موقّعة من الطبيب مع الجرعات', 'سجل طبي شخصي لكل زيارات العائلة', 'تطبيق منفصل للطبيب لإدارة الجدول والمرضى'].forEach((f, i) => {
    const y = 260 + i * 58;
    b.push(rect(1470, y, 40, 40, '#ccfbf1', 12));
    b.push(circle(1490, y + 20, 7, t.accent));
    b.push(ar(1450, y + 27, f, 17, t.text, 600));
  });
  // whatsapp reminder card
  b.push(rect(950, 520, 560, 150, '#e7fbe9', 20, `filter="url(#sh${id})"`));
  b.push(rect(1450, 542, 40, 40, '#22c55e', 12));
  b.push(ar(1434, 560, 'عيادتي عبر واتساب · 9:00 ص', 12, '#4b5563', 500));
  b.push(ar(1434, 592, 'تذكير: موعدك مع د. أحمد الخفاجي غداً الساعة 10:30 ص', 15, '#111827', 700));
  b.push(ar(1434, 618, 'مستشفى الكندي – الطابق الثاني – عيادة 12. للإلغاء أرسل "إلغاء".', 13, '#4b5563', 500));
  b.push(rect(974, 632, 120, 28, '#22c55e', 14));
  b.push(ar(1034, 651, 'تأكيد الحضور ✓', 11, '#fff', 700, 'center'));
  // doctor app metric card
  b.push(rect(950, 700, 560, 220, t.panel, 20, `filter="url(#sh${id})"`));
  b.push(ar(1482, 740, 'تطبيق الطبيب · اليوم', 16, t.text, 700));
  [['المواعيد', '24'], ['الحضور', '21'], ['وصفات', '19'], ['التقييم', '4.9']].forEach(([l, v], i) => {
    const x = 1482 - 118 - i * 130;
    b.push(rect(x, 760, 118, 110, t.muted, 14));
    b.push(lt(x + 59, 812, v, 28, t.accent, 800, 'middle'));
    b.push(ar(x + 59, 848, l, 12, t.sub, 600, 'center'));
  });
  // prescription phone
  const rx = (x, y, w, h, s) => {
    const p = [];
    const R = x + w - 18 * s;
    p.push(ar(R, y + 24 * s, 'الوصفة الإلكترونية', 17 * s, t.text, 800));
    p.push(rect(R - 100 * s, y + 36 * s, 100 * s, 24 * s, '#dcfce7', 12 * s));
    p.push(ar(R - 50 * s, y + 53 * s, 'موقّعة رقمياً ✓', 9 * s, '#15803d', 700, 'center'));
    p.push(rect(x + 18 * s, y + 72 * s, w - 36 * s, 76 * s, t.muted, 12 * s));
    p.push(ar(R - 14 * s, y + 98 * s, 'د. أحمد الخفاجي · استشاري باطنية', 11 * s, t.text, 700));
    p.push(ar(R - 14 * s, y + 116 * s, 'المريضة: زهراء محمد · 7 أيلول 2026', 9 * s, t.sub, 500));
    p.push(ar(R - 14 * s, y + 134 * s, 'التشخيص: التهاب معدة حاد', 9 * s, t.sub, 500));
    [
      ['Omeprazole 20mg', 'كبسولة واحدة صباحاً قبل الفطور · 14 يوماً'],
      ['Amoxicillin 500mg', 'كبسولة كل 8 ساعات · 7 أيام'],
      ['Paracetamol 500mg', 'حبة عند الحاجة · بحد أقصى 3 مرات يومياً'],
    ].forEach(([m, d], i) => {
      const y0 = y + 164 * s + i * 78 * s;
      p.push(rect(x + 18 * s, y0, w - 36 * s, 66 * s, t.panel, 12 * s, `stroke="#dfeeea" stroke-width="${1.5 * s}"`));
      p.push(rect(R - 44 * s, y0 + 14 * s, 32 * s, 32 * s, `url(#g${id})`, 8 * s, 'opacity="0.25"'));
      p.push(lt(R - 56 * s, y0 + 28 * s, m, 11 * s, t.text, 700, 'end'));
      p.push(ar(R - 56 * s, y0 + 50 * s, d, 8.5 * s, t.sub, 500));
    });
    p.push(rect(x + 18 * s, y + 410 * s, w - 36 * s, 50 * s, t.muted, 12 * s));
    p.push(ar(R - 14 * s, y + 432 * s, 'مراجعة بعد أسبوعين', 10 * s, t.text, 700));
    p.push(ar(R - 14 * s, y + 450 * s, 'سنذكّرك قبل الموعد تلقائياً', 8.5 * s, t.sub, 500));
    p.push(rect(x + 18 * s, y + h - 64 * s, (w - 44 * s) / 2, 50 * s, `url(#g${id})`, 25 * s));
    p.push(ar(x + 18 * s + (w - 44 * s) / 4, y + h - 33 * s, 'إرسال للصيدلية', 11 * s, '#fff', 800, 'center'));
    p.push(rect(x + 26 * s + (w - 44 * s) / 2, y + h - 64 * s, (w - 44 * s) / 2, 50 * s, 'none', 25 * s, `stroke="${t.accent}" stroke-width="${2 * s}"`));
    p.push(ar(x + 26 * s + (3 * (w - 44 * s)) / 4, y + h - 33 * s, 'تحميل PDF', 11 * s, t.accent, 800, 'center'));
    return p.join('');
  };
  b.push(phoneFrame(id, 480, 150, 1.05, t.panel, rx));
  // reminder notification on the far left
  b.push(rect(90, 250, 350, 110, '#0c0c12', 18, `filter="url(#sh${id})"`));
  b.push(rect(380, 270, 36, 36, `url(#g${id})`, 9));
  b.push(ar(366, 286, 'عيادتي · قبل ساعة', 11, '#9ca3af', 500));
  b.push(ar(366, 312, 'موعدك بعد ساعة مع د. أحمد الخفاجي', 14, '#fff', 700));
  b.push(ar(366, 336, 'الكندي – عيادة 12 · اضغط لعرض الاتجاهات', 11, '#9ca3af', 500));
  b.push(rect(90, 390, 350, 110, '#0c0c12', 18, `filter="url(#sh${id})"`));
  b.push(rect(380, 410, 36, 36, '#22c55e', 9));
  b.push(ar(366, 426, 'عيادتي · الآن', 11, '#9ca3af', 500));
  b.push(ar(366, 452, 'تمت إضافة وصفتك الإلكترونية', 14, '#fff', 700));
  b.push(ar(366, 476, 'اعرضها من سجلي الطبي أو أرسلها للصيدلية', 11, '#9ca3af', 500));
  return wrap(t, id, b.join(''));
}

// ---- 8. Rawatib — HR & payroll SaaS ---------------------------------------------
const RAW_MENU = ['لوحة التحكم', 'الموظفون', 'الحضور والانصراف', 'الإجازات', 'الرواتب', 'الضمان الاجتماعي', 'التقارير', 'الشركات والفروع'];
function rawatibCover(t) {
  const id = 'raw';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'رواتب', RAW_MENU, 0, 'لوحة التحكم · شركة النخيل للنقل', {
    sideBg: '#0f172a',
    sideText: '#fff',
    sideSub: '#94a3b8',
    userBg: '#1e293b',
    user: 'هدى الكرخي',
    userSub: 'مديرة الموارد البشرية',
  });
  b.push(shell);
  // tenant switcher
  b.push(rect(left + 340, 18, 250, 36, t.bg, 18, `stroke="${t.muted}" stroke-width="1"`));
  b.push(ar(left + 570, 42, 'شركة النخيل للنقل ▾ · 3 فروع', 13, t.text, 700));
  const cw = (right - left - 3 * 24) / 4;
  [
    ['إجمالي الموظفين', '248', '+6'],
    ['رواتب أيلول', '312,400,000 د.ع', '+2.1%'],
    ['نسبة الحضور اليوم', '94%', '+1%'],
    ['طلبات إجازة معلقة', '9', ''],
  ].forEach(([l, v, d], i) => b.push(kpi(t, right - cw - i * (cw + 24), 100, cw, 132, l, v, d, id)));
  // attendance bars (right)
  b.push(barChart(t, id, right - 760, 262, 760, 330, 'الحضور اليومي – آخر أسبوعين', ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4'], [30, 36, 28, 40, 33, 41, 38, 44, 36, 39, 42, 45, 31, 33], { bar: '#dbe4f0', hi: 13, legend: 'عدد الموظفين الحاضرين من أصل 248' }));
  // payroll donut (left)
  b.push(
    donut(t, id, left, 262, right - 760 - 24 - left, 330, 'توزيع الرواتب حسب الفرع', [
      { label: 'أربيل – الإدارة', v: 0.46, color: t.accent },
      { label: 'بغداد', v: 0.34, color: t.accent2 },
      { label: 'البصرة', v: 0.2, color: '#a5b4fc' },
    ], '312.4', 'مليون د.ع'),
  );
  // leave requests table (bottom)
  b.push(
    rtlTable(
      t,
      id,
      left,
      616,
      right - left,
      [
        { w: 220, label: 'الموظف' },
        { w: 190, label: 'الفرع / القسم' },
        { w: 170, label: 'نوع الإجازة' },
        { w: 220, label: 'المدة' },
        { w: 160, label: 'الرصيد المتبقي' },
        { w: 130, label: 'الحالة' },
      ],
      [
        [{ s: 'أحمد سعد الجنابي', bold: true }, 'بغداد – العمليات', 'اعتيادية', '7 – 11 أيلول (5 أيام)', '18 يوماً', { s: 'بانتظار الموافقة', chip: '#fef3c7', fill: '#b45309' }],
        [{ s: 'ريام كامل', bold: true }, 'أربيل – المحاسبة', 'مرضية', '3 – 4 أيلول (يومان)', '12 يوماً', { s: 'موافق عليها', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'عمر حسن البياتي', bold: true }, 'البصرة – السائقون', 'اعتيادية', '15 – 20 أيلول (6 أيام)', '9 أيام', { s: 'بانتظار الموافقة', chip: '#fef3c7', fill: '#b45309' }],
        [{ s: 'نور ياسين', bold: true }, 'أربيل – الإدارة', 'أمومة', '1 تشرين الأول (72 يوماً)', '—', { s: 'موافق عليها', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'حيدر عباس', bold: true }, 'بغداد – المستودع', 'بدون راتب', '10 أيلول (يوم واحد)', '0', { s: 'مرفوضة', chip: '#fee2e2', fill: '#b91c1c' }],
      ],
      { title: 'طلبات الإجازة الأخيرة' },
    ),
  );
  return wrap(t, id, b.join(''));
}

function rawatibDetail(t) {
  const id = 'raw';
  const b = [];
  const [shell, right, left] = rtlShell(t, id, 'رواتب', RAW_MENU, 4, 'مسير رواتب أيلول 2026', {
    sideBg: '#0f172a',
    sideText: '#fff',
    sideSub: '#94a3b8',
    userBg: '#1e293b',
    user: 'هدى الكرخي',
    userSub: 'مديرة الموارد البشرية',
  });
  b.push(shell);
  // run header
  b.push(rect(left, 96, right - left, 120, t.panel, 18, `filter="url(#sh${id})"`));
  b.push(ar(right - 28, 140, 'مسير الرواتب – أيلول 2026 · شركة النخيل للنقل (جميع الفروع)', 20, t.text, 800));
  b.push(ar(right - 28, 172, 'الفترة: 1 – 30 أيلول · 248 موظفاً · الصرف عبر تحويل بنكي (مصرف الفرات) وزين كاش', 14, t.sub, 500));
  ['المسودة', 'المراجعة', 'الاعتماد', 'الصرف'].forEach((s, i) => {
    const x = right - 28 - 700 - i * 150;
    b.push(circle(x, 196, 10, i <= 1 ? t.accent : t.muted));
    b.push(ar(x - 18, 201, s, 12, i <= 1 ? t.text : t.sub, i === 1 ? 700 : 500));
  });
  b.push(rect(left + 24, 130, 190, 46, `url(#g${id})`, 23));
  b.push(ar(left + 119, 159, 'اعتماد المسير ✓', 14, '#fff', 700, 'center'));
  b.push(rect(left + 230, 130, 170, 46, 'none', 23, `stroke="${t.muted}" stroke-width="2"`));
  b.push(ar(left + 315, 159, 'تصدير ملف البنك', 14, t.text, 700, 'center'));
  // totals
  const cw = (right - left - 3 * 24) / 4;
  [
    ['إجمالي الرواتب الأساسية', '256,800,000 د.ع', ''],
    ['البدلات والإضافي', '38,150,000 د.ع', '+4%'],
    ['الاستقطاعات والسلف', '9,300,000 د.ع', ''],
    ['اشتراك الضمان الاجتماعي', '27,250,000 د.ع', ''],
  ].forEach(([l, v, d], i) => b.push(kpi(t, right - cw - i * (cw + 24), 240, cw, 130, l, v, d, id, i === 3 ? t.accent2 : undefined)));
  // payroll table
  b.push(
    rtlTable(
      t,
      id,
      left,
      394,
      right - left,
      [
        { w: 210, label: 'الموظف' },
        { w: 150, label: 'الفرع' },
        { w: 160, label: 'الأساسي' },
        { w: 130, label: 'البدلات' },
        { w: 110, label: 'إضافي' },
        { w: 130, label: 'الاستقطاعات' },
        { w: 120, label: 'الضمان' },
        { w: 150, label: 'الصافي' },
        { w: 90, label: 'الحالة' },
      ],
      [
        [{ s: 'أحمد سعد الجنابي', bold: true }, 'بغداد', '1,250,000', '150,000', '80,000', '0', '62,500', { s: '1,417,500 د.ع', bold: true }, { s: 'جاهز', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'ريام كامل', bold: true }, 'أربيل', '1,800,000', '200,000', '0', '100,000', '90,000', { s: '1,810,000 د.ع', bold: true }, { s: 'جاهز', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'عمر حسن البياتي', bold: true }, 'البصرة', '950,000', '120,000', '140,000', '0', '47,500', { s: '1,162,500 د.ع', bold: true }, { s: 'جاهز', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'نور ياسين', bold: true }, 'أربيل', '2,400,000', '300,000', '0', '0', '120,000', { s: '2,580,000 د.ع', bold: true }, { s: 'جاهز', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'حيدر عباس', bold: true }, 'بغداد', '850,000', '100,000', '60,000', '250,000', '42,500', { s: '717,500 د.ع', bold: true }, { s: 'سلفة', chip: '#fef3c7', fill: '#b45309' }],
        [{ s: 'سجى فاضل', bold: true }, 'أربيل', '1,400,000', '150,000', '0', '0', '70,000', { s: '1,480,000 د.ع', bold: true }, { s: 'جاهز', chip: '#dcfce7', fill: '#15803d' }],
        [{ s: 'كرار محمد', bold: true }, 'البصرة', '1,100,000', '120,000', '95,000', '0', '55,000', { s: '1,260,000 د.ع', bold: true }, { s: 'مراجعة', chip: '#dbeafe', fill: '#1d4ed8' }],
        [{ s: 'دعاء طارق', bold: true }, 'بغداد', '1,650,000', '180,000', '0', '50,000', '82,500', { s: '1,697,500 د.ع', bold: true }, { s: 'جاهز', chip: '#dcfce7', fill: '#15803d' }],
      ],
      { title: 'تفاصيل الرواتب · 8 من 248 موظفاً' },
    ),
  );
  return wrap(t, id, b.join(''));
}

// ---- 9. Kashier — cloud POS ---------------------------------------------------
function kashierCover(t) {
  const id = 'kash';
  const b = [];
  // top bar
  b.push(rect(0, 0, W, 68, t.panel, 0));
  b.push(rect(W - 72, 18, 32, 32, `url(#g${id})`, 9));
  b.push(ar(W - 86, 43, 'كاشير · مطعم بيت بغدادي – فرع الكرادة', 18, t.text, 700));
  b.push(rect(W - 560, 18, 130, 32, '#14532d', 16));
  b.push(circle(W - 545, 34, 5, '#22c55e'));
  b.push(ar(W - 560 + 118, 39, 'متصل · مزامن', 12, '#86efac', 700));
  b.push(rect(W - 710, 18, 130, 32, t.muted, 16));
  b.push(ar(W - 710 + 118, 39, 'الوردية: مسائية', 12, t.sub, 700));
  b.push(ar(40, 43, 'الكاشير: مصطفى · 8:42 م', 13, t.sub, 500, 'left'));
  // categories column (far right)
  const cats = ['الكل', 'مشويات', 'مقبلات', 'شوربات', 'مشروبات', 'حلويات', 'عروض'];
  cats.forEach((c, i) => {
    const y = 92 + i * 70;
    b.push(rect(W - 180, y, 140, 56, i === 1 ? `url(#g${id})` : t.panel, 14));
    b.push(ar(W - 110, y + 35, c, 15, i === 1 ? '#0b0f0a' : t.text, 700, 'center'));
  });
  // items grid
  const items = [
    ['كباب عراقي', '12,000'], ['تكة لحم', '15,000'], ['دجاج مشوي', '10,000'], ['كص لحم', '9,000'],
    ['حمص', '3,000'], ['متبل', '3,000'], ['سلطة', '2,500'], ['خبز تنور', '1,000'],
    ['شوربة عدس', '3,500'], ['بيبسي', '1,000'], ['شاي عراقي', '1,000'], ['كنافة', '5,000'],
    ['دولمة', '8,000'], ['عصير برتقال', '2,500'], ['شاي كرك', '1,500'], ['بقلاوة', '4,000'],
  ];
  items.forEach(([n, p], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const w = 200;
    const x = W - 200 - w - col * (w + 16);
    const y = 92 + row * 212;
    b.push(rect(x, y, w, 196, t.panel, 16, `stroke="${t.muted}" stroke-width="1.5"`));
    b.push(rect(x + 14, y + 14, w - 28, 100, `url(#g${id})`, 12, `opacity="${0.15 + (i % 4) * 0.12}"`));
    b.push(ar(x + w - 16, y + 146, n, 16, t.text, 700));
    b.push(ar(x + w - 16, y + 176, p + ' د.ع', 15, t.accent, 800));
    if (i === 0) {
      b.push(rect(x + 14, y + 152, 28, 28, t.accent, 14));
      b.push(lt(x + 28, y + 172, '2', 14, '#0b0f0a', 800, 'middle'));
    }
  });
  // order panel (left)
  const ow = 480;
  b.push(rect(40, 92, ow, H - 132, t.panel, 20));
  b.push(ar(40 + ow - 24, 132, 'الطلب #1042 · طاولة 7', 18, t.text, 800));
  b.push(rect(64, 108, 100, 30, t.muted, 15));
  b.push(ar(114, 128, 'صالة', 12, t.sub, 700, 'center'));
  [
    ['كباب عراقي', '2', '24,000'],
    ['تكة لحم', '1', '15,000'],
    ['حمص', '1', '3,000'],
    ['خبز تنور', '4', '4,000'],
    ['شاي عراقي', '3', '3,000'],
  ].forEach(([n, q, p], i) => {
    const y = 176 + i * 64;
    b.push(rect(64, y - 14, ow - 48, 52, t.muted, 12, 'opacity="0.5"'));
    b.push(ar(40 + ow - 40, y + 18, n, 15, t.text, 700));
    b.push(rect(64 + 150, y - 2, 90, 30, t.panel, 15));
    b.push(lt(64 + 195, y + 19, `${q} ×`, 13, t.text, 700, 'middle'));
    b.push(ar(78, y + 18, p, 15, t.text, 700, 'left'));
  });
  b.push(`<line x1="64" y1="520" x2="${40 + ow - 24}" y2="520" stroke="${t.muted}" stroke-width="1.5"/>`);
  [['المجموع', '49,000 د.ع'], ['خصم (عرض العائلة 10%)', '-4,900 د.ع'], ['رسوم الخدمة', '0 د.ع']].forEach(([l, v], i) => {
    b.push(ar(40 + ow - 24, 556 + i * 34, l, 14, t.sub, 500));
    b.push(ar(78, 556 + i * 34, v, 14, t.text, 600, 'left'));
  });
  b.push(ar(40 + ow - 24, 680, 'الإجمالي', 20, t.text, 800));
  b.push(ar(78, 680, '44,100 د.ع', 28, t.accent, 800, 'left'));
  ['نقداً', 'زين كاش', 'بطاقة'].forEach((m, i) => {
    const w = (ow - 48 - 24) / 3;
    const x = 40 + ow - 24 - w - i * (w + 12);
    b.push(rect(x, 712, w, 56, i === 0 ? t.muted : 'none', 14, `stroke="${i === 0 ? t.accent : t.muted}" stroke-width="2"`));
    b.push(ar(x + w / 2, 747, m, 15, i === 0 ? t.accent : t.text, 700, 'center'));
  });
  b.push(rect(64, 790, ow - 48, 64, `url(#g${id})`, 32));
  b.push(ar(40 + ow / 2, 830, 'إتمام الدفع وطباعة الفاتورة', 18, '#0b0f0a', 800, 'center'));
  b.push(rect(64, 870, (ow - 60) / 2, 50, 'none', 25, `stroke="${t.muted}" stroke-width="2"`));
  b.push(ar(64 + (ow - 60) / 4, 901, 'إرسال للمطبخ', 14, t.text, 700, 'center'));
  b.push(rect(76 + (ow - 60) / 2, 870, (ow - 60) / 2, 50, 'none', 25, `stroke="${t.muted}" stroke-width="2"`));
  b.push(ar(76 + (3 * (ow - 60)) / 4, 901, 'تعليق الطلب', 14, t.text, 700, 'center'));
  return wrap(t, id, b.join(''));
}

function kashierDetail(t) {
  const id = 'kash';
  const b = [];
  b.push(rect(0, 0, W, 68, t.panel, 0));
  b.push(rect(W - 72, 18, 32, 32, `url(#g${id})`, 9));
  b.push(ar(W - 86, 43, 'شاشة المطبخ · بيت بغدادي – الكرادة', 18, t.text, 700));
  b.push(ar(W - 500, 43, '8 طلبات نشطة · متوسط التحضير 11 دقيقة', 14, t.sub, 500));
  ['الكل', 'جديد', 'قيد التحضير', 'جاهز'].forEach((f, i) => {
    const x = 40 + i * 116;
    b.push(rect(x, 18, 106, 32, i === 0 ? `url(#g${id})` : t.muted, 16));
    b.push(ar(x + 53, 39, f, 12, i === 0 ? '#0b0f0a' : t.text, 700, 'center'));
  });
  const tickets = [
    ['#1042', 'طاولة 7', '02:15', 'جديد', '#ef4444', [['كباب عراقي', '2', 'بدون بصل'], ['تكة لحم', '1', ''], ['حمص', '1', ''], ['خبز تنور', '4', '']]],
    ['#1041', 'توصيل · طلبات', '06:40', 'قيد التحضير', '#f59e0b', [['دجاج مشوي', '2', 'حار'], ['شوربة عدس', '2', ''], ['بيبسي', '2', '']]],
    ['#1040', 'طاولة 3', '09:12', 'قيد التحضير', '#f59e0b', [['كص لحم', '3', ''], ['سلطة', '2', 'بدون طماطم'], ['متبل', '1', '']]],
    ['#1039', 'سفري', '12:05', 'جاهز', '#22c55e', [['كباب عراقي', '4', ''], ['خبز تنور', '6', ''], ['كنافة', '2', '']]],
    ['#1038', 'طاولة 12', '03:30', 'جديد', '#ef4444', [['تكة لحم', '2', 'استواء متوسط'], ['شوربة عدس', '1', '']]],
    ['#1037', 'توصيل · زين كاش', '14:48', 'جاهز', '#22c55e', [['دجاج مشوي', '1', ''], ['حمص', '2', ''], ['شاي عراقي', '2', '']]],
  ];
  tickets.forEach(([no, src, tm, st, c, lines], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const w = 494;
    const h = 420;
    const x = W - 40 - w - col * (w + 20);
    const y = 92 + row * (h + 20);
    b.push(rect(x, y, w, h, t.panel, 18, `stroke="${t.muted}" stroke-width="1.5"`));
    b.push(rect(x, y, w, 64, c, 18, 'opacity="0.18"'));
    b.push(rect(x, y + 50, w, 14, t.panel, 0));
    b.push(lt(x + w - 24, y + 41, no, 22, t.text, 800, 'end'));
    b.push(ar(x + w - 110, y + 40, src, 15, t.text, 600));
    b.push(rect(x + 24, y + 16, 90, 32, c, 16));
    b.push(lt(x + 69, y + 38, tm, 15, '#0b0f0a', 800, 'middle'));
    b.push(rect(x + 124, y + 16, 110, 32, t.muted, 16));
    b.push(ar(x + 179, y + 37, st, 12, c, 700, 'center'));
    lines.forEach(([n, q, note], j) => {
      const ly = y + 108 + j * 62;
      b.push(rect(x + w - 64, ly - 20, 40, 40, t.muted, 10));
      b.push(lt(x + w - 44, ly + 7, q, 18, t.accent, 800, 'middle'));
      b.push(ar(x + w - 80, ly + 6, n, 18, t.text, 700));
      if (note) b.push(ar(x + w - 80, ly + 28, `ملاحظة: ${note}`, 12, '#fbbf24', 600));
      b.push(`<line x1="${x + 24}" y1="${ly + 38}" x2="${x + w - 24}" y2="${ly + 38}" stroke="${t.muted}" stroke-width="1"/>`);
    });
    const ready = st === 'جاهز';
    b.push(rect(x + 24, y + h - 72, w - 48, 52, ready ? '#14532d' : `url(#g${id})`, 26));
    b.push(ar(x + w / 2, y + h - 39, ready ? 'تم التسليم ✓' : st === 'جديد' ? 'بدء التحضير' : 'الطلب جاهز', 16, ready ? '#86efac' : '#0b0f0a', 800, 'center'));
  });
  return wrap(t, id, b.join(''));
}

Object.assign(files, {
  'law-site-cover.svg': lawSiteCover(themes2.law),
  'law-site-detail.svg': lawSiteDetail(themes2.law),
  'law-dash-cover.svg': lawDashCover(themes2.lawDash),
  'law-dash-detail.svg': lawDashDetail(themes2.lawDash),
  'souq-store-cover.svg': souqStoreCover(themes2.souq),
  'souq-store-detail.svg': souqStoreDetail(themes2.souq),
  'souq-admin-cover.svg': souqAdminCover(themes2.souqAdmin),
  'souq-admin-detail.svg': souqAdminDetail(themes2.souqAdmin),
  'souq-app-cover.svg': souqAppCover(themes2.souqApp),
  'souq-app-detail.svg': souqAppDetail(themes2.souqApp),
  'dijla-cover.svg': dijlaCover(themes2.dijla),
  'dijla-detail.svg': dijlaDetail(themes2.dijla),
  'ayadati-cover.svg': ayadatiCover(themes2.ayadati),
  'ayadati-detail.svg': ayadatiDetail(themes2.ayadati),
  'rawatib-cover.svg': rawatibCover(themes2.rawatib),
  'rawatib-detail.svg': rawatibDetail(themes2.rawatib),
  'kashier-cover.svg': kashierCover(themes2.kashier),
  'kashier-detail.svg': kashierDetail(themes2.kashier),
});

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg, 'utf8');
  console.log('wrote', name);
}
