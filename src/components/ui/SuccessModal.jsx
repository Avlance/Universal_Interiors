'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const checkmarkAnimation = keyframes`
  0% { stroke-dashoffset: 48; }
  100% { stroke-dashoffset: 0; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  animation: ${scaleUp} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
`;

const CheckmarkCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
  position: relative;
`;

const StyledSvg = styled.svg`
  width: 40px;
  height: 40px;
  
  path {
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: ${checkmarkAnimation} 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
  }
`;

const Title = styled.h3`
  font-family: var(--universal-font-bold);
  font-size: 24px;
  color: #111;
  margin-bottom: 12px;
`;

const Message = styled.p`
  font-family: var(--universal-font);
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 32px;
`;

const Button = styled.button`
  background: #D50F25;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-family: var(--universal-font-medium);
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  
  &:hover {
    background: #b00c1e;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Registration Successful!", 
  message = "Thank you! Our design team will contact you within 24 hours." 
}) {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

  return (
    <ModalOverlay 
      style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
      onTransitionEnd={handleAnimationEnd}
    >
      <ModalBox>
        <CheckmarkCircle>
          <StyledSvg viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </StyledSvg>
        </CheckmarkCircle>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button onClick={onClose}>Done</Button>
      </ModalBox>
    </ModalOverlay>
  );
}
