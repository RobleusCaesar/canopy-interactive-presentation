'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Bot, Check, Code2, FileText, Search, ShieldCheck, RotateCcw, Play, Pause, LockKeyhole, Send, Eye, FolderOpen, Monitor, Network, UserRound, Target, MessageCircle, Globe2, Sparkles, type LucideIcon } from 'lucide-react';
import { profiles } from './content';
import './continuation.css';

type Active = { active: boolean };
type Point = [number, number];

// Routes and their endpoints share SVG coordinates at every viewport size.
function petal([cx,cy]:Point,[x,y]:Point,spread=62) {
  const dx=x-cx,dy=y-cy,len=Math.hypot(dx,dy),px=-dy/len*spread,py=dx/len*spread;
  return `M${cx} ${cy} C${cx+dx*.3+px} ${cy+dy*.3+py} ${x+px} ${y+py} ${x} ${y} C${x-px} ${y-py} ${cx+dx*.3-px} ${cy+dy*.3-py} ${cx} ${cy}`;
}

function Route({d,gold=false,muted=false,delay=0}:{d:string;gold?:boolean;muted?:boolean;delay?:number}) {
  const id=useId().replace(/:/g,'');
  return <g className={`flow-route ${gold?'gold':'teal'} ${muted?'muted':''}`}>
    <defs><radialGradient id={id} cx="30%" cy="25%"><stop stopColor={gold?'#ffe5b7':'#a6e3e3'}/><stop offset=".4" stopColor={gold?'#deaa56':'#318a9d'}/><stop offset="1" stopColor={gold?'#a36522':'#174459'}/></radialGradient></defs>
    <path d={d} className="orbit-underlay"/><path d={d} className="orbit-line"/>
    {!muted&&[0,1].map(i=><g className="flow-particle" key={i}>
      <animateMotion path={d} dur={`${8+delay*.4}s`} begin={`${-delay-i*4}s`} repeatCount="indefinite" calcMode="paced"/>
      <circle r={i?10:15} fill={gold?'#dcac63':'#428fa1'} opacity=".12"/><circle r={i?5.5:8.5} fill={`url(#${id})`} stroke="white" strokeWidth="1.3"/>
    </g>)}
  </g>;
}

function Node({x,y,label,detail,Icon=Bot,selected=false,onClick}:{x:number;y:number;label:string;detail?:string;Icon?:LucideIcon;selected?:boolean;onClick?:()=>void}) {
  return <g transform={`translate(${x} ${y})`} className={`flow-node ${selected?'selected':''} ${onClick?'selectable':''}`} role={onClick?'button':undefined} tabIndex={onClick?0:undefined} aria-label={onClick?label:undefined} aria-pressed={onClick?selected:undefined} onClick={onClick} onKeyDown={onClick?e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onClick();}}:undefined}>
    <rect x="-72" y="-30" width="144" height="60" rx="12"/><Icon x="-55" y="-12" width="24" height="24"/>
    <text x="-20" y={detail?-2:6}>{label}</text>{detail&&<text x="-20" y="17" className="node-detail">{detail}</text>}
  </g>;
}

function Core({x,y,label='You',detail,Icon=UserRound}:{x:number;y:number;label?:string;detail?:string;Icon?:LucideIcon}) {
  return <g className="flow-core" transform={`translate(${x} ${y})`}>
    <circle r="75" fill="white" opacity=".9"/><circle r="64" fill="#113b52"/><circle r="55" className="human-ring"/>
    <Icon x="-23" y="-38" width="46" height="46"/><text y="31">{label}</text>{detail&&<text y="96" className="core-detail">{detail}</text>}
  </g>;
}

function Figure({active,label,children,className=''}:Active&{label:string;children:ReactNode;className?:string}) {
  const ref=useRef<SVGSVGElement>(null);
  const [paused,setPaused]=useState(false);
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{
    const svg=ref.current;if(!svg)return;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{setReduced(media.matches);if(active&&!paused&&!media.matches)svg.unpauseAnimations();else svg.pauseAnimations();};
    sync();media.addEventListener('change',sync);
    return()=>{svg.pauseAnimations();media.removeEventListener('change',sync);};
  },[active,paused]);
  return <div className={`flow-figure ${className} ${active?'running':''} ${paused||reduced?'motion-held':''}`}>
    {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- SVG groups expose their interactive child nodes to assistive technology. */}
    <svg ref={ref} viewBox="0 0 720 440" className="flow-canvas" role="group" aria-label={label}>{children}</svg>
    <button className="motion-toggle" aria-label={paused?'Resume diagram animation':'Pause diagram animation'} aria-pressed={paused} disabled={reduced} onClick={()=>setPaused(!paused)}>{paused||reduced?<Play size={13}/>:<Pause size={13}/>} {reduced?'Motion reduced':paused?'Resume':'Pause'}</button>
  </div>;
}

