const isElectron = window.api !== undefined;

const getAppHeight = () => {
  if (typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
    return `${window.innerHeight}px`;
  }
  return isElectron ? 'calc(100vh - 30px)' : '100vh';
};



export const layoutStyles = {
  appContainer: {
    width: '100vw',
    height: getAppHeight(),
    bg: 'transparent', // Make completely transparent
    color: 'white',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    mt: isElectron ? '30px' : '0',
  },
  sidebar: {
    position: 'relative' as const,
    width: { base: '100%', md: '440px' },
    height: { base: 'auto', md: '100%' },
    bg: 'gray.800',
    borderRight: '1px solid',
    borderColor: 'whiteAlpha.200',
    overflow: 'hidden',
    flexShrink: 0,
    transition: 'all 0.2s',
  },
  mainContent: {
    flex: 1,
    height: '100%', // Change to full height
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100%',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute', // Make canvas absolute to cover full container
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', // Cover full height including footer area
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    willChange: 'transform',
  },
  footer: {
    width: '100%',
    height: { base: '100px', md: '120px' },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform',
    position: 'absolute', // Make footer absolute to float over canvas
    bottom: 0,
    left: 0,
    zIndex: 10, // Increase z-index to stay above background
    bg: 'transparent', // Keep footer background transparent
  },
  toggleButton: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '60px',
    bg: 'whiteAlpha.100',
    _hover: { bg: 'whiteAlpha.200' },
    borderLeftRadius: 0,
    borderRightRadius: 'md',
    zIndex: 10,
  },
  canvasHeight: () => ({
    height: '100%', // Canvas always covers full height, footer floats over it
  }),
  sidebarToggleButton: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '60px',
    bg: 'gray.800',
    borderLeftRadius: 0,
    borderRightRadius: 'md',
    zIndex: 10,
  },
  collapsedFooter: {
    height: { base: '20px', md: '24px' },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  windowsTitleBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30px',
    backgroundColor: 'gray.800',
    paddingX: '10px',
    zIndex: 1000,
    css: { '-webkit-app-region': 'drag' },
  },
  macTitleBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30px',
    backgroundColor: 'gray.800',
    zIndex: 1000,
    css: {
      '-webkit-app-region': 'drag',
      '-webkit-user-select': 'none',
    },
  },
  titleBarTitle: {
    fontSize: 'sm',
    color: 'whiteAlpha.800',
    textAlign: 'center',
  },
  titleBarButtons: {
    display: 'flex',
    gap: '1',
  },
  titleBarButton: {
    size: 'sm',
    variant: 'ghost',
    color: 'whiteAlpha.800',
    css: { '-webkit-app-region': 'no-drag' },
    _hover: { backgroundColor: 'whiteAlpha.200' },
  },
  closeButton: {
    size: 'sm',
    variant: 'ghost',
    color: 'whiteAlpha.800',
    css: { '-webkit-app-region': 'no-drag' },
    _hover: { backgroundColor: 'red.500' },
  },
} as const;
