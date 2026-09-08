'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Check, ChevronRight, ClipboardCheck, Code2, Copy, ExternalLink, Eye, FileText, FolderOpen, Link2, Monitor, Network, Search, ShieldCheck, Sparkles, Target, UserRound, Wrench } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { agentParts, config, frames, profiles, prompts, sources, steps } from './content';

const icons = [Target, FileText, FolderOpen, Wrench, ClipboardCheck];
const safeLink = (value: string) => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };

function Drawer({ label, title, description, children, onChange }: { label: string; title: string; description: string; children: React.ReactNode; onChange: (open: boolean) => void }) {
  return <Sheet onOpenChange={onChange}><SheetTrigger className="utility">{label}</SheetTrigger><SheetContent className="drawer"><SheetHeader><SheetTitle>{title}</SheetTitle><SheetDescription>{description}</SheetDescription></SheetHeader><div className="drawer-body">{children}</div></SheetContent></Sheet>;
}

function PromptList() {
  const [copied, setCopied] = useState(-1);
  return <div className="prompt-list">{prompts.map((prompt, index) => <article key={prompt}><p>{prompt}</p><button onClick={async () => { try { await navigator.clipboard.writeText(prompt); setCopied(index); } catch { setCopied(-2); } }}><Copy size={15} />{copied === index ? 'Copied' : 'Copy'}</button></article>)}{copied === -2 && <p role="status">Select the text to copy it manually.</p>}</div>;
}

function TeamVisual({ phase }: { phase: number }) {
  const lanes = [
    ['Research', Search, ['Market signals', 'Source check', 'Competitive scan']],
    ['Write', FileText, ['Client outline', 'Draft language', 'Q&A prep']],
    ['Analyze', BrainCircuit, ['Scorecard', 'Scenario model', 'Data check']],
    ['Build', Code2, ['Intake tool', 'Profile app', 'Workflow']],
  ] as const;
  return <div className={'team-visual command-desk' + (phase ? ' is-held' : '')} role="img" aria-label={phase ? 'A human director, a team workboard, and many completed digital assignments.' : 'A human director dispatching many assignments to a digital team.'}>
    <section className="command-person"><p>Human director</p><div className="person-mark"><UserRound /></div><strong>Set the work.</strong><span>Set the guardrails.</span><span>Review the result.</span></section>
    <div className="dispatch-bridge" aria-hidden="true"><span>Brief</span><i /><b /></div>
    <section className="workboard"><header><div><span>Digital team</span><small>Many bounded assignments, one clear owner</small></div><p><i /> Working</p></header><div className="work-lanes">{lanes.map(([name, Icon, tasks], lane) => <article className={'work-lane lane-' + lane} key={name}><div className="lane-head"><Icon /><strong>{name}</strong><span>0{lane + 1}</span></div><div className="task-stack">{tasks.map((task, index) => <div className={'task-chip task-' + index} key={task}><i /><span>{task}</span><b>{index === 2 ? 'ready' : 'working'}</b></div>)}</div></article>)}</div><footer><span className="review-light" />Results return for human review <b>→</b></footer></section>
  </div>;
}

function Spectrum({ phase }: { phase: number }) {
  const levels = [['Chat', 'Ask', 'An answer'], ['Agent', 'Assign', 'A draft'], ['Software', 'Repeat', 'A tool']];
  return <div className="spectrum">{levels.map(([name, verb, result], index) => <article className={phase === index ? 'selected' : phase > index ? 'past' : ''} key={name}><span className="level-number">0{index + 1}</span><strong>{name}</strong><div className="spectrum-verb">{phase >= index ? verb : '…'}</div><span>{phase >= index ? result : 'Next'}</span></article>)}<div className="spectrum-output" aria-live="polite"><Sparkles />{phase === 0 ? 'Clarify an expert bio.' : phase === 1 ? 'Draft, flag gaps, revise.' : 'Make the good workflow repeatable.'}</div></div>;
}

