import React from 'react';
import { Coffee } from 'lucide-react';
import { StyledChatWindow, ChatContainer, SpecialOfferBanner } from './styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const ChatWindow = ({ isOpen, children, specialOffer }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledChatWindow isOpen={isOpen}>
        {children}
      </StyledChatWindow>
    </ThemeProvider>
  );
};

export const ChatContent = ({ children, specialOffer, messagesEndRef }) => {
  return (
    <ChatContainer>
      {specialOffer && (
        <SpecialOfferBanner>
          <Coffee size={16} color="#FF6B35" style={{ marginRight: '8px', flexShrink: 0 }} />
          <div>
            <strong>Oferta especial:</strong> {specialOffer}
          </div>
        </SpecialOfferBanner>
      )}
      
      {children}
      
      <div ref={messagesEndRef} />
    </ChatContainer>
  );
};

export default ChatWindow;