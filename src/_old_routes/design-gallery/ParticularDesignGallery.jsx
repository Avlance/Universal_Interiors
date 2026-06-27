"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from '../../components/modal/js/Modal';
import { getParticularDesigns } from './DesignGalleryHttpRequest';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  min-width: 800px;
  max-width: 95vw;
  max-height: 90vh;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  display: flex;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-width: 320px;
    max-width: 98vw;
    max-height: 95vh;
    flex-direction: column;
    border-radius: 12px;
    margin: 10px;
  }
  
  @media (max-width: 480px) {
    min-width: 280px;
    max-width: 100vw;
    max-height: 98vh;
    border-radius: 8px;
    margin: 5px;
  }
`;

const ImageSection = styled.div`
  flex: 0 0 700px;
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
    flex: 0 0 250px;
    min-height: 250px;
  }
  
  @media (max-width: 480px) {
    flex: 0 0 200px;
    min-height: 200px;
  }
`;

const ImageContent = styled.div`
  text-align: center;
  color: white;
  padding: 20px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const RightIcon = styled.div`
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    right: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    backdrop-filter: blur(4px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  
  @media (max-width: 480px) {
    right: 8px;
    width: 36px;
    height: 36px;
  }
`;

const LeftIcon = styled.div`
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    left: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    backdrop-filter: blur(4px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  
  @media (max-width: 480px) {
    left: 8px;
    width: 36px;
    height: 36px;
  }
`;

const BottomLeftContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  text-align: left;
  z-index: 2;
  
  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
  }
  
  @media (max-width: 480px) {
    bottom: 16px;
    left: 16px;
  }
`;

const BottomImageTitle = styled.h3`
  color: white;
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ContentSection = styled.div`
  flex: 0 0 700px;
  padding: 32px 28px 24px 28px;
  overflow-y: auto;
  border-radius: 16px;
  background-color: #FFFFFF;
  
  @media (max-width: 768px) {
    flex: none;
    padding: 20px 16px 16px 16px;
    border-radius: 0 0 12px 12px;
    max-height: 60vh;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px 12px 12px;
    border-radius: 0 0 8px 8px;
    max-height: 55vh;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 18px;
  color: #000;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    margin-bottom: 14px;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
    font-size: 18px;
  }
`;

const DesignDescription = styled.p`
  color: #666666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 14px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 20px auto;
    gap: 16px;
    left: 0;
    right: 0;
    background-color: white;
    padding: 0;
    margin-bottom: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px 12px;
    margin: 16px auto;
    gap: 12px;
    grid-template-columns: repeat(4, 1fr);
    max-width: 95%;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 12px 8px;
    gap: 8px;
    margin: 12px auto;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 10px;
    gap: 6px;
    margin: 8px auto;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  padding-left: 0;
  position: relative;
  color: #fff;
  flex-direction: row;
  text-align: center;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1.25px;
    background-color: #e5e5e5;
  }
  
  @media (max-width: 1024px) {
    padding: 8px 12px;
    flex-direction: row;
    gap: 6px;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    flex-direction: row;
    gap: 4px;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
  
  @media (max-width: 640px) {
    margin: 4px 0;
    padding: 6px 8px;
    gap: 3px;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    margin: 3px 0;
    padding: 4px 6px;
    gap: 5px;
    min-height: 60px;
    justify-content: center;
    flex-direction: column;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const SvgIcon = styled.svg`
  display: flex; 
  align-items: center;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1024px) {
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 640px) {
    margin-bottom: 3px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 2px;
  }
`;

const StatValueHolder = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    margin-left: 0;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    align-items: center;
    justify-content: center;
    gap: 1px;
  }
  
  @media (max-width: 640px) {
    gap: 3px;
  }
  
  @media (max-width: 480px) {
    gap: 3px;
    margin-left: 0;
    align-items: center;
    justify-content: center;
  }
`;

const StatValue = styled.div`
  color: var(--universal-black);
  text-align: center;
  line-height: 1.2;
  
  @media (max-width: 1024px) {
    text-align: center;
    line-height: 1.1;
  }
  
  @media (max-width: 768px) {
    text-align: center;
    line-height: 1.1;
  }
  
  @media (max-width: 640px) {
    line-height: 1;
  }
  
  @media (max-width: 480px) {
    line-height: 1;
  }
`;

const StatLabel = styled.div`
  color: var(--universal-black);
  white-space: nowrap;
  text-align: center;
  line-height: 1.2;
  
  @media (max-width: 1024px) {
    white-space: normal;
    text-align: center;
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  @media (max-width: 768px) {
    white-space: normal;
    text-align: center;
    line-height: 1.1;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  @media (max-width: 640px) {
    line-height: 1;
    font-size: 0.9em;
  }
  
  @media (max-width: 480px) {
    line-height: 1;
    font-size: 0.85em;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 24px;
  margin-top: 24px;
  padding-top: 24px;
  color: #000;
  line-height: 1.3;
  font-size: 1.5rem;
  font-weight: 600;
  color: #D50F25;
  border-top: 0.7px solid #99999966;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    margin-top: 20px;
    padding-top: 20px;
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
    margin-top: 16px;
    padding-top: 16px;
    font-size: 1.2rem;
  }
`;





const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    max-height: 280px;
    padding: 6px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    max-height: 240px;
    padding: 4px;
  }
`;

const GalleryCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
  }
  
  @media (max-width: 480px) {
    border-radius: 6px;
    
    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const GalleryImageSection = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${GalleryCard}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 160px;
    
    ${GalleryCard}:hover & img {
      transform: scale(1.03);
    }
  }
  
  @media (max-width: 480px) {
    height: 100px;
    
    ${GalleryCard}:hover & img {
      transform: none;
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    height: 160px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    height: 140px;
    border-radius: 4px;
  }
`;

const ImageErrorContainer = styled.div`
  width: 100%;
  height: 200px;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  text-align: center;
  padding: 20px;
  
  @media (max-width: 768px) {
    height: 160px;
    padding: 16px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    height: 140px;
    padding: 12px;
    border-radius: 4px;
  }
`;

const ErrorIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #6c757d;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    margin-bottom: 8px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const ErrorText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

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

