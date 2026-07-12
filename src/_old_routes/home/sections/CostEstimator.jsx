"use client";
import React, { forwardRef, useState, useRef } from 'react';
import styled from 'styled-components';
import Button from "../../../components/button/js/Button.jsx";
import { inputValidation, selectValidation } from '../../../utils/js/InputValidation.jsx';
import { submitEstimation } from "../homeHttpRequest.js";
import { showSuccessToast, showFailureToast } from "../../../components/toast/js/ToastMessage.jsx";
import ProgressBar from '../../../components/ProgressBar.jsx';
import ToggleSwitch from "../../../components/input/js/ToggleSwitch.jsx";
import Input from '../../../components/input/js/Input.jsx';
import ConfirmationAlert from '../../../components/ConfirmationAlert.jsx';
import Tooltip from '../../../components/tooltip/js/Tooltip.jsx';
import Loader from '../../../components/Loader.jsx';
import { FaWhatsapp, FaSms } from 'react-icons/fa';
import SuccessModal from '../../../components/ui/SuccessModal';
import { auth } from '../../../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const TestimonialsContainer = styled.section`
  margin-bottom: 80px;
  padding: 0;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    margin-bottom: 50px;
    padding: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 50px;
    padding: 0;
  }
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const SectionDescription = styled.p`
  color: #222222;
  margin: 0 auto 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0 auto 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin: 0 auto 20px;
  }
`;

const ConsentLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 480px) {
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const ResponsiveH4 = styled.h4`
  margin-bottom: 1rem;
  margin-top: 0;

  &.universal-font-bold {
    @media (max-width: 768px) {
      font-size: var(--universal-fs-h4);
    }

    @media (max-width: 480px) {
      font-size: var(--universal-fs-h3);
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const GridItem = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #D6D6D6;

  svg {
    width: 49px;
    height: 49px;
    flex-shrink: 0;
  }

  span {
    font-size: var(--universal-fs-h5);
    font-weight: 500;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.5rem;
    
    svg {
      width: 40px;
      height: 40px;
    }

    span {
      font-size: var(--universal-fs-h4);
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.5rem;
    
    svg {
      width: 32px;
      height: 32px;
    }

    span {
      font-size: var(--universal-fs-h3);
      line-height: 1.1;
    }
  }
`;

const StepOneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #999999;
  width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  background: #fff;
  min-height: 530px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
    padding: 1.5rem;
    margin: 1.5rem auto;
    // min-height: auto;
    min-height: 490px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 1rem auto;
    gap: 0.75rem;
    min-height: 490px;
  }
`;

const StepTwoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #999999;
  width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  background: #fff;
  min-height: 530px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
    padding: 1.5rem;
    margin: 1.5rem auto;
    // min-height: auto;
    min-height: 490px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 1rem auto;
    gap: 0.75rem;
    min-height: 490px;
  }
`;

const StepThreeContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #999999;
  width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  background: #fff;
  min-height: 530px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 450px;
    padding: 1.5rem;
    margin: 1.5rem auto;
    min-height: 490px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 1rem auto;
    gap: 0.75rem;
    min-height: 490px;
  }
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// const Input = styled.input`
// width: 100%;
// font-family: var(--universal-font);
//   padding: 10px 14px;
//   border: 1px solid #999999;
//   border-radius: 6px;


//   &::placeholder {
//     font-family: var(--universal-font);
//     font-size: var(--universal-fs-h3);
//   }

//   &:focus {
//     outline: none;
//     border: 1px solid #999999;
//   }
// `;

const Select = styled.select`
width: 100%;
font-family: var(--universal-font);
  padding: 10px 14px;
  border: 1px solid #999999;
  border-radius: 6px;
  
  &::placeholder {
    font-family: var(--universal-font);
    font-size: var(--universal-fs-h3);
  }
  
  &:focus {
    outline: none;
    border: 1px solid #999999;
  }
`;

const CountryPhoneRow = styled.div`
  display: flex;
  gap: 0;
  border: 1px solid #999999;
  border-radius: 6px;
  overflow: hidden;

  /* Tablet styles */
  @media (max-width: 768px) {
    label {
      font-size: var(--universal-fs-h4);
    }
  }

  /* Mobile styles */
  @media (max-width: 480px) {
    label {
      font-size: var(--universal-fs-h5);
    }
    gap: 0;
  }
`;

const CountrySelect = styled.select`
font-family: var(--universal-font);
  min-width: 70px;
  padding: 10px 8px;
  border-radius: 0;
  border: none;
  
  &::placeholder {
    font-family: var(--universal-font);
    font-size: var(--universal-fs-h3);
  }
  
  &:focus {
    outline: none;
    // border: 1px solid #999999;
  }
`;

const StepTwoContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 10px;
`;

const ScopeRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 8px;
`;

const CountControls = styled.div`
  display: flex;
  align-items: center;
`;

const CountButton = styled.button`
  padding: 0.2rem 0.7rem;
  border: 1px solid #999999;
  background: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.5rem;
  font-size: 16px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Tablet styles */
  @media (max-width: 768px) {
    padding: 4px 10px;
    font-size: 18px;
    min-width: 36px;
    min-height: 36px;
    margin: 0 0.4rem;
  }

  /* Mobile styles */
  @media (max-width: 480px) {
    padding: 2px 10px;
    font-size: 20px;
    min-width: 25px;
        min-height: 25px;
    margin: 0 0.3rem;
    border-radius: 6px;
  }

  /* Small mobile styles */
  @media (max-width: 360px) {
    padding:4px 10px;
    font-size: 22px;
    min-width: 25px;
        min-height: 25px;
    margin: 0 0.2rem;
  }
`;

const CountDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  display: inline-block;
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

// Add at the top with your other styled-components
const AnimatedSvgWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 100%);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  pointer-events: none;
      width: 100%;
    height: 100%;
    padding: 2rem;
background: #D50F25;
align-items: center;
    justify-content: center;
    display: flex
;



  &.show {
        transform: translate(-50%, -50%);

  }
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


