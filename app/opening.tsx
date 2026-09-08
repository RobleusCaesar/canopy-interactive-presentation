'use client';

import { useEffect, useId, useRef } from 'react';
import './opening.css';

const nodes = [
  { x: 235, y: 86, name: 'Clients', role: '', kind: 'world' },
  { x: 500, y: 43, name: 'Sources', role: '', kind: 'world' },
  { x: 765, y: 86, name: 'Partners', role: '', kind: 'world' },
  { x: 138, y: 307, name: 'Sara', role: 'Research', kind: 'agent' },
  { x: 337, y: 399, name: 'Maya', role: 'Writing', kind: 'agent' },
  { x: 663, y: 399, name: 'Alex', role: 'Analysis', kind: 'agent' },
  { x: 862, y: 307, name: 'Theo', role: 'Build', kind: 'agent' },
];

// Every node and every route use the same SVG coordinates. Each node sits at
// its orbit's outer turning point, so the paths remain connected at any size.
function orbit(x: number, y: number) {
  const dx = x - 500, dy = y - 220;
  const length = Math.hypot(dx, dy);
  const px = -dy / length * 86, py = dx / length * 86;
  return `M500 220 C${500 + dx * .3 + px} ${220 + dy * .3 + py} ${x + px} ${y + py} ${x} ${y} C${x - px} ${y - py} ${500 + dx * .3 - px} ${220 + dy * .3 - py} 500 220`;
}

let lastLoopTime = 2;

export default function Opening({ phase, active }: { phase: number; active: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, '');
  useEffect(() => {
    const scene = svg.current;
    if (!scene) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (!active || phase === 1 || media.matches) {
        scene.pauseAnimations();
        scene.setCurrentTime(phase === 1 ? lastLoopTime : 2);
      } else {
        scene.setCurrentTime(lastLoopTime);
        scene.unpauseAnimations();
      }
    };
    sync();
    media.addEventListener('change', sync);
    return () => {
      if (phase === 0 && active) lastLoopTime = scene.getCurrentTime();
      scene.pauseAnimations();
      media.removeEventListener('change', sync);
    };
  }, [active, phase]);

  return <div className="atomic-opening" data-phase={phase}>
    <svg ref={svg} className="atom-canvas" viewBox="0 0 1000 455" role="img" aria-label="You direct Sara, Maya, Alex and Theo. Information circulates between you, your agents, clients, sources and partners. You review, refine and send.">
      <defs>
        <radialGradient id={`${id}-halo`}><stop stopColor="#dfedf1" stopOpacity=".8" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-teal`} cx="30%" cy="25%"><stop stopColor="#a6e3e3" /><stop offset=".4" stopColor="#318a9d" /><stop offset="1" stopColor="#174459" /></radialGradient>
        <radialGradient id={`${id}-gold`} cx="30%" cy="25%"><stop stopColor="#ffe5b7" /><stop offset=".4" stopColor="#deaa56" /><stop offset="1" stopColor="#a36522" /></radialGradient>
      </defs>
      <ellipse cx="500" cy="225" rx="345" ry="198" fill={`url(#${id}-halo)`} />
      {nodes.map((node, i) => {
        const d = orbit(node.x, node.y);
        const duration = 8 + i * .65;
        const color = node.kind === 'world' ? 'gold' : 'teal';
        return <g key={node.name} className={`atomic-route ${color}`}>
          <path d={d} className="orbit-underlay" />
          <path d={d} className="orbit-line" />
          {[0, 1].map(particle => <g key={particle} className="atomic-particle">
            <animateMotion path={d} dur={`${duration}s`} begin={`${-i * 1.7 - particle * duration / 2}s`} repeatCount="indefinite" calcMode="paced" />
            <circle r={particle ? 10 : 15} fill={color === 'gold' ? '#dcac63' : '#428fa1'} opacity=".10" />
            <circle r={particle ? 5 : 8.5} fill={`url(#${id}-${color})`} stroke="white" strokeWidth="1.4" />
          </g>)}
        </g>;
      })}
      {nodes.map((node, i) => <g key={node.name} className={`atomic-node ${node.kind}`} transform={`translate(${node.x} ${node.y})`}>
        <rect x="-66" y={node.role ? -29 : -20} width="132" height={node.role ? 58 : 40} rx="11" />
        {node.role ? <>
          <g className="agent-emblem" transform="translate(-45 -1)"><path d="M0 -8 8 -3 8 6 0 11 -8 6 -8 -3Z" /><circle cx="0" cy="1" r="2.5" /></g>
          <text x="-25" y="-2" className="atom-name">{node.name}</text>
          <text x="-25" y="16" className="atom-role">{node.role}</text>
        </> : <>
          <g className="world-emblem" transform="translate(-46 0)">
            {i === 1 ? <><circle r="8" /><path d="M-8 0H8M0 -8Q-7 0 0 8Q7 0 0 -8" /></> : <><circle cy="-4" r="3.5" /><path d="M-7 8Q-7 0 0 0Q7 0 7 8M-9 -4Q-15 -1 -11 6M9 -4Q15 -1 11 6" /></>}
          </g>
          <text x="-26" y="5" className="atom-name">{node.name}</text>
        </>}
      </g>)}
      <g className="atomic-human" transform="translate(500 220)">
        <circle r="72" fill="white" opacity=".8" />
        <circle r="62" className="human-disc" />
        <circle r="54" className="human-ring" />
        <g className="human-art" transform="translate(0 -22)"><path d="M-11 -5C-13 -21 12 -22 11 -6L10 2C7 13 -7 13 -10 2Z M-11 -7Q-2 -7 3 -16Q6 -8 11 -7 M-6 10V16L0 21 6 16V10 M-6 16C-18 18 -23 21 -24 34M6 16C18 18 23 21 24 34M-15 21 -10 33M15 21 10 33" /></g>
        <text y="30" className="human-you">You</text>
        <text y="45" className="human-action">Review · refine · send</text>
      </g>
    </svg>
    <span className="atom-playback">{phase ? 'Held · Back to replay' : 'Looping · Next to hold'}</span>
  </div>;
}
