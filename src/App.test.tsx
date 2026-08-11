import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
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
    expect(screen.getAllByAltText('Defense Contract Management Agency logo')).not.toHaveLength(0)
    expect(screen.queryByRole('img', { name: 'Customer logo placeholder' })).not.toBeInTheDocument()
    expect(screen.getByText('Hosted by the UiPath SE Team')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Build a human-reviewed FOIA redaction workflow' }),
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
      'https://uipathlabs.uipath.com/join/KJ8ARRBU',
    )
    expect(screen.getAllByText('KJ8ARRBU')).not.toHaveLength(0)
    expect(screen.getAllByText(/Continue with Microsoft/)).not.toHaveLength(0)
    expect(screen.getByRole('heading', { name: 'Create your workshop solution' })).toBeInTheDocument()
  })

  it('filters the guide by workshop content', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText('Search workshop content'), 'wildcard')

    expect(screen.getByRole('heading', { name: 'Find the redacted document' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Create your workshop solution' })).not.toBeInTheDocument()
  })

  it('saves completed steps in browser storage', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByLabelText('Mark Project setup complete'))

    await waitFor(() => {
      expect(localStorage.getItem('agentic-redaction-workshop-progress')).toContain('project-setup')
    })
    expect(screen.getByText('1/9 complete')).toBeInTheDocument()
  })
})
