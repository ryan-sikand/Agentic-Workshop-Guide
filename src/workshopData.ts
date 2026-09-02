import { brandIcons, type BrandIconComponent } from './components/BrandIcons'
export type WorkshopLab = 'Automated SF Processing' | 'Agentic FOIA Redaction'

export type WorkshopSection = {
  id: string
  step?: number
  lab: WorkshopLab
  title: string
  shortTitle: string
  description: string
  duration: string
  group:
    | 'Overview'
    | 'Extract the data'
    | 'Set up the solution'
    | 'Run it by hand'
    | 'Teach the agent'
    | 'Run it again'
  brandIcon: BrandIconComponent
  searchTerms: string
}

export const workshopSections: WorkshopSection[] = [
  {
    id: 'sf-overview',
    lab: 'Automated SF Processing',
    title: 'Automated SF Processing overview',
    shortTitle: 'Lab overview',
    description: 'What this lab covers, and the account you will need.',
    duration: '3 min',
    group: 'Overview',
    brandIcon: brandIcons.overview,
    searchTerms: 'overview track requirements account credentials sign in continue with microsoft standard form sf1449 extraction model taxonomy annotate measure validation action center what you will build',
  },
  {
    id: 'du-model',
    lab: 'Automated SF Processing',
    step: 1,
    title: 'Tour the trained SF1449 model',
    shortTitle: 'DU model tour',
    description: 'See how an extraction model is trained and scored before you use one.',
    duration: '8 min',
    group: 'Extract the data',
    brandIcon: brandIcons.documentModel,
    searchTerms: 'document understanding du sf1449 taxonomy annotate continuation page document type manager measure project score model training',
  },
  {
    id: 'du-studio',
    lab: 'Automated SF Processing',
    step: 2,
    title: 'Open the model in Studio Web',
    shortTitle: 'Studio Web setup',
    description: 'Consume the deployed model version and point the automation at Shared.',
    duration: '7 min',
    group: 'Extract the data',
    brandIcon: brandIcons.studio,
    searchTerms: 'publish project version open studio web retrieve sample files download storage bucket directory backslash acknowledge shared rename',
  },
  {
    id: 'du-validation',
    lab: 'Automated SF Processing',
    step: 3,
    title: 'Assign the validation to yourself',
    shortTitle: 'Validation task',
    description: 'Wire the extraction results into an action queued under your own name.',
    duration: '8 min',
    group: 'Extract the data',
    brandIcon: brandIcons.validate,
    searchTerms: 'create validation task assign tasks task id actiondata document data disable validate activity wait resume',
  },
  {
    id: 'du-run',
    lab: 'Automated SF Processing',
    step: 4,
    title: 'Run it and validate in Action Center',
    shortTitle: 'Run and validate',
    description: 'One run extracts all four documents and queues four actions for you.',
    duration: '7 min',
    group: 'Extract the data',
    brandIcon: brandIcons.tasks,
    searchTerms: 'debug on cloud run output action center actions inbox pending unassigned submit four documents',
  },
  {
    id: 'foia-overview',
    lab: 'Agentic FOIA Redaction',
    title: 'Agentic FOIA Redaction overview',
    shortTitle: 'Lab overview',
    description: 'What the workflow does, what you will change, and the account you will need.',
    duration: '4 min',
    group: 'Overview',
    brandIcon: brandIcons.overview,
    searchTerms: 'overview track account credentials sign in continue with microsoft foia freedom of information act exemption withholding pipeline search analyze localize review redact deliver reading room sample documents documentSearchTerm file name contents what you will build',
  },
  {
    id: 'project-setup',
    lab: 'Agentic FOIA Redaction',
    step: 1,
    title: 'Create your workshop solution',
    shortTitle: 'Project setup',
    description: 'Copy the finished FOIA template into your own workspace and name it.',
    duration: '5 min',
    group: 'Set up the solution',
    brandIcon: brandIcons.create,
    searchTerms: 'studio templates agentic foia redaction workshop template v2 new solution from template rename workspace bpmn explorer',
  },
  {
    id: 'review-routing',
    lab: 'Agentic FOIA Redaction',
    step: 2,
    title: 'Route the work to yourself',
    shortTitle: 'Review routing',
    description: 'Create the assignee variable, bind both review tasks, and set the email recipients.',
    duration: '12 min',
    group: 'Set up the solution',
    brandIcon: brandIcons.tasks,
    searchTerms: 'data manager variables reviewAssignee process scope recipientEmails array start event input assignee assignment criteria user bind both review nodes tenant account personal mailbox',
  },
  {
    id: 'solution-resources',
    lab: 'Agentic FOIA Redaction',
    step: 3,
    title: 'Map the solution resources',
    shortTitle: 'Solution resources',
    description: 'Point every resource the solution declares at its live counterpart in Shared.',
    duration: '8 min',
    group: 'Set up the solution',
    brandIcon: brandIcons.tool,
    searchTerms: 'debug configuration solution resources apps storage buckets connections processes task catalogs shared deploy resources before debugging entrypoint arguments documentSearchTerm geothermal',
  },
  {
    id: 'run-one',
    lab: 'Agentic FOIA Redaction',
    step: 4,
    title: 'Run it once, the hard way',
    shortTitle: 'Run 1: Manual',
    description: 'Debug the full process and pick every statutory exemption yourself.',
    duration: '18 min',
    group: 'Run it by hand',
    brandIcon: brandIcons.process,
    searchTerms: 'debug run execution trail guidance unavailable amber banner add authority exemption dropdown b4 b5 b9 confirm redaction greyed out need authority review final redaction review approve final document',
  },
  {
    id: 'agent-context',
    lab: 'Agentic FOIA Redaction',
    step: 5,
    title: 'Give the agent its policy source',
    shortTitle: 'Attach the context',
    description: 'Attach the DOJ guidance index so the agent can cite real policy.',
    duration: '8 min',
    group: 'Teach the agent',
    brandIcon: brandIcons.schema,
    searchTerms: 'pii agent definition canvas context grounding indexes doj foia redaction guidance semantic strategy new context data fabric entities attach index resource slot',
  },
  {
    id: 'agent-classify',
    lab: 'Agentic FOIA Redaction',
    step: 6,
    title: 'Teach the agent your vocabulary',
    shortTitle: 'Finding classification',
    description: 'Use Autopilot to add a fixed category list to the system prompt.',
    duration: '12 min',
    group: 'Teach the agent',
    brandIcon: brandIcons.agent,
    searchTerms: 'autopilot open autopilot system prompt finding classification commercial deliberative personal law enforcement geological other category field rules accept reject rationale',
  },
  {
    id: 'run-two',
    lab: 'Agentic FOIA Redaction',
    step: 7,
    title: 'Run it again and see the difference',
    shortTitle: 'Run 2: Agent Proposed',
    description: 'The same document, now with clean categories, proposed codes, and citations.',
    duration: '15 min',
    group: 'Run it again',
    brandIcon: brandIcons.approved,
    searchTerms: 'hybrid detection banner clean category pills agent default statutory label policy evidence confidence approve final document email package redacted pdf inbox attachment',
  },
]

