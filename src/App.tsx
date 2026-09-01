import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock3,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Menu,
  RotateCcw,
  Search,
  Users,
  X,
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@uipath/apollo-wind/components/ui/alert'
import { Badge } from '@uipath/apollo-wind/components/ui/badge'
import { Button } from '@uipath/apollo-wind/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@uipath/apollo-wind/components/ui/card'
import { Checkbox } from '@uipath/apollo-wind/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@uipath/apollo-wind/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@uipath/apollo-wind/components/ui/dialog'
import { Input } from '@uipath/apollo-wind/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@uipath/apollo-wind/components/ui/sheet'
import { Toaster } from '@uipath/apollo-wind/components/ui/sonner'
import { CopyBlock } from './components/CopyBlock'
import { ThemeToggle } from './components/Theme'
import duWaffleDuImage from './assets/instructions/du/01-waffle-document-understanding.png'
import duProjectListImage from './assets/instructions/du/02-du-project-fms-training.png'
import duBuildImage from './assets/instructions/du/03-build-annotate-83-documents.png'
import duContinuationImage from './assets/instructions/du/04-continuation-page-fields.png'
import duTypeManagerImage from './assets/instructions/du/05-document-type-manager.png'
import duMeasureImage from './assets/instructions/du/06-measure-metrics.png'
import duVersionsImage from './assets/instructions/du/07-project-versions-open-studio-web.png'
import duRetrieveImage from './assets/instructions/du/08-retrieve-sample-files.png'
import duDownloadImage from './assets/instructions/du/09-download-sample-file-shared.png'
import duAcknowledgeImage from './assets/instructions/du/10-acknowledge-banner.png'
import duExtractValidateImage from './assets/instructions/du/11-extract-and-validate-activities.png'
import duAddTaskImage from './assets/instructions/du/12-add-create-validation-task.png'
import duDocumentDataImage from './assets/instructions/du/13-create-validation-task-document-data.png'
import duTaskIdImage from './assets/instructions/du/14-assign-tasks-task-id.png'
import duStackImage from './assets/instructions/du/15-activity-stack-no-wait.png'
import duConfiguredImage from './assets/instructions/du/16-both-activities-configured.png'
import duWaffleActionsImage from './assets/instructions/du/17-waffle-actions.png'
import duOverviewImage from './assets/instructions/du/18-action-center-overview.png'
import duInboxImage from './assets/instructions/du/19-action-center-inbox-four-tasks.png'
import duTypeMenuImage from './assets/instructions/du/20-build-document-type-menu.png'
import agentTestInputImage from './assets/instructions/agent-test-input.png'
import agentTestResourcesImage from './assets/instructions/agent-test-resources.png'
import dataManagerImage from './assets/instructions/data-manager.png'
import dataManagerInputsImage from './assets/instructions/data-manager-inputs.png'
import orchestratorPathImage from './assets/instructions/orchestrator-path.png'
import piiAgentConfigImage from './assets/instructions/pii-agent-config.png'
import processTestInputImage from './assets/instructions/process-test-input.png'
import processTestRunImage from './assets/instructions/process-test-run.png'
import projectRenameImage from './assets/instructions/project-rename.png'
import redactedDocumentImage from './assets/instructions/review-app.png'
import storageBucketImage from './assets/instructions/storage-bucket.png'
import workflowActionAppImage from './assets/instructions/workflow-action-app.png'
import workflowNameVariableImage from './assets/instructions/workflow-name-variable.png'
import { screenshotDimensions } from './assets/instructions/dimensions'
import { workshopBranding } from './branding'
import {
  agentTestInput,
  autopilotPrompt,
  piiSummaryDescription,
  progressSections,
  sectionById,
  systemPrompt,
  toolDescription,
  totalDurationMinutes,
  workflowTracks,
  workshopParts,
  workshopSections,
  type WorkshopSection,
} from './workshopData'

const PROGRESS_KEY = 'agentic-redaction-workshop-progress'

// Every card reads its own open state from here, so the section blocks below stay
// unchanged when the expand and collapse controls move around.
type SectionCollapseApi = {
  isOpen: (id: string) => boolean
  setOpen: (id: string, open: boolean) => void
}

const SectionCollapseContext = createContext<SectionCollapseApi>({
  isOpen: () => true,
  setOpen: () => {},
})

const uipathHomeUrl = 'https://www.uipath.com/'
const uipathAcademyUrl = 'https://academy.uipath.com/'
const workshopJoinUrl = 'https://uipathlabs.uipath.com/join/B6Z8ZV8J'
const workshopJoinCode = 'B6Z8ZV8J'

function BrandLockup({ compact = false }: { compact?: boolean }) {
  const customerLogo = workshopBranding.customer.logoSrc
  const customerWordmark = workshopBranding.customer.wordmark

  return (
    <div
      aria-label="Workshop branding"
      className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}
      data-testid={compact ? 'header-branding' : 'hero-branding'}
      role="group"
    >
      <img
        alt={`${workshopBranding.uipath.name} logo`}
        className={`${compact ? 'h-5' : 'h-7 sm:h-8'} uipath-wordmark w-auto`}
        src={workshopBranding.uipath.logoSrc}
      />
      <span aria-hidden="true" className={`${compact ? 'h-6' : 'h-9'} w-px bg-border`} />
      {customerLogo ? (
        <div
          className={`flex items-center justify-center rounded-md bg-white px-2 py-1 shadow-sm ring-1 ring-black/10 ${
            compact ? 'h-11 gap-1.5' : 'h-16 gap-2.5'
          }`}
        >
          <img
            alt={`${workshopBranding.customer.name} logo`}
            className="h-full w-auto max-w-full object-contain"
            src={customerLogo}
          />
          {customerWordmark ? (
            <span
              className={`customer-wordmark leading-tight text-[#0b3b8c] ${
                compact ? 'max-w-24 text-[11px]' : 'max-w-32 text-sm'
              }`}
            >
              {customerWordmark}
            </span>
          ) : null}
        </div>
      ) : (
        <div
          aria-label={`${workshopBranding.customer.placeholderLabel} placeholder`}
          className={`flex items-center justify-center rounded-md border border-dashed bg-background/80 font-medium text-muted-foreground ${
            compact ? 'h-7 min-w-24 px-2 text-[10px]' : 'h-10 min-w-32 px-3 text-xs'
          }`}
          role="img"
        >
          {workshopBranding.customer.placeholderLabel}
        </div>
      )}
    </div>
  )
}

