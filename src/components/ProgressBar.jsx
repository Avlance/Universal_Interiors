"use client";
import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 0rem;
  position: relative;
`;
const TrackLine = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 0;
  border-bottom: 2px dashed #D50F25;
  z-index: 0;
`;
const ForegroundLine = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  height: 0;
  border-bottom: 2px solid #D50F25;
  z-index: 1;
  width: ${props => props.$percent}%;
`;
const ProgressBarRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;
const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const ProgressCircle = styled.div`

  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$active ? '#D50F25' : '#f2cdd1f5'};
  color: ${props => props.$active ? '#fff' : '#D50F25'};
  display: flex;
  align-items: center;
  justify-content: center;
  // font-weight: bold;
  // font-size: 18px;
  border: 2px solid ${props => props.$active ? '#D50F25' : '#D50F25'};
  transition: background 0.3s, color 0.3s, border 0.3s;
  z-index: 2;
  position: relative;
`;
const ProgressLabelRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-top: 0.5rem;
  justify-content: space-between;
`;
const ProgressLabel = styled.div`
  font-size: 14px;
  color: #222;
  text-align: center;
  width: 32px;
`;

const ProgressBar = ({ currentStep, stepLabels }) => {
  // percent of bar to fill for completed steps (N-1 segments for N steps)
  const percent = stepLabels.length > 1 ? ((currentStep - 1) / (stepLabels.length - 1)) * 100 : 0;
  return (
    <ProgressBarContainer>
      <TrackLine />
      <ForegroundLine $percent={percent} />
      <ProgressBarRow>
        {stepLabels.map((label, idx) => (
          <ProgressStep key={label}>
            <ProgressCircle className='universal-font-medium' $active={currentStep > idx || currentStep === idx + 1}>{idx + 1}</ProgressCircle>
          </ProgressStep>
        ))}
      </ProgressBarRow>
      <ProgressLabelRow>
        {stepLabels.map((label, idx) => (
          <ProgressLabel key={label}>{label}</ProgressLabel>
        ))}
      </ProgressLabelRow>
    </ProgressBarContainer>
  );
};

export default ProgressBar; 

