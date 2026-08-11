import customerLogoSrc from './assets/dcma-logo-transparent.png'
import uipathLogoSrc from './assets/uipath-wordmark.svg'

interface WorkshopBrandingConfig {
  uipath: {
    name: string
    logoSrc: string
  }
  customer: {
    name: string
    logoSrc: string | null
    placeholderLabel: string
  }
  creditLine: string
}

// To reuse this workshop for a customer, import their logo above and update
// customer.name and customer.logoSrc. The UI automatically replaces the placeholder.
export const workshopBranding: WorkshopBrandingConfig = {
  uipath: {
    name: 'UiPath',
    logoSrc: uipathLogoSrc,
  },
  customer: {
    name: 'Defense Contract Management Agency',
    logoSrc: customerLogoSrc,
    placeholderLabel: 'Customer logo',
  },
  creditLine: 'Hosted by the UiPath SE Team',
}
