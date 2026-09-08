export const config = { sessionDate: 'September 9, 2026', sampleAppUrl: '', discoveryUrl: '', verified: 'September 8, 2026' };

export const steps = [
  { title: 'Digital Employees', short: 'Digital team', time: '1.5 min', cue: '“You set direction. The system does the bounded work.”', notes: 'Open with the remote-team analogy: give useful assignments, time to work, review, and feedback. The point is not replacement; it is building a management habit. The 2–3× output idea is the presenter’s ambition, not a guarantee. Named agents are illustrative. Let the opening loop as people arrive. Next holds the current positions; Back resumes. You remain responsible for review, refinement, and sending work out.' },
  { title: 'Move from answers to outcomes.', short: 'Answers → outcomes', time: '2 min', cue: '“The useful shift is from asking to assigning.”', notes: 'A chat produces an answer. An agent can work toward a deliverable with context and tools. A coding agent can turn a repeated workflow into a simple tool. These labels overlap; they are a practical way to decide what to ask for.' },
  { title: 'An agent is a small system for doing work.', short: 'Inside an agent', time: '2 min', cue: '“The model is the engine. The system makes it useful.”', notes: 'Advance through the components one at a time. Each missing piece explains a common failure: unclear goal, weak direction, missing context, no ability to act, or no review. The loop is deliberate: plan, act, inspect, adjust. Human judgment remains outside the loop.' },
  { title: 'Choose the system for the job.', short: 'System profiles', time: '3 min', cue: '“Pick the system for the job; manage the work the same way.”', notes: 'Select a named system in the diagram. These are deliberately simplified system profiles, not rankings or feature promises. ChatGPT is a familiar conversational starting point. Claude can create standalone artifacts. Grok Bot documents focused bots, tools, a shared computer, and review points. OpenClaw is an open agent gateway with setup to consider. Codex is the coding agent used in the demonstration. Access varies by product, plan, and setup. The brief, review, and judgment remain yours in every case.' },
  { title: 'Start with work you can inspect.', short: 'Good first work', time: '2.5 min', cue: '“Choose a recurring task with a visible definition of good.”', notes: 'Use the examples as prompts, not capability claims. Candidate work includes research, writing, analysis, coordination, creation, and small software. Review factual claims, calculations, eligibility, and external actions. Start bounded, then measure actual time saved.' },
  { title: 'Access is your decision.', short: 'Connections & computer', time: '2 min', cue: '“Access is useful. Permission is a separate decision.”', notes: 'Use the example button to allow reading, then separately allow changes. It is an illustration and changes no real access. Define MCP once: Model Context Protocol is a common standard for connecting AI applications to external tools and information. It is not a database, a model, or automatic permission. Read access differs from change permission. A screenshot gives a moment of context; computer use and screen access depend on the product and environment.' },
  { title: 'Brief. Review. Refine.', short: 'Briefing loop', time: '3 min', cue: '“A strong brief makes review faster.”', notes: 'Show outcome, context, sources, constraints, and definition of done. You can describe the result instead of every click. Ask the system to interview you one question at a time when context is missing. Next reveals the review: an unsupported claim that a company needs help becomes a possible fit, with intent explicitly unconfirmed. Feedback returns to the agent; you decide when it is ready. Verify sources and calculations, not just formatting. Prompt starters opens example instructions.' },
  { title: 'Delegate work. Keep judgment.', short: 'Boundaries', time: '2 min', cue: '“Keep the decisions and the sensitive moments with people.”', notes: 'Sign-ins, codes, CAPTCHAs, and secure environments may need intervention. Purchases and commitments need explicit authorization. Plausible writing can contain invented facts or incorrect calculations. Missing context and wrong tools can create polished but unusable work.' },
  { title: 'Find potential clients. Show the evidence.', short: 'Discovery demo', time: '10 min · Demo', cue: '“We are looking for evidence, not pretending to know intent.”', notes: 'Inspect a signal in the fictional example, then switch to the live research tool. Use public sources. Request company, public evidence of possible need, relevant service, URL, research date, and uncertainty. Signals suggest fit; they do not prove buying intent. No automated outreach. The on-screen Example Co and its signal are fictional illustrations, not live research.' },
  { title: 'Describe it. Build it. Use it.', short: 'Build + use demo', time: '40 min · Demo', cue: '“We will build the tool, then use it together.”', notes: 'Use the illustration to walk through describe, build, use, and improve, then switch to Codex and use voice. This is one combined demonstration: create simple software and use it to make a profile. Use sample data. Exact inputs and outputs await CEO clarification; do not invent résumé fields or bio formats. The in-slide tool is an illustration, not an actual code generator. A starter is optional, not assumed.' },
  { title: 'What would you delegate first?', short: 'Questions', time: '20 min · Discussion', cue: '“Name one recurring task worth trying this week.”', notes: 'Invite the group to choose a repeatable task, describe good, and decide how to review it. Use the overview index to revisit any visual. The outcome is one bounded experiment, not a new process for everything.' },
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
];

export const frames = steps.flatMap((_, step) => Array.from({ length: step === 0 ? 2 : step === 1 ? 3 : step === 2 ? 7 : step === 6 ? 2 : 1 }, (_, phase) => ({ step, phase })));
