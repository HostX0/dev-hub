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

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg, 'utf8');
  console.log('wrote', name);
}
