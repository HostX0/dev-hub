// Generates the illustrative SVG artwork used by the template demos under public/demos/art.
// Deterministic (seeded PRNG) so re-running produces identical files. No external images
// are used anywhere in the demos: everything is drawn here.
//
//   node scripts/gen-demo-art.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../public/demos/art");
mkdirSync(OUT, { recursive: true });

const rng = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const f = (n) => Number(n.toFixed(1));
const grain = (W, H, amount = 0.08) =>
  `<filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 ${amount}"/></feComponentTransfer></filter><rect width="${W}" height="${H}" filter="url(#g)"/>`;
const vignette = (W, H, o = 0.55) =>
  `<radialGradient id="v" cx="50%" cy="45%" r="70%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${o}"/></radialGradient><rect width="${W}" height="${H}" fill="url(#v)"/>`;
const svg = (W, H, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>`;
const write = (name, content) => writeFileSync(join(OUT, name), content);

/* ---------- Photography (duotone scenes) ---------- */
const P = {
  mono: ["#0d0d0d", "#e9e5dd", "#c0392b"],
  night: ["#0b1020", "#f0c674", "#f0c674"],
  dusk: ["#1a1026", "#f28c6b", "#ffd6a5"],
  sea: ["#08131c", "#8fd3e8", "#ffffff"],
  sand: ["#2b1a0e", "#f4d7a8", "#ffffff"],
  rose: ["#221018", "#f5c6c6", "#ffffff"],
};

function mountains(W, H, pal, r) {
  const [dark, light] = pal;
  let s = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  const sx = W * (0.3 + r() * 0.4), sy = H * (0.28 + r() * 0.15);
  s += `<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(H * 0.09)}" fill="${light}" opacity="0.95"/>`;
  for (let layer = 0; layer < 5; layer++) {
    const base = H * (0.45 + layer * 0.11);
    const pts = [`0,${H}`];
    for (let x = 0; x <= W; x += W / 14)
      pts.push(`${f(x)},${f(base - r() * H * (0.16 - layer * 0.02) - (layer === 0 ? H * 0.06 : 0))}`);
    pts.push(`${W},${H}`);
    s += `<polygon points="${pts.join(" ")}" fill="${dark}" opacity="${0.35 + layer * 0.16}"/>`;
    if (layer < 4) s += `<rect y="${f(base)}" width="${W}" height="${f(H * 0.12)}" fill="${light}" opacity="0.05"/>`;
  }
  return s;
}
function sea(W, H, pal, r) {
  const [dark, light, acc] = pal;
  const horizon = H * 0.56;
  let s = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dark}"/><stop offset="1" stop-color="${light}"/></linearGradient><rect width="${W}" height="${f(horizon)}" fill="url(#sky)"/>`;
  s += `<linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient><rect y="${f(horizon)}" width="${W}" height="${f(H - horizon)}" fill="url(#w)"/>`;
  const sx = W * 0.5;
  s += `<circle cx="${sx}" cy="${f(horizon - H * 0.05)}" r="${f(H * 0.07)}" fill="${acc}"/>`;
  for (let i = 0; i < 26; i++) {
    const y = horizon + (i / 26) * (H - horizon);
    const w = W * 0.06 + (i / 26) * W * 0.5 * r();
    s += `<rect x="${f(sx - w / 2)}" y="${f(y)}" width="${f(w)}" height="2" fill="${acc}" opacity="${0.5 - i * 0.015}"/>`;
  }
  for (let i = 0; i < 12; i++) {
    const y = horizon + 20 + i * ((H - horizon) / 12);
    let d = `M0 ${f(y)}`;
    for (let x = 0; x <= W; x += 40) d += ` L${x} ${f(y + Math.sin(x / 60 + i) * (3 + i))}`;
    s += `<path d="${d}" stroke="${dark}" stroke-width="1.5" fill="none" opacity="0.35"/>`;
  }
  return s;
}
function city(W, H, pal, r) {
  const [dark, light] = pal;
  let s = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dark}"/><stop offset="1" stop-color="${light}"/></linearGradient><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  s += `<circle cx="${f(W * 0.78)}" cy="${f(H * 0.2)}" r="${f(H * 0.06)}" fill="${light}"/>`;
  let x = -20;
  const buildings = [];
  while (x < W) {
    const w = 40 + r() * 110, h = H * (0.25 + r() * 0.5);
    buildings.push({ x, w, h });
    x += w + 6 + r() * 20;
  }
  for (const b of buildings) {
    s += `<rect x="${f(b.x)}" y="${f(H - b.h)}" width="${f(b.w)}" height="${f(b.h)}" fill="${dark}"/>`;
    for (let wy = H - b.h + 16; wy < H - 10; wy += 22)
      for (let wx = b.x + 8; wx < b.x + b.w - 10; wx += 18)
        if (r() > 0.55) s += `<rect x="${f(wx)}" y="${f(wy)}" width="8" height="12" fill="${light}" opacity="${0.4 + r() * 0.6}"/>`;
  }
  s += `<rect y="${f(H * 0.82)}" width="${W}" height="${f(H * 0.18)}" fill="${dark}" opacity="0.7"/>`;
  return s;
}
function bokeh(W, H, pal, r, n = 26) {
  const [, light] = pal;
  let s = "";
  for (let i = 0; i < n; i++)
    s += `<circle cx="${f(r() * W)}" cy="${f(r() * H)}" r="${f(6 + r() * 34)}" fill="${light}" opacity="${0.05 + r() * 0.2}"/>`;
  return s;
}
function bust(W, H, pal, cx, scale, veil = false) {
  const [dark, light] = pal;
  const hy = H * 0.42, hr = H * 0.11 * scale;
  const shoulders = `M${f(cx - W * 0.42 * scale)} ${H} C${f(cx - W * 0.4 * scale)} ${f(hy + hr * 2.1)}, ${f(cx - W * 0.16 * scale)} ${f(hy + hr * 1.35)}, ${f(cx)} ${f(hy + hr * 1.25)} C${f(cx + W * 0.16 * scale)} ${f(hy + hr * 1.35)}, ${f(cx + W * 0.4 * scale)} ${f(hy + hr * 2.1)}, ${f(cx + W * 0.42 * scale)} ${H} Z`;
  let s = "";
  if (veil)
    s += `<path d="M${f(cx - hr * 1.6)} ${f(hy - hr * 0.9)} Q${f(cx)} ${f(hy - hr * 2.2)} ${f(cx + hr * 1.6)} ${f(hy - hr * 0.9)} L${f(cx + hr * 2.4)} ${H} L${f(cx - hr * 2.4)} ${H} Z" fill="${light}" opacity="0.18"/>`;
  s += `<path d="${shoulders}" fill="${dark}"/><circle cx="${f(cx)}" cy="${f(hy)}" r="${f(hr)}" fill="${dark}"/><ellipse cx="${f(cx)}" cy="${f(hy + hr * 0.95)}" rx="${f(hr * 0.42)}" ry="${f(hr * 0.5)}" fill="${dark}"/>`;
  // rim light
  s += `<path d="${shoulders}" fill="none" stroke="${light}" stroke-width="3" opacity="0.55" transform="translate(-6,0)"/><circle cx="${f(cx)}" cy="${f(hy)}" r="${f(hr)}" fill="none" stroke="${light}" stroke-width="3" opacity="0.55" transform="translate(-5,-2)"/>`;
  return s;
}
function portrait(W, H, pal, r, wedding = false) {
  const [dark, light] = pal;
  let s = `<radialGradient id="bg" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
  s += bokeh(W, H, pal, r, wedding ? 40 : 18);
  if (wedding) s += bust(W, H, pal, W * 0.36, 0.78) + bust(W, H, pal, W * 0.62, 0.7, true);
  else s += bust(W, H, pal, W * 0.5, 1);
  return s;
}
function dunes(W, H, pal, r) {
  const [dark, light] = pal;
  let s = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  s += `<circle cx="${f(W * 0.7)}" cy="${f(H * 0.3)}" r="${f(H * 0.1)}" fill="${light}"/>`;
  for (let i = 0; i < 4; i++) {
    const y = H * (0.5 + i * 0.13);
    const c1 = W * (0.2 + r() * 0.3), c2 = W * (0.6 + r() * 0.3);
    s += `<path d="M0 ${f(y + 40)} C${f(c1)} ${f(y - 90)}, ${f(c2)} ${f(y + 110)}, ${W} ${f(y - 20)} L${W} ${H} L0 ${H} Z" fill="${dark}" opacity="${0.45 + i * 0.15}"/>`;
    s += `<path d="M0 ${f(y + 40)} C${f(c1)} ${f(y - 90)}, ${f(c2)} ${f(y + 110)}, ${W} ${f(y - 20)}" stroke="${light}" stroke-width="2" fill="none" opacity="0.25"/>`;
  }
  return s;
}

const photos = [
  ["photo-01", 1200, 1500, "portrait", P.mono, portrait],
  ["photo-02", 1600, 1000, "landscape", P.dusk, mountains],
  ["photo-03", 1200, 1200, "urban", P.night, city],
  ["photo-04", 1200, 1500, "wedding", P.rose, (W, H, p, r) => portrait(W, H, p, r, true)],
  ["photo-05", 1600, 1000, "landscape", P.sea, sea],
  ["photo-06", 1200, 1500, "portrait", P.sand, portrait],
  ["photo-07", 1600, 1000, "landscape", P.sand, dunes],
  ["photo-08", 1200, 1200, "urban", P.mono, city],
  ["photo-09", 1200, 1500, "wedding", P.dusk, (W, H, p, r) => portrait(W, H, p, r, true)],
  ["photo-10", 1600, 1000, "landscape", P.night, mountains],
  ["photo-11", 1200, 1200, "portrait", P.rose, portrait],
  ["photo-12", 1600, 1000, "landscape", P.mono, sea],
];
photos.forEach(([name, W, H, , pal, fn], i) => {
  const r = rng(1000 + i * 97);
  write(`${name}.svg`, svg(W, H, fn(W, H, pal, r) + vignette(W, H) + grain(W, H)));
});

/* ---------- Restaurant dishes (flat illustrations) ---------- */
const table = "#e9d9bd";
function plate(W, food, r, rim = "#f8f2e6") {
  const c = W / 2;
  return (
    `<rect width="${W}" height="${W}" fill="${table}"/>` +
    `<circle cx="${c}" cy="${c}" r="${W * 0.36}" fill="#2b2118" opacity="0.14" transform="translate(14,22)"/>` +
    `<circle cx="${c}" cy="${c}" r="${W * 0.36}" fill="${rim}"/><circle cx="${c}" cy="${c}" r="${W * 0.29}" fill="#fffaf0"/><circle cx="${c}" cy="${c}" r="${W * 0.33}" fill="none" stroke="#d9c7a2" stroke-width="3"/>` +
    food(c, W * 0.29, r)
  );
}
const dot = (x, y, rad, fill, o = 1) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${fill}" opacity="${o}"/>`;
const scatter = (c, R, r, n, rad, colors) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = r() * R;
    s += dot(c + Math.cos(a) * d, c + Math.sin(a) * d, rad * (0.7 + r() * 0.6), colors[i % colors.length]);
  }
  return s;
};
const dishes = {
  "dish-01": (c, R, r) => {
    // kebab + rice
    let s = `<ellipse cx="${c}" cy="${c + R * 0.2}" rx="${R * 0.75}" ry="${R * 0.45}" fill="#f5e6c4"/>`;
    s += scatter(c, R * 0.55, r, 60, 4, ["#d9b978", "#eed9ad", "#c19a52"]);
    for (let i = -1; i <= 1; i++)
      s += `<rect x="${c - R * 0.7}" y="${c - R * 0.55 + i * 34}" width="${R * 1.4}" height="22" rx="11" fill="#6b3a1f" transform="rotate(-8 ${c} ${c})"/><rect x="${c - R * 0.7}" y="${c - R * 0.55 + i * 34}" width="${R * 1.4}" height="22" rx="11" fill="#a3562c" opacity="0.5" transform="rotate(-8 ${c} ${c}) translate(0,-4)"/>`;
    s += dot(c + R * 0.55, c + R * 0.45, 26, "#c0392b") + dot(c + R * 0.62, c + R * 0.38, 9, "#e74c3c", 0.7);
    s += scatter(c, R * 0.8, r, 18, 5, ["#3f5a36", "#5f8a4f"]);
    return s;
  },
  "dish-02": (c, R, r) => {
    // dolma cluster
    let s = "";
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2, d = i < 3 ? R * 0.18 : R * 0.55;
      const x = c + Math.cos(a) * d, y = c + Math.sin(a) * d;
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="34" ry="20" fill="#3f5a36" transform="rotate(${f(a * 57)} ${f(x)} ${f(y)})"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="30" ry="8" fill="#5f8a4f" opacity="0.6" transform="rotate(${f(a * 57)} ${f(x)} ${f(y)})"/>`;
    }
    s += scatter(c, R * 0.85, r, 12, 5, ["#c0392b", "#f5e6c4"]);
    return s;
  },
  "dish-03": (c, R, r) => {
    // masgouf fish
    let s = `<ellipse cx="${c}" cy="${c}" rx="${R * 0.78}" ry="${R * 0.36}" fill="#b35b2a"/><polygon points="${c + R * 0.7},${c} ${c + R * 0.98},${c - R * 0.3} ${c + R * 0.98},${c + R * 0.3}" fill="#b35b2a"/>`;
    for (let i = -3; i <= 3; i++) s += `<path d="M${c + i * 34} ${c - R * 0.3} q 14 ${R * 0.3} 0 ${R * 0.6}" stroke="#e08a4f" stroke-width="5" fill="none" opacity="0.8"/>`;
    s += dot(c - R * 0.55, c - R * 0.08, 8, "#2b2118");
    s += scatter(c, R * 0.9, r, 10, 12, ["#f2c94c", "#c0392b"]) + scatter(c, R * 0.9, r, 14, 4, ["#3f5a36"]);
    return s;
  },
  "dish-04": (c, R) => {
    // lentil soup
    let s = `<circle cx="${c}" cy="${c}" r="${R * 0.82}" fill="#e2b04a"/><circle cx="${c}" cy="${c}" r="${R * 0.82}" fill="none" stroke="#c98a2a" stroke-width="10"/>`;
    s += `<path d="M${c - R * 0.5} ${c} q ${R * 0.25} -${R * 0.3} ${R * 0.5} 0 t ${R * 0.5} 0" stroke="#fff3d0" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.8"/>`;
    s += dot(c + R * 0.3, c - R * 0.35, 18, "#3f5a36") + dot(c - R * 0.35, c + R * 0.3, 12, "#3f5a36");
    s += `<path d="M${c + R * 0.55} ${c + R * 0.55} l 40 40" stroke="#f8f2e6" stroke-width="16" stroke-linecap="round"/>`;
    return s;
  },
  "dish-05": (c, R, r) => {
    // baklava diamonds
    let s = "";
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++) {
        const x = c + i * R * 0.5, y = c + j * R * 0.5;
        s += `<rect x="${x - 40}" y="${y - 40}" width="80" height="80" rx="6" fill="#d9a441" transform="rotate(45 ${x} ${y})"/><rect x="${x - 40}" y="${y - 40}" width="80" height="80" rx="6" fill="#f2c94c" opacity="0.6" transform="rotate(45 ${x} ${y}) translate(0,-6)"/>`;
        s += dot(x, y, 10, "#5f8a4f");
      }
    s += scatter(c, R * 0.9, r, 10, 4, ["#5f8a4f"]);
    return s;
  },
  "dish-06": (c, R) => {
    // istikan tea
    const w = R * 0.5;
    let s = `<path d="M${c - w} ${c - R * 0.7} L${c - w * 0.7} ${c + R * 0.7} L${c + w * 0.7} ${c + R * 0.7} L${c + w} ${c - R * 0.7} Z" fill="#b8541f"/><path d="M${c - w} ${c - R * 0.7} L${c - w * 0.85} ${c - R * 0.1} Q${c} ${c + R * 0.05} ${c + w * 0.85} ${c - R * 0.1} L${c + w} ${c - R * 0.7} Z" fill="#e07a2f"/>`;
    s += `<ellipse cx="${c}" cy="${c - R * 0.7}" rx="${w}" ry="14" fill="#f8f2e6" opacity="0.9"/>`;
    for (let i = -1; i <= 1; i++) s += `<path d="M${c + i * 40} ${c - R * 0.85} q 20 -40 0 -80 q -20 -40 0 -80" stroke="#8a7a68" stroke-width="6" fill="none" opacity="0.5" stroke-linecap="round"/>`;
    s += `<rect x="${c - w * 1.3}" y="${c + R * 0.7}" width="${w * 2.6}" height="18" rx="9" fill="#d9c7a2"/>`;
    return s;
  },
};
Object.entries(dishes).forEach(([name, fn], i) => {
  const r = rng(500 + i);
  write(`${name}.svg`, svg(800, 800, plate(800, fn, r) + grain(800, 800, 0.05)));
});

