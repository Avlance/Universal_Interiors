"use client";
import React, { useState, useEffect } from 'react';
import Modal from '../../components/modal/js/Modal.jsx';
import styled from 'styled-components';
import Button from '../../components/button/js/Button.jsx';
import Input from '../../components/input/js/Input.jsx';
import { inputValidation } from '../../utils/js/InputValidation.jsx';
import { liveConsultation, sendOTP, verifyOTP } from './homeHttpRequest.js';
import { showSuccessToast, showFailureToast, showWarningToast } from '../../components/toast/js/ToastMessage.jsx';
import ToggleSwitch from '../../components/input/js/ToggleSwitch.jsx';
import Loader from '../../components/Loader.jsx';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const CountryPhoneRow = styled.div`
  display: flex;
  gap: 0;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    // flex-direction: column;
    // gap: 8px;
  }
`;

const CountryCodeLabel = styled.label`
  min-width: 50px;
  padding: 10px 8px;
  border: none;
  border-radius: 0;
  font-family: var(--universal-font);
  font-size: var(--universal-fs-h3);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #222;
  height: 48px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    min-width: 45px;
    padding: 9px 6px;
    height: 44px;
  }
  
  @media (max-width: 480px) {
    min-width: 40px;
    padding: 8px 4px;
    height: 42px;
  }
`;

const PhoneInput = styled(Input)`
  border-radius: 0 !important;
  height: 48px;
  
  @media (max-width: 768px) {
    border-radius: 0 !important;
    height: 44px;
  }
  
  @media (max-width: 480px) {
    border-radius: 0 !important;
    height: 42px;
  }
`;

// Modal Content Components
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    font-size: 18px;
  }
`;

const ImageSection = styled.div`
  flex: 0 0 400px;
  background: ${props => `url(${props.backgroundImage}) center center/cover no-repeat`};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-image 0.7s cubic-bezier(0.4,0.2,0.2,1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000066;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageContent = styled.div`
  text-align: center;
  color: white;
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const BottomLeftContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  text-align: left;
  z-index: 2;
`;

const BottomImageTitle = styled.h3`
  color: white;
  margin: 0;
  line-height: 1.2;
`;

const ContentSection = styled.div`
  flex: 0 0 350px;
  padding: 32px 28px 24px 28px;
  overflow-y: auto;
  border-radius: 16px;
  background-color: #F0F0F0;
  
  @media (max-width: 768px) {
    flex: none;
    padding: 24px 20px 20px 20px;
    border-radius: 0 0 16px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 24px;
    max-width: 100%;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 18px;
  color: #000;
  line-height: 1.3;
  text-align: left;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 14px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  height: 20px;
  background: transparent;
`;

const Dot = styled.div`
  width: ${props => props.active ? '16px' : '10px'};
  height: ${props => props.active ? '16px' : '10px'};
  border-radius: 50%;
  background: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.5)'};
  box-shadow: ${props => props.active ? '0 0 0 4px rgba(255,255,255,0.3)' : 'none'};
  transition: all 0.3s cubic-bezier(0.4,0.2,0.2,1);
  position: relative;
  &::after {
    content: '';
    display: ${props => props.active ? 'block' : 'none'};
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 1.5s infinite;
    background: rgba(255,255,255,0.3);
    z-index: 1;
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    70% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
  }
`;

const ConsentLabelInstruction = styled.p`
  color: #666;
  text-align: left;
  margin-top: 16px;
  line-height: 1.4;
`;

const ConsentLinkInstruction = styled.span`
  color: #5485EE;
  cursor: pointer;
  text-decoration: underline;
`;

const ConsentLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ConsentLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const WhatsAppIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
  svg {
    fill: #25D366;
  }
`;

const ConsentLink = styled.span`
  color: #5485EE;
  cursor: pointer;
  text-decoration: underline;
`;

// Array of background images for rotation
const backgroundImages = [
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657691/local_assets_migrated/home/hero/hero-1.webp',
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657692/local_assets_migrated/home/hero/hero-2.webp',
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657693/local_assets_migrated/home/hero/hero-3.webp',
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657694/local_assets_migrated/home/hero/hero-4.webp',
];

const cities = [
  '', 'Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Kolkata', 'Other'
];
const countries = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
];

const SubmitButton = styled.button`
  background: #D50F25;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  overflow: hidden;
  width: 100%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    background: #999;
    cursor: not-allowed;
    opacity: 0.7;
  }

  // &:hover {
  //   background: #b80c1e;
  // }
  
  @media (max-width: 768px) {
    height: 44px;
    margin-top: 6px;
    transition: background 0.1s;
  }
  
  @media (max-width: 480px) {
    height: 42px;
    margin-top: 4px;
    transition: background 0.05s;
  }
