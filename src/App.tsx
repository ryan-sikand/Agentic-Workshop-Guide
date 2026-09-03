import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Circle,
  Clock3,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
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
import foiaTemplateImage from './assets/instructions/foia/01-template-search.png'
import foiaRenameImage from './assets/instructions/foia/02-solution-rename.png'
import foiaRenamedImage from './assets/instructions/foia/03-solution-renamed.png'
import foiaRecipientsImage from './assets/instructions/foia/04-recipient-emails.png'
import foiaAddVarImage from './assets/instructions/foia/05-add-variable.png'
import foiaAssigneeVarImage from './assets/instructions/foia/06-review-assignee-variable.png'
import foiaReviewNodeImage from './assets/instructions/foia/07-initial-review-node.png'
import foiaUseVariablesImage from './assets/instructions/foia/08-assignee-use-variables.png'
import foiaPickVariableImage from './assets/instructions/foia/09-assignee-pick-variable.png'
import foiaAssigneeBoundImage from './assets/instructions/foia/10-assignee-bound.png'
import foiaFinalBoundImage from './assets/instructions/foia/11-final-review-bound.png'
import foiaDebugButtonImage from './assets/instructions/foia/12-debug-button.png'
import foiaResourcesMapImage from './assets/instructions/foia/13-solution-resources-mapping.png'
import foiaResourcesDoneImage from './assets/instructions/foia/14-solution-resources-complete.png'
import foiaEntrypointImage from './assets/instructions/foia/15-entrypoint-arguments.png'
import foiaFirstRunImage from './assets/instructions/foia/16-first-debug-run.png'
import foiaInitialReviewImage from './assets/instructions/foia/17-initial-review-guidance-unavailable.png'
import foiaAuthorityImage from './assets/instructions/foia/18-add-authority-dropdown.png'
import foiaConfirmImage from './assets/instructions/foia/19-confirm-redaction.png'
import foiaContinuesImage from './assets/instructions/foia/20-debug-continues.png'
import foiaFinalRunOneImage from './assets/instructions/foia/21-final-review-run-one.png'
import foiaRunOneDoneImage from './assets/instructions/foia/22-first-run-complete.png'
import foiaAgentDefImage from './assets/instructions/foia/23-pii-agent-definition.png'
import foiaNewContextImage from './assets/instructions/foia/24-new-context.png'
import foiaPickIndexImage from './assets/instructions/foia/25-pick-guidance-index.png'
import foiaContextDoneImage from './assets/instructions/foia/26-context-attached.png'
import foiaOpenAutopilotImage from './assets/instructions/foia/27-open-autopilot.png'
import foiaAutopilotAskImage from './assets/instructions/foia/28-autopilot-request.png'
import foiaAutopilotAcceptImage from './assets/instructions/foia/29-autopilot-accept.png'
import foiaClassificationImage from './assets/instructions/foia/30-finding-classification-section.png'
import foiaCleanPillsImage from './assets/instructions/foia/31-clean-categories-with-authority.png'
import foiaHybridImage from './assets/instructions/foia/32-final-review-hybrid-detection.png'
import foiaEmailImage from './assets/instructions/foia/33-emailed-package.png'
import { screenshotDimensions } from './assets/instructions/dimensions'
import { workshopBranding } from './branding'
import {
  autopilotPrompt,
  categoryExemptionMap,
  duPipeline,
  durationForLab,
  findingClassificationSection,
  foiaPipeline,
  goingFurtherIdeas,
  identityRows,
  labNumber,
  labStages,
  labSummaries,
  overviewSectionForLab,
  progressSections,
  recipientEmailsExample,
  sectionById,
  sectionsInLabGroup,
  solutionResourceRows,
  stepsInLab,
  workshopLabs,
  workshopSections,
  type WorkshopLab,
  type WorkshopSection,
} from './workshopData'

const PROGRESS_KEY = 'agentic-redaction-workshop-progress'

// Every card reads its own open state from here, so the section blocks below stay
// unchanged when the expand and collapse controls move around.
type SectionCollapseApi = {
  isOpen: (id: string) => boolean
  setOpen: (id: string, open: boolean) => void
}

type LabNavApi = { enterLab: (lab: WorkshopLab) => void }

const LabNavContext = createContext<LabNavApi>({ enterLab: () => {} })

type LightboxApi = { open: (trigger: HTMLElement) => void }

// Every figure tags its trigger with data-lightbox-*, so the viewer can rebuild
// the running order straight from the DOM at the moment it opens. Registering
// figures on mount instead would mean keeping a list in sync with which cards are
// expanded, filtered out, or on another tab; querying at open time cannot drift.
const LightboxContext = createContext<LightboxApi>({ open: () => {} })

export const LIGHTBOX_ITEM_SELECTOR = '[data-lightbox-src]'

function readLightboxItems() {
  return [...document.querySelectorAll<HTMLElement>(LIGHTBOX_ITEM_SELECTOR)].map((element) => ({
    src: element.dataset.lightboxSrc ?? '',
    alt: element.dataset.lightboxAlt ?? '',
    caption: element.dataset.lightboxCaption ?? '',
  }))
}

const SectionCollapseContext = createContext<SectionCollapseApi>({
  isOpen: () => true,
  setOpen: () => {},
})

