"use client";
import React from 'react';
import styled from 'styled-components';
import ModalOverlay from './ModalOverlay';

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  min-width: min(340px, 95vw);
  max-width: 95vw;
  max-height: 90vh;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  display: flex;
  overflow: hidden;
`;

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal; 