`;

const ButtonText = styled.span`
  flex-grow: 1;
  text-align: center;
`;

const RibbonWrapper = styled.div`
  position: absolute;
    top: 0px;
    right: 8px;
    display: flex
;
    align-items: center;
    justify-content: center;
`;

const RibbonText = styled.span`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #222;
  font-weight: bold;
  font-size: 12px;
  font-family: var(--universal-font-bold);
  pointer-events: none;
`;

// SVGs for country flags
const countryFlagSvgs = {
  '+91': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6.75H18V10.6875H0V6.75Z" fill="#E6E7E8" />
      <path d="M15.1875 2.53125H2.8125C0.948656 2.53125 0 3.91641 0 5.625V6.75H18V5.625C18 3.91641 17.0513 2.53125 15.1875 2.53125Z" fill="#FF9933" />
      <path d="M0 11.8125C0 13.5211 0.948656 14.9062 2.8125 14.9062H15.1875C17.0513 14.9062 18 13.5211 18 11.8125V10.6875H0V11.8125Z" fill="#128807" />
      <circle cx="9" cy="8.71875" r="1.125" fill="#010088" />
    </svg>
  ),
  '+1': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" fill="#B22234" />
      <rect y="2.25" width="18" height="1.5" fill="#fff" />
      <rect y="5.25" width="18" height="1.5" fill="#fff" />
      <rect y="8.25" width="18" height="1.5" fill="#fff" />
      <rect y="11.25" width="18" height="1.5" fill="#fff" />
      <rect y="14.25" width="18" height="1.5" fill="#fff" />
      <rect width="7.5" height="7.5" fill="#3C3B6E" />
      {/* 5-pointed stars can be added for more detail */}
    </svg>
  ),
  '+44': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" fill="#00247D" />
      <path d="M0 0L18 18M18 0L0 18" stroke="#fff" strokeWidth="2" />
      <path d="M0 0L18 18M18 0L0 18" stroke="#CF142B" strokeWidth="1" />
      <rect x="7" width="4" height="18" fill="#fff" />
      <rect y="7" width="18" height="4" fill="#fff" />
      <rect x="8" width="2" height="18" fill="#CF142B" />
      <rect y="8" width="18" height="2" fill="#CF142B" />
    </svg>
  ),
  '+61': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" fill="#00247D" />
      <circle cx="9" cy="9" r="3" fill="#fff" />
      <circle cx="9" cy="9" r="2" fill="#FFCC00" />
      {/* Southern Cross stars can be added for more detail */}
    </svg>
  ),
  '+971': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6" height="18" fill="#EF2B2D" />
      <rect x="6" width="6" height="18" fill="#fff" />
      <rect x="12" width="6" height="18" fill="#009639" />
    </svg>
  ),
};

const PincodeInputParent = styled.div`
  border-radius: 8px;
  width: 100%;
  
  @media (max-width: 768px) {
    // Additional mobile styles if needed
  }
`;

const ModalWrapper = styled.div`
  position: relative;
  min-height: 432px;
  display: flex;
  background: ${props => `url(${props.backgroundImage}) center center/cover no-repeat`};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000066;
    z-index: 1;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    max-height: 90vh;
    overflow: hidden;
  }
  
  @media (max-width: 480px) {
    max-height: 85vh;
  }
