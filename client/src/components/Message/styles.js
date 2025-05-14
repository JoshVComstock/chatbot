import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ sender }) => sender === 'user' ? 'flex-end' : 'flex-start'};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const MessageBubble = styled.div`
  max-width: 75%;
  padding: 12px 16px;
  border-radius: ${({ sender, theme }) => 
    sender === 'user' 
      ? `${theme.borderRadius.large} ${theme.borderRadius.large} 0 ${theme.borderRadius.large}` 
      : `${theme.borderRadius.large} ${theme.borderRadius.large} ${theme.borderRadius.large} 0`};
  background-color: ${({ sender, theme }) => 
    sender === 'user' ? theme.colors.chatBubbleUser : theme.colors.chatBubbleBot};
  color: ${({ sender, theme }) => 
    sender === 'user' ? 'white' : theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  box-shadow: ${({ theme }) => theme.shadows.small};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.5;
  white-space: pre-line;
`;

export const TypingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TypingBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => `${theme.borderRadius.large} ${theme.borderRadius.large} ${theme.borderRadius.large} 0`};
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: 0.7;
  animation: bounce 1.4s infinite ease-in-out both;
  animation-delay: ${({ delay }) => delay || '0s'};
`;