const statsConfig = [
  {
    value: '10 Years Assurance',
    svgIcon: (
      <SvgIcon width="32" height="39" viewBox="0 0 32 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_430_4924)"> <g clipPath="url(#clip1_430_4924)"> <g clipPath="url(#clip2_430_4924)"> <path fillRule="evenodd" clipRule="evenodd" d="M19.773 0.75C20.013 0.75 20.2395 0.786 20.4653 0.861C21.57 1.22475 22.0853 2.319 22.5833 3.3765C22.9395 4.1325 23.214 4.6815 23.5358 4.9185C23.859 5.15775 24.4583 5.25375 25.269 5.364C26.3648 5.514 27.6038 5.68275 28.2765 6.6225C28.9335 7.53675 28.7138 8.76 28.5203 9.8385C28.3927 10.5472 28.2638 11.2733 28.407 11.7195C28.5142 12.0548 28.8608 12.4297 29.3468 12.9045L29.535 13.0883C30.339 13.8623 31.2502 14.7382 31.2502 15.9127C31.2502 17.0055 30.4575 17.8425 29.7 18.579L29.5387 18.735C28.9462 19.3065 28.5263 19.7325 28.4062 20.109C28.2638 20.5515 28.3935 21.2775 28.5188 21.978C28.7228 23.1203 28.9312 24.2895 28.2772 25.203C27.6705 26.0483 26.5882 26.2695 25.6208 26.4105C25.5581 26.4192 25.4985 26.4425 25.4466 26.4786C25.3947 26.5147 25.3521 26.5626 25.3223 26.6183C25.2926 26.673 25.2768 26.7341 25.2762 26.7963C25.2755 26.8585 25.29 26.9199 25.3185 26.9753L28.6958 33.4965C28.8405 33.777 28.8038 34.1152 28.602 34.359C28.501 34.4797 28.3682 34.5697 28.2187 34.6188C28.0692 34.668 27.9089 34.6744 27.756 34.6372L23.7825 33.6735C23.694 33.651 23.6005 33.659 23.5171 33.6962C23.4337 33.7333 23.3653 33.7975 23.3228 33.8783L21.2977 37.806C21.159 38.076 20.8687 38.2492 20.5583 38.25C20.2432 38.25 19.959 38.0798 19.8172 37.8075L17.9587 34.2173C17.9096 34.1234 17.8801 34.0205 17.8723 33.9149C17.8644 33.8092 17.8783 33.7031 17.913 33.603C17.9827 33.3997 18.1305 33.2347 18.3278 33.138C18.4447 33.0817 18.5693 33.0532 18.6982 33.0532C19.014 33.0532 19.2983 33.2227 19.4393 33.4958L20.193 34.9515C20.2276 35.0174 20.2797 35.0726 20.3437 35.1108C20.4076 35.149 20.4808 35.1689 20.5553 35.1683C20.6297 35.1686 20.7027 35.1485 20.7665 35.1102C20.8302 35.0718 20.8822 35.0167 20.9167 34.9508L22.2825 32.3018C22.3704 32.1371 22.5107 32.0065 22.6811 31.9304C22.8516 31.8544 23.0425 31.8372 23.2238 31.8817L25.5487 32.4442C25.6236 32.4629 25.7022 32.4602 25.7755 32.4363C25.8489 32.4124 25.914 32.3684 25.9635 32.3092C26.0117 32.2513 26.0417 32.1803 26.0497 32.1053C26.0577 32.0303 26.0434 31.9546 26.0085 31.8877L23.7615 27.5482C23.7275 27.484 23.6768 27.43 23.6148 27.392C23.5528 27.354 23.4817 27.3334 23.409 27.3323H23.4C23.3286 27.3318 23.2583 27.3502 23.1961 27.3854C23.134 27.4207 23.0822 27.4717 23.046 27.5332C22.8855 27.8122 22.7295 28.137 22.5833 28.446C22.0845 29.5043 21.5693 30.5992 20.4645 30.9645C20.2402 31.038 20.0145 31.0747 19.7752 31.0747C18.9375 31.0747 18.0885 30.6105 17.3407 30.2018C16.917 29.9708 16.446 29.7143 16.0553 29.5913C15.9637 29.561 15.8644 29.5642 15.7751 29.6005C15.6857 29.6368 15.6122 29.7037 15.5677 29.7893L11.433 37.8068C11.3622 37.9417 11.2556 38.0544 11.1249 38.1326C10.9941 38.2108 10.8443 38.2514 10.692 38.25C10.3762 38.25 10.0927 38.0798 9.951 37.8053L7.926 33.8783C7.88352 33.7976 7.81518 33.7336 7.73194 33.6964C7.64869 33.6593 7.55539 33.6512 7.467 33.6735L3.495 34.6372C3.3419 34.6741 3.18157 34.6676 3.03192 34.6186C2.88227 34.5696 2.74918 34.48 2.6475 34.3597C2.54889 34.2411 2.48748 34.0959 2.47094 33.9425C2.4544 33.7891 2.48346 33.6342 2.5545 33.4972L5.9325 26.9745C5.96107 26.9192 5.97573 26.8578 5.97521 26.7956C5.97468 26.7334 5.95899 26.6723 5.9295 26.6175C5.89934 26.5618 5.85644 26.514 5.80431 26.478C5.75217 26.4421 5.69228 26.4189 5.6295 26.4105C4.6635 26.2695 3.5805 26.0483 2.973 25.2015C2.319 24.2888 2.52825 23.118 2.72925 21.987C2.88075 21.15 2.97675 20.5252 2.844 20.1075C2.724 19.7325 2.304 19.3065 1.722 18.7463C0.90975 17.961 0 17.0835 0 15.9127C0 14.8192 0.79275 13.9815 1.551 13.2457L1.71225 13.089C2.30175 12.5212 2.72475 12.0945 2.84475 11.7165C2.9775 11.3003 2.88075 10.6747 2.72925 9.83775C2.52825 8.70525 2.319 7.53525 2.973 6.6225C3.64575 5.68275 4.8855 5.514 5.97825 5.36475C6.792 5.25375 7.39125 5.15775 7.71375 4.9185C8.03625 4.6815 8.3115 4.13175 8.6655 3.381C9.16425 2.31975 9.6795 1.22475 10.7857 0.861C11.0107 0.786 11.2358 0.75 11.4757 0.75C12.315 0.75 13.1617 1.21275 13.9088 1.6215C14.6512 2.0265 15.2048 2.31075 15.6248 2.31075C16.0448 2.31075 16.599 2.0265 17.3348 1.62525C18.129 1.1925 18.9398 0.75 19.773 0.75ZM7.8495 27.3323H7.8435C7.77023 27.3331 7.69852 27.3536 7.63596 27.3918C7.57339 27.4299 7.52227 27.4842 7.488 27.549L5.241 31.8877C5.20621 31.9547 5.19199 32.0304 5.20013 32.1054C5.20827 32.1804 5.23841 32.2513 5.28675 32.3092C5.33619 32.3683 5.40121 32.4122 5.4744 32.4361C5.5476 32.46 5.62602 32.4628 5.70075 32.4442L8.02575 31.8817C8.20711 31.8371 8.3982 31.8541 8.5688 31.9302C8.7394 32.0062 8.87978 32.137 8.96775 32.3018L10.3305 34.9478C10.3995 35.0805 10.5405 35.1653 10.6927 35.1653C10.7672 35.1656 10.8402 35.1455 10.904 35.1072C10.9677 35.0688 11.0197 35.0137 11.0543 34.9478L12.8542 31.4573C12.8899 31.3882 12.9038 31.3099 12.894 31.2327C12.8843 31.1556 12.8513 31.0832 12.7995 31.0252C12.7463 30.9661 12.6772 30.9236 12.6004 30.9028C12.5236 30.8821 12.4425 30.884 12.3668 30.9082C12.0068 31.023 11.7323 31.0747 11.4757 31.0747C11.2358 31.0747 11.0107 31.038 10.7857 30.9645C9.68025 30.5992 9.165 29.5043 8.66625 28.446C8.52394 28.1358 8.36957 27.8314 8.2035 27.5332C8.16737 27.4716 8.11562 27.4205 8.05347 27.3852C7.99132 27.35 7.92097 27.3317 7.8495 27.3323ZM19.7512 2.35575C19.431 2.35575 18.9473 2.58675 18.168 3.015C17.382 3.4425 16.5112 3.918 15.6248 3.918C14.736 3.918 13.8652 3.4425 13.0972 3.02325C12.3067 2.59125 11.817 2.3565 11.4952 2.3565C11.435 2.35651 11.3751 2.36536 11.3175 2.38275C10.9545 2.50275 10.659 3.01425 10.1737 4.0455C9.789 4.86 9.39375 5.69775 8.71725 6.198C8.02575 6.70875 7.062 6.84 6.21075 6.95625C5.09325 7.1085 4.557 7.22925 4.33425 7.53975C4.10625 7.85475 4.16175 8.4435 4.36275 9.56325C4.52175 10.4558 4.68675 11.3783 4.42575 12.1943C4.20075 12.8985 3.65775 13.4745 3.09375 14.0228L2.8815 14.2275C2.163 14.9212 1.65675 15.4462 1.65675 15.9127C1.65675 16.341 2.0835 16.8188 2.70675 17.4277L2.8815 17.598C3.519 18.2115 4.17375 18.843 4.4265 19.6305C4.68675 20.4465 4.52175 21.3675 4.36275 22.2593C4.16175 23.3805 4.10625 23.9692 4.33425 24.2843C4.5555 24.5933 5.08875 24.7132 6.20175 24.867C7.0605 24.984 8.02425 25.1153 8.718 25.6283C9.3945 26.127 9.78975 26.964 10.1715 27.7747C10.659 28.8098 10.9537 29.322 11.319 29.4427L11.3393 29.4487C11.3931 29.4631 11.4486 29.4702 11.5042 29.4697C11.82 29.4697 12.2618 29.2597 13.017 28.845L13.0965 28.8008C13.8675 28.3808 14.739 27.906 15.624 27.906C16.5113 27.906 17.3827 28.3808 18.1515 28.8008C19.0432 29.2875 19.4782 29.4683 19.7565 29.4683C19.8112 29.4683 19.8638 29.4607 19.9118 29.4487L19.9342 29.442C20.2605 29.334 20.5282 28.9447 21.0765 27.777C21.4605 26.964 21.8557 26.127 22.5322 25.6275C23.2222 25.1167 24.186 24.9848 25.035 24.8685C26.1578 24.7148 26.6933 24.5947 26.9167 24.2858C27.144 23.9685 27.0877 23.3805 26.8875 22.2623C26.7277 21.3682 26.5635 20.4473 26.823 19.6312C27.0765 18.8438 27.7312 18.2115 28.365 17.6003C29.085 16.9065 29.5935 16.38 29.5935 15.9127C29.5935 15.4852 29.169 15.0105 28.5487 14.4037L28.3755 14.235C27.7342 13.6163 27.078 12.984 26.8245 12.195C26.5635 11.3798 26.7285 10.4572 26.8875 9.5655C27.0877 8.445 27.144 7.85625 26.9175 7.5405C26.6932 7.22925 26.157 7.1085 25.0387 6.95625C24.1882 6.84 23.2237 6.70875 22.5315 6.19725C21.8565 5.6985 21.4613 4.8615 21.0788 4.05225C20.5912 3.015 20.2972 2.50275 19.9328 2.38275L19.9132 2.376C19.8604 2.36223 19.8059 2.35542 19.7512 2.35575ZM15.6248 6.73425C20.841 6.73425 25.0845 10.8517 25.0845 15.9127C25.0845 20.973 20.841 25.0905 15.6248 25.0905C10.4085 25.0905 6.165 20.973 6.165 15.9127C6.165 10.851 10.4085 6.73425 15.6248 6.73425ZM15.6248 8.3415C11.322 8.3415 7.82175 11.7375 7.82175 15.9127C7.82175 20.0872 11.322 23.4832 15.6248 23.4832C19.9275 23.4832 23.4277 20.0872 23.4277 15.9127C23.4277 11.7375 19.9275 8.3415 15.6248 8.3415ZM19.3237 12.7155C19.5457 12.7155 19.7535 12.7995 19.9095 12.951C19.986 13.0245 20.0468 13.1128 20.0884 13.2104C20.1299 13.308 20.1513 13.413 20.1513 13.5191C20.1513 13.6252 20.1299 13.7302 20.0884 13.8279C20.0468 13.9255 19.986 14.0137 19.9095 14.0873L14.9775 18.8722C14.821 19.0246 14.6109 19.1094 14.3925 19.1085C14.1705 19.1085 13.9628 19.0252 13.806 18.873L11.34 16.4805C11.2633 16.407 11.2023 16.3187 11.1606 16.221C11.1189 16.1233 11.0974 16.0182 11.0974 15.912C11.0974 15.8058 11.1189 15.7007 11.1606 15.603C11.2023 15.5053 11.2633 15.417 11.34 15.3435C11.4967 15.192 11.7045 15.1088 11.9257 15.1088C12.147 15.1088 12.3555 15.192 12.5115 15.3435L14.106 16.8908C14.183 16.9642 14.2853 17.0052 14.3917 17.0052C14.4982 17.0052 14.6005 16.9642 14.6775 16.8908L18.7388 12.951C18.8948 12.7995 19.1032 12.7155 19.3237 12.7155Z" fill="#D50F25" /> </g> </g> </g> <defs> <clipPath id="clip0_430_4924"> <rect width="31.5" height="37.5" fill="white" transform="translate(0 0.75)" /> </clipPath> <clipPath id="clip1_430_4924"> <rect width="31.5" height="37.5" fill="white" transform="translate(0 0.75)" /> </clipPath> <clipPath id="clip2_430_4924"> <rect width="31.5" height="37.5" fill="white" transform="translate(0 0.75)" /> </clipPath> </defs> </SvgIcon>
    ),
  },
  {
    value: '40 Days Delivery',
    svgIcon: (
      <SvgIcon width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_430_4930)"> <g clipPath="url(#clip1_430_4930)"> <g clipPath="url(#clip2_430_4930)"> <path d="M39.4242 21.3047C39.0689 17.7661 37.5038 14.4584 34.9932 11.9395C32.9319 9.86914 30.3206 8.43271 27.4684 7.80024V5.86224C28.082 5.70831 28.6183 5.33552 28.9764 4.81396C29.3344 4.29241 29.4896 3.65802 29.4128 3.03007C29.3359 2.40211 29.0324 1.82386 28.5591 1.40402C28.0859 0.984187 27.4756 0.751689 26.8429 0.750244L21.3589 0.750244C20.7264 0.75187 20.1162 0.984496 19.643 1.40439C19.1699 1.82429 18.8665 2.40254 18.7898 3.03044C18.713 3.65834 18.8683 4.29264 19.2263 4.81412C19.5844 5.33559 20.1206 5.70833 20.7342 5.86224V7.80624C17.891 8.4409 15.2884 9.87467 13.2327 11.9387C12.7708 12.4012 12.3387 12.8924 11.9389 13.4095C11.92 13.4078 11.901 13.4068 11.8819 13.4065H6.45342C6.25103 13.4065 6.05692 13.4869 5.91381 13.63C5.7707 13.7731 5.6903 13.9672 5.6903 14.1696C5.6903 14.372 5.7707 14.5661 5.91381 14.7092C6.05692 14.8523 6.25103 14.9327 6.45342 14.9327H10.9024C10.3498 15.8599 9.89676 16.8428 9.55092 17.8652H1.26117C1.05878 17.8652 0.864675 17.9456 0.721561 18.0888C0.578447 18.2319 0.498047 18.426 0.498047 18.6284C0.498047 18.8308 0.578447 19.0249 0.721561 19.168C0.864675 19.3111 1.05878 19.3915 1.26117 19.3915H9.12117C8.90197 20.3547 8.77515 21.3367 8.74242 22.324H5.37492C5.17253 22.324 4.97843 22.4044 4.83531 22.5475C4.6922 22.6906 4.6118 22.8847 4.6118 23.0871C4.6118 23.2895 4.6922 23.4836 4.83531 23.6267C4.97843 23.7698 5.17253 23.8502 5.37492 23.8502H8.76717C8.83167 24.838 8.98992 25.8205 9.24267 26.7827H4.30767C4.10528 26.7827 3.91118 26.8631 3.76806 27.0063C3.62495 27.1494 3.54455 27.3435 3.54455 27.5459C3.54455 27.7483 3.62495 27.9424 3.76806 28.0855C3.91118 28.2286 4.10528 28.309 4.30767 28.309H9.72867C10.4978 30.3467 11.6923 32.197 13.2327 33.7367C15.7466 36.2522 19.0534 37.8204 22.5919 38.1752C26.0724 38.5195 29.5664 37.6691 32.4994 35.764C32.8519 35.5337 32.9509 35.0605 32.7214 34.708C32.6669 34.6241 32.5965 34.5517 32.514 34.4951C32.4316 34.4384 32.3387 34.3986 32.2409 34.3778C32.143 34.3571 32.042 34.3558 31.9437 34.3741C31.8453 34.3924 31.7515 34.4299 31.6677 34.4845C26.2167 38.0395 18.9169 37.2715 14.3097 32.6567C8.90442 27.2417 8.90442 18.4322 14.3097 13.018C19.7149 7.60299 28.5102 7.60299 33.9162 13.018C38.5167 17.626 39.2884 24.9325 35.7507 30.3895C35.6406 30.5591 35.6023 30.7655 35.6442 30.9633C35.6861 31.1612 35.8048 31.3343 35.9742 31.4447C36.3274 31.6742 36.7992 31.5737 37.0279 31.2205C38.9239 28.2809 39.7685 24.7858 39.4242 21.3047ZM20.2917 3.34449C20.2917 2.75574 20.7702 2.27649 21.3582 2.27649H26.8429C27.1192 2.28685 27.3808 2.40391 27.5726 2.60306C27.7645 2.80222 27.8716 3.06798 27.8716 3.34449C27.8716 3.62101 27.7645 3.88677 27.5726 4.08593C27.3808 4.28508 27.1192 4.40214 26.8429 4.41249H21.3589C21.076 4.4119 20.8048 4.29914 20.6049 4.09894C20.405 3.89873 20.2926 3.62742 20.2924 3.34449H20.2917ZM22.2567 7.54374V5.93874H25.9444V7.54074C24.7194 7.39494 23.4814 7.39595 22.2567 7.54374Z" fill="#5485EE" /> <path d="M34.4556 32.434C34.2536 32.4348 34.0602 32.5154 33.9174 32.6583C33.7747 32.8012 33.6942 32.9947 33.6936 33.1967C33.6938 33.322 33.7248 33.4453 33.784 33.5558C33.8432 33.6662 33.9287 33.7604 34.0329 33.8299C34.1372 33.8994 34.2569 33.9421 34.3816 33.9543C34.5063 33.9664 34.6321 33.9476 34.7478 33.8996C34.8636 33.8515 34.9656 33.7757 35.045 33.6788C35.1245 33.5819 35.1787 33.4669 35.2031 33.344C35.2274 33.2211 35.2211 33.0941 35.1847 32.9742C35.1482 32.8543 35.0828 32.7453 34.9941 32.6567C34.8509 32.5146 34.6574 32.4346 34.4556 32.434ZM24.1139 11.0012C17.5979 11.0012 12.2969 16.3112 12.2969 22.8377C12.2969 29.3642 17.5979 34.6742 24.1139 34.6742C30.6299 34.6742 35.9301 29.3642 35.9301 22.8377C35.9301 16.3112 30.6291 11.0012 24.1139 11.0012ZM24.1139 33.1487C18.4379 33.1487 13.8209 28.5227 13.8209 22.8377C13.8209 17.1527 18.4379 12.5275 24.1139 12.5275C29.7899 12.5275 34.4069 17.1527 34.4069 22.8377C34.4069 28.5227 29.7891 33.148 24.1139 33.148V33.1487Z" fill="#5485EE" /> <path d="M28.9325 16.9318L25.16 20.711C24.835 20.5494 24.477 20.4653 24.1141 20.4653C23.7512 20.4653 23.3932 20.5494 23.0682 20.711L21.38 19.0198C21.3093 18.9489 21.2253 18.8927 21.1328 18.8543C21.0404 18.816 20.9412 18.7962 20.8411 18.7962C20.741 18.7962 20.6419 18.816 20.5494 18.8543C20.457 18.8927 20.373 18.9489 20.3022 19.0198C20.1596 19.163 20.0796 19.3569 20.0796 19.559C20.0796 19.7612 20.1596 19.955 20.3022 20.0983L21.9913 21.7903C21.8135 22.1514 21.7307 22.5519 21.7505 22.9539C21.7703 23.3559 21.8921 23.7463 22.1044 24.0882C22.3167 24.4302 22.6125 24.7124 22.9641 24.9085C23.3156 25.1045 23.7113 25.2079 24.1138 25.2088C24.5164 25.2079 24.9121 25.1046 25.2637 24.9085C25.6154 24.7124 25.9113 24.4301 26.1236 24.088C26.336 23.746 26.4577 23.3555 26.4774 22.9533C26.4971 22.5512 26.4141 22.1507 26.2362 21.7895L29.8985 18.122L30.0095 18.011C30.1526 17.8677 30.2329 17.6735 30.2329 17.471C30.2329 17.2685 30.1526 17.0743 30.0095 16.931C29.9389 16.8602 29.8549 16.804 29.7625 16.7656C29.6701 16.7273 29.571 16.7075 29.471 16.7075C29.371 16.7075 29.2719 16.7273 29.1795 16.7656C29.0871 16.804 29.0031 16.8609 28.9325 16.9318ZM24.1138 23.6818C23.894 23.6752 23.6855 23.5833 23.5324 23.4256C23.3793 23.2679 23.2937 23.0567 23.2937 22.8369C23.2937 22.6171 23.3793 22.4059 23.5324 22.2482C23.6855 22.0905 23.894 21.9986 24.1138 21.992C24.3379 21.992 24.5529 22.0811 24.7114 22.2396C24.8699 22.3981 24.959 22.6131 24.959 22.8373C24.959 23.0615 24.8699 23.2764 24.7114 23.435C24.5529 23.5935 24.3379 23.6818 24.1138 23.6818ZM32.258 22.0835H31.553C31.3506 22.0835 31.1565 22.1639 31.0134 22.307C30.8703 22.4502 30.7899 22.6443 30.7899 22.8467C30.7899 23.049 30.8703 23.2432 31.0134 23.3863C31.1565 23.5294 31.3506 23.6098 31.553 23.6098H32.258C32.4604 23.6098 32.6545 23.5294 32.7976 23.3863C32.9407 23.2432 33.0211 23.049 33.0211 22.8467C33.0211 22.6443 32.9407 22.4502 32.7976 22.307C32.6545 22.1639 32.4604 22.0835 32.258 22.0835ZM16.6752 22.0648H15.9695C15.7671 22.0648 15.573 22.1452 15.4299 22.2883C15.2868 22.4314 15.2064 22.6255 15.2064 22.8279C15.2064 23.0303 15.2868 23.2244 15.4299 23.3675C15.573 23.5106 15.7671 23.591 15.9695 23.591H16.6745C16.8769 23.591 17.071 23.5106 17.2141 23.3675C17.3572 23.2244 17.4376 23.0303 17.4376 22.8279C17.4376 22.6255 17.3572 22.4314 17.2141 22.2883C17.071 22.1452 16.8776 22.0648 16.6752 22.0648ZM24.1227 16.1488C24.5435 16.1488 24.8848 15.8075 24.8848 15.386V14.6795C24.8904 14.576 24.8748 14.4725 24.8391 14.3752C24.8034 14.2779 24.7482 14.1889 24.6769 14.1136C24.6056 14.0384 24.5198 13.9784 24.4246 13.9375C24.3293 13.8965 24.2268 13.8754 24.1231 13.8754C24.0195 13.8754 23.9169 13.8965 23.8217 13.9375C23.7265 13.9784 23.6406 14.0384 23.5693 14.1136C23.4981 14.1889 23.4429 14.2779 23.4071 14.3752C23.3714 14.4725 23.3559 14.576 23.3615 14.6795V15.386C23.3615 15.8075 23.702 16.1488 24.1227 16.1488ZM24.1047 29.5258C23.684 29.5258 23.3428 29.867 23.3428 30.2885V30.9958C23.3395 31.0978 23.3569 31.1994 23.3937 31.2946C23.4305 31.3898 23.4861 31.4767 23.5572 31.55C23.6282 31.6233 23.7133 31.6816 23.8073 31.7214C23.9013 31.7612 24.0023 31.7817 24.1044 31.7817C24.2065 31.7817 24.3075 31.7612 24.4015 31.7214C24.4955 31.6816 24.5805 31.6233 24.6516 31.55C24.7226 31.4767 24.7782 31.3898 24.815 31.2946C24.8519 31.1994 24.8692 31.0978 24.866 30.9958V30.2885C24.866 29.867 24.5247 29.5258 24.1047 29.5258ZM1.262 26.7823C1.06175 26.7823 0.8645 26.864 0.7235 27.0058C0.581 27.1483 0.5 27.3448 0.5 27.5458C0.5 27.7468 0.58175 27.9433 0.7235 28.085C0.86525 28.2268 1.061 28.3085 1.262 28.3085C1.46225 28.3085 1.65875 28.226 1.8005 28.085C1.9415 27.9425 2.02325 27.746 2.02325 27.545C2.02325 27.3448 1.94225 27.1475 1.8005 27.0058C1.65745 26.8633 1.46393 26.7829 1.262 26.7823Z" fill="#5485EE" /> </g> </g> </g> <defs> <clipPath id="clip0_430_4930"> <rect width="39" height="37.5" fill="white" transform="translate(0.5 0.75)" /> </clipPath> <clipPath id="clip1_430_4930"> <rect width="39" height="37.5" fill="white" transform="translate(0.5 0.750122)" /> </clipPath> <clipPath id="clip2_430_4930"> <rect width="39" height="37.5" fill="white" transform="translate(0.5 0.750244)" /> </clipPath> </defs> </SvgIcon>
    ),
  },
  {
    value: 'Professional Support',
    svgIcon: (
      <SvgIcon width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.92446 6.43338C8.24746 7.514 5.20058 6.36837 3.95746 8.1835C3.57883 8.736 3.76571 9.46725 4.13946 10.9297L7.37321 26.8109C8.10446 29.6676 8.46846 31.096 9.60433 31.9296C10.0675 32.2709 10.5468 32.4301 11.062 32.5M9.92446 6.43338C12.1735 4.98225 10.2332 3.25 13.4995 3.25L17.0013 6.00113C18.3972 7.09638 19.0943 7.64563 19.1463 8.41913C19.1983 9.19425 18.5825 9.841 17.3491 11.1329L16.4488 12.0754C15.833 12.7205 15.5242 13.0439 15.1553 13.0163C14.7865 12.9886 14.5232 12.623 14.0016 11.8934L9.92446 6.43338ZM30.0745 6.43338C31.7515 7.514 34.7983 6.36837 36.0415 8.1835C36.4201 8.736 36.2332 9.46725 35.8595 10.9297L32.6257 26.8109C31.8945 29.6676 31.5305 31.096 30.3962 31.9296C29.9315 32.2709 29.4505 32.4301 28.937 32.5M30.0745 6.43338C27.8255 4.98225 29.7657 3.25 26.4995 3.25L22.9976 6.00113C21.6017 7.09638 20.9046 7.64563 20.8526 8.41913C20.8006 9.19425 21.4165 9.841 22.6498 11.1329L23.5501 12.0754C24.166 12.7205 24.4747 13.0439 24.8436 13.0163C25.2125 12.9886 25.4757 12.623 25.9973 11.8934L30.0745 6.43338ZM17.2158 11.375L18.6296 13.7345C18.9627 14.287 19.1285 14.5665 19.1788 14.8769C19.2276 15.1889 19.1545 15.5041 19.0098 16.133L16.0182 29.1541C15.6168 31.4064 16.8063 32.5016 17.9617 33.9479C18.9221 35.1504 19.4031 35.75 20.0011 35.75C20.5991 35.75 21.0801 35.1487 22.0405 33.9462C23.1942 32.5032 24.3853 31.4064 23.984 29.1541L20.9907 16.133C20.8461 15.5041 20.7746 15.1889 20.8233 14.8769C20.8721 14.5665 21.0395 14.2886 21.371 13.7345L22.7847 11.375" stroke="#FAC73D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </SvgIcon>
    ),
  },
  {
    value: 'Complimentary Service',
    svgIcon: (
      <SvgIcon width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.03125 24.375C9.70435 24.375 10.25 23.8293 10.25 23.1562C10.25 22.4832 9.70435 21.9375 9.03125 21.9375C8.35815 21.9375 7.8125 22.4832 7.8125 23.1562C7.8125 23.8293 8.35815 24.375 9.03125 24.375Z" fill="#559944" /> <path d="M20 14.625C20.6731 14.625 21.2188 14.0793 21.2188 13.4062C21.2188 12.7332 20.6731 12.1875 20 12.1875C19.3269 12.1875 18.7812 12.7332 18.7812 13.4062C18.7812 14.0793 19.3269 14.625 20 14.625Z" fill="#559944" /> <path d="M30.9688 24.375C31.6418 24.375 32.1875 23.8293 32.1875 23.1562C32.1875 22.4832 31.6418 21.9375 30.9688 21.9375C30.2957 21.9375 29.75 22.4832 29.75 23.1562C29.75 23.8293 30.2957 24.375 30.9688 24.375Z" fill="#559944" /> <path d="M12.6875 18.2812C13.3606 18.2812 13.9062 17.7356 13.9062 17.0625C13.9062 16.3894 13.3606 15.8438 12.6875 15.8438C12.0144 15.8438 11.4688 16.3894 11.4688 17.0625C11.4688 17.7356 12.0144 18.2812 12.6875 18.2812Z" fill="#559944" /> <path d="M37.0625 24.375H34.625C34.625 22.8369 34.3873 21.3232 33.9193 19.8742L36.2398 19.1246C36.7858 20.8163 37.0625 22.5834 37.0625 24.375ZM36.8797 10.9419L33.9108 13.9108C33.4538 14.368 32.8339 14.6249 32.1875 14.625C31.706 14.6237 31.2356 14.48 30.8356 14.212C30.4356 13.944 30.1239 13.5636 29.9396 13.1187C29.7554 12.6739 29.7069 12.1844 29.8002 11.7121C29.8936 11.2397 30.1246 10.8055 30.4642 10.4642L33.4343 7.49409C33.0283 7.37989 32.6092 7.31885 32.1875 7.3125C29.4989 7.3125 27.3125 9.50016 27.3125 12.1875C27.3125 13.0894 27.5745 13.9242 28.0035 14.6494L22.4607 20.1923C21.7173 19.7442 20.8667 19.5054 19.9988 19.5012C17.3114 19.5012 15.1238 21.6877 15.1238 24.3762C15.1238 27.0648 17.3114 29.2512 19.9988 29.2512C22.6861 29.2512 24.8738 27.0636 24.8738 24.3762C24.8738 23.4743 24.613 22.6407 24.184 21.9143L29.7268 16.3727C30.4698 16.8205 31.32 17.0593 32.1875 17.0637C34.8761 17.0637 37.0625 14.8761 37.0625 12.1887C37.0558 11.767 36.9943 11.3479 36.8797 10.9419ZM20 26.8125C18.6557 26.8125 17.5625 25.7193 17.5625 24.375C17.5625 23.0307 18.6557 21.9375 20 21.9375C21.3443 21.9375 22.4375 23.0319 22.4375 24.375C22.4375 25.7181 21.3443 26.8125 20 26.8125ZM5.375 24.375H2.9375C2.9375 14.9663 10.5913 7.3125 20 7.3125C21.7916 7.3125 23.5587 7.58916 25.2492 8.13516L24.5008 10.4557C23.0466 9.98677 21.5279 9.74866 20 9.75C11.9355 9.75 5.375 16.3105 5.375 24.375Z" fill="#559944" /> </SvgIcon>
    ),
  }
];