function AgentVisual({ phase }: { phase: number }) {
  const visible = Math.max(0, Math.min(phase, 5));
  const assembled = phase === 6;
  return <div className={'agent-visual ' + (assembled ? 'assembled' : '')}><div className="agent-stage"><div className="agent-core"><Bot /><span>{assembled ? 'WORK READY' : 'MODEL'}</span>{assembled && <Check />}</div>{agentParts.map(([name, detail], index) => { const Icon = icons[index]; return <div className={'agent-part part-' + index + (visible > index || assembled ? ' reveal' : '') + (visible - 1 === index ? ' active' : '')} key={name}><Icon /><strong>{name}</strong><small>{detail}</small></div>; })}<div className="orbit-loop"><span>plan</span><ChevronRight /><span>act</span><ChevronRight /><span>inspect</span><ChevronRight /><span>adjust</span></div></div><div className="agent-side"><p className="micro">{assembled ? 'All together' : phase === 0 ? 'Start here' : 'One useful component'}</p><h2>{assembled ? 'A result you can review.' : phase === 0 ? 'The model is only one piece.' : agentParts[visible - 1][1]}</h2><p>{assembled ? 'Finished work is not accepted work until you inspect it.' : 'Add this piece, and the system gets more useful.'}</p><div><ShieldCheck /> Human review stays with you</div></div></div>;
}

function SystemProfiles() {
  const [selected, setSelected] = useState(0);
  const profile = profiles[selected];
  return <div className="profiles"><div className="profile-rail" role="tablist" aria-label="System profiles">{profiles.map((item, index) => <button key={item.name} role="tab" aria-selected={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.name}</button>)}</div><div className="profile-display"><p className="micro">Illustrative system profile · not a product screenshot</p><div className="profile-window"><div className="window-top"><span /><span /><span /></div><div className="window-main"><div className="profile-mark">{profile.name.slice(0, 1)}</div><div><p className="micro">{profile.role}</p><h2>{profile.name}</h2><p>{profile.use}</p></div><aside><span>Watch for</span><p>{profile.watch}</p></aside></div></div><p className="profile-foot"><Code2 /> Codex is the system used in the live build-and-use demo.</p></div></div>;
}

function WorkCards() {
  const cards = [['Research', 'Find evidence', Search], ['Write', 'Shape a draft', FileText], ['Analyze', 'Compare options', BrainCircuit], ['Build', 'Reuse a workflow', Code2]] as const;
  return <div className="work-cards">{cards.map(([label, action, Icon], index) => <article key={label}><span>0{index + 1}</span><Icon /><h2>{label}</h2><p>{action}</p></article>)}<div className="work-rule"><Eye /> Start where “good” is easy to see.</div></div>;
}

function Connections() {
  return <div className="connections-visual"><div className="connection-center"><Network /><span>Agent</span></div><div className="connection-card data"><FolderOpen /><strong>Connected tools</strong><span>Files · calendar · CRM</span></div><div className="connection-card computer"><Monitor /><strong>Computer use</strong><span>A supported website or app</span></div><div className="connection-card person"><ShieldCheck /><strong>Your approval</strong><span>Change, commit, send</span></div><svg viewBox="0 0 900 500" aria-hidden="true"><path d="M450 230 L180 110 M450 230 L720 110 M450 260 L450 430" /></svg><p><b>MCP</b> is a common connection standard — not automatic permission.</p></div>;
}

function BriefReview({ phase, openExamples }: { phase: number; openExamples: (value: boolean) => void }) {
  const review = phase === 1;
  return <div className="brief-review"><div className="brief-card"><div className="brief-header"><FileText /> Assignment</div><h2>{review ? 'Five potential clients' : 'The brief'}</h2><div className="brief-lines"><span>Outcome</span><span>Context</span><span>Sources</span><span>Constraints</span><span>Done looks like</span></div></div><div className={'review-card ' + (review ? 'reviewed' : '')}><div className="brief-header"><ClipboardCheck /> {review ? 'Review' : 'Then'}</div><h2>{review ? 'Check the evidence.' : 'Let it work.'}</h2><div className="check-list">{['Source links', 'Uncertainties', 'Requested format'].map((item, index) => <p key={item}>{review ? <Check /> : <span>{index + 1}</span>}{item}</p>)}</div></div><div className="brief-actions"><p>{review ? 'The first answer is a starting point.' : 'Give the system a clear target.'}</p><button className="text-button" onClick={() => openExamples(true)}>Open prompt starters <ArrowRight /></button></div></div>;
}

