import customerLogoSrc from './assets/fms3-logo.png'
import uipathLogoSrc from './assets/uipath-wordmark.svg'

interface WorkshopBrandingConfig {
  uipath: {
    name: string
    logoSrc: string
  }
  customer: {
    name: string
    logoSrc: string | null
    wordmark: string | null
    placeholderLabel: string
  }
  creditLine: string
}

// To reuse this workshop for a customer, import their logo above and update
// customer.name and customer.logoSrc. The UI automatically replaces the placeholder.
// Set customer.wordmark when the logo is a mark only and needs the division name
// beside it; set it to null when the logo already contains the name.
export const workshopBranding: WorkshopBrandingConfig = {
  uipath: {
    name: 'UiPath',
    logoSrc: uipathLogoSrc,
  },
  customer: {
    name: 'FMS-3: AI and Analytics',
    logoSrc: customerLogoSrc,
    wordmark: 'FMS-3: AI and Analytics',
    placeholderLabel: 'Customer logo',
  },
  creditLine: 'Hosted by the UiPath SE Team',
}