/* ---------- Company project visuals ---------- */
const navy = "#10233f", amber = "#f59e0b", cream = "#f7f6f2";
const grid = (W, H) => {
  let s = "";
  for (let x = 0; x <= W; x += 80) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${cream}" stroke-opacity="0.08"/>`;
  for (let y = 0; y <= H; y += 80) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${cream}" stroke-opacity="0.08"/>`;
  return s;
};
const co = {
  "co-project-01": (W, H, r) => {
    let s = `<rect width="${W}" height="${H}" fill="${navy}"/>` + grid(W, H);
    for (let i = 0; i < 12; i++) {
      const h = 120 + r() * 520, x = 160 + i * 110;
      s += `<rect x="${x}" y="${H - 120 - h}" width="70" height="${f(h)}" rx="8" fill="${i % 3 === 0 ? amber : cream}" opacity="${i % 3 === 0 ? 1 : 0.25}"/>`;
    }
    s += `<circle cx="${W * 0.82}" cy="${H * 0.28}" r="150" fill="none" stroke="${amber}" stroke-width="28" stroke-dasharray="620 320"/>`;
    return s;
  },
  "co-project-02": (W, H, r) => {
    let s = `<rect width="${W}" height="${H}" fill="${cream}"/>`;
    for (let x = 0; x <= W; x += 40) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${navy}" stroke-opacity="0.07"/>`;
    for (let y = 0; y <= H; y += 40) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${navy}" stroke-opacity="0.07"/>`;
    const rooms = [[200, 160, 520, 360], [720, 160, 460, 200], [720, 360, 460, 160], [200, 520, 980, 300]];
    for (const [x, y, w, h] of rooms) s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${navy}" stroke-width="6"/>`;
    for (let i = 0; i < 8; i++) s += `<circle cx="${f(300 + r() * 800)}" cy="${f(240 + r() * 500)}" r="14" fill="${amber}"/>`;
    s += `<rect x="1250" y="160" width="150" height="660" fill="${navy}"/><text x="1325" y="520" fill="${cream}" font-family="sans-serif" font-size="42" text-anchor="middle" transform="rotate(-90 1325 520)">A-01</text>`;
    return s;
  },
  "co-project-03": (W, H, r) => {
    let s = `<rect width="${W}" height="${H}" fill="${navy}"/>` + grid(W, H);
    const nodes = Array.from({ length: 14 }, () => [200 + r() * 1200, 150 + r() * 700]);
    nodes.forEach(([x, y], i) => {
      const [x2, y2] = nodes[(i + 3) % nodes.length];
      s += `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${cream}" stroke-opacity="0.25" stroke-width="2"/>`;
    });
    nodes.forEach(([x, y], i) => (s += `<circle cx="${f(x)}" cy="${f(y)}" r="${i % 4 === 0 ? 26 : 12}" fill="${i % 4 === 0 ? amber : cream}"/>`));
    return s;
  },
};
Object.entries(co).forEach(([name, fn], i) => write(`${name}.svg`, svg(1600, 1000, fn(1600, 1000, rng(900 + i)))));

