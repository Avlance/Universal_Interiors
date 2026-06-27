"use client";
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import '../css/button.css';

// Base button styles
const StyledButton = styled.button`
  background-color: ${props => (props.$primary ? 'var(--universal-red-theme-color)' : 'transparent')};
  color: ${props => (props.$primary ? '#ffffff' : '#1a1a1a')};
  border: ${props => (props.$primary ? 'none' : '1px solid #1a1a1a')};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.5px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    // transform: translateY(-1px);
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    // transform: translateY(0);
    // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
    padding: 14px 24px;
    font-size: var(--universal-fs-h3);
    height: 44px;
    min-height: 44px;
    transition: all 0.15s ease;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: var(--universal-fs-h4);
    height: 40px;
    min-height: 40px;
    border-radius: 6px;
    transition: all 0.1s ease;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: var(--universal-fs-h3);
    height: 36px;
    min-height: 36px;
    border-radius: 4px;
    letter-spacing: 0.3px;
    transition: all 0.05s ease;
  }
`;

const Button = ({ primary, className = "universal-fs-h3 universal-font primary-button", children, ...rest }) => {
  return (
    <StyledButton $primary={primary} className={className} {...rest}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;