`;

const LiveConsultationForm = () => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [consentChecked, setConsentChecked] = useState(true);
  const [form, setForm] = useState({
    name: '',
    country: countries[0].code,
    phone: '',
    email: '',
    city: '',
    pincode: ''
  });
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  // const [otpError, setOtpError] = useState('');

  // Reset all form values, consent, and image index
  const resetFormState = () => {
    setForm({
      name: '',
      country: countries[0].code,
      phone: '',
      email: '',
      city: '',
      pincode: ''
    });
    setConsentChecked(true);
    setCurrentImageIndex(0);
    setOtpMode(false);
    setOtp('');
    setIsLoading(false);
    setIsOtpLoading(false);
    // setOtpError('');
  };

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple API calls
    if (isLoading) {
      return;
    }
    
    const phoneInput = document.querySelector('input[name="phone"]');
    const phoneInputParent = document.querySelector('input[name="phone"]').parentElement;

    const pincodeInput = document.querySelector('input[name="pincode"]');
    const pincodeInputParent = pincodeInput?.parentElement;
    const isPhoneValid = inputValidation(phoneInput, phoneInputParent);
    const isPincodeValid = inputValidation(pincodeInput, pincodeInputParent);
    if (!isPhoneValid || !isPincodeValid) {
      return;
    }

    setIsLoading(true);

    // Step 1: Send OTP
    const sendOtpPayload = {
      phone: form.phone
    };

    try {
      const sendOtpResult = await sendOTP(sendOtpPayload);
      setOtpMode(true);
      const message = sendOtpResult?.message || 'OTP sent successfully!';
      showSuccessToast(message);
    } catch (errorMessage) {
      const message = errorMessage || 'Failed to send OTP. Please try again.';
      showFailureToast(message, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple API calls
    if (isOtpLoading) {
      return;
    }
    
    const otpInput = document.querySelector('input[name="otp"]');
    const isOtpValid = inputValidation(otpInput);
    if (!isOtpValid) {
      return;
    }

    setIsOtpLoading(true);

    // Step 2: Verify OTP
    const verifyOtpPayload = {
      phone: form.phone,
      otp: otp
    };

    try {
      await verifyOTP(verifyOtpPayload);

      // Step 3: Call liveConsultation API after successful OTP verification
      const liveConsultationPayload = {
        phone: form.phone,
        whatsappUpdates: consentChecked,
        pinCode: form.pincode
      };

      const liveConsultationResult = await liveConsultation(liveConsultationPayload);
      setOpen(false);
      setOtpMode(false);
      setOtp('');
      resetFormState();
      const message = liveConsultationResult?.message || 'Live consultation booked successfully!';
      showSuccessToast(message);
    } catch (errorMessage) {
      const message = errorMessage || 'OTP verification failed. Please try again.';
      showFailureToast(message, 4000);
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <>
      <Button primary onClick={() => setOpen(true)} style={{ marginRight: "10px" }}>Live Consultation</Button>

      <Modal open={open} onClose={() => { setOpen(false); resetFormState(); }}>
        <CloseButton onClick={() => { setOpen(false); resetFormState(); }} className="universal-fs-h8 universal-font">&times;</CloseButton>
        <ModalWrapper backgroundImage={backgroundImages[currentImageIndex]}>
          <ImageSection backgroundImage={backgroundImages[currentImageIndex]}>
            <BottomLeftContent>
              <BottomImageTitle className="universal-fs-h6 universal-font-extra-bold">Your Sofa Called —</BottomImageTitle>
              <BottomImageTitle className="universal-fs-h6 universal-font-extra-bold">It Wants a <span style={{ color: "#FAC73D" }}>Makeover.</span></BottomImageTitle>
              <DotsContainer>
                {backgroundImages.map((_, idx) => (
                  <Dot key={idx} active={currentImageIndex === idx} />
                ))}
              </DotsContainer>
            </BottomLeftContent>
            <ImageContent>
            </ImageContent>
          </ImageSection>
          <ContentSection>
            <ModalTitle className="universal-fs-h6 universal-font-bold">
              <div>We <span style={{ color: "#D50F25" }}>Design</span></div>
              <div>You <span style={{ color: "#5485EE" }}>Relax</span></div>
              <div>First Session's On <span style={{ color: "#559944" }}>Us.</span></div>
            </ModalTitle>
            {!otpMode && (
              <Form>
                <div>
                  <CountryPhoneRow>
                    <CountryCodeLabel>+91</CountryCodeLabel>
                    <PhoneInput
                      name="phone"
                      type="tel"
                      placeholder="Enter your Mobile Number*"
                      value={form.phone}
                      onChange={handleInputChange}
                      required
                      style={{ flex: 1, border: 'none', borderRadius: 0 }}
                      className="universal-fs-h3 universal-font"
                    />
                  </CountryPhoneRow>
                </div>
                <ConsentLabelRow>
                  <span style={{ color: "#8692A6" }} className='universal-fs-h2'>Send Updates on whatsapp</span>
                  <ToggleSwitch checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} required />
                </ConsentLabelRow>
                <div>
                  <PincodeInputParent>
                    <Input
                      name="pincode"
                      type="text"
                      placeholder="Enter your PINCODE"
                      value={form.pincode || ''}
                      onChange={handleInputChange}
                      required
                      className="universal-fs-h3 universal-font"
                      style={{ flex: 1, border: 'none' }}
                    />
                  </PincodeInputParent>
                </div>
                <SubmitButton type="button" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <Loader 
                      type="button" 
                      text="Sending OTP..." 
                      textColor="#ffffff"
                      fontSize="14px"
                      mobileFontSize="13px"
                      smallMobileFontSize="12px"
                      buttonSpinnerSize="16px"
                      buttonSpinnerMobileSize="14px"
                      buttonSpinnerSmallMobileSize="12px"
                    />
                  ) : (
                    <>
                      <ButtonText className="universal-fs-h4 universal-font-semibold">Book a live Consultation</ButtonText>
                      <RibbonWrapper>
                        <svg width="51" height="46" viewBox="0 0 51 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_373_12689)">
                            <path d="M11.25 37.5628V2.27433C11.25 1.10346 11.6423 0.126617 12.4268 -0.656217C13.2113 -1.43905 14.1882 -1.83131 15.3573 -1.83301H37.6452C38.8144 -1.83301 39.7912 -1.44074 40.5758 -0.656217C41.3603 0.128311 41.7517 1.10516 41.75 2.27433V37.5628L26.5 31.013L11.25 37.5628Z" fill="url(#paint0_linear_373_12689)" />
                            <path d="M20.85 15.54H18.2V16.89H20.8V18.43H18.2V21H16.6V14H20.85V15.54ZM25.4753 21L24.1553 18.7H23.3953V21H21.7953V14H24.5953C25.262 14 25.8286 14.2333 26.2953 14.7C26.762 15.1667 26.9953 15.7333 26.9953 16.4C26.9953 16.8267 26.8753 17.2233 26.6353 17.59C26.402 17.95 26.092 18.23 25.7053 18.43L27.1953 21H25.4753ZM23.3953 15.5V17.3H24.5953C24.8153 17.3 25.002 17.2133 25.1553 17.04C25.3153 16.8667 25.3953 16.6533 25.3953 16.4C25.3953 16.1467 25.3153 15.9333 25.1553 15.76C25.002 15.5867 24.8153 15.5 24.5953 15.5H23.3953ZM29.5477 19.46H32.3477V21H27.9477V14H32.2977V15.54H29.5477V16.7H32.0477V18.22H29.5477V19.46ZM34.8504 19.46H37.6504V21H33.2504V14H37.6004V15.54H34.8504V16.7H37.3504V18.22H34.8504V19.46Z" fill="#1D1D1D" />
                          </g>
                          <defs>
                            <linearGradient id="paint0_linear_373_12689" x1="26.5" y1="-1.83301" x2="26.5" y2="37.5628" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#D4AF37" />
                              <stop offset="1" stopColor="#FFD700" />
                            </linearGradient>
                            <clipPath id="clip0_373_12689">
                              <rect width="51" height="46" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </RibbonWrapper>
                    </>
                  )}
                </SubmitButton>
                <ConsentLabelInstruction className="universal-fs-h2 universal-font">
                  By proceeding, you consent to our <ConsentLinkInstruction>Terms</ConsentLinkInstruction> and acknowledge our <ConsentLink>Privacy Policy</ConsentLink>
                </ConsentLabelInstruction>
              </Form>
            )}
            {otpMode && (
              <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
                <span style={{ textAlign: "left", color: "#8692A6" }} className="universal-fs-h3 universal-font">We've sent a verification code to your registered mobile number.</span>
                <div>
                  <Input
                    name="otp"
                    type="text"
                    placeholder="Enter verification code*"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    maxLength={6}
                    style={{ width: '100%' }}
                    className="universal-fs-h3 universal-font"
                    autoFocus
                  />
                </div>
                {/* {otpError && <span style={{ color: '#DB4437', fontSize: '0.95em', marginTop: 4 }}>{otpError}</span>} */}
                <SubmitButton type="submit" disabled={isOtpLoading}>
                  {isOtpLoading ? (
                    <Loader 
                      type="button" 
                      text="Verifying..." 
                      textColor="#ffffff"
                      fontSize="14px"
                      mobileFontSize="13px"
                      smallMobileFontSize="12px"
                      buttonSpinnerSize="16px"
                      buttonSpinnerMobileSize="14px"
                      buttonSpinnerSmallMobileSize="12px"
                    />
                  ) : (
                    <ButtonText className="universal-fs-h4 universal-font-semibold">Verify OTP</ButtonText>
                  )}
                </SubmitButton>
              </form>
            )}
          </ContentSection>
        </ModalWrapper>
      </Modal >
    </>
  );
};

export default LiveConsultationForm; 

