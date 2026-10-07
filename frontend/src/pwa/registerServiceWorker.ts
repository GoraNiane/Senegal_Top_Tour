/**
 * Service Worker Registration & PWA Install Prompt Hook
 */

export function registerSW() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('✨ [PWA] Service Worker registered with scope:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('🔄 [PWA] New version available! Refresh to update.');
                  } else {
                    console.log('⚡ [PWA] Content is cached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('⚠️ [PWA] Service Worker registration failed:', error);
        });
    });
  }
}
