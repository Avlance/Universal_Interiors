"use client";
import React from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip.jsx';

const TestContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  
  @media (max-width: 768px) {
    padding: 16px;
    gap: 10px;
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  min-width: 80px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    min-width: 70px;
  }
`;

const CustomIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #5485EE;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #3a6bc7;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

const TooltipTest = () => {
  return (
    <TestContainer>
      <h2>Tooltip Component Test</h2>
      
      <Section>
        <SectionTitle>Basic Tooltips</SectionTitle>
        <TooltipRow>
          <Label>Top:</Label>
          <Tooltip content="This is a tooltip positioned at the top" position="top" />
        </TooltipRow>
        <TooltipRow>
          <Label>Bottom:</Label>
          <Tooltip content="This is a tooltip positioned at the bottom" position="bottom" />
        </TooltipRow>
        <TooltipRow>
          <Label>Left:</Label>
          <Tooltip content="This is a tooltip positioned on the left" position="left" />
        </TooltipRow>
        <TooltipRow>
          <Label>Right:</Label>
          <Tooltip content="This is a tooltip positioned on the right" position="right" />
        </TooltipRow>
      </Section>

      <Section>
        <SectionTitle>Custom Icons</SectionTitle>
        <TooltipRow>
          <Label>Info:</Label>
          <Tooltip content="This is an information tooltip" icon="i" />
        </TooltipRow>
        <TooltipRow>
          <Label>Help:</Label>
          <Tooltip content="This is a help tooltip" icon="?" />
        </TooltipRow>
        <TooltipRow>
          <Label>Warning:</Label>
          <Tooltip content="This is a warning tooltip" icon="!" />
        </TooltipRow>
        <TooltipRow>
          <Label>Custom:</Label>
          <Tooltip content="This is a custom icon tooltip">
            <CustomIcon>★</CustomIcon>
          </Tooltip>
        </TooltipRow>
      </Section>

      <Section>
        <SectionTitle>Long Content</SectionTitle>
        <TooltipRow>
          <Label>Long text:</Label>
          <Tooltip 
            content="This is a very long tooltip content that demonstrates how the tooltip handles longer text content. It should wrap properly and maintain good readability." 
            position="top"
          />
        </TooltipRow>
        <TooltipRow>
          <Label>Multi-line:</Label>
          <Tooltip 
            content="This tooltip contains multiple lines of text to show how it handles line breaks and longer content. The text should be properly formatted and easy to read." 
            position="bottom"
          />
        </TooltipRow>
      </Section>

      <Section>
        <SectionTitle>Different Delays</SectionTitle>
        <TooltipRow>
          <Label>Fast (100ms):</Label>
          <Tooltip content="This tooltip appears quickly" delay={100} />
        </TooltipRow>
        <TooltipRow>
          <Label>Default (200ms):</Label>
          <Tooltip content="This tooltip uses the default delay" />
        </TooltipRow>
        <TooltipRow>
          <Label>Slow (500ms):</Label>
          <Tooltip content="This tooltip appears slowly" delay={500} />
        </TooltipRow>
      </Section>

      <Section>
        <SectionTitle>Form Integration Example</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Email Address</span>
            <Tooltip content="Enter your email address for account verification and notifications" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Phone Number</span>
            <Tooltip content="Your phone number will be used for SMS notifications and account recovery" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Password</span>
            <Tooltip content="Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character" />
          </div>
        </div>
      </Section>
    </TestContainer>
  );
};

export default TooltipTest; 

