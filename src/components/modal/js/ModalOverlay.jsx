"use client";
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
`;

const ModalOverlay = ({ children }) => {
  return <Overlay>{children}</Overlay>;
};

export default ModalOverlay; 

