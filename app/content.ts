import { webinarPrompt } from './serena-content';

export const config = { sessionDate: 'September 9, 2026', sampleAppUrl: 'https://robleuscaesar.github.io/canopy-bio-builder/', verified: 'September 8, 2026' };

export const steps = [
  { title: 'Working With AI Agents', short: 'AI agents', time: '1.5 min', cue: '“You set direction. The system does the bounded work.”', notes: 'Open with the remote-team analogy: give useful assignments, time to work, review, and feedback. The point is not replacement; it is building a management habit. The 2–3× output idea is the presenter’s ambition, not a guarantee. Named agents are illustrative. Let the opening loop as people arrive. Next begins the presentation; Back returns to the animated opening. You remain responsible for review, refinement, and sending work out.' },
  { title: 'Move from answers to outcomes.', short: 'Answers → outcomes', time: '4 min', cue: '“The useful shift is from asking to assigning.”', notes: 'A chat produces an answer. Start the agent section with its definition: AI that takes actions and completes work on your behalf. Let the goal-to-agent-to-finished-work animation settle; explain that agents use tools and that you review their results. Next opens the examples. Select four day-one starting points from Serena’s work: morning inbox triage, website bio/headshot preparation, photoshoot scheduling, and Talent Book checks. Each shows a trigger, a concrete result, and a human review point. Start with a small set of approved files, an inbox folder, or a calendar/roster export and supervise the first run. Recurring or event-driven work requires approved connections, instructions and a supported trigger; these are proposed workflows, not ready-made installed automations. CMS draft staging depends on the website connection; a prepared publication package is the fallback. Do not infer permission to send, publish, merge records or book events. A coding agent can turn a repeated workflow into a simple tool. These labels overlap; the useful distinction is who initiates the work and how it gets done.' },
  { title: 'An agent is a small system for doing work.', short: 'Inside an agent', time: '2 min', cue: '“The model is the engine. The system makes it useful.”', notes: 'Advance through the components one at a time. Each missing piece explains a common failure: unclear goal, weak direction, missing context, no ability to act, or no review. The loop is deliberate: plan, act, inspect, adjust. Human judgment remains outside the loop.' },
  { title: 'Choose the system for the job.', short: 'System profiles', time: '3 min', cue: '“Pick the system for the job; manage the work the same way.”', notes: 'Select a named system in the diagram. These are deliberately simplified system profiles, not rankings or feature promises. ChatGPT is a familiar conversational starting point. Claude can create standalone artifacts. Grok Bot documents focused bots, tools, a shared computer, and review points. OpenClaw is an open agent gateway with setup to consider. Codex is the coding agent used in the demonstration. Access varies by product, plan, and setup. The brief, review, and judgment remain yours in every case.' },
  { title: 'Start with work you can inspect.', short: 'Good first work', time: '2.5 min', cue: '“Choose a recurring task with a visible definition of good.”', notes: 'Use the examples as prompts, not capability claims. Candidate work includes research, writing, analysis, coordination, creation, and small software. Review factual claims, calculations, eligibility, and external actions. Start bounded, then measure actual time saved.' },
  { title: 'Access is your decision.', short: 'Connections & computer', time: '2 min', cue: '“Access is useful. Permission is a separate decision.”', notes: 'Use the example button to allow reading, then separately allow changes. It is an illustration and changes no real access. Define MCP once: Model Context Protocol is a common standard for connecting AI applications to external tools and information. It is not a database, a model, or automatic permission. Read access differs from change permission. A screenshot gives a moment of context; computer use and screen access depend on the product and environment.' },
  { title: 'Build a webinar coordinator.', short: 'Webinar agent', time: '5 min', cue: '“Give repeatable work a trigger, tools and a review point.”', notes: 'Advance through five setup steps: source of truth, trigger, audience, agent, and human handoff. This is a proposed automation for Serena’s webinar reminders and follow-ups. The Microsoft tools illustrate one concrete implementation; Canopy’s actual tools and access need to be confirmed. Timing and recipient rules belong in explicit automation. Agent value comes from interpreting context, tailoring messages and identifying exceptions. The on-screen workflow is illustrative and never sends email.' },
  { title: 'Delegate work. Keep judgment.', short: 'Boundaries', time: '2 min', cue: '“Keep the decisions and the sensitive moments with people.”', notes: 'Sign-ins, codes, CAPTCHAs, and secure environments may need intervention. Purchases and commitments need explicit authorization. Plausible writing can contain invented facts or incorrect calculations. Missing context and wrong tools can create polished but unusable work.' },
  { title: 'Define it. Design it. Build it.', short: 'Build + launch', time: '40 min · Demo', cue: '“Build a useful tool, then put it to work.”', notes: 'Page one uses three progressive animations: requirements, design, and build. Page two shows five implementation steps: GitHub account and repository, upload software, deploy a static site with Pages, quality assurance, and refinement. The final refinement step introduces the live demo. These are illustrative processes; no account, upload or deployment is performed by the slide.' },
  { title: 'Canopy Bio Builder', short: 'Bio builder', time: 'Live demo', cue: '“Here is the working application.”', notes: 'Use the live consultant bio builder inside the presentation. Add a sample headshot and résumé or bio document, then demonstrate its workflow. The app manages its own inputs and API-key setup; use Open app if setup is needed. Expand gives the app the full screen; Restore or Escape returns to the presentation. Use the presentation footer to continue to Thank you. Work stays in the embedded app when moving away and back during this visit. This is the real external application and requires an internet connection.' },
  { title: 'Thank you.', short: 'Thank you', time: '20 min · Discussion', cue: '“Thank you. What questions do you have?”', notes: 'Reveal the finished Canopy bio supplied by Rob as the payoff to the preceding app demo. The original bio fills the closing slide, is displayed upright, and can be opened at full size. Thank the audience and invite questions. Rob Carpenter, Canopy Consulting. Email: rob@frostrivercapital.com. Phone: (303) 358-6128. Use Overview to revisit any part of the presentation during discussion.' },
];

