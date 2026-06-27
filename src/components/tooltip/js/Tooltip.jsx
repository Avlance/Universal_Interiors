"use client";
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4286F5;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s ease;
  user-select: none;
  
  &:hover {
    background-color: #4286F5;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  background: #FFFFFF;
  color: #222222;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1000;
  border: 1px solid #FF919D;
  box-shadow: 0px 0px 30px 0px #0000001A;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  width: 50vw;
  max-width: 400px;
  min-width: 200px;
  word-wrap: break-word;
  white-space: normal;
  
  /* Arrow */
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
  }
  
  /* Position variants */
  ${props => {
    switch (props.position) {
      case 'top':
        return `
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          &::before {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: #FF919D;
          }
        `;
      case 'bottom':
        return `
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          &::before {
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: #FF919D;
          }
        `;
      case 'left':
        return `
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          &::before {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-left-color: #FF919D;
          }
        `;
      case 'right':
        return `
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          &::before {
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-right-color: #FF919D;
          }
        `;
      default:
        return `
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          &::before {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: #FF919D;
          }
        `;
    }
  }}
  
  @media (max-width: 1024px) {
    width: 60vw;
    max-width: 350px;
    min-width: 180px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 10px;
    width: 70vw;
    max-width: 300px;
    min-width: 160px;
    
    /* Adjust positioning for mobile */
    ${props => {
      switch (props.position) {
        case 'top':
          return `
            bottom: calc(100% + 6px);
            &::before {
              border-width: 5px;
            }
          `;
        case 'bottom':
          return `
            top: calc(100% + 6px);
            &::before {
              border-width: 5px;
            }
          `;
        case 'left':
          return `
            right: calc(100% + 6px);
            &::before {
              border-width: 5px;
            }
          `;
        case 'right':
          return `
            left: calc(100% + 6px);
            &::before {
              border-width: 5px;
            }
          `;
        default:
          return `
            bottom: calc(100% + 6px);
            &::before {
              border-width: 5px;
            }
          `;
      }
    }}
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 5px 8px;
    width: 80vw;
    max-width: 280px;
    min-width: 140px;
    
    /* Further adjust positioning for small mobile */
    ${props => {
      switch (props.position) {
        case 'top':
          return `
            bottom: calc(100% + 5px);
            &::before {
              border-width: 4px;
            }
          `;
        case 'bottom':
          return `
            top: calc(100% + 5px);
            &::before {
              border-width: 4px;
            }
          `;
        case 'left':
          return `
            right: calc(100% + 5px);
            &::before {
              border-width: 4px;
            }
          `;
        case 'right':
          return `
            left: calc(100% + 5px);
            &::before {
              border-width: 4px;
            }
          `;
        default:
          return `
            bottom: calc(100% + 5px);
            &::before {
              border-width: 4px;
            }
          `;
      }
    }}
  }
  
  @media (max-width: 360px) {
    width: 85vw;
    max-width: 260px;
    min-width: 120px;
    font-size: 11px;
    padding: 4px 6px;
  }
`;

const Tooltip = ({ 
  content, 
  position = 'auto', 
  children, 
  icon = '!',
  className = '',
  delay = 200 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [calculatedPosition, setCalculatedPosition] = useState('top');
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Calculate optimal position based on viewport space
  const calculatePosition = () => {
    if (!containerRef.current || position !== 'auto') {
      return position;
    }

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Estimate tooltip height (approximate) - updated for responsive width
    const tooltipHeight = 80; // Increased height estimate for wider tooltips
    const tooltipWidth = Math.min(viewportWidth * 0.5, 400); // 50% of viewport width, max 400px
    
    // Check vertical space
    const spaceAbove = rect.top;
    const spaceBelow = viewportHeight - rect.bottom;
    
    // Check horizontal space
    const spaceLeft = rect.left;
    const spaceRight = viewportWidth - rect.right;
    
    // Determine vertical position
    let verticalPosition = 'top';
    if (spaceBelow >= tooltipHeight + 8) {
      verticalPosition = 'bottom';
    } else if (spaceAbove >= tooltipHeight + 8) {
      verticalPosition = 'top';
    } else {
      // If neither top nor bottom has enough space, choose the one with more space
      verticalPosition = spaceBelow > spaceAbove ? 'bottom' : 'top';
    }
    
    // Determine horizontal position (for left/right positioning)
    let horizontalPosition = 'center';
    if (spaceRight < tooltipWidth / 2) {
      horizontalPosition = 'left';
    } else if (spaceLeft < tooltipWidth / 2) {
      horizontalPosition = 'right';
    }
    
    // For now, we'll use vertical positioning (top/bottom)
    // You can extend this to support left/right positioning if needed
    return verticalPosition;
  };

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      const optimalPosition = calculatePosition();
      setCalculatedPosition(optimalPosition);
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Handle window resize to recalculate position
  useEffect(() => {
    const handleResize = () => {
      if (isVisible && position === 'auto') {
        const optimalPosition = calculatePosition();
        setCalculatedPosition(optimalPosition);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, position]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Use calculated position or fallback to provided position
  const finalPosition = position === 'auto' ? calculatedPosition : position;

  return (
    <TooltipContainer 
      ref={containerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      className={className}
    >
      {children || <TooltipIcon>{icon}</TooltipIcon>}
      <TooltipContent className='universal-font-medium'
        ref={tooltipRef}
        isVisible={isVisible} 
        position={finalPosition}
        role="tooltip"
        aria-hidden={!isVisible}
      >
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip; 

