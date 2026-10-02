import { useState } from 'react';
import { Link } from 'react-router';

import { workspaceObjects } from '@/data/workspaceObjects';
import { cn } from '@/utils/cn';

// Marker badge position for each object, in viewBox units.
const MARKERS = {
  laptop: [530, 232],
  monitor: [402, 114],
  rack: [142, 128],
  cabinet: [532, 344],
  terminal: [190, 166],
  phone: [675, 232],
  shelf: [532, 96],
};

const RACK_UNITS = Array.from({ length: 9 }, (_, i) => 156 + i * 26);

function Part({ id, activeId, children }) {
  const isActive = activeId === id;
  return (
    <g
      className={cn(
        'transition-[color,opacity] duration-300',
        isActive ? 'text-accent' : 'text-fg-subtle',
        activeId && !isActive && 'opacity-35',
      )}
    >
      {children}
    </g>
  );
}

function Marker({ id, code, activeId }) {
  const [x, y] = MARKERS[id];
  return (
    <g className={activeId === id ? 'text-accent' : 'text-fg-subtle'}>
      <circle cx={x} cy={y} r="10" className="fill-canvas" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        stroke="none"
        className="fill-current font-mono text-[8.5px]"
      >
        {code}
      </text>
    </g>
  );
}

/**
 * Front-elevation line drawing of the workspace. Purely illustrative — the
 * legend below it is the accessible, keyboard-reachable navigation.
 */
