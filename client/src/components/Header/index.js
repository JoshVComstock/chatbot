import React from 'react';
import { Coffee, Settings } from 'lucide-react';
import { StyledHeader, HeaderContent, HeaderLogo, HeaderTitle, Title, Subtitle, SettingsButton } from './styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const Header = ({ onSettingsClick, restaurantName }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledHeader>
        <HeaderContent>
          <HeaderLogo>
            <Coffee size={20} color="#FF6B35" />
          </HeaderLogo>
          <HeaderTitle>
            <Title>{restaurantName}</Title>
            <Subtitle>Estamos para servirte</Subtitle>
          </HeaderTitle>
        </HeaderContent>
        <SettingsButton onClick={onSettingsClick}>
          <Settings size={18} color="white" />
        </SettingsButton>
      </StyledHeader>
    </ThemeProvider>
  );
};

export default Header;