import React from 'react';
import { MessageContainer, MessageBubble, TypingContainer, TypingBubble, TypingDot } from './styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

export const Message = ({ sender, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MessageContainer sender={sender}>
        <MessageBubble sender={sender}>
          {children}
        </MessageBubble>
      </MessageContainer>
    </ThemeProvider>
  );
};

export const TypingIndicator = () => {
  return (
    <ThemeProvider theme={theme}>
      <TypingContainer>
        <TypingBubble>
          <TypingDot />
          <TypingDot delay="0.2s" />
          <TypingDot delay="0.4s" />
        </TypingBubble>
      </TypingContainer>
    </ThemeProvider>
  );
};

export default Message;