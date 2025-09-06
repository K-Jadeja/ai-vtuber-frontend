# UI Design System - Glassmorphism Theme

## Overview

The VTuber frontend uses a modern glassmorphism design system that creates a beautiful, translucent interface allowing the background (Live2D character or user-selected background) to show through elegantly.

## Design Principles

### 1. Glassmorphism Effects
- **Backdrop Blur**: `blur(20px) saturate(180%)` for main elements
- **Transparency**: Semi-transparent backgrounds using `rgba()` values
- **Borders**: Subtle white borders with low opacity (`rgba(255, 255, 255, 0.1)`)
- **Shadows**: Layered shadows for depth and dimension

### 2. Color Palette
```css
/* Primary Glass Colors */
--glass-primary: rgba(255, 255, 255, 0.08);
--glass-secondary: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-highlight: rgba(255, 255, 255, 0.2);

/* Accent Colors */
--accent-purple: rgba(124, 92, 255, 0.8);
--accent-green: rgba(34, 197, 94, 0.8);
--accent-red: rgba(239, 68, 68, 0.8);
--accent-yellow: rgba(245, 158, 11, 0.8);
```

### 3. Animation & Transitions
- **Duration**: `0.3s` for most interactions
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for smooth, natural movement
- **Hover Effects**: Scale and elevation changes
- **Loading States**: Gradient animations and pulsing effects

## Component Specifications

### Footer/Chat Input Area
```css
/* Main Container */
backdrop-filter: blur(20px) saturate(180%);
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Input Field */
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px) saturate(180%);
border-radius: 16px;
transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Focus State */
border: 1px solid rgba(255, 255, 255, 0.2);
background: rgba(255, 255, 255, 0.12);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(124, 92, 255, 0.3);
```

### Action Buttons
```css
/* Base Style */
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Hover Effect */
transform: translateY(-2px) scale(1.05);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);

/* Active State */
transform: translateY(0) scale(0.98);
```

### AI State Indicator
```css
/* Normal State */
background: rgba(124, 92, 255, 0.8);
backdrop-filter: blur(20px) saturate(180%);
border-radius: 15px;
box-shadow: 0 4px 16px rgba(124, 92, 255, 0.3);

/* Loading State */
background: linear-gradient(-45deg, rgba(124, 92, 255, 0.8), rgba(139, 69, 255, 0.8), 
           rgba(124, 92, 255, 0.8), rgba(155, 44, 255, 0.8));
background-size: 400% 400%;
animation: gradientFlow 3s ease-in-out infinite, pulse 2s ease-in-out infinite;
```

### WebSocket Status
```css
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Hover Effect */
transform: translateY(-2px) scale(1.02);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
```

### Subtitles
```css
background: rgba(0, 0, 0, 0.4);
backdrop-filter: blur(25px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

## Interactive States

### Hover States
- **Scale**: 1.02 - 1.05 (subtle growth)
- **Elevation**: Increased shadow spread and blur
- **Color**: Slightly brighter background
- **Transform**: Slight upward movement (-2px translateY)

### Active/Press States
- **Scale**: 0.98 (subtle shrink)
- **Transform**: Return to baseline or slight downward movement

### Focus States
- **Border**: Accent color glow
- **Background**: Slightly more opaque
- **Shadow**: Colored outer glow matching accent

## Responsive Behavior

### Mobile Adaptations
- Reduced blur values for performance
- Simplified shadows
- Larger touch targets (minimum 44px)
- Simplified animations

### Performance Considerations
- Use `will-change: transform` for animated elements
- Debounce hover effects on touch devices
- Fallback solid colors for devices without backdrop-filter support

## Implementation Notes

### Browser Support
- **Backdrop Filter**: Use `-webkit-backdrop-filter` fallback
- **CSS Variables**: Supported in all modern browsers
- **Cubic Bezier**: Widely supported

### Accessibility
- Maintain contrast ratios despite transparency
- Ensure interactive elements remain visible
- Provide reduced motion alternatives

### Dark Mode Ready
- All colors use rgba/hsla for transparency
- Easy to adjust alpha values for different themes
- Consistent across light/dark backgrounds

## Usage Examples

### Basic Glass Container
```jsx
<Box
  bg="rgba(255, 255, 255, 0.08)"
  backdropFilter="blur(20px) saturate(180%)"
  border="1px solid rgba(255, 255, 255, 0.1)"
  borderRadius="16px"
  boxShadow="0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
>
  Content here
</Box>
```

### Interactive Button
```jsx
<Button
  _hover={{
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
  }}
  _active={{
    transform: 'translateY(0) scale(0.98)',
  }}
  transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
>
  Glass Button
</Button>
```

This design system creates a cohesive, modern interface that elegantly showcases the Live2D character while providing excellent usability and visual appeal.
