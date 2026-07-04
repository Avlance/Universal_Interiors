"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaWhatsapp, FaSms } from 'react-icons/fa';
import Input from '../../components/input/js/Input.jsx';
import { inputValidation, selectValidation } from '../../utils/js/InputValidation.jsx';
import { showSuccessToast, showFailureToast } from '../../components/toast/js/ToastMessage.jsx';
import { freeConsultation, sendOTP, verifyOTP } from './homeHttpRequest.js';
import Loader from '../../components/Loader.jsx';
import ToggleSwitch from '../../components/input/js/ToggleSwitch.jsx';

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Select = styled.select`
  font-family: var(--universal-font);
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  
  &::placeholder {
    font-family: var(--universal-font);
    font-size: var(--universal-fs-h3);
  }
  
  &:focus {
    outline: none;
    border: none;
  }
  
  @media (max-width: 768px) {
    padding: 9px 12px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

const CountryPhoneRow = styled.div`
  display: flex;
  gap: 0;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    
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

const ImageSection = styled.div`
  flex: 0 0 450px;
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
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 14px;
    max-width: 100%;

    div {
      max-width: 100%;
    }
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

const ConsentLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const ConsentLabel = styled.p`
  color: #666;
  text-align: left;
  margin-top: 16px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    margin-top: 14px;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    margin-top: 12px;
    line-height: 1.3;
  }
`;

const ConsentLink = styled.span`
  color: #5485EE;
  cursor: pointer;
  text-decoration: underline;
