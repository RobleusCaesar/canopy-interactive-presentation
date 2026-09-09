'use client';

import { useState } from 'react';
import { ArrowRight, Check, Code2, Sparkles, RotateCcw, Play } from 'lucide-react';
import { AgentExamples } from './serena-workflows';
import AgentIntroduction from './agent-introduction';
import './scenes.css';
import './story-structure.css';

export function AnswerStory({phase, active}: {phase:number;active:boolean}) {
  const [replay, setReplay] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [format, setFormat] = useState('Meeting brief');
  const [agentExample, setAgentExample] = useState(0);
  const level = phase < 2 ? phase : phase - 1;
  const levels = [['Chat','An answer','Ask a question.'],['Agent','Proactive work','Notice. Act. Report back.'],['Software','A repeatable tool','Use the workflow again.']];
  return <div className={'answer-story ' + (active ? 'is-active ' : '') + (phase===2?'agents-overview':phase===1?'agent-intro-page':'')}>
    <aside className="story-guide"><span className="micro">0{level + 1} / 03</span><h2>{levels[level][0]}</h2><p>{phase===1?'From a goal to a result.':levels[level][2]}</p><div className="story-marker">{phase===1?'Work on your behalf':levels[level][1]} <ArrowRight /></div><div className="story-dots" aria-hidden="true">{levels.map((_,i)=><i key={i} className={level===i?'chosen':''} />)}</div></aside>
    <div className={'story-theatre theatre-' + phase} key={replay}>
      <div className="scene-top"><span>Illustrative workflow</span><button aria-label="Replay this animation" onClick={()=>{setReplay(replay+1);setGenerated(false);}}><RotateCcw size={14} />Replay</button></div>
      {phase===0 && <div className="conversation-scene"><div className="message-question"><span>You</span>What belongs in a client brief?</div><div className="answer-spark"><Sparkles /></div><div className="message-answer"><span>Answer</span><p className="answer-line line-one">Start with the client's context.</p><p className="answer-line line-two">Add goals and open questions.</p><p className="answer-line line-three">Agree on a useful next step.</p></div><div className="scene-result">A useful response. <b>You take it from here.</b></div></div>}
      {phase===1 && <AgentIntroduction/>}
      {phase===2 && <AgentExamples active={active} selected={agentExample} onSelect={setAgentExample}/>}
      {phase===3 && <div className="software-scene"><div className="mini-app"><div className="mini-app-bar"><i /><i /><i /><span>Brief builder</span></div><div className="mini-app-body"><label>Purpose<select value={format} onChange={e=>{setFormat(e.target.value);setGenerated(false);}}><option>Meeting brief</option><option>Follow-up brief</option></select></label><div className="template-input"><Check size={15} />Sample context loaded</div><button className="demo-action" onClick={()=>setGenerated(true)}><Play size={15} />{generated?'Create again':'Create brief'}</button></div></div><ArrowRight className="software-arrow" /><div className={'software-result ' + (generated?'generated':'')} aria-live="polite">{generated ? <><Check /><h3>{format}</h3><p>{format==='Meeting brief'?'Context → goals → questions → next step':'Decisions → owners → actions → next step'}</p><span>Ready for review</span></> : <><Code2 /><p>One workflow.<br />Ready to run again.</p><small>Try the button.</small></>}</div></div>}
    </div>
  </div>;
}
