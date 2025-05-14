import React from 'react';
import { Send } from 'lucide-react';
import { InputContainer, InputForm, StyledInput, SendButtonContainer } from './styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const Input = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      onSubmit(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <InputContainer>
        <InputForm onSubmit={handleSubmit}>
          <StyledInput
            value={value}
            onChange={onChange}
            placeholder="¿En qué puedo ayudarte?"
          />
          <SendButtonContainer 
            type="submit" 
            disabled={value.trim() === ""}
          >
            <Send size={18} />
          </SendButtonContainer>
        </InputForm>
      </InputContainer>
    </ThemeProvider>
  );
};

export default Input;