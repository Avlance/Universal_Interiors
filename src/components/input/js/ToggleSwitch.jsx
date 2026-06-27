"use client";
import React from 'react';
import styled from 'styled-components';

const ToggleSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
  }
  
  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + span {
    background-color: #DB4437;
  }
  
  input:checked + span:before {
    transform: translateX(20px);
  }

  /* Tablet styles */
  @media (max-width: 768px) {
    width: 48px;
    height: 26px;
    
    span {
      border-radius: 26px;
      transition: .2s;
    }
    
    span:before {
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      transition: .2s;
    }
    
    input:checked + span:before {
      transform: translateX(22px);
    }
  }

  /* Mobile styles */
  @media (max-width: 480px) {
    width: 52px;
    height: 28px;
    
    span {
      border-radius: 28px;
      transition: .1s;
    }
    
    span:before {
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
      transition: .1s;
    }
    
    input:checked + span:before {
      transform: translateX(24px);
    }
  }

  /* Small mobile styles */
  @media (max-width: 360px) {
    width: 56px;
    height: 30px;
    
    span {
      border-radius: 30px;
      transition: .1s;
    }
    
    span:before {
      height: 24px;
      width: 24px;
      left: 3px;
      bottom: 3px;
      transition: .1s;
    }
    
    input:checked + span:before {
      transform: translateX(26px);
    }
  }
`;

const ToggleSwitch = ({ checked, onChange, ...props }) => (
  <ToggleSwitchLabel>
    <input type="checkbox" checked={checked} onChange={onChange} {...props} />
    <span></span>
  </ToggleSwitchLabel>
);

export default ToggleSwitch;