// Array of background images for rotation (same as LiveConsultationForm)
const backgroundImages = [
  '/images/home/hero/hero-1.webp',
  '/images/home/hero/hero-2.webp',
  '/images/home/hero/hero-3.webp',
  '/images/home/hero/hero-4.webp',
];

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
  width: ${props => props.$active ? '16px' : '10px'};
  height: ${props => props.$active ? '16px' : '10px'};
  border-radius: 50%;
  background: ${props => props.$active ? '#fff' : 'rgba(255,255,255,0.5)'};
  box-shadow: ${props => props.$active ? '0 0 0 4px rgba(255,255,255,0.3)' : 'none'};
  transition: all 0.3s cubic-bezier(0.4,0.2,0.2,1);
  position: relative;
  &::after {
    content: '';
    display: ${props => props.$active ? 'block' : 'none'};
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

const ParticularDesignGallery = ({ open, onClose, design }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarDesigns, setSimilarDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [designDescription, setDesignDescription] = useState('');

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (open && design) {
      fetchSimilarDesigns();
    }
  }, [open, design]);

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const handleImageError = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
    setFailedImages(prev => new Set([...prev, imageId]));
  };

  const fetchSimilarDesigns = async () => {
    if (!design?.category || !design?.subCategory || !design?.id) return;

    setLoading(true);
    setError(null);
    setLoadedImages(new Set()); // Reset loaded images
    setFailedImages(new Set()); // Reset failed images
    try {
      const response = await getParticularDesigns(design.category, design.subCategory, design.id);
      if (response?.data) {
        // Extract image URLs from childImages
        if (response.data.childImages && Array.isArray(response.data.childImages)) {
          const imageUrls = response.data.childImages;
          setSimilarDesigns(imageUrls);
          // Select the first image by default
          if (imageUrls.length > 0) {
            setSelectedImage(imageUrls[0]);
          }
        } else {
          setSimilarDesigns([]);
          setSelectedImage(null);
        }
        
        // Extract title and description from response
        setModalTitle(response.data.name || design.title || 'Design Details');
        setDesignDescription(response.data.description || 'Experience timeless elegance with this beautiful design.');
      } else {
        setSimilarDesigns([]);
        setSelectedImage(null);
        setModalTitle(design.title || 'Design Details');
        setDesignDescription('Experience timeless elegance with this beautiful design.');
      }
    } catch (error) {
      console.error('Error fetching similar designs:', error);
      setError('Failed to load similar designs. Please try again later.');
      setSimilarDesigns([]);
      setSelectedImage(null);
      setModalTitle(design.title || 'Design Details');
      setDesignDescription('Experience timeless elegance with this beautiful design.');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryCardClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleRightIconClick = () => {
    if (similarDesigns.length === 0) return;
    
    const currentIndex = selectedImage ? similarDesigns.indexOf(selectedImage) : -1;
    const nextIndex = currentIndex === -1 || currentIndex === similarDesigns.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(similarDesigns[nextIndex]);
  };

  const handleLeftIconClick = () => {
    if (similarDesigns.length === 0) return;
    
    const currentIndex = selectedImage ? similarDesigns.indexOf(selectedImage) : -1;
    const prevIndex = currentIndex === -1 || currentIndex === 0 ? similarDesigns.length - 1 : currentIndex - 1;
    setSelectedImage(similarDesigns[prevIndex]);
  };

  // Determine if icons should be shown
  const currentIndex = selectedImage ? similarDesigns.indexOf(selectedImage) : -1;
  const showLeftIcon = similarDesigns.length > 1 && currentIndex > 0;
  const showRightIcon = similarDesigns.length > 1 && (currentIndex === -1 || currentIndex < similarDesigns.length - 1);

  if (!open || !design) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <CloseButton onClick={onClose} className="universal-fs-h8 universal-font">
        &times;
      </CloseButton>
      <ModalContent onClick={(e) => e.stopPropagation()}>

        <ImageSection backgroundImage={selectedImage}>
          {!selectedImage && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }} />
          )}
          <BottomLeftContent>
            <BottomImageTitle className="universal-fs-h6 universal-font-extra-bold">
              {design.title}
            </BottomImageTitle>
          </BottomLeftContent>
          <ImageContent>
            {/* Additional image content can be added here */}
          </ImageContent>

          {showLeftIcon && (
            <LeftIcon onClick={handleLeftIconClick}>
              <svg width="60" height="51" viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60 10C60 4.47715 55.5228 0 50 0H0V51H50C55.5228 51 60 46.5228 60 41V10Z" fill="black" fillOpacity="0.4" />
                <path d="M29.7493 31.5C29.7498 31.4015 29.7306 31.3038 29.6928 31.2128C29.655 31.1218 29.5995 31.0392 29.5293 30.97L24.0593 25.5L29.5293 20.03C29.6618 19.8878 29.7339 19.6998 29.7305 19.5055C29.7271 19.3112 29.6484 19.1258 29.511 18.9884C29.3735 18.851 29.1882 18.7723 28.9939 18.7688C28.7996 18.7654 28.6115 18.8375 28.4693 18.97L22.4693 24.97C22.3289 25.1106 22.25 25.3012 22.25 25.5C22.25 25.6987 22.3289 25.8894 22.4693 26.03L28.4693 32.03C28.61 32.1705 28.8006 32.2493 28.9993 32.2493C29.1981 32.2493 29.3887 32.1705 29.5293 32.03C29.5995 31.9608 29.655 31.8782 29.6928 31.7872C29.7306 31.6962 29.7498 31.5985 29.7493 31.5Z" fill="white" />
                <path d="M37.75 25.5C37.7474 25.3019 37.6676 25.1126 37.5275 24.9725C37.3874 24.8324 37.1981 24.7526 37 24.75H23C22.8011 24.75 22.6103 24.829 22.4697 24.9697C22.329 25.1103 22.25 25.3011 22.25 25.5C22.25 25.6989 22.329 25.8897 22.4697 26.0303C22.6103 26.171 22.8011 26.25 23 26.25H37C37.1981 26.2474 37.3874 26.1676 37.5275 26.0275C37.6676 25.8874 37.7474 25.6981 37.75 25.5Z" fill="white" />
              </svg>
            </LeftIcon>
          )}

          {showRightIcon && (
            <RightIcon onClick={handleRightIconClick}>
              <svg width="60" height="51" viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C0 4.47715 4.47715 0 10 0H60V51H10C4.47715 51 0 46.5228 0 41V10Z" fill="black" fillOpacity="0.4" />
                <path d="M30.2507 31.5C30.2502 31.4015 30.2694 31.3038 30.3072 31.2128C30.345 31.1218 30.4005 31.0392 30.4707 30.97L35.9407 25.5L30.4707 20.03C30.3382 19.8878 30.2661 19.6998 30.2695 19.5055C30.2729 19.3112 30.3516 19.1258 30.489 18.9884C30.6265 18.851 30.8118 18.7723 31.0061 18.7688C31.2004 18.7654 31.3885 18.8375 31.5307 18.97L37.5307 24.97C37.6711 25.1106 37.75 25.3012 37.75 25.5C37.75 25.6987 37.6711 25.8894 37.5307 26.03L31.5307 32.03C31.39 32.1705 31.1994 32.2493 31.0007 32.2493C30.8019 32.2493 30.6113 32.1705 30.4707 32.03C30.4005 31.9608 30.345 31.8782 30.3072 31.7872C30.2694 31.6962 30.2502 31.5985 30.2507 31.5Z" fill="white" />
                <path d="M22.25 25.5C22.2526 25.3019 22.3324 25.1126 22.4725 24.9725C22.6126 24.8324 22.8019 24.7526 23 24.75H37C37.1989 24.75 37.3897 24.829 37.5303 24.9697C37.671 25.1103 37.75 25.3011 37.75 25.5C37.75 25.6989 37.671 25.8897 37.5303 26.0303C37.3897 26.171 37.1989 26.25 37 26.25H23C22.8019 26.2474 22.6126 26.1676 22.4725 26.0275C22.3324 25.8874 22.2526 25.6981 22.25 25.5Z" fill="white" />
              </svg>
            </RightIcon>
          )}
        </ImageSection>

        <ContentSection>
          <ModalTitle className="universal-fs-h6 universal-font-bold">
            {modalTitle}
          </ModalTitle>

          <DesignDescription className="universal-fs-h3">
            {designDescription}
          </DesignDescription>

          <StatsContainer>
            {statsConfig.map((stat, index) => (
              <StatItem key={index}>
                <StatIcon>{stat.svgIcon}</StatIcon>
                <StatValueHolder>
                  <StatValue className="universal-fs-h3 universal-font-medium">{stat.value}</StatValue>
                </StatValueHolder>
              </StatItem>
            ))}
          </StatsContainer>

          <SectionTitle className="universal-fs-h5 universal-font-bold">
            Similar Designs
          </SectionTitle>

          <GalleryGrid>
            {loading ? (
              // Show skeleton cards while loading
              Array.from({ length: 6 }).map((_, index) => (
                <GalleryCard key={`loading-${index}`}>
                  <GalleryImageSection>
                    <SkeletonImage />
                  </GalleryImageSection>
                </GalleryCard>
              ))
            ) : error ? (
              // Show error message when API fails
              <div style={{ 
                width: '100%', 
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#666', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    Failed to load similar designs
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#999'
                  }}>
                    {error}
                  </div>
                </div>
              </div>
            ) : similarDesigns.length === 0 ? (
              // Show error message when no designs are available
              <div style={{ 
                width: '100%', 
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#666', 
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    No similar designs found
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#999'
                  }}>
                    Unable to load similar designs at this time
                  </div>
                </div>
              </div>
            ) : (
              similarDesigns.map((imageUrl, index) => {
                const isImageFailed = failedImages.has(imageUrl);

                return (
                  <GalleryCard 
                    key={`image-${index}`} 
                    onClick={() => handleGalleryCardClick(imageUrl)}
                    style={{
                      border: selectedImage === imageUrl ? '3px solid #D50F25' : 'none',
                      transform: selectedImage === imageUrl ? 'translateY(-4px) scale(1.02)' : 'none',
                      boxShadow: selectedImage === imageUrl ? '0 8px 24px rgba(213, 15, 37, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <GalleryImageSection>
                      {isImageFailed ? (
                        <ImageErrorContainer>
                          <ErrorIcon>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor" />
                            </svg>
                          </ErrorIcon>
                          <ErrorText>Image failed to load</ErrorText>
                        </ImageErrorContainer>
                      ) : (
                        <img
                          src={imageUrl}
                          alt={`Similar design ${index + 1}`}
                          loading="lazy"
                          onError={() => handleImageError(imageUrl)}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      )}
                    </GalleryImageSection>
                  </GalleryCard>
                );
              })
            )}
          </GalleryGrid>
        </ContentSection>
      </ModalContent>
    </Modal>
  );
};

export default ParticularDesignGallery; 