export const agentParts = [
  ['Goal', 'What should be finished?'],
  ['Direction', 'How should it work?'],
  ['Context', 'What should it know?'],
  ['Tools', 'What can it use?'],
  ['Review', 'How will it check?'],
];

export const profiles = [
  { name: 'ChatGPT', role: 'Conversation', use: 'Think, write, and work from supplied material.', watch: 'Features vary by plan and setup.' },
  { name: 'Claude', role: 'Artifacts', use: 'Shape content into standalone, interactive work.', watch: 'Claude and Claude Code are different surfaces.' },
  { name: 'Grok Bot', role: 'Focused teammates', use: 'Give a named bot one clear job and review point.', watch: 'Computer and tool access need setup.' },
  { name: 'OpenClaw', role: 'Open gateway', use: 'Connect agents across supported channels.', watch: 'Operation and setup are part of the choice.' },
  { name: 'Codex', role: 'Build software', use: 'Turn a workflow into a small, usable application.', watch: 'We will use this in the live demo.' },
];

export const prompts = [
  webinarPrompt,
  'Interview me one question at a time before proposing the solution.',
  'What information are you missing?',
  'Show your sources and separate facts from assumptions.',
  'Propose a plan and stop for review before taking external action.',
  'Check the result against the original requirements.',
];

export const sources = [
  ['Canopy Advisory Group · brand and business', 'https://canopyadvisory.com/'],
  ['ChatGPT · working with files', 'https://learn.chatgpt.com/docs/artifacts-viewer'],
  ['ChatGPT · computer use', 'https://learn.chatgpt.com/docs/computer-use'],
  ['Claude · artifacts', 'https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them'],
  ['Grok Bot · focused Bots, tools, computer, review', 'https://docs.x.ai/grok-bot/get-started'],
  ['OpenClaw · open agent gateway', 'https://docs.openclaw.ai/'],
  ['MCP · official introduction', 'https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro'],
  ['Codex · OpenAI developer overview', 'https://developers.openai.com/'],
  ['Microsoft · agent event triggers', 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-triggers-about'],
  ['Microsoft · agent flows, schedules and actions', 'https://learn.microsoft.com/en-us/training/modules/use-agent-flows/'],
  ['Microsoft · human approval before sending', 'https://learn.microsoft.com/en-us/power-automate/modern-approvals'],
  ['GitHub · create an account', 'https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github'],
  ['GitHub Pages · publish a static site', 'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site'],
];

export const frames = steps.flatMap((_, step) => Array.from({ length: step === 0 ? 1 : step === 1 ? 4 : step === 2 ? 6 : step === 6 ? 5 : step === 8 ? 8 : 1 }, (_, phase) => ({ step, phase })));

export const answerPages = ['Chat', 'Agent introduction', 'Agent examples', 'Software'];

export const positionKey = 'canopy-presentation-v6';
export function restorePosition(current:string|null, v5:string|null, previous:string|null, v3:string|null, legacy:string|null) {
  const value=Number(current??v5??previous??v3??legacy);
  if(!Number.isInteger(value)||value<0)return 0;
  let migrated=value;
  if(current===null&&v5===null) {
    if(previous===null) {
      const oldPosition=v3!==null?value:value<=15?value:value===16?15:value===17?20:value<=19?21:29;
      migrated=oldPosition>=4?oldPosition+1:oldPosition;
    }
    migrated-=Number(migrated>=1)+Number(migrated>=12);
  }
  if(current===null&&migrated>=28)migrated++;
  return Math.min(migrated,frames.length-1);
}
