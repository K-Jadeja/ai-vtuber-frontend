# VTuber Frontend Documentation

Welcome to the VTuber Frontend documentation. This directory contains comprehensive guides for developers working with the application.

## 📚 Available Documentation

### 🔧 Development & Debugging
- **[Debug Mode Guide](./debug-mode.md)** - Hidden debug features and access methods
  - URL parameter activation
  - Keyboard shortcuts
  - Production debugging
  - Security features

### 🎨 Design & UI
- **[Design System](./design-system.md)** - Glassmorphism UI theme and components
  - Component specifications
  - Color palette
  - Animation guidelines
  - Responsive behavior

### 🌐 Internationalization
- **[i18n Usage](./i18n-usage.md)** - Translation and localization guide

## 🚀 Quick Start

### Debug Mode Access
For developers who need to access debugging tools:

1. **URL Method**: Add `?debug=true` to any URL
2. **Keyboard**: Press `Ctrl + Shift + Alt + D` (or `Cmd + Shift + Alt + D` on Mac)
3. **Console**: `localStorage.setItem('vtuber-debug', 'true'); location.reload();`

### UI Customization
The interface uses a glassmorphism design system. Key features:
- Semi-transparent elements with backdrop blur
- Smooth animations and transitions
- Responsive design for all screen sizes
- Accessibility-compliant contrast ratios

## 🔒 Security Notes

- Debug mode is completely hidden from regular users
- No console logs or traces when toggling debug features
- Safe for production use without performance impact
- All debug UI is conditionally rendered (not just hidden)

## 🛠️ Development Workflow

1. **Local Development**: Use `npm run dev` with debug mode enabled
2. **Testing**: Build branch works for both local testing and production
3. **Production**: Debug mode can be enabled on-demand for troubleshooting

## 📱 Supported Platforms

- **Desktop**: Electron application with full feature set
- **Web**: Browser-based version with responsive design
- **Mobile**: Touch-optimized interface with performance considerations

## 🎯 Key Features

- **Live2D Integration**: Real-time character animation
- **WebSocket Communication**: Real-time AI chat interaction  
- **Multi-language Support**: i18n for global accessibility
- **Glassmorphism UI**: Modern, translucent interface design
- **Hidden Debug Tools**: Professional debugging interface for developers

---

*This documentation is maintained alongside the codebase. Please update relevant sections when making changes to the application.*