const propertyTypes = [
  {
    key: '1bhk',
    label: '1 BHK',
    svg: (<svg viewBox="0 0 49 49" fill="none"> <path d="M9.88777 7.39219C9.88777 7.25295 9.94308 7.11941 10.0415 7.02096C10.14 6.9225 10.2735 6.86719 10.4128 6.86719H15.4348C15.574 6.86719 15.7075 6.9225 15.806 7.02096C15.9045 7.11941 15.9598 7.25295 15.9598 7.39219V22.8467H9.88477L9.88777 7.39219Z" fill="url(#paint0_radial_337_5448)" /> <path d="M9.88777 7.39219C9.88777 7.25295 9.94308 7.11941 10.0415 7.02096C10.14 6.9225 10.2735 6.86719 10.4128 6.86719H15.4348C15.574 6.86719 15.7075 6.9225 15.806 7.02096C15.9045 7.11941 15.9598 7.25295 15.9598 7.39219V22.8467H9.88477L9.88777 7.39219Z" fill="url(#paint1_linear_337_5448)" /> <path d="M9.88777 7.39219C9.88777 7.25295 9.94308 7.11941 10.0415 7.02096C10.14 6.9225 10.2735 6.86719 10.4128 6.86719H15.4348C15.574 6.86719 15.7075 6.9225 15.806 7.02096C15.9045 7.11941 15.9598 7.25295 15.9598 7.39219V22.8467H9.88477L9.88777 7.39219Z" fill="url(#paint2_linear_337_5448)" /> <path d="M9.88777 7.39219C9.88777 7.25295 9.94308 7.11941 10.0415 7.02096C10.14 6.9225 10.2735 6.86719 10.4128 6.86719H15.4348C15.574 6.86719 15.7075 6.9225 15.806 7.02096C15.9045 7.11941 15.9598 7.25295 15.9598 7.39219V22.8467H9.88477L9.88777 7.39219Z" fill="url(#paint3_linear_337_5448)" /> <path d="M9.88777 7.39219C9.88777 7.25295 9.94308 7.11941 10.0415 7.02096C10.14 6.9225 10.2735 6.86719 10.4128 6.86719H15.4348C15.574 6.86719 15.7075 6.9225 15.806 7.02096C15.9045 7.11941 15.9598 7.25295 15.9598 7.39219V22.8467H9.88477L9.88777 7.39219Z" fill="url(#paint4_radial_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint5_linear_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint6_linear_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint7_radial_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint8_linear_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint9_radial_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint10_linear_337_5448)" /> <path d="M42.2334 44.49H7.71094V24.3255L24.9714 8.19751L42.2334 24.327V44.49Z" fill="url(#paint11_linear_337_5448)" /> <g filter="url(#filter0_f_337_5448)"> <path d="M23.3491 44.49H12.9346V27.9765C12.9346 26.7195 13.7341 25.686 14.7046 25.686H21.5791C22.5511 25.686 23.3491 26.7195 23.3491 27.9765V44.49Z" fill="url(#paint12_linear_337_5448)" /> </g> <g filter="url(#filter1_i_337_5448)"> <path d="M36.2246 33.546H29.9396C29.7745 33.5462 29.6109 33.5138 29.4584 33.4507C29.3058 33.3876 29.1671 33.295 29.0503 33.1783C28.9336 33.0615 28.841 32.9229 28.7779 32.7703C28.7148 32.6177 28.6824 32.4541 28.6826 32.289V26.007C28.6826 25.302 29.2556 24.75 29.9396 24.75H36.2216C36.9266 24.75 37.4786 25.323 37.4786 26.007V32.289C37.4786 32.994 36.9281 33.546 36.2216 33.546" fill="url(#paint13_linear_337_5448)" /> <path d="M36.2246 33.546H29.9396C29.7745 33.5462 29.6109 33.5138 29.4584 33.4507C29.3058 33.3876 29.1671 33.295 29.0503 33.1783C28.9336 33.0615 28.841 32.9229 28.7779 32.7703C28.7148 32.6177 28.6824 32.4541 28.6826 32.289V26.007C28.6826 25.302 29.2556 24.75 29.9396 24.75H36.2216C36.9266 24.75 37.4786 25.323 37.4786 26.007V32.289C37.4786 32.994 36.9281 33.546 36.2216 33.546" fill="url(#paint14_linear_337_5448)" /> </g> <path d="M36.2246 33.546H29.9396C29.7745 33.5462 29.6109 33.5138 29.4584 33.4507C29.3058 33.3876 29.1671 33.295 29.0503 33.1783C28.9336 33.0615 28.841 32.9229 28.7779 32.7703C28.7148 32.6177 28.6824 32.4541 28.6826 32.289V26.007C28.6826 25.302 29.2556 24.75 29.9396 24.75H36.2216C36.9266 24.75 37.4786 25.323 37.4786 26.007V32.289C37.4786 32.994 36.9281 33.546 36.2216 33.546" fill="url(#paint15_linear_337_5448)" /> <path d="M36.2246 33.546H29.9396C29.7745 33.5462 29.6109 33.5138 29.4584 33.4507C29.3058 33.3876 29.1671 33.295 29.0503 33.1783C28.9336 33.0615 28.841 32.9229 28.7779 32.7703C28.7148 32.6177 28.6824 32.4541 28.6826 32.289V26.007C28.6826 25.302 29.2556 24.75 29.9396 24.75H36.2216C36.9266 24.75 37.4786 25.323 37.4786 26.007V32.289C37.4786 32.994 36.9281 33.546 36.2216 33.546" fill="url(#paint16_linear_337_5448)" /> <g filter="url(#filter2_ii_337_5448)"> <path d="M25.135 42.5972H13.5205V26.9462C13.5205 25.7537 14.41 24.7742 15.4945 24.7742H23.1595C24.244 24.7742 25.135 25.7537 25.135 26.9462V42.5972Z" fill="url(#paint17_linear_337_5448)" /> </g> <g filter="url(#filter3_f_337_5448)"> <path d="M22.2249 34.1596C22.4467 34.1596 22.6594 34.0715 22.8162 33.9146C22.9731 33.7578 23.0612 33.5451 23.0612 33.3233C23.0612 33.1015 22.9731 32.8888 22.8162 32.732C22.6594 32.5752 22.4467 32.4871 22.2249 32.4871C22.0031 32.4871 21.7904 32.5752 21.6336 32.732C21.4768 32.8888 21.3887 33.1015 21.3887 33.3233C21.3887 33.5451 21.4768 33.7578 21.6336 33.9146C21.7904 34.0715 22.0031 34.1596 22.2249 34.1596Z" fill="#62393D" /> </g> <g filter="url(#filter4_ii_337_5448)"> <path d="M22.4431 34.0335C22.6671 34.0335 22.8819 33.9445 23.0403 33.7861C23.1987 33.6278 23.2876 33.413 23.2876 33.189C23.2876 32.965 23.1987 32.7502 23.0403 32.5918C22.8819 32.4335 22.6671 32.3445 22.4431 32.3445C22.2192 32.3445 22.0044 32.4335 21.846 32.5918C21.6876 32.7502 21.5986 32.965 21.5986 33.189C21.5986 33.413 21.6876 33.6278 21.846 33.7861C22.0044 33.9445 22.2192 34.0335 22.4431 34.0335Z" fill="#895D56" /> </g> <path d="M45.3564 24.5206L26.2464 5.6926C25.9051 5.3524 25.4428 5.16138 24.9609 5.16138C24.479 5.16138 24.0168 5.3524 23.6754 5.6926C23.6754 5.6926 23.6544 5.6926 23.6544 5.7136L4.50392 24.5611C4.33543 24.7259 4.20155 24.9228 4.11016 25.14C4.01876 25.3573 3.97168 25.5906 3.97168 25.8263C3.97168 26.0621 4.01876 26.2954 4.11016 26.5127C4.20155 26.7299 4.33543 26.9268 4.50392 27.0916C4.84752 27.4275 5.30893 27.6155 5.78942 27.6155C6.26991 27.6155 6.73132 27.4275 7.07492 27.0916L24.6864 9.7351C24.7566 9.66594 24.8512 9.62716 24.9497 9.62716C25.0482 9.62716 25.1428 9.66594 25.2129 9.7351L42.7659 27.0301C43.1073 27.3703 43.5695 27.5613 44.0514 27.5613C44.5333 27.5613 44.9956 27.3703 45.3369 27.0301C46.0449 26.3206 46.0659 25.2061 45.3564 24.5191" fill="url(#paint18_linear_337_5448)" /> <path d="M45.3564 24.5206L26.2464 5.6926C25.9051 5.3524 25.4428 5.16138 24.9609 5.16138C24.479 5.16138 24.0168 5.3524 23.6754 5.6926C23.6754 5.6926 23.6544 5.6926 23.6544 5.7136L4.50392 24.5611C4.33543 24.7259 4.20155 24.9228 4.11016 25.14C4.01876 25.3573 3.97168 25.5906 3.97168 25.8263C3.97168 26.0621 4.01876 26.2954 4.11016 26.5127C4.20155 26.7299 4.33543 26.9268 4.50392 27.0916C4.84752 27.4275 5.30893 27.6155 5.78942 27.6155C6.26991 27.6155 6.73132 27.4275 7.07492 27.0916L24.6864 9.7351C24.7566 9.66594 24.8512 9.62716 24.9497 9.62716C25.0482 9.62716 25.1428 9.66594 25.2129 9.7351L42.7659 27.0301C43.1073 27.3703 43.5695 27.5613 44.0514 27.5613C44.5333 27.5613 44.9956 27.3703 45.3369 27.0301C46.0449 26.3206 46.0659 25.2061 45.3564 24.5191" fill="url(#paint19_radial_337_5448)" /> <g filter="url(#filter5_f_337_5448)"> <path d="M11.7871 41.667H24.7501V43.365H11.7871V41.667Z" fill="#68552B" /> </g> <g filter="url(#filter6_i_337_5448)"> <path d="M3.97168 45.648C3.97168 43.9725 5.33068 42.615 7.00468 42.615H42.8457C44.5197 42.615 45.8787 43.9725 45.8787 45.648H3.97168Z" fill="url(#paint20_linear_337_5448)" /> </g> <path d="M3.97168 45.648C3.97168 43.9725 5.33068 42.615 7.00468 42.615H42.8457C44.5197 42.615 45.8787 43.9725 45.8787 45.648H3.97168Z" fill="url(#paint21_linear_337_5448)" /> <path d="M3.97168 45.648C3.97168 43.9725 5.33068 42.615 7.00468 42.615H42.8457C44.5197 42.615 45.8787 43.9725 45.8787 45.648H3.97168Z" fill="url(#paint22_radial_337_5448)" /> <path d="M12.0938 42.417C12.0937 42.1186 12.2123 41.8325 12.4233 41.6215C12.6342 41.4105 12.9204 41.292 13.2187 41.292H25.2383C25.9688 41.292 26.5613 41.8845 26.5613 42.615H12.0938V42.417Z" fill="url(#paint23_linear_337_5448)" /> <path d="M12.0938 42.417C12.0937 42.1186 12.2123 41.8325 12.4233 41.6215C12.6342 41.4105 12.9204 41.292 13.2187 41.292H25.2383C25.9688 41.292 26.5613 41.8845 26.5613 42.615H12.0938V42.417Z" fill="url(#paint24_linear_337_5448)" /> <path d="M12.0938 42.417C12.0937 42.1186 12.2123 41.8325 12.4233 41.6215C12.6342 41.4105 12.9204 41.292 13.2187 41.292H25.2383C25.9688 41.292 26.5613 41.8845 26.5613 42.615H12.0938V42.417Z" fill="url(#paint25_linear_337_5448)" /> <g filter="url(#filter7_f_337_5448)"> <path d="M25.2578 6.5957L44.4218 25.4657" stroke="url(#paint26_linear_337_5448)" strokeWidth="0.15" strokeLinecap="round" /> </g> <g filter="url(#filter8_f_337_5448)"> <path d="M25.2583 6.5957L6.09277 25.4657" stroke="url(#paint27_linear_337_5448)" strokeOpacity="0.5" strokeWidth="0.15" strokeLinecap="round" /> </g> <defs> <filter id="filter0_f_337_5448" x="12.6846" y="25.436" width="10.9141" height="19.304" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.125" result="effect1_foregroundBlur_337_5448" /> </filter> <filter id="filter1_i_337_5448" x="28.4326" y="24.75" width="9.0459" height="9.0459" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-0.25" dy="0.25" /> <feGaussianBlur stdDeviation="0.125" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.47451 0 0 0 0 0.792157 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5448" /> </filter> <filter id="filter2_ii_337_5448" x="13.4205" y="24.7742" width="11.8393" height="17.823" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.125" /> <feGaussianBlur stdDeviation="0.125" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.254902 0 0 0 0 0.188235 0 0 0 0 0.141176 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5448" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-0.1" /> <feGaussianBlur stdDeviation="0.075" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.694118 0 0 0 0 0.470588 0 0 0 0 0.407843 0 0 0 1 0" /> <feBlend mode="normal" in2="effect1_innerShadow_337_5448" result="effect2_innerShadow_337_5448" /> </filter> <filter id="filter3_f_337_5448" x="21.3137" y="32.4121" width="1.82285" height="1.82261" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.0375" result="effect1_foregroundBlur_337_5448" /> </filter> <filter id="filter4_ii_337_5448" x="21.5486" y="32.3445" width="1.78945" height="1.68896" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-0.05" /> <feGaussianBlur stdDeviation="0.05" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.694118 0 0 0 0 0.482353 0 0 0 0 0.419608 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5448" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.05" /> <feGaussianBlur stdDeviation="0.05" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.184314 0 0 0 0 0.164706 0 0 0 1 0" /> <feBlend mode="normal" in2="effect1_innerShadow_337_5448" result="effect2_innerShadow_337_5448" /> </filter> <filter id="filter5_f_337_5448" x="11.5371" y="41.417" width="13.4629" height="2.198" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.125" result="effect1_foregroundBlur_337_5448" /> </filter> <filter id="filter6_i_337_5448" x="3.97168" y="42.615" width="42.1572" height="3.03296" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.25" /> <feGaussianBlur stdDeviation="0.25" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.25098 0 0 0 0 0.545098 0 0 0 0 0.352941 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5448" /> </filter> <filter id="filter7_f_337_5448" x="24.8826" y="6.22075" width="19.9145" height="19.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5448" /> </filter> <filter id="filter8_f_337_5448" x="5.71758" y="6.22075" width="19.9154" height="19.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5448" /> </filter> <radialGradient id="paint0_radial_337_5448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.1393 7.76119) rotate(90) scale(7.09503 3.8727)"> <stop stopColor="#F1B379" /> <stop offset="1" stopColor="#CD915F" /> </radialGradient> <linearGradient id="paint1_linear_337_5448" x1="9.46777" y1="13.0397" x2="12.0088" y2="13.0397" gradientUnits="userSpaceOnUse"> <stop stopColor="#8E694B" /> <stop offset="1" stopColor="#8E694B" stopOpacity="0" /> </linearGradient> <linearGradient id="paint2_linear_337_5448" x1="15.1873" y1="16.5947" x2="13.3003" y2="12.5732" gradientUnits="userSpaceOnUse"> <stop stopColor="#9F6A42" /> <stop offset="1" stopColor="#9F6A42" stopOpacity="0" /> </linearGradient> <linearGradient id="paint3_linear_337_5448" x1="12.9238" y1="6.78019" x2="12.9238" y2="7.04119" gradientUnits="userSpaceOnUse"> <stop stopColor="#D5AD80" /> <stop offset="1" stopColor="#D5AD80" stopOpacity="0" /> </linearGradient> <radialGradient id="paint4_radial_337_5448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.6723 7.15519) rotate(180) scale(4.20755 0.822645)"> <stop stopColor="#FFCB8C" /> <stop offset="1" stopColor="#FFCB8C" stopOpacity="0" /> </radialGradient> <linearGradient id="paint5_linear_337_5448" x1="8.96644" y1="31.9155" x2="41.2809" y2="31.9155" gradientUnits="userSpaceOnUse"> <stop stopColor="#D7905F" /> <stop offset="1" stopColor="#E8BC97" /> </linearGradient> <linearGradient id="paint6_linear_337_5448" x1="9.87394" y1="45.3315" x2="21.4359" y2="27.5325" gradientUnits="userSpaceOnUse"> <stop stopColor="#BA8951" /> <stop offset="1" stopColor="#BA8951" stopOpacity="0" /> </linearGradient> <radialGradient id="paint7_radial_337_5448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(31.5954 43.32) rotate(-118.804) scale(5.75693 7.22537)"> <stop stopColor="#BEAB75" /> <stop offset="1" stopColor="#BEAB75" stopOpacity="0" /> </radialGradient> <linearGradient id="paint8_linear_337_5448" x1="42.2334" y1="36.864" x2="41.1249" y2="36.864" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFE6B1" /> <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" /> </linearGradient> <radialGradient id="paint9_radial_337_5448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(42.6414 23.124) rotate(90) scale(7.07564 1.59895)"> <stop offset="0.35" stopColor="#9E413E" /> <stop offset="1" stopColor="#9E413E" stopOpacity="0" /> </radialGradient> <linearGradient id="paint10_linear_337_5448" x1="31.0884" y1="14.2575" x2="29.3649" y2="16.02" gradientUnits="userSpaceOnUse"> <stop stopColor="#B55852" /> <stop offset="1" stopColor="#B55852" stopOpacity="0" /> </linearGradient> <linearGradient id="paint11_linear_337_5448" x1="7.49794" y1="40.3275" x2="8.67694" y2="40.3275" gradientUnits="userSpaceOnUse"> <stop stopColor="#845F3D" /> <stop offset="1" stopColor="#845F3D" stopOpacity="0" /> </linearGradient> <linearGradient id="paint12_linear_337_5448" x1="18.1426" y1="25.6875" x2="18.1426" y2="44.4885" gradientUnits="userSpaceOnUse"> <stop stopColor="#805139" /> <stop offset="1" stopColor="#6D4D2F" /> </linearGradient> <linearGradient id="paint13_linear_337_5448" x1="28.6841" y1="34.212" x2="38.1761" y2="24.75" gradientUnits="userSpaceOnUse"> <stop stopColor="#4CCCFF" /> <stop offset="1" stopColor="#3A9EE6" /> </linearGradient> <linearGradient id="paint14_linear_337_5448" x1="33.0821" y1="34.098" x2="33.0821" y2="32.367" gradientUnits="userSpaceOnUse"> <stop stopColor="#1E9FE4" /> <stop offset="1" stopColor="#1E9FE4" stopOpacity="0" /> </linearGradient> <linearGradient id="paint15_linear_337_5448" x1="28.6841" y1="31.311" x2="30.4511" y2="31.311" gradientUnits="userSpaceOnUse"> <stop stopColor="#48E0FF" /> <stop offset="1" stopColor="#48E0FF" stopOpacity="0" /> </linearGradient> <linearGradient id="paint16_linear_337_5448" x1="30.0146" y1="23.211" x2="31.1981" y2="26.7615" gradientUnits="userSpaceOnUse"> <stop stopColor="#43B3F2" /> <stop offset="1" stopColor="#43B3F2" stopOpacity="0" /> </linearGradient> <linearGradient id="paint17_linear_337_5448" x1="13.5205" y1="35.9522" x2="25.135" y2="35.8847" gradientUnits="userSpaceOnUse"> <stop stopColor="#70504D" /> <stop offset="1" stopColor="#9B665E" /> </linearGradient> <linearGradient id="paint18_linear_337_5448" x1="24.9249" y1="5.1616" x2="24.9249" y2="27.6151" gradientUnits="userSpaceOnUse"> <stop stopColor="#EA6D2E" /> <stop offset="1" stopColor="#CA222B" /> </linearGradient> <radialGradient id="paint19_radial_337_5448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.1852 3.64411) rotate(97.326) scale(5.40794 10.093)"> <stop stopColor="#FF853F" /> <stop offset="1" stopColor="#FF853F" stopOpacity="0" /> </radialGradient> <linearGradient id="paint20_linear_337_5448" x1="44.7192" y1="45.648" x2="2.90668" y2="45.648" gradientUnits="userSpaceOnUse"> <stop stopColor="#3FD47B" /> <stop offset="1" stopColor="#40DC7F" /> </linearGradient> <linearGradient id="paint21_linear_337_5448" x1="24.9252" y1="46.452" x2="24.9252" y2="44.1315" gradientUnits="userSpaceOnUse"> <stop offset="0.107" stopColor="#3FD17B" /> <stop offset="1" stopColor="#3FD17B" stopOpacity="0" /> </linearGradient> <radialGradient id="paint22_radial_337_5448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(45.8787 42.1785) rotate(147.147) scale(5.02767 8.24414)"> <stop stopColor="#5CEE92" /> <stop offset="1" stopColor="#5CEE92" stopOpacity="0" /> </radialGradient> <linearGradient id="paint23_linear_337_5448" x1="12.4838" y1="42.615" x2="26.0333" y2="42.615" gradientUnits="userSpaceOnUse"> <stop stopColor="#9FA1A3" /> <stop offset="1" stopColor="#C4C1C7" /> </linearGradient> <linearGradient id="paint24_linear_337_5448" x1="11.8507" y1="42.615" x2="13.5758" y2="42.615" gradientUnits="userSpaceOnUse"> <stop stopColor="#59675C" /> <stop offset="1" stopColor="#59675C" stopOpacity="0" /> </linearGradient> <linearGradient id="paint25_linear_337_5448" x1="26.5613" y1="41.9535" x2="24.2933" y2="43.3635" gradientUnits="userSpaceOnUse"> <stop stopColor="#E3DADD" /> <stop offset="1" stopColor="#E3DADD" stopOpacity="0" /> </linearGradient> <linearGradient id="paint26_linear_337_5448" x1="24.6683" y1="6.3032" x2="45.2243" y2="27.4652" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <linearGradient id="paint27_linear_337_5448" x1="25.8463" y1="6.3032" x2="5.29027" y2="27.4652" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> </defs> </svg>)
  },
  {
    key: '2bhk',
    label: '2 BHK',
    svg: <svg viewBox="0 0 49 49" fill="none"> <path d="M24.5498 3.9751H27.0998V8.8501H24.5498V3.9751Z" fill="#D0D0D0" /> <path d="M27.0996 3.9751H28.8246V8.8501H27.0996V3.9751Z" fill="#94989B" /> <path d="M23.6504 2.25H27.9254V3.975H23.6504V2.25Z" fill="#D0D0D0" /> <path d="M27.9248 2.25H29.6498V3.975H27.9248V2.25Z" fill="#94989B" /> <path d="M18.4004 2.25L2.27539 11.475H34.6004L18.4004 2.25Z" fill="#ED4C5C" /> <path d="M6.84961 11.4751H30.0246V25.7251H6.84961V11.4751Z" fill="#F9F3D9" /> <path d="M15.5498 15.75H21.3248V21.525H15.5498V15.75Z" fill="#D6EEF0" /> <path d="M14.7998 15V22.2H21.9998V15H14.7998ZM21.3248 15.75V18.3H18.7748V15.75H21.3248ZM18.0998 15.75V18.3H15.5498V15.75H18.0998ZM15.5498 21.525V18.975H18.0998V21.525H15.5498ZM18.7748 21.525V18.975H21.3248V21.525H18.7748Z" fill="#89664C" /> <path d="M5.0498 31.425H39.2498V45.9H5.0498V31.425Z" fill="#F9F3D9" /> <path d="M27.9248 35.7H33.6998V41.475H27.9248V35.7Z" fill="#D6EEF0" /> <path d="M27.1748 35.0249V42.2249H34.3748V35.0249H27.1748ZM33.6998 35.6999V38.2499H31.1498V35.6999H33.6998ZM30.3998 35.6999V38.2499H27.8498V35.6999H30.3998ZM27.9248 41.4749V38.9999H30.4748V41.5499H27.9248V41.4749ZM31.1498 41.4749V38.9999H33.6998V41.5499H31.1498V41.4749ZM14.0498 36.9749H20.3498V45.8249H14.0498V36.9749Z" fill="#89664C" /> <path d="M13.4502 35.7H21.0252V36.975H13.4502V35.7Z" fill="#DBB471" /> <path d="M19.2996 41.2501C19.5481 41.2501 19.7496 41.0486 19.7496 40.8001C19.7496 40.5516 19.5481 40.3501 19.2996 40.3501C19.0511 40.3501 18.8496 40.5516 18.8496 40.8001C18.8496 41.0486 19.0511 41.2501 19.2996 41.2501Z" fill="#F9F3D9" /> <path d="M1.75 45.825H46.75V47.25H1.75V45.825Z" fill="#83BF4F" /> <path d="M37.45 25.8H6.775L1.75 31.425H42.55L37.45 25.8Z" fill="#ED4C5C" /> <path d="M46.7496 42.8999C46.7496 41.9999 46.0746 41.3249 45.1746 41.3249C45.0246 41.3249 44.7996 41.3249 44.6496 41.3999C44.4246 41.0249 44.0496 40.7249 43.5996 40.7249C43.2996 40.7249 43.0746 40.7999 42.8496 40.9499V40.7249C42.8496 40.0499 42.3246 39.5249 41.6496 39.5249C41.0496 39.5249 40.5996 39.9749 40.4496 40.4999C40.2996 40.3499 40.1496 40.3499 39.9246 40.3499C39.4746 40.3499 39.0996 40.7249 39.0996 41.1749V45.8999H45.3996C46.0746 45.8999 46.5996 45.3749 46.5996 44.6999C46.5996 44.3999 46.4496 44.0999 46.2996 43.8749C46.5996 43.5749 46.7496 43.2749 46.7496 42.8999Z" fill="#83BF4F" /> <path d="M46.75 44.6251C46.75 44.3251 46.6 44.0251 46.45 43.8001C46.675 43.5001 46.75 43.2001 46.75 42.8251C46.75 41.9251 46.075 41.2501 45.175 41.2501C45.025 41.2501 44.8 41.2501 44.65 41.3251C44.5 41.1001 44.35 40.8751 44.05 40.7251C43.6 40.8751 43.375 41.3251 43.375 41.7751C43.375 41.9251 43.375 42.0001 43.45 42.0751C43.375 42.0001 43.225 42.0001 43.075 42.0001C42.625 42.0001 42.25 42.3751 42.25 42.8251C42.25 43.1251 42.4 43.3501 42.7 43.5001C42.55 43.7251 42.4 44.0251 42.4 44.3251C42.4 45.0751 43 45.6751 43.75 45.6751H45.55C46.225 45.8251 46.75 45.3001 46.75 44.6251ZM42.1 44.8501C42.1 45.3001 41.725 44.7001 41.275 44.7001C40.825 44.7001 40.45 45.3001 40.45 44.8501C40.45 44.4001 40.825 44.0251 41.275 44.0251C41.725 44.0251 42.1 44.4001 42.1 44.8501ZM40.375 43.5001C40.375 43.7251 40.225 43.5001 40 43.5001C39.775 43.5001 39.625 43.7251 39.625 43.5001C39.625 43.2751 39.775 43.1251 40 43.1251C40.15 43.0501 40.375 43.2751 40.375 43.5001Z" fill="#699635" /> <path d="M41.05 42.2999C41.05 42.5249 40.9 42.2249 40.675 42.2249C40.45 42.2249 40.3 42.5249 40.3 42.2999C40.3 42.0749 40.45 41.9249 40.675 41.9249C40.9 41.9249 41.05 42.0749 41.05 42.2999ZM44.35 44.2499C44.35 44.5499 44.125 44.0999 43.825 44.0999C43.525 44.0999 43.3 44.5499 43.3 44.2499C43.3 43.9499 43.525 43.7249 43.825 43.7249C44.05 43.7249 44.35 43.9499 44.35 44.2499ZM45.85 42.8249C45.85 43.2749 45.475 42.5999 45.025 42.5999C44.575 42.5999 44.2 43.2749 44.2 42.8249C44.2 42.3749 44.575 41.9999 45.025 41.9999C45.475 41.9999 45.85 42.3749 45.85 42.8249ZM45.85 44.6999C45.85 44.9249 45.7 44.6999 45.475 44.6999C45.25 44.6999 45.1 44.9249 45.1 44.6999C45.1 44.4749 45.25 44.3249 45.475 44.3249C45.7 44.3249 45.85 44.4749 45.85 44.6999ZM42.325 41.4749C42.325 41.7749 42.1 41.3249 41.8 41.3249C41.5 41.3249 41.275 41.7749 41.275 41.4749C41.275 41.1749 41.5 40.9499 41.8 40.9499C42.1 40.9499 42.325 41.1749 42.325 41.4749ZM9.25 42.8999C9.25 41.9999 8.575 41.3249 7.675 41.3249C7.525 41.3249 7.3 41.3249 7.15 41.3999C6.925 41.0249 6.55 40.7249 6.1 40.7249C5.8 40.7249 5.575 40.7999 5.35 40.9499V40.7249C5.35 40.0499 4.825 39.5249 4.15 39.5249C3.55 39.5249 3.1 39.9749 3.025 40.4999C2.875 40.3499 2.725 40.3499 2.5 40.3499C2.05 40.3499 1.75 40.7249 1.75 41.1749V45.8999H8.05C8.725 45.8999 9.25 45.3749 9.25 44.6999C9.25 44.3999 9.1 44.0999 8.95 43.8749C9.1 43.5749 9.25 43.2749 9.25 42.8999Z" fill="#83BF4F" /> <path d="M9.25 44.6251C9.25 44.3251 9.1 44.0251 8.95 43.8001C9.175 43.5001 9.25 43.2001 9.25 42.8251C9.25 41.9251 8.575 41.2501 7.675 41.2501C7.525 41.2501 7.3 41.2501 7.15 41.3251C7 41.1001 6.85 40.8751 6.55 40.7251C6.1 40.8751 5.875 41.3251 5.875 41.7751C5.875 41.9251 5.875 42.0001 5.95 42.0751C5.875 42.0001 5.725 42.0001 5.575 42.0001C5.125 42.0001 4.75 42.3751 4.75 42.8251C4.75 43.1251 4.9 43.3501 5.2 43.5001C5.05 43.7251 4.9 44.0251 4.9 44.3251C4.9 45.0751 5.5 45.6751 6.25 45.6751H8.05C8.725 45.8251 9.25 45.3001 9.25 44.6251ZM4.6 44.8501C4.6 45.3001 4.225 44.7001 3.775 44.7001C3.325 44.7001 2.95 45.3001 2.95 44.8501C2.95 44.4001 3.325 44.0251 3.775 44.0251C4.225 44.0251 4.6 44.4001 4.6 44.8501ZM2.875 43.5001C2.875 43.7251 2.725 43.5001 2.5 43.5001C2.275 43.5001 2.125 43.7251 2.125 43.5001C2.125 43.2751 2.275 43.1251 2.5 43.1251C2.65 43.0501 2.875 43.2751 2.875 43.5001Z" fill="#699635" /> <path d="M3.5498 42.3C3.5498 42.525 3.3998 42.225 3.1748 42.225C2.9498 42.225 2.7998 42.525 2.7998 42.3C2.7998 42.075 2.9498 41.925 3.1748 41.925C3.3248 41.925 3.5498 42.075 3.5498 42.3ZM6.8498 44.25C6.8498 44.55 6.6248 44.1 6.3248 44.1C6.0248 44.1 5.7998 44.55 5.7998 44.25C5.7998 43.95 6.0248 43.725 6.3248 43.725C6.5498 43.725 6.8498 43.95 6.8498 44.25ZM8.3498 42.825C8.3498 43.275 7.9748 42.6 7.5248 42.6C7.0748 42.6 6.6998 43.275 6.6998 42.825C6.6998 42.375 7.1498 42 7.5248 42C7.9748 42 8.3498 42.375 8.3498 42.825ZM8.3498 44.7C8.3498 44.925 8.1998 44.7 7.9748 44.7C7.7498 44.7 7.5998 44.925 7.5998 44.7C7.5998 44.475 7.7498 44.325 7.9748 44.325C8.1998 44.25 8.3498 44.475 8.3498 44.7ZM4.8248 41.475C4.8248 41.775 4.5998 41.325 4.2998 41.325C3.9998 41.325 3.7748 41.775 3.7748 41.475C3.7748 41.175 3.9998 40.95 4.2998 40.95C4.5998 40.95 4.8248 41.175 4.8248 41.475Z" fill="#83BF4F" /> </svg>
  },
  {
    key: '3bhk',
    label: '3 BHK',
    svg: <svg viewBox="0 0 49 49" fill="none"> <path d="M13.2083 20.3527H10.5417C10.3649 20.3527 10.1953 20.2825 10.0703 20.1574C9.94524 20.0324 9.875 19.8628 9.875 19.686V10.3527C9.875 10.1759 9.94524 10.0063 10.0703 9.8813C10.1953 9.75627 10.3649 9.68604 10.5417 9.68604H13.2083C13.3851 9.68604 13.5547 9.75627 13.6797 9.8813C13.8048 10.0063 13.875 10.1759 13.875 10.3527V19.686C13.875 19.8628 13.8048 20.0324 13.6797 20.1574C13.5547 20.2825 13.3851 20.3527 13.2083 20.3527Z" fill="#A0041E" /> <path d="M7.41699 22.0833L24.7503 4.75L42.0837 22.0833V44.75H7.41699V22.0833Z" fill="#FFE8B6" /> <path d="M24.75 22.0833H26.0833V43.4166H24.75V22.0833Z" fill="#FFCC4D" /> <path d="M42.0838 23.4167C41.7302 23.4166 41.3911 23.2761 41.1411 23.026L24.7505 6.63537L8.35978 23.026C8.23599 23.1498 8.08903 23.248 7.92728 23.315C7.76554 23.382 7.59219 23.4165 7.41712 23.4165C7.24205 23.4165 7.06869 23.382 6.90695 23.315C6.74521 23.248 6.59824 23.1498 6.47445 23.026C6.35066 22.9023 6.25246 22.7553 6.18546 22.5935C6.11847 22.4318 6.08398 22.2584 6.08398 22.0834C6.08398 21.9083 6.11847 21.735 6.18546 21.5732C6.25246 21.4115 6.35066 21.2645 6.47445 21.1407L23.8078 3.80737C24.0578 3.55741 24.3969 3.41699 24.7505 3.41699C25.104 3.41699 25.4431 3.55741 25.6931 3.80737L43.0265 21.1407C43.2135 21.3269 43.341 21.5645 43.3928 21.8233C43.4446 22.0822 43.4184 22.3505 43.3174 22.5944C43.2163 22.8383 43.0452 23.0466 42.8255 23.193C42.6059 23.3394 42.3477 23.4173 42.0838 23.4167Z" fill="#66757F" /> <path d="M24.75 23.4166C24.486 23.4172 24.2279 23.3394 24.0082 23.193C23.7886 23.0465 23.6174 22.8382 23.5164 22.5943C23.4154 22.3505 23.3891 22.0821 23.4409 21.8233C23.4927 21.5644 23.6202 21.3268 23.8073 21.1406L32.474 12.474C32.5978 12.3502 32.7447 12.252 32.9065 12.185C33.0682 12.118 33.2416 12.0835 33.4166 12.0835C33.5917 12.0835 33.7651 12.118 33.9268 12.185C34.0886 12.252 34.2355 12.3502 34.3593 12.474C34.4831 12.5978 34.5813 12.7447 34.6483 12.9065C34.7153 13.0682 34.7498 13.2416 34.7498 13.4166C34.7498 13.5917 34.7153 13.7651 34.6483 13.9268C34.5813 14.0885 34.4831 14.2355 34.3593 14.3593L25.6927 23.026C25.4427 23.276 25.1036 23.4166 24.75 23.4166Z" fill="#66757F" /> <path d="M14.083 35.4167H19.4163V43.4167H14.083V35.4167Z" fill="#C1694F" /> <path d="M14.083 23.4167H19.4163V28.7501H14.083V23.4167ZM30.7497 23.4167H36.083V28.7501H30.7497V23.4167ZM30.7497 35.4167H36.083V40.7501H30.7497V35.4167Z" fill="#55ACEE" /> <path d="M45.4163 45.4167C45.4163 45.9472 45.2056 46.4559 44.8306 46.831C44.4555 47.206 43.9468 47.4167 43.4163 47.4167H6.08301C5.55257 47.4167 5.04387 47.206 4.66879 46.831C4.29372 46.4559 4.08301 45.9472 4.08301 45.4167C4.08301 44.8863 4.29372 44.3776 4.66879 44.0025C5.04387 43.6275 5.55257 43.4167 6.08301 43.4167H43.4163C43.9468 43.4167 44.4555 43.6275 44.8306 44.0025C45.2056 44.3776 45.4163 44.8863 45.4163 45.4167Z" fill="#5C913B" /> </svg>
  },
  {
    key: '4bhk',
    label: '4 BHK',
    svg: <svg viewBox="0 0 49 49" fill="none"> <g clipPath="url(#clip0_337_5530)"> <path d="M29.5 29.25L40.6 32.325H32.125L20.5 29.25H29.5Z" fill="#C94747" /> <path d="M4 17.25H20.5V45.75H4V17.25Z" fill="#F9F3D9" /> <path d="M20.5 17.25H29.5V29.25H20.5V17.25Z" fill="#DBB471" /> <path d="M16.0002 6.75L1.0752 17.25H20.5002L16.0002 6.75Z" fill="#ED4C5C" /> <path d="M22 8.25H24.25V14.25H22V8.25Z" fill="#D0D0D0" /> <path d="M24.25 8.25H25.75V15H24.25V8.25Z" fill="#94989B" /> <path d="M16 6.75L32.5 17.25H20.5L16 6.75Z" fill="#C94747" /> <path d="M21.25 6.75H25V8.25H21.25V6.75Z" fill="#D0D0D0" /> <path d="M25 6.75H26.5V8.25H25V6.75Z" fill="#94989B" /> <path d="M9.84961 21.6001H14.6496V26.4001H9.84961V21.6001Z" fill="#D6EEF0" /> <path d="M9.25 21V27H15.25V21H9.25ZM14.65 21.6V23.7H12.55V21.6H14.65ZM11.95 21.6V23.7H9.85V21.6H11.95ZM9.85 26.4V24.3H11.95V26.4H9.85ZM12.55 26.4V24.3H14.65V26.4H12.55Z" fill="#89664C" /> <path d="M23.2002 21.3H26.8002V26.7H23.2002V21.3Z" fill="#D6EEF0" /> <path d="M22.9004 21V27H27.1004V21H22.9004ZM23.5004 21.6H24.7004V23.7H23.5004V21.6ZM23.5004 26.4V24.3H24.7004V26.4H23.5004ZM26.5004 26.4H25.3004V24.3H26.5004V26.4ZM26.5004 23.7H25.3004V21.6H26.5004V23.7ZM10.5254 37.575H15.1754V45.75H10.5254V37.575ZM14.6504 36.375H15.8504V37.575H14.6504V36.375Z" fill="#89664C" /> <path d="M9.3252 37.575H10.5252V45.75H9.3252V37.575Z" fill="#594640" /> <path d="M8.7998 36.375H14.6498V37.575H8.7998V36.375Z" fill="#DBB471" /> <path d="M14.2 41.5499C14.4485 41.5499 14.65 41.3484 14.65 41.0999C14.65 40.8514 14.4485 40.6499 14.2 40.6499C13.9515 40.6499 13.75 40.8514 13.75 41.0999C13.75 41.3484 13.9515 41.5499 14.2 41.5499Z" fill="#F9F3D9" /> <path d="M0.325195 45.75H39.3252V48.75H0.325195V45.75Z" fill="#83BF4F" /> <path d="M30.1748 32.325H37.1498V45.75H30.1748V32.325Z" fill="#DBB471" /> <path d="M20.5 32.325H30.175V45.75H20.5V32.325Z" fill="#F9F3D9" /> <path d="M20.5 29.25H4L0.25 32.325H32.125L20.5 29.25Z" fill="#ED4C5C" /> <path d="M21.4746 36.6001H26.2746V41.4001H21.4746V36.6001Z" fill="#D6EEF0" /> <path d="M20.875 36V42H26.875V36H20.875ZM26.275 36.6V38.7H24.175V36.6H26.275ZM23.575 36.6V38.7H21.475V36.6H23.575ZM21.475 41.4V39.3H23.575V41.4H21.475ZM24.175 41.4V39.3H26.275V41.4H24.175Z" fill="#89664C" /> <path d="M31.8252 36.3H35.4252V41.7H31.8252V36.3Z" fill="#D6EEF0" /> <path d="M31.5254 36V42H35.7254V36H31.5254ZM32.1254 36.6H33.3254V38.7H32.1254V36.6ZM32.1254 41.4V39.3H33.3254V41.4H32.1254ZM35.1254 41.4H33.9254V39.3H35.1254V41.4ZM35.1254 38.7H33.9254V36.6H35.1254V38.7Z" fill="#89664C" /> <path d="M39.1748 45.75H48.1748V48.75H39.1748V45.75Z" fill="#699635" /> <path d="M39.4004 26.25H42.4004V45.75H39.4004V26.25Z" fill="#D3976E" /> <path d="M42.3998 26.25H41.2748V26.625C41.2748 28.35 40.6748 28.35 40.6748 30.075C40.6748 31.8 41.2748 31.8 41.2748 33.45C41.2748 35.175 40.6748 35.175 40.6748 36.9C40.6748 38.625 41.2748 38.625 41.2748 40.275C41.2748 42 40.6748 42 40.6748 43.65C40.6748 44.7 40.8248 45.15 40.9748 45.675H42.3248C42.3998 45.75 42.3998 26.25 42.3998 26.25Z" fill="#89664C" /> <path d="M40.1503 2.92505C38.7253 4.95005 37.0003 1.27505 34.7503 4.42505C32.5003 7.57505 33.7003 10.35 34.3753 12.375C35.7253 16.5 32.9503 17.775 34.8253 21.225C36.6253 24.675 34.0003 26.325 37.4503 28.2C40.9003 30.075 39.1753 26.025 42.7003 28.425C46.2253 30.825 46.6753 26.775 46.3003 25.275C45.5503 22.5 47.5753 21.825 48.1753 19.5C49.1503 15.375 45.8503 13.125 46.9003 9.22505C47.8003 5.40005 44.4253 -3.29995 40.1503 2.92505Z" fill="#83BF4F" /> <path d="M46.7498 9.3C47.5748 6.375 45.8498 0.75 43.1498 0.75C43.1498 0.75 44.9498 3.15 42.3998 6.15C39.8498 9.15 44.5748 10.65 42.3998 13.425C40.2248 16.2 44.4248 18.9 42.7748 21.075C40.7498 23.775 37.5248 23.4 39.3998 28.575V28.65C40.1498 28.2 40.2248 26.925 42.5498 28.5C46.0748 30.9 46.5248 26.85 46.1498 25.35C45.3998 22.575 47.4248 21.9 48.0248 19.575C49.0748 15.45 45.7748 13.2 46.7498 9.3Z" fill="#699635" /> <path d="M43.5996 9.15005C43.0746 9.15005 43.8996 8.70005 43.8996 8.10005C43.8996 7.50005 43.0746 7.05005 43.5996 7.05005C44.1246 7.05005 44.6496 7.50005 44.6496 8.10005C44.6496 8.70005 44.1996 9.15005 43.5996 9.15005ZM44.9496 18.225C44.1246 18.225 45.3996 17.55 45.3996 16.725C45.3996 15.9 44.1246 15.225 44.9496 15.225C45.7746 15.225 46.4496 15.9 46.4496 16.725C46.4496 17.55 45.7746 18.225 44.9496 18.225ZM43.5996 25.875C42.9996 25.875 43.5996 25.35 43.5996 24.75C43.5996 24.15 42.9996 23.625 43.5996 23.625C44.1996 23.625 44.7246 24.15 44.7246 24.75C44.7246 25.35 44.1996 25.875 43.5996 25.875ZM37.2246 9.82505C37.8246 9.82505 37.0746 10.35 37.0746 10.95C37.0746 11.55 37.8996 12.075 37.2246 12.075C36.5496 12.075 36.0996 11.55 36.0996 10.95C36.0996 10.35 36.6246 9.82505 37.2246 9.82505ZM39.6996 5.55005C40.5246 5.55005 39.3246 6.22505 39.3246 7.05005C39.3246 7.87505 40.5996 8.55005 39.6996 8.55005C38.8746 8.55005 38.1996 7.87505 38.1996 7.05005C38.1996 6.22505 38.7996 5.55005 39.6996 5.55005Z" fill="#83BF4F" /> <path d="M39.0254 16.95C40.3004 16.95 38.5004 17.925 38.5004 19.2C38.5004 20.475 40.2254 21.45 39.0254 21.45C37.7504 21.45 36.7754 20.475 36.7754 19.2C36.7754 17.925 37.7504 16.95 39.0254 16.95ZM39.7004 12.825C40.3004 12.825 39.7004 13.35 39.7004 13.95C39.7004 14.55 40.3004 15.075 39.7004 15.075C39.1004 15.075 38.5754 14.55 38.5754 13.95C38.5754 13.35 39.1004 12.825 39.7004 12.825Z" fill="#699635" /> <path d="M43.8252 43.5H44.1252V45.75H43.8252V43.5Z" fill="#83BF4F" /> <path d="M43.1504 41.175V42.9C43.1504 43.2 43.3754 43.5 43.7504 43.5H44.3504V42.3C44.2754 41.475 43.1504 41.175 43.1504 41.175Z" fill="#C94747" /> <path d="M44.8748 41.175V42.9C44.8748 43.2 44.6498 43.5 44.2748 43.5H43.6748V42.3C43.6748 41.475 44.8748 41.175 44.8748 41.175Z" fill="#ED4C5C" /> <path d="M47.125 41.7749H47.425V45.7499H47.125V41.7749Z" fill="#83BF4F" /> <path d="M46.4502 39.375V41.1C46.4502 41.4 46.6752 41.7 47.0502 41.7H47.6502V40.5C47.5752 39.75 46.4502 39.375 46.4502 39.375Z" fill="#C94747" /> <path d="M48.1746 39.375V41.1C48.1746 41.4 47.9496 41.7 47.5746 41.7H46.9746V40.5C46.9746 39.75 48.1746 39.375 48.1746 39.375Z" fill="#ED4C5C" /> <path d="M44.2754 38.3999V40.1249C44.2754 40.4249 44.5004 40.7249 44.8754 40.7249H45.4754V39.5249C45.4754 38.7749 44.2754 38.3999 44.2754 38.3999Z" fill="#F2B200" /> <path d="M46.075 38.3999V40.1249C46.075 40.4249 45.85 40.7249 45.475 40.7249H44.875V39.5249C44.875 38.7749 46.075 38.3999 46.075 38.3999Z" fill="#FFCE31" /> <path d="M45.0254 40.8H45.3254V45.75H45.0254V40.8Z" fill="#83BF4F" /> <path d="M41.875 39.3V41.025C41.875 41.325 42.175 41.625 42.475 41.625H43V40.5C43 39.6 41.875 39.3 41.875 39.3Z" fill="#F2B200" /> <path d="M43.6004 39.3V41.025C43.6004 41.325 43.3754 41.625 43.0004 41.625H42.4004V40.5C42.4004 39.6 43.6004 39.3 43.6004 39.3Z" fill="#FFCE31" /> <path d="M42.55 41.625H42.85V45.75H42.55V41.625ZM37 43.5H37.3V45.75H37V43.5Z" fill="#83BF4F" /> <path d="M36.25 41.175V42.9C36.25 43.2 36.475 43.5 36.85 43.5H37.45V42.3C37.45 41.475 36.25 41.175 36.25 41.175Z" fill="#C94747" /> <path d="M38.0496 41.175V42.9C38.0496 43.2 37.8246 43.5 37.4496 43.5H36.8496V42.3C36.8496 41.475 38.0496 41.175 38.0496 41.175Z" fill="#ED4C5C" /> <path d="M40.2998 41.7749H40.5998V45.7499H40.2998V41.7749Z" fill="#83BF4F" /> <path d="M39.5498 39.375V41.1C39.5498 41.4 39.7748 41.7 40.1498 41.7H40.7498V40.5C40.7498 39.75 39.5498 39.375 39.5498 39.375Z" fill="#C94747" /> <path d="M41.3504 39.375V41.1C41.3504 41.4 41.1254 41.7 40.7504 41.7H40.1504V40.5C40.1504 39.75 41.3504 39.375 41.3504 39.375Z" fill="#ED4C5C" /> <path d="M37.4502 38.3999V40.1249C37.4502 40.4249 37.6752 40.7249 38.0502 40.7249H38.6502V39.5249C38.6502 38.7749 37.4502 38.3999 37.4502 38.3999Z" fill="#F2B200" /> <path d="M39.1746 38.3999V40.1249C39.1746 40.4249 38.9496 40.7249 38.5746 40.7249H37.9746V39.5249C38.0496 38.7749 39.1746 38.3999 39.1746 38.3999Z" fill="#FFCE31" /> <path d="M38.2002 40.8H38.5002V45.75H38.2002V40.8Z" fill="#83BF4F" /> <path d="M34.9746 39.3V41.025C34.9746 41.325 35.1996 41.625 35.5746 41.625H36.1746V40.5C36.1746 39.6 34.9746 39.3 34.9746 39.3Z" fill="#C94747" /> <path d="M36.7752 39.3V41.025C36.7752 41.325 36.5502 41.625 36.1752 41.625H35.5752V40.5C35.5752 39.6 36.7752 39.3 36.7752 39.3Z" fill="#ED4C5C" /> <path d="M35.7246 41.625H36.0246V45.75H35.7246V41.625Z" fill="#83BF4F" /> </g> <defs> <clipPath id="clip0_337_5530"> <rect width="48" height="48" fill="white" transform="translate(0.25 0.75)" /> </clipPath> </defs> </svg>
  }
];

