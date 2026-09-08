'use client';

import { useEffect, useRef, useState } from 'react';
import Opening from './opening';
import { AnswerStory, WorkGallery, ConnectionsScene, ReviewScene, BoundaryScene, DiscoveryScene, BuildScene } from './scenes';
import { ArrowLeft, ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Building2, Check, ChevronRight, ClipboardCheck, Code2, Copy, ExternalLink, Eye, FileText, FolderOpen, Globe2, Link2, Monitor, Network, Search, ShieldCheck, Sparkles, Target, UserRound, UsersRound, Wrench } from 'lucide-react';
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

function Questions() {
  return <div className="questions-visual"><div><span>01</span><h2>What repeats?</h2></div><div><span>02</span><h2>What is good?</h2></div><div><span>03</span><h2>How will you review?</h2></div><p>Choose one bounded experiment.</p></div>;
}

function SlideContent({ step, phase, active, openExamples }: { step: number; phase: number; active: boolean; openExamples: (value: boolean) => void }) {
  if (step === 0) return <Opening phase={phase} active={active} />;
  if (step === 1) return <AnswerStory phase={phase} active={active} />;
  if (step === 2) return <AgentVisual phase={phase} />;
  if (step === 3) return <SystemProfiles />;
  if (step === 4) return <WorkGallery />;
  if (step === 5) return <ConnectionsScene />;
  if (step === 6) return <ReviewScene phase={phase} openExamples={openExamples} />;
  if (step === 7) return <BoundaryScene />;
  if (step === 8) return <DiscoveryScene />;
  if (step === 9) return <BuildScene />;
  return <Questions />;
}

export default function Presentation() {
  const [active, setActive] = useState(0); const [notes, setNotes] = useState(false); const [drawerOpen, setDrawerOpen] = useState(false); const [examples, setExamples] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]); const ready = useRef(false); const current = useRef(0);
  const go = (index: number) => { const target = Math.max(0, Math.min(frames.length - 1, index)); setActive(target); current.current = target; const screen = refs.current[target]; const header = document.querySelector('.site-header'); if (screen) window.scrollTo({ top: screen.getBoundingClientRect().top + window.scrollY - (header?.clientHeight ?? 0), behavior: 'instant' }); try { localStorage.setItem('canopy-presentation-v2', String(target)); } catch {} };
  useEffect(() => { let saved = 0; try { saved = Number(localStorage.getItem('canopy-presentation-v2')) || 0; } catch {} requestAnimationFrame(() => { go(saved); ready.current = true; }); let ticking = false; const scroll = () => { if (ticking || !ready.current) return; ticking = true; requestAnimationFrame(() => { const probe = innerHeight * .45; let best = 0; let distance = Infinity; refs.current.forEach((element, index) => { if (!element) return; const rect = element.getBoundingClientRect(); const delta = rect.top <= probe && rect.bottom > probe ? 0 : Math.min(Math.abs(rect.top - probe), Math.abs(rect.bottom - probe)); if (delta < distance) { distance = delta; best = index; } }); setActive(best); current.current = best; try { localStorage.setItem('canopy-presentation-v2', String(best)); } catch {} ticking = false; }); }; addEventListener('scroll', scroll, { passive: true }); return () => removeEventListener('scroll', scroll); }, []);
  useEffect(() => { const keys = (event: KeyboardEvent) => { if (drawerOpen || examples) return; const element = event.target as HTMLElement; if (element.closest('button,a,input,textarea,select,summary,[role="dialog"]')) return; const back = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key); if (back || ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); go(current.current + (back ? -1 : 1)); } }; addEventListener('keydown', keys); return () => removeEventListener('keydown', keys); }, [drawerOpen, examples]);
  const { step, phase } = frames[active];
  return <><a href="#presentation" className="skip-link">Skip to presentation</a><header className="site-header"><img src="./canopy-logo.svg" alt="Canopy Advisory Group" width="202" height="52" /><span className="header-topic">Digital team</span><nav aria-label="Presentation tools"><Drawer label="Overview" title="Jump to an idea" description="Return to any point in the conversation." onChange={setDrawerOpen}>{steps.map((item, index) => <SheetClose className="index-item" key={item.short} onClick={() => go(frames.findIndex(frame => frame.step === index))}><span>{String(index + 1).padStart(2, '0')}</span>{item.short}<small>{item.time}</small></SheetClose>)}<SheetClose className="text-button" onClick={() => go(0)}>Start again <ArrowRight /></SheetClose></Drawer><Drawer label="Sources" title="Sources & context" description={'Official sources checked ' + config.verified + '.'} onChange={setDrawerOpen}>{sources.map(([label, url]) => <a key={url} className="source-link" href={url} target="_blank" rel="noreferrer">{label}<ExternalLink size={17} /></a>)}<p>Profiles are simplified visual summaries. Features and access vary by plan, product, and setup.</p></Drawer><button className={'utility ' + (notes ? 'on' : '')} aria-pressed={notes} onClick={() => setNotes(!notes)}>Notes</button></nav></header><main id="presentation" tabIndex={-1}>{frames.map((frame, index) => <section ref={element => { refs.current[index] = element; }} className={'slide slide-' + frame.step + (active === index ? ' active' : '')} key={index} data-frame={index} data-step={frame.step}><div className="slide-heading"><p className="eyebrow">{frame.step < 8 ? 'Working with AI' : frame.step === 10 ? 'Discussion' : 'Live demonstration'}<span>{String(frame.step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span></p><h1>{steps[frame.step].title}</h1><p className="speaker-cue"><Sparkles /> {steps[frame.step].cue}</p></div><SlideContent step={frame.step} phase={frame.phase} active={active === index} openExamples={setExamples} /></section>)}</main>{notes && <aside className="presenter-notes" aria-label="Presenter notes"><strong>{steps[step].short} · {steps[step].time}</strong><p>{steps[step].notes}</p><button onClick={() => setNotes(false)} aria-label="Close presenter notes">×</button></aside>}<footer className="controls"><div className="progress-copy"><b>{String(step + 1).padStart(2, '0')}<span> / {String(steps.length).padStart(2, '0')}</span></b><span>{steps[step].short}{[0, 1, 2, 6].includes(step) && <small> · reveal {phase + 1}</small>}</span></div><div className="progress-track" aria-hidden="true"><div style={{ width: ((active + 1) / frames.length * 100) + '%' }} /></div><div className="nav-buttons"><button aria-label="Previous presentation state" disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft /><span>Back</span></button><button className="next" aria-label="Next presentation state" disabled={active === frames.length - 1} onClick={() => go(active + 1)}><span>Next</span><ArrowRight /></button></div></footer><Sheet open={examples} onOpenChange={setExamples}><SheetContent className="drawer"><SheetHeader><SheetTitle>Prompt starters</SheetTitle><SheetDescription>Use these to create a clearer assignment.</SheetDescription></SheetHeader><div className="drawer-body"><PromptList /></div></SheetContent></Sheet><div className="sr-only" aria-live="polite">{steps[step].short}, screen {step + 1} of {steps.length}.</div></>;
}
