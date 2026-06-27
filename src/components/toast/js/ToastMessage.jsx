"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
`;

const ToastItem = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'success':
        return '#4CAF50';
      case 'failure':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
        return '#2196F3';
      default:
        return '#333';
    }
  }};
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: var(--universal-font);
  font-size: 14px;
  font-weight: 500;
  min-width: 300px;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(-100%)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const Icon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const Message = styled.span`
  flex: 1;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  margin-left: 12px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ToastMessage = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Listen for custom toast events
    const handleToast = (event) => {
      const { type, message, duration = 5000 } = event.detail;
      addToast(type, message, duration);
    };

    window.addEventListener('showToast', handleToast);
    return () => window.removeEventListener('showToast', handleToast);
  }, []);

  const addToast = (type, message, duration) => {
    const id = Date.now() + Math.random();
    const newToast = { id, type, message, visible: false };

    setToasts(prev => [...prev, newToast]);

    // Show toast with animation
    setTimeout(() => {
      setToasts(prev =>
        prev.map(toast =>
          toast.id === id ? { ...toast, visible: true } : toast
        )
      );
    }, 100);

    // Auto remove toast
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <rect opacity="0.3" width="24" height="24" rx="6" fill="black" /> <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>);
      case 'failure':
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <rect opacity="0.3" width="24" height="24" rx="6" fill="black" /> <path d="M15 9.00002L9 15M8.99997 9L14.9999 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" /> </svg>);
      case 'warning':
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <rect opacity="0.3" width="24" height="24" rx="6" fill="black" /> <path d="M12 9V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /> <circle cx="12" cy="17" r="1" fill="white" /> </svg>);
      case 'info':
        return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <rect opacity="0.3" width="24" height="24" rx="6" fill="black" /> <path d="M12 9V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" /> <circle cx="12" cy="17" r="1" fill="white" /> </svg>);
      default:
        return '•';
    }
  };

  return (
    <ToastContainer>
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          type={toast.type}
          visible={toast.visible}
          onClick={() => removeToast(toast.id)}
        >
          <ToastContent>
            <Icon>{getIcon(toast.type)}</Icon>
            <Message>{toast.message}</Message>
          </ToastContent>
          <CloseButton onClick={(e) => {
            e.stopPropagation();
            removeToast(toast.id);
          }}>
            ×
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

// Utility function to show toast messages
export const showToast = (type, message, duration = 5000) => {
  const event = new CustomEvent('showToast', {
    detail: { type, message, duration }
  });
  window.dispatchEvent(event);
};

// Convenience functions for each toast type
export const showSuccessToast = (message, duration) => showToast('success', message, duration);
export const showFailureToast = (message, duration) => showToast('failure', message, duration);
export const showWarningToast = (message, duration) => showToast('warning', message, duration);
export const showInfoToast = (message, duration) => showToast('info', message, duration);

export default ToastMessage;