function Boundaries() {
  return <div className="boundaries-visual"><div className="boundary keep"><span>KEEP</span><h2>Judgment</h2><p>Decisions and final sign-off.</p></div><div className="boundary pause"><span>PAUSE</span><h2>Commitments</h2><p>Purchases, sending, changing.</p></div><div className="boundary check"><span>CHECK</span><h2>Claims</h2><p>Facts, math, sources.</p></div><div className="boundary note"><span>NOTICE</span><h2>Access</h2><p>Codes, sign-ins, secure tools.</p></div></div>;
}

function DiscoveryDemo() {
  return <div className="demo-visual"><div className="demo-flow"><article><Search /><strong>Public signals</strong></article><ArrowRight /><article><BriefcaseBusiness /><strong>Possible fit</strong></article><ArrowRight /><article><ShieldCheck /><strong>Human review</strong></article></div><div className="sample-table"><span className="sample-label">Illustrative output · not live research</span><div><b>Company</b><b>Evidence</b><b>Uncertainty</b></div><div><span>Example Co</span><span>Public growth signal</span><span>Need not confirmed</span></div></div><p>Evidence of possible need ≠ buying intent.</p></div>;
}

function BuildDemo() {
  return <div className="build-visual"><div className="build-step"><FolderOpen /><span>Sample inputs</span></div><ChevronRight /><div className="build-step focus"><Code2 /><span>Build together</span></div><ChevronRight /><div className="build-step"><ClipboardCheck /><span>Reviewable output</span></div><div className="codex-switch"><Bot /> Continue in Codex + voice</div></div>;
}

function Questions() {
  return <div className="questions-visual"><div><span>01</span><h2>What repeats?</h2></div><div><span>02</span><h2>What is good?</h2></div><div><span>03</span><h2>How will you review?</h2></div><p>Choose one bounded experiment.</p></div>;
}

function SlideContent({ step, phase, openExamples }: { step: number; phase: number; openExamples: (value: boolean) => void }) {
  if (step === 0) return <TeamVisual phase={phase} />;
  if (step === 1) return <Spectrum phase={phase} />;
  if (step === 2) return <AgentVisual phase={phase} />;
  if (step === 3) return <SystemProfiles />;
  if (step === 4) return <WorkCards />;
  if (step === 5) return <Connections />;
  if (step === 6) return <BriefReview phase={phase} openExamples={openExamples} />;
  if (step === 7) return <Boundaries />;
  if (step === 8) return <DiscoveryDemo />;
  if (step === 9) return <BuildDemo />;
  return <Questions />;
}

