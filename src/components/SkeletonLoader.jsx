"use client";
import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

// Grid container for skeleton cards (matches DesignGrid structure)
const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
`;

// DesignCard specific skeleton components
const SkeletonDesignCard = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const SkeletonDesignImage = styled(SkeletonBase)`
  width: 100%;
  height: 200px;
`;

const SkeletonDesignContent = styled.div`
  padding: 16px;
`;

const SkeletonDesignTitle = styled(SkeletonBase)`
  height: 20px;
  margin-bottom: 8px;
  width: 80%;
`;

const SkeletonDesignDescription = styled(SkeletonBase)`
  height: 16px;
  margin-bottom: 6px;
  width: 100%;
`;

const SkeletonDesignDescriptionShort = styled(SkeletonBase)`
  height: 16px;
  width: 60%;
`;

const SkeletonDesignInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px 16px 16px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${SkeletonDesignCard}:hover & {
    transform: translateY(0);
  }
`;

const SkeletonDesignInfoTitle = styled(SkeletonBase)`
  height: 18px;
  width: 70%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

// Generic skeleton components for other structures
const SkeletonCard = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 320px;
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  height: 200px;
`;

const SkeletonContent = styled.div`
  padding: 16px;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 20px;
  margin-bottom: 8px;
  width: 80%;
`;

const SkeletonDescription = styled(SkeletonBase)`
  height: 16px;
  margin-bottom: 6px;
  width: 100%;
`;

const SkeletonDescriptionShort = styled(SkeletonBase)`
  height: 16px;
  width: 60%;
`;

const SkeletonLoader = ({
  count = 6,
  type = 'designCard', // 'designCard' or 'generic'
  structure = null // Custom structure function
}) => {
  // If custom structure is provided, use it
  if (structure && typeof structure === 'function') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => structure(index))}
      </>
    );
  }

  // DesignCard specific skeleton with grid layout
  if (type === 'designCard') {
    return (
      <SkeletonGrid>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonDesignCard key={index}>
            <SkeletonDesignImage />
            <SkeletonDesignContent>
              <SkeletonDesignTitle />
              <SkeletonDesignDescription />
              <SkeletonDesignDescriptionShort />
            </SkeletonDesignContent>
            <SkeletonDesignInfo>
              <SkeletonDesignInfoTitle />
            </SkeletonDesignInfo>
          </SkeletonDesignCard>
        ))}
      </SkeletonGrid>
    );
  }

  // Generic skeleton (default)
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonTitle />
            <SkeletonDescription />
            <SkeletonDescriptionShort />
          </SkeletonContent>
        </SkeletonCard>
      ))}
    </>
  );
};

export default SkeletonLoader; 

