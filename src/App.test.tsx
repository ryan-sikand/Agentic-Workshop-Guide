import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { progressSections, workshopSections } from './workshopData'
import { AppThemeProvider } from './components/Theme'

function renderApp() {
  return render(
    <AppThemeProvider>
      <App />
    </AppThemeProvider>,
  )
}

describe('Agentic Redaction Workshop', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the workshop journey and resource links', () => {
    renderApp()

    expect(screen.getAllByAltText('UiPath logo')).not.toHaveLength(0)
    expect(screen.getAllByAltText('FMS-3: AI and Analytics logo')).not.toHaveLength(0)
    expect(screen.getAllByText('FMS-3: AI and Analytics')).not.toHaveLength(0)
    expect(screen.queryByRole('img', { name: 'Customer logo placeholder' })).not.toBeInTheDocument()
    expect(screen.getByText('Hosted by the UiPath SE Team')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Learn Document Understanding, then build a redaction workflow' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /UiPath Academy/ })).toHaveAttribute(
      'href',
      'https://academy.uipath.com/',
    )
    expect(screen.getAllByRole('link', { name: /Open UiPath/ })[0]).toHaveAttribute(
      'href',
      'https://www.uipath.com/',
    )
    expect(screen.queryByText('Open Staging')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Join the workshop/ })).toHaveAttribute(
      'href',
      'https://uipathlabs.uipath.com/join/B6Z8ZV8J',
    )
    expect(screen.getAllByText('B6Z8ZV8J')).not.toHaveLength(0)
    expect(screen.getAllByText(/Continue with Microsoft/)).not.toHaveLength(0)
    expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
  })

  it('renders a card for every section in the workshop data', () => {
    renderApp()

    for (const section of workshopSections) {
      expect(screen.getByRole('heading', { name: section.title })).toBeInTheDocument()
    }
  })

  it('drops saved progress for sections that no longer exist', () => {
    localStorage.setItem(
      'agentic-redaction-workshop-progress',
      JSON.stringify([...progressSections.map((section) => section.id), 'removed-step']),
    )
    renderApp()

    expect(
      screen.getByText(`${progressSections.length}/${progressSections.length} complete`),
    ).toBeInTheDocument()
    expect(screen.getByText('Workshop complete')).toBeInTheDocument()
  })

  it('collapses a section from its heading and reopens it', async () => {
    const user = userEvent.setup()
    renderApp()

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

  it('opens a screenshot in a dialog instead of a new tab', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: /^View larger/ })[0])

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('collapses a step when it is marked complete', async () => {
    const user = userEvent.setup()
    renderApp()

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

    const footButtons = screen.getAllByRole('button', { name: /^Mark complete$/ })
    expect(footButtons.length).toBeGreaterThan(0)
    await user.click(footButtons[0])

    await waitFor(() => {
      expect(localStorage.getItem('agentic-redaction-workshop-progress')).toContain('du-model')
    })
    expect(screen.getByText(`1/${progressSections.length} complete`)).toBeInTheDocument()
  })

  it('clears an active search when a sidebar shortcut points at a hidden step', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText('Search workshop content'), 'autopilot')
    expect(screen.queryByRole('heading', { name: 'Create your workshop solution' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '1. Project setup' }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
    })
  })

  it('filters the guide by workshop content', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText('Search workshop content'), 'autopilot')

    expect(screen.getByRole('heading', { name: 'Teach the agent your vocabulary' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Create your workshop solution' })).not.toBeInTheDocument()
  })

  it('saves completed steps in browser storage', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByLabelText('Mark Project setup complete'))

    await waitFor(() => {
      expect(localStorage.getItem('agentic-redaction-workshop-progress')).toContain('project-setup')
    })
    expect(screen.getByText(`1/${progressSections.length} complete`)).toBeInTheDocument()
  })
})
