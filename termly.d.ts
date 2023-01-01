interface Window {
  displayPreferenceModal: () => void
  getUpdatedCookieWhitelistByTermly?: (data: {
    categories: string[]
    cookies: {
      name: string
      provider: string
      type: string
    }[]
    uuid: string
  }) => void
  Termly: {
    getConsentState: () => ({
      advertising: boolean
      analytics: boolean
      essential: boolean
      performance: boolean
      social_networking: boolean
      unclassified: boolean
    } | undefined)
  }
}
