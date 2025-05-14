import styled from 'styled-components';

export const StyledChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: ${({ theme }) => theme.spacing.xl};
  width: 360px;
  height: 520px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.large};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  transform: ${({ isOpen }) => isOpen ? 'scale(1)' : 'scale(0)'};
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  transform-origin: bottom right;
  z-index: ${({ theme }) => theme.zIndex.chat};
`;

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.lightBackground};
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  flex-direction: column;
`;

export const SpecialOfferBanner = styled.div`
  background-color: #FFF4EF;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.sm};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;