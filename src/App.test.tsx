import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { progressSections, stepsInLab, workshopSections } from './workshopData'
import { AppThemeProvider } from './components/Theme'

function renderApp() {
  return render(
    <AppThemeProvider>
      <App />
    </AppThemeProvider>,
  )
}

const LAB_TABS = ['1. Automated SF Processing', '2. Agentic FOIA Redaction'] as const

// The guide is three pages behind one URL: home, and one page per lab. Anything
// asserting on a numbered step has to open that step's lab first.
async function openLab(user: ReturnType<typeof userEvent.setup>, tab: (typeof LAB_TABS)[number]) {
  await user.click(screen.getByRole('button', { name: tab }))
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Back to home' })).toBeInTheDocument()
  })
}

// Overviews start folded on the home page, so their body has to be opened before
// anything inside them can be asserted on.
async function expandSection(user: ReturnType<typeof userEvent.setup>, heading: string) {
  await user.click(screen.getByRole('button', { name: heading }))
  await waitFor(() => {
    expect(screen.getByRole('button', { name: heading })).toBeInTheDocument()
  })
}

describe('Agentic Redaction Workshop', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the home page, both lab overviews, and the resource links', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(screen.getAllByAltText('UiPath logo')).not.toHaveLength(0)
    expect(screen.getAllByAltText('FMS-3: AI and Analytics logo')).not.toHaveLength(0)
    expect(screen.getAllByText('FMS-3: AI and Analytics')).not.toHaveLength(0)
    expect(screen.queryByRole('img', { name: 'Customer logo placeholder' })).not.toBeInTheDocument()
    expect(screen.getByText('Hosted by the UiPath SE Team')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Two hands-on labs: automated forms, and agentic redaction' }),
    ).toBeInTheDocument()

    // Each lab stands alone, so each introduces itself on the home page.
    expect(screen.getByRole('heading', { name: 'Automated SF Processing overview' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Agentic FOIA Redaction overview' })).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /UiPath Academy/ })).toHaveAttribute(
      'href',
      'https://academy.uipath.com/',
    )
    expect(screen.getAllByRole('link', { name: /Open UiPath/ })[0]).toHaveAttribute(
      'href',
      'https://www.uipath.com/',
    )
    expect(screen.queryByText('Open Staging')).not.toBeInTheDocument()

    await expandSection(user, 'Automated SF Processing overview')
    await expandSection(user, 'Agentic FOIA Redaction overview')

    // Both overviews carry the account block, so the join link appears once each.
    expect(screen.getAllByRole('link', { name: /Join the workshop/ })).toHaveLength(2)
    expect(screen.getAllByRole('link', { name: /Join the workshop/ })[0]).toHaveAttribute(
      'href',
      'https://uipathlabs.uipath.com/join/B6Z8ZV8J',
    )
    expect(screen.getAllByText('B6Z8ZV8J')).not.toHaveLength(0)
    expect(screen.getAllByText(/Continue with Microsoft/)).not.toHaveLength(0)
    expect(screen.getByRole('link', { name: /Open the FOIA Reading Room/ })).toHaveAttribute(
      'href',
      'https://uipathlabstraining.uipath.host/foia-reading-room',
    )
  })

  it('starts the home page with both lab overviews folded', () => {
    renderApp()

    expect(screen.getByRole('heading', { name: 'Agentic FOIA Redaction overview' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Open Lab 2/ })).not.toBeInTheDocument()
  })

  it('folds the cards from the icon control, separately from the outline', async () => {
    const user = userEvent.setup()
    renderApp()
    await openLab(user, '2. Agentic FOIA Redaction')

    expect(screen.getByText('Rename your copy')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Collapse all steps' }))
    await waitFor(() => {
      expect(screen.queryByText('Rename your copy')).not.toBeInTheDocument()
    })
    // The outline is untouched by the card control.
    expect(screen.getAllByRole('button', { name: '1. Project setup' })).not.toHaveLength(0)

    await user.click(screen.getByRole('button', { name: 'Expand all steps' }))
    await waitFor(() => {
      expect(screen.getByText('Rename your copy')).toBeInTheDocument()
    })
  })

  it('keeps the guided steps off the home page', () => {
    renderApp()

    expect(screen.queryByRole('heading', { name: 'Tour the trained SF1449 model' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Create your workshop solution' })).not.toBeInTheDocument()
  })

  it('renders a card for every section across the home page and both labs', async () => {
    const user = userEvent.setup()
    renderApp()

    // Home carries each lab's overview; everything else lives in its lab.
    for (const section of workshopSections.filter((entry) => entry.group === 'Overview')) {
      expect(screen.getByRole('heading', { name: section.title })).toBeInTheDocument()
    }

    for (const tab of LAB_TABS) {
      await openLab(user, tab)
      const lab = tab === LAB_TABS[0] ? 'Automated SF Processing' : 'Agentic FOIA Redaction'
      const inLab = workshopSections.filter((entry) => entry.lab === lab && entry.group !== 'Overview')
      expect(inLab.length).toBeGreaterThan(0)
      for (const section of inLab) {
        expect(screen.getByRole('heading', { name: section.title })).toBeInTheDocument()
      }
    }
  })

  it('shows one lab at a time', async () => {
    const user = userEvent.setup()
    renderApp()

    await openLab(user, '2. Agentic FOIA Redaction')
    expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Tour the trained SF1449 model' })).not.toBeInTheDocument()

    await openLab(user, '1. Automated SF Processing')
    expect(screen.getByRole('heading', { name: 'Tour the trained SF1449 model' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Create your workshop solution' })).not.toBeInTheDocument()
  })

  it('scopes the progress bar to the page you are on', async () => {
    const user = userEvent.setup()
    renderApp()

    // The sidebar shows a per-lab count too, so read the count next to the label.
    const homeLabel = screen.getByText('Overall progress')
    expect(homeLabel.parentElement?.textContent).toContain(`0/${progressSections.length}`)

    await openLab(user, '2. Agentic FOIA Redaction')
    const labLabel = screen.getByText('Lab 2 progress')
    expect(labLabel.parentElement?.textContent).toContain(
      `0/${stepsInLab('Agentic FOIA Redaction').length}`,
    )
    expect(screen.queryByText('Overall progress')).not.toBeInTheDocument()
  })

  it('returns to the home page from a lab', async () => {
    const user = userEvent.setup()
    renderApp()

    await openLab(user, '1. Automated SF Processing')
    await user.click(screen.getByRole('button', { name: 'Back to home' }))

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Two hands-on labs: automated forms, and agentic redaction' }),
      ).toBeInTheDocument()
    })
  })

  it('opens a lab from the overview card on the home page', async () => {
    const user = userEvent.setup()
    renderApp()

    await expandSection(user, 'Agentic FOIA Redaction overview')
    await user.click(screen.getByRole('button', { name: /Open Lab 2/ }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
    })
  })

  it('hides and restores the outline sidebar', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /Hide outline/ }))
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /Hide outline/ })).not.toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Show outline' }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Hide outline/ })).toBeInTheDocument()
    })
  })

  it('collapses a lab outline in the sidebar', async () => {
    const user = userEvent.setup()
    renderApp()

    const outline = screen.getByRole('button', { name: /Lab 2 · Agentic FOIA Redaction/ })
    expect(screen.getAllByRole('button', { name: '1. Project setup' })).not.toHaveLength(0)

    await user.click(outline)
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: '1. Project setup' })).not.toBeInTheDocument()
    })
  })

  it('keeps the optional section inside lab 2, outside its step count', async () => {
    const user = userEvent.setup()
    renderApp()

    // Optional, so it is not on the home page and not in the progress total.
    expect(screen.queryByRole('heading', { name: 'Going further' })).not.toBeInTheDocument()
    expect(stepsInLab('Agentic FOIA Redaction').some((s) => s.id === 'going-further')).toBe(false)

    await openLab(user, '2. Agentic FOIA Redaction')
    expect(screen.getByRole('heading', { name: 'Going further' })).toBeInTheDocument()
    // Folded by default, and it carries no completion checkbox.
    expect(screen.queryByLabelText('Mark Going further complete')).not.toBeInTheDocument()
  })

  it('drops saved progress for sections that no longer exist', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      'agentic-redaction-workshop-progress',
      JSON.stringify([...progressSections.map((section) => section.id), 'removed-step']),
    )
    renderApp()

    expect(
      screen.getByText(`${progressSections.length}/${progressSections.length} complete`),
    ).toBeInTheDocument()

    // The completion banner lives on the last step of lab 2.
    await openLab(user, '2. Agentic FOIA Redaction')
    expect(screen.getByText('Workshop complete')).toBeInTheDocument()
  })

  it('collapses a section from its heading and reopens it', async () => {
    const user = userEvent.setup()
    renderApp()
    await openLab(user, '2. Agentic FOIA Redaction')

    expect(screen.getByText('Rename your copy')).toBeInTheDocument()

    const toggle = screen.getByRole('button', { name: 'Create your workshop solution' })
    await user.click(toggle)
    await waitFor(() => {
      expect(screen.queryByText('Rename your copy')).not.toBeInTheDocument()
    })

    await user.click(toggle)
    await waitFor(() => {
      expect(screen.getByText('Rename your copy')).toBeInTheDocument()
    })
  })

  it('opens a screenshot in the viewer and steps through with the arrow keys', async () => {
    const user = userEvent.setup()
    renderApp()
    await openLab(user, '2. Agentic FOIA Redaction')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: /^View larger/ })[0])

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/^1 of \d+ ·/)).toBeInTheDocument()

    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(screen.getByText(/^2 of \d+ ·/)).toBeInTheDocument()
    })

    await user.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(screen.getByText(/^1 of \d+ ·/)).toBeInTheDocument()
    })

    // Key repeat fires several events before a re-render. Each has to advance the
    // index, rather than all of them reading the same stale one and collapsing
    // into a single move.
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')
    await waitFor(() => {
      expect(screen.getByText(/^4 of \d+ ·/)).toBeInTheDocument()
    })

    // Stepping back off the first figure wraps to the last.
    await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}{ArrowLeft}')
    await waitFor(() => {
      const total = document.querySelectorAll('[data-lightbox-src]').length
      expect(screen.getByText(new RegExp(`^${total} of ${total} ·`))).toBeInTheDocument()
    })
  })

  it('collapses a step when it is marked complete', async () => {
    const user = userEvent.setup()
    renderApp()
    await openLab(user, '2. Agentic FOIA Redaction')

    expect(screen.getByText('Rename your copy')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Mark Project setup complete'))

    await waitFor(() => {
      expect(screen.queryByText('Rename your copy')).not.toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
  })

  it('marks a step complete from the button at the foot of the step', async () => {
    const user = userEvent.setup()
    renderApp()
    await openLab(user, '1. Automated SF Processing')

    const footButtons = screen.getAllByRole('button', { name: /^Mark complete$/ })
    expect(footButtons.length).toBeGreaterThan(0)
    await user.click(footButtons[0])

    await waitFor(() => {
      expect(localStorage.getItem('agentic-redaction-workshop-progress')).toContain('du-model')
    })
    expect(screen.getByText(`1/${progressSections.length} complete`)).toBeInTheDocument()
  })

  it('searches across both labs from the home page', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText('Search workshop content'), 'autopilot')

    // A hit in a lab you are not currently on is still the answer you wanted.
    expect(screen.getByRole('heading', { name: 'Teach the agent your vocabulary' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Two hands-on labs: automated forms, and agentic redaction' }),
    ).not.toBeInTheDocument()
  })

  it('clears an active search when a sidebar shortcut points at a hidden step', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText('Search workshop content'), 'autopilot')
    expect(screen.queryByRole('heading', { name: 'Create your workshop solution' })).not.toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: '1. Project setup' })[0])

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
    })
  })

  it('saves completed steps in browser storage', async () => {
    const user = userEvent.setup()
    renderApp()
    await openLab(user, '2. Agentic FOIA Redaction')

    await user.click(screen.getByLabelText('Mark Project setup complete'))

    await waitFor(() => {
      expect(localStorage.getItem('agentic-redaction-workshop-progress')).toContain('project-setup')
    })
    expect(screen.getByText(`1/${progressSections.length} complete`)).toBeInTheDocument()
  })
})
