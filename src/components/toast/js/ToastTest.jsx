"use client";
import React from 'react';
import styled from 'styled-components';
import { showSuccessToast, showFailureToast, showWarningToast, showInfoToast } from './ToastMessage.jsx';

const TestContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
`;

const TestButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-family: var(--universal-font);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SuccessButton = styled(TestButton)`
  background: #4CAF50;
  color: white;
`;

const FailureButton = styled(TestButton)`
  background: #F44336;
  color: white;
`;

const WarningButton = styled(TestButton)`
  background: #FF9800;
  color: white;
`;

const InfoButton = styled(TestButton)`
  background: #2196F3;
  color: white;
`;

const ToastTest = () => {
  return (
    <TestContainer>
      <h3>Toast Message Test</h3>
      <p>Click the buttons below to test different toast message types:</p>

      <SuccessButton onClick={() => showSuccessToast('This is a success message!', 3000)}>
        Show Success Toast
      </SuccessButton>

      <FailureButton onClick={() => showFailureToast('This is a failure message!', 4000)}>
        Show Failure Toast
      </FailureButton>

      <WarningButton onClick={() => showWarningToast('This is a warning message!', 3500)}>
        Show Warning Toast
      </WarningButton>

      <InfoButton onClick={() => showInfoToast('This is an info message!', 3000)}>
        Show Info Toast
      </InfoButton>
    </TestContainer>
  );
};

export default ToastTest; 

