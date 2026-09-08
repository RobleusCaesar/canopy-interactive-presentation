'use client';

import { useState } from 'react';
import { ArrowRight, Check, Code2, FileText, Search, ShieldCheck, Sparkles, RotateCcw, Play, LockKeyhole, Send, Eye, FolderOpen, Monitor, Network } from 'lucide-react';
import './scenes.css';

function Lines({ count = 4 }: { count?: number }) {
  return <div className="ink-lines" aria-hidden="true">{Array.from({length:count}, (_, i) => <i key={i} style={{animationDelay:`${.5 + i * .32}s`}} />)}</div>;
}

function Document({ title = 'Client brief', reviewed = false }: { title?: string; reviewed?: boolean }) {
  return <div className={'paper-art ' + (reviewed ? 'paper-reviewed' : '')}><div className="paper-fold" /><FileText /><h3>{title}</h3><Lines />{reviewed && <div className="paper-signoff"><ShieldCheck /> Ready for your review</div>}</div>;
}

export function AnswerStory({phase, active}: {phase:number;active:boolean}) {
  const [replay, setReplay] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [format, setFormat] = useState('Meeting brief');
  const levels = [['Chat','An answer','Ask a question.'],['Agent','A deliverable','Assign the outcome.'],['Software','A repeatable tool','Use the workflow again.']];
  return <div className={'answer-story ' + (active ? 'is-active' : '')}>
    <aside className="story-guide"><span className="micro">0{phase + 1} / 03</span><h2>{levels[phase][0]}</h2><p>{levels[phase][2]}</p><div className="story-marker">{levels[phase][1]} <ArrowRight /></div><div className="story-dots" aria-hidden="true">{levels.map((_,i)=><i key={i} className={phase===i?'chosen':''} />)}</div></aside>
    <div className={'story-theatre theatre-' + phase} key={replay}>
      <div className="scene-top"><span>Illustrative workflow</span><button aria-label="Replay this animation" onClick={()=>{setReplay(replay+1);setGenerated(false);}}><RotateCcw size={14} />Replay</button></div>
      {phase===0 && <div className="conversation-scene"><div className="message-question"><span>You</span>What belongs in a client brief?</div><div className="answer-spark"><Sparkles /></div><div className="message-answer"><span>Answer</span><p className="answer-line line-one">Start with the client's context.</p><p className="answer-line line-two">Add goals and open questions.</p><p className="answer-line line-three">Agree on a useful next step.</p></div><div className="scene-result">A useful response. <b>You take it from here.</b></div></div>}
      {phase===1 && <div className="delegation-scene"><div className="assignment-ribbon">Prepare a sourced client brief. <ArrowRight /></div><div className="source-fan"><div className="source-slip slip-one"><Search />Sources<Lines count={3} /></div><div className="source-slip slip-two"><FolderOpen />Your notes<Lines count={3} /></div></div><div className="agent-actions"><span><Search />Read</span><span><FileText />Draft</span><span><ShieldCheck />Check</span></div><div className="agent-deliverable"><Document reviewed /></div></div>}
      {phase===2 && <div className="software-scene"><div className="mini-app"><div className="mini-app-bar"><i /><i /><i /><span>Brief builder</span></div><div className="mini-app-body"><label>Purpose<select value={format} onChange={e=>{setFormat(e.target.value);setGenerated(false);}}><option>Meeting brief</option><option>Follow-up brief</option></select></label><div className="template-input"><Check size={15} />Sample context loaded</div><button className="demo-action" onClick={()=>setGenerated(true)}><Play size={15} />{generated?'Create again':'Create brief'}</button></div></div><ArrowRight className="software-arrow" /><div className={'software-result ' + (generated?'generated':'')} aria-live="polite">{generated ? <><Check /><h3>{format}</h3><p>{format==='Meeting brief'?'Context → goals → questions → next step':'Decisions → owners → actions → next step'}</p><span>Ready for review</span></> : <><Code2 /><p>One workflow.<br />Ready to run again.</p><small>Try the button.</small></>}</div></div>}
    </div>
  </div>;
}

const work = [['Research','Find evidence'],['Write','Shape a draft'],['Analyze','Compare options'],['Build','Reuse a workflow']];
export function WorkGallery() {
  const [chosen,setChosen]=useState(0);
  return <div className="work-gallery"><div className="work-picks" role="tablist" aria-label="Examples of agent work">{work.map(([name,verb],i)=><button role="tab" aria-selected={chosen===i} key={name} onClick={()=>setChosen(i)}><span>0{i+1}</span><strong>{name}</strong><small>{verb}</small><ArrowRight /></button>)}</div><div className="work-exhibit" key={chosen}><span className="micro">Illustrative output</span>{chosen===0?<div className="evidence-art"><div className="evidence-orbit"><Search /></div>{['Source','Evidence','Uncertainty'].map((s,i)=><div className={'evidence-ticket ticket-'+i} key={s}><Check />{s}</div>)}</div>:chosen===1?<Document title="A stronger draft" reviewed />:chosen===2?<div className="chart-art"><div className="chart-columns">{[46,83,61,95,73].map((h,i)=><i key={i} style={{height:h+'%',animationDelay:i*.12+'s'}} />)}</div><span>Options, side by side</span><small>Illustrative values</small></div>:<div className="tool-art"><div className="tool-code"><Code2 /><Lines count={5}/></div><ArrowRight/><div className="tool-window"><span /><span /><span /><Check /></div></div>}<p className="work-exhibit-caption"><Eye size={18}/>Start where “good” is easy to see.</p></div></div>;
}

export function ConnectionsScene() {
  const [connected,setConnected]=useState(false);
  return <div className={'connection-scene '+(connected?'connected':'')}><div className="connection-inputs"><div><FolderOpen/><span>Files & tools</span></div><div><Monitor/><span>Computer</span></div></div><div className="connection-cables" aria-hidden="true"><i/><i/><i/></div><div className="connection-gate"><ShieldCheck/><strong>Your permission</strong><button onClick={()=>setConnected(!connected)}>{connected?'Reset example':'Allow example access'}</button><small>Illustration only</small></div><div className="connection-cables" aria-hidden="true"><i/><i/><i/></div><div className="connection-engine"><Network/><strong>Agent</strong><span>{connected?'Tools connected':'Waiting for access'}</span></div><p className="connection-definition"><b>MCP</b>A shared standard for connecting tools.</p></div>;
}

export function ReviewScene({phase,openExamples}:{phase:number;openExamples:(v:boolean)=>void}) {
  return <div className={'review-scene '+(phase?'review-mode':'')}><div className="review-assignment"><span className="micro">The assignment</span><h2>Five potential clients.</h2><div className="brief-recipe">{['Outcome','Context','Sources','Constraints','Done'].map((s,i)=><div key={s}><b>0{i+1}</b>{s}</div>)}</div><button className="text-button" onClick={()=>openExamples(true)}>Prompt starters <ArrowRight/></button></div><div className="review-desk"><Document title="Candidate shortlist"/><div className="review-pencil" aria-hidden="true"/><div className="review-stamp">{phase?<><Check/>Reviewed</>:<><Eye/>Your turn</>}</div><div className="review-annotations">{['Verify sources','Flag uncertainty','Refine the draft'].map(s=><span key={s}>{phase?<Check/>:<Eye/>}{s}</span>)}</div></div></div>;
}

export function BoundaryScene() {
  const [chosen,setChosen]=useState(0);
  const items=[['Judgment','Decisions and final sign-off stay with you.',ShieldCheck],['Commitments','Pause before purchases, sending, or changes.',Send],['Claims','Check facts, calculations, and sources.',Search],['Access','Sign-ins and secure steps may need you.',LockKeyhole]] as const;
  const Icon=items[chosen][2];
  return <div className="boundary-scene"><div className="boundary-dial"><div className="dial-rings"/><Icon key={chosen}/><span>Human checkpoint</span></div><div className="boundary-choices"><div role="tablist" aria-label="Human checkpoints">{items.map(([s,,I],i)=><button key={s} role="tab" aria-selected={chosen===i} onClick={()=>setChosen(i)}><I/>{s}</button>)}</div><p key={chosen}>{items[chosen][1]}</p></div></div>;
}

export function DiscoveryScene() {
  const [revealed,setRevealed]=useState(false);
  return <div className={'discovery-scene '+(revealed?'found':'')}><div className="signal-map" aria-hidden="true"><div className="radar-ring ring-a"/><div className="radar-ring ring-b"/><div className="radar-sweep"/>{Array.from({length:7},(_,i)=><i key={i} className={'signal-point point-'+i}/>)}<Search/></div><div className="discovery-results"><span className="micro">Illustrative example · not live research</span><h2>Signals → evidence → fit.</h2><button className="demo-action" onClick={()=>setRevealed(!revealed)}><Search size={17}/>{revealed?'Reset example':'Inspect a signal'}</button>{revealed?<div className="signal-finding"><strong>Example Co</strong><p>Public growth signal</p><span><Check/>Possible service fit</span><small>Need and buying intent remain unconfirmed.</small></div>:<p className="discovery-hint">A signal starts the investigation.</p>}</div></div>;
}

export function BuildScene() {
  const [built,setBuilt]=useState(false);
  return <div className={'build-scene '+(built?'built':'')}><div className="build-editor"><div className="editor-top"><Code2/>Your workflow</div><p>Take sample inputs.</p><p>Shape a useful result.</p><p>Make it easy to repeat.</p><button className="demo-action" onClick={()=>setBuilt(!built)}>{built?<RotateCcw size={17}/>:<Play size={17}/>} {built?'Replay illustration':'Build the idea'}</button></div><div className="build-transform"><ArrowRight/></div><div className="build-preview"><div className="preview-toolbar"><i/><i/><i/><span>Illustrative tool</span></div>{built?<div className="built-ui"><span>Sample inputs</span><div/><div/><button onClick={()=>setBuilt(false)}>Ready to refine <Check size={17}/></button></div>:<div className="blueprint-ui"><div/><div/><div/><span>Your idea takes shape here</span></div>}</div><p className="build-handoff"><Code2/>Live build & use demo: continue in Codex + voice.</p></div>;
}
