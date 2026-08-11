import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
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
import { workshopBranding } from './branding'
import {
  agentTestInput,
  autopilotPrompt,
  groups,
  piiSummaryDescription,
  progressSections,
  systemPrompt,
  toolDescription,
  workflowStages,
  workshopSections,
  type WorkshopSection,
} from './workshopData'

const PROGRESS_KEY = 'agentic-redaction-workshop-progress'

const uipathHomeUrl = 'https://www.uipath.com/'
const uipathAcademyUrl = 'https://academy.uipath.com/'
const workshopJoinUrl = 'https://uipathlabs.uipath.com/join/KJ8ARRBU'

function BrandLockup({ compact = false }: { compact?: boolean }) {
  const customerLogo = workshopBranding.customer.logoSrc

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
            compact ? 'h-11 w-28' : 'h-16 w-40'
          }`}
        >
          <img
            alt={`${workshopBranding.customer.name} logo`}
            className="max-h-full max-w-full object-contain"
            src={customerLogo}
          />
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

function Checklist({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li className="flex min-w-0 gap-3" key={item}>
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {index + 1}
          </span>
          <span className="min-w-0 pt-0.5 text-sm leading-6 text-muted-foreground">{item}</span>
        </li>
      ))}
    </ol>
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
  return (
    <figure className="overflow-hidden rounded-xl border bg-muted/20">
      <a className="block bg-slate-950/95" href={src} rel="noreferrer" target="_blank">
        <img
          alt={alt}
          className="max-h-[38rem] w-full object-contain"
          loading="lazy"
          src={src}
        />
      </a>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs leading-5 text-muted-foreground">
        <span>{caption}</span>
        <a className="font-medium text-primary hover:underline" href={src} rel="noreferrer" target="_blank">
          Open full size
        </a>
      </figcaption>
    </figure>
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
  const Icon = section.icon

  return (
    <section className="scroll-mt-24" id={section.id}>
      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardHeader className="border-b bg-muted/25 p-5 sm:p-6">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  {section.step && <Badge variant="secondary">Step {section.step}</Badge>}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" /> {section.duration}
                  </span>
                </div>
                <h2 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{section.title}</h2>
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
        <CardContent className="space-y-6 p-5 sm:p-6">{children}</CardContent>
      </Card>
    </section>
  )
}

export default function App() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]') as string[])
    } catch {
      return new Set()
    }
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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

  const visibleIds = useMemo(() => new Set(visibleSections.map((section) => section.id)), [visibleSections])
  const completeCount = completed.size
  const progress = Math.round((completeCount / progressSections.length) * 100)

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]))
  }, [completed])

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
  }

  function navigateTo(id: string) {
    setMobileNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function resetProgress() {
    setCompleted(new Set())
  }

  const nav = (
    <nav aria-label="Workshop steps" className="space-y-5">
      {groups.map((group) => {
        const sections = workshopSections.filter((section) => section.group === group)
        return (
          <div key={group}>
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group}
            </p>
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
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
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Icon className="h-4 w-4 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate" title={section.shortTitle}>
                      {section.shortTitle}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-3 px-4 sm:px-6">
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
            {nav}
          </div>
        </SheetContent>
      </Sheet>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[280px_minmax(0,1fr)]">
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
                  Build a human-reviewed FOIA redaction workflow
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                  Configure a PII agent, connect it to a structured process, validate its findings, and retrieve a redacted document—all in one guided path.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button onClick={() => navigateTo(completed.size ? progressSections.find((item) => !completed.has(item.id))?.id ?? 'download' : 'project-setup')} size="lg">
                    {completed.size ? 'Resume workshop' : 'Start workshop'} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ['9 guided steps', 'Clear checkpoints from setup to download'],
                  ['About 75 minutes', 'Work at your pace; progress is saved'],
                  ['Human in the loop', 'Review every proposed redaction before finalizing'],
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
              <WorkshopCard section={workshopSections[0]}>
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
                          Open the registration page, enter your name, and use workshop code <strong>KJ8ARRBU</strong> if prompted.
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
                        Workshop code: <strong className="text-foreground">KJ8ARRBU</strong>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      During the exercises, use resources under the <strong className="text-foreground">Shared</strong> folder whenever a debug profile asks you to resolve dependencies.
                    </p>
                  </AlertDescription>
                </Alert>
                <div>
                  <h3 className="mb-4 font-semibold">What you will build</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {workflowStages.map(({ label, detail, icon: Icon }, index) => (
                      <div className="relative rounded-xl border bg-muted/20 p-4" key={label}>
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                        </div>
                        <p className="font-semibold">{label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </WorkshopCard>
            )}

            {visibleIds.has('project-setup') && (
              <WorkshopCard
                completed={completed.has('project-setup')}
                onComplete={(checked) => toggleComplete('project-setup', checked)}
                section={workshopSections[1]}
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
                section={workshopSections[2]}
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
                section={workshopSections[3]}
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
                section={workshopSections[4]}
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
                section={workshopSections[5]}
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
                section={workshopSections[6]}
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
                section={workshopSections[7]}
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
                section={workshopSections[8]}
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
                section={workshopSections[9]}
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
                {progress === 100 && (
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
  )
}