const purposeTypes = [
  {
    key: 'moveIn',
    label: 'Move In',
    svg: <svg viewBox="0 0 49 49" fill="none"> <g clipPath="url(#clip0_337_5591)"> <path d="M24.75 48.7499L0.75 34.3499V15.1499L24.75 29.5499V48.7499Z" fill="#89664C" /> <path d="M24.75 29.5499V48.7499L48.75 34.3499V15.1499L24.75 29.5499Z" fill="#FED0AC" /> <path d="M0.75 15.15L24.75 29.55L48.75 15.15L24.75 0.75L0.75 15.15Z" fill="#D3976E" /> <path d="M38.925 21.0001L15 6.6001L10.5 9.3001L34.5 23.7001L38.925 21.0001Z" fill="#89664C" /> <path d="M30.2246 5.85005L24.8996 2.55005L20.4746 5.25005L25.7996 8.47505L30.2246 5.85005Z" fill="#D0D0D0" /> <path d="M38.8504 21.075L34.6504 23.625V30.525L38.8504 27.975V21.075Z" fill="#D3976E" /> <path d="M47.6248 17.325L43.3498 19.875V26.775L47.6248 24.225V17.325ZM31.9498 33.375L26.1748 36.8249V46.275L31.9498 42.75V33.375Z" fill="white" /> <path d="M34.6504 42.825L38.8504 40.275V33.375L34.6504 35.925V42.825Z" fill="#D3976E" /> </g> <defs> <clipPath id="clip0_337_5591"> <rect width="48" height="48" fill="white" transform="translate(0.75 0.75)" /> </clipPath> </defs> </svg>
  },
  {
    key: 'rental',
    label: 'Rental',
    svg: <svg viewBox="0 0 49 49" fill="none"> <path d="M3.22852 28.8047H45.2075V45.7502H3.22852V28.8047Z" fill="url(#paint0_linear_337_5603)" /> <path d="M6.41459 10.515C6.41459 10.3758 6.4699 10.2422 6.56835 10.1438C6.66681 10.0453 6.80035 9.98999 6.93959 9.98999H8.85059C8.98982 9.98999 9.12336 10.0453 9.22182 10.1438C9.32027 10.2422 9.37559 10.3758 9.37559 10.515V18.558H6.41309L6.41459 10.515Z" fill="url(#paint1_radial_337_5603)" /> <path d="M6.41459 10.515C6.41459 10.3758 6.4699 10.2422 6.56835 10.1438C6.66681 10.0453 6.80035 9.98999 6.93959 9.98999H8.85059C8.98982 9.98999 9.12336 10.0453 9.22182 10.1438C9.32027 10.2422 9.37559 10.3758 9.37559 10.515V18.558H6.41309L6.41459 10.515Z" fill="url(#paint2_linear_337_5603)" /> <path d="M6.41459 10.515C6.41459 10.3758 6.4699 10.2422 6.56835 10.1438C6.66681 10.0453 6.80035 9.98999 6.93959 9.98999H8.85059C8.98982 9.98999 9.12336 10.0453 9.22182 10.1438C9.32027 10.2422 9.37559 10.3758 9.37559 10.515V18.558H6.41309L6.41459 10.515Z" fill="url(#paint3_linear_337_5603)" /> <path d="M6.41459 10.515C6.41459 10.3758 6.4699 10.2422 6.56835 10.1438C6.66681 10.0453 6.80035 9.98999 6.93959 9.98999H8.85059C8.98982 9.98999 9.12336 10.0453 9.22182 10.1438C9.32027 10.2422 9.37559 10.3758 9.37559 10.515V18.558H6.41309L6.41459 10.515Z" fill="url(#paint4_linear_337_5603)" /> <path d="M6.41459 10.515C6.41459 10.3758 6.4699 10.2422 6.56835 10.1438C6.66681 10.0453 6.80035 9.98999 6.93959 9.98999H8.85059C8.98982 9.98999 9.12336 10.0453 9.22182 10.1438C9.32027 10.2422 9.37559 10.3758 9.37559 10.515V18.558H6.41309L6.41459 10.515Z" fill="url(#paint5_radial_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint6_linear_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint7_linear_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint8_radial_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint9_linear_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint10_radial_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint11_linear_337_5603)" /> <path d="M21.4042 29.2966H4.8877V18.7771L13.1467 10.3621L21.4042 18.7771V29.2966Z" fill="url(#paint12_linear_337_5603)" /> <path d="M23.4189 19.1521L13.6509 9.52959C13.4765 9.35556 13.2402 9.25781 12.9939 9.25781C12.7475 9.25781 12.5112 9.35556 12.3369 9.52959C12.3369 9.52959 12.3279 9.52959 12.3279 9.54009L2.53885 19.1731C2.45296 19.2574 2.38472 19.358 2.33815 19.469C2.29157 19.58 2.26758 19.6992 2.26758 19.8196C2.26758 19.94 2.29157 20.0591 2.33815 20.1701C2.38472 20.2812 2.45296 20.3818 2.53885 20.4661C2.71454 20.6376 2.95033 20.7336 3.19585 20.7336C3.44138 20.7336 3.67717 20.6376 3.85285 20.4661L12.7269 11.7241C12.797 11.6554 12.8912 11.6169 12.9894 11.6169C13.0875 11.6169 13.1818 11.6554 13.2519 11.7241L22.0944 20.4346C22.2687 20.6086 22.505 20.7064 22.7514 20.7064C22.9977 20.7064 23.234 20.6086 23.4084 20.4346C23.495 20.3521 23.5642 20.253 23.6118 20.1432C23.6593 20.0334 23.6844 19.9152 23.6853 19.7956C23.6863 19.6759 23.6632 19.5573 23.6175 19.4468C23.5717 19.3362 23.5041 19.236 23.4189 19.1521Z" fill="url(#paint13_linear_337_5603)" /> <g filter="url(#filter0_f_337_5603)"> <path d="M13.1465 9.98999L22.9415 19.635" stroke="url(#paint14_linear_337_5603)" strokeWidth="0.15" strokeLinecap="round" /> </g> <g filter="url(#filter1_f_337_5603)"> <path d="M13.1466 9.98999L3.35156 19.635" stroke="url(#paint15_linear_337_5603)" strokeOpacity="0.5" strokeWidth="0.15" strokeLinecap="round" /> </g> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint16_radial_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint17_linear_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint18_linear_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint19_linear_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint20_radial_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint21_radial_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint22_linear_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint23_linear_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint24_linear_337_5603)" /> <path d="M28.96 10.515C28.96 10.3758 29.0153 10.2422 29.1137 10.1438C29.2122 10.0453 29.3457 9.98999 29.485 9.98999H31.3975C31.4664 9.98999 31.5347 10.0036 31.5984 10.03C31.6621 10.0563 31.7199 10.095 31.7687 10.1438C31.8174 10.1925 31.8561 10.2504 31.8825 10.3141C31.9089 10.3778 31.9225 10.446 31.9225 10.515V18.558H28.96V10.515Z" fill="url(#paint25_radial_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint26_linear_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint27_linear_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint28_radial_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint29_linear_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint30_radial_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint31_linear_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint32_linear_337_5603)" /> <path d="M43.9526 29.2966H27.4346V18.7771L35.6936 10.3621L43.9511 18.7771L43.9526 29.2966Z" fill="url(#paint33_radial_337_5603)" /> <path d="M45.9652 19.1521L36.1987 9.52959C36.0243 9.35556 35.7881 9.25781 35.5417 9.25781C35.2954 9.25781 35.0591 9.35556 34.8847 9.52959C34.8847 9.52959 34.8742 9.52959 34.8742 9.54009L25.0867 19.1731C25.0008 19.2574 24.9326 19.358 24.886 19.469C24.8394 19.58 24.8154 19.6992 24.8154 19.8196C24.8154 19.94 24.8394 20.0591 24.886 20.1701C24.9326 20.2812 25.0008 20.3818 25.0867 20.4661C25.2623 20.6372 25.4978 20.7329 25.743 20.7329C25.9881 20.7329 26.2236 20.6372 26.3992 20.4661L35.2732 11.7241C35.3433 11.6554 35.4375 11.6169 35.5357 11.6169C35.6339 11.6169 35.7281 11.6554 35.7982 11.7241L44.6407 20.4346C44.8151 20.6086 45.0514 20.7064 45.2977 20.7064C45.5441 20.7064 45.7803 20.6086 45.9547 20.4346C46.0412 20.352 46.1102 20.2529 46.1576 20.1431C46.2051 20.0333 46.2301 19.9151 46.231 19.7956C46.232 19.676 46.209 19.5574 46.1633 19.4469C46.1177 19.3364 46.0503 19.2361 45.9652 19.1521Z" fill="url(#paint34_linear_337_5603)" /> <g filter="url(#filter2_f_337_5603)"> <path d="M35.6934 9.98999L45.4884 19.635" stroke="url(#paint35_linear_337_5603)" strokeWidth="0.15" strokeLinecap="round" /> </g> <g filter="url(#filter3_f_337_5603)"> <path d="M35.6934 9.98999L25.8984 19.635" stroke="url(#paint36_linear_337_5603)" strokeOpacity="0.5" strokeWidth="0.15" strokeLinecap="round" /> </g> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint37_linear_337_5603)" /> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint38_linear_337_5603)" /> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint39_radial_337_5603)" /> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint40_linear_337_5603)" /> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint41_radial_337_5603)" /> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint42_linear_337_5603)" /> <path d="M36.6478 39.8942H12.0703V24.5612L24.3583 12.2942L36.6478 24.5612V39.8942Z" fill="url(#paint43_linear_337_5603)" /> <g filter="url(#filter4_f_337_5603)"> <path d="M23.1251 39.4681H15.2051V28.5721C15.2051 27.7426 15.8111 27.0601 16.5506 27.0601H21.7781C22.5161 27.0601 23.1236 27.7426 23.1236 28.5736L23.1251 39.4681Z" fill="url(#paint44_linear_337_5603)" /> </g> <g filter="url(#filter5_i_337_5603)"> <path d="M32.9156 33.3077H28.1381C28.0126 33.3077 27.8884 33.283 27.7725 33.2349C27.6565 33.1869 27.5512 33.1165 27.4625 33.0278C27.3738 32.9391 27.3034 32.8338 27.2554 32.7178C27.2073 32.6019 27.1826 32.4777 27.1826 32.3522V27.5732C27.1826 27.0362 27.6176 26.6177 28.1381 26.6177H32.9156C33.4511 26.6177 33.8711 27.0527 33.8711 27.5732V32.3522C33.8725 32.478 33.8488 32.6029 33.8013 32.7195C33.7537 32.836 33.6834 32.9419 33.5944 33.031C33.5054 33.12 33.3995 33.1903 33.2829 33.2378C33.1664 33.2853 33.0415 33.3091 32.9156 33.3077Z" fill="url(#paint45_linear_337_5603)" /> <path d="M32.9156 33.3077H28.1381C28.0126 33.3077 27.8884 33.283 27.7725 33.2349C27.6565 33.1869 27.5512 33.1165 27.4625 33.0278C27.3738 32.9391 27.3034 32.8338 27.2554 32.7178C27.2073 32.6019 27.1826 32.4777 27.1826 32.3522V27.5732C27.1826 27.0362 27.6176 26.6177 28.1381 26.6177H32.9156C33.4511 26.6177 33.8711 27.0527 33.8711 27.5732V32.3522C33.8725 32.478 33.8488 32.6029 33.8013 32.7195C33.7537 32.836 33.6834 32.9419 33.5944 33.031C33.5054 33.12 33.3995 33.1903 33.2829 33.2378C33.1664 33.2853 33.0415 33.3091 32.9156 33.3077Z" fill="url(#paint46_linear_337_5603)" /> </g> <path d="M32.9156 33.3077H28.1381C28.0126 33.3077 27.8884 33.283 27.7725 33.2349C27.6565 33.1869 27.5512 33.1165 27.4625 33.0278C27.3738 32.9391 27.3034 32.8338 27.2554 32.7178C27.2073 32.6019 27.1826 32.4777 27.1826 32.3522V27.5732C27.1826 27.0362 27.6176 26.6177 28.1381 26.6177H32.9156C33.4511 26.6177 33.8711 27.0527 33.8711 27.5732V32.3522C33.8725 32.478 33.8488 32.6029 33.8013 32.7195C33.7537 32.836 33.6834 32.9419 33.5944 33.031C33.5054 33.12 33.3995 33.1903 33.2829 33.2378C33.1664 33.2853 33.0415 33.3091 32.9156 33.3077Z" fill="url(#paint47_linear_337_5603)" /> <path d="M32.9156 33.3077H28.1381C28.0126 33.3077 27.8884 33.283 27.7725 33.2349C27.6565 33.1869 27.5512 33.1165 27.4625 33.0278C27.3738 32.9391 27.3034 32.8338 27.2554 32.7178C27.2073 32.6019 27.1826 32.4777 27.1826 32.3522V27.5732C27.1826 27.0362 27.6176 26.6177 28.1381 26.6177H32.9156C33.4511 26.6177 33.8711 27.0527 33.8711 27.5732V32.3522C33.8725 32.478 33.8488 32.6029 33.8013 32.7195C33.7537 32.836 33.6834 32.9419 33.5944 33.031C33.5054 33.12 33.3995 33.1903 33.2829 33.2378C33.1664 33.2853 33.0415 33.3091 32.9156 33.3077Z" fill="url(#paint48_linear_337_5603)" /> <g filter="url(#filter6_ii_337_5603)"> <path d="M24.4819 38.6025H15.6484V27.9195C15.6532 27.5245 15.8135 27.1474 16.0946 26.8699C16.3757 26.5925 16.755 26.4371 17.1499 26.4375H22.9804C23.3752 26.4375 23.754 26.593 24.0348 26.8705C24.3156 27.1479 24.4757 27.5248 24.4804 27.9195L24.4819 38.6025Z" fill="url(#paint49_linear_337_5603)" /> </g> <g filter="url(#filter7_f_337_5603)"> <path d="M22.2696 33.3692C22.4384 33.3692 22.6004 33.3021 22.7198 33.1827C22.8392 33.0633 22.9063 32.9013 22.9063 32.7325C22.9063 32.5636 22.8392 32.4016 22.7198 32.2822C22.6004 32.1628 22.4384 32.0957 22.2696 32.0957C22.1007 32.0957 21.9387 32.1628 21.8193 32.2822C21.6999 32.4016 21.6328 32.5636 21.6328 32.7325C21.6328 32.9013 21.6999 33.0633 21.8193 33.1827C21.9387 33.3021 22.1007 33.3692 22.2696 33.3692Z" fill="#62393D" /> </g> <path d="M39.8623 24.7066L25.3273 10.3891C25.0678 10.1305 24.7164 9.98535 24.35 9.98535C23.9837 9.98535 23.6323 10.1305 23.3728 10.3891C23.3728 10.3891 23.3578 10.3891 23.3578 10.4041L8.79277 24.7381C8.6651 24.8638 8.56371 25.0135 8.4945 25.1787C8.42529 25.3439 8.38965 25.5213 8.38965 25.7004C8.38965 25.8795 8.42529 26.0568 8.4945 26.222C8.56371 26.3872 8.6651 26.537 8.79277 26.6626C9.05361 26.9187 9.40451 27.0621 9.77002 27.0621C10.1355 27.0621 10.4864 26.9187 10.7473 26.6626L24.0793 13.5271C24.1494 13.4584 24.2436 13.4199 24.3418 13.4199C24.4399 13.4199 24.5342 13.4584 24.6043 13.5271L37.8913 26.6161C38.4313 27.1561 39.3073 27.1561 39.8458 26.6161C40.3858 26.0761 40.4008 25.2301 39.8608 24.7066" fill="url(#paint50_linear_337_5603)" /> <g filter="url(#filter8_ii_337_5603)"> <path d="M22.4347 33.2731C22.5217 33.2773 22.6087 33.2638 22.6903 33.2334C22.772 33.203 22.8466 33.1563 22.9097 33.0962C22.9727 33.0361 23.023 32.9638 23.0573 32.8837C23.0916 32.8036 23.1093 32.7174 23.1093 32.6303C23.1093 32.5432 23.0916 32.457 23.0573 32.3769C23.023 32.2968 22.9727 32.2245 22.9097 32.1644C22.8466 32.1043 22.772 32.0577 22.6903 32.0273C22.6087 31.9969 22.5217 31.9834 22.4347 31.9876C22.2696 31.9955 22.1139 32.0667 21.9999 32.1864C21.8859 32.3061 21.8223 32.465 21.8223 32.6303C21.8223 32.7956 21.8859 32.9546 21.9999 33.0742C22.1139 33.1939 22.2696 33.2651 22.4347 33.2731Z" fill="#895D56" /> </g> <path d="M14.5122 39.7275C14.5122 39.4292 14.6308 39.143 14.8417 38.932C15.0527 38.7211 15.3389 38.6025 15.6372 38.6025H24.3912C24.6896 38.6025 24.9758 38.7211 25.1867 38.932C25.3977 39.143 25.5162 39.4292 25.5162 39.7275V39.8925H14.5107L14.5122 39.7275Z" fill="url(#paint51_linear_337_5603)" /> <path d="M14.5122 39.7275C14.5122 39.4292 14.6308 39.143 14.8417 38.932C15.0527 38.7211 15.3389 38.6025 15.6372 38.6025H24.3912C24.6896 38.6025 24.9758 38.7211 25.1867 38.932C25.3977 39.143 25.5162 39.4292 25.5162 39.7275V39.8925H14.5107L14.5122 39.7275Z" fill="url(#paint52_linear_337_5603)" /> <path d="M14.5122 39.7275C14.5122 39.4292 14.6308 39.143 14.8417 38.932C15.0527 38.7211 15.3389 38.6025 15.6372 38.6025H24.3912C24.6896 38.6025 24.9758 38.7211 25.1867 38.932C25.3977 39.143 25.5162 39.4292 25.5162 39.7275V39.8925H14.5107L14.5122 39.7275Z" fill="url(#paint53_linear_337_5603)" /> <g filter="url(#filter9_f_337_5603)"> <path d="M24.5752 11.0747L39.1507 25.4267" stroke="url(#paint54_linear_337_5603)" strokeWidth="0.15" strokeLinecap="round" /> </g> <g filter="url(#filter10_f_337_5603)"> <path d="M24.575 11.0747L10.001 25.4267" stroke="url(#paint55_linear_337_5603)" strokeOpacity="0.5" strokeWidth="0.15" strokeLinecap="round" /> </g> <g filter="url(#filter11_i_337_5603)"> <path d="M40.0059 39.8702C40.8172 39.579 41.5192 39.0453 42.0167 38.3414C42.5142 37.6375 42.7831 36.7976 42.7869 35.9357C42.7869 33.6197 40.8804 31.7417 38.5269 31.7417C37.8686 31.7402 37.2187 31.8907 36.6281 32.1816C36.0375 32.4725 35.522 32.8959 35.1219 33.4187C34.5819 34.1252 33.8259 34.7162 33.1014 35.2337C32.731 35.496 32.4285 35.8431 32.2193 36.2459C32.01 36.6488 31.9 37.0958 31.8984 37.5497C31.8984 38.5052 32.3739 39.3497 33.1044 39.8702H40.0059Z" fill="#2EAD69" /> <path d="M40.0059 39.8702C40.8172 39.579 41.5192 39.0453 42.0167 38.3414C42.5142 37.6375 42.7831 36.7976 42.7869 35.9357C42.7869 33.6197 40.8804 31.7417 38.5269 31.7417C37.8686 31.7402 37.2187 31.8907 36.6281 32.1816C36.0375 32.4725 35.522 32.8959 35.1219 33.4187C34.5819 34.1252 33.8259 34.7162 33.1014 35.2337C32.731 35.496 32.4285 35.8431 32.2193 36.2459C32.01 36.6488 31.9 37.0958 31.8984 37.5497C31.8984 38.5052 32.3739 39.3497 33.1044 39.8702H40.0059Z" fill="url(#paint56_linear_337_5603)" /> <path d="M40.0059 39.8702C40.8172 39.579 41.5192 39.0453 42.0167 38.3414C42.5142 37.6375 42.7831 36.7976 42.7869 35.9357C42.7869 33.6197 40.8804 31.7417 38.5269 31.7417C37.8686 31.7402 37.2187 31.8907 36.6281 32.1816C36.0375 32.4725 35.522 32.8959 35.1219 33.4187C34.5819 34.1252 33.8259 34.7162 33.1014 35.2337C32.731 35.496 32.4285 35.8431 32.2193 36.2459C32.01 36.6488 31.9 37.0958 31.8984 37.5497C31.8984 38.5052 32.3739 39.3497 33.1044 39.8702H40.0059Z" fill="url(#paint57_radial_337_5603)" /> <path d="M40.0059 39.8702C40.8172 39.579 41.5192 39.0453 42.0167 38.3414C42.5142 37.6375 42.7831 36.7976 42.7869 35.9357C42.7869 33.6197 40.8804 31.7417 38.5269 31.7417C37.8686 31.7402 37.2187 31.8907 36.6281 32.1816C36.0375 32.4725 35.522 32.8959 35.1219 33.4187C34.5819 34.1252 33.8259 34.7162 33.1014 35.2337C32.731 35.496 32.4285 35.8431 32.2193 36.2459C32.01 36.6488 31.9 37.0958 31.8984 37.5497C31.8984 38.5052 32.3739 39.3497 33.1044 39.8702H40.0059Z" fill="url(#paint58_radial_337_5603)" /> </g> <g filter="url(#filter12_i_337_5603)"> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="#2EAD69" /> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="url(#paint59_linear_337_5603)" /> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="url(#paint60_radial_337_5603)" /> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="url(#paint61_radial_337_5603)" /> </g> <g filter="url(#filter13_i_337_5603)"> <path d="M43.6868 30.9002C44.131 30.741 44.5154 30.4489 44.7876 30.0634C45.0597 29.678 45.2065 29.218 45.2078 28.7462C45.2078 27.4787 44.1653 26.4512 42.8768 26.4512C42.0008 26.4512 41.2388 26.9267 40.8398 27.6302C40.6858 27.8867 40.4548 28.0882 40.1798 28.2062C39.9282 28.3173 39.7106 28.4932 39.5491 28.7159C39.3877 28.9386 39.2881 29.2001 39.2607 29.4738C39.2332 29.7475 39.2789 30.0236 39.3929 30.2739C39.5069 30.5242 39.6853 30.7398 39.9098 30.8987L43.6868 30.9002Z" fill="#3ABD6C" /> <path d="M43.6868 30.9002C44.131 30.741 44.5154 30.4489 44.7876 30.0634C45.0597 29.678 45.2065 29.218 45.2078 28.7462C45.2078 27.4787 44.1653 26.4512 42.8768 26.4512C42.0008 26.4512 41.2388 26.9267 40.8398 27.6302C40.6858 27.8867 40.4548 28.0882 40.1798 28.2062C39.9282 28.3173 39.7106 28.4932 39.5491 28.7159C39.3877 28.9386 39.2881 29.2001 39.2607 29.4738C39.2332 29.7475 39.2789 30.0236 39.3929 30.2739C39.5069 30.5242 39.6853 30.7398 39.9098 30.8987L43.6868 30.9002Z" fill="url(#paint62_linear_337_5603)" /> <path d="M43.6868 30.9002C44.131 30.741 44.5154 30.4489 44.7876 30.0634C45.0597 29.678 45.2065 29.218 45.2078 28.7462C45.2078 27.4787 44.1653 26.4512 42.8768 26.4512C42.0008 26.4512 41.2388 26.9267 40.8398 27.6302C40.6858 27.8867 40.4548 28.0882 40.1798 28.2062C39.9282 28.3173 39.7106 28.4932 39.5491 28.7159C39.3877 28.9386 39.2881 29.2001 39.2607 29.4738C39.2332 29.7475 39.2789 30.0236 39.3929 30.2739C39.5069 30.5242 39.6853 30.7398 39.9098 30.8987L43.6868 30.9002Z" fill="url(#paint63_radial_337_5603)" /> <path d="M43.6868 30.9002C44.131 30.741 44.5154 30.4489 44.7876 30.0634C45.0597 29.678 45.2065 29.218 45.2078 28.7462C45.2078 27.4787 44.1653 26.4512 42.8768 26.4512C42.0008 26.4512 41.2388 26.9267 40.8398 27.6302C40.6858 27.8867 40.4548 28.0882 40.1798 28.2062C39.9282 28.3173 39.7106 28.4932 39.5491 28.7159C39.3877 28.9386 39.2881 29.2001 39.2607 29.4738C39.2332 29.7475 39.2789 30.0236 39.3929 30.2739C39.5069 30.5242 39.6853 30.7398 39.9098 30.8987L43.6868 30.9002Z" fill="url(#paint64_radial_337_5603)" /> </g> <g filter="url(#filter14_i_337_5603)"> <path d="M4.96 30.9002C4.51552 30.7413 4.13083 30.4492 3.85838 30.0638C3.58593 29.6783 3.43896 29.2182 3.4375 28.7462C3.4375 27.4787 4.4815 26.4512 5.7685 26.4512C6.6445 26.4512 7.4065 26.9267 7.8055 27.6302C7.95996 27.8869 8.19142 28.0885 8.467 28.2062C9.0145 28.4537 9.397 28.9982 9.397 29.6312C9.397 30.1532 9.136 30.6152 8.737 30.9002H4.96Z" fill="#2BA75C" /> <path d="M4.96 30.9002C4.51552 30.7413 4.13083 30.4492 3.85838 30.0638C3.58593 29.6783 3.43896 29.2182 3.4375 28.7462C3.4375 27.4787 4.4815 26.4512 5.7685 26.4512C6.6445 26.4512 7.4065 26.9267 7.8055 27.6302C7.95996 27.8869 8.19142 28.0885 8.467 28.2062C9.0145 28.4537 9.397 28.9982 9.397 29.6312C9.397 30.1532 9.136 30.6152 8.737 30.9002H4.96Z" fill="url(#paint65_linear_337_5603)" /> <path d="M4.96 30.9002C4.51552 30.7413 4.13083 30.4492 3.85838 30.0638C3.58593 29.6783 3.43896 29.2182 3.4375 28.7462C3.4375 27.4787 4.4815 26.4512 5.7685 26.4512C6.6445 26.4512 7.4065 26.9267 7.8055 27.6302C7.95996 27.8869 8.19142 28.0885 8.467 28.2062C9.0145 28.4537 9.397 28.9982 9.397 29.6312C9.397 30.1532 9.136 30.6152 8.737 30.9002H4.96Z" fill="url(#paint66_radial_337_5603)" /> </g> <path d="M40.0059 39.8702C40.8172 39.579 41.5192 39.0453 42.0167 38.3414C42.5142 37.6375 42.7831 36.7976 42.7869 35.9357C42.7869 33.6197 40.8804 31.7417 38.5269 31.7417C37.8686 31.7402 37.2187 31.8907 36.6281 32.1816C36.0375 32.4725 35.522 32.8959 35.1219 33.4187C34.5819 34.1252 33.8259 34.7162 33.1014 35.2337C32.731 35.496 32.4285 35.8431 32.2193 36.2459C32.01 36.6488 31.9 37.0958 31.8984 37.5497C31.8984 38.5052 32.3739 39.3497 33.1044 39.8702H40.0059Z" fill="url(#paint67_radial_337_5603)" /> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="url(#paint68_radial_337_5603)" /> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="url(#paint69_linear_337_5603)" /> <path d="M8.71016 39.8702C7.89919 39.5787 7.19749 39.0449 6.70027 38.341C6.20304 37.6372 5.93436 36.7975 5.93066 35.9357C5.93066 33.6197 7.83716 31.7417 10.1907 31.7417C11.5827 31.7417 12.8202 32.4002 13.5957 33.4187C14.1357 34.1252 14.8917 34.7162 15.6162 35.2337C16.3452 35.7527 16.8177 36.5972 16.8177 37.5497C16.8177 38.5052 16.3437 39.3497 15.6132 39.8702H8.71016Z" fill="url(#paint70_radial_337_5603)" /> <path d="M43.6868 30.9002C44.131 30.741 44.5154 30.4489 44.7876 30.0634C45.0597 29.678 45.2065 29.218 45.2078 28.7462C45.2078 27.4787 44.1653 26.4512 42.8768 26.4512C42.0008 26.4512 41.2388 26.9267 40.8398 27.6302C40.6858 27.8867 40.4548 28.0882 40.1798 28.2062C39.9282 28.3173 39.7106 28.4932 39.5491 28.7159C39.3877 28.9386 39.2881 29.2001 39.2607 29.4738C39.2332 29.7475 39.2789 30.0236 39.3929 30.2739C39.5069 30.5242 39.6853 30.7398 39.9098 30.8987L43.6868 30.9002Z" fill="url(#paint71_radial_337_5603)" /> <path d="M4.96 30.9002C4.51552 30.7413 4.13083 30.4492 3.85838 30.0638C3.58593 29.6783 3.43896 29.2182 3.4375 28.7462C3.4375 27.4787 4.4815 26.4512 5.7685 26.4512C6.6445 26.4512 7.4065 26.9267 7.8055 27.6302C7.95996 27.8869 8.19142 28.0885 8.467 28.2062C9.0145 28.4537 9.397 28.9982 9.397 29.6312C9.397 30.1532 9.136 30.6152 8.737 30.9002H4.96Z" fill="url(#paint72_radial_337_5603)" /> <g filter="url(#filter15_f_337_5603)"> <path d="M36.3545 38.7991C35.6913 37.9432 35.2276 36.95 34.997 35.8921C34.9595 35.7121 34.769 35.5966 34.5965 35.6626L34.352 35.7541C33.9689 35.8995 33.6489 36.1746 33.4476 36.5315C33.2463 36.8885 33.1765 37.3047 33.2504 37.7078C33.3242 38.1108 33.537 38.4753 33.8517 38.7377C34.1665 39.0001 34.5632 39.1439 34.973 39.1441H36.1955C36.3695 39.1441 36.4625 38.9341 36.3545 38.7991Z" fill="#31B570" /> </g> <g filter="url(#filter16_f_337_5603)"> <path d="M41.6877 30.3151C41.2452 29.7571 41.0277 29.1151 40.9452 28.7236C40.9242 28.6246 40.8207 28.5616 40.7262 28.5976L40.5927 28.6486C40.3851 28.7298 40.2122 28.8808 40.1037 29.0756C39.9952 29.2703 39.9579 29.4968 39.9982 29.7161C40.0385 29.9354 40.1538 30.1338 40.3244 30.2773C40.495 30.4208 40.7103 30.5005 40.9332 30.5026H41.6022C41.6967 30.5026 41.7477 30.3901 41.6877 30.3151Z" fill="#31B570" /> </g> <g filter="url(#filter17_f_337_5603)"> <path d="M6.95746 30.3151C7.39996 29.7571 7.61746 29.1151 7.69996 28.7236C7.72096 28.6246 7.82446 28.5616 7.91896 28.5976L8.05396 28.6486C8.2632 28.7285 8.43787 28.8791 8.54765 29.0743C8.65743 29.2695 8.69538 29.497 8.65493 29.7173C8.61447 29.9376 8.49816 30.1367 8.32618 30.2802C8.1542 30.4236 7.93742 30.5023 7.71346 30.5026H7.04446C6.94846 30.5026 6.89746 30.3901 6.95746 30.3151Z" fill="#31B570" /> </g> <defs> <filter id="filter0_f_337_5603" x="12.7713" y="9.61504" width="10.5453" height="10.3949" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter1_f_337_5603" x="2.97637" y="9.61504" width="10.5453" height="10.3949" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter2_f_337_5603" x="35.3182" y="9.61504" width="10.5453" height="10.3949" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter3_f_337_5603" x="25.5232" y="9.61504" width="10.5453" height="10.3949" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter4_f_337_5603" x="14.9551" y="26.8101" width="8.41992" height="12.908" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.125" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter5_i_337_5603" x="26.9326" y="26.6177" width="6.93848" height="6.93994" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-0.25" dy="0.25" /> <feGaussianBlur stdDeviation="0.125" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.47451 0 0 0 0 0.792157 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> </filter> <filter id="filter6_ii_337_5603" x="15.5484" y="26.4375" width="9.05898" height="12.165" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.125" /> <feGaussianBlur stdDeviation="0.125" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.254902 0 0 0 0 0.188235 0 0 0 0 0.141176 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-0.1" /> <feGaussianBlur stdDeviation="0.075" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.694118 0 0 0 0 0.470588 0 0 0 0 0.407843 0 0 0 1 0" /> <feBlend mode="normal" in2="effect1_innerShadow_337_5603" result="effect2_innerShadow_337_5603" /> </filter> <filter id="filter7_f_337_5603" x="21.5578" y="32.0207" width="1.42344" height="1.42344" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.0375" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter8_ii_337_5603" x="21.7723" y="31.9868" width="1.38711" height="1.28711" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="-0.05" /> <feGaussianBlur stdDeviation="0.05" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.694118 0 0 0 0 0.482353 0 0 0 0 0.419608 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.05" /> <feGaussianBlur stdDeviation="0.05" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.184314 0 0 0 0 0.164706 0 0 0 1 0" /> <feBlend mode="normal" in2="effect1_innerShadow_337_5603" result="effect2_innerShadow_337_5603" /> </filter> <filter id="filter9_f_337_5603" x="24.2" y="10.6998" width="15.3256" height="15.102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter10_f_337_5603" x="9.62578" y="10.6998" width="15.3246" height="15.102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.15" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter11_i_337_5603" x="31.8984" y="31.7417" width="10.9887" height="8.22842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.1" dy="0.1" /> <feGaussianBlur stdDeviation="0.15" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> </filter> <filter id="filter12_i_337_5603" x="5.93066" y="31.7417" width="10.9867" height="8.22842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.1" dy="0.1" /> <feGaussianBlur stdDeviation="0.15" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> </filter> <filter id="filter13_i_337_5603" x="39.2529" y="26.4512" width="6.05508" height="4.54897" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.1" dy="0.1" /> <feGaussianBlur stdDeviation="0.15" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> </filter> <filter id="filter14_i_337_5603" x="3.4375" y="26.4512" width="6.05996" height="4.54897" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.1" dy="0.1" /> <feGaussianBlur stdDeviation="0.15" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_337_5603" /> </filter> <filter id="filter15_f_337_5603" x="32.8467" y="35.2688" width="3.92871" height="4.25024" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.1875" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter16_f_337_5603" x="39.6074" y="28.2124" width="2.48145" height="2.66528" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.1875" result="effect1_foregroundBlur_337_5603" /> </filter> <filter id="filter17_f_337_5603" x="6.55664" y="28.2124" width="2.48926" height="2.66528" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="0.1875" result="effect1_foregroundBlur_337_5603" /> </filter> <linearGradient id="paint0_linear_337_5603" x1="5.57302" y1="41.0162" x2="44.291" y2="41.0162" gradientUnits="userSpaceOnUse"> <stop stopColor="#42CF80" /> <stop offset="1" stopColor="#50DB92" /> </linearGradient> <radialGradient id="paint1_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.97509 10.47) rotate(90) scale(3.80433 1.88877)"> <stop stopColor="#D39364" /> <stop offset="1" stopColor="#9F6941" /> </radialGradient> <linearGradient id="paint2_linear_337_5603" x1="6.20909" y1="13.299" x2="7.44809" y2="13.299" gradientUnits="userSpaceOnUse"> <stop stopColor="#8E694B" /> <stop offset="1" stopColor="#8E694B" stopOpacity="0" /> </linearGradient> <linearGradient id="paint3_linear_337_5603" x1="8.63459" y1="14.274" x2="8.09309" y2="13.635" gradientUnits="userSpaceOnUse"> <stop stopColor="#C77958" /> <stop offset="1" stopColor="#C77958" stopOpacity="0" /> </linearGradient> <linearGradient id="paint4_linear_337_5603" x1="7.89359" y1="9.94349" x2="7.89359" y2="10.083" gradientUnits="userSpaceOnUse"> <stop stopColor="#D5AD80" /> <stop offset="1" stopColor="#D5AD80" stopOpacity="0" /> </linearGradient> <radialGradient id="paint5_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.72209 10.1445) rotate(180) scale(2.05207 0.441105)"> <stop stopColor="#EAAA75" /> <stop offset="1" stopColor="#EAAA75" stopOpacity="0" /> </radialGradient> <linearGradient id="paint6_linear_337_5603" x1="13.1467" y1="26.2036" x2="9.22869" y2="22.2661" gradientUnits="userSpaceOnUse"> <stop offset="0.164" stopColor="#836444" /> <stop offset="1" stopColor="#D38157" /> </linearGradient> <linearGradient id="paint7_linear_337_5603" x1="5.9227" y1="29.7376" x2="12.1522" y2="20.9446" gradientUnits="userSpaceOnUse"> <stop stopColor="#BA8951" /> <stop offset="1" stopColor="#BA8951" stopOpacity="0" /> </linearGradient> <radialGradient id="paint8_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.3147 28.6861) rotate(-116.755) scale(2.94779 3.52252)"> <stop stopColor="#BEAB75" /> <stop offset="1" stopColor="#BEAB75" stopOpacity="0" /> </radialGradient> <linearGradient id="paint9_linear_337_5603" x1="21.4042" y1="25.3186" x2="20.8732" y2="25.3186" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFE6B1" /> <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" /> </linearGradient> <radialGradient id="paint10_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.5992 18.1501) rotate(90) scale(3.69192 0.76497)"> <stop offset="0.35" stopColor="#9E413E" /> <stop offset="1" stopColor="#9E413E" stopOpacity="0" /> </radialGradient> <linearGradient id="paint11_linear_337_5603" x1="15.9262" y1="13.6201" x2="14.6347" y2="15.1141" gradientUnits="userSpaceOnUse"> <stop stopColor="#9D3C3A" /> <stop offset="1" stopColor="#9D3C3A" stopOpacity="0" /> </linearGradient> <linearGradient id="paint12_linear_337_5603" x1="4.7857" y1="27.1261" x2="5.3497" y2="27.1261" gradientUnits="userSpaceOnUse"> <stop stopColor="#845F3D" /> <stop offset="1" stopColor="#845F3D" stopOpacity="0" /> </linearGradient> <linearGradient id="paint13_linear_337_5603" x1="12.9759" y1="9.25809" x2="12.9759" y2="16.9801" gradientUnits="userSpaceOnUse"> <stop stopColor="#E85430" /> <stop offset="1" stopColor="#C11C2A" /> </linearGradient> <linearGradient id="paint14_linear_337_5603" x1="12.845" y1="9.84149" x2="23.351" y2="20.6565" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <linearGradient id="paint15_linear_337_5603" x1="13.4466" y1="9.84149" x2="2.94206" y2="20.6565" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <radialGradient id="paint16_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(31.5204 10.4739) rotate(90) scale(3.80433 1.88877)"> <stop stopColor="#FFD1A3" /> <stop offset="1" stopColor="#DFA276" /> </radialGradient> <linearGradient id="paint17_linear_337_5603" x1="28.756" y1="13.299" x2="29.995" y2="13.299" gradientUnits="userSpaceOnUse"> <stop stopColor="#8E694B" /> <stop offset="1" stopColor="#8E694B" stopOpacity="0" /> </linearGradient> <linearGradient id="paint18_linear_337_5603" x1="31.183" y1="14.274" x2="30.64" y2="13.635" gradientUnits="userSpaceOnUse"> <stop stopColor="#C77958" /> <stop offset="1" stopColor="#C77958" stopOpacity="0" /> </linearGradient> <linearGradient id="paint19_linear_337_5603" x1="30.442" y1="9.94349" x2="30.442" y2="10.083" gradientUnits="userSpaceOnUse"> <stop stopColor="#D5AD80" /> <stop offset="1" stopColor="#D5AD80" stopOpacity="0" /> </linearGradient> <radialGradient id="paint20_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.2705 10.1445) rotate(180) scale(2.05208 0.441105)"> <stop stopColor="#FFE9B1" /> <stop offset="1" stopColor="#FFE9B1" stopOpacity="0" /> </radialGradient> <radialGradient id="paint21_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(31.5204 10.4739) rotate(90) scale(3.80433 1.88877)"> <stop stopColor="#D39364" /> <stop offset="1" stopColor="#9F6941" /> </radialGradient> <linearGradient id="paint22_linear_337_5603" x1="28.756" y1="13.299" x2="29.995" y2="13.299" gradientUnits="userSpaceOnUse"> <stop stopColor="#8E694B" /> <stop offset="1" stopColor="#8E694B" stopOpacity="0" /> </linearGradient> <linearGradient id="paint23_linear_337_5603" x1="31.183" y1="14.274" x2="30.64" y2="13.635" gradientUnits="userSpaceOnUse"> <stop stopColor="#C77958" /> <stop offset="1" stopColor="#C77958" stopOpacity="0" /> </linearGradient> <linearGradient id="paint24_linear_337_5603" x1="30.442" y1="9.94349" x2="30.442" y2="10.083" gradientUnits="userSpaceOnUse"> <stop stopColor="#D5AD80" /> <stop offset="1" stopColor="#D5AD80" stopOpacity="0" /> </linearGradient> <radialGradient id="paint25_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.2705 10.1445) rotate(180) scale(2.05208 0.441105)"> <stop stopColor="#EAAA75" /> <stop offset="1" stopColor="#EAAA75" stopOpacity="0" /> </radialGradient> <linearGradient id="paint26_linear_337_5603" x1="32.6666" y1="22.7371" x2="43.4966" y2="22.7371" gradientUnits="userSpaceOnUse"> <stop stopColor="#E39162" /> <stop offset="1" stopColor="#EBB48C" /> </linearGradient> <linearGradient id="paint27_linear_337_5603" x1="28.4711" y1="29.7376" x2="34.6991" y2="20.9446" gradientUnits="userSpaceOnUse"> <stop stopColor="#BA8951" /> <stop offset="1" stopColor="#BA8951" stopOpacity="0" /> </linearGradient> <radialGradient id="paint28_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.8616 28.6861) rotate(-116.755) scale(2.94779 3.52252)"> <stop stopColor="#BEAB75" /> <stop offset="1" stopColor="#BEAB75" stopOpacity="0" /> </radialGradient> <linearGradient id="paint29_linear_337_5603" x1="43.9511" y1="25.3186" x2="43.4216" y2="25.3186" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFE6B1" /> <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" /> </linearGradient> <radialGradient id="paint30_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(44.1476 18.1501) rotate(90) scale(3.69192 0.76497)"> <stop offset="0.35" stopColor="#9E413E" /> <stop offset="1" stopColor="#9E413E" stopOpacity="0" /> </radialGradient> <linearGradient id="paint31_linear_337_5603" x1="38.2211" y1="13.8511" x2="37.2866" y2="14.8171" gradientUnits="userSpaceOnUse"> <stop stopColor="#B55852" /> <stop offset="1" stopColor="#B55852" stopOpacity="0" /> </linearGradient> <linearGradient id="paint32_linear_337_5603" x1="27.3326" y1="27.1261" x2="27.8966" y2="27.1261" gradientUnits="userSpaceOnUse"> <stop stopColor="#845F3D" /> <stop offset="1" stopColor="#845F3D" stopOpacity="0" /> </linearGradient> <radialGradient id="paint33_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35.6936 27.0466) scale(4.4732 5.24002)"> <stop stopColor="#BB825C" /> <stop offset="1" stopColor="#BB825C" stopOpacity="0" /> </radialGradient> <linearGradient id="paint34_linear_337_5603" x1="35.5237" y1="9.25809" x2="35.5237" y2="15.8581" gradientUnits="userSpaceOnUse"> <stop stopColor="#EA6D2E" /> <stop offset="1" stopColor="#CA222B" /> </linearGradient> <linearGradient id="paint35_linear_337_5603" x1="35.3919" y1="9.84149" x2="45.8979" y2="20.6565" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <linearGradient id="paint36_linear_337_5603" x1="35.9934" y1="9.84149" x2="25.4889" y2="20.6565" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <linearGradient id="paint37_linear_337_5603" x1="12.9643" y1="30.3317" x2="35.9698" y2="30.3317" gradientUnits="userSpaceOnUse"> <stop stopColor="#D7905F" /> <stop offset="1" stopColor="#E8BC97" /> </linearGradient> <linearGradient id="paint38_linear_337_5603" x1="13.6108" y1="40.5347" x2="22.6258" y2="27.5432" gradientUnits="userSpaceOnUse"> <stop stopColor="#BA8951" /> <stop offset="1" stopColor="#BA8951" stopOpacity="0" /> </linearGradient> <radialGradient id="paint39_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.0749 39.0027) rotate(-117.235) scale(4.31489 5.21931)"> <stop stopColor="#BEAB75" /> <stop offset="1" stopColor="#BEAB75" stopOpacity="0" /> </radialGradient> <linearGradient id="paint40_linear_337_5603" x1="36.6478" y1="34.0952" x2="35.8588" y2="34.0952" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFE6B1" /> <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" /> </linearGradient> <radialGradient id="paint41_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(36.9388 23.6447) rotate(90) scale(5.38112 1.1383)"> <stop offset="0.35" stopColor="#9E413E" /> <stop offset="1" stopColor="#9E413E" stopOpacity="0" /> </radialGradient> <linearGradient id="paint42_linear_337_5603" x1="28.4953" y1="17.0432" x2="27.9658" y2="17.5727" gradientUnits="userSpaceOnUse"> <stop stopColor="#B55852" /> <stop offset="1" stopColor="#B55852" stopOpacity="0" /> </linearGradient> <linearGradient id="paint43_linear_337_5603" x1="11.9188" y1="36.7292" x2="12.7573" y2="36.7292" gradientUnits="userSpaceOnUse"> <stop stopColor="#845F3D" /> <stop offset="1" stopColor="#845F3D" stopOpacity="0" /> </linearGradient> <linearGradient id="paint44_linear_337_5603" x1="19.1636" y1="27.0601" x2="19.1636" y2="39.4681" gradientUnits="userSpaceOnUse"> <stop stopColor="#805139" /> <stop offset="1" stopColor="#6D4D2F" /> </linearGradient> <linearGradient id="paint45_linear_337_5603" x1="27.1826" y1="33.8132" x2="34.4006" y2="26.6177" gradientUnits="userSpaceOnUse"> <stop stopColor="#4CCCFF" /> <stop offset="1" stopColor="#3A9EE6" /> </linearGradient> <linearGradient id="paint46_linear_337_5603" x1="30.5261" y1="33.7277" x2="30.5261" y2="32.4107" gradientUnits="userSpaceOnUse"> <stop stopColor="#1E9FE4" /> <stop offset="1" stopColor="#1E9FE4" stopOpacity="0" /> </linearGradient> <linearGradient id="paint47_linear_337_5603" x1="27.1826" y1="31.6067" x2="28.5251" y2="31.6067" gradientUnits="userSpaceOnUse"> <stop stopColor="#48E0FF" /> <stop offset="1" stopColor="#48E0FF" stopOpacity="0" /> </linearGradient> <linearGradient id="paint48_linear_337_5603" x1="28.1936" y1="25.4477" x2="29.0936" y2="28.1477" gradientUnits="userSpaceOnUse"> <stop stopColor="#43B3F2" /> <stop offset="1" stopColor="#43B3F2" stopOpacity="0" /> </linearGradient> <linearGradient id="paint49_linear_337_5603" x1="15.6484" y1="34.0665" x2="24.4819" y2="34.0095" gradientUnits="userSpaceOnUse"> <stop stopColor="#70504D" /> <stop offset="1" stopColor="#9B665E" /> </linearGradient> <linearGradient id="paint50_linear_337_5603" x1="24.3238" y1="9.98413" x2="24.3238" y2="27.0616" gradientUnits="userSpaceOnUse"> <stop stopColor="#EA6D2E" /> <stop offset="1" stopColor="#CA222B" /> </linearGradient> <linearGradient id="paint51_linear_337_5603" x1="14.8092" y1="39.894" x2="25.1142" y2="39.894" gradientUnits="userSpaceOnUse"> <stop stopColor="#9FA1A3" /> <stop offset="1" stopColor="#C4C1C7" /> </linearGradient> <linearGradient id="paint52_linear_337_5603" x1="14.3277" y1="39.894" x2="15.6402" y2="39.894" gradientUnits="userSpaceOnUse"> <stop stopColor="#59675C" /> <stop offset="1" stopColor="#59675C" stopOpacity="0" /> </linearGradient> <linearGradient id="paint53_linear_337_5603" x1="25.5147" y1="39.2475" x2="24.2967" y2="39.894" gradientUnits="userSpaceOnUse"> <stop stopColor="#C8CAC6" /> <stop offset="1" stopColor="#C8CAC6" stopOpacity="0" /> </linearGradient> <linearGradient id="paint54_linear_337_5603" x1="24.1267" y1="10.8527" x2="39.7597" y2="26.9477" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <linearGradient id="paint55_linear_337_5603" x1="25.0235" y1="10.8527" x2="9.39047" y2="26.9477" gradientUnits="userSpaceOnUse"> <stop stopColor="#FF8337" /> <stop offset="1" stopColor="#F24747" /> </linearGradient> <linearGradient id="paint56_linear_337_5603" x1="36.1044" y1="40.6967" x2="36.1044" y2="37.8797" gradientUnits="userSpaceOnUse"> <stop stopColor="#3B8478" /> <stop offset="1" stopColor="#3B8478" stopOpacity="0" /> </linearGradient> <radialGradient id="paint57_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.8187 43.9297) rotate(-110.329) scale(9.28737 4.23052)"> <stop stopColor="#2C785B" /> <stop offset="1" stopColor="#2C785B" stopOpacity="0" /> </radialGradient> <radialGradient id="paint58_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40.2099 34.5917) rotate(142.112) scale(10.3369 13.9913)"> <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" /> <stop offset="0.966" stopColor="#2C785B" /> </radialGradient> <linearGradient id="paint59_linear_337_5603" x1="12.6132" y1="40.6967" x2="12.6132" y2="37.8797" gradientUnits="userSpaceOnUse"> <stop stopColor="#3B8478" /> <stop offset="1" stopColor="#3B8478" stopOpacity="0" /> </linearGradient> <radialGradient id="paint60_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.89816 43.9307) rotate(-69.6712) scale(9.28737 4.23052)"> <stop stopColor="#2C785B" /> <stop offset="1" stopColor="#2C785B" stopOpacity="0" /> </radialGradient> <radialGradient id="paint61_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.50766 34.5917) rotate(37.8877) scale(10.3369 13.9913)"> <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" /> <stop offset="0.966" stopColor="#2C785B" /> </radialGradient> <linearGradient id="paint62_linear_337_5603" x1="41.5508" y1="31.3532" x2="41.5508" y2="29.8112" gradientUnits="userSpaceOnUse"> <stop stopColor="#3B8478" /> <stop offset="1" stopColor="#3B8478" stopOpacity="0" /> </linearGradient> <radialGradient id="paint63_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43.0373 33.1217) rotate(-110.329) scale(5.08297 2.31538)"> <stop stopColor="#2C785B" /> <stop offset="1" stopColor="#2C785B" stopOpacity="0" /> </radialGradient> <radialGradient id="paint64_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43.7983 28.0128) rotate(142.112) scale(5.65738 7.65744)"> <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" /> <stop offset="0.966" stopColor="#2C785B" /> </radialGradient> <linearGradient id="paint65_linear_337_5603" x1="7.0945" y1="31.3532" x2="7.0945" y2="29.8112" gradientUnits="userSpaceOnUse"> <stop stopColor="#3B8478" /> <stop offset="1" stopColor="#3B8478" stopOpacity="0" /> </linearGradient> <radialGradient id="paint66_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.84765 28.0111) rotate(37.888) scale(5.65738 7.65744)"> <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" /> <stop offset="0.966" stopColor="#2C785B" /> </radialGradient> <radialGradient id="paint67_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(42.3879 33.7517) rotate(148.884) scale(5.89202 5.60905)"> <stop stopColor="#60FB9A" /> <stop offset="1" stopColor="#60FB9A" stopOpacity="0" /> </radialGradient> <radialGradient id="paint68_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.9486 33.89) rotate(133.452) scale(7.36101 10.4167)"> <stop stopColor="#60FB9A" /> <stop offset="1" stopColor="#60FB9A" stopOpacity="0" /> </radialGradient> <linearGradient id="paint69_linear_337_5603" x1="12.6132" y1="40.5467" x2="12.6132" y2="37.8797" gradientUnits="userSpaceOnUse"> <stop stopColor="#3B8478" /> <stop offset="0.819" stopColor="#3B8478" stopOpacity="0" /> </linearGradient> <radialGradient id="paint70_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.4167 34.4537) rotate(157.166) scale(9.66352 12.9438)"> <stop offset="0.591" stopColor="#39895B" stopOpacity="0" /> <stop offset="1" stopColor="#39895B" /> </radialGradient> <radialGradient id="paint71_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(44.9888 27.5522) rotate(148.884) scale(3.22471 3.06983)"> <stop stopColor="#60FB9A" /> <stop offset="1" stopColor="#60FB9A" stopOpacity="0" /> </radialGradient> <radialGradient id="paint72_radial_337_5603" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.2915 27.0002) rotate(126.724) scale(3.68439 3.50744)"> <stop stopColor="#60FB9A" /> <stop offset="1" stopColor="#60FB9A" stopOpacity="0" /> </radialGradient> </defs> </svg>
  }
];