/* ---------- Portraits ---------- */
write(
  "portrait-lawyer.svg",
  svg(800, 1000, `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#17223a"/><stop offset="1" stop-color="#060b14"/></linearGradient><rect width="800" height="1000" fill="url(#bg)"/>` +
    `<radialGradient id="glow" cx="50%" cy="38%" r="45%"><stop offset="0" stop-color="#c8a24a" stop-opacity="0.35"/><stop offset="1" stop-color="#c8a24a" stop-opacity="0"/></radialGradient><rect width="800" height="1000" fill="url(#glow)"/>` +
    `<circle cx="400" cy="380" r="300" fill="none" stroke="#c8a24a" stroke-opacity="0.35" stroke-width="2"/>` +
    bust(800, 1000, ["#1c2942", "#c8a24a"], 400, 1) + vignette(800, 1000, 0.35) + grain(800, 1000, 0.06)),
);
write(
  "portrait-photographer.svg",
  svg(800, 1000, `<radialGradient id="bg" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9c9c4"/></radialGradient><rect width="800" height="1000" fill="url(#bg)"/>` +
    bust(800, 1000, ["#111111", "#ffffff"], 400, 1) + `<circle cx="640" cy="180" r="18" fill="#c0392b"/>` + grain(800, 1000, 0.06)),
);
write(
  "portrait-chef.svg",
  svg(800, 1000, `<rect width="800" height="1000" fill="#3f5a36"/>` +
    bust(800, 1000, ["#2b2118", "#fbf3e4"], 400, 1) +
    `<path d="M300 300 q 100 -140 200 0 q 60 -40 40 60 l -280 0 q -20 -100 40 -60 z" fill="#fbf3e4"/>` + vignette(800, 1000, 0.3) + grain(800, 1000, 0.05)),
);

