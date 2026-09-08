import { CalendarCheck, Check, FileCheck2, MailCheck, Sparkles, UserRound } from 'lucide-react';
import './agent-introduction.css';

const actions = [{Icon:CalendarCheck,label:'Organize'},{Icon:MailCheck,label:'Prepare'},{Icon:FileCheck2,label:'Check'}];

export default function AgentIntroduction() {
  return <div className="agent-introduction">
    <h3>Agents take action and complete work <em>on your behalf.</em></h3>
    <figure className="agent-intro-flow" aria-label="You give a goal. The agent uses tools to organize, prepare, and check work. You review the result.">
      <div className="intro-connection connection-in" aria-hidden="true"/>
      <div className="intro-connection connection-out" aria-hidden="true"/>
      <div className="intro-person"><div><UserRound strokeWidth={1.4}/></div><strong>You</strong><span>Set the goal</span></div>
      <div className="intro-engine"><div className="intro-engine-mark"><i aria-hidden="true"/><Sparkles strokeWidth={1.3}/></div><strong>AI agent</strong><span>Uses tools. Takes action.</span></div>
      <div className="intro-work">{actions.map(({Icon,label},i)=><div className={`intro-work-item work-item-${i}`} key={label}><Icon strokeWidth={1.5}/><span>{label}</span><Check className="intro-work-check"/></div>)}<span className="intro-work-caption">Work, ready for you</span></div>
    </figure>
    <p className="intro-review"><Check size={16}/>You review the result.</p>
  </div>;
}