const uipathHomeUrl = 'https://www.uipath.com/'
const uipathAcademyUrl = 'https://academy.uipath.com/'
const readingRoomUrl = 'https://uipathlabstraining.uipath.host/foia-reading-room'
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
    'Repeat for the remaining three actions. Once all four are submitted, this track is done and the extracted data has been through a human check.',
  ],
  foiaSetup: [
    'Open your workshop registration page and keep it available. You will need the credentials under Your Workshop Account, and later you will need a second, personal email address that can actually receive mail.',
    'Open Studio from the waffle menu, then select the Templates tab at the top.',
    {
      text: 'Search for agentic foia. One result appears: Agentic FOIA Redaction Workshop - Template v2, published by uipathlabsworkshop. Leave Project type set to All.',
      figure: {
        src: foiaTemplateImage,
        alt: 'Studio Templates tab with a search for agentic foia returning one solution template',
        caption: 'One result. If you see none, clear the search box and retype it - the filter is exact.',
      },
    },
    'Select the three-dot menu on the template card and choose New solution from template. Studio copies the whole solution into your own workspace and opens it. This takes a few seconds.',
    {
      text: 'Rename your copy so you can find it again. Select the solution name at the very top of the Explorer panel on the left, then type a name that includes your own initials or name.',
      figure: {
        src: foiaRenameImage,
        alt: 'The solution open in Studio with the solution name selected in the Explorer panel',
        caption: 'The solution name sits at the top of Explorer, above Agentic Process. Select it to rename.',
      },
    },
    {
      text: 'Confirm the rename took. Explorer should now show your name on the solution, with four projects beneath it: Agentic Process, Email Package, PII Agent, and Redaction Agent.',
      figure: {
        src: foiaRenamedImage,
        alt: 'Explorer showing the renamed solution with its four projects',
        caption: 'Four projects. You will only edit two of them today: Agentic Process and PII Agent.',
      },
      note: {
        title: 'This template already works',
        body: 'Unlike a build-from-scratch workshop, everything here is wired and functional except three deliberate gaps. Your job is to fill those gaps and watch what each one changes. Do not rebuild anything that is already there.',
      },
    },
  ],
  foiaRouting: [
    {
      text: 'Open Data manager using the suitcase icon in the narrow strip of icons on the far left. Expand Inputs, then Start event, then select recipientEmails.',
      figure: {
        src: foiaRecipientsImage,
        alt: 'Data manager with recipientEmails selected showing its default array value',
        caption: 'recipientEmails is an array of strings. Each element is treated as one address.',
      },
    },
    {
      text: 'You are passing a list of email addresses. The send-email activity at the end of the workflow can deliver to one recipient or to many, so it takes a list rather than a single value. In programmatic terms this is an array of strings: each address sits inside its own pair of double quotes, and the addresses are separated by commas. Add as many as you like.',
      copy: { label: 'recipientEmails format', value: recipientEmailsExample },
    },
    {
      text: 'Replace the placeholder your.email@here.com with a real address you can open right now, and keep the existing lewis.bell@uipath.com entry as a second element.',
      note: {
        title: 'Replace, never delete',
        body: 'If you empty this array the workflow sends no email and raises no error, so the run looks like a success and nothing arrives. Also note that a bare name as its own element will fail - every element must be an address.',
      },
    },
    {
      text: 'Scroll to the top of Data manager and select the plus icon beside Variables. A variable called property1 appears. Leave Scope set to Process and Type set to Text (String).',
      figure: {
        src: foiaAddVarImage,
        alt: 'Data manager with a newly added variable named property1 at Process scope',
        caption: 'A new variable defaults to Process scope and Text (String), which is exactly what you need.',
      },
    },
    {
      text: 'Rename property1 to reviewAssignee using the pencil icon, then set Default value to your provisioned tenant account - the long username from your workshop page, not your personal address. Spelling matters: you will search for this name in the next step.',
      figure: {
        src: foiaAssigneeVarImage,
        alt: 'The variable renamed to reviewAssignee with the tenant account as its default value',
        caption: 'reviewAssignee, Process scope, holding the tenant account that will receive both review tasks.',
      },
    },
    {
      text: 'Open Process.bpmn and select the node named FOIA Sensitive Data Review. In the Properties panel on the right, expand Assignments. Assignment Criteria is already set to User. The Assignee field below it is empty - that is the first gap.',
      figure: {
        src: foiaReviewNodeImage,
        alt: 'The FOIA Sensitive Data Review user task selected with an empty Assignee field',
        caption: 'Everything else on this node is configured. Only Assignee is blank.',
      },
    },
    {
      text: 'Select the small icon at the right edge of the Assignee field to open the Use menu, then choose Variables. Do not type the account name directly into the field.',
      figure: {
        src: foiaUseVariablesImage,
        alt: 'The Use menu open on the Assignee field showing Assignee, Variables, and expression editors',
        caption: 'Choose Variables. Typing a literal address here works for one person and breaks for everyone else.',
      },
    },
    {
      text: 'Type reviewassignee in the search box and select reviewAssignee (string) from the results.',
      figure: {
        src: foiaPickVariableImage,
        alt: 'Variable picker filtered to reviewAssignee showing the match under Process_1',
        caption: 'The match appears twice - once at the top and once under Process_1. Either selects the same variable.',
      },
    },
    {
      text: 'Confirm Assignee now shows a reviewAssignee chip rather than empty placeholder text.',
      figure: {
        src: foiaAssigneeBoundImage,
        alt: 'The Assignee field holding a reviewAssignee variable chip',
        caption: 'Bound. A chip means the value resolves at run time; grey placeholder text means it is still empty.',
      },
    },
    {
      text: 'Now repeat exactly the same binding on the second review node. Select FOIA Final Redaction Review, further right in the process, and set its Assignee to reviewAssignee the same way.',
      figure: {
        src: foiaFinalBoundImage,
        alt: 'The FOIA Final Redaction Review user task with reviewAssignee bound to Assignee',
        caption: 'Both review nodes need this. Missing the second one strands the run halfway through.',
      },
      note: {
        title: 'A single user is not the only option',
        body: 'Assignment Criteria has more in it than User. UiPath can route a task to a group for a shared team queue, or to a named list, so the first free reviewer picks it up rather than one person becoming a bottleneck. Open the dropdown and have a look - and think about what each option would need you to pass into Assignee, because a group is not an email address. We use a single user today only because you are the whole review team.',
      },
    },
    {
      text: 'Confirm both review nodes show a reviewAssignee chip before moving on.',
      note: {
        title: 'Check both nodes before moving on',
        body: 'There is no error message for a missing assignee and no retry budget later in the workshop. Select each review node once more and confirm you see a reviewAssignee chip on both, and two entries under recipientEmails.',
      },
    },
  ],
  foiaResources: [
    {
      text: 'Select the arrow beside the Debug button in the toolbar and choose the option that opens the debug configuration. The Debug configuration dialog opens on the Solution resources tab. F5 also starts a debug run, which is quicker once you have been round this loop a few times.',
      figure: {
        src: foiaDebugButtonImage,
        alt: 'The Debug button and its dropdown arrow in the Studio toolbar',
        caption: 'Use the dropdown arrow, not the Debug button itself, so you get the configuration dialog first.',
      },
    },
    {
      text: 'Every row under Resources in solution reads Will be deployed in Debug folder. Select each field in turn and pick the matching resource under Shared. The dropdowns list only real, available resources, so there is exactly one sensible choice per row.',
      figure: {
        src: foiaResourcesMapImage,
        alt: 'The Solution resources tab with an app dropdown open showing Shared and the matching app',
        caption: 'Expand a field, choose the entry under Shared, and move to the next row.',
      },
    },
    {
      text: 'Work down all seven rows: one app, one storage bucket, one connection, three processes, and one task catalog.',
      figure: {
        src: foiaResourcesDoneImage,
        alt: 'All seven solution resource rows mapped to their Shared counterparts',
        caption: 'Every row now shows a resource chip. Leave Deploy resources before debugging switched on.',
      },
      note: {
        title: 'Why this step exists at all',
        body: 'Most of what this solution needs already exists in Orchestrator and is shared with everyone in the workshop: the review app, the three RPA workflows, the storage bucket of DOJ guidance, and the Gmail connection that sends the final package. When you hit Debug, the solution deploys its resources into your own personal workspace. Left alone, that means fresh empty copies - a storage bucket with no guidance documents in it, a Gmail connection nobody has signed into - and the run fails partway through. Mapping each row to Shared/ points your run at the real, already-configured resources instead. The two things you actually edit today, Process.bpmn and the PII Agent, still run from your workspace. That is the point of running in Studio Web’s Debug: we can make changes, test, and see the results live. Once tested and hardened, solutions are deployed to production where changes are managed and infrastructure can be dynamically shared.',
      },
    },
    {
      text: 'Switch to the Entrypoint arguments tab. Set documentSearchTerm to geothermal. Leave supplementalSensitiveTerms and additionalInstructions empty, and confirm recipientEmails carries the addresses you set in the previous step.',
      figure: {
        src: foiaEntrypointImage,
        alt: 'The Entrypoint arguments tab with documentSearchTerm set to geothermal',
        caption: 'geothermal matches one real document with three findings, which is the right size for one sitting.',
      },
      note: {
        title: 'Use the same term for your first two runs',
        body: 'The workshop compares two runs over the same document, so the term has to match in run 1 and run 2 or the comparison stops working. geothermal is a good one to start with - one document, three findings. After that, try any search term you like. Check the FOIA Reading Room first to see which sample documents are available.',
        link: { href: readingRoomUrl, label: 'Open the FOIA Reading Room' },
      },
    },
  ],
  foiaRunOne: [
    {
      text: 'Select Save and Debug. The process starts and the Execution trail at the bottom fills in as each step completes. Retrieval and analysis take a minute or two.',
      figure: {
        src: foiaFirstRunImage,
        alt: 'The process running in debug with a green execution trail and the review task highlighted',
        caption: 'Green ticks mark completed steps. The run pauses at FOIA Sensitive Data Review and waits for you.',
      },
    },
    {
      text: 'Give yourself room to watch it. The page-scroll icon on the right of the trail closes the logs, and on the left the project explorer (folder icon) and Data manager (suitcase icon) each collapse when you select them again. You can also drag the top edge of the Execution trail upwards to make it taller.',
    },
    'When the trail reaches FOIA Sensitive Data Review it stops. In the Details panel on the right, select Open app task. Your review opens in a new tab.',
    {
      text: 'Read the amber banner at the top: Guidance unavailable - hybrid review used exact supplemental matches only. Human review is required. The agent found three passages worth redacting but has no policy source to justify any of them.',
      figure: {
        src: foiaInitialReviewImage,
        alt: 'The initial review task with an amber guidance unavailable banner and three findings',
        caption: 'Three findings, verbose invented category labels, and Confirm redaction greyed out at the bottom right.',
      },
      note: {
        title: 'Look at the category labels before you continue',
        body: 'The pills above each finding read things like Commercial/Financial Informati... and Predecisional/Deliberative Infor..., truncated because the agent invented a full sentence where a label belongs. Nothing told it what vocabulary to use. Remember what these look like - you will change them in step 6.',
      },
    },
    {
      text: 'The footer says three findings need authority review, and Confirm redaction is disabled. For each finding, open Add authority and pick a statutory exemption from the fourteen-item list. You get no rationale and no suggestion; the choice is entirely yours.',
      figure: {
        src: foiaAuthorityImage,
        alt: 'The Add authority dropdown listing fourteen FOIA statutory exemptions',
        caption: 'Fourteen exemptions, no guidance. This is the part that should feel tedious.',
      },
      note: {
        title: 'Avoid (b)(3)',
        body: 'Exemption 3 requires a qualifying statute the app cannot supply, so choosing it hard-blocks Confirm redaction with a message you cannot action. Pick anything else. If a finding seems wrong entirely, Remove excludes it and it stops blocking release.',
      },
    },
    {
      text: 'Once every finding has an authority, the footer changes to three findings will be sent to redaction and Confirm redaction turns active. Select it.',
      figure: {
        src: foiaConfirmImage,
        alt: 'The review task with all findings labelled and Confirm redaction enabled',
        caption: 'Each finding now shows a statutory label and an optional reviewer rationale field.',
      },
      note: {
        title: 'Reviewer rationale is optional here, but not in real life',
        body: 'Leave it blank today - it is optional so the exercise stays short. On a real FOIA response the rationale is required, and it has to be written per finding. Imagine doing that by hand for every redaction on every document. It is another job the agent takes on later in this lab.',
      },
    },
    {
      text: 'Back in Studio the trail continues past the review: Run redaction, then Redaction Agent, then Result contract valid, then a second pause at FOIA Final Redaction Review.',
      figure: {
        src: foiaContinuesImage,
        alt: 'The execution trail continuing through the redaction agent to the final review task',
        caption: 'The redaction itself takes about 40 seconds. Select Open app task again for the final review.',
      },
    },
    {
      text: 'The final review shows the redacted PDF with black bars carrying the exemption codes you chose. Check the bars land on the right passages, then select Approve final document.',
      figure: {
        src: foiaFinalRunOneImage,
        alt: 'The final redaction review showing the redacted PDF with exemption code bars',
        caption: 'Your own choices, printed onto the document. Whatever you picked is what appears on the bar.',
      },
    },
    {
      text: 'The run completes through Email Package to Final document approved. Check the inbox of the address you set in recipientEmails - the redacted PDF is attached.',
      figure: {
        src: foiaRunOneDoneImage,
        alt: 'The completed execution trail ending at Final document approved with global variables listed',
        caption: 'End to end, with every statutory decision made by hand. Now make the agent do that part.',
      },
    },
  ],
  foiaContext: [
    {
      text: 'In Explorer, expand PII Agent and select Definition. The agent opens with its model, system prompt, and user prompt.',
      figure: {
        src: foiaAgentDefImage,
        alt: 'The PII Agent definition showing the model, system prompt and user prompt',
        caption: 'Read the user prompt: it already references a DOJ guidance context that is not attached yet.',
      },
      note: {
        title: 'The unresolved reference is the gap',
        body: 'The user prompt tells the agent to resolve guidance from a DOJ context, and the reference chip for it is highlighted because nothing is connected. That is why run 1 reported Guidance unavailable.',
      },
    },
    {
      text: 'Switch to the Canvas view using the Canvas and Form toggle. Below the agent card is a Context connector with a plus button. Select the plus, then choose Context Grounding Indexes.',
      figure: {
        src: foiaNewContextImage,
        alt: 'The agent canvas with a new context node and a panel offering Context Grounding Indexes or Data Fabric Entities',
        caption: 'Context Grounding Indexes is for unstructured documents like the DOJ policy PDFs.',
      },
    },
    {
      text: 'Under Available resources, expand Shared and select doj-foia-redaction-guidance, described as Department of Justice exemption code FOIA policy documentation.',
      figure: {
        src: foiaPickIndexImage,
        alt: 'The index picker listing doj-foia-redaction-guidance under Shared',
        caption: 'One index. Do not select Create new - the index already exists and is already populated.',
      },
    },
    {
      text: 'Confirm the canvas now shows doj_foia_redaction_guidance wired to the agent, with Strategy set to Semantic. Leave every setting at its default.',
      figure: {
        src: foiaContextDoneImage,
        alt: 'The attached context node with its name, description, Semantic strategy and retrieval settings',
        caption: 'Attached. Semantic strategy, no folder prefix, default relevance threshold and result count.',
      },
      note: {
        title: 'This creates a new resource to map',
        body: 'Attaching the index adds a row to Solution resources that did not exist when you mapped them in step 3. Before your next debug, reopen the debug configuration and map that new index row to Shared as well, or the run will fail on an unresolved reference.',
      },
    },
  ],
  foiaClassify: [
    {
      text: 'Switch back to the Form view of the PII Agent, then select Open Autopilot on the right-hand icon strip.',
      figure: {
        src: foiaOpenAutopilotImage,
        alt: 'The PII Agent form view with the Open Autopilot tooltip showing',
        caption: 'Autopilot edits the prompt for you. You describe the change; it writes the text.',
      },
    },
    {
      text: 'Paste the request below into Autopilot and send it. You are asking for one new section, not a rewrite.',
      figure: {
        src: foiaAutopilotAskImage,
        alt: 'The Autopilot panel with the finding classification request submitted and generating a response',
        caption: 'The request names the section, fixes the six allowed values, and says where reasoning belongs.',
      },
      copy: { label: 'Autopilot request', value: autopilotPrompt },
    },
    {
      text: 'Autopilot returns the full proposed prompt. Scroll through it and check the existing sections are still there - Role, Source Boundaries, Detection Modes, Safe Guidance Failure - then select Accept.',
      figure: {
        src: foiaAutopilotAcceptImage,
        alt: 'The Autopilot response showing existing prompt sections with Reject and Accept buttons',
        caption: 'Confirm the other sections survived before accepting. Reject and re-ask if any went missing.',
      },
      note: {
        title: 'Check, do not skim',
        body: 'Autopilot can rewrite rather than append. If a section disappeared, select Reject, ask again, and say that every existing section must be preserved. If it keeps failing, paste the finished section below into the system prompt by hand instead.',
      },
    },
    {
      text: 'Open the system prompt and confirm a Finding Classification section now sits between the numbered method steps and Evidence and Provenance, listing exactly six categories.',
      figure: {
        src: foiaClassificationImage,
        alt: 'The system prompt with the new Finding Classification section highlighted',
        caption: 'Six categories, each defined in FOIA terms, followed by rules keeping reasoning out of the label.',
      },
      note: {
        title: 'Your version should look close to this',
        body: 'Autopilot generally does a good job of this section, and what it wrote for you should read much like the block below - the same six categories and the same rule about keeping reasoning out of the label. It does not need to match word for word. Use Autopilot if you can: writing the prompt is the skill worth practising. The block below is here as a fallback if Autopilot struggled, or if you would rather paste a known-good version and move on.',
      },
      copy: { label: 'Known-good version of the section', value: findingClassificationSection },
    },
    {
      text: 'Notice the last rule in the section: reasoning, justification and nuance belong in rationale, not category. Without that sentence the model puts a full explanation back into the label and you are no better off than run 1.',
    },
  ],
  foiaRunTwo: [
    {
      text: 'Open the debug configuration again. Map the new index row to Shared, leave every other row as you set it in step 3, and confirm documentSearchTerm is still geothermal. Then select Save and Debug.',
      note: {
        title: 'Same document, second time',
        body: 'You changed two things since run 1: the agent now has a policy source, and it now has your category vocabulary. Everything else, including the document, is identical, so every difference you see comes from those two changes.',
      },
    },
    {
      text: 'When the review task opens, look at the findings panel first. The category pills now read single clean words - Commercial, Deliberative, Geological - and each finding carries an exemption code proposed by the agent, marked Agent default, with its own rationale and a Policy evidence section.',
      figure: {
        src: foiaCleanPillsImage,
        alt: 'A review finding with a clean Commercial category pill, an agent-proposed exemption and rationale',
        caption: 'Commercial, 97 percent confidence, (b)(4) proposed with a written rationale and real policy evidence.',
      },
    },
    {
      text: 'Confirm redaction is active immediately. There is no authority to hand-pick, no fourteen-item dropdown, and no amber banner. Select Confirm redaction.',
      note: {
        title: 'Where the two halves meet',
        body: 'The vocabulary you authored in step 6 maps one-to-one onto the exemption families the grounded agent proposes here. All three findings on this document demonstrate it.',
      },
    },
    {
      text: 'The final review banner now reads Hybrid detection - DOJ guidance was available and finding-level sources are shown below. The bars carry (b)(4), (b)(5) and (b)(9), each reasoned rather than guessed. Select Approve final document.',
      figure: {
        src: foiaHybridImage,
        alt: 'The final redaction review with a hybrid detection banner and exemption code bars',
        caption: 'Compare this banner with run 1. Same document, same workflow, a grounded agent.',
      },
    },
    {
      text: 'Check your inbox. The redacted FOIA package arrives with the PDF attached, exemption codes printed on every redaction bar.',
      figure: {
        src: foiaEmailImage,
        alt: 'The delivered email with the redacted PDF attached and its redaction bars visible',
        caption: 'The finished deliverable, produced end to end with a human approving every redaction.',
      },
    },
  ],
}