function Note({children}:{children:ReactNode}) { return <p className="flow-note"><ShieldCheck size={18}/>{children}</p>; }

const profilePoints:Point[]=[[360,54],[603,175],[510,378],[210,378],[117,175]];
const profileIcons=[MessageCircle,Sparkles,Bot,Network,Code2];
export function SystemProfiles({active}:Active) {
  const [selected,setSelected]=useState(0);
  const profile=profiles[selected];
  return <div className="flow-layout profile-story">
    <Figure active={active} label="Choose a system. You provide the brief, review and judgment.">
      {profilePoints.map((p,i)=><Route key={i} d={petal([360,220],p)} muted={selected!==i} gold={selected===i} delay={i}/>)}
      {profilePoints.map(([x,y],i)=><Node key={i} x={x} y={y} label={profiles[i].name} Icon={profileIcons[i]} selected={selected===i} onClick={()=>setSelected(i)}/>)}
      <Core x={360} y={220} detail="Brief · Review · Refine"/>
    </Figure>
    <aside className="flow-caption" key={selected}>
      <p className="micro">Select a system · illustrative profiles</p><h2>{profile.name}</h2><p className="flow-lead">{profile.use}</p>
      <span className="role-tag">{profile.role}</span><p className="profile-caveat">{profile.watch}</p>
      <Note>Same management skills.</Note>
    </aside>
  </div>;
}

const jobs = [
  {name:'Research',verb:'Find evidence',Icon:Search,inputs:['Sources','Questions','Context'],output:'Evidence brief',review:'Can you trace each claim to a source?'},
  {name:'Write',verb:'Shape a draft',Icon:FileText,inputs:['Notes','Audience','Purpose'],output:'First draft',review:'Does it sound like you and fit the purpose?'},
  {name:'Analyze',verb:'Compare options',Icon:Target,inputs:['Data','Criteria','Question'],output:'Comparison',review:'Do the numbers and assumptions hold up?'},
  {name:'Build',verb:'Reuse a workflow',Icon:Code2,inputs:['Inputs','Rules','Outcome'],output:'Reusable tool',review:'Does it work with a real example?'},
];
export function WorkGallery({active}:Active) {
  const [chosen,setChosen]=useState(0),job=jobs[chosen];
  return <div className="flow-layout work-story">
    <aside className="flow-caption work-selector"><p className="micro">One assignment. Something useful.</p><div className="choice-list" aria-label="Examples of agent work">{jobs.map(({name,verb,Icon},i)=><button key={name} aria-pressed={chosen===i} onClick={()=>setChosen(i)}><Icon/><span><b>{name}</b><small>{verb}</small></span><ArrowRight/></button>)}</div><Note>{job.review}</Note></aside>
    <Figure active={active} label={`An agent turns ${job.inputs.join(', ')} into a ${job.output.toLowerCase()} for human review.`}>
      {[80,220,360].map((y,i)=><Route key={i} d={petal([340,220],[95,y],38)} delay={i}/>)}
      <Route d="M340 220 C395 85 600 80 600 220 C600 370 395 355 340 220" gold delay={2}/>
      {[80,220,360].map((y,i)=><Node key={i} x={95} y={y} label={job.inputs[i]} Icon={[FolderOpen,Target,FileText][i]}/>)}
      <Core x={340} y={220} label="Agent" Icon={job.Icon} detail={job.name}/>
      <g className="output-sheet" key={chosen} transform="translate(493 105)">
        <rect width="210" height="240" rx="16"/><job.Icon x="22" y="22" width="25" height="25"/><text x="22" y="75" className="output-title">{job.output}</text>
        {chosen===0&&['Source linked','Evidence found','Unknowns flagged'].map((s,i)=><g className="output-row" key={s} style={{animationDelay:`${i*.25}s`}}><Check x="22" y={95+i*32} width="16" height="16"/><text x="46" y={108+i*32}>{s}</text></g>)}
        {chosen===1&&<><text x="22" y="110" className="draft-line">A clearer message.</text>{[148,123,157,105].map((w,i)=><rect className="draft-ink" key={i} x="22" y={130+i*16} width={w} height="5" rx="2" style={{animationDelay:`${i*.18}s`}}/>)}</>}
        {chosen===2&&<><path d="M23 185H186" className="chart-axis"/>{[52,84,65,105].map((h,i)=><rect className="result-bar" key={i} x={30+i*40} y={185-h} width="25" height={h} rx="4" style={{animationDelay:`${i*.15}s`}}/>)}</>}
        {chosen===3&&<g className="tool-result"><rect x="22" y="95" width="166" height="34" rx="5"/><text x="34" y="117">Sample input</text><path d="M105 138V156"/><rect x="22" y="165" width="166" height="33" rx="5"/><text x="34" y="187">Repeatable result</text></g>}
        <text x="22" y="220" className="output-meta">Illustrative output</text>
      </g>
    </Figure>
  </div>;
}

