import styled from 'styled-components';
const colors = {
  primary: '#c0392b',
  secondary: '#c0392b',
  accent: '#c0392b',
  background: '#ffffff',
  backgroundAlt: '#f8f9fa',
  text: '#2c3e50',
  textLight: '#7f8c8d',
  border: '#dfe6e9',
  success: '#27ae60',
  error: '#e74c3c',
  warning: '#f39c12'
};

const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  large: '0 10px 15px rgba(0, 0, 0, 0.1)'
};

const radius = {
  small: '4px',
  medium: '8px',
  large: '12px'
};

const transitions = {
  default: 'all 0.3s ease',
  fast: 'all 0.15s ease'
};

export const FormContainer = styled.form`
  max-width: 100%;
  background-color: ${colors.background};
  box-shadow: ${shadows.large};
  overflow: hidden;
`;

export const FormHeader = styled.header`
  background-color: ${colors.primary};
  padding: 2rem;
  color: white;
  text-align: center;
`;

export const FormTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
`;

export const FormSection = styled.section`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${colors.secondary};
  display: inline-block;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.border};
  border-radius: ${radius.medium};
  font-size: 1rem;
  color: ${colors.text};
  transition: ${transitions.default};
  background-color: ${colors.backgroundAlt};
  
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
  
  &::placeholder {
    color: ${colors.textLight};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.border};
  border-radius: ${radius.medium};
  font-size: 1rem;
  color: ${colors.text};
  transition: ${transitions.default};
  background-color: ${colors.backgroundAlt};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
  
  &::placeholder {
    color: ${colors.textLight};
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${radius.medium};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${transitions.default};
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${colors.secondary};
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${shadows.small};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: white;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  
  &:hover:not(:disabled) {
    background-color: #f4f9ff;
    transform: translateY(-2px);
    box-shadow: ${shadows.small};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.small};
  margin-right: 0.75rem;
  position: relative;
  cursor: pointer;
  transition: ${transitions.default};
  
  &:checked {
    background-color: ${colors.secondary};
    border-color: ${colors.secondary};
  }
  
  &:checked:after {
    content: '';
    position: absolute;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  &:focus {
    outline: none;
  }
`;

export const CheckboxLabel = styled.label`
  color: ${colors.text};
  font-size: 1rem;
  cursor: pointer;
`;

export const PlatosList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const PlatoCard = styled.div`
  background-color: ${colors.background};
  border-radius: ${radius.medium};
  box-shadow: ${shadows.small};
  overflow: hidden;
  transition: ${transitions.default};
  border: 1px solid ${colors.border};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.medium};
  }
`;

export const PlatoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 1.5rem;
  background-color: ${colors.primary};
  color: white;
`;

export const PlatoItem = styled.div`
  padding: 1.5rem;
`;

export const PlatoTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

export const PlatoDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${colors.textLight};
  line-height: 1.5;
`;

export const PlatoActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${colors.border};
  gap: 0.75rem;
`;

export const DeleteButton = styled(Button)`
  background-color: ${colors.error};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c0392b;
    transform: translateY(-2px);
    box-shadow: ${shadows.small};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${radius.large};
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  background-color: ${props => props.color || colors.secondary};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const FormFooter = styled.footer`
  padding: 1.5rem 2rem;
  background-color: ${colors.backgroundAlt};
  display: flex;
  justify-content: flex-start   ;
  gap: 1rem;
  border-top: 1px solid ${colors.border};
`;


export const FormGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
`;

export const FormColumn = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 0 1rem;
`;