const theme = {
  colors: {
    primary: '#FF6B35',
    secondary: '#D84315',
    text: '#333333',
    lightText: '#666666',
    background: '#FFFFFF',
    lightBackground: '#F9F9F9',
    input: '#F5F5F5',
    border: '#EEEEEE',
    success: '#4CAF50',
    error: '#F44336',
    chatBubbleUser: '#FF6B35',
    chatBubbleBot: '#FFFFFF',
  },
  shadows: {
    small: '0 2px 8px rgba(0,0,0,0.08)',
    medium: '0 4px 15px rgba(0,0,0,0.2)',
    large: '0 8px 30px rgba(0,0,0,0.16)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    sizes: {
      xs: '12px',
      sm: '13px',
      md: '14px',
      lg: '16px',
      xl: '18px',
      xxl: '24px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  animations: {
    bounce: `
      @keyframes bounce {
        0%, 80%, 100% {
          transform: scale(0);
        } 
        40% {
          transform: scale(1);
        }
      }
    `,
  },
  zIndex: {
    chat: 999,
    floatingButton: 1000,
    config: 1001,
  },
};

export default theme;