/* ---------- Clinic & real-estate portraits ---------- */
[["portrait-doctor-1", "#0e7490", "#e0f2fe"], ["portrait-doctor-2", "#0f766e", "#ccfbf1"], ["portrait-doctor-3", "#1d4ed8", "#dbeafe"]].forEach(
  ([name, dark, light]) =>
    write(`${name}.svg`, svg(800, 1000, `<rect width="800" height="1000" fill="${light}"/>` + bust(800, 1000, [dark, "#ffffff"], 400, 1) + grain(800, 1000, 0.04))),
);
[["portrait-agent-1", "#141414", "#c8f542"], ["portrait-agent-2", "#2a2a2a", "#e5e7e3"], ["portrait-agent-3", "#141414", "#d9ff6b"]].forEach(
  ([name, dark, light]) =>
    write(`${name}.svg`, svg(800, 1000, `<rect width="800" height="1000" fill="${light}"/>` + bust(800, 1000, [dark, "#ffffff"], 400, 1) + grain(800, 1000, 0.05))),
);

/* ---------- Real-estate property illustrations ---------- */
const skyRE = (W, H, top, bottom) =>
  `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
const tree = (x, y, s, c = "#3f6b3a") =>
  `<rect x="${x - 4 * s}" y="${y - 40 * s}" width="${8 * s}" height="${40 * s}" fill="#5b3f2a"/><circle cx="${x}" cy="${y - 60 * s}" r="${34 * s}" fill="${c}"/><circle cx="${x - 22 * s}" cy="${y - 42 * s}" r="${24 * s}" fill="${c}"/><circle cx="${x + 22 * s}" cy="${y - 44 * s}" r="${26 * s}" fill="${c}"/>`;
const windows = (x, y, w, h, cols, rows, lit, r) => {
  let s = "";
  const cw = w / cols, ch = h / rows;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
      s += `<rect x="${f(x + i * cw + cw * 0.22)}" y="${f(y + j * ch + ch * 0.2)}" width="${f(cw * 0.56)}" height="${f(ch * 0.6)}" rx="3" fill="${r() > 0.4 ? lit : "#1f2933"}"/>`;
  return s;
};
const properties = {
  "property-01": (W, H, r) => {
    // modern villa
    let s = skyRE(W, H, "#dbeafe", "#f8fafc") + `<rect y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="#cfd8c2"/>`;
    s += `<rect x="${W * 0.2}" y="${H * 0.36}" width="${W * 0.36}" height="${H * 0.36}" fill="#f4f1ea"/><rect x="${W * 0.5}" y="${H * 0.46}" width="${W * 0.32}" height="${H * 0.26}" fill="#e2ddd3"/>`;
    s += `<rect x="${W * 0.2}" y="${H * 0.34}" width="${W * 0.36}" height="${H * 0.025}" fill="#1f2933"/><rect x="${W * 0.5}" y="${H * 0.44}" width="${W * 0.32}" height="${H * 0.02}" fill="#1f2933"/>`;
    s += windows(W * 0.23, H * 0.4, W * 0.3, H * 0.28, 3, 2, "#9fd3f5", r) + windows(W * 0.53, H * 0.5, W * 0.26, H * 0.18, 3, 1, "#9fd3f5", r);
    s += `<rect x="${W * 0.6}" y="${H * 0.58}" width="${W * 0.06}" height="${H * 0.14}" fill="#5b3f2a"/>`;
    s += tree(W * 0.12, H * 0.72, 1.2) + tree(W * 0.9, H * 0.72, 1.4);
    return s;
  },
  "property-02": (W, H, r) => {
    // apartment tower at night
    let s = skyRE(W, H, "#0f172a", "#1e3a8a") + `<circle cx="${W * 0.8}" cy="${H * 0.2}" r="${H * 0.06}" fill="#fef3c7"/>`;
    s += `<rect y="${H * 0.8}" width="${W}" height="${H * 0.2}" fill="#0b1220"/>`;
    s += `<rect x="${W * 0.34}" y="${H * 0.12}" width="${W * 0.3}" height="${H * 0.68}" fill="#334155"/><rect x="${W * 0.16}" y="${H * 0.36}" width="${W * 0.18}" height="${H * 0.44}" fill="#1f2937"/><rect x="${W * 0.64}" y="${H * 0.3}" width="${W * 0.2}" height="${H * 0.5}" fill="#1f2937"/>`;
    s += windows(W * 0.35, H * 0.14, W * 0.28, H * 0.64, 4, 9, "#fde68a", r) + windows(W * 0.17, H * 0.38, W * 0.16, H * 0.4, 2, 5, "#fde68a", r) + windows(W * 0.65, H * 0.32, W * 0.18, H * 0.46, 2, 6, "#fde68a", r);
    return s;
  },
  "property-03": (W, H, r) => {
    // townhouse row
    let s = skyRE(W, H, "#fde68a", "#fff7ed") + `<rect y="${H * 0.74}" width="${W}" height="${H * 0.26}" fill="#d6ccb8"/>`;
    ["#c2410c", "#9a3412", "#ea580c"].forEach((c, i) => {
      const x = W * (0.14 + i * 0.25), w = W * 0.24;
      s += `<rect x="${x}" y="${H * 0.4}" width="${w}" height="${H * 0.34}" fill="${c}"/><polygon points="${x},${H * 0.4} ${x + w / 2},${H * 0.28} ${x + w},${H * 0.4}" fill="#3f2a1e"/>`;
      s += windows(x + w * 0.1, H * 0.44, w * 0.8, H * 0.16, 2, 1, "#bfdbfe", r);
      s += `<rect x="${x + w * 0.4}" y="${H * 0.62}" width="${w * 0.2}" height="${H * 0.12}" fill="#3f2a1e"/>`;
    });
    s += tree(W * 0.06, H * 0.74, 1);
    return s;
  },
  "property-04": (W, H, r) => {
    // glass penthouse block
    let s = skyRE(W, H, "#e0f2fe", "#bae6fd") + `<rect y="${H * 0.78}" width="${W}" height="${H * 0.22}" fill="#94a3b8"/>`;
    s += `<rect x="${W * 0.22}" y="${H * 0.2}" width="${W * 0.56}" height="${H * 0.58}" fill="#0f172a"/>`;
    s += windows(W * 0.23, H * 0.21, W * 0.54, H * 0.56, 6, 6, "#7dd3fc", r);
    s += `<rect x="${W * 0.22}" y="${H * 0.18}" width="${W * 0.56}" height="${H * 0.02}" fill="#c8f542"/>`;
    return s;
  },
  "property-05": (W, H, r) => {
    // farmhouse
    let s = skyRE(W, H, "#fef9c3", "#ecfccb") + `<rect y="${H * 0.7}" width="${W}" height="${H * 0.3}" fill="#86a95f"/>`;
    s += `<rect x="${W * 0.3}" y="${H * 0.42}" width="${W * 0.4}" height="${H * 0.28}" fill="#fefce8"/><polygon points="${W * 0.27},${H * 0.42} ${W * 0.5},${H * 0.24} ${W * 0.73},${H * 0.42}" fill="#7f1d1d"/>`;
    s += windows(W * 0.33, H * 0.46, W * 0.34, H * 0.12, 3, 1, "#bfdbfe", r);
    s += `<rect x="${W * 0.46}" y="${H * 0.56}" width="${W * 0.08}" height="${H * 0.14}" fill="#7f1d1d"/>`;
    s += tree(W * 0.12, H * 0.7, 1.5) + tree(W * 0.86, H * 0.7, 1.3) + tree(W * 0.94, H * 0.7, 0.9);
    return s;
  },
  "property-06": (W, H, r) => {
    // commercial / office
    let s = skyRE(W, H, "#f1f5f9", "#cbd5e1") + `<rect y="${H * 0.76}" width="${W}" height="${H * 0.24}" fill="#475569"/>`;
    s += `<rect x="${W * 0.18}" y="${H * 0.3}" width="${W * 0.64}" height="${H * 0.46}" fill="#e2e8f0"/><rect x="${W * 0.18}" y="${H * 0.3}" width="${W * 0.64}" height="${H * 0.05}" fill="#141414"/>`;
    s += windows(W * 0.2, H * 0.37, W * 0.6, H * 0.3, 5, 3, "#94a3b8", r);
    s += `<rect x="${W * 0.44}" y="${H * 0.62}" width="${W * 0.12}" height="${H * 0.14}" fill="#141414"/><rect x="${W * 0.2}" y="${H * 0.26}" width="${W * 0.2}" height="${H * 0.04}" fill="#c8f542"/>`;
    return s;
  },
};
Object.entries(properties).forEach(([name, fn], i) => write(`${name}.svg`, svg(1600, 1000, fn(1600, 1000, rng(700 + i)) + grain(1600, 1000, 0.04))));
write("re-hero.svg", svg(1600, 1000, city(1600, 1000, ["#141414", "#c8f542"], rng(4242)) + vignette(1600, 1000, 0.4) + grain(1600, 1000, 0.06)));

