"use client";
import React, { useEffect } from 'react';
import { useLocation } from '@/utils/react-router-dom';
import Header from './Header.jsx';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  margin-top: 125px; /* Header + TopHeader */
  
  @media (max-width: 1024px) {
    margin-top: 130px;
  }
  
  @media (max-width: 768px) {
    margin-top: 130px;
    padding-bottom: 60px; /* Fixed bottom menu bar on mobile/tablet */
  }
  
  @media (max-width: 480px) {
    margin-top: 145px;
    padding-bottom: 55px; /* Fixed bottom menu bar on phone */
  }
`;

const RootLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AppContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
    </AppContainer>
  );
};

export default RootLayout;
