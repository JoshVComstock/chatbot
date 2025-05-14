import styled from 'styled-components';

export const InputContainer = styled.div`
  padding: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const InputForm = styled.form`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 24px;
  padding: 6px;
  position: relative;
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px 14px;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  border-radius: 24px;
  background-color: transparent;
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

export const SendButtonContainer = styled.button`
  border: none;
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ disabled, theme }) => 
    disabled ? '#ccc' : theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s;
  padding: 0;
`;