const scopeOfWorkItems = [
  { key: 'modularKitchen', label: 'Modular Kitchen' },
  { key: 'wardrobe', label: 'Wardrobe' },
  { key: 'entertainmentUnit', label: 'Entertainment Unit' },
  { key: 'looseFurniture', label: 'Loose Furniture' },
  { key: 'falseCeiling', label: 'False Ceiling' },
  { key: 'painting', label: 'Painting' },
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

// ... existing code ...

const StepOne = ({
  propertyTypes,
  purposeTypes,
  selectedPropertyType,
  setSelectedPropertyType,
  selectedPurposeType,
  setSelectedPurposeType,
  onNext,
  step,
  stepLabels
}) => (
  <StepOneContainer>
    <ProgressBar currentStep={step} stepLabels={stepLabels} />
    <StepTwoContent>
      <div className="step-1" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <ResponsiveH4 className="universal-font-bold">Please select your Property Type</ResponsiveH4>
          <SectionGrid>
            {propertyTypes.map((type) => (
              <GridItem
                key={type.key}
                style={{
                  border: selectedPropertyType === type.key ? '1px solid #D50F25' : '1px solid #D6D6D6',
                  background: selectedPropertyType === type.key ? '#FFF0F2' : '#fff',
                  cursor: 'pointer',
                  transition: 'border 0.2s, background 0.2s'
                }}
                onClick={() => setSelectedPropertyType(type.key)}
              >
                {type.svg}
                <span className='universal-font-medium'>{type.label}</span>
              </GridItem>
            ))}
          </SectionGrid>
        </div>
        <div>
          <ResponsiveH4 className="universal-font-bold">Purpose</ResponsiveH4>
          <SectionGrid>
            {purposeTypes.map((type) => (
              <GridItem
                key={type.key}
                style={{
                  border: selectedPurposeType === type.key ? '1px solid #D50F25' : '1px solid #D6D6D6',
                  background: selectedPurposeType === type.key ? '#FFF0F2' : '#fff',
                  cursor: 'pointer',
                  transition: 'border 0.2s, background 0.2s'
                }}
                onClick={() => setSelectedPurposeType(type.key)}
              >
                {type.svg}
                <span className='universal-font-medium'>{type.label}</span>
              </GridItem>
            ))}
          </SectionGrid>
        </div>
      </div>
    </StepTwoContent>
    <Button onClick={onNext} className="universal-font-medium" primary>Next</Button>
  </StepOneContainer>
);

// Step 2 Component
const StepTwo = ({ scopeOfWorkItems, counts, setCounts, onNext, onBack, step, stepLabels, showAlert, hideAlert }) => {
  const handleNextStep2 = () => {
    const hasAtLeastOne = Object.values(counts).some(count => count > 0);
    if (!hasAtLeastOne) {
      showAlert('Scope Required', 'Please select at least one scope of work.', () => {
        hideAlert();
      });
      return;
    }
    onNext();
  };

  return (
    <StepTwoContainer>
      <ProgressBar currentStep={step} stepLabels={stepLabels} />
      <StepTwoContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: "8px" }}>
          <ResponsiveH4 className='universal-font-bold' style={{ margin: 0, marginTop: "2px" }}>Scope of work</ResponsiveH4>
          <Tooltip 
            content="Select the items you want to include in your interior project. Adjust the quantity based on how many units or rooms you need for each category." 
            position="auto"
          />
        </div>
        {scopeOfWorkItems.map((item, idx) => (
          <ScopeRow key={item.key}>
            <span className="universal-font-medium universal-fs-h4">{item.label}</span>
            <CountControls>
              <CountButton type="button" onClick={() => setCounts(counts => ({ ...counts, [item.key]: Math.max(0, counts[item.key] - 1) }))}>-</CountButton>
              <CountDisplay>{counts[item.key]}</CountDisplay>
              <CountButton type="button" onClick={() => setCounts(counts => ({ ...counts, [item.key]: counts[item.key] + 1 }))}>+</CountButton>
            </CountControls>
          </ScopeRow>
        ))}
      </StepTwoContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '1rem' }}>
        <Button onClick={onBack} className="universal-font-medium" style={{ minWidth: 100 }} secondary>Back</Button>
        <Button onClick={handleNextStep2} className="universal-font-medium" style={{ minWidth: 100 }} primary>Next</Button>
      </div>
    </StepTwoContainer>
  );
}

