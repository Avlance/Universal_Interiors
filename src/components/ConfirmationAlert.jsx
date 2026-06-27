"use client";
import React from 'react';
import styled, { keyframes } from 'styled-components';
import ModalOverlay from './modal/js/ModalOverlay';
import Button from './button/js/Button';
import '../utils/css/font.css';

const modalIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AlertContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  min-width: 340px;
  max-width: 95vw;
  max-height: 90vh;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  animation: ${modalIn} 0.3s ease-out;
  
  @media (max-width: 480px) {
    padding: 20px;
    min-width: 300px;
    margin: 20px;
  }
`;

const AlertIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const AlertTitle = styled.h3`
  font-size: var(--universal-fs-h5);
  font-family: var(--universal-font-semibold);
  color: #1a1a1a;
  margin: 0 0 8px 0;
  text-align: center;
`;

const AlertMessage = styled.p`
  font-size: var(--universal-fs-h3);
  font-family: var(--universal-font);
  color: #666666;
  margin: 0 0 24px 0;
  text-align: center;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;



const ConfirmationAlert = ({ 
  isOpen, 
  title = "Alert", 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "OK", 
  cancelText = "Cancel",
  showCancel = false 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <ModalOverlay>
      <AlertContainer onClick={(e) => e.stopPropagation()}>
        <AlertIcon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </AlertIcon>
        <AlertTitle>{title}</AlertTitle>
        <AlertMessage>{message}</AlertMessage>
        <ButtonContainer>
          {showCancel && (
            <Button onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          <Button primary onClick={handleConfirm}>
            {confirmText}
          </Button>
        </ButtonContainer>
      </AlertContainer>
    </ModalOverlay>
  );
};

export default ConfirmationAlert; 

