import styled from 'styled-components';

export const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLogo = styled.div`
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semiBold};
`;

export const Subtitle = styled.p`
  margin: 2px 0 0 0;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  opacity: 0.85;
`;

export const SettingsButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: rgba(255,255,255,0.2);
`;