export function WorkspaceSchematic() {
  const [activeId, setActiveId] = useState(null);

  return (
    <figure className="animate-rise rounded-2xl border border-line bg-surface/40 p-4 [animation-delay:200ms] sm:p-6">
      <figcaption className="flex justify-between gap-4 font-mono text-[0.6875rem] tracking-[0.16em] text-fg-subtle uppercase">
        <span>Fig. 01 — Workspace</span>
        <span className="hidden sm:inline">Front elevation · not to scale</span>
      </figcaption>

      <svg
        viewBox="0 0 720 450"
        role="img"
        aria-label="Line drawing of a developer desk with a server rack, terminal, monitor, laptop, phone, file cabinet and a shelf of hobbies."
        className="mt-4 h-auto w-full animate-wipe [animation-delay:450ms]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <pattern id="schematic-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" className="stroke-fg-subtle/10" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="720" height="450" fill="url(#schematic-grid)" stroke="none" />

        {/* Registration marks */}
        <path
          d="M10 16h12M16 10v12M698 16h12M704 10v12M10 434h12M16 428v12M698 434h12M704 428v12"
          className="text-fg-subtle/50"
        />

        {/* Room structure: floor, desk, dimension line */}
        <g className="text-fg-subtle/60">
          <path d="M24 410h672" strokeDasharray="2 6" />
          <rect x="170" y="300" width="520" height="12" rx="2" />
          <rect x="186" y="312" width="10" height="98" />
          <rect x="664" y="312" width="10" height="98" />
          <path d="M170 428h520M170 422v12M690 422v12" strokeWidth="0.75" />
          <text
            x="430"
            y="444"
            textAnchor="middle"
            stroke="none"
            className="fill-current font-mono text-[8px] tracking-[0.2em]"
          >
            DESK · 1600 MM
          </text>
        </g>

        <Part id="rack" activeId={activeId}>
          <rect x="40" y="130" width="88" height="280" rx="4" />
          <path d="M40 146h88" />
          {RACK_UNITS.map((y, i) => (
            <g key={y}>
              <rect x="50" y={y} width="68" height="20" rx="2" />
              <path d={`M74 ${y + 10}h36`} className="opacity-60" />
              <circle
                cx="60"
                cy={y + 10}
                r="2.2"
                stroke="none"
                className={i % 3 === 1 ? 'fill-ambient' : 'fill-accent'}
              />
            </g>
          ))}
          <path d="M54 396h60M54 402h60" className="opacity-60" />
        </Part>

        <Part id="terminal" activeId={activeId}>
          <rect x="200" y="176" width="74" height="104" rx="4" />
          <rect x="206" y="182" width="62" height="92" rx="2" />
          <path d="M212 192l5 4-5 4" />
          <path
            d="M222 196h26M212 208h32M212 220h42M212 232h22M212 244h36"
            className="opacity-60"
          />
          <rect x="212" y="253" width="6" height="9" stroke="none" className="fill-accent" />
          <rect x="233" y="280" width="8" height="12" />
          <rect x="218" y="292" width="38" height="8" rx="2" />
        </Part>

        <Part id="monitor" activeId={activeId}>
          <rect x="292" y="128" width="220" height="140" rx="6" />
          <rect x="300" y="136" width="204" height="124" rx="3" />
          <path d="M300 152h204" />
          <circle cx="309" cy="144" r="2" />
          <circle cx="317" cy="144" r="2" />
          <circle cx="325" cy="144" r="2" />
          <rect x="308" y="160" width="40" height="92" rx="2" />
          <path d="M314 170h28M314 180h22M314 190h26" className="opacity-60" />
          <path d="M358 166h112M358 178h84M358 190h130" className="opacity-60" />
          <path d="M358 246h138" className="opacity-40" />
          <polyline
            points="358,238 382,226 406,230 430,210 454,216 478,198 496,202"
            className="text-accent"
          />
          <rect x="396" y="268" width="12" height="22" />
          <rect x="364" y="290" width="76" height="10" rx="2" />
        </Part>

        <Part id="laptop" activeId={activeId}>
          <path d="M548 226h92l4 64H544z" />
          <path d="M554 232h80l2.8 52h-86z" />
          <circle cx="572" cy="252" r="8" />
          <path d="M588 248h36M588 258h24M562 272h66" className="opacity-60" />
          <rect x="532" y="290" width="124" height="10" rx="2" />
        </Part>

        <Part id="phone" activeId={activeId}>
          <rect x="665" y="248" width="20" height="38" rx="3" />
          <path d="M671 253h8" />
          <path d="M662 300l8-14h10l8 14" />
          <path d="M693 258a12 12 0 0 1 0 18M698 253a19 19 0 0 1 0 28" className="text-ambient" />
        </Part>

        <Part id="cabinet" activeId={activeId}>
          <rect x="548" y="322" width="104" height="88" rx="3" />
          <rect x="555" y="329" width="90" height="22" rx="2" />
          <rect x="555" y="356" width="90" height="22" rx="2" />
          <rect x="555" y="383" width="90" height="21" rx="2" />
          <path d="M590 340h20M590 367h20M590 393.5h20" />
        </Part>

        <Part id="shelf" activeId={activeId}>
          <rect x="548" y="112" width="152" height="6" rx="1" />
          <path d="M562 118v12l8-12M686 118v12l-8-12" />
          {/* Football */}
          <circle cx="572" cy="96" r="16" />
          <path d="M572 90l5.7 4.1-2.2 6.8h-7l-2.2-6.8z" />
          <path d="M572 90v-10M577.7 94.1l9.5-3M575.5 100.9l5.9 8M568.5 100.9l-5.9 8M566.3 94.1l-9.5-3" />
          {/* Game controller */}
          <path d="M606 94h36a8 8 0 0 1 7.6 5.5l3 8.5a4.5 4.5 0 0 1-7.7 4.3l-4.9-5.3h-31l-4.9 5.3a4.5 4.5 0 0 1-7.7-4.3l3-8.5A8 8 0 0 1 606 94z" />
          <path d="M607 100h6M610 97v6" />
          <circle cx="636" cy="99" r="1.6" />
          <circle cx="641" cy="103" r="1.6" />
          {/* Headphones */}
          <path d="M664 104v-4a12 12 0 0 1 24 0v4" />
          <rect x="660" y="100" width="7" height="12" rx="2.5" />
          <rect x="685" y="100" width="7" height="12" rx="2.5" />
        </Part>

        {workspaceObjects.map(({ id, code }) => (
          <Marker key={id} id={id} code={code} activeId={activeId} />
        ))}
      </svg>

      {/* Each item opens that object in the workspace (3D on desktop, 2D on small screens). */}
      <nav aria-label="Workspace objects" className="mt-4 border-t border-line pt-4">
        <ol className="grid grid-cols-2 gap-1 sm:grid-cols-4">
          {workspaceObjects.map(({ id, code, object, title }) => (
            <li key={id}>
              <Link
                viewTransition
                to={`/workspace?object=${id}`}
                onPointerEnter={() => setActiveId(id)}
                onPointerLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(id)}
                onBlur={() => setActiveId(null)}
                className="flex flex-col rounded-lg px-2.5 py-2 transition-colors hover:bg-white/[0.04]"
              >
                <span className="flex items-baseline gap-2 text-sm text-fg">
                  <span className="font-mono text-[0.6875rem] text-accent">{code}</span>
                  {title}
                </span>
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-subtle uppercase">
                  {object}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </figure>
  );
}
