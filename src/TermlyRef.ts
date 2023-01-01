export type TermlyConsentState = {
  advertising: boolean
  analytics: boolean
  essential: boolean
  performance: boolean
  social_networking: boolean
  unclassified: boolean
};
type TermlyHandler = (data: TermlyConsentState) => void;

const defaultConsentState: TermlyConsentState = {
  advertising: false,
  analytics: false,
  essential: false,
  performance: false,
  social_networking: false,
  unclassified: false,
};

export const TermlyRef = {
  $subscribers: new Set<TermlyHandler>(),
  consentState: (typeof window !== 'undefined' ? window.Termly.getConsentState() : undefined) ?? defaultConsentState,
  subscribe: (handler: TermlyHandler) => {
    handler(TermlyRef.consentState);
    TermlyRef.$subscribers.add(handler);
    return () => {
      TermlyRef.$subscribers.delete(handler);
    };
  },
};

if (typeof window !== 'undefined') {
  window.getUpdatedCookieWhitelistByTermly = () => {
    TermlyRef.consentState = window.Termly.getConsentState() ?? defaultConsentState;
    TermlyRef.$subscribers.forEach((handler) => {
      handler(TermlyRef.consentState);
    });
  };
}
