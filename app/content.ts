export const config = { sessionDate: 'September 9, 2026', sampleAppUrl: '', discoveryUrl: '', verified: 'September 6, 2026' };
export const steps = [
  {title:'Your next team members are digital.', short:'Your digital team', time:'1.5 min', notes:'Use the remote-team analogy: assign work, allow time, review, and give feedback. A mid-level employee is an analogy for some bounded assignments, not a competence rating. Capability is uneven; accountable judgment stays with people. “Everyone becomes a manager” is the presenter’s perspective. The ambition is 2–3× useful output, not a measured or guaranteed benefit. Audience familiarity with basic ChatGPT or Claude is a working assumption; check it aloud.'},
  {title:'Ask a question. Delegate a task. Build a repeatable tool.',short:'From answers to work',time:'2 min', notes:'These categories overlap. One product can support chat and agentic work. “Bot” is a product label, not a precise technical category. An agent combines a model with instructions, context, tools, and an execution loop. It is not automatically autonomous or connected to every app.'},
  {title:'A capable model needs context, tools, and direction.',short:'Inside an agent',time:'2 min',notes:'Advance slowly through the five components. The model is the core, not the whole system. The agent plans, acts, inspects, and adjusts; the person decides whether the work is acceptable. Review is both an agent inspection step and a separate human responsibility. This is a conceptual diagram, not a particular product’s architecture.'},
  {title:'Different systems, the same management skills.',short:'Meet the systems',time:'3 min',notes:'The interfaces are labeled schematics, not screenshots. They use generic consulting roles and contain no private reference content. Claude artifacts support standalone content and interactive tools; Claude Code is its coding agent. Grok Bot uses focused named Bots, tools, a shared computer, and review points. OpenClaw is an open gateway with setup and operation to consider. Codex is our live coding tool. Access varies; avoid rankings and subscription promises.'},
  {title:'What could you take off your plate?',short:'Work worth handing off',time:'2.5 min',notes:'These are candidate assignments, not universal product capabilities or quality guarantees. Review facts, financial calculations, application eligibility, and external actions. Personal example: the presenter turned literature about ADHD into an educational questionnaire his daughter could use. It was not a validated diagnostic instrument. Do not add medical scoring or clinical claims.'},
  {title:'Give the agent access to the work.',short:'Connections & computer use',time:'2 min',notes:'MCP is a common connection standard, not a database, model, or automatic permission. Not all integrations use it. Read access is different from permission to change information. Voice can make an assignment easier to express. A screenshot can explain a confusing interface, but supplies only a moment in time. Computer use and ongoing screen visibility depend on the product and environment.'},
  {title:'Better direction produces more useful work.',short:'Brief it like a colleague',time:'2 min',notes:'Describe the intended result rather than every click. Interviewing one question at a time helps surface missing context. Give an example of good work. Feedback should name the problem and the desired improvement. Voice and screenshots help express context but are not required. Open the prompt drawer for copyable examples.'},
  {title:'The first 85% is a starting point.',short:'Review & refine',time:'3 min',notes:'85% is the presenter’s rule of thumb for progress toward a deliverable, not an accuracy statistic. Important work sometimes takes several dozen exchanges; that is experience, not a required turn count. If progress stalls, change the context, task, tool, or approach. Cosmetic improvements do not establish truth: open and verify sources and recheck calculations.'},
  {title:'Delegate work. Keep judgment.',short:'When to take over',time:'2 min',notes:'Sign-ins, verification codes, CAPTCHAs, and secure environments may require human intervention. Purchases and commitments need explicit authorization and can be restricted. Polished prose may contain invented facts or faulty calculations. Missing context and unsuitable tools can make a result unusable. Start small and measure actual time saved.'},
  {title:'Find potential clients. Show the evidence.',short:'Customer discovery',time:'10 min · Live demo',notes:'Switch to the selected research tool. Use public sources. Ask for company, public evidence of possible need, relevant service, source URL, research date, and uncertainty. Signals are hypotheses of fit, not proof of buying intent. Saving to a table or database depends on the live tool; no connector is required here. No automated outreach. The fallback shows fictional table structure, not researched prospects.'},
  {title:'Describe the workflow. Build the tool. Improve it together.',short:'Expert-profile application',time:'40 min · Live demo',notes:'Switch to Codex and use voice. This combines software creation and profile creation in one demonstration. Use sample data only. Exact inputs, outputs, and workflow await CEO clarification: do not invent résumé fields or bio formats. Starting blank versus using a tested starter is the presenter’s choice. A starter is a contingency, not a settled requirement. Add the sample-app link only when it is real and ready.'},
  {title:'What would you delegate first?',short:'Questions & application',time:'20 min · Discussion',notes:'Use the overview index to revisit an idea. Ask which recurring task would be valuable, what a good result looks like, and how the team would review it. The practical outcome is one bounded assignment to try and a way to measure time saved.'},
];
export const layers = [
  ['Goal','Define the result.','A useful, reviewable expert bio.'],
  ['Instructions','Describe how to work.','Flag gaps. Do not invent experience.'],
  ['Knowledge','Supply relevant context.','Approved notes, résumé, and examples.'],
  ['Tools','Enable the right actions.','Read files. Draft a document.'],
  ['Review','Check against the brief.','Inspect evidence, gaps, and format.'],
];
export const prompts = [
  'Research five potential client companies. Use public sources. Explain the evidence of fit, link the sources, and list uncertainties. Return a table for review.',
  'Interview me one question at a time before proposing the solution.',
  'Here is an example of the quality and format I want.',
  'What information are you missing?',
  'Show your sources and separate facts from assumptions.',
  'Propose a plan and stop for review before taking external action.',
  'Check the result against the original requirements.',
];
export const categories = [
  ['Research','Prospective customers, market research, travel options, grant opportunities.'],
  ['Writing','Briefs, proposals, and grant-application drafts against supplied requirements.'],
  ['Analysis','Financial models, comparisons, spreadsheets, and decision support.'],
  ['Coordination','Calendar review, email triage, outreach preparation, and authorized sending.'],
  ['Creation','Presentations, websites, and images.'],
  ['Software','Small reusable applications and interactive questionnaires.'],
];
export const sources = [
 ['Canopy Advisory Group · brand and business','https://canopyadvisory.com/'],
 ['ChatGPT · working with files','https://learn.chatgpt.com/docs/artifacts-viewer'],
 ['ChatGPT · computer use','https://learn.chatgpt.com/docs/computer-use'],
 ['Claude · artifacts','https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them'],
 ['Grok Bot · focused Bots, tools, computer, review','https://docs.x.ai/grok-bot/get-started'],
 ['OpenClaw · open agent gateway','https://docs.openclaw.ai/'],
 ['MCP · official introduction','https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro'],
 ['Codex · OpenAI developer overview','https://developers.openai.com/'],
];
export const frames = steps.flatMap((_,step) => Array.from({length: step===2?7:step===1?3:step===7?3:1},(_,phase)=>({step,phase})));
