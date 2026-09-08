'use client';

import { useEffect, useRef, useState } from 'react';
import Opening from './opening';
import AgentAssembly from './agent-assembly';
import { AnswerStory } from './scenes';
import { SystemProfiles, WorkGallery, ConnectionsScene, BoundaryScene, Questions } from './continuation';
import BuildWorkshop, { buildSteps } from './build-workshop';
import { WebinarWalkthrough } from './serena-workflows';
import { webinarSteps } from './serena-content';
import { ArrowLeft, ArrowRight, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { answerPages, config, frames, positionKey, prompts, restorePosition, sources, steps } from './content';

function Drawer({ label, title, description, children, onChange }: { label: string; title: string; description: string; children: React.ReactNode; onChange: (open: boolean) => void }) {
  return <Sheet onOpenChange={onChange}><SheetTrigger className="utility">{label}</SheetTrigger><SheetContent className="drawer"><SheetHeader><SheetTitle>{title}</SheetTitle><SheetDescription>{description}</SheetDescription></SheetHeader><div className="drawer-body">{children}</div></SheetContent></Sheet>;
}

function PromptList() {
  const [copied, setCopied] = useState(-1);
  return <div className="prompt-list">{prompts.map((prompt, index) => <article key={prompt}><p>{prompt}</p><button onClick={async () => { try { await navigator.clipboard.writeText(prompt); setCopied(index); } catch { setCopied(-2); } }}><Copy size={15} />{copied === index ? 'Copied' : 'Copy'}</button></article>)}{copied === -2 && <p role="status">Select the text to copy it manually.</p>}</div>;
}

function SlideContent({ step, phase, active, openExamples }: { step: number; phase: number; active: boolean; openExamples: (value: boolean) => void }) {
  if (step === 0) return <Opening phase={phase} active={active} />;
  if (step === 1) return <AnswerStory phase={phase} active={active} />;
  if (step === 2) return <AgentAssembly phase={phase} active={active} />;
  if (step === 3) return <SystemProfiles active={active} />;
  if (step === 4) return <WorkGallery active={active} />;
  if (step === 5) return <ConnectionsScene active={active} />;
  if (step === 6) return <WebinarWalkthrough phase={phase} active={active} openExamples={openExamples} />;
  if (step === 7) return <BoundaryScene active={active} />;
  if (step === 8) return <BuildWorkshop phase={phase} active={active} />;
  return <Questions active={active} />;
}

export default function Presentation() {
  const [active, setActive] = useState(0); const [notes, setNotes] = useState(false); const [drawerOpen, setDrawerOpen] = useState(false); const [examples, setExamples] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]); const ready = useRef(false); const current = useRef(0);
  const go = (index: number) => { const target = Math.max(0, Math.min(frames.length - 1, index)); setActive(target); current.current = target; const screen = refs.current[target]; const header = document.querySelector('.site-header'); if (screen) window.scrollTo({ top: screen.getBoundingClientRect().top + window.scrollY - (header?.clientHeight ?? 0), behavior: 'instant' }); try { localStorage.setItem(positionKey, String(target)); } catch {} };
  useEffect(() => { let saved = 0; try { saved = restorePosition(localStorage.getItem(positionKey), localStorage.getItem('canopy-presentation-v3'), localStorage.getItem('canopy-presentation-v2'));  } catch {} requestAnimationFrame(() => { go(saved); ready.current = true; }); let ticking = false; const scroll = () => { if (ticking || !ready.current) return; ticking = true; requestAnimationFrame(() => { const probe = innerHeight * .45; let best = 0; let distance = Infinity; refs.current.forEach((element, index) => { if (!element) return; const rect = element.getBoundingClientRect(); const delta = rect.top <= probe && rect.bottom > probe ? 0 : Math.min(Math.abs(rect.top - probe), Math.abs(rect.bottom - probe)); if (delta < distance) { distance = delta; best = index; } }); setActive(best); current.current = best; try { localStorage.setItem(positionKey, String(best)); } catch {} ticking = false; }); }; addEventListener('scroll', scroll, { passive: true }); return () => removeEventListener('scroll', scroll); }, []);
  useEffect(() => { const keys = (event: KeyboardEvent) => { if (drawerOpen || examples) return; const element = event.target as HTMLElement; if (element.closest('button,a,input,textarea,select,summary,[role="dialog"]')) return; const back = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key); if (back || ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); go(current.current + (back ? -1 : 1)); } }; addEventListener('keydown', keys); return () => removeEventListener('keydown', keys); }, [drawerOpen, examples]);
  const { step, phase } = frames[active];
  return <><a href="#presentation" className="skip-link">Skip to presentation</a><header className="site-header"><img src="./canopy-logo.svg" alt="Canopy Advisory Group" width="202" height="52" /><span className="header-topic">Digital team</span><nav aria-label="Presentation tools"><Drawer label="Overview" title="Jump to an idea" description="Return to any point in the conversation." onChange={setDrawerOpen}>{steps.map((item, index) => <SheetClose className="index-item" key={item.short} onClick={() => go(frames.findIndex(frame => frame.step === index))}><span>{String(index + 1).padStart(2, '0')}</span>{item.short}<small>{item.time}</small></SheetClose>)}<SheetClose className="text-button" onClick={() => go(0)}>Start again <ArrowRight /></SheetClose></Drawer><Drawer label="Sources" title="Sources & context" description={'Official sources checked ' + config.verified + '.'} onChange={setDrawerOpen}>{sources.map(([label, url]) => <a key={url} className="source-link" href={url} target="_blank" rel="noreferrer">{label}<ExternalLink size={17} /></a>)}<p>Profiles are simplified visual summaries. Features and access vary by plan, product, and setup.</p></Drawer><button className={'utility ' + (notes ? 'on' : '')} aria-pressed={notes} onClick={() => setNotes(!notes)}>Notes</button></nav></header><main id="presentation" tabIndex={-1}>{frames.map((frame, index) => <section ref={element => { refs.current[index] = element; }} className={'slide slide-' + frame.step + (active === index ? ' active' : '')} key={index} inert={active !== index} data-frame={index} data-step={frame.step}><div className="slide-heading"><p className="eyebrow">{frame.step < 8 ? 'Working with AI' : frame.step === 9 ? 'Discussion' : 'Live demonstration'}<span>{String(frame.step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span></p><h1>{frame.step===8&&frame.phase>=3?"Publish. Test. Refine.":steps[frame.step].title}</h1><p className="speaker-cue"><Sparkles /> {steps[frame.step].cue}</p></div><SlideContent step={frame.step} phase={frame.phase} active={active === index} openExamples={setExamples} /></section>)}</main>{notes && <aside className="presenter-notes" aria-label="Presenter notes"><strong>{steps[step].short} · {steps[step].time}</strong><p>{step===6?webinarSteps[phase].notes:step===8?buildSteps[phase].notes:steps[step].notes}</p><button onClick={() => setNotes(false)} aria-label="Close presenter notes">×</button></aside>}<footer className="controls"><div className="progress-copy"><b>{String(step + 1).padStart(2, '0')}<span> / {String(steps.length).padStart(2, '0')}</span></b><span>{steps[step].short}{[0, 1, 2, 6, 8].includes(step) && <small> · reveal {phase + 1}</small>}</span></div><div className="progress-track" aria-hidden="true"><div style={{ width: ((active + 1) / frames.length * 100) + '%' }} /></div><div className="nav-buttons"><button aria-label="Previous presentation state" disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft /><span>Back</span></button><button className="next" aria-label="Next presentation state" disabled={active === frames.length - 1} onClick={() => go(active + 1)}><span>Next</span><ArrowRight /></button></div></footer><Sheet open={examples} onOpenChange={setExamples}><SheetContent className="drawer"><SheetHeader><SheetTitle>Webinar agent setup brief</SheetTitle><SheetDescription>A starting instruction to adapt to your tools and approval rules.</SheetDescription></SheetHeader><div className="drawer-body"><PromptList /></div></SheetContent></Sheet><div className="sr-only" aria-live="polite">{steps[step].short}{step===1?', '+answerPages[phase]:''}, screen {step + 1} of {steps.length}.</div></>;
}