const steps = {
  duTour: [
    'On your workshop page, select Open UiPath Environment. A new tab opens UiPath Automation Cloud, already signed in as your workshop user. If a sign-in page appears instead, choose Continue with Microsoft and use the credentials on your workshop page.',
    'You land in Orchestrator. Select the grid of nine dots in the very top left corner. That is the app switcher, usually called the waffle menu.',
    {
      text: 'In the menu, select More to expand the full product list, then select Document Understanding.',
      figure: {
        src: duWaffleDuImage,
        alt: 'Orchestrator with the waffle menu open and More expanded',
        caption: 'Document Understanding sits under More, not in the favorites row at the top.',
      },
    },
    {
      text: 'The Projects list opens. Select FMS Training. The project already exists and is shared with everyone in the workshop, so there is nothing to create.',
      figure: {
        src: duProjectListImage,
        alt: 'Document Understanding projects list showing the FMS Training project',
        caption: 'One project, FMS Training, tagged Modern, holding the SF1449 document type.',
      },
    },
    'The project opens on the Build screen. The row named SF1449 is the document type, meaning the shape of form this model was taught to read. It shows 83 documents and a green Excellent rating. Select the arrow at the left of the row to expand it and list the sample files. Dismiss any What is new popup that appears.',
    {
      text: 'Select the three-dot menu on any document row and choose Annotate. This opens the labelling view, where highlighted text is what the model was taught to pull and the right panel lists the fields it fills.',
      figure: {
        src: duBuildImage,
        alt: 'Annotation view with an SF1449 form, the document strip, and extraction fields',
        caption: 'Highlighted text on the left, the fields it feeds on the right, and a document counter at the bottom.',
      },
    },
    {
      text: 'Use the arrows beside the document counter at the bottom right to step through a few samples. Find one whose page counter at the top reads 1 / 2 and move to page 2.',
      figure: {
        src: duContinuationImage,
        alt: 'Page two of a sample document with fields extracted from the continuation sheet',
        caption: 'Page 2 of 2. Labor Categories and Rates and NOTE come only off the continuation sheet.',
      },
      note: {
        title: 'Why some fields come back empty',
        body: 'Several fields appear only on a continuation sheet. When a document has no second page those fields are intentionally blank and the model marks them missing. Expect blanks in your own run; the model is behaving correctly, not failing.',
      },
    },
    {
      text: 'Go back to Build using the breadcrumb at the top. On the SF1449 row, select the three-dot menu at the far right and choose Document type manager.',
      figure: {
        src: duTypeMenuImage,
        alt: 'Build screen with the SF1449 three-dot menu open showing Document type manager',
        caption: 'The three-dot menu on the document type row is the way into the taxonomy.',
      },
    },
    {
      text: 'This is the taxonomy: 15 fields, each with a content type such as String, Date or ID Number, and a shortcut key used while labelling. Building a model starts here, before any training happens.',
      figure: {
        src: duTypeManagerImage,
        alt: 'Document Type Manager listing field names, content types and shortcuts',
        caption: 'A field name, a content type, and a shortcut per field. Fifteen fields for SF1449.',
      },
    },
    {
      text: 'In the left menu select Measure, then open the Metrics tab. Read the project score at the left and the per-field accuracy on the right. Anything above 90 percent is healthy.',
      figure: {
        src: duMeasureImage,
        alt: 'Measure tab showing the project score and per-field accuracy',
        caption: 'Project score 97, with the number of training pages behind each field.',
      },
    },
  ],
  duStudio: [
    {
      text: 'In the left menu select Publish. The Project versions list shows two deployed versions of this model.',
      figure: {
        src: duVersionsImage,
        alt: 'Publish tab listing two deployed project versions with an Open Studio Web button',
        caption: 'Both versions are deployed. The strip at the bottom is where you leave for Studio Web.',
      },
    },
    'Do not select Create project version. Publishing a new version of the model is not part of this workshop.',
    'At the bottom of the page, in the Automate your process strip, check that the version named is Navy_FMS_DU_Workshop_v2, then select Open Studio Web. A new tab opens with a prebuilt automation called FMS Training document processing automation.',
    'Wait for the project to finish loading. Main.xaml opens in the designer and the toolbar shows Debug on cloud. Studio Web saves as you work, so you will see Saved recently beside the project name; there is no save button to press.',
    'Rename the project so you can find it again: select the project name at the top of the page and add your own name to the end of it.',
    {
      text: 'In the middle of the canvas is a stack of activities, the building blocks of the automation. Find Retrieve sample files near the top and set Orchestrator folder path to Shared using the dropdown arrow at the right of the field.',
      figure: {
        src: duRetrieveImage,
        alt: 'Retrieve sample files activity with the folder path set to Shared',
        caption: 'Retrieve sample files after the change, with Directory holding a single backslash.',
      },
    },
    'In the same activity, leave Storage bucket name as du_FMS Training_resources and check that Directory contains a single backslash. A wrong value here returns no files and the run does nothing.',
    {
      text: 'Scroll down to Download sample file, which sits inside the For each sample file loop. Its Orchestrator folder path points at your personal workspace by default, so set it to Shared as well.',
      figure: {
        src: duDownloadImage,
        alt: 'Download sample file activity inside the loop set to Shared',
        caption: 'The same fix inside the loop. This one starts out pointing at your own workspace.',
      },
    },
    {
      text: 'Scroll to Extract Document Data (SF1449). A yellow notice says the activity was updated to a new major version. Select Acknowledge to clear it, otherwise the activity keeps showing an error.',
      figure: {
        src: duAcknowledgeImage,
        alt: 'Extract Document Data activity showing a version notice with an Acknowledge button',
        caption: 'Acknowledge dismisses the version notice. Nothing else in the activity changes.',
      },
    },
  ],
  duValidation: [
    {
      text: 'Just below Extract Document Data is an activity called Validate SF1449 extraction. It is a placeholder with an empty Document Data field, so it cannot run as it stands. Right-click it and choose Disable. Remove works too if you would rather delete it.',
      figure: {
        src: duExtractValidateImage,
        alt: 'Extract Document Data configured with the validate activity selected below it',
        caption: 'Before the change: the activity directly below Extract Document Data is the one to disable.',
      },
    },
    {
      text: 'Hover in the gap just below Extract Document Data and select the small round plus button that appears. In the search box type create validation task, then choose Create Validation Task with the Document Understanding label.',
      figure: {
        src: duAddTaskImage,
        alt: 'Activity search showing Create Validation Task from Document Understanding',
        caption: 'Several results look alike. Take the plain Create Validation Task at the top, not the and Wait variants below it.',
      },
      note: {
        title: 'Avoid anything called Wait',
        body: 'Create Validation Task and Wait, and Wait for Validation Task and Resume, both hold the run open until a person answers. This build deliberately does not wait, so picking one of those changes how the rest of the step behaves.',
      },
    },
    {
      text: 'In the new activity, fill in Action title. Replace Your Name with your own name so you can find your action later among everyone else in the room.',
      copy: { label: 'Action title', value: 'Validation Extraction Results - Your Name' },
    },
    {
      text: 'Select the Document Data field, choose Variables from the small menu, then expand Extract Document Data (SF1449) and select Document data. The field fills with sF1449DocumentData.',
      figure: {
        src: duDocumentDataImage,
        alt: 'Variable picker resolving Extract Document Data document data',
        caption: 'The mapping resolves to sF1449DocumentData. The title is misspelled in this recording; use the spelling from the box above.',
      },
    },
    'Add a second activity directly below, the same way as before, and search for assign tasks. Choose Assign Tasks. Leave Assignment criteria on User and Enable multiple assignments switched off. Without this activity your action lands in a shared unassigned pile that the whole room can see.',
    {
      text: 'Select the Task Id field, open the variable picker, and drill through Created document validation task, then ActionData, then Id, then Value.',
      figure: {
        src: duTaskIdImage,
        alt: 'Assign Tasks variable picker drilled into ActionData and Id',
        caption: 'The Task Id path, with User name or email waiting directly below it.',
      },
    },
    'In User name or email, paste the username from your UiPath Labs 3.0 workshop page. It is the long address ending in onmicrosoft.com, the same one you signed in with.',
    {
      text: 'Leave Task assignment type set to Assign. Leave Write extracted data (SF1449) at the bottom exactly as it is; it prints the results into the Output panel when the run finishes.',
      figure: {
        src: duConfiguredImage,
        alt: 'Create Validation Task and Assign Tasks both configured',
        caption: 'The finished pair, with every field you have to fill visible at once.',
      },
    },
  ],
  duRun: [
    'In the toolbar at the top select Debug on cloud, then Run. The first run takes a moment while the environment starts up, so give it time before assuming something is wrong.',
    {
      text: 'Watch the Output panel on the right. Each activity turns green as it succeeds and the loop repeats for all four documents in the bucket without stopping for you.',
      figure: {
        src: duStackImage,
        alt: 'Activity stack with Assign Tasks, the disabled activity and Write extracted data',
        caption: 'Nothing in this stack waits for a person, so the run finishes on its own and leaves the actions queued.',
      },
    },
    'When the run ends, the Output panel header reads Successful and the toolbar returns to normal. The four actions now exist and are waiting for you.',
    {
      text: 'Open the waffle menu again, expand More, and select Actions. Action Center opens.',
      figure: {
        src: duWaffleActionsImage,
        alt: 'Waffle menu with More expanded and Actions highlighted',
        caption: 'Action Center is opened from the same waffle menu, under More, as Actions.',
      },
    },
    {
      text: 'On the Overview tab, check the Pending Tasks tile. Unassigned should read zero, which is proof that the automation assigned every action to you rather than leaving it for anyone to claim.',
      figure: {
        src: duOverviewImage,
        alt: 'Action Center overview with pending, completed and unassigned counts',
        caption: 'Unassigned reads zero. The pending count shown belongs to the recording; yours will be four.',
      },
    },
    {
      text: 'Select Inbox, then the Pending tab. Look for four actions carrying the title you set. If older tasks are in the way, sort by creation time so the newest are on top.',
      figure: {
        src: duInboxImage,
        alt: 'Action Center inbox with queued validation actions and the validation station open',
        caption: 'Four actions created within the last minute, with extracted fields beside the source document.',
      },
    },
    'Open the first action. The extracted values are listed on the left and the source document is displayed on the right. Compare each value against the document, correct anything the model got wrong, then select Submit.',
    'Repeat for the remaining three actions. Once all four are submitted, Part 1 is done and the extracted data has been through a human check.',
  ],
  setup: [
    'Open your workshop registration page and keep it available so you can refer back to your assigned credentials.',
    'Choose Continue with Microsoft and sign in with the username and password shown under Your Workshop Account.',
    'Confirm that the workshop environment opens successfully.',
    'Open Studio from the waffle menu.',
    'Open Templates and search for FOIA or PS Fusion FOIA Redaction Workshop Template.',
    'Open the three-dot menu and choose New solution from template.',
  ],
  agent: [
    'Open the PII Agent in the solution.',
    'Open the Properties panel using the wrench icon.',
    'Replace the System Prompt with the workshop prompt below.',
    'Use Autopilot to generate the User Prompt, then accept the change.',
  ],
  tool: [
    'Select Add Tool inside the PII Agent.',
    'Search for Get File From Storage.',
    'Choose the tool under solution_folder.',
    'Add the corrected description below in the Properties panel.',
  ],
  data: [
    'Open Data Manager using the suitcase icon.',
    'Confirm the inputs documents and additionalInstructions are present.',
    'Under Output Schema, add piiSummary as an array.',
    'Paste the description below and mark the property Required.',
  ],
  agentTest: [
    'Select Debug on the PII Agent.',
    'In Resources in solution, map every dependency to the matching resource in Shared.',
    'Paste the sample input into Entrypoint Arguments.',
    'Choose Save & Debug and inspect the JSON result.',
  ],
  workflow: [
    'Open Data Manager and create a string variable named name.',
    'Set the value to your first and last name.',
    'Select the PII Review App step in the process.',
    'Set Implementation > Action to Create action app task and choose PII Review App.',
    'Set the title to PII Review - @name using Process_1 > name.',
    'Map FilesList and WordsToRedact; map WordsToRedact to wordsToRedactList.',
  ],
  processTest: [
    'Select Debug on the process.',
    'Map every resource in the test profile to its matching Shared resource.',
    'Choose a foia_keywords value and optional additionalInstructions.',
    'Choose Save & Debug and wait for the human review task.',
  ],
  review: [
    'Open the PII Review task created with your name.',
    'Compare the proposed PII values with the source document.',
    'Remove false positives and add anything the agent missed.',
    'Submit the review to let the redaction workflow continue.',
  ],
  download: [
    'Open the Redaction Agent box in the Maestro model.',
    'In Variables, copy a filename from redactedDocsSBPath.',
    'Open Orchestrator and enter the Workshop_FOIA_Resources folder.',
    'Open Storage Buckets, then FOIA_Package_release_Folder.',
    'Search using the filename or a shortened prefix followed by * and download the result.',
  ],
}

