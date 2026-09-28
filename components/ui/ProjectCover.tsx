import React from 'react';
import { ProjectCover as CoverKind } from '../../types';

// Abstract cover art drawn from each project's method. Everything is painted with
// the theme's accent/ink variables, so the covers follow any colour theme.

const W = 400;
const H = 225;
const ACCENT = 'rgb(var(--c-accent))';
const INK = 'rgb(var(--c-ink))';

// Small deterministic PRNG so covers render identically on every load.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function gaussian(rand: () => number) {
  return Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand());
}

function Variants() {
  const rand = rng(7);
  const variantX = 238;
  const rows = Array.from({ length: 11 }, (_, i) => {
    const start = 24 + rand() * 150;
    const len = 150 + rand() * 170;
    return { y: 26 + i * 15, start, end: Math.min(start + len, 376) };
  });
  return (
    <>
      <rect x={variantX - 7} y={16} width={14} height={176} rx={4} fill={ACCENT} opacity={0.12} />
      {rows.map((r, i) => {
        const covers = r.start < variantX && r.end > variantX;
        const alt = covers && i % 3 !== 1;
        return (
          <g key={i}>
            <rect x={r.start} y={r.y} width={r.end - r.start} height={7} rx={3.5} fill={INK} opacity={0.14} />
            {alt && <rect x={variantX - 3} y={r.y} width={6} height={7} rx={1.5} fill={ACCENT} />}
          </g>
        );
      })}
      {/* trio pedigree */}
      <g transform="translate(318 186)" stroke={INK} strokeOpacity={0.45} strokeWidth={1.5} fill="none">
        <rect x={-26} y={-7} width={12} height={12} rx={2} fill="rgb(var(--c-surface))" />
        <circle cx={20} cy={-1} r={6} fill="rgb(var(--c-surface))" />
        <path d="M-14 -1 H14 M0 -1 V12 M0 12 V18" />
        <rect x={-6} y={18} width={12} height={12} rx={2} fill={ACCENT} stroke={ACCENT} />
      </g>
    </>
  );
}

function Pipeline() {
  const steps = ['FastQC', 'fastp', 'STAR', 'Counts', 'MultiQC'];
  const nodes = steps.map((label, i) => ({ label, x: 28 + i * 70, y: i % 2 ? 122 : 74 }));
  return (
    <>
      <path
        d={nodes.map((n, i) => `${i ? 'L' : 'M'}${n.x + 32} ${n.y + 15}`).join(' ')}
        fill="none" stroke={ACCENT} strokeWidth={2} strokeDasharray="4 5" opacity={0.6}
      />
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width={64} height={30} rx={8}
            fill={i === 2 ? ACCENT : 'rgb(var(--c-surface))'} stroke={ACCENT} strokeOpacity={0.35} />
          <text x={n.x + 32} y={n.y + 19} textAnchor="middle" fontSize={11} fontWeight={600}
            fill={i === 2 ? 'rgb(var(--c-surface))' : INK} fillOpacity={i === 2 ? 1 : 0.75}>{n.label}</text>
        </g>
      ))}
      <text x={28} y={196} fontSize={10} fill={INK} fillOpacity={0.45} fontFamily="ui-monospace, monospace">nextflow run main.nf -profile docker</text>
    </>
  );
}

function Umap() {
  const rand = rng(11);
  const clusters = [
    { x: 110, y: 80, s: 18, o: 0.9 }, { x: 175, y: 150, s: 22, o: 0.55 }, { x: 255, y: 70, s: 16, o: 0.35 },
    { x: 300, y: 150, s: 20, o: 0.75 }, { x: 80, y: 165, s: 12, o: 0.25 }, { x: 205, y: 60, s: 10, o: 0.6 },
  ];
  return (
    <>
      {clusters.flatMap((c, ci) =>
        Array.from({ length: 46 }, (_, i) => (
          <circle key={`${ci}-${i}`} cx={c.x + gaussian(rand) * c.s * 1.3} cy={c.y + gaussian(rand) * c.s}
            r={2.6} fill={ci === 4 ? INK : ACCENT} opacity={ci === 4 ? 0.3 : c.o} />
        ))
      )}
      <g fontSize={9} fill={INK} fillOpacity={0.45} fontFamily="ui-monospace, monospace">
        <text x={20} y={212}>UMAP1</text>
        <text x={14} y={24} transform="rotate(-90 14 24)" textAnchor="end">UMAP2</text>
      </g>
    </>
  );
}

function Spatial() {
  const spots: React.ReactElement[] = [];
  const cx = 200, cy = 112;
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 24; col++) {
      const x = 32 + col * 14.5 + (row % 2) * 7.25;
      const y = 22 + row * 14.5;
      const d = ((x - cx) / 170) ** 2 + ((y - cy) / 92) ** 2 + 0.08 * Math.sin(x / 23) * Math.cos(y / 19);
      if (d > 1) continue;
      const band = d < 0.22 ? 0.95 : d < 0.5 ? 0.6 : d < 0.75 ? 0.35 : 0.16;
      spots.push(<circle key={`${row}-${col}`} cx={x} cy={y} r={5.2} fill={ACCENT} opacity={band} />);
    }
  }
  return <>{spots}</>;
}

function Chunks() {
  const cols = 10, rows = 5, size = 26, gap = 6;
  const x0 = (W - (cols * size + (cols - 1) * gap)) / 2;
  const y0 = 38;
  return (
    <>
      {Array.from({ length: rows * cols }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const done = i < 23;
        const active = i >= 23 && i < 26;
        return (
          <rect key={i} x={x0 + c * (size + gap)} y={y0 + r * (size + gap)} width={size} height={size} rx={5}
            fill={done ? ACCENT : active ? ACCENT : 'rgb(var(--c-surface))'}
            opacity={done ? 0.35 : 1} stroke={ACCENT} strokeOpacity={active || done ? 0 : 0.3} />
        );
      })}
      <text x={x0} y={210} fontSize={10} fill={INK} fillOpacity={0.45} fontFamily="ui-monospace, monospace">zarr chunks · dask</text>
    </>
  );
}

function Facets() {
  const rand = rng(5);
  const pw = 108, ph = 74;
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const px = 22 + (i % 3) * (pw + 16);
        const py = 26 + Math.floor(i / 3) * (ph + 22);
        const slope = 0.2 + i * 0.12;
        return (
          <g key={i}>
            <rect x={px} y={py} width={pw} height={ph} rx={6} fill="rgb(var(--c-surface))" stroke={INK} strokeOpacity={0.08} />
            {Array.from({ length: 16 }, (_, j) => {
              const u = rand();
              return <circle key={j} cx={px + 10 + u * (pw - 20)} cy={py + ph - 10 - (u * slope + rand() * 0.35) * (ph - 20)} r={2.4} fill={ACCENT} opacity={0.75} />;
            })}
            <line x1={px + 10} y1={py + ph - 14} x2={px + pw - 10} y2={py + ph - 14 - slope * (ph - 20)} stroke={INK} strokeOpacity={0.4} strokeWidth={1.2} />
          </g>
        );
      })}
    </>
  );
}

const ART: Record<CoverKind, () => React.ReactElement> = {
  variants: Variants,
  pipeline: Pipeline,
  umap: Umap,
  spatial: Spatial,
  chunks: Chunks,
  facets: Facets,
};

export function ProjectCover({ kind, className = '' }: { kind: CoverKind; className?: string }) {
  const Art = ART[kind];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      style={{ background: 'rgb(var(--c-accent-soft))' }}
    >
      <Art />
    </svg>
  );
}
