'use client';

import { useEffect, useId, useRef } from 'react';
import { BrainCircuit, Target, FileText, FolderOpen, Wrench, ClipboardCheck, ShieldCheck, Check } from 'lucide-react';
import { agentParts } from './content';
import './agent-assembly.css';

const parts = [
  { x:350, y:55, Icon:Target, role:'Outcome' },
  { x:584, y:176, Icon:FileText, role:'Instructions' },
  { x:502, y:407, Icon:FolderOpen, role:'Knowledge' },
  { x:198, y:407, Icon:Wrench, role:'Actions' },
  { x:116, y:176, Icon:ClipboardCheck, role:'Checks' },
];

function orbit(x:number,y:number) {
  const dx=x-350,dy=y-235,len=Math.hypot(dx,dy);
  const px=-dy/len*66,py=dx/len*66;
  return `M350 235 C${350+dx*.3+px} ${235+dy*.3+py} ${x+px} ${y+py} ${x} ${y} C${x-px} ${y-py} ${350+dx*.3-px} ${235+dy*.3-py} 350 235`;
}

export default function AgentAssembly({phase,active}:{phase:number;active:boolean}) {
  const svg=useRef<SVGSVGElement>(null);
  const id=useId().replace(/:/g,'');
  const assembled=phase===6, visible=Math.min(phase,5);
  useEffect(()=>{
    const scene=svg.current;
    if(!scene)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{
      scene.setCurrentTime(2);
      if(active&&!reduced.matches)scene.unpauseAnimations();else scene.pauseAnimations();
    };
    sync();reduced.addEventListener('change',sync);
    return ()=>{scene.pauseAnimations();reduced.removeEventListener('change',sync)};
  },[active]);

  return <div className="assembly-scene">
    <div className="assembly-illustration">
      <svg ref={svg} className="assembly-canvas" viewBox="0 0 700 475" role="img" aria-label={assembled?'A complete agent: model, goal, direction, context, tools and review.':`${visible} of 5 agent components connected to the model.`}>
        <defs>
          <radialGradient id={`${id}-halo`}><stop stopColor="#dfedf1" stopOpacity=".8"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient>
          <radialGradient id={`${id}-teal`} cx="30%" cy="25%"><stop stopColor="#a6e3e3"/><stop offset=".4" stopColor="#318a9d"/><stop offset="1" stopColor="#174459"/></radialGradient>
          <radialGradient id={`${id}-gold`} cx="30%" cy="25%"><stop stopColor="#ffe5b7"/><stop offset=".4" stopColor="#deaa56"/><stop offset="1" stopColor="#a36522"/></radialGradient>
        </defs>
        <ellipse cx="350" cy="235" rx="265" ry="200" fill={`url(#${id}-halo)`}/>
        {parts.map(({x,y},i)=>{
          const revealed=i<visible;
          const color=i===4||(!assembled&&i===phase-1)?'gold':'teal';
          const d=orbit(x,y),duration=8+i*.65;
          return <g key={i} className={`atomic-route ${color} assembly-route ${revealed?'revealed':'pending'}`}>
            <path d={d} className="orbit-underlay"/><path d={d} className="orbit-line"/>
            {revealed&&[0,1].map(p=><g className="assembly-particle" key={p}>
              <animateMotion path={d} dur={`${duration}s`} begin={`${-i*1.7-p*duration/2}s`} repeatCount="indefinite" calcMode="paced"/>
              <circle r={p?10:15} fill={color==='gold'?'#dcac63':'#428fa1'} opacity=".10"/>
              <circle r={p?5:8.5} fill={`url(#${id}-${color})`} stroke="white" strokeWidth="1.4"/>
            </g>)}
          </g>;
        })}
        {parts.map(({x,y,Icon,role},i)=><g key={role} transform={`translate(${x} ${y})`} className={`atomic-node assembly-node ${i<visible?'revealed':'pending'} ${!assembled&&i===phase-1?'focused':''}`}>
          <rect x="-67" y="-29" width="134" height="58" rx="11"/>
          <Icon x="-51" y="-12" width="22" height="22" className="assembly-part-icon"/>
          <text x="-19" y="-2" className="atom-name">{agentParts[i][0]}</text><text x="-19" y="16" className="atom-role">{role}</text>
        </g>)}
        <g transform="translate(350 235)" className="assembly-center">
          <circle r="73" fill="white" opacity=".8"/><circle r="63" className="human-disc"/><circle r="55" className="human-ring"/>
          {assembled?<Check x="-23" y="-32" width="46" height="46"/>:<BrainCircuit x="-23" y="-34" width="46" height="46"/>}
          <text y="33">{assembled?'Agent':'Model'}</text>
        </g>
      </svg>
      <p className="assembly-cycle">Plan <span>→</span> Act <span>→</span> Inspect <span>→</span> Adjust</p>
    </div>
    <aside className="assembly-caption">
      <p className="micro">{assembled?'All together':phase===0?'Start with the engine':`${String(phase).padStart(2,'0')} / 05 · ${agentParts[phase-1][0]}`}</p>
      <h2>{assembled?'A result you can review.':phase===0?'The model is only one piece.':agentParts[phase-1][1]}</h2>
      <div className="assembly-progress" aria-hidden="true">{parts.map((_,i)=><i key={i} className={i<visible?'filled':''}/>)}</div>
      <p className="assembly-review"><ShieldCheck/>Human judgment stays with you.</p>
    </aside>
  </div>;
}