export const progressSections = workshopSections.filter(
  (section): section is WorkshopSection & { step: number } => section.step !== undefined,
)

// Look sections up by id so a card can never render another section's header.
const sectionsById = new Map(workshopSections.map((section) => [section.id, section]))

export function sectionById(id: string): WorkshopSection {
  const section = sectionsById.get(id)
  if (!section) throw new Error(`Unknown workshop section id: ${id}`)
  return section
}

// The seven stages Document Understanding gives you, in the order it runs them.
// `today` marks the two an attendee actually wires in lab 1 - the rest are drawn
// so the lab is honest about how much of the product it is not touching.
export const duPipeline: {
  stage: string
  lines: [string, string]
  today?: boolean
}[] = [
  { stage: 'Load taxonomy', lines: ['Define the fields', 'to extract'] },
  { stage: 'Digitize', lines: ['OCR the file into', 'readable text'], today: true },
  { stage: 'Classify', lines: ['Split a mixed batch', 'by document type'] },
  { stage: 'Extract', lines: ['Pull the field', 'values out'], today: true },
  { stage: 'Validate', lines: ['A person corrects', 'the results'] },
  { stage: 'Retrain', lines: ['Feed corrections', 'back into the model'] },
  { stage: 'Export', lines: ['Hand the values', 'to another system'] },
]

