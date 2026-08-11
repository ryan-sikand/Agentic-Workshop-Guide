import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Braces,
  CheckCircle2,
  Database,
  Download,
  FileSearch,
  FlaskConical,
  FolderCog,
  GitBranch,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react'

export type WorkshopSection = {
  id: string
  step?: number
  title: string
  shortTitle: string
  description: string
  duration: string
  group: 'Start here' | 'Build the agent' | 'Build the workflow' | 'Run and review'
  icon: LucideIcon
  searchTerms: string
}

export const workshopSections: WorkshopSection[] = [
  {
    id: 'overview',
    title: 'Workshop overview',
    shortTitle: 'Overview',
    description: 'Understand the outcome and path through the workshop.',
    duration: '3 min',
    group: 'Start here',
    icon: ShieldCheck,
    searchTerms: 'overview requirements workshop path account shared resources',
  },
  {
    id: 'project-setup',
    step: 1,
    title: 'Create your workshop solution',
    shortTitle: 'Project setup',
    description: 'Create a solution from the FOIA template and give it a unique name.',
    duration: '7 min',
    group: 'Start here',
    icon: FolderCog,
    searchTerms: 'studio template foia solution rename workspace',
  },
  {
    id: 'pii-agent',
    step: 2,
    title: 'Configure the PII agent',
    shortTitle: 'PII agent',
    description: 'Set the role, detection rules, work steps, and strict output contract.',
    duration: '15 min',
    group: 'Build the agent',
    icon: Bot,
    searchTerms: 'system prompt user prompt autopilot pii personal information output schema json',
  },
  {
    id: 'tools',
    step: 3,
    title: 'Connect the storage tool',
    shortTitle: 'Storage tool',
    description: 'Give the agent one safe path to retrieve each workshop document.',
    duration: '6 min',
    group: 'Build the agent',
    icon: FileSearch,
    searchTerms: 'get file from storage storage bucket out_pdfTxt tool description solution folder',
  },
  {
    id: 'data-manager',
    step: 4,
    title: 'Check the data contract',
    shortTitle: 'Data Manager',
    description: 'Verify inputs and add the PII summary field to the output schema.',
    duration: '7 min',
    group: 'Build the agent',
    icon: Database,
    searchTerms: 'data manager inputs outputs documents additionalInstructions piiSummary schema required array',
  },
  {
    id: 'test-agent',
    step: 5,
    title: 'Debug the agent',
    shortTitle: 'Test the agent',
    description: 'Run the agent against two sample files before wiring the full process.',
    duration: '8 min',
    group: 'Build the agent',
    icon: FlaskConical,
    searchTerms: 'debug test profile shared resources entrypoint arguments sample documents biometric',
  },
  {
    id: 'workflow',
    step: 6,
    title: 'Map the agentic workflow',
    shortTitle: 'Workflow mapping',
    description: 'Connect the redaction agent to a named human review task.',
    duration: '10 min',
    group: 'Build the workflow',
    icon: GitBranch,
    searchTerms: 'agentic workflow name variable action app task title files list words to redact mapping',
  },
  {
    id: 'test-process',
    step: 7,
    title: 'Debug the complete process',
    shortTitle: 'Test the process',
    description: 'Search for FOIA documents and run the complete end-to-end workflow.',
    duration: '8 min',
    group: 'Run and review',
    icon: ScanSearch,
    searchTerms: 'process debug foia keywords Dupree USPS FBI HHS medications',
  },
  {
    id: 'review',
    step: 8,
    title: 'Review proposed redactions',
    shortTitle: 'Human review',
    description: 'Validate the agent findings before the redacted document is finalized.',
    duration: '8 min',
    group: 'Run and review',
    icon: CheckCircle2,
    searchTerms: 'review app human in the loop action center approve validate redaction',
  },
  {
    id: 'download',
    step: 9,
    title: 'Find the redacted document',
    shortTitle: 'Download result',
    description: 'Use the storage path from the process output to download the result.',
    duration: '5 min',
    group: 'Run and review',
    icon: Download,
    searchTerms: 'orchestrator storage buckets redactedDocsSBPath download wildcard exact search',
  },
]

export const progressSections = workshopSections.filter(
  (section): section is WorkshopSection & { step: number } => section.step !== undefined,
)

