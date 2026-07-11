import { useSyncExternalStore } from 'react'

function getServerSnapshot(): boolean {
  return false
}

/**
 * SSR-safe media query hook. Server and first client render both return
 * `false` (no mismatch); after mount it subscribes to `matchMedia` changes.
 */
export function useMediaQuery(query: string): boolean {
  function subscribe(callback: () => void) {
    const mediaQueryList = window.matchMedia(query)
    mediaQueryList.addEventListener('change', callback)
    return () => mediaQueryList.removeEventListener('change', callback)
  }

  function getSnapshot(): boolean {
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
