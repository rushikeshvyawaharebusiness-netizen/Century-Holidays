/*
  Traces the black-silhouette logo PNG into an SVG.

  Why: the lockup's thinnest feature — the slot inside the R — is ~21px tall in a
  302px-tall master, i.e. barely 3px at header size. Any raster pipeline resamples
  that into a soft grey smudge, so the R reads as a solid block and the compass C
  looks clipped. Vector paths stay crisp at every size and DPR.

  How: the artwork is a pure binary silhouette (black on transparent), so we can
  walk the boundary between opaque and transparent pixels exactly, then simplify the
  resulting staircase into straight segments.

  Run with: node scripts/trace-logo.mjs [sourceImage]
*/
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SOURCE = process.argv[2] ?? 'src/assets/images/logo.png';
const OUT = 'public/logo.svg';

// Trace resolution. Higher = more faithful curves, larger file.
const TRACE_WIDTH = 2400;
// Douglas–Peucker tolerance in trace pixels (~0.1px at final display size).
const EPSILON = 0.8;

const trimmed = await sharp(SOURCE).trim({ threshold: 1 }).resize({ width: TRACE_WIDTH }).png().toBuffer();
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const CH = info.channels;

const solid = (x, y) => x >= 0 && y >= 0 && x < W && y < H && data[(y * W + x) * CH + 3] > 128;

/*
  Collect directed boundary segments, each walked so the ink is on its left. Every
  boundary then forms a closed loop, and a vertex can be entered and left exactly
  once per loop — no ambiguity at diagonal pixel junctions.
*/
const key = (x, y) => x * (H + 2) + y;
const outgoing = new Map();

function addEdge(ax, ay, bx, by) {
  const k = key(ax, ay);
  const list = outgoing.get(k);
  if (list) list.push([bx, by]);
  else outgoing.set(k, [[bx, by]]);
}

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!solid(x, y)) continue;
    if (!solid(x, y - 1)) addEdge(x + 1, y, x, y); // ink below the edge
    if (!solid(x, y + 1)) addEdge(x, y + 1, x + 1, y + 1); // ink above
    if (!solid(x - 1, y)) addEdge(x, y, x, y + 1); // ink to the right
    if (!solid(x + 1, y)) addEdge(x + 1, y + 1, x + 1, y); // ink to the left
  }
}

// Stitch segments into closed loops.
const loops = [];
for (const [startKey, list] of outgoing) {
  while (list.length) {
    const startX = Math.floor(startKey / (H + 2));
    const startY = startKey % (H + 2);
    const loop = [[startX, startY]];
    let [cx, cy] = list.pop();

    while (!(cx === startX && cy === startY)) {
      loop.push([cx, cy]);
      const next = outgoing.get(key(cx, cy));
      if (!next || !next.length) break; // defensive: open chain, drop it
      [cx, cy] = next.pop();
    }

    if (cx === startX && cy === startY && loop.length > 3) loops.push(loop);
  }
}

/* Collapse the pixel staircase into straight lines. */
function simplify(points, epsilon) {
  if (points.length < 3) return points;

  const distToSegment = ([px, py], [ax, ay], [bx, by]) => {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - ax, py - ay);
    let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  };

  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];

  while (stack.length) {
    const [first, last] = stack.pop();
    let worst = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const d = distToSegment(points[i], points[first], points[last]);
      if (d > worst) {
        worst = d;
        index = i;
      }
    }
    if (index !== -1 && worst > epsilon) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }

  return points.filter((_, i) => keep[i]);
}

const round = (n) => Math.round(n * 100) / 100;
const subpaths = loops
  .map((loop) => simplify([...loop, loop[0]], EPSILON))
  .filter((loop) => loop.length > 3)
  .map((loop) => 'M' + loop.map(([x, y]) => `${round(x)} ${round(y)}`).join('L') + 'Z');

/* fill-rule=evenodd so counters punch through regardless of loop winding. */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Century Holidays"><path fill="currentColor" fill-rule="evenodd" d="${subpaths.join('')}"/></svg>`;

writeFileSync(OUT, svg);

console.log(`Traced ${SOURCE} → ${OUT}`);
console.log(`  viewBox 0 0 ${W} ${H} · ${subpaths.length} subpaths · ${(svg.length / 1024).toFixed(1)}KB`);