export function ConnectionsScene({active}:Active) {
  const [access,setAccess]=useState(0);
  return <div className="flow-layout access-story">
    <Figure active={active} label={access===0?'Files and tools wait at your permission checkpoint.':access===1?'Reading is allowed. Changes still need your permission.':'The example now permits reading and approved changes.'}>
      <Route d={petal([350,215],[102,90],45)} muted={access===0}/><Route d={petal([350,215],[102,345],45)} muted={access<2} delay={2}/>
      <Route d={petal([350,215],[610,215],62)} muted={!access} gold delay={1}/>
      <Node x={102} y={90} label="Files" detail="Read info" Icon={FolderOpen}/><Node x={102} y={345} label="Tools" detail="Take actions" Icon={Monitor}/>
      <Core x={350} y={215} detail="Your permission" Icon={access?ShieldCheck:LockKeyhole}/><Node x={610} y={215} label="Agent" detail={access?'Connected':'Waiting'} Icon={Bot} selected={access>0}/>
      <g className="access-status" transform="translate(520 320)"><circle r="4" fill={access?'#477e6d':'#bc823a'}/><text x="14" y="5">{access===0?'Access closed':access===1?'Read only':'Changes allowed'}</text></g>
    </Figure>
    <aside className="flow-caption"><p className="micro">Illustration only</p><h2>{access===0?'You open the door.':access===1?'Read ≠ change.':'Set the limits.'}</h2><p className="flow-lead">{access===0?'Choose what an agent can see and do.':access===1?'Access to information does not authorize an action.':'Grant only the access the task needs.'}</p>
      <button className="demo-action" onClick={()=>setAccess((access+1)%3)}>{access===2?<RotateCcw size={17}/>:<ShieldCheck size={17}/>} {access===0?'Allow example reading':access===1?'Allow example changes':'Reset example'}</button>
      <p className="protocol-note"><b>MCP</b> A shared standard for connecting tools.</p>
    </aside>
  </div>;
}

const checkpoints=[
  {name:'Judgment',Icon:ShieldCheck,action:'Decide',text:'Decisions and final sign-off stay with you.'},
  {name:'Commitments',Icon:Send,action:'Approve',text:'Pause before purchases, sending, or changes.'},
  {name:'Claims',Icon:Search,action:'Verify',text:'Check facts, calculations, and sources.'},
  {name:'Access',Icon:LockKeyhole,action:'Step in',text:'Sign-ins and secure steps may need you.'},
];
export function BoundaryScene({active}:Active) {
  const [chosen,setChosen]=useState(0),item=checkpoints[chosen];
  return <div className="flow-layout checkpoint-story">
    <Figure active={active} label="Work comes from your agent, passes through your judgment, then reaches the outside world.">
      <Route d={petal([350,235],[112,340],48)}/><Route d={petal([350,235],[608,110],48)} gold delay={2}/>
      <circle className="checkpoint-ring" cx="350" cy="235" r="98"/><circle className="checkpoint-ring outer" cx="350" cy="235" r="118"/>
      <Node x={112} y={340} label="Agent" detail="Does the work"/><Node x={608} y={110} label="The world" detail="Receives result" Icon={Globe2}/>
      <Core x={350} y={235} Icon={item.Icon} detail={item.action}/>
      <text x="112" y="391" className="diagram-small" textAnchor="middle">Drafts & proposals</text><text x="608" y="63" className="diagram-small" textAnchor="middle">Your decision to send</text>
    </Figure>
    <aside className="flow-caption"><p className="micro">The human checkpoint</p><div className="checkpoint-options" aria-label="Human checkpoints">{checkpoints.map(({name,Icon},i)=><button key={name} aria-pressed={chosen===i} onClick={()=>setChosen(i)}><Icon size={18}/>{name}</button>)}</div><h2 className="checkpoint-message" key={chosen}>{item.text}</h2><Note>Useful work. Accountable people.</Note></aside>
  </div>;
}
