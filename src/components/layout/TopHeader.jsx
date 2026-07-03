"use client";
import React from 'react';
import styled from 'styled-components';
import { Link } from '@/utils/react-router-dom';

const TopHeaderContainer = styled.div`
  display: flex;
  background-color: var(--universal-red-theme-color);
  padding: 8px 0;
  height: 40px;
  overflow: hidden;
  width: 100%;

  @media (max-width: 1024px) {
    top: 70px;
    padding: 6px 0;
    height: auto;
    min-height: 36px;
  }
  
  @media (max-width: 768px) {
    top: 70px;
    padding: 6px 0;
    height: auto;
    min-height: 36px;
  }
  
  @media (max-width: 480px) {
    top: 60px;
    padding: 4px 0;
    min-height: 32px;
  }
`;

const TopHeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const TopNavLinks = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 16px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    width: 100%;
  }
`;

const TopNavLink = styled(Link)`
  color: var(--universal-white);
  text-decoration: none;
  transition: color 0.2s ease;
  letter-spacing: 0.3px;
  text-transform: capitalize;
  align-items: center;
  display: flex;
  text-align: center;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    line-height: 1.2;
    text-align: center;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

const MobileText = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
    color: var(--universal-white);
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    line-height: 1.1;
  }
`;

const DesktopText = styled.div`
  display: block;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TopHeader = ({ onGrabDiscount }) => {
  return (
    <TopHeaderContainer className='universal-fs-h3'>
      <TopHeaderContent>
        <TopNavLinks>
          {/* Desktop version */}
          <DesktopText>
            <TopNavLink className='universal-fs-h3 universal-font-bold'>
              Over 10,000 Happy Homes! Now Get 25% OFF on Your First Modular Interior.{' '}
              <span 
                onClick={onGrabDiscount}
                style={{ textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}
              >
                Grab Your Discount
              </span>
            </TopNavLink>
          </DesktopText>

          {/* Mobile version */}
          <MobileText>
            <div className='universal-fs-h4 universal-font-bold'>
              25% OFF - First Modular Interior
            </div>
            <div className='universal-fs-h2 universal-font' style={{ marginTop: '2px' }}>
              <span 
                onClick={onGrabDiscount}
                style={{ textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}
              >
                Grab Your Discount
              </span>
            </div>
          </MobileText>
        </TopNavLinks>
      </TopHeaderContent>
    </TopHeaderContainer>
  );
};

export default TopHeader; 


