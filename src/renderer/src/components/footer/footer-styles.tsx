import { SystemStyleObject } from '@chakra-ui/react';

interface FooterStyles {
  container: (isCollapsed: boolean) => SystemStyleObject
  toggleButton: SystemStyleObject
  actionButton: SystemStyleObject
  input: SystemStyleObject
  attachButton: SystemStyleObject
}

interface AIIndicatorStyles {
  container: SystemStyleObject
  text: SystemStyleObject
}

export const footerStyles: {
  footer: FooterStyles
  aiIndicator: AIIndicatorStyles
} = {
  footer: {
    container: (isCollapsed) => ({
      // Make completely transparent
      bg: 'transparent',
      borderTopRadius: isCollapsed ? 'none' : 'lg',
      transform: isCollapsed ? 'translateY(calc(100% - 24px))' : 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      height: '100%',
      position: 'relative',
      overflow: isCollapsed ? 'visible' : 'hidden',
      pb: '4',
    }),
    toggleButton: {
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.6)',
      _hover: { 
        color: 'rgba(255, 255, 255, 0.9)',
      },
      bg: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50%',
      width: '32px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      // Center the toggle button
      margin: '0 auto',
    },
    actionButton: {
      borderRadius: '16px',
      width: '50px',
      height: '50px',
      minW: '50px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      _hover: {
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      },
    },
    input: {
      // Glass input field
      bg: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: '80px',
      borderRadius: '16px',
      fontSize: '18px',
      pl: '12',
      pr: '4',
      color: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      _placeholder: {
        color: 'rgba(255, 255, 255, 0.4)',
      },
      _focus: {
        border: '1px solid rgba(255, 255, 255, 0.2)',
        bg: 'rgba(255, 255, 255, 0.12)',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 0 2px rgba(124, 92, 255, 0.3)',
      },
      _hover: {
        bg: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      },
      resize: 'none',
      minHeight: '80px',
      maxHeight: '80px',
      py: '0',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '28px',
      lineHeight: '1.4',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    attachButton: {
      position: 'absolute',
      left: '2',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.6)',
      zIndex: 2,
      borderRadius: '12px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      _hover: {
        bg: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
      },
    },
  },
  aiIndicator: {
    container: {
      // Simplified glass effect for AI indicator
      bg: 'rgba(124, 92, 255, 0.8)',
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      width: '110px',
      height: '30px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(124, 92, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    text: {
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
};
