"use client";
import React from 'react';
import styled from 'styled-components';
import Footer from './Footer.jsx';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const Layout = ({ children, showFooter = true }) => {
  return (
    <LayoutContainer>
      {children}
      {showFooter && <Footer />}
    </LayoutContainer>
  );
};

export default Layout; 