export default function Presentation() {
  const [active, setActive] = useState(0); const [notes, setNotes] = useState(false); const [drawerOpen, setDrawerOpen] = useState(false); const [examples, setExamples] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]); const ready = useRef(false); const current = useRef(0);
  const go = (index: number) => { const target = Math.max(0, Math.min(frames.length - 1, index)); setActive(target); current.current = target; const screen = refs.current[target]; const header = document.querySelector('.site-header'); if (screen) window.scrollTo({ top: screen.getBoundingClientRect().top + window.scrollY - (header?.clientHeight ?? 0), behavior: 'instant' }); try { localStorage.setItem('canopy-presentation-v2', String(target)); } catch {} };
  useEffect(() => { let saved = 0; try { saved = Number(localStorage.getItem('canopy-presentation-v2')) || 0; } catch {} requestAnimationFrame(() => { go(saved); ready.current = true; }); let ticking = false; const scroll = () => { if (ticking || !ready.current) return; ticking = true; requestAnimationFrame(() => { const probe = innerHeight * .45; let best = 0; let distance = Infinity; refs.current.forEach((element, index) => { if (!element) return; const rect = element.getBoundingClientRect(); const delta = rect.top <= probe && rect.bottom > probe ? 0 : Math.min(Math.abs(rect.top - probe), Math.abs(rect.bottom - probe)); if (delta < distance) { distance = delta; best = index; } }); setActive(best); current.current = best; try { localStorage.setItem('canopy-presentation-v2', String(best)); } catch {} ticking = false; }); }; addEventListener('scroll', scroll, { passive: true }); return () => removeEventListener('scroll', scroll); }, []);
  useEffect(() => { const keys = (event: KeyboardEvent) => { if (drawerOpen || examples) return; const element = event.target as HTMLElement; if (element.closest('button,a,input,textarea,select,summary,[role="dialog"]')) return; const back = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key); if (back || ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); go(current.current + (back ? -1 : 1)); } }; addEventListener('keydown', keys); return () => removeEventListener('keydown', keys); }, [drawerOpen, examples]);
  const { step, phase } = frames[active];
  return <><a href="#presentation" className="skip-link">Skip to presentation</a><header className="site-header"><img src="./canopy-logo.svg" alt="Canopy Advisory Group" width="202" height="52" /><span className="header-topic">Digital team</span><nav aria-label="Presentation tools"><Drawer label="Overview" title="Jump to an idea" description="Return to any point in the conversation." onChange={setDrawerOpen}>{steps.map((item, index) => <SheetClose className="index-item" key={item.short} onClick={() => go(frames.findIndex(frame => frame.step === index))}><span>{String(index + 1).padStart(2, '0')}</span>{item.short}<small>{item.time}</small></SheetClose>)}<SheetClose className="text-button" onClick={() => go(0)}>Start again <ArrowRight /></SheetClose></Drawer><Drawer label="Sources" title="Sources & context" description={'Official sources checked ' + config.verified + '.'} onChange={setDrawerOpen}>{sources.map(([label, url]) => <a key={url} className="source-link" href={url} target="_blank" rel="noreferrer">{label}<ExternalLink size={17} /></a>)}<p>Profiles are simplified visual summaries. Features and access vary by plan, product, and setup.</p></Drawer><button className={'utility ' + (notes ? 'on' : '')} aria-pressed={notes} onClick={() => setNotes(!notes)}>Notes</button></nav></header><main id="presentation" tabIndex={-1}>{frames.map((frame, index) => <section ref={element => { refs.current[index] = element; }} className={'slide slide-' + frame.step + (active === index ? ' active' : '')} key={index} data-frame={index} data-step={frame.step}><div className="slide-heading"><p className="eyebrow">{frame.step < 8 ? 'Working with AI' : frame.step === 10 ? 'Discussion' : 'Live demonstration'}<span>{String(frame.step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span></p><h1>{steps[frame.step].title}</h1><p className="speaker-cue"><Sparkles /> {steps[step].cue}</p></div><SlideContent step={frame.step} phase={frame.phase} openExamples={setExamples} /></section>)}</main>{notes && <aside className="presenter-notes" aria-label="Presenter notes"><strong>{steps[step].short} · {steps[step].time}</strong><p>{steps[step].notes}</p><button onClick={() => setNotes(false)} aria-label="Close presenter notes">×</button></aside>}<footer className="controls"><div className="progress-copy"><b>{String(step + 1).padStart(2, '0')}<span> / {String(steps.length).padStart(2, '0')}</span></b><span>{steps[step].short}{[0, 1, 2, 6].includes(step) && <small> · reveal {phase + 1}</small>}</span></div><div className="progress-track" aria-hidden="true"><div style={{ width: ((active + 1) / frames.length * 100) + '%' }} /></div><div className="nav-buttons"><button aria-label="Previous presentation state" disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft /><span>Back</span></button><button className="next" aria-label="Next presentation state" disabled={active === frames.length - 1} onClick={() => go(active + 1)}><span>Next</span><ArrowRight /></button></div></footer><Sheet open={examples} onOpenChange={setExamples}><SheetContent className="drawer"><SheetHeader><SheetTitle>Prompt starters</SheetTitle><SheetDescription>Use these to create a clearer assignment.</SheetDescription></SheetHeader><div className="drawer-body"><PromptList /></div></SheetContent></Sheet><div className="sr-only" aria-live="polite">{steps[step].short}, screen {step + 1} of {steps.length}.</div></>;
}