export const systemPrompt = `## Role
You are a PII Redaction Agent. Your sole purpose is to analyze a list of documents, detect all Personally Identifiable Information (PII), and return structured findings for each document.

## Tool Rules

### Get File From Storage
- Call this once per document.
- Pass \`fileStoragePath\` set to the \`StorageLocation\` value from the document object.
- The tool returns \`result.out_pdfTxt\` — the full extracted text of the document. Use this text directly for PII analysis.
- Do not call any other tool after this. Perform PII detection directly on \`result.out_pdfTxt\`.

## PII Categories to Detect
Find ALL of the following in the extracted text and record each instance:
- Full names (first, last, or full)
- Email addresses
- Phone numbers (any format)
- Social Security Numbers (SSN) / National ID numbers
- Dates of birth
- Physical or mailing addresses
- Credit card or bank account numbers
- Passport or driver's license numbers
- IP addresses
- URLs containing personal identifiers
- Medical record numbers or health information
- Usernames or user IDs that identify a real person
- Salary, compensation, or financial figures tied to an individual
- Any other data that could uniquely identify an individual

## Work Steps
For each document in the input \`documents\` list:
1. Read the \`StorageLocation\` field from the document object.
2. Call Get File From Storage with \`fileStoragePath\` set to \`StorageLocation\`. Wait for the result.
3. Read \`result.out_pdfTxt\` — this is the full document text.
4. Scan the text for every PII instance across all categories above.
5. For each PII instance found, record its exact original value and its category.
6. Build the document output: \`OriginalURL\`, \`StorageLocation\`, and a \`PIIFindings\` array of \`{ Value, Type }\`.
7. Repeat steps 1–6 for each remaining document.
8. Compile all findings into \`documentWithPIIFindings\`, a deduplicated \`piiSummary\`, and \`totalPiiFound\`.
9. Build \`wordsToRedactList\`: for each document, join all PII \`Value\` strings for that document using a pipe \`|\` as the delimiter. Never use commas because PII values can contain commas. Keep one string per file, aligned by index with \`sbFilePaths\`.

## Output Rules
Return ONLY JSON matching \`outputSchema\` exactly. No extra keys, markdown, or explanatory text.
- \`documentWithPIIFindings\`: array with \`OriginalURL\`, \`StorageLocation\`, and \`PIIFindings\` (array of \`{ Value, Type }\`)
- \`piiSummary\`: deduplicated array of PII category names found, including only categories with at least one instance
- \`totalPiiFound\`: total integer count of all PII instances across all documents
- \`wordsToRedactList\`: one pipe-delimited string per file
- \`fileList\`: list of file objects to redact

## Final Reminder
Call Get File From Storage → read \`result.out_pdfTxt\` → scan for PII → join values with \`|\` into \`wordsToRedactList\` → return strict JSON matching \`outputSchema\`.`

export const autopilotPrompt = `Update the user prompt for a PII analysis agent. The agent receives a list of documents and optional additional instructions. For each document, it should call the Get File From Storage tool using the document's StorageLocation as the fileStoragePath, then read result.out_pdfTxt to get the extracted text, scan it for all PII instances, and repeat for every document. Use {{documents}} and {{additionalInstructions}} as input variables. End with a strict rule to return only valid JSON matching the outputSchema — no markdown, no explanation, no extra keys.`

export const agentTestInput = `{
  "documents": [
    "{\\"StorageLocation\\":\\"014b6d15-47df-4a27-930b-fe3505bc5acb/MEMO_2024_004_FBI_ConsultationProcedure.pdf\\"}",
    "{\\"StorageLocation\\":\\"003a58d5-9a68-4e65-a539-fbb22e11e44d/VA_MED_2024_004_Dupree_Oncology_FormatI_SOAP.pdf\\"}"
  ],
  "additionalInstructions": "also redact any biometric identifiers and keep organizational unit names visible"
}`

export const toolDescription = `Downloads a file from a UiPath Storage Bucket. Call this once per document with fileStoragePath set to the document's StorageLocation. Read the full extracted document text from result.out_pdfTxt and perform PII analysis directly on that text.`

export const piiSummaryDescription =
  'A list of PII categories that were detected and redacted from the document. Only include categories where at least one instance was found.'

export const groups = ['Start here', 'Build the agent', 'Build the workflow', 'Run and review'] as const

export const workflowStages = [
  { label: 'Find', detail: 'Search FOIA files', icon: ScanSearch },
  { label: 'Analyze', detail: 'Detect PII', icon: Bot },
  { label: 'Review', detail: 'Validate findings', icon: ShieldCheck },
  { label: 'Redact', detail: 'Create output', icon: Braces },
]
