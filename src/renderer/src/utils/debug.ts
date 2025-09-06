export function isDebugModeEnabled(): boolean {
  // Check environment variable first
  if (import.meta.env.VITE_DEBUG_MODE === 'true') {
    return true;
  }

  // Check URL parameters (for web deployments)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'true') {
      return true;
    }
  }

  // Check localStorage override
  if (typeof window !== 'undefined') {
    return localStorage.getItem('debug-mode') === 'true';
  }

  return false;
}

export function shouldShowSidebar(): boolean {
  return (
    import.meta.env.VITE_SHOW_SIDEBAR === 'true' || 
    isDebugModeEnabled()
  );
}
