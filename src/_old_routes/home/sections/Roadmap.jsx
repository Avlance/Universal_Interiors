"use client";
import styled, { keyframes, css } from 'styled-components';
import React, { useState, useEffect } from 'react';

const RoadMapContainer = styled.section`
  margin-bottom: 80px;
  padding: 0;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
    padding: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 40px;
    padding: 0;
  }
`;

const ContentWrapper = styled.div`
  padding: 4rem;
  padding-bottom: 5rem;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) -3.99%, rgb(232, 238, 253) 30.25%, rgb(232, 238, 253) 65.14%, rgba(255, 255, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
    padding-bottom: 4rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    padding-bottom: 3rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 15px;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const SectionDescription = styled.p`
  color: #222222;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

// Add styled components for the stepper/label section
const StepperSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0 40px 0;
  
  @media (max-width: 768px) {
    margin: 24px 0 32px 0;
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: auto;
    padding: 0 16px 40px 16px;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    margin: 20px 0 24px 0;
    gap: 4px;
    padding: 0 8px 30px 8px;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const stepperActivate = keyframes`
  from {
    background: #5485EE;
    color: #fff;
    border-color: #5485EE;
    box-shadow: none;
    transform: scale(1);
  }
  to {
    background: #fff;
    color: #222;
    border-color: #5485EE;
    box-shadow: 0 4px 16px rgba(84, 133, 238, 0.15);
    transform: scale(1.12);
  }
`;

const StepCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.active ? '#D50F25' : '#5485EE'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  z-index: 2;
  border: 10px solid #FFFFFF;
  transition: background 0.2s, color 0.2s;

  ${props => props.active && css`
    animation: ${stepperActivate} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    animation-delay: 1.8s;
    animation-fill-mode: forwards;
  `}
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    border: 6px solid #FFFFFF;
  }
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    border: 4px solid #FFFFFF;
  }
`;

const StepLabel = styled.div`
  color: ${props => props.active ? '#D50F25' : '#5485EE'};
  text-align: center;
  max-width: 70px;
  transition: color 0.2s;
  margin-left: 0;
  margin-right: 0;
  margin-top: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  
  @media (max-width: 768px) {
    margin-top: 50px;
    max-width: 50px;
    white-space: normal;
    line-height: 1.1;
    font-size: 10px;
  }
  
  @media (max-width: 480px) {
    margin-top: 40px;
    max-width: 40px;
    font-size: 9px;
  }
`;

const StepLine = styled.div`
  height: 2px;
  width: 80px;
  background: #FFFFFF;
  position: relative;
  z-index: 1;
  margin-left: -2px;
  margin-right: -2px;
  
  @media (max-width: 768px) {
    width: 30px;
  }
  
  @media (max-width: 480px) {
    width: 20px;
  }
`;

const MainLayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const RoadmapImage = styled.img`
  width: 250px;
  height: 170px;
  margin-right: 24px;
  max-width: 100%;
  height: auto;
  
  @media (max-width: 768px) {
    width: 200px;
    height: auto;
    margin-right: 0;
  }
  
  @media (max-width: 480px) {
    width: 180px;
  }
`;

const stepLabels = [
  'Say Hello',
  'Shape the Dream',
  'Plan It Perfectly',
  'Make It Happen',
  'Time to Celebrate'
];

const RoadMap = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % stepLabels.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <RoadMapContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle className='universal-fs-h8 universal-font-bold'>
            The way We Turn <span style={{ color: "#5485EE" }}> Ideas</span> Into Spaces You<span style={{ color: "#D50F25" }}> Love. </span>
          </SectionTitle>
          <SectionDescription className='universal-fs-h3 universal-font-medium'>
            It only takes five simple steps to bring your vision to life
          </SectionDescription>
        </SectionHeader>

        <MainLayoutContainer>
          <StepperSection>
            {stepLabels.map((label, idx) => (
              <React.Fragment key={label}>
                <Step>
                  <StepCircle className="universal-fs-h3 universal-font-medium" active={activeStep === idx}>{idx + 1}</StepCircle>
                  <StepLabel className="universal-fs-h3 universal-font-medium" active={activeStep === idx}>{label}</StepLabel>
                </Step>
                {idx < stepLabels.length - 1 && <StepLine />}
              </React.Fragment>
            ))}
          </StepperSection>

          <RoadmapImage
            src="https://res.cloudinary.com/sevfdaro/image/upload/v1782657696/local_assets_migrated/home/roadmap/roadmap-1.webp"
            loading="lazy"
            alt="Roadmap Visual"
          />
        </MainLayoutContainer>

      </ContentWrapper>
    </RoadMapContainer>
  );
};

export default RoadMap;