type StepItem =
  | string
  | {
      text: string
      figure?: { src: string; alt: string; caption: string }
      note?: { title: string; body: string }
      copy?: { label: string; value: string }
    }

function Checklist({ items }: { items: StepItem[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => {
        const entry = typeof item === 'string' ? { text: item } : item
        return (
          <li className="flex min-w-0 gap-3" key={entry.text}>
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-3">
              <p className="pt-0.5 text-sm leading-6 text-muted-foreground">{entry.text}</p>
              {'copy' in entry && entry.copy ? <CopyBlock label={entry.copy.label} value={entry.copy.value} /> : null}
              {'figure' in entry && entry.figure ? <ScreenshotFigure {...entry.figure} /> : null}
              {'note' in entry && entry.note ? (
                <Alert>
                  <Circle className="h-4 w-4 fill-primary text-primary" />
                  <AlertTitle>{entry.note.title}</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">{entry.note.body}</AlertDescription>
                </Alert>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// Vite fingerprints the file name in production, so fall back to the un-hashed one.
function screenshotSize(src: string) {
  const file = src.split('/').pop()?.split('?')[0] ?? ''
  return (
    screenshotDimensions[file] ?? screenshotDimensions[file.replace(/-[A-Za-z0-9_-]{6,}\.png$/, '.png')] ?? undefined
  )
}

function ScreenshotFigure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  const size = screenshotSize(src)

  return (
    <Dialog>
      <figure className="overflow-hidden rounded-xl border bg-muted/20">
        <DialogTrigger asChild>
          <button
            aria-label={`View larger: ${alt}`}
            className="block w-full cursor-zoom-in bg-slate-950/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            type="button"
          >
            <img
              alt={alt}
              className="max-h-[38rem] w-full object-contain"
              height={size?.[1]}
              loading="lazy"
              src={src}
              width={size?.[0]}
            />
          </button>
        </DialogTrigger>
        <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs leading-5 text-muted-foreground">
          <span>{caption}</span>
          <DialogTrigger asChild>
            <button className="font-medium text-primary hover:underline" type="button">
              View larger
            </button>
          </DialogTrigger>
        </figcaption>
      </figure>
      <DialogContent
        className="max-h-[94vh] w-[96vw] max-w-[1500px] gap-3 overflow-auto p-3 sm:max-w-[1500px] sm:p-4"
      >
        <DialogHeader>
          <DialogTitle className="pr-10 text-base font-semibold leading-6">{caption}</DialogTitle>
        </DialogHeader>
        <img alt={alt} className="max-h-[80vh] w-full rounded-lg bg-slate-950/95 object-contain" src={src} />
      </DialogContent>
    </Dialog>
  )
}

function WorkshopCard({
  section,
  completed,
  onComplete,
  children,
}: {
  section: WorkshopSection
  completed?: boolean
  onComplete?: (checked: boolean) => void
  children: ReactNode
}) {
  const Icon = section.brandIcon
  const { isOpen, setOpen } = useContext(SectionCollapseContext)
  const open = isOpen(section.id)

  return (
    <section className="scroll-mt-24" id={section.id}>
      <Collapsible onOpenChange={(value) => setOpen(section.id, value)} open={open}>
        <Card className="overflow-hidden border-border/80 shadow-sm">
          <CardHeader className={`bg-muted/25 p-5 sm:p-6 ${open ? 'border-b' : ''}`}>
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
                <Icon className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  {section.part && <Badge variant="outline">{section.part}</Badge>}
                  {section.step && <Badge variant="secondary">Step {section.step}</Badge>}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" /> {section.duration}
                  </span>
                </div>
                <h2 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                  <CollapsibleTrigger asChild>
                    <button
                      className="flex w-full items-start gap-2 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      type="button"
                    >
                      <span className="min-w-0">{section.title}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? '' : '-rotate-90'}`}
                      />
                    </button>
                  </CollapsibleTrigger>
                </h2>
                <CardDescription className="mt-1.5 max-w-2xl leading-6">{section.description}</CardDescription>
              </div>
            </div>
            {section.step && onComplete && (
              <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted/50">
                <Checkbox
                  aria-label={`Mark ${section.shortTitle} complete`}
                  checked={completed}
                  onCheckedChange={(value) => onComplete(Boolean(value))}
                />
                <span>{completed ? 'Complete' : 'Mark complete'}</span>
              </label>
            )}
          </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-6 p-5 sm:p-6">
              {children}
              {section.step && onComplete && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {completed
                      ? 'Marked complete. Reopen this step any time from the navigation.'
                      : 'Done with this step? Mark it complete and it folds away.'}
                  </p>
                  <Button
                    onClick={() => onComplete(!completed)}
                    size="sm"
                    variant={completed ? 'outline' : 'default'}
                  >
                    {completed ? (
                      <>
                        <RotateCcw className="h-3.5 w-3.5" /> Mark as not complete
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" /> Mark complete
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </section>
  )
}

export default function App() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]') as string[]
      const knownIds = new Set(progressSections.map((section) => section.id))
      return new Set(stored.filter((id) => knownIds.has(id)))
    } catch {
      return new Set()
    }
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [pendingScroll, setPendingScroll] = useState<{ id: string; smooth: boolean } | null>(null)

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const visibleSections = useMemo(
    () =>
      normalizedSearch
        ? workshopSections.filter((section) =>
            `${section.title} ${section.description} ${section.searchTerms}`.toLowerCase().includes(normalizedSearch),
          )
        : workshopSections,
    [normalizedSearch],
  )

  const collapseApi = useMemo<SectionCollapseApi>(
    () => ({
      isOpen: (id) => !collapsedSections.has(id),
      setOpen: (id, open) =>
        setCollapsedSections((current) => {
          const next = new Set(current)
          if (open) next.delete(id)
          else next.add(id)
          return next
        }),
    }),
    [collapsedSections],
  )
  const allExpanded = collapsedSections.size === 0

  function toggleAllSections() {
    setCollapsedSections(allExpanded ? new Set(workshopSections.map((section) => section.id)) : new Set())
  }

  const visibleIds = useMemo(() => new Set(visibleSections.map((section) => section.id)), [visibleSections])
  const completeCount = completed.size
  const progress = Math.round((completeCount / progressSections.length) * 100)

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]))
  }, [completed])

  useEffect(() => {
    if (normalizedSearch) setCollapsedSections(new Set())
  }, [normalizedSearch])

  useEffect(() => {
    if (!pendingScroll) return
    const element = document.getElementById(pendingScroll.id)
    setPendingScroll(null)
    if (!element) return
    // Runs after the commit that expanded, collapsed or unfiltered the target, so
    // the measurement is taken against the layout the reader will actually see.
    // Sidebar shortcuts glide. Completing a step snaps instead, because that move
    // follows a collapse and an animated slide there reads as a tour of the page.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const glide = pendingScroll.smooth && !reduceMotion
    const from = window.scrollY
    const top = element.getBoundingClientRect().top + from - 76
    window.scrollTo({ behavior: glide ? 'smooth' : 'instant', top })

    // Some environments drop animated scrolls entirely. If nothing has moved by the
    // time the glide should have started, land it anyway so a shortcut never no-ops.
    if (glide && Math.abs(top - from) > 2) {
      window.setTimeout(() => {
        if (Math.abs(window.scrollY - from) < 2) window.scrollTo({ behavior: 'instant', top })
      }, 250)
    }
  }, [pendingScroll])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0.01 },
    )

    visibleSections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [visibleSections])

  function toggleComplete(id: string, checked: boolean) {
    setCompleted((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })

    // Completing a step folds it away; unmarking one opens it back up to work on.
    setCollapsedSections((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })

    // Collapsing a tall step would strand the reader thousands of pixels below it,
    // so jump back to its header. It has to be this section rather than the next
    // one: the collapse animates, so anything below it is still moving when this
    // runs, while a section's own offset never shifts as it closes.
    if (checked) setPendingScroll({ id, smooth: false })
  }

  function navigateTo(id: string) {
    setMobileNavOpen(false)
    // The sidebar lists every step, but a search filters the page. Clear it, or the
    // shortcut points at a card that is not currently rendered and nothing happens.
    if (!visibleIds.has(id)) setSearchTerm('')
    setCollapsedSections((current) => {
      if (!current.has(id)) return current
      const next = new Set(current)
      next.delete(id)
      return next
    })
    setPendingScroll({ id, smooth: true })
  }

  function resetProgress() {
    setCompleted(new Set())
  }

  const nav = (
    <nav aria-label="Workshop steps" className="space-y-6">
      {workshopParts.map((part) => (
        <div className="space-y-4" key={part.title ?? 'start'}>
          {part.title && (
            <p className="flex items-center gap-2 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground">
              {part.title}
            </p>
          )}
          {part.groups.map((group) => {
            const sections = workshopSections.filter((section) => section.group === group)
            return (
              <div key={group}>
                <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group}
                </p>
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.brandIcon
                const isDone = completed.has(section.id)
                return (
                  <button
                    aria-current={activeSection === section.id ? 'location' : undefined}
                    className={`flex w-full min-w-0 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    key={section.id}
                    onClick={() => navigateTo(section.id)}
                    type="button"
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Icon className="h-5 w-5 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate" title={section.shortTitle}>
                      {section.step ? `${section.step}. ${section.shortTitle}` : section.shortTitle}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </button>
                )
              })}
            </div>
              </div>
            )
          })}
        </div>
      ))}
    </nav>
  )

  return (
    <SectionCollapseContext.Provider value={collapseApi}>
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <Button
            aria-label="Open workshop navigation"
            className="lg:hidden"
            onClick={() => setMobileNavOpen(true)}
            size="icon"
            variant="ghost"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden xl:block">
            <BrandLockup compact />
          </div>
          <span aria-hidden="true" className="hidden h-8 w-px bg-border xl:block" />
          <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => navigateTo('overview')} type="button">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Agentic Redaction Workshop</p>
              <p className="hidden truncate text-xs text-muted-foreground sm:block">Guided, hands-on build</p>
            </div>
          </button>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <div className="hidden w-60 lg:block">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  aria-label="Search workshop"
                  className="pl-9"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search workshop"
                  value={searchTerm}
                />
              </div>
            </div>
            <Badge className="hidden sm:inline-flex" variant="outline">
              {completeCount}/{progressSections.length} complete
            </Badge>
            <ThemeToggle />
            <Button asChild className="hidden xl:inline-flex" size="sm" variant="outline">
              <a href={uipathAcademyUrl} rel="noreferrer" target="_blank">
                <GraduationCap className="h-3.5 w-3.5" /> UiPath Academy
              </a>
            </Button>
            <Button asChild className="hidden md:inline-flex" size="sm">
              <a href={uipathHomeUrl} rel="noreferrer" target="_blank">
                Open UiPath <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="h-0.5 bg-muted">
          <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <Sheet onOpenChange={setMobileNavOpen} open={mobileNavOpen}>
        <SheetContent className="w-[88vw] max-w-sm overflow-y-auto p-0" side="left">
          <SheetHeader className="border-b p-5 text-left">
            <SheetTitle>Workshop navigation</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search workshop navigation"
                className="pl-9"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search workshop"
                value={searchTerm}
              />
            </div>
            <Button className="mb-5 w-full" onClick={toggleAllSections} size="sm" variant="outline">
              {allExpanded ? 'Collapse all steps' : 'Expand all steps'}
            </Button>
            {nav}
          </div>
        </SheetContent>
      </Sheet>

      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="sticky top-[66px] hidden h-[calc(100vh-66px)] overflow-y-auto border-r p-5 lg:block">
          <div className="mb-6 rounded-xl border bg-muted/30 p-4">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium">
              <span>Workshop progress</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Your progress is saved in this browser.
            </p>
          </div>
          <Button className="mb-5 w-full" onClick={toggleAllSections} size="sm" variant="outline">
            {allExpanded ? (
              <>
                <ChevronRight className="h-3.5 w-3.5" /> Collapse all steps
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" /> Expand all steps
              </>
            )}
          </Button>
          {nav}
          {completeCount > 0 && (
            <Button className="mt-6 w-full" onClick={resetProgress} size="sm" variant="ghost">
              <RotateCcw className="h-3.5 w-3.5" /> Reset progress
            </Button>
          )}
        </aside>

        <main className="min-w-0">
          <div className="workshop-grid border-b">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <BrandLockup />
                </div>
                <Badge className="mb-5" variant="secondary">
                  UiPath Agentic Automation · Hands-on Workshop
                </Badge>
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Learn Document Understanding, then build a redaction workflow
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                  Two separate exercises. Part 1 is an introduction to Document Understanding: see how a model is built,
                  then run one against sample forms and check the results yourself. Part 2 is its own build, a FOIA redaction
                  workflow using Maestro, agents, Document Understanding and Action Center. No UiPath experience needed.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button onClick={() => navigateTo(completed.size ? progressSections.find((item) => !completed.has(item.id))?.id ?? 'download' : 'du-model')} size="lg">
                    {completed.size ? 'Resume workshop' : 'Start workshop'} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  [`${progressSections.length} guided steps`, 'Clear checkpoints from setup to download'],
                  [`About ${totalDurationMinutes} minutes`, 'Work at your pace; progress is saved'],
                  ['Human in the loop', 'You approve every extraction and every redaction'],
                ].map(([title, description]) => (
                  <div className="rounded-xl border bg-background/90 p-4 shadow-sm backdrop-blur" key={title}>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="relative lg:hidden">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search workshop content"
                className="pl-9 pr-10"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search steps, prompts, and settings"
                value={searchTerm}
              />
              {searchTerm && (
                <Button
                  aria-label="Clear search"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchTerm('')}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {normalizedSearch && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-muted/25 px-4 py-3">
                <p className="text-sm">
                  Showing <strong>{visibleSections.length}</strong> result{visibleSections.length === 1 ? '' : 's'} for “{searchTerm}”
                </p>
                <Button onClick={() => setSearchTerm('')} size="sm" variant="ghost">
                  Clear search
                </Button>
              </div>
            )}

            {visibleIds.has('overview') && (
              <WorkshopCard section={sectionById('overview')}>
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Before you begin</AlertTitle>
                  <AlertDescription className="mt-3 space-y-4 leading-6">
                    <p>
                      Register for the workshop to receive the UiPath username and password assigned to you.
                    </p>
                    <ol className="space-y-3">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">1</span>
                        <span>
                          Open the registration page, enter your name, and use workshop code <strong>{workshopJoinCode}</strong> if prompted.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">2</span>
                        <span>
                          On your workshop page, save or bookmark the page so you can return to your assigned credentials. Then select <strong>Open UiPath Environment</strong>.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">3</span>
                        <span>
                          When the UiPath sign-in page opens, choose <strong>Continue with Microsoft</strong>. Sign in with the username and password displayed under <strong>Your Workshop Account</strong> on the previous page.
                        </span>
                      </li>
                    </ol>
                    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-background/70 p-3">
                      <Button asChild size="sm">
                        <a href={workshopJoinUrl} rel="noreferrer" target="_blank">
                          Join the workshop <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Workshop code: <strong className="text-foreground">{workshopJoinCode}</strong>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      During the exercises, use resources under the <strong className="text-foreground">Shared</strong> folder whenever a debug profile asks you to resolve dependencies.
                    </p>
                  </AlertDescription>
                </Alert>
                <div>
                  <h3 className="mb-4 font-semibold">What you will build</h3>
                  <div className="space-y-5">
                    {workflowTracks.map((track) => (
                      <div key={track.part}>
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {track.part}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {track.stages.map(({ label, detail, icon: Icon }, index) => (
                            <div className="relative rounded-xl border bg-muted/20 p-4" key={label}>
                              <div className="mb-3 flex items-center justify-between">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                  <Icon className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                              </div>
                              <p className="font-semibold">{label}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </WorkshopCard>
            )}

            {visibleIds.has('du-model') && (
              <WorkshopCard
                completed={completed.has('du-model')}
                onComplete={(checked) => toggleComplete('du-model', checked)}
                section={sectionById('du-model')}
              >
                <Checklist items={steps.duTour} />
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Nobody trains a model today</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Building a model means naming the fields you want, letting it make a first pass of predictions, and
                    correcting what it got wrong until the scores come up. Training takes longer than this workshop allows, so
                    FMS Training has already been through that across 83 documents. Part 1 is about reading a trained model and
                    then using it, not producing one.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('du-studio') && (
              <WorkshopCard
                completed={completed.has('du-studio')}
                onComplete={(checked) => toggleComplete('du-studio', checked)}
                section={sectionById('du-studio')}
              >
                <Checklist items={steps.duStudio} />
                <div>
                  <h3 className="mb-3 font-semibold">Every value you set in this step</h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ['Orchestrator folder path', 'Shared'],
                      ['Storage bucket name', 'du_FMS Training_resources'],
                      ['Directory', '\\'],
                      ['DU project', 'FMS Training'],
                      ['Version', 'Navy_FMS_DU_Workshop_v2'],
                      ['Document type', 'SF1449'],
                    ].map(([label, value]) => (
                      <div className="min-w-0 rounded-xl border bg-muted/25 p-4" key={label}>
                        <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                        <p className="mt-2 break-words font-mono text-sm font-semibold" title={value}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    The last three are already filled in for you. Check them rather than change them.
                  </p>
                </div>
              </WorkshopCard>
            )}

            {visibleIds.has('du-validation') && (
              <WorkshopCard
                completed={completed.has('du-validation')}
                onComplete={(checked) => toggleComplete('du-validation', checked)}
                section={sectionById('du-validation')}
              >
                <Checklist items={steps.duValidation} />
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertTitle>No wait activity, and that is the point</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    This automation finishes on its own and leaves the actions queued for a person. Later in the workshop the
                    redaction process does the opposite: it waits for its reviewer before releasing the document. Same human
                    checkpoint, two different couplings, and you will have built both by the end.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('du-run') && (
              <WorkshopCard
                completed={completed.has('du-run')}
                onComplete={(checked) => toggleComplete('du-run', checked)}
                section={sectionById('du-run')}
              >
                <Checklist items={steps.duRun} />
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>That is Part 1</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Extracted values like these can be written to variables, pushed into Excel, or handed to another
                    automation. Part 2 starts fresh with a different build: a FOIA redaction workflow that puts Maestro,
                    agents, Document Understanding and Action Center together.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('project-setup') && (
              <WorkshopCard
                completed={completed.has('project-setup')}
                onComplete={(checked) => toggleComplete('project-setup', checked)}
                section={sectionById('project-setup')}
              >
                <Checklist items={steps.setup} />
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Rename your copy</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Right-click the solution name and rename it to <strong>YourName - FOIA Workflow</strong>. Later, find it from Studio → Workspaces by searching your name.
                  </AlertDescription>
                </Alert>
                <ScreenshotFigure
                  alt="Studio project menu with Rename highlighted"
                  caption="Rename the solution from the project menu so your copy is easy to find later."
                  src={projectRenameImage}
                />
              </WorkshopCard>
            )}

            {visibleIds.has('pii-agent') && (
              <WorkshopCard
                completed={completed.has('pii-agent')}
                onComplete={(checked) => toggleComplete('pii-agent', checked)}
                section={sectionById('pii-agent')}
              >
                <Checklist items={steps.agent} />
                <ScreenshotFigure
                  alt="PII Agent configuration with the system prompt and Autopilot open"
                  caption="The PII Agent form shows the system prompt in the center and Autopilot on the right."
                  src={piiAgentConfigImage}
                />
                <CopyBlock label="PII Agent system prompt" maxHeight="max-h-[34rem]" value={systemPrompt} />
                <CopyBlock label="Autopilot request for the user prompt" value={autopilotPrompt} />
                <Alert>
                  <Circle className="h-4 w-4 fill-primary text-primary" />
                  <AlertTitle>Delimiter matters</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Keep PII values pipe-delimited with <code>|</code>. Addresses and dates can contain commas, so commas will corrupt the redaction list.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('tools') && (
              <WorkshopCard
                completed={completed.has('tools')}
                onComplete={(checked) => toggleComplete('tools', checked)}
                section={sectionById('tools')}
              >
                <Checklist items={steps.tool} />
                <CopyBlock label="Tool description" value={toolDescription} />
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Use the direct text path</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    The current workshop agent reads <code>result.out_pdfTxt</code> directly. Do not add a second Analyze Files call or map an <code>out_jobId</code>; that older path conflicts with the system prompt.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('data-manager') && (
              <WorkshopCard
                completed={completed.has('data-manager')}
                onComplete={(checked) => toggleComplete('data-manager', checked)}
                section={sectionById('data-manager')}
              >
                <Checklist items={steps.data} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <ScreenshotFigure
                    alt="Data Manager inputs showing documents and additionalInstructions"
                    caption="Confirm both workshop inputs are available."
                    src={dataManagerInputsImage}
                  />
                  <ScreenshotFigure
                    alt="Data Manager output configuration for piiSummary"
                    caption="Configure piiSummary as a required array output."
                    src={dataManagerImage}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['Name', 'piiSummary'],
                    ['Type', 'Array'],
                    ['Required', 'Yes'],
                  ].map(([label, value]) => (
                    <div className="rounded-xl border bg-muted/25 p-4" key={label}>
                      <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                      <p className="mt-2 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyBlock label="piiSummary description" value={piiSummaryDescription} />
              </WorkshopCard>
            )}

            {visibleIds.has('test-agent') && (
              <WorkshopCard
                completed={completed.has('test-agent')}
                onComplete={(checked) => toggleComplete('test-agent', checked)}
                section={sectionById('test-agent')}
              >
                <Checklist items={steps.agentTest} />
                <div className="grid gap-4">
                  <ScreenshotFigure
                    alt="Agent debug profile with solution resources mapped from Shared"
                    caption="Map each solution dependency to its matching resource in Shared."
                    src={agentTestResourcesImage}
                  />
                  <ScreenshotFigure
                    alt="Agent debug entrypoint arguments containing the sample JSON input"
                    caption="Paste the sample JSON into Entrypoint arguments before running the agent."
                    src={agentTestInputImage}
                  />
                </div>
                <CopyBlock label="Agent debug input" language="json" value={agentTestInput} />
                <div className="rounded-xl border bg-muted/25 p-4">
                  <p className="font-semibold">Healthy debug output</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Confirm the response is valid JSON and includes documentWithPIIFindings, piiSummary, totalPiiFound, wordsToRedactList, and fileList. Each wordsToRedactList item should align with its file by index.
                  </p>
                </div>
              </WorkshopCard>
            )}

            {visibleIds.has('workflow') && (
              <WorkshopCard
                completed={completed.has('workflow')}
                onComplete={(checked) => toggleComplete('workflow', checked)}
                section={sectionById('workflow')}
              >
                <Checklist items={steps.workflow} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <ScreenshotFigure
                    alt="Edit variable dialog for the name workflow variable"
                    caption="Create the name variable and set its value to your name."
                    src={workflowNameVariableImage}
                  />
                  <ScreenshotFigure
                    alt="PII Review App task configuration and input mappings"
                    caption="Select the Action App, set the task title, and map both inputs."
                    src={workflowActionAppImage}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ['Task title', 'PII Review - @name'],
                    ['FilesList', 'Map the file list output'],
                    ['WordsToRedact', 'wordsToRedactList'],
                  ].map(([label, value]) => (
                    <div className="min-w-0 rounded-xl border bg-muted/25 p-4" key={label}>
                      <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                      <p className="mt-2 break-words font-semibold" title={value}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertTitle>Why the name variable matters</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    It makes your Action Center task easy to find when multiple workshop participants run the same process.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('test-process') && (
              <WorkshopCard
                completed={completed.has('test-process')}
                onComplete={(checked) => toggleComplete('test-process', checked)}
                section={sectionById('test-process')}
              >
                <Checklist items={steps.processTest} />
                <ScreenshotFigure
                  alt="Process debug entrypoint arguments with FOIA keywords"
                  caption="Enter a search term and optional additional instructions for the end-to-end run."
                  src={processTestInputImage}
                />
                <div>
                  <h3 className="mb-3 font-semibold">Suggested search terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Dupree · 1 result', 'USPS · 1 result', 'FBI · 3 results', 'HHS · 5 results'].map((term) => (
                      <Badge key={term} variant="outline">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CopyBlock label="Example additional instructions" value="also redact any medications." />
              </WorkshopCard>
            )}

            {visibleIds.has('review') && (
              <WorkshopCard
                completed={completed.has('review')}
                onComplete={(checked) => toggleComplete('review', checked)}
                section={sectionById('review')}
              >
                <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                      <Badge className="mb-3" variant="secondary">Human-in-the-loop checkpoint</Badge>
                      <h3 className="text-xl font-semibold">The agent proposes. A person decides.</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        FOIA redaction can affect legal disclosure. The review task keeps the final decision with a human before the document is produced.
                      </p>
                    </div>
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border bg-background text-primary shadow-sm">
                      <Users className="h-9 w-9" />
                    </div>
                  </div>
                </div>
                <Checklist items={steps.review} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <ScreenshotFigure
                    alt="Document Redaction review task with proposed words to redact"
                    caption="Review the proposed values against the source document before submitting."
                    src={processTestRunImage}
                  />
                  <ScreenshotFigure
                    alt="Example FOIA document after PII redaction"
                    caption="Example of a completed document with the selected PII removed."
                    src={redactedDocumentImage}
                  />
                </div>
              </WorkshopCard>
            )}

            {visibleIds.has('download') && (
              <WorkshopCard
                completed={completed.has('download')}
                onComplete={(checked) => toggleComplete('download', checked)}
                section={sectionById('download')}
              >
                <Checklist items={steps.download} />
                <div className="grid gap-4">
                  <ScreenshotFigure
                    alt="Redaction Agent output containing redactedDocsSBPath filenames"
                    caption="Copy a filename from redactedDocsSBPath after the process completes."
                    src={orchestratorPathImage}
                  />
                  <ScreenshotFigure
                    alt="Orchestrator Storage Buckets page in the Workshop FOIA Resources folder"
                    caption="Open FOIA_Package_release_Folder from the workshop resources folder."
                    src={storageBucketImage}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="min-w-0 rounded-xl border bg-muted/25 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Storage bucket</p>
                    <p className="mt-2 break-words font-semibold">FOIA_Package_release_Folder</p>
                  </div>
                  <div className="min-w-0 rounded-xl border bg-muted/25 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Wildcard example</p>
                    <p className="mt-2 break-all font-mono text-sm font-semibold">REDACTED_db66e7c6-f738-4a86-8d5c-bdb6e9ece2ea*</p>
                  </div>
                </div>
                {progress >= 100 && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Workshop complete</AlertTitle>
                    <AlertDescription className="mt-1 leading-6">
                      You have configured the agent, connected human review, run the process, and retrieved the final redacted document.
                    </AlertDescription>
                  </Alert>
                )}
              </WorkshopCard>
            )}

            {visibleSections.length === 0 && (
              <Card className="border-dashed py-10 text-center">
                <CardContent>
                  <Search className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h2 className="mt-4 text-lg font-semibold">No workshop steps found</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Try a term like “prompt,” “debug,” “workflow,” or “download.”</p>
                  <Button className="mt-5" onClick={() => setSearchTerm('')} variant="outline">
                    Clear search
                  </Button>
                </CardContent>
              </Card>
            )}

            <footer className="flex flex-col gap-3 border-t py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-foreground/80">{workshopBranding.creditLine}</p>
                <p className="mt-1">Agentic Redaction Workshop · Guided participant experience</p>
              </div>
              <Button asChild size="sm" variant="ghost">
                <a href={uipathHomeUrl} rel="noreferrer" target="_blank">
                  Open UiPath <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </footer>
          </div>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
    </SectionCollapseContext.Provider>
  )
}