/* ---------- Clinic hero (stylised tooth) ---------- */
write(
  "clinic-hero.svg",
  svg(1600, 1000, `<rect width="1600" height="1000" fill="#e0f2fe"/><circle cx="1150" cy="480" r="360" fill="#bae6fd"/><circle cx="1150" cy="480" r="260" fill="#7dd3fc" opacity="0.6"/>` +
    `<path d="M1010 330 c60 -70 140 -70 140 0 c0 -70 80 -70 140 0 c50 60 30 180 -10 260 c-20 40 -40 130 -70 130 c-30 0 -30 -110 -60 -110 c-30 0 -30 110 -60 110 c-30 0 -50 -90 -70 -130 c-40 -80 -60 -200 -10 -260 z" fill="#ffffff"/>` +
    `<path d="M1060 400 c40 -30 100 -30 130 0" stroke="#bae6fd" stroke-width="12" stroke-linecap="round" fill="none"/>` +
    `<circle cx="400" cy="720" r="18" fill="#0e7490"/><circle cx="460" cy="260" r="10" fill="#0e7490"/><circle cx="1400" cy="200" r="14" fill="#14b8a6"/>` + grain(1600, 1000, 0.03)),
);

console.log(`wrote ${photos.length + Object.keys(dishes).length + Object.keys(co).length + Object.keys(properties).length + 11} files to ${OUT}`);
