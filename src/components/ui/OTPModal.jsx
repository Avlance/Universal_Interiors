'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp, FaSms } from 'react-icons/fa';
import Loader from './../Loader';
import { showFailureToast } from './../toast/js/ToastMessage';
import { auth } from './../../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  animation: ${scaleUp} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  &:hover { color: #111; }
`;

const Title = styled.h3`
  font-family: var(--universal-font-bold);
  font-size: 20px;
  color: #111;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-family: var(--universal-font);
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

const ChannelPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChannelOption = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.$selected ? '#D50F25' : '#ddd'};
  background: ${props => props.$selected ? '#fff5f5' : '#fff'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    border-color: #D50F25;
    background: #fff5f5;
  }
`;

const ChannelIcon = styled.span`
  font-size: 28px;
  display: flex;
  align-items: center;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelTitle = styled.span`
  font-weight: 600;
  color: #111;
  font-size: 14px;
`;

const ChannelDesc = styled.span`
  color: #777;
  font-size: 12px;
`;

const OTPInput = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 18px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  letter-spacing: 4px;
  &:focus {
    border-color: #D50F25;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: #D50F25;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  width: 100%;
  font-family: var(--universal-font-medium);
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 16px;
  
  &:hover {
    background: #b00c1e;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const BackLink = styled.span`
  display: inline-block;
  margin-top: 16px;
  color: #5485EE;
  font-size: 13px;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

export default function OTPModal({ isOpen, onClose, phone, onVerifySuccess }) {
  const [step, setStep] = useState('channel'); // 'channel' | 'otp'
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'sms'
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Firebase Auth variables
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Initialize Recaptcha ONLY when modal opens to avoid duplication crashes
  useEffect(() => {
    if (isOpen) {
      if (!window.recaptchaVerifierUniversal) {
        window.recaptchaVerifierUniversal = new RecaptchaVerifier(auth, 'universal-recaptcha-container', {
          size: 'invisible',
        });
      }
    } else {
      // Cleanup when modal closes
      if (window.recaptchaVerifierUniversal) {
        window.recaptchaVerifierUniversal.clear();
        window.recaptchaVerifierUniversal = null;
      }
      setStep('channel');
      setOtp('');
      setConfirmationResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const formattedPhone = `+91${phone}`;
      
      if (channel === 'sms') {
        // --- FIREBASE SMS OTP ---
        const appVerifier = window.recaptchaVerifierUniversal;
        const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(result);
        setStep('otp');
      } else {
        // --- META WHATSAPP OTP ---
        const res = await fetch('/api/auth/whatsapp/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formattedPhone })
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("WhatsApp Backend Error Details:", errorData.details || errorData);
          throw new Error("Failed to send WhatsApp OTP");
        }
        setStep('otp');
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      showFailureToast('Failed to send OTP. Please try again.');
      
      // If Recaptcha fails or expires, we should clear it so the user can try again
      if (window.recaptchaVerifierUniversal) {
         window.recaptchaVerifierUniversal.clear();
         window.recaptchaVerifierUniversal = null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) return;
    
    setIsLoading(true);
    try {
      if (channel === 'sms') {
        // --- FIREBASE SMS VERIFICATION ---
        await confirmationResult.confirm(otp);
        onVerifySuccess();
      } else {
        // --- META WHATSAPP VERIFICATION ---
        const formattedPhone = `+91${phone}`;
        const res = await fetch('/api/auth/whatsapp/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: formattedPhone, code: otp })
        });
        
        if (!res.ok) throw new Error("Invalid WhatsApp OTP");
        onVerifySuccess();
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
      showFailureToast('Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <div id="universal-recaptcha-container"></div>
        
        {step === 'channel' ? (
          <>
            <Title>Verification Required</Title>
            <Subtitle>Where should we send your OTP code?</Subtitle>
            
            <ChannelPickerWrapper>
              <ChannelOption $selected={channel === 'whatsapp'} onClick={() => setChannel('whatsapp')}>
                <ChannelIcon><FaWhatsapp color="#25D366" /></ChannelIcon>
                <ChannelInfo>
                  <ChannelTitle>WhatsApp</ChannelTitle>
                  <ChannelDesc>Receive code via WhatsApp</ChannelDesc>
                </ChannelInfo>
              </ChannelOption>
              
              <ChannelOption $selected={channel === 'sms'} onClick={() => setChannel('sms')}>
                <ChannelIcon><FaSms color="#4A90E2" /></ChannelIcon>
                <ChannelInfo>
                  <ChannelTitle>SMS Text Message</ChannelTitle>
                  <ChannelDesc>Receive standard text message</ChannelDesc>
                </ChannelInfo>
              </ChannelOption>
            </ChannelPickerWrapper>
            
            <SubmitButton onClick={handleSendOTP} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send OTP'}
            </SubmitButton>
          </>
        ) : (
          <>
            <Title>Enter Verification Code</Title>
            <Subtitle>We sent a 6-digit code to +91 {phone}</Subtitle>
            
            <OTPInput 
              type="text" 
              maxLength="6" 
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoFocus
            />
            
            <SubmitButton onClick={handleVerifyOTP} disabled={isLoading || otp.length < 6}>
              {isLoading ? 'Verifying...' : 'Verify & Submit'}
            </SubmitButton>
            
            <BackLink onClick={() => setStep('channel')}>← Change Channel</BackLink>
          </>
        )}
        
      </ModalBox>
    </ModalOverlay>
  );
}