// Step 3 Component
const StepThree = ({
  countries,
  form,
  handleInputChange,
  cities,
  consentChecked,
  setConsentChecked,
  handleSubmitNow,
  WhatsAppIcon,
  Select,
  Input,
  CountryPhoneRow,
  CountrySelect,
  ConsentLabel,
  Button,
  onBack, step, stepLabels,
  isLoading,
  channelMode,
  setChannelMode,
  otpChannel,
  setOtpChannel,
  handleSendOTP
}) => (
  <StepThreeContainer>
    <ProgressBar currentStep={step} stepLabels={stepLabels} />

    <StepTwoContent>
      <ResponsiveH4 className='universal-font-bold' style={{ marginBottom: "8px" }}>
        {channelMode ? "Verification" : "Contact Information"}
      </ResponsiveH4>
      
      {channelMode ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          <span className="universal-fs-h4 universal-font-semibold" style={{ color: '#111' }}>How would you like to receive your OTP?</span>
          <span className="universal-fs-h3 universal-font" style={{ color: '#8692A6' }}>Sending to +91 {form.phone}</span>
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
        </div>
      ) : (
        <Form>
          <div>
            <Input style={{ border: "1px solid #999999", "borderRadius": "6px" }}
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <CountryPhoneRow>
              <label className="universal-font-medium universal-fs-h3" style={{
                minWidth: 30,
                padding: '10px 8px',
                border: 'none',
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                color: '#222',
                height: '100%',
                margin: "auto"
              }}>+91</label>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your Mobile Number*"
                value={form.phone}
                onChange={handleInputChange}
                required
                style={{ flex: 1, border: 'none', borderRadius: 0 }}
              />
            </CountryPhoneRow>
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Select
              name="city"
              value={form.city}
              onChange={handleInputChange}
              required
              className="universal-fs-h3 universal-font"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city ? city : 'Choose city'}</option>
              ))}
            </Select>
          </div>
          <ConsentLabelRow>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ToggleSwitch checked={consentChecked} onChange={e => setConsentChecked(e.target.checked)} />
              <span style={{ color: "#8692A6", margin: "auto 0px", marginLeft: "8px" }} className='universal-fs-h3'>Send Updates on whatsapp</span>
            </div>
            <WhatsAppIcon>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"> <g clipPath="url(#clip0_218_2658)"> <path d="M0.682949 15.8085C0.682199 18.4971 1.3902 21.1224 2.73645 23.4363L0.554199 31.3423L8.7082 29.2208C10.9635 30.4391 13.4904 31.0774 16.0582 31.0776H16.0649C24.5418 31.0776 31.4422 24.2332 31.4458 15.8205C31.4474 11.744 29.8489 7.9107 26.9447 5.02673C24.041 2.14301 20.1791 0.554046 16.0643 0.552186C7.58645 0.552186 0.686574 7.39622 0.683074 15.8085" fill="url(#paint0_linear_218_2658)" /> <path d="M0.13375 15.8035C0.132875 18.5889 0.86625 21.308 2.2605 23.7048L0 31.8942L8.44637 29.6967C10.7736 30.9558 13.3939 31.6196 16.0601 31.6206H16.067C24.848 31.6206 31.9963 24.53 32 15.8162C32.0015 11.5932 30.3455 7.62208 27.3375 4.63479C24.3291 1.64788 20.3291 0.00173643 16.067 0C7.2845 0 0.13725 7.08961 0.13375 15.8035ZM5.16388 23.292L4.8485 22.7953C3.52275 20.7036 2.823 18.2865 2.824 15.8045C2.82675 8.56174 8.76725 2.66915 16.072 2.66915C19.6095 2.67064 22.934 4.03895 25.4345 6.52155C27.9349 9.0044 29.3108 12.3049 29.3099 15.8152C29.3066 23.058 23.366 28.9513 16.067 28.9513H16.0618C13.6851 28.9501 11.3542 28.3168 9.3215 27.12L8.83775 26.8353L3.8255 28.1393L5.16388 23.292Z" fill="url(#paint1_linear_218_2658)" /> <path d="M12.0847 9.19665C11.7864 8.53891 11.4726 8.52564 11.1889 8.51411C10.9567 8.50419 10.6912 8.50493 10.4259 8.50493C10.1604 8.50493 9.72907 8.60403 9.36445 8.99907C8.99945 9.39448 7.97095 10.35 7.97095 12.2935C7.97095 14.2369 9.39757 16.1152 9.59645 16.379C9.79557 16.6424 12.3506 20.7582 16.3971 22.3416C19.7601 23.6574 20.4444 23.3957 21.1743 23.3297C21.9043 23.264 23.5298 22.3744 23.8614 21.452C24.1933 20.5297 24.1933 19.7392 24.0938 19.574C23.9943 19.4094 23.7288 19.3105 23.3307 19.1131C22.9326 18.9156 20.9752 17.9598 20.6103 17.828C20.2453 17.6962 19.9799 17.6305 19.7144 18.026C19.4489 18.421 18.6866 19.3105 18.4542 19.574C18.2221 19.838 17.9897 19.8709 17.5917 19.6733C17.1933 19.4751 15.9112 19.0585 14.3901 17.7129C13.2066 16.6658 12.4076 15.3728 12.1753 14.9772C11.9431 14.5823 12.1504 14.3682 12.3501 14.1714C12.5289 13.9944 12.7483 13.7101 12.9476 13.4796C13.1461 13.2489 13.2123 13.0843 13.3451 12.8208C13.4779 12.5571 13.4114 12.3264 13.3121 12.1289C13.2123 11.9313 12.4387 9.97767 12.0847 9.19665Z" fill="white" /> </g> <defs> <linearGradient id="paint0_linear_218_2658" x1="1545.14" y1="3079.56" x2="1545.14" y2="0.552186" gradientUnits="userSpaceOnUse"> <stop stopColor="#1FAF38" /> <stop offset="1" stopColor="#60D669" /> </linearGradient> <linearGradient id="paint1_linear_218_2658" x1="1600" y1="3189.42" x2="1600" y2="0" gradientUnits="userSpaceOnUse"> <stop stopColor="#F9F9F9" /> <stop offset="1" stopColor="white" /> </linearGradient> <clipPath id="clip0_218_2658"> <rect width="32" height="32" fill="white" /> </clipPath> </defs> </svg>
            </WhatsAppIcon>
          </ConsentLabelRow>
        </Form>
      )}
    </StepTwoContent>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
      <Button className="universal-font-medium" style={{ minWidth: 100 }} secondary onClick={channelMode ? () => setChannelMode(false) : onBack} disabled={isLoading}>Back</Button>
      <Button className="universal-font-medium" style={{ minWidth: 100, marginLeft: 16 }} primary onClick={channelMode ? handleSendOTP : handleSubmitNow} disabled={isLoading}>
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
          channelMode ? 'Send OTP' : 'Submit Now'
        )}
      </Button>
    </div>
  </StepThreeContainer>
);

