import styled from 'styled-components';

export const StyledFloatingButton = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ theme, isOpen }) => 
    isOpen ? theme.colors.secondary : theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: ${({ theme }) => theme.zIndex.floatingButton};
`;