export const foiaPipeline: {
  stage: string
  actor: 'Automation' | 'Agent' | 'Human'
  optional?: boolean
  detail: string
}[] = [
  {
    stage: 'Search',
    actor: 'Automation',
    detail:
      'An automation searches the document repository for records matching the search term you supply.',
  },
  {
    stage: 'Analyze',
    actor: 'Agent',
    detail:
      'An agent reads each document and proposes which passages should be withheld, with a rationale for each one.',
  },
  {
    stage: 'Localize',
    actor: 'Automation',
    detail:
      'Each proposed passage is matched back to its exact position on the page, so a redaction can be placed on it.',
  },
  {
    stage: 'Review',
    actor: 'Human',
    detail:
      'A person checks every proposed finding, assigns the statutory exemption that justifies withholding it, and approves or rejects.',
  },
  {
    stage: 'Redact',
    actor: 'Automation',
    detail:
      'The approved redactions are burned into the PDF and then independently verified against the original.',
  },
  {
    stage: 'Final review',
    actor: 'Human',
    optional: true,
    detail:
      'A second look at the redacted document itself, with the option to send it back for more redactions before it leaves the building.',
  },
  {
    stage: 'Deliver',
    actor: 'Automation',
    detail: 'The redacted package is emailed to the requester, with the exemption code printed on every bar.',
  },
]

export const autopilotPrompt = `Add a section to the system prompt called Finding Classification. Require every finding to use exactly one category from this list: Commercial, Deliberative, Personal, Law Enforcement, Geological, Other. Define each briefly in FOIA terms. Require the exact label only, with no extra words - the reasoning belongs in rationale, not category.`

// Fallback for a stuck attendee, and the answer key for the instructor. This is
// what Autopilot produced from the request above, so a hand-paste and an
// accepted suggestion leave the prompt in the same state.
export const findingClassificationSection = `## Finding Classification
Every finding must carry exactly one category value, chosen from this fixed list:
- Commercial: Confidential or trade-secret-like business, financial, or proprietary information whose disclosure could cause competitive harm (aligned with FOIA Exemption 4 concerns).
- Deliberative: Pre-decisional opinions, drafts, recommendations, or internal discussions reflecting agency deliberation before a final decision (aligned with FOIA Exemption 5 concerns).
- Personal: Information whose disclosure would constitute an unwarranted invasion of personal privacy for an individual (aligned with FOIA Exemption 6/7(C) concerns).
- Law Enforcement: Information compiled for law-enforcement purposes, including investigative techniques, ongoing proceedings, or records that could interfere with enforcement activity (aligned with FOIA Exemption 7 concerns).
- Geological: Geological or geophysical information and data, including maps, concerning wells (aligned with FOIA Exemption 9 concerns).
- Other: Any sensitive finding that is supported by document text and guidance or supplemental evidence but does not fit Commercial, Deliberative, Personal, Law Enforcement, or Geological.

Category field rules:
- The category value must be exactly one of: Commercial, Deliberative, Personal, Law Enforcement, Geological, Other. Use this exact spelling and casing, with no extra words, punctuation, qualifiers, or combined labels.
- Never put reasoning, exemption codes, or explanations in category. All reasoning, justification, and nuance belongs in rationale, not category.
- Choose the single best-fitting category. If more than one could plausibly apply, pick the closest match and explain the ambiguity in rationale rather than listing multiple categories.`

// recipientEmails is Array<String>, so each element is treated as an address on
// its own. A bare display name as its own element fails the send.
export const recipientEmailsExample = `[
  "lewis.bell@uipath.com",
  "your.email@here.com"
]`

// The two identities an attendee has to keep apart. The tenant account has no
// mailbox, so it can hold an Action Center task but can never receive the email.
export const identityRows: { field: string; value: string; why: string }[] = [
  {
    field: 'reviewAssignee',
    value: 'your provisioned tenant account',
    why: 'Receives both Action Center review tasks. Has no mailbox.',
  },
  {
    field: 'recipientEmails',
    value: 'your real personal or work address',
    why: 'Receives the final email with the redacted PDF attached.',
  },
]

// Exemption families the grounded agent proposes in step 7, against the
// vocabulary the attendee authors in step 6. This mapping is the payoff.
export const categoryExemptionMap: { category: string; exemption: string }[] = [
  { category: 'Commercial', exemption: '(b)(4)' },
  { category: 'Deliberative', exemption: '(b)(5)' },
  { category: 'Personal', exemption: '(b)(6), (b)(7)(C)' },
  { category: 'Law Enforcement', exemption: '(b)(7)(A)-(F)' },
  { category: 'Geological', exemption: '(b)(9)' },
]