const StepFour = ({
  otp,
  setOtp,
  handleOtpSubmit,
  Button,
  Input,
  onBack,
  step,
  stepLabels,
  isOtpLoading
}) => (
  <StepThreeContainer>
    <ProgressBar currentStep={step} stepLabels={stepLabels} />
    
    
    <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
      <h4 className='universal-font-bold universal-fs-h5' style={{ marginBottom: "8px" }}>OTP Verification</h4>
      <span style={{ textAlign: "left", color: "#8692A6" }} className="universal-fs-h3 universal-font">
        We've sent a verification code to your registered mobile number and email.
      </span>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button className="universal-font-medium" style={{ minWidth: 100 }} secondary onClick={onBack} disabled={isOtpLoading}>Back</Button>
        <Button className="universal-font-medium" style={{ minWidth: 100, marginLeft: 16 }} primary type="submit" disabled={isOtpLoading}>
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
            'Verify OTP'
          )}
        </Button>
      </div>
    </form>
  </StepThreeContainer>
);

const CostEstimator = forwardRef((props, ref) => {
  const stepLabels = ['Property', 'Scope', 'Contact', 'OTP'];

  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedPurposeType, setSelectedPurposeType] = useState(null);
  const [consentChecked, setConsentChecked] = useState(true);
  const [step, setStep] = useState(1);
  const [counts, setCounts] = useState({
    modularKitchen: 0,
    wardrobe: 0,
    entertainmentUnit: 0,
    looseFurniture: 0,
    falseCeiling: 0,
    painting: 0,
  });
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const svgTimeoutRef = useRef();

  const [channelMode, setChannelMode] = useState(false);
  const [otpChannel, setOtpChannel] = useState('whatsapp');

  // OTP state management
  const [otp, setOtp] = useState('');
  const [estimationPayload, setEstimationPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  // Alert state
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const [form, setForm] = useState({
    name: '',
    country: countries[0].code,
    phone: '',
    email: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    if (!window.recaptchaVerifierEstimator) {
      window.recaptchaVerifierEstimator = new RecaptchaVerifier(auth, 'recaptcha-container-estimator', {
        size: 'invisible'
      });
    }
  }, []);

  // Alert helper functions
  const showAlert = (title, message, onConfirm) => {
    setAlertConfig({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const hideAlert = () => {
    setAlertConfig({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null
    });
  };

  // OTP functions
  const handleSendOTP = async () => {
    // Prevent multiple API calls
    if (isLoading) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formattedPhone = `+91${form.phone}`;
      const appVerifier = window.recaptchaVerifierEstimator;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setOtp(''); // Reset OTP input value
      setChannelMode(false);
      setStep(4);
      showSuccessToast('OTP sent successfully!');
    } catch (error) {
      console.error("Firebase send OTP error:", error);
      showFailureToast('Failed to send OTP. Please try again.', 4000);
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

    try {
      const userCredential = await confirmationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();
      
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      if (!verifyRes.ok) {
        throw new Error("Backend verification failed");
      }
      
      // OTP verified successfully, now submit estimation
      if (estimationPayload) {
        await submitEstimation(estimationPayload);
        setOtp('');
        setEstimationPayload(null);
        setConfirmationResult(null);
        
        // Show success animation
        setIsSuccessModalOpen(true);
        clearTimeout(svgTimeoutRef.current);
        svgTimeoutRef.current = setTimeout(() => {
          setIsSuccessModalOpen(false);
          setStep(1);
          setForm({ name: '', phone: '', email: '', city: '', purpose: '' });
          setCounts({
            modularKitchen: 0,
            wardrobe: 0,
            entertainmentUnit: 0,
            looseFurniture: 0,
            falseCeiling: 0,
            painting: 0,
          });
          setSelectedPropertyType(null);
          setSelectedPurposeType(null);
          setChannelMode(false);
          setOtpChannel('whatsapp');
        }, 2000);
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      showFailureToast('OTP verification failed. Please try again.', 4000);
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSubmitNow = async () => {
    // Prevent multiple API calls
    if (isLoading) {
      return;
    }
    
    // Validate directly from state
    if (form.name.length < 3 || !/^[A-Za-z ]+$/.test(form.name)) {
      showFailureToast('Please enter a valid name (at least 3 letters, no special characters).', 4000);
      return;
    }
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) {
      showFailureToast('Please enter a valid 10-digit mobile number.', 4000);
      return;
    }
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      showFailureToast('Please enter a valid email address.', 4000);
      return;
    }
    if (!form.city) {
      showFailureToast('Please select a city.', 4000);
      return;
    }
    
    // Prepare payload as per sample
    const payload = {
      propertyType: selectedPropertyType,
      purpose: selectedPurposeType,
      scope: { ...counts },
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      whatsappQuote: consentChecked,
    };

    // Store the payload and show channel picker (step 3.5)
    setEstimationPayload(payload);
    setChannelMode(true);
  };
  return (
    <TestimonialsContainer ref={ref}>
      <ContentWrapper>
        <div style={{ padding: '3rem', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) -3.99%, #E8EEFD 30.25%, #E8EEFD 65.14%, rgba(255, 255, 255, 0) 100%)' }}>
          <SectionHeader>
            <SectionTitle className='universal-fs-h8 universal-font-bold'>
              Interior Design<span style={{ color: "#5485EE" }}> Cost Estimator</span>
            </SectionTitle>
            <SectionDescription className='universal-fs-h3 universal-font-medium'>
              With us, you experience the power of ideas, design and craftsmanship come alive.
            </SectionDescription>
          </SectionHeader>

          <div id="recaptcha-container-estimator"></div>

          {step === 1 && (
            <StepOne
              propertyTypes={propertyTypes}
              purposeTypes={purposeTypes}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              selectedPurposeType={selectedPurposeType}
              setSelectedPurposeType={setSelectedPurposeType}
              onNext={() => {
                if (!selectedPropertyType) {
                  showAlert(`House Type Required`, 'Select a house type before proceeding.', () => {
                    hideAlert();
                  });
                  return;
                }
                if (!selectedPurposeType) {
                  showAlert(`Purpose Required`, 'Select a purpose before proceeding.', () => {
                    hideAlert();
                  });
                  return;
                }
                setStep(2);
              }}
              step={step}
              stepLabels={stepLabels}
            />
          )}
          {step === 2 && (
            <StepTwo
              scopeOfWorkItems={scopeOfWorkItems}
              counts={counts}
              setCounts={setCounts}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              step={step}
              stepLabels={stepLabels}
              showAlert={showAlert}
              hideAlert={hideAlert}
            />
          )}
          {step === 3 && (
            <StepThree
              countries={countries}
              form={form}
              handleInputChange={handleInputChange}
              cities={cities}
              consentChecked={consentChecked}
              setConsentChecked={setConsentChecked}
              handleSubmitNow={handleSubmitNow}
              WhatsAppIcon={WhatsAppIcon}
              Select={Select}
              Input={Input}
              CountryPhoneRow={CountryPhoneRow}
              CountrySelect={CountrySelect}
              ConsentLabel={ConsentLabel}
              Button={Button}
              onBack={() => setStep(2)}
              step={step}
              stepLabels={stepLabels}
              isLoading={isLoading}
              channelMode={channelMode}
              setChannelMode={setChannelMode}
              otpChannel={otpChannel}
              setOtpChannel={setOtpChannel}
              handleSendOTP={handleSendOTP}
            />
          )}
          {step === 4 && (
            <StepFour
              otp={otp}
              setOtp={setOtp}
              handleOtpSubmit={handleOtpSubmit}
              Button={Button}
              Input={Input}
              onBack={() => setStep(3)}
              step={step}
              stepLabels={stepLabels}
              isOtpLoading={isOtpLoading}
            />
          )}
        </div>
      </ContentWrapper>
      
      {/* Custom Confirmation Alert */}
      <ConfirmationAlert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={hideAlert}
        confirmText="OK"
        showCancel={false}
      />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
      />
    </TestimonialsContainer >
  );
});

export default CostEstimator;


