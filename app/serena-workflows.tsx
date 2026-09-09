'use client';

import { useState } from 'react';
import { ArrowRight, Bell, CalendarDays, Check, CircleHelp, Clock3, FileCheck2, FileText, FolderOpen, Image, Inbox, ListChecks, Mail, ShieldCheck, Sparkles, UserRound, UsersRound, RotateCcw } from 'lucide-react';
import { agentExamples, webinarSteps } from './serena-content';
import './serena-workflows.css';

const caseIcons=[Inbox,FileCheck2,CalendarDays,ListChecks];

function ExampleArt({example}:{example:number}) {
  if(example===0)return <div className="triage-art">
    <div className="artifact-heading"><Inbox/><span>Morning inbox</span><small>Sample</small></div>
    {['Client question','Shoot availability','Industry newsletter'].map((s,i)=><div className={`triage-row triage-row-${i}`} key={s}><Mail/><span>{s}</span><b>{['Needs you','Reply drafted','Ready to file'][i]}</b></div>)}
    <div className="artifact-finish"><Check/>Your priorities, ready before you start.</div>
  </div>;
  if(example===1)return <div className="profile-prep-art">
    <div className="incoming-file bio-file"><FileText/>Bio.docx</div><div className="incoming-file photo-file"><Image/>Headshot.jpg</div>
    <div className="website-draft"><div className="artifact-heading"><span>Website draft</span><small>Sample</small></div><div className="profile-preview"><div className="profile-placeholder"><UserRound/></div><div><h4>New expert</h4><span>Bio + headshot paired</span><i/><i/><i/></div></div><div className="artifact-finish"><Check/>Ready for your review</div></div>
  </div>;
  if(example===2)return <div className="shoot-art"><div className="artifact-heading"><CalendarDays/><span>Proposed photoshoot</span><small>Sample</small></div><div className="shoot-calendar">{['Wed','Thu','Fri'].map((s,i)=><div className="shoot-day" key={s}><span>{s}</span><i/><i/><i/>{i<2&&<div className={`shoot-slot slot-${i}`}><b>{i?'10:00':'09:00'}</b>Studio</div>}</div>)}</div><div className="schedule-buffer"><Clock3/>Travel buffer included</div><div className="artifact-finish"><Check/>Conflicts surfaced before invitations.</div></div>;
  return <div className="talent-art"><div className="artifact-heading"><ListChecks/><span>Talent Book check</span><small>Sample</small></div><div className="talent-table"><div className="talent-table-head"><span>Profile</span><span>Bio</span><span>Photo</span></div>{['A','B','C'].map((s,i)=><div className="talent-row" key={s}><span>Expert {s}</span>{i===1?<CircleHelp className="needs-review"/>:<Check/>}{i===2?<CircleHelp className="needs-review"/>:<Check/>}</div>)}</div><div className="talent-alert"><CircleHelp/>Outdated bio · missing photo</div></div>;
}

export function AgentExamples({active,selected,onSelect}:{active:boolean;selected:number;onSelect:(i:number)=>void}) {
  const item=agentExamples[selected];
  return <div className={`agent-examples ${active?'case-running':''}`}>
    <div className="agent-case-nav" aria-label="Proactive agent examples">{agentExamples.map((ex,i)=>{const Icon=caseIcons[i];return <button key={ex.id} aria-pressed={selected===i} onClick={()=>onSelect(i)}><Icon size={18}/>{ex.label}</button>;})}</div>
    <div className="agent-case-body" key={item.id}><div className="case-copy"><span className="case-trigger"><Clock3 size={14}/>{item.trigger}</span><h3>{item.title}</h3><p>{item.action}</p><small>{item.starter}</small></div><div className="case-art"><ExampleArt example={selected}/></div></div>
    <p className="case-review"><ShieldCheck size={16}/>{item.review}<span>Scheduled runs need approved connections.</span></p>
  </div>;
}

const stageIcons=[FolderOpen,Clock3,UsersRound,Sparkles,ShieldCheck];

function SourceBoard(){return <div className="webinar-source-board"><div className="event-source-card"><div className="event-date"><span>THU</span><b>17</b></div><div><small>Illustrative event</small><h3>Canopy webinar</h3><p>10:00 AM · Mountain Time</p></div><CalendarDays/></div><div className="source-stack">{[['Event brief','Topic, tone, approved links'],['Registration list','Recipients + permissions'],['Attendance export','Attended, missed, unknown']].map(([label,detail],i)=><div className="source-record" key={label} style={{animationDelay:`${i*.22}s`}}><FileText/><span><b>{label}</b><small>{detail}</small></span><Check/></div>)}</div><div className="stage-caption">One event table. Approved material.</div></div>;}

