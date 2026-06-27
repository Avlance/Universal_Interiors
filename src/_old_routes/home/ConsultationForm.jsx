"use client";
import React, { useState } from 'react';
import Modal from '../../components/modal/js/Modal.jsx';
import styled from 'styled-components';
import Button from '../../components/button/js/Button.jsx';
import ConsultationFormContent from './ConsultationFormContent.jsx';

// Modal Content Components
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    // color: #fff;
  }
  
  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    font-size: 18px;
  }
`;

const ConsultationForm = () => {
  const [open, setOpen] = useState(false);

  const resetFormState = () => {
    // Reset is now handled by ConsultationFormContent component
  };

  const handleFormSuccess = () => {
    setOpen(false);
  };

  return (
    <>
      <Button primary onClick={() => setOpen(true)} style={{ marginRight: "10px" }}>Book a Free Consultation</Button>

      <Modal open={open} onClose={() => { setOpen(false); resetFormState(); }}>
        <CloseButton onClick={() => { setOpen(false); resetFormState(); }} className="universal-fs-h8 universal-font">&times;</CloseButton>
          <ConsultationFormContent onSuccess={handleFormSuccess} />
      </Modal>
    </>
  );
};

export default ConsultationForm; 