export const solutionResourceRows: { kind: string; resource: string }[] = [
  { kind: 'App', resource: 'pubsec-advredaction-review-v2' },
  { kind: 'Storage bucket', resource: 'DOJ FOIA Redaction Guidance Docs' },
  { kind: 'Connection', resource: 'uipathlabs@gmail.com' },
  { kind: 'Process', resource: 'FOIA Localization' },
  { kind: 'Process', resource: 'Redaction Workflow' },
  { kind: 'Process', resource: 'Search and Retrieval' },
  { kind: 'Task catalog', resource: 'FOIA Catalog' },
]

export const groups = [
  'Overview',
  'Extract the data',
  'Set up the solution',
  'Run it by hand',
  'Teach the agent',
  'Run it again',
] as const

// Two independent labs sharing one page. Each numbers its own steps from 1 and
// carries its own overview, so an attendee can do either lab on its own.
// Group names repeat across labs ('Overview'), so anything resolving a group to
// its sections must scope by lab as well - see sectionsInLabGroup.
export const workshopLabs: {
  lab: WorkshopLab
  number: number
  groups: readonly (typeof groups)[number][]
}[] = [
  { lab: 'Automated SF Processing', number: 1, groups: ['Overview', 'Extract the data'] },
  {
    lab: 'Agentic FOIA Redaction',
    number: 2,
    groups: ['Overview', 'Set up the solution', 'Run it by hand', 'Teach the agent', 'Run it again'],
  },
]

export const labNames = workshopLabs.map((entry) => entry.lab)

export function labNumber(lab: WorkshopLab) {
  return workshopLabs.find((entry) => entry.lab === lab)?.number ?? 0
}

export function sectionsInLabGroup(lab: WorkshopLab, group: (typeof groups)[number]) {
  return workshopSections.filter((section) => section.lab === lab && section.group === group)
}

// Numbered steps only - each lab's overview carries no checkbox.
export function stepsInLab(lab: WorkshopLab) {
  return progressSections.filter((section) => section.lab === lab)
}

// The overview section is the lab's front door: it renders on the home page and
// entering the lab from it opens the guided steps.
export function overviewSectionForLab(lab: WorkshopLab) {
  return workshopSections.find((section) => section.lab === lab && section.step === undefined)
}

export function durationForLab(lab: WorkshopLab) {
  const total = workshopSections
    .filter((section) => section.lab === lab)
    .reduce((sum, section) => sum + (Number.parseInt(section.duration, 10) || 0), 0)
  return Math.round(total / 5) * 5
}

// Home page cards. Each lab stands alone, so each gets its own pitch.
export const labSummaries: {
  lab: WorkshopLab
  subtitle: string
  blurb: string
}[] = [
  {
    lab: 'Automated SF Processing',
    subtitle: 'Document Understanding',
    blurb:
      'Standard forms, read by a trained extraction model. Tour how the model was taught and scored, then run it against real SF1449 forms and approve every extracted value yourself.',
  },
  {
    lab: 'Agentic FOIA Redaction',
    subtitle: 'Maestro, agents, and Action Center',
    blurb:
      'A working FOIA redaction workflow, run twice on the same document. First with an agent that cannot justify a single finding, then again once you have given it a policy source and a vocabulary.',
  },
]

export const labStages: {
  lab: WorkshopLab
  stages: { label: string; detail: string; icon: BrandIconComponent }[]
}[] = [
  {
    lab: 'Automated SF Processing',
    stages: [
      { label: 'Extract', detail: 'Pull fields off SF1449 forms', icon: brandIcons.idp },
      { label: 'Validate', detail: 'Approve every result yourself', icon: brandIcons.validate },
    ],
  },
  {
    lab: 'Agentic FOIA Redaction',
    stages: [
      { label: 'Find', detail: 'Search FOIA files', icon: brandIcons.find },
      { label: 'Analyze', detail: 'Detect PII', icon: brandIcons.agent },
      { label: 'Review', detail: 'Validate findings', icon: brandIcons.watch },
      { label: 'Redact', detail: 'Create output', icon: brandIcons.securityAudit },
    ],
  },
]
