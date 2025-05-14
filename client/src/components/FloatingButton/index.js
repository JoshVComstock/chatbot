import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { StyledFloatingButton } from './styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const FloatingButton = ({ onClick, isOpen }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledFloatingButton onClick={onClick} isOpen={isOpen}>
        {isOpen ? <X size={24} color="white" /> : <MessageSquare size={24} color="white" />}
      </StyledFloatingButton>
    </ThemeProvider>
  );
};

export default FloatingButton;