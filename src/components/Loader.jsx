"use client";
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Pulse animation
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Bounce animation
const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`;

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Loader Container
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: ${props => props.minHeight || '200px'};
  background: ${props => props.background || 'transparent'};
  border-radius: ${props => props.borderRadius || '8px'};
  position: ${props => props.position || 'relative'};
  
  @media (max-width: 768px) {
    min-height: ${props => props.mobileMinHeight || '150px'};
  }
  
  @media (max-width: 480px) {
    min-height: ${props => props.smallMobileMinHeight || '120px'};
  }
`;

// Spinner Loader
const SpinnerLoader = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 3px solid #f3f3f3;
  border-top: 3px solid #D50F25;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '32px'};
    height: ${props => props.mobileSize || '32px'};
    border-width: 2px;
  }
  
  @media (max-width: 480px) {
    width: ${props => props.smallMobileSize || '28px'};
    height: ${props => props.smallMobileSize || '28px'};
    border-width: 2px;
  }
`;

// Pulse Loader
const PulseLoader = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  background-color: #D50F25;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '32px'};
    height: ${props => props.mobileSize || '32px'};
  }
  
  @media (max-width: 480px) {
    width: ${props => props.smallMobileSize || '28px'};
    height: ${props => props.smallMobileSize || '28px'};
  }
`;

// Bounce Loader
const BounceLoader = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  background-color: #D50F25;
  border-radius: 50%;
  animation: ${bounce} 1.4s ease-in-out infinite both;
  
  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '32px'};
    height: ${props => props.mobileSize || '32px'};
  }
  
  @media (max-width: 480px) {
    width: ${props => props.smallMobileSize || '28px'};
    height: ${props => props.smallMobileSize || '28px'};
  }
`;

// Dots Loader
const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const Dot = styled.div`
  width: ${props => props.size || '12px'};
  height: ${props => props.size || '12px'};
  background-color: #D50F25;
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite both;
  animation-delay: ${props => props.delay || '0s'};
  
  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '10px'};
    height: ${props => props.mobileSize || '10px'};
  }
  
  @media (max-width: 480px) {
    width: ${props => props.smallMobileSize || '8px'};
    height: ${props => props.smallMobileSize || '8px'};
  }
`;

// Skeleton Loader
const SkeletonLoader = styled.div`
  width: 100%;
  height: ${props => props.height || '20px'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-bottom: ${props => props.marginBottom || '8px'};
  
  @media (max-width: 768px) {
    height: ${props => props.mobileHeight || '16px'};
    margin-bottom: ${props => props.mobileMarginBottom || '6px'};
  }
  
  @media (max-width: 480px) {
    height: ${props => props.smallMobileHeight || '14px'};
    margin-bottom: ${props => props.smallMobileMarginBottom || '4px'};
  }
`;

// Button Loader
const ButtonLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${props => props.textColor || '#ffffff'};
  font-size: ${props => props.fontSize || '14px'};
  font-weight: 500;
  
  @media (max-width: 768px) {
    gap: 6px;
    font-size: ${props => props.mobileFontSize || '13px'};
  }
  
  @media (max-width: 480px) {
    gap: 4px;
    font-size: ${props => props.smallMobileFontSize || '12px'};
  }
`;

const ButtonSpinner = styled.div`
  width: ${props => props.size || '16px'};
  height: ${props => props.size || '16px'};
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '14px'};
    height: ${props => props.mobileSize || '14px'};
    border-width: 1.5px;
  }
  
  @media (max-width: 480px) {
    width: ${props => props.smallMobileSize || '12px'};
    height: ${props => props.smallMobileSize || '12px'};
    border-width: 1.5px;
  }
`;

// Main Loader Component
const Loader = ({ 
  type = 'spinner', 
  size = '40px',
  mobileSize = '32px',
  smallMobileSize = '28px',
  text = '',
  minHeight = '200px',
  mobileMinHeight = '150px',
  smallMobileMinHeight = '120px',
  background = 'transparent',
  borderRadius = '8px',
  position = 'relative',
  height = '20px',
  mobileHeight = '16px',
  smallMobileHeight = '14px',
  marginBottom = '8px',
  mobileMarginBottom = '6px',
  smallMobileMarginBottom = '4px',
  textColor = '#ffffff',
  fontSize = '14px',
  mobileFontSize = '13px',
  smallMobileFontSize = '12px',
  buttonSpinnerSize = '16px',
  buttonSpinnerMobileSize = '14px',
  buttonSpinnerSmallMobileSize = '12px'
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <SpinnerLoader 
            size={size}
            mobileSize={mobileSize}
            smallMobileSize={smallMobileSize}
          />
        );
      
      case 'pulse':
        return (
          <PulseLoader 
            size={size}
            mobileSize={mobileSize}
            smallMobileSize={smallMobileSize}
          />
        );
      
      case 'bounce':
        return (
          <BounceLoader 
            size={size}
            mobileSize={mobileSize}
            smallMobileSize={smallMobileSize}
          />
        );
      
      case 'dots':
        return (
          <DotsContainer>
            <Dot size={size} mobileSize={mobileSize} smallMobileSize={smallMobileSize} delay="0s" />
            <Dot size={size} mobileSize={mobileSize} smallMobileSize={smallMobileSize} delay="0.2s" />
            <Dot size={size} mobileSize={mobileSize} smallMobileSize={smallMobileSize} delay="0.4s" />
          </DotsContainer>
        );
      
      case 'skeleton':
        return (
          <div>
            <SkeletonLoader 
              height={height}
              mobileHeight={mobileHeight}
              smallMobileHeight={smallMobileHeight}
              marginBottom={marginBottom}
              mobileMarginBottom={mobileMarginBottom}
              smallMobileMarginBottom={smallMobileMarginBottom}
            />
            <SkeletonLoader 
              height={height}
              mobileHeight={mobileHeight}
              smallMobileHeight={smallMobileHeight}
              marginBottom={marginBottom}
              mobileMarginBottom={mobileMarginBottom}
              smallMobileMarginBottom={smallMobileMarginBottom}
              style={{ width: '80%' }}
            />
            <SkeletonLoader 
              height={height}
              mobileHeight={mobileHeight}
              smallMobileHeight={smallMobileHeight}
              marginBottom="0"
              mobileMarginBottom="0"
              smallMobileMarginBottom="0"
              style={{ width: '60%' }}
            />
          </div>
        );
      
      case 'button':
        return (
          <ButtonLoader 
            textColor={textColor}
            fontSize={fontSize}
            mobileFontSize={mobileFontSize}
            smallMobileFontSize={smallMobileFontSize}
          >
            <ButtonSpinner 
              size={buttonSpinnerSize}
              mobileSize={buttonSpinnerMobileSize}
              smallMobileSize={buttonSpinnerSmallMobileSize}
            />
            {text || 'Loading...'}
          </ButtonLoader>
        );
      
      default:
        return (
          <SpinnerLoader 
            size={size}
            mobileSize={mobileSize}
            smallMobileSize={smallMobileSize}
          />
        );
    }
  };

  return (
    <LoaderContainer 
      minHeight={minHeight}
      mobileMinHeight={mobileMinHeight}
      smallMobileMinHeight={smallMobileMinHeight}
      background={background}
      borderRadius={borderRadius}
      position={position}
    >
      {renderLoader()}
    </LoaderContainer>
  );
};

export default Loader; 