function TriggerBoard(){return <div className="webinar-trigger-board"><div className="webinar-anchor"><CalendarDays/><span>Canopy webinar</span><b>10:00 AM</b></div><div className="trigger-moments"><div className="trigger-track" aria-hidden="true"/>{[['−24h','Reminder'],['−1h','Starting soon'],['+2h','Follow-up']].map(([time,label],i)=><div className="trigger-moment" key={time} style={{animationDelay:`${i*.4}s`}}><div className="trigger-clock"><Clock3/></div><strong>{time}</strong><span>{label}</span></div>)}</div><p className="stage-caption"><Bell/>Prepare automatically. Hold for approval.</p></div>;}

function AudienceBoard(){return <div className="webinar-audience-board"><div className="audience-input"><UsersRound/>Registration + attendance</div><div className="audience-branches" aria-hidden="true"><i/><i/><i/></div><div className="audience-groups">{[['Attended','Thank-you + resources'],['Missed it','Replay invitation'],['Needs review','Hold the message']].map(([title,detail],i)=><div className={`audience-group group-${i}`} key={title}><div className="attendee-tokens" aria-hidden="true">{Array.from({length:i===2?1:3},(_,n)=><UserRound key={n} style={{animationDelay:`${i*.2+n*.16}s`}}/>)}</div><h3>{title}</h3><p>{detail}</p></div>)}</div><p className="stage-caption">Check contact permissions. Prevent duplicate sends.</p></div>;}

function MessageBoard(){return <div className="webinar-message-board"><div className="agent-composer"><Sparkles/><b>Webinar agent</b><span>Approved brief + audience context</span></div><div className="message-drafts">{[['Attended','Thanks for joining us.','Your resources + a relevant next step.'],['Missed it','Here’s the replay.','Watch when the timing works for you.']].map(([group,subject,line],i)=><article className="webinar-draft" key={group} style={{animationDelay:`${i*.45}s`}}><span className="draft-group">{group}</span><Mail/><h3>{subject}</h3><p>{line}</p><div className="draft-check"><Check/>Approved links</div></article>)}</div><p className="stage-caption">Unknown answer? Flag it for Serena.</p></div>;}

function ApprovalBoard({approved,onApprove}:{approved:boolean;onApprove:()=>void}){return <div className={`webinar-approval-board ${approved?'example-approved':''}`}><div className="approval-reviewer"><div className="reviewer-icon"><UserRound/></div><span>Serena</span><h3>{approved?'Approved example':'Review before delivery'}</h3><p>Recipients · Messages · Links</p></div><div className="dispatch-lane"><div className="dispatch-message"><Mail/><span>Reviewed messages</span></div><ArrowRight/><div className="delivery-record"><ListChecks/><span>{approved?'Example logged':'Send log'}</span>{approved&&<Check/>}</div></div><button className="demo-action" onClick={onApprove}>{approved?<RotateCcw size={16}/>:<ShieldCheck size={16}/>} {approved?'Replay example':'Approve example'}</button><p className="stage-caption">Simulation only · no email is sent</p></div>;}

export function WebinarWalkthrough({phase,active,openExamples}:{phase:number;active:boolean;openExamples:(v:boolean)=>void}) {
  const step=webinarSteps[phase];
  const [replay,setReplay]=useState(0),[approved,setApproved]=useState(false);
  return <div className={`webinar-walkthrough guided-panel ${active?'webinar-active':''}`}>
    <aside className="webinar-guide guided-rail"><ol className="webinar-step-list">{webinarSteps.map((s,i)=>{const Icon=stageIcons[i];return <li key={s.label} className={i===phase?'current':i<phase?'complete':''} aria-current={i===phase?'step':undefined}><span>{i<phase?<Check size={15}/>:String(i+1).padStart(2,'0')}</span><Icon size={19}/>{s.label}</li>;})}</ol><p className="webinar-tool">{step.tool}</p><p className="webinar-instruction">{step.action}</p><button className="text-button" onClick={()=>openExamples(true)}>Setup brief <ArrowRight size={16}/></button></aside>
    <div className="webinar-theatre guided-stage"><div className="webinar-theatre-bar panel-toolbar"><span>Example setup · Microsoft tools</span><button onClick={()=>{setReplay(replay+1);setApproved(false);}} aria-label="Replay this step"><RotateCcw size={14}/>Replay</button></div><h2>{step.title}</h2><div className={`webinar-stage webinar-stage-${phase}`} key={replay}>{phase===0?<SourceBoard/>:phase===1?<TriggerBoard/>:phase===2?<AudienceBoard/>:phase===3?<MessageBoard/>:<ApprovalBoard approved={approved} onApprove={()=>setApproved(!approved)}/>}</div></div>
  </div>;
}
