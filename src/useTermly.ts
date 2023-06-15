import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import equal from 'fast-deep-equal';
import { TermlyConsentState, TermlyRef } from './TermlyRef.js';

export function useTermly() {
  const [consentState, setConsentState] = useState<TermlyConsentState>(TermlyRef.consentState);

  const displayPreferenceModal = useCallback(() => {
    window.displayPreferenceModal();
  }, []);

  useEffect(() => TermlyRef.subscribe((data) => {
    if (!equal(data, consentState)) {
      setConsentState(data);
    }
  }), [consentState]);

  return useMemo(() => ({
    consentState,
    displayPreferenceModal,
  }), [consentState, displayPreferenceModal]);
}