type StepItem =
  | string
  | {
      text: string
      figure?: { src: string; alt: string; caption: string }
      note?: { title: string; body: string; link?: { href: string; label: string } }
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
                  <AlertDescription className="mt-1 leading-6">
                    {entry.note.body}
                    {entry.note.link ? (
                      <span className="mt-2 block">
                        <a
                          className="font-medium text-primary hover:underline"
                          href={entry.note.link.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {entry.note.link.label} <ExternalLink className="inline h-3.5 w-3.5" />
                        </a>
                      </span>
                    ) : null}
                  </AlertDescription>
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

// The whole Document Understanding pipeline, with the two stages this lab wires
// called out. Drawing all seven rather than only the two keeps the lab honest
// about how much of the product it leaves alone, which is the question an
// attendee asks as soon as they see one document type and no classifier.
// Blue for what this lab covers, amber for what lab 2 covers, neutral for the
// stages the workshop never reaches. Explicit palette stops rather than theme
// tokens for the amber, so it holds its meaning in both light and dark.
const DU_SCOPE_STYLES = {
  lab1: { rect: 'fill-card stroke-primary', dot: 'fill-primary', dotText: 'fill-primary-foreground' },
  lab2: { rect: 'fill-card stroke-amber-500', dot: 'fill-amber-500', dotText: 'fill-amber-950' },
  none: { rect: 'fill-card stroke-border', dot: 'fill-muted stroke-border', dotText: 'fill-muted-foreground' },
} as const

const DU_GEOMETRY = { cardWidth: 140, cardHeight: 88, spacing: 166, firstX: 8, cardY: 48, dotY: 26 }

function DuPipelineDiagram() {
  const { cardWidth, cardHeight, spacing, firstX, cardY, dotY } = DU_GEOMETRY
  const cards = duPipeline.map((entry, index) => {
    const x = firstX + index * spacing
    return { ...entry, x, center: x + cardWidth / 2, style: DU_SCOPE_STYLES[entry.scope ?? 'none'] }
  })
  const width = firstX + (cards.length - 1) * spacing + cardWidth + firstX

  return (
    <div>
      <h3 className="mb-3 font-semibold">The full Document Understanding pipeline</h3>
      <div className="overflow-x-auto rounded-xl border bg-muted/20 py-4">
        <svg
          aria-label={`The seven Document Understanding stages: ${duPipeline
            .map((entry, index) => {
              const scope =
                entry.scope === 'lab1' ? ' (covered in this lab)' : entry.scope === 'lab2' ? ' (covered in lab 2)' : ''
              return `${index + 1} ${entry.stage}${scope}`
            })
            .join(', ')}.`}
          className="block h-auto w-full min-w-[1000px]"
          role="img"
          viewBox={`0 0 ${width} 156`}
        >
          {/* the run, as a dotted spine through the stage numbers */}
          <line
            className="stroke-border"
            strokeDasharray="3 5"
            strokeWidth="1.5"
            x1={cards[0].center}
            x2={cards[cards.length - 1].center}
            y1={dotY}
            y2={dotY}
          />

          {cards.map((card, index) => (
            <g key={card.stage}>
              <circle
                className={card.style.dot}
                cx={card.center}
                cy={dotY}
                r="13"
                strokeWidth="1"
              />
              <text
                className={card.style.dotText}
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
                x={card.center}
                y={dotY + 4.5}
              >
                {index + 1}
              </text>

              <rect
                className={card.style.rect}
                height={cardHeight}
                rx="10"
                strokeWidth={card.scope ? '2' : '1'}
                width={cardWidth}
                x={card.x}
                y={cardY}
              />
              <text
                className="fill-foreground"
                fontSize="15"
                fontWeight="600"
                textAnchor="middle"
                x={card.center}
                y={cardY + 34}
              >
                {card.stage}
              </text>
              <text className="fill-muted-foreground" fontSize="11.5" textAnchor="middle" x={card.center} y={cardY + 58}>
                {card.lines[0]}
                <tspan dy="15" x={card.center}>
                  {card.lines[1]}
                </tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
        All seven stages ship with the product. The three in blue are the ones we cover today, against a
        model that has already been trained for you. The two in amber you will meet in Lab 2.
      </p>
      <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
        For today's lab we will be looking at a single SF doc type, so we will not need to classify. We
        will see examples of human-in-the-loop validation and exports in the second lab. We will discuss
        training, but not actively retrain our DU models today.
      </p>
    </div>
  )
}

// A stand-in for the Maestro canvas the attendee is about to open: same six
// stages, same left-to-right run, drawn rather than screenshotted so the labels
// stay sharp and the actor of each stage can be called out. Deliberately dark in
// both themes - it is a picture of a dark design surface, and the Studio captures
// around it are dark too.
const PIPELINE_GEOMETRY = { nodeWidth: 140, nodeHeight: 62, spacing: 180, firstX: 66, midY: 88 }

function MaestroPipelineDiagram() {
  const { nodeWidth, nodeHeight, spacing, firstX, midY } = PIPELINE_GEOMETRY
  const nodeY = midY - nodeHeight / 2
  const nodes = foiaPipeline.map((entry, index) => ({ ...entry, x: firstX + index * spacing }))
  const lastRight = firstX + (nodes.length - 1) * spacing + nodeWidth
  const endCx = lastRight + 37
  const width = endCx + 45

  return (
    <div>
      <h3 className="mb-3 font-semibold">What the workflow does</h3>
      <div className="overflow-x-auto rounded-xl border bg-[#111a24]">
        <svg
          aria-label={`${foiaPipeline.length} stage workflow: ${foiaPipeline
            .map(
              (entry) =>
                `${entry.stage}, run by ${entry.actor.toLowerCase()}${entry.optional ? ', optional' : ''}`,
            )
            .join('; then ')}.`}
          className="block h-auto w-full min-w-[940px]"
          role="img"
          viewBox={`0 0 ${width} 176`}
        >
          <defs>
            <pattern height="18" id="foia-canvas-grid" patternUnits="userSpaceOnUse" width="18">
              <circle cx="1" cy="1" fill="#1d2a38" r="1" />
            </pattern>
            <marker
              id="foia-arrow"
              markerHeight="6"
              markerWidth="6"
              orient="auto"
              refX="5"
              refY="3"
              viewBox="0 0 6 6"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="#5a6e85" />
            </marker>
          </defs>

          <rect fill="url(#foia-canvas-grid)" height="176" width={width} x="0" y="0" />

          {/* start */}
          <circle cx="30" cy={midY} fill="#111a24" r="15" stroke="#5a6e85" strokeWidth="2" />
          <text fill="#8fa0b5" fontSize="10" textAnchor="middle" x="30" y={midY + 34}>
            Start
          </text>

          {/* connectors */}
          {nodes.map((node, index) => {
            const from = index === 0 ? 45 : node.x - (spacing - nodeWidth)
            return (
              <line
                key={`edge-${node.stage}`}
                markerEnd="url(#foia-arrow)"
                stroke="#5a6e85"
                strokeWidth="1.5"
                x1={from}
                x2={node.x - 6}
                y1={midY}
                y2={midY}
              />
            )
          })}
          <line
            markerEnd="url(#foia-arrow)"
            stroke="#5a6e85"
            strokeWidth="1.5"
            x1={lastRight}
            x2={endCx - 21}
            y1={midY}
            y2={midY}
          />

          {/* stages */}
          {nodes.map((node, index) => {
            const human = node.actor === 'Human'
            return (
              <g key={node.stage}>
                <rect
                  fill="#1b2532"
                  height={nodeHeight}
                  rx="10"
                  stroke={human ? '#e0a458' : '#33455a'}
                  strokeDasharray={node.optional ? '5 3' : undefined}
                  strokeWidth={human ? '2' : '1.5'}
                  width={nodeWidth}
                  x={node.x}
                  y={nodeY}
                />
                <rect
                  fill={human ? '#b8752c' : '#2f6fd0'}
                  height="18"
                  rx="5"
                  width="18"
                  x={node.x + 12}
                  y={nodeY + 12}
                />
                <text
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                  x={node.x + 21}
                  y={nodeY + 25}
                >
                  {index + 1}
                </text>
                <text fill="#e8eef7" fontSize="13" fontWeight="600" x={node.x + 38} y={nodeY + 26}>
                  {node.stage}
                </text>
                <text
                  fill={human ? '#e0a458' : '#8fa0b5'}
                  fontSize="9.5"
                  letterSpacing="0.08em"
                  x={node.x + 12}
                  y={nodeY + 47}
                >
                  {node.optional ? `${node.actor.toUpperCase()} · OPTIONAL` : node.actor.toUpperCase()}
                </text>
              </g>
            )
          })}

          {/* end */}
          <circle cx={endCx} cy={midY} fill="#111a24" r="15" stroke="#7fbf9a" strokeWidth="3" />
          <text fill="#8fa0b5" fontSize="10" textAnchor="middle" x={endCx} y={midY + 34}>
            Delivered
          </text>
        </svg>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        The amber stages are the ones a person does, and the run stops and waits at each of them until
        someone approves. The dashed one is optional: a reviewer who is happy with the redacted document can
        let it go straight out, or send it back for another pass.
      </p>
      <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
        {foiaPipeline.map((entry, index) => (
          <div key={entry.stage}>
            <dt className="text-sm font-semibold">
              {index + 1}. {entry.stage}
            </dt>
            <dd className="mt-0.5 text-sm leading-6 text-muted-foreground">{entry.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// Marks where one group of steps ends and the next begins, so a long lab reads
// as a few phases rather than one undifferentiated run of cards.
function GroupDivider({ label, show }: { label: string; show: boolean }) {
  if (!show) return null
  return (
    <div className="flex items-center gap-4 pt-6 first:pt-0">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

// The home page shows each lab's overview; this is how you leave it for the
// guided steps.
function EnterLabButton({ lab }: { lab: WorkshopLab }) {
  const { enterLab } = useContext(LabNavContext)
  const steps = stepsInLab(lab)
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
      <p className="text-sm leading-6 text-muted-foreground">
        {steps.length} guided steps, about {durationForLab(lab)} minutes.
      </p>
      <Button onClick={() => enterLab(lab)}>
        Open Lab {labNumber(lab)} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Both tracks stand alone, so both have to tell an attendee how to get an
// account. Same block, rendered in each track's orientation section.
function AccountSetup() {
  return (
    <Alert>
      <Check className="h-4 w-4" />
      <AlertTitle>Before you begin</AlertTitle>
      <AlertDescription className="mt-3 space-y-4 leading-6">
        <p>Register for the workshop to receive the UiPath username and password assigned to you.</p>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              1
            </span>
            <span>
              Open the registration page, enter your name, and use workshop code{' '}
              <strong>{workshopJoinCode}</strong> if prompted.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              2
            </span>
            <span>
              On your workshop page, save or bookmark the page so you can return to your assigned credentials.
              Then select <strong>Open UiPath Environment</strong>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              3
            </span>
            <span>
              When the UiPath sign-in page opens, choose <strong>Continue with Microsoft</strong>. Sign in with
              the username and password displayed under <strong>Your Workshop Account</strong> on the previous
              page.
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
          Whenever a debug profile asks you to resolve dependencies, use the resources under the{' '}
          <strong className="text-foreground">Shared</strong> folder.
        </p>
      </AlertDescription>
    </Alert>
  )
}

function LabStages({ lab }: { lab: WorkshopLab }) {
  const track = labStages.find((entry) => entry.lab === lab)
  if (!track) return null
  return (
    <div>
      <h3 className="mb-4 font-semibold">What you will build</h3>
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
  const lightbox = useContext(LightboxContext)

  return (
    <figure className="overflow-hidden rounded-xl border bg-muted/20">
      <button
        aria-label={`View larger: ${alt}`}
        className="block w-full cursor-zoom-in bg-slate-950/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-lightbox-alt={alt}
        data-lightbox-caption={caption}
        data-lightbox-src={src}
        onClick={(event) => lightbox.open(event.currentTarget)}
        type="button"
      >
        <img
          alt={alt}
          className="mx-auto max-h-[44rem] w-full object-contain"
          height={size?.[1]}
          loading="lazy"
          src={src}
          style={size ? { maxWidth: `${size[0]}px` } : undefined}
          width={size?.[0]}
        />
      </button>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs leading-5 text-muted-foreground">
        <span>{caption}</span>
        <button
          className="font-medium text-primary hover:underline"
          data-lightbox-open
          onClick={(event) => {
            const trigger = event.currentTarget
              .closest('figure')
              ?.querySelector<HTMLElement>(LIGHTBOX_ITEM_SELECTOR)
            if (trigger) lightbox.open(trigger)
          }}
          type="button"
        >
          View larger
        </button>
      </figcaption>
    </figure>
  )
}

// One viewer for the whole page. Left and right step through every figure
// currently on screen, in the order they appear.
function Lightbox({
  items,
  index,
  onStep,
  onClose,
}: {
  items: { src: string; alt: string; caption: string }[]
  index: number
  onStep: (delta: number) => void
  onClose: () => void
}) {
  const current = items[index]

  useEffect(() => {
    if (!current) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        // Steps by delta rather than to a computed index: key repeat fires several
        // events before React re-renders, and they would all read the same stale
        // index and collapse into a single move.
        onStep(event.key === 'ArrowRight' ? 1 : -1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, onStep])

  if (!current) return null

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open>
      <DialogContent className="max-h-[94vh] w-[97vw] max-w-[1800px] gap-3 overflow-hidden p-3 sm:max-w-[1800px] sm:p-4">
        <DialogHeader>
          <DialogTitle className="pr-10 text-base font-semibold leading-6">{current.caption}</DialogTitle>
        </DialogHeader>
        <img
          alt={current.alt}
          className="max-h-[78vh] w-full rounded-lg bg-slate-950/95 object-contain"
          src={current.src}
        />
        {items.length > 1 && (
          <div className="flex items-center justify-between gap-3 px-1">
            <Button onClick={() => onStep(-1)} size="sm" variant="outline">
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {index + 1} of {items.length} · use the left and right arrow keys
            </span>
            <Button onClick={() => onStep(1)} size="sm" variant="outline">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
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
                  <Badge variant="outline">
                    Lab {labNumber(section.lab)} · {section.group}
                  </Badge>
                  {section.step && <Badge variant="secondary">Step {section.step}</Badge>}
                  {/* An overview is something you read, and its card also carries how
                      long the lab behind it takes. A step is something you do, so its
                      duration is the doing time and nothing else. */}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" /> {section.duration}
                    {section.group === 'Overview' && ' read'}
                  </span>
                  {section.group === 'Overview' && (
                    <Badge variant="secondary">Lab takes about {durationForLab(section.lab)} min</Badge>
                  )}
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
                <CardDescription className="mt-1.5 max-w-4xl leading-6">{section.description}</CardDescription>
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
  const [activeSection, setActiveSection] = useState('sf-overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  // null is the home page. Entering a lab swaps the page for that lab's steps.
  const [activeLab, setActiveLab] = useState<WorkshopLab | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [collapsedLabs, setCollapsedLabs] = useState<Set<string>>(new Set())
  const [lightbox, setLightbox] = useState<{
    items: { src: string; alt: string; caption: string }[]
    index: number
  } | null>(null)
  // The home page leads with the lab cards, so each lab's overview starts folded
  // away rather than filling the first two screens with prose.
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    () =>
      new Set(
        workshopSections
          .filter((section) => section.group === 'Overview' || section.optional)
          .map((section) => section.id),
      ),
  )
  const [pendingScroll, setPendingScroll] = useState<{ id: string; smooth: boolean } | null>(null)

  const normalizedSearch = searchTerm.trim().toLowerCase()
  // Search deliberately ignores which page you are on - a hit in the other lab is
  // still the answer you were looking for. Otherwise the page decides: home shows
  // each lab's overview, a lab shows that lab's numbered steps.
  const visibleSections = useMemo(() => {
    if (normalizedSearch) {
      return workshopSections.filter((section) =>
        `${section.title} ${section.description} ${section.searchTerms}`
          .toLowerCase()
          .includes(normalizedSearch),
      )
    }
    if (activeLab)
      return workshopSections.filter((section) => section.lab === activeLab && section.group !== 'Overview')
    return workshopSections.filter((section) => section.group === 'Overview')
  }, [normalizedSearch, activeLab])

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
  // Two separate controls, because they own different things: the sidebar button
  // folds the outline trees, the icon button by the cards folds the cards.
  const allOutlinesOpen = collapsedLabs.size === 0

  function toggleAllOutlines() {
    setCollapsedLabs(allOutlinesOpen ? new Set(workshopLabs.map((entry) => entry.lab)) : new Set())
  }

  const someVisibleExpanded = visibleSections.some((section) => !collapsedSections.has(section.id))

  function toggleVisibleSections() {
    setCollapsedSections((current) => {
      const next = new Set(current)
      for (const section of visibleSections) {
        if (someVisibleExpanded) next.add(section.id)
        else next.delete(section.id)
      }
      return next
    })
  }

  const visibleIds = useMemo(() => new Set(visibleSections.map((section) => section.id)), [visibleSections])
  const completeCount = completed.size
  const progress = Math.round((completeCount / progressSections.length) * 100)

  // Home totals every lab; inside a lab the bar is about that lab alone.
  const scopeSteps = activeLab ? stepsInLab(activeLab) : progressSections
  const scopeDone = scopeSteps.filter((section) => completed.has(section.id)).length
  const scopeProgress = Math.round((scopeDone / scopeSteps.length) * 100)
  const scopeLabel = activeLab ? `Lab ${labNumber(activeLab)} progress` : 'Overall progress'

  const openLightbox = useCallback((trigger: HTMLElement) => {
    const items = readLightboxItems()
    const index = [...document.querySelectorAll<HTMLElement>(LIGHTBOX_ITEM_SELECTOR)].indexOf(trigger)
    if (!items.length || index < 0) return
    setLightbox({ items, index })
  }, [])

  const lightboxApi = useMemo<LightboxApi>(() => ({ open: openLightbox }), [openLightbox])

  // Wraps, so holding an arrow never dead-ends on the first or last figure.
  const stepLightbox = useCallback((delta: number) => {
    setLightbox((current) =>
      current
        ? { ...current, index: (current.index + delta + current.items.length) % current.items.length }
        : current,
    )
  }, [])

  function enterLab(lab: WorkshopLab) {
    setSearchTerm('')
    setActiveLab(lab)
    window.scrollTo({ behavior: 'instant', top: 0 })
  }

  const labNavApi = useMemo<LabNavApi>(() => ({ enterLab }), [])

  function goHome() {
    setSearchTerm('')
    setActiveLab(null)
    window.scrollTo({ behavior: 'instant', top: 0 })
  }

  function toggleLabOutline(lab: string) {
    setCollapsedLabs((current) => {
      const next = new Set(current)
      if (next.has(lab)) next.delete(lab)
      else next.add(lab)
      return next
    })
  }

  function groupVisible(lab: WorkshopLab, group: string) {
    return visibleSections.some((section) => section.lab === lab && section.group === group)
  }

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
    // A sidebar shortcut can point into the other lab, or past an active search.
    // Move the page to wherever the target actually lives first, or the scroll
    // targets a card that is not rendered and nothing happens.
    const target = workshopSections.find((section) => section.id === id)
    if (target) {
      if (target.group === 'Overview') setActiveLab(null)
      else if (target.lab !== activeLab) setActiveLab(target.lab)
    }
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
      {workshopLabs.map((entry) => {
        const partSteps = stepsInLab(entry.lab)
        const partDone = partSteps.filter((section) => completed.has(section.id)).length
        const outlineOpen = !collapsedLabs.has(entry.lab)
        return (
        <div className="space-y-4" key={entry.lab}>
          <div className="border-b pb-2">
            <button
              aria-expanded={outlineOpen}
              className="flex w-full items-center gap-2 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-foreground hover:text-primary"
              onClick={() => toggleLabOutline(entry.lab)}
              type="button"
            >
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 shrink-0 transition-transform ${outlineOpen ? '' : '-rotate-90'}`}
              />
              <span className="min-w-0 flex-1">
                Lab {entry.number} · {entry.lab}
              </span>
            </button>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${Math.round((partDone / partSteps.length) * 100)}%` }}
                />
              </div>
              <span className="shrink-0 text-[10px] font-medium tabular-nums text-muted-foreground">
                {partDone}/{partSteps.length}
              </span>
            </div>
          </div>
          {outlineOpen && entry.groups.map((group) => {
            const sections = sectionsInLabGroup(entry.lab, group)
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
        )
      })}
    </nav>
  )

  return (
    <LabNavContext.Provider value={labNavApi}>
    <LightboxContext.Provider value={lightboxApi}>
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
        <SheetContent className="w-[88vw] max-w-sm overflow-y-auto overscroll-y-contain p-0" side="left">
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
            <Button className="mb-5 w-full" onClick={toggleAllOutlines} size="sm" variant="outline">
              {allOutlinesOpen ? 'Collapse outline' : 'Expand outline'}
            </Button>
            {nav}
          </div>
        </SheetContent>
      </Sheet>

      <div className={`grid ${sidebarOpen ? 'lg:grid-cols-[290px_minmax(0,1fr)]' : 'grid-cols-1'}`}>
        {/* overscroll-y-contain keeps the wheel inside the outline: reaching either
            end stops there instead of handing the scroll on to the page behind it. */}
        {sidebarOpen && (
        <aside className="sticky top-[66px] hidden h-[calc(100vh-66px)] overflow-y-auto overscroll-y-contain border-r p-5 lg:block">
          <Button
            className="mb-4 w-full justify-start"
            onClick={() => setSidebarOpen(false)}
            size="sm"
            variant="ghost"
          >
            <PanelLeftClose className="h-4 w-4" /> Hide outline
          </Button>
          <Button className="mb-5 w-full" onClick={toggleAllOutlines} size="sm" variant="outline">
            {allOutlinesOpen ? (
              <>
                <ChevronRight className="h-3.5 w-3.5" /> Collapse outline
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" /> Expand outline
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
        )}

        <main className="min-w-0">
          {/* Tab strip: home plus one tab per lab, with the progress bar scoped to
              whichever of them you are looking at. */}
          <div className="sticky top-[66px] z-20 border-b bg-background/95 backdrop-blur">
            <div className="flex w-full flex-col gap-3 px-4 py-3 sm:px-8 lg:flex-row lg:items-center lg:gap-6 lg:px-10">
              <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
                {!sidebarOpen && (
                  <Button
                    aria-label="Show outline"
                    className="mr-1 hidden shrink-0 lg:inline-flex"
                    onClick={() => setSidebarOpen(true)}
                    size="icon"
                    variant="ghost"
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  className="shrink-0"
                  onClick={goHome}
                  size="sm"
                  variant={activeLab === null ? 'default' : 'ghost'}
                >
                  Home
                </Button>
                {workshopLabs.map((entry) => (
                  <Button
                    className="shrink-0"
                    key={entry.lab}
                    onClick={() => enterLab(entry.lab)}
                    size="sm"
                    variant={activeLab === entry.lab ? 'default' : 'ghost'}
                  >
                    {entry.number}. {entry.lab}
                  </Button>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-3 lg:w-72">
                <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">{scopeLabel}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${scopeProgress}%` }}
                  />
                </div>
                <span className="whitespace-nowrap text-xs font-semibold tabular-nums text-primary">
                  {scopeDone}/{scopeSteps.length}
                </span>
              </div>
            </div>
          </div>

          {activeLab === null && !normalizedSearch && (
          <div className="workshop-grid border-b">
            <div className="w-full px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="max-w-4xl">
                <div className="mb-6">
                  <BrandLockup />
                </div>
                <Badge className="mb-5" variant="secondary">
                  UiPath Agentic Automation · Hands-on Workshop
                </Badge>
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Two hands-on labs: automated forms, and agentic redaction
                </h1>
                <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                  Lab 1 is an introduction to automated document processing: see how a doc model is built,
                  then run one against sample forms and check the results yourself. Lab 2 is its own build, a
                  FOIA redaction workflow using Agents, DU and Action Center, all orchestrated through Maestro.
                  No UiPath or development experience needed.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {labSummaries.map((entry) => {
                  const partSteps = stepsInLab(entry.lab)
                  const partDone = partSteps.filter((section) => completed.has(section.id)).length
                  return (
                    <div
                      className="flex flex-col rounded-xl border bg-background/90 p-5 shadow-sm backdrop-blur"
                      key={entry.lab}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                          {labNumber(entry.lab)}
                        </span>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                          {entry.subtitle}
                        </p>
                      </div>
                      <p className="mt-2 text-lg font-semibold">{entry.lab}</p>
                      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{entry.blurb}</p>
                      <p className="mt-4 text-xs font-medium text-muted-foreground">
                        {partSteps.length} steps · about {durationForLab(entry.lab)} minutes
                        {partDone > 0 && ` · ${partDone} done`}
                      </p>
                      <Button
                        className="mt-3 w-full"
                        onClick={() => enterLab(entry.lab)}
                        variant={partDone > 0 ? 'outline' : 'default'}
                      >
                        {partDone > 0 ? `Resume Lab ${labNumber(entry.lab)}` : `Start Lab ${labNumber(entry.lab)}`}{' '}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          )}

          {activeLab !== null && !normalizedSearch && (
            <div className="border-b bg-muted/20">
              <div className="w-full px-4 py-8 sm:px-8 lg:px-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Lab {labNumber(activeLab)} · {labSummaries.find((entry) => entry.lab === activeLab)?.subtitle}
                </p>
                <h1 className="mt-1.5 text-3xl font-bold tracking-tight sm:text-4xl">{activeLab}</h1>
                <p className="mt-3 max-w-4xl text-pretty leading-7 text-muted-foreground">
                  {labSummaries.find((entry) => entry.lab === activeLab)?.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button onClick={goHome} size="sm" variant="outline">
                    <ChevronLeft className="h-4 w-4" /> Back to home
                  </Button>
                  <Button
                    onClick={() => navigateTo(overviewSectionForLab(activeLab)?.id ?? 'sf-overview')}
                    size="sm"
                    variant="ghost"
                  >
                    Re-read this lab's overview
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="w-full space-y-8 px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
            {visibleSections.length > 0 && (
              <div className="flex items-center justify-end">
                <Button
                  aria-label={someVisibleExpanded ? 'Collapse all steps' : 'Expand all steps'}
                  onClick={toggleVisibleSections}
                  size="icon"
                  title={someVisibleExpanded ? 'Collapse all steps' : 'Expand all steps'}
                  variant="outline"
                >
                  {someVisibleExpanded ? (
                    <ChevronsDownUp className="h-4 w-4" />
                  ) : (
                    <ChevronsUpDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
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

            {visibleIds.has('sf-overview') && (
              <WorkshopCard section={sectionById('sf-overview')}>
                <p className="leading-7">
                  Federal agencies run on standard forms. An SF1449 alone carries the vendor, the contract number,
                  the line items and the pricing, and someone has to get those values out of a PDF and into a
                  system before any of it can be actioned. Typing them by hand is slow and quietly error-prone.
                </p>
                <p className="leading-7">
                  This track uses a document extraction model that has already been trained on 83 SF1449 forms.
                  You will see how it was taught, check how accurate it is, then point an automation at it, run it
                  over four real forms, and approve every value it pulls.
                </p>
                <DuPipelineDiagram />
                <LabStages lab="Automated SF Processing" />
                <AccountSetup />
                <EnterLabButton lab="Automated SF Processing" />
              </WorkshopCard>
            )}

            <GroupDivider
              label="Extract the data"
              show={groupVisible('Automated SF Processing', 'Extract the data')}
            />

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
                    FMS Training has already been through that across 83 documents. This track is about reading a trained model
                    and then using it, not producing one.
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
                    This automation finishes on its own and leaves the actions queued for a person to pick up later.
                    The alternative is a process that waits for its reviewer before carrying on. Both are valid
                    human checkpoints; which one you want depends on whether the rest of the work can proceed
                    without the answer.
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
                  <AlertTitle>Track complete</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    You have seen how an extraction model is trained and scored, consumed a deployed version of it
                    from an automation, and put a human approval step in front of every value it pulled. Extracted
                    values like these can be written to variables, pushed into Excel, or handed to another
                    automation from here.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('foia-overview') && (
              <WorkshopCard section={sectionById('foia-overview')}>
                <p className="leading-7">
                  A Freedom of Information Act request obliges an agency to release its records, but not the parts
                  of them that law protects - trade secrets, pre-decisional advice, personal privacy, and several
                  other categories. Someone has to read every page, decide what must be withheld, cite the
                  statutory exemption that justifies each decision, and produce a copy with those passages
                  blacked out. It is slow, and it carries legal consequences when it goes wrong.
                </p>
                <p className="leading-7">
                  This track hands you that process already built as a Maestro workflow, with an agent doing the
                  reading and a person keeping the decisions.
                </p>
                <MaestroPipelineDiagram />
                <Alert>
                  <FileCheck2 className="h-4 w-4" />
                  <AlertTitle>What you will actually change</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Only three things are missing from the template, and you will fill them in that order: who the
                    review tasks go to, the policy source the agent reasons from, and the vocabulary it labels
                    findings with. Then you run the same document twice - once before those last two are in place
                    and once after - so the difference is something you see rather than something you are told.
                  </AlertDescription>
                </Alert>
                <div className="rounded-2xl border bg-muted/20 p-5 sm:p-6">
                  <Badge className="mb-3" variant="secondary">Sample documents</Badge>
                  <h3 className="text-lg font-semibold">The FOIA Reading Room</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Every document this workflow can redact lives in the Reading Room. It is the sample document
                    repository step 1 of the pipeline searches - open it and browse before you run anything, so you
                    know what is actually in there.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    You supply a <code>documentSearchTerm</code> when you run the process. That term is matched
                    against both the <strong className="text-foreground">file name</strong> and the
                    <strong className="text-foreground"> document contents</strong>, so a word that appears only
                    inside a document still finds it. A term that matches nothing in the Reading Room returns no
                    documents and the run ends early, so check here first rather than guessing.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button asChild size="sm" variant="outline">
                      <a href={readingRoomUrl} rel="noreferrer" target="_blank">
                        Open the FOIA Reading Room <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      This track uses <code>geothermal</code>, which matches one document with three findings.
                    </span>
                  </div>
                </div>
                <AccountSetup />
                <EnterLabButton lab="Agentic FOIA Redaction" />
              </WorkshopCard>
            )}

            <GroupDivider
              label="Set up the solution"
              show={groupVisible('Agentic FOIA Redaction', 'Set up the solution')}
            />

            {visibleIds.has('project-setup') && (
              <WorkshopCard
                completed={completed.has('project-setup')}
                onComplete={(checked) => toggleComplete('project-setup', checked)}
                section={sectionById('project-setup')}
              >
                <Checklist items={steps.foiaSetup} />
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Rename your copy</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Give the solution a name that includes your own, such as <strong>FOIA Redaction Workshop - YourInitials</strong>. Everyone in the room starts from the same template, so an unnamed copy is hard to find again.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('review-routing') && (
              <WorkshopCard
                completed={completed.has('review-routing')}
                onComplete={(checked) => toggleComplete('review-routing', checked)}
                section={sectionById('review-routing')}
              >
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertTitle>You need two different identities here</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Your workshop tenant account has no mailbox. It can hold a review task but it can never receive an email. Put one identity in each field below, and do not paste the same string into both.
                  </AlertDescription>
                </Alert>
                <div className="grid gap-3 md:grid-cols-2">
                  {identityRows.map((row) => (
                    <div className="min-w-0 rounded-xl border bg-muted/25 p-4" key={row.field}>
                      <p className="font-mono text-xs font-medium tracking-tight text-muted-foreground">{row.field}</p>
                      <p className="mt-2 break-words font-semibold">{row.value}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.why}</p>
                    </div>
                  ))}
                </div>
                <Checklist items={steps.foiaRouting} />
              </WorkshopCard>
            )}

            {visibleIds.has('solution-resources') && (
              <WorkshopCard
                completed={completed.has('solution-resources')}
                onComplete={(checked) => toggleComplete('solution-resources', checked)}
                section={sectionById('solution-resources')}
              >
                <Checklist items={steps.foiaResources} />
                <div>
                  <h3 className="mb-3 font-semibold">The seven rows, and what each maps to</h3>
                  <div className="overflow-hidden rounded-xl border">
                    {solutionResourceRows.map((row, index) => (
                      <div
                        className={`flex flex-col gap-1 p-3 sm:flex-row sm:items-center sm:justify-between ${
                          index % 2 === 1 ? 'bg-muted/25' : ''
                        }`}
                        key={row.resource}
                      >
                        <span className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                          {row.kind}
                        </span>
                        <span className="break-words font-mono text-sm font-semibold">
                          Shared / {row.resource}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Verify every row is using the “Shared/” resource</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    A row left on <em>Will be deployed in Debug folder</em> is the single most common reason a first run fails. Highlight each defined resource: if it starts with <code>Shared/</code>, it is good to go.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            <GroupDivider label="Run it by hand" show={groupVisible('Agentic FOIA Redaction', 'Run it by hand')} />

            {visibleIds.has('run-one') && (
              <WorkshopCard
                completed={completed.has('run-one')}
                onComplete={(checked) => toggleComplete('run-one', checked)}
                section={sectionById('run-one')}
              >
                <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                      <Badge className="mb-3" variant="secondary">Baseline run</Badge>
                      <h3 className="text-xl font-semibold">This run is supposed to be tedious.</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        What you are about to run is already roughly half an automated FOIA process. A
                        prompt-based agent proposes the findings, which is not nothing and is further than most
                        FOIA redaction gets today. But it is still manual work: you review every proposed
                        finding and hand-map an exemption code to each one, with no rationale to go on. The
                        rest of the lab takes it further - a grounded agent, mapped to the DOJ FOIA policy
                        documents, proposes the codes and the reasoning too.
                      </p>
                    </div>
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border bg-background text-primary shadow-sm">
                      <Clock3 className="h-9 w-9" />
                    </div>
                  </div>
                </div>
                <Checklist items={steps.foiaRunOne} />
                <div>
                  <h3 className="mb-3 font-semibold">Reasonable picks for this document</h3>
                  <div className="flex flex-wrap gap-2">
                    {['(b)(4) Commercial and Trade Secrets', '(b)(5) Inter/Intra-Agency Privileges', '(b)(9) Geological Data'].map(
                      (code) => (
                        <Badge key={code} variant="outline">
                          {code}
                        </Badge>
                      ),
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    You are not being marked on this. Pick something defensible and move on - in step 7 the agent proposes these same three codes on its own, with a written rationale.
                  </p>
                </div>
              </WorkshopCard>
            )}

            <GroupDivider label="Teach the agent" show={groupVisible('Agentic FOIA Redaction', 'Teach the agent')} />

            {visibleIds.has('agent-context') && (
              <WorkshopCard
                completed={completed.has('agent-context')}
                onComplete={(checked) => toggleComplete('agent-context', checked)}
                section={sectionById('agent-context')}
              >
                <Checklist items={steps.foiaContext} />
                <Alert>
                  <Circle className="h-4 w-4 fill-primary text-primary" />
                  <AlertTitle>Grounding, not training</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Attaching an index does not retrain the model. At run time the agent retrieves the passages it needs from the DOJ policy documents and cites them, which is why the citations in step 7 carry a real index name and page number instead of a placeholder.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            {visibleIds.has('agent-classify') && (
              <WorkshopCard
                completed={completed.has('agent-classify')}
                onComplete={(checked) => toggleComplete('agent-classify', checked)}
                section={sectionById('agent-classify')}
              >
                <Checklist items={steps.foiaClassify} />
                <Alert>
                  <FileCheck2 className="h-4 w-4" />
                  <AlertTitle>Why this gap exists</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    The <code>category</code> field is free text, so the model always writes something. It cannot guess an agency-specific vocabulary it was never given, so it invents a description instead. This is the one gap where a prompt is the only possible fix.
                  </AlertDescription>
                </Alert>
              </WorkshopCard>
            )}

            <GroupDivider label="Run it again" show={groupVisible('Agentic FOIA Redaction', 'Run it again')} />

            {visibleIds.has('run-two') && (
              <WorkshopCard
                completed={completed.has('run-two')}
                onComplete={(checked) => toggleComplete('run-two', checked)}
                section={sectionById('run-two')}
              >
                <Checklist items={steps.foiaRunTwo} />
                <div>
                  <h3 className="mb-3 font-semibold">Your vocabulary, mapped to statute</h3>
                  <p className="mb-3 text-sm leading-6 text-muted-foreground">
                    The six categories you authored in step 6 line up with the exemption families the grounded agent proposes here. This is where the two halves of the workshop meet.
                  </p>
                  <div className="overflow-hidden rounded-xl border">
                    {categoryExemptionMap.map((row, index) => (
                      <div
                        className={`flex flex-col gap-1 p-3 sm:flex-row sm:items-center sm:justify-between ${
                          index % 2 === 1 ? 'bg-muted/25' : ''
                        }`}
                        key={row.category}
                      >
                        <span className="font-semibold">{row.category}</span>
                        <span className="font-mono text-sm text-muted-foreground">{row.exemption}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertTitle>The person still decides</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    Nothing here removed the human. The agent went from proposing passages to proposing passages, categories, statutory codes and citations, and a reviewer still approved every redaction before the document was produced. What changed is how much of the reviewer time went into clerical work.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertTitle>Extrapolate to your day-to-day</AlertTitle>
                  <AlertDescription className="mt-1 leading-6">
                    The pattern you just built is not specific to FOIA: find the documents, have an agent propose
                    judgments along with its reasoning and its sources, keep a person in the approval seat, then
                    act on the result. Go looking for that pattern in your own week - anywhere you read something,
                    decide against a policy or a rule, and record the decision. The half worth handing over is
                    usually the clerical one, where you already know the answer and are only typing it in. And
                    notice what moved today: before this lab, “read the document and choose the right statutory
                    exemption, with a citation” probably sounded like something only a person could do.
                  </AlertDescription>
                </Alert>
                {progress >= 100 && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Workshop complete</AlertTitle>
                    <AlertDescription className="mt-1 leading-6">
                      You routed the work to yourself, ran a FOIA redaction end to end by hand, gave the agent a policy source and a vocabulary, and produced the same document again with the clerical work removed.
                    </AlertDescription>
                  </Alert>
                )}
              </WorkshopCard>
            )}

            <GroupDivider label="Optional" show={groupVisible('Agentic FOIA Redaction', 'Optional')} />

            {visibleIds.has('going-further') && (
              <WorkshopCard section={sectionById('going-further')}>
                <p className="leading-7">
                  Nothing below is required and none of it is graded. These are the threads worth pulling if
                  you have time left over, roughly in order of how quickly they pay off.
                </p>
                <ol className="space-y-4">
                  {goingFurtherIdeas.map((idea, index) => (
                    <li className="flex min-w-0 gap-3" key={idea.title}>
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{idea.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{idea.prompt}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </WorkshopCard>
            )}

            {visibleSections.length === 0 && (
              <Card className="border-dashed py-10 text-center">
                <CardContent>
                  <Search className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h2 className="mt-4 text-lg font-semibold">No workshop steps found</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Try a term like “prompt,” “debug,” “autopilot,” or “assignee.” Search covers both labs.</p>
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
      {lightbox && (
        <Lightbox
          index={lightbox.index}
          items={lightbox.items}
          onClose={() => setLightbox(null)}
          onStep={stepLightbox}
        />
      )}
    </div>
    </SectionCollapseContext.Provider>
    </LightboxContext.Provider>
    </LabNavContext.Provider>
  )
}