`;

const ModalWrapper = styled.div`
  position: relative;
  min-height: 432px;
  display: flex;
  background: ${props => `url(${props.backgroundImage}) center center/cover no-repeat`};
  border-radius: 16px;
  overflow: hidden;

  & > * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  @media (max-width: 480px) {
    max-height: 85vh;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

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
  }
  
  @media (max-width: 480px) {
    height: 42px;
    margin-top: 4px;
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
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChannelPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
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
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ChannelTitle = styled.span`
  font-weight: 600;
  color: #111;
  font-size: 14px;
  font-family: var(--universal-font);
`;

const ChannelDesc = styled.span`
  color: #777;
  font-size: 12px;
  font-family: var(--universal-font);
`;

const ChannelRadio = styled.span`
  margin-left: auto;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${props => props.$selected ? '#D50F25' : '#ccc'};
  background: ${props => props.$selected ? '#D50F25' : 'transparent'};
  flex-shrink: 0;
`;

const OTPInputGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 10px 0;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const OTPInput = styled.input`
  width: 45px;
  height: 48px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: var(--universal-font);
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #D50F25;
    outline: none;
  }
  
  @media (max-width: 480px) {
    width: 38px;
    height: 42px;
    font-size: 18px;
  }
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

const ConsultationFormContent = ({ onSuccess }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [otpMode, setOtpMode] = useState(false);
  const [channelMode, setChannelMode] = useState(false); // step 2: channel picker
  const [otpChannel, setOtpChannel] = useState('whatsapp'); // 'sms' | 'whatsapp'
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [consultationPayload, setConsultationPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [consentChecked, setConsentChecked] = useState(true);
  const [form, setForm] = useState({
    name: '',
    country: countries[0].code,
    phone: '',
    email: '',
    city: '',
  });

  // Reset all form values and image index
  const resetFormState = () => {
    setForm({
      name: '',
      country: countries[0].code,
      phone: '',
      email: '',
      city: '',
    });
    setConsentChecked(false);
    setCurrentImageIndex(0);
    setIsLoading(false);
    setIsOtpLoading(false);
    setChannelMode(false);
    setOtpChannel('whatsapp');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input automatically
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  // Called after user picks a channel and confirms
  const handleSendOTP = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const sendOtpResult = await sendOTP({ phone: form.phone, channel: otpChannel });
      setChannelMode(false);
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
    
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      showFailureToast('Please enter the complete 6-digit verification code', 4000);
      return;
    }

    setIsOtpLoading(true);

    try {
      const verifyPayload = {
        phone: form.phone,
        otp: otpValue
      };
      
      await verifyOTP(verifyPayload);
      
      // OTP verified successfully, now submit consultation
      if (consultationPayload) {
        const result = await freeConsultation(consultationPayload);
        if (result?.status === 'CREATED') {
          showSuccessToast('Your Consultation is Booked.soon,we will reach you.');
          // If API call is successful, proceed
          resetFormState();
          setOtpMode(false);
          setOtp(new Array(6).fill(''));
          setConsultationPayload(null);
          // Call the onSuccess callback if provided
          if (onSuccess) {
            onSuccess();
          }
        } else {
          showFailureToast('Failed to Book Consultation. Please try again.');
        }
      }
    } catch (errorMessage) {
      const message = errorMessage || 'OTP verification failed. Please try again.';
      showFailureToast(message, 4000);
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Scope queries to THIS form only — avoid grabbing wrong inputs from other forms on the page
    const formEl = e.currentTarget;
    const nameInput = formEl.querySelector('input[name="name"]');
    const phoneInput = formEl.querySelector('input[name="phone"]');
    const phoneInputParent = phoneInput?.parentElement;
    const emailInput = formEl.querySelector('input[name="email"]');
    const citySelect = formEl.querySelector('select[name="city"]');

    const isNameValid = inputValidation(nameInput);
    const isPhoneValid = inputValidation(phoneInput, phoneInputParent);
    const isEmailValid = inputValidation(emailInput);
    const isCityValid = selectValidation(citySelect);

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isCityValid) return;

    const payload = {
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      city: citySelect.value,
      whatsappUpdates: consentChecked,
    };

    // Store the payload then show channel picker (step 2)
    setConsultationPayload(payload);
    setChannelMode(true);
  };


  return (
    <ModalWrapper>
      <ContentWrapper>
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
          {channelMode && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
              <span className="universal-fs-h4 universal-font-semibold" style={{ color: '#111' }}>How would you like to receive your OTP?</span>
              <span className="universal-fs-h3 universal-font" style={{ color: '#8692A6' }}>Sending to +91 {consultationPayload?.phone}</span>
              <ChannelPickerWrapper>
                <ChannelOption type="button" $selected={otpChannel === 'whatsapp'} onClick={() => setOtpChannel('whatsapp')}>
                  <ChannelIcon><FaWhatsapp color="#25D366" /></ChannelIcon>
                  <ChannelInfo>
                    <ChannelTitle>WhatsApp</ChannelTitle>
                    <ChannelDesc>Receive code on WhatsApp</ChannelDesc>
                  </ChannelInfo>
                  <ChannelRadio $selected={otpChannel === 'whatsapp'} />
                </ChannelOption>
                <ChannelOption type="button" $selected={otpChannel === 'sms'} onClick={() => setOtpChannel('sms')}>
                  <ChannelIcon><FaSms color="#4A90E2" /></ChannelIcon>
                  <ChannelInfo>
                    <ChannelTitle>SMS</ChannelTitle>
                    <ChannelDesc>Receive code as a text message</ChannelDesc>
                  </ChannelInfo>
                  <ChannelRadio $selected={otpChannel === 'sms'} />
                </ChannelOption>
              </ChannelPickerWrapper>
              <SubmitButton type="button" onClick={handleSendOTP} disabled={isLoading}>
                {isLoading ? (
                  <Loader type="button" text="Sending OTP..." textColor="#ffffff" fontSize="14px" mobileFontSize="13px" smallMobileFontSize="12px" buttonSpinnerSize="16px" buttonSpinnerMobileSize="14px" buttonSpinnerSmallMobileSize="12px" />
                ) : (
                  <ButtonText className="universal-fs-h4 universal-font-semibold">Send OTP</ButtonText>
                )}
              </SubmitButton>
              <span
                onClick={() => setChannelMode(false)}
                style={{ textAlign: 'center', color: '#5485EE', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--universal-font)' }}
              >← Back</span>
            </div>
          )}
          {!channelMode && !otpMode ? (
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <Input
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleInputChange}
                  style={{ flex: 1, border: 'none' }}
                />
              </InputContainer>
              <InputContainer>
                <CountryPhoneRow>
                  <CountryCodeLabel>+91</CountryCodeLabel>
                  <PhoneInput
                    name="phone"
                    type="tel"
                    placeholder="Enter your Mobile Number*"
                    value={form.phone}
                    onChange={handleInputChange}
                    style={{ flex: 1, border: 'none', borderRadius: 0 }}
                  />
                </CountryPhoneRow>
              </InputContainer>
              <InputContainer>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleInputChange}
                  style={{ flex: 1, border: 'none' }}
                />
              </InputContainer>
              <ConsentLabelRow>
                <span style={{ color: "#8692A6" }} className='universal-fs-h3'>Send Updates on whatsapp</span>
                <ToggleSwitch checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} required />
              </ConsentLabelRow>
              <InputContainer>
                <Select
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className="universal-fs-h3 universal-font"
                  style={{ flex: 1, border: 'none' }}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city ? city : 'Choose city'}</option>
                  ))}
                </Select>
              </InputContainer>
              <SubmitButton type="submit" disabled={isLoading}>
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
                    <ButtonText className="universal-fs-h4 universal-font-semibold">Submit</ButtonText>
                    <RibbonWrapper>
                      <svg width="51" height="46" viewBox="0 0 51 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_373_12689)"> <path d="M11.25 37.5628V2.27433C11.25 1.10346 11.6423 0.126617 12.4268 -0.656217C13.2113 -1.43905 14.1882 -1.83131 15.3573 -1.83301H37.6452C38.8144 -1.83301 39.7912 -1.44074 40.5758 -0.656217C41.3603 0.128311 41.7517 1.10516 41.75 2.27433V37.5628L26.5 31.013L11.25 37.5628Z" fill="url(#paint0_linear_373_12689)" /> <path d="M20.85 15.54H18.2V16.89H20.8V18.43H18.2V21H16.6V14H20.85V15.54ZM25.4753 21L24.1553 18.7H23.3953V21H21.7953V14H24.5953C25.262 14 25.8286 14.2333 26.2953 14.7C26.762 15.1667 26.9953 15.7333 26.9953 16.4C26.9953 16.8267 26.8753 17.2233 26.6353 17.59C26.402 17.95 26.092 18.23 25.7053 18.43L27.1953 21H25.4753ZM23.3953 15.5V17.3H24.5953C24.8153 17.3 25.002 17.2133 25.1553 17.04C25.3153 16.8667 25.3953 16.6533 25.3953 16.4C25.3953 16.1467 25.3153 15.9333 25.1553 15.76C25.002 15.5867 24.8153 15.5 24.5953 15.5H23.3953ZM29.5477 19.46H32.3477V21H27.9477V14H32.2977V15.54H29.5477V16.7H32.0477V18.22H29.5477V19.46ZM34.8504 19.46H37.6504V21H33.2504V14H37.6004V15.54H34.8504V16.7H37.3504V18.22H34.8504V19.46Z" fill="#1D1D1D" /> </g> <defs> <linearGradient id="paint0_linear_373_12689" x1="26.5" y1="-1.83301" x2="26.5" y2="37.5628" gradientUnits="userSpaceOnUse"> <stop stopColor="#D4AF37" /> <stop offset="1" stopColor="#FFD700" /> </linearGradient> <clipPath id="clip0_373_12689"> <rect width="51" height="46" fill="white" /> </clipPath> </defs> </svg>
                    </RibbonWrapper>
                  </>
                )}
              </SubmitButton>
              <ConsentLabel className="universal-fs-h2 universal-font">
                By proceeding, you consent to our <ConsentLink>Terms</ConsentLink> and acknowledge our <ConsentLink>Privacy Policy</ConsentLink>
              </ConsentLabel>
            </Form>
          ) : !channelMode && (
            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
              <span style={{ textAlign: "left", color: "#8692A6" }} className="universal-fs-h3 universal-font">We've sent a verification code to your registered mobile number and email.</span>
              <OTPInputGroup>
                {otp.map((data, index) => (
                  <OTPInput
                    key={index}
                    type="text"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={e => handleOtpChange(e.target, index)}
                    onKeyDown={e => handleOtpKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                    autoFocus={index === 0}
                  />
                ))}
              </OTPInputGroup>
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
      </ContentWrapper>
    </ModalWrapper>
  );
};

export default ConsultationFormContent; 

