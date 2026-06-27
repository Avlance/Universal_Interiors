"use client";
import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.input`
  font-family: var(--universal-font-medium);
  font-size: var(--universal-fs-h3);
  padding: 10px 14px;
  border-radius: 8px;
  width: 100%;
  border: 1px solid #999999;
  border-radius: 6px;
  transition: all 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::placeholder {
    font-family: var(--universal-font);
    font-size: var(--universal-fs-h3);
    color: #999999;
  }

  &:focus {
    outline: none;
    background: #FFFFFF;
    background-color: #FFF;
    border: 1px solid #D50F25;
    box-shadow: 0 0 0 2px rgba(213, 15, 37, 0.1);
  }

  &:hover {
    border: 1px solid #666666;
  }

  /* Disable default iOS styling */
  &[type="search"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  &[type="search"]::-webkit-search-decoration,
  &[type="search"]::-webkit-search-cancel-button,
  &[type="search"]::-webkit-search-results-button,
  &[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* Tablet styles */
  @media (max-width: 1024px) {
    font-size: var(--universal-fs-h3);
    padding: 12px 16px;
    border-radius: 8px;
    min-height: 44px;
    touch-action: manipulation;
    
    &::placeholder {
      font-size: var(--universal-fs-h2);
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(213, 15, 37, 0.12);
    }
  }

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h4);
    padding: 12px 16px;
    border-radius: 8px;
    min-height: 44px;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    touch-action: manipulation;
    
    &::placeholder {
      font-size: var(--universal-fs-h2);
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(213, 15, 37, 0.15);
    }
  }

  /* Mobile styles */
  @media (max-width: 480px) {
    font-size: var(--universal-fs-h2);
    padding: 10px 12px;
    border-radius: 6px;
    min-height: 42px;
    transition: border-color 0.1s ease, box-shadow 0.1s ease;
    touch-action: manipulation;
    
    &::placeholder {
      font-size: var(--universal-fs-h3);
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(213, 15, 37, 0.2);
    }
  }

  /* Small mobile styles */
  @media (max-width: 360px) {
    font-size: var(--universal-fs-h3);
    padding: 10px 12px;
    border-radius: 6px;
    min-height: 40px;
    
    &::placeholder {
      font-size: var(--universal-fs-h3);
    }
  }

  /* Prevent zoom on iOS - this is crucial for mobile UX */
  @media screen and (max-width: 768px) {
    font-size: var(--universal-fs-h3);
    
    &::placeholder {
      font-size: var(--universal-fs-h3);
    }
  }

  /* Enhanced mobile accessibility */
  @media (max-width: 768px) {
    /* Improve text selection */
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    
    /* Better cursor handling */
    cursor: text;
    
    /* Prevent text scaling */
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  /* Dark mode support for mobile */
  @media (prefers-color-scheme: dark) and (max-width: 768px) {
    background-color: #2a2a2a;
    color: #ffffff;
    border-color: #555555;
    
    &::placeholder {
      color: #888888;
    }
    
    &:focus {
      background-color: #333333;
      border-color: #D50F25;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) and (max-width: 768px) {
    border-width: 2px;
    
    &:focus {
      border-width: 3px;
      box-shadow: 0 0 0 4px rgba(213, 15, 37, 0.3);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Input = (props) => {
  return <StyledInput autoComplete="true" {...props} />;
};

export default Input;

