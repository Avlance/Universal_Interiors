"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../../../components/button/js/Button.jsx';

const bannerImages = [
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657691/local_assets_migrated/home/hero/hero-1.webp',
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657692/local_assets_migrated/home/hero/hero-2.webp',
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657693/local_assets_migrated/home/hero/hero-3.webp',
  'https://res.cloudinary.com/sevfdaro/image/upload/v1782657694/local_assets_migrated/home/hero/hero-4.webp',
];

const BannerContainer = styled.section`
  background-size: cover;
  background-position: center;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;
  padding-bottom: 60px;
  padding: 1rem 2rem;
  transition: background-image 0.7s cubic-bezier(0.4,0.2,0.2,1);
  
  /* Overlay background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000066;
    // background: linear-gradient(135deg, rgba(213, 15, 37, 0.7) 0%, rgba(184, 12, 30, 0.7) 50%, rgba(84, 133, 238, 0.7) 100%);
    z-index: 1;
  }
  
  /* Ensure content is above overlay */
  & > * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    height: 80vh;
    padding: 1rem;
    min-height: 500px;
  }
  
  @media (max-width: 480px) {
    height: 85vh;
    padding: 0.5rem;
    min-height: 450px;
  }
`;

const BannerContent = styled.div`
  text-align: center;
  max-width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
  
  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

const BannerHeading = styled.h1`
  margin-bottom: 10px;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px;
  }
`;

const BannerDescription = styled.div`
  color: #FFFFFF;
  margin: 24px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 1024px) {
    margin: 16px 0;
  }
  
  @media (max-width: 768px) {
    margin: 12px 0;
    padding: 0 10px;
  }
  
  @media (max-width: 480px) {
    margin: 10px 0;
    padding: 0 5px;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 24px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin: 16px 0;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    margin: 12px 0;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin: 24px auto;
  gap: 16px;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 1200px;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 70px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    padding: 16px 12px;
    margin: 16px auto;
    gap: 12px;
    grid-template-columns: repeat(3, 1fr);
    max-width: 95%;
    margin-bottom: 50px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 12px 8px;
    gap: 8px;
    margin: 12px auto;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 10px;
    gap: 6px;
    margin: 8px auto;
    margin-bottom: 30px;
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
  flex-direction: column;
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
    flex-direction: column;
    gap: 6px;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    flex-direction: column;
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
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const SvgIcon = styled.svg`
  display: flex; 
  align-items: center;
  
  @media (max-width: 1024px) {
    width: 28px;
    height: 28px;
  }
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    margin-left: 0;
    margin-bottom: 4px;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 2px;
    align-items: center;
    justify-content: center;
    gap: 1px;
  }
  
  @media (max-width: 640px) {
    margin-bottom: 1px;
    gap: 3px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0;
    gap: 3px;
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

const ImageWithLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 160px;
    height: 40px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
    
    img {
      width: 120px;
      height: 30px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      width: 100px;
      height: 25px;
    }
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  height: 20px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    margin-top: 15px;
    gap: 6px;
  }
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

const countries = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'USA' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  { code: '+971', name: 'UAE' },
];

export const statsConfig = [
  {
    value: '3000+',
    label: 'Homes',
    svgIcon: (
      <SvgIcon width="35" height="34" viewBox="0 0 35 34" fill="none"> <path d="M18.2065 9.91634C18.2065 8.34384 19.4673 7.08301 21.0398 7.08301H25.9981C27.5565 7.08301 28.8315 8.35801 28.8315 9.91634V12.9763C27.1881 13.5572 25.9981 15.1155 25.9981 16.9572V19.833H18.2065V9.91634ZM8.99813 16.943V19.833H16.7898V9.91634C16.7898 8.34384 15.529 7.08301 13.9565 7.08301H8.99813C7.43979 7.08301 6.16479 8.35801 6.16479 9.91634V12.9622C7.80813 13.543 8.99813 15.1155 8.99813 16.943ZM29.7665 14.2088C28.3781 14.4355 27.4148 15.753 27.4148 17.1697V21.2497H7.58146V16.9997C7.58146 16.2482 7.28295 15.5276 6.7516 14.9962C6.22024 14.4649 5.49957 14.1663 4.74813 14.1663C3.99668 14.1663 3.27601 14.4649 2.74466 14.9962C2.21331 15.5276 1.91479 16.2482 1.91479 16.9997V24.083C1.91479 25.6413 3.18979 26.9163 4.74813 26.9163V29.7497H7.58146V26.9163H27.4148V29.7497H30.2481V26.9163C31.8065 26.9163 33.0815 25.6413 33.0815 24.083V16.9997C33.0815 15.2855 31.5373 13.9113 29.7665 14.2088Z" fill="#D50F25" /> </SvgIcon>
    ),
  },
  {
    value: '50+',
    label: 'Design Members',
    svgIcon: (
      <SvgIcon width="35" height="34" viewBox="0 0 35 34" fill="none"> <g clipPath="url(#clip0_150_290)"> <path d="M33.5511 17.9208V19.3375C33.5578 19.6689 33.448 19.9922 33.2409 20.251C33.0338 20.5099 32.7425 20.6879 32.4177 20.7542L30.6611 21.1083C30.3266 22.5182 29.7617 23.8632 28.9894 25.0892L29.9952 26.5908C30.1663 26.8583 30.2425 27.1755 30.2116 27.4915C30.1808 27.8075 30.0447 28.1039 29.8252 28.3333L27.8844 30.2742C27.6521 30.504 27.3475 30.6465 27.0222 30.6775C26.6969 30.7085 26.3709 30.6261 26.0994 30.4442L24.5836 29.4242C23.3666 30.2199 22.0262 30.8087 20.6169 31.1667L20.3336 32.8525C20.2673 33.1773 20.0893 33.4686 19.8305 33.6757C19.5716 33.8828 19.2483 33.9925 18.9169 33.9858H16.0836C15.7522 33.9925 15.4289 33.8828 15.17 33.6757C14.9112 33.4686 14.7331 33.1773 14.6669 32.8525L14.3836 31.1667C12.9743 30.8087 11.6339 30.2199 10.4169 29.4242L8.91524 30.43C8.64376 30.6119 8.31774 30.6943 7.99243 30.6633C7.66711 30.6324 7.36252 30.4899 7.13024 30.26L5.17524 28.3333C4.94538 28.1011 4.80289 27.7965 4.77191 27.4712C4.74092 27.1458 4.82336 26.8198 5.00524 26.5483L6.01108 25.0467C5.23874 23.8207 4.67394 22.4757 4.33941 21.0658L2.58274 20.7117C2.25794 20.6454 1.96664 20.4674 1.75956 20.2085C1.55248 19.9497 1.44273 19.6264 1.44941 19.295V17.8783H10.7427C10.7427 19.6705 11.4547 21.3893 12.722 22.6566C13.9892 23.9239 15.708 24.6358 17.5002 24.6358C19.2924 24.6358 21.0112 23.9239 22.2785 22.6566C23.5458 21.3893 24.2577 19.6705 24.2577 17.8783L33.5511 17.9208ZM24.8244 5.3975C24.8244 6.26918 25.1707 7.10515 25.7871 7.72152C26.4034 8.33789 27.2394 8.68417 28.1111 8.68417C28.9828 8.68417 29.8187 8.33789 30.4351 7.72152C31.0515 7.10515 31.3977 6.26918 31.3977 5.3975C31.3977 4.52582 31.0515 3.68985 30.4351 3.07348C29.8187 2.45711 28.9828 2.11083 28.1111 2.11083C27.2394 2.11083 26.4034 2.45711 25.7871 3.07348C25.1707 3.68985 24.8244 4.52582 24.8244 5.3975ZM3.61691 5.3975C3.61691 6.26918 3.96318 7.10515 4.57955 7.72152C5.19592 8.33789 6.0319 8.68417 6.90358 8.68417C7.77526 8.68417 8.61123 8.33789 9.2276 7.72152C9.84397 7.10515 10.1902 6.26918 10.1902 5.3975C10.1902 4.52582 9.84397 3.68985 9.2276 3.07348C8.61123 2.45711 7.77526 2.11083 6.90358 2.11083C6.0319 2.11083 5.19592 2.45711 4.57955 3.07348C3.96318 3.68985 3.61691 4.52582 3.61691 5.3975ZM10.1336 12.4667C9.62526 12.1434 9.07779 11.8864 8.50441 11.7017C6.98559 11.2748 5.36689 11.3759 3.91296 11.9884C2.45903 12.6008 1.25589 13.6884 0.500244 15.0733H8.61774C9.03757 14.1575 9.54523 13.2845 10.1336 12.4667ZM26.2552 15.1158H34.5002C33.7484 13.7228 32.5448 12.6272 31.0875 12.0093C29.6302 11.3913 28.0059 11.2878 26.4819 11.7158C25.898 11.9027 25.3409 12.1646 24.8244 12.495C25.3806 13.323 25.8595 14.2003 26.2552 15.1158ZM24.6827 15.1158C24.1171 13.6471 23.1374 12.374 21.8625 11.4512C20.5875 10.5283 19.0722 9.99523 17.5002 9.91667C15.9153 9.98648 14.3851 10.5168 13.0969 11.4427C11.8087 12.3686 10.8183 13.65 10.2469 15.13L24.6827 15.1158ZM13.2361 4.1225C13.2361 5.21586 13.6704 6.26443 14.4435 7.03755C15.2166 7.81067 16.2652 8.245 17.3586 8.245C18.4519 8.245 19.5005 7.81067 20.2736 7.03755C21.0467 6.26443 21.4811 5.21586 21.4811 4.1225C21.4811 3.02915 21.0467 1.98057 20.2736 1.20745C19.5005 0.434333 18.4519 0 17.3586 0C16.2652 0 15.2166 0.434333 14.4435 1.20745C13.6704 1.98057 13.2361 3.02915 13.2361 4.1225Z" fill="#5485EE" /> </g> <defs> <clipPath id="clip0_150_290"> <rect width="34" height="34" fill="white" transform="translate(0.500244)" /> </clipPath> </defs> </SvgIcon>
    ),
  },
  {
    value: '25+',
    label: 'Design Variety',
    svgIcon: (
      <SvgIcon width="35" height="34" viewBox="0 0 35 34" fill="none" > <path d="M24.6247 2.83301C25.7087 2.83295 26.7518 3.24714 27.5405 3.99083C28.3293 4.73452 28.804 5.75149 28.8676 6.83367L28.8747 7.08301C30.0018 7.08301 31.0828 7.53077 31.8799 8.3278C32.6769 9.12483 33.1247 10.2058 33.1247 11.333C33.1248 13.5322 32.2725 15.6459 30.7468 17.2298C29.2212 18.8138 27.1411 19.7449 24.9434 19.8273L24.6247 19.833H18.958L19.1705 19.8401C19.8451 19.8908 20.4793 20.1812 20.9584 20.6587C21.4375 21.1363 21.7299 21.7695 21.7828 22.4439L21.7913 22.6663V28.333C21.7916 29.0478 21.5216 29.7363 21.0356 30.2605C20.5495 30.7846 19.8833 31.1056 19.1705 31.1593L18.958 31.1663H16.1247C15.4099 31.1666 14.7214 30.8966 14.1972 30.4106C13.6731 29.9245 13.352 29.2583 13.2984 28.5455L13.2913 28.333V22.6663C13.2911 21.9515 13.5611 21.263 14.0471 20.7389C14.5332 20.2148 15.1994 19.8937 15.9122 19.8401L16.1247 19.833V18.4163C16.1247 18.0694 16.2521 17.7344 16.4827 17.4751C16.7133 17.2158 17.031 17.0502 17.3756 17.0096L17.5413 16.9997H24.6247C26.1276 16.9997 27.5689 16.4027 28.6316 15.3399C29.6943 14.2772 30.2913 12.8359 30.2913 11.333C30.2913 10.986 30.1639 10.6511 29.9333 10.3918C29.7028 10.1325 29.385 9.96686 29.0404 9.92626L28.8747 9.91634L28.8676 10.1657C28.8066 11.2049 28.3662 12.1856 27.6301 12.9218C26.894 13.6579 25.9133 14.0982 24.874 14.1593L24.6247 14.1663H10.458C9.37396 14.1664 8.33086 13.7522 7.54214 13.0085C6.75341 12.2648 6.27869 11.2479 6.21509 10.1657L6.20801 9.91634V7.08301C6.20795 5.99896 6.62214 4.95586 7.36583 4.16714C8.10952 3.37841 9.12649 2.90369 10.2087 2.84009L10.458 2.83301H24.6247Z" fill="#FFC107" /> </SvgIcon>
    ),
  },
  {
    value: '25+',
    label: 'Projects Completed',
    svgIcon: (
      <SvgIcon width="35" height="34" viewBox="0 0 35 34" fill="none" > <path d="M31.354 29.75H28.1665V4.25H29.229C29.5108 4.25 29.781 4.13806 29.9803 3.9388C30.1796 3.73954 30.2915 3.46929 30.2915 3.1875C30.2915 2.90571 30.1796 2.63546 29.9803 2.4362C29.781 2.23694 29.5108 2.125 29.229 2.125H5.854C5.57221 2.125 5.30196 2.23694 5.1027 2.4362C4.90345 2.63546 4.7915 2.90571 4.7915 3.1875C4.7915 3.46929 4.90345 3.73954 5.1027 3.9388C5.30196 4.13806 5.57221 4.25 5.854 4.25H6.9165V29.75H3.729C3.44721 29.75 3.17696 29.8619 2.9777 30.0612C2.77845 30.2605 2.6665 30.5307 2.6665 30.8125C2.6665 31.0943 2.77845 31.3645 2.9777 31.5638C3.17696 31.7631 3.44721 31.875 3.729 31.875H31.354C31.6358 31.875 31.906 31.7631 32.1053 31.5638C32.3046 31.3645 32.4165 31.0943 32.4165 30.8125C32.4165 30.5307 32.3046 30.2605 32.1053 30.0612C31.906 29.8619 31.6358 29.75 31.354 29.75ZM12.229 7.4375H15.4165C15.6983 7.4375 15.9685 7.54944 16.1678 7.7487C16.3671 7.94796 16.479 8.21821 16.479 8.5C16.479 8.78179 16.3671 9.05204 16.1678 9.2513C15.9685 9.45056 15.6983 9.5625 15.4165 9.5625H12.229C11.9472 9.5625 11.677 9.45056 11.4777 9.2513C11.2784 9.05204 11.1665 8.78179 11.1665 8.5C11.1665 8.21821 11.2784 7.94796 11.4777 7.7487C11.677 7.54944 11.9472 7.4375 12.229 7.4375ZM12.229 12.75H15.4165C15.6983 12.75 15.9685 12.8619 16.1678 13.0612C16.3671 13.2605 16.479 13.5307 16.479 13.8125C16.479 14.0943 16.3671 14.3645 16.1678 14.5638C15.9685 14.7631 15.6983 14.875 15.4165 14.875H12.229C11.9472 14.875 11.677 14.7631 11.4777 14.5638C11.2784 14.3645 11.1665 14.0943 11.1665 13.8125C11.1665 13.5307 11.2784 13.2605 11.4777 13.0612C11.677 12.8619 11.9472 12.75 12.229 12.75ZM11.1665 19.125C11.1665 18.8432 11.2784 18.573 11.4777 18.3737C11.677 18.1744 11.9472 18.0625 12.229 18.0625H15.4165C15.6983 18.0625 15.9685 18.1744 16.1678 18.3737C16.3671 18.573 16.479 18.8432 16.479 19.125C16.479 19.4068 16.3671 19.677 16.1678 19.8763C15.9685 20.0756 15.6983 20.1875 15.4165 20.1875H12.229C11.9472 20.1875 11.677 20.0756 11.4777 19.8763C11.2784 19.677 11.1665 19.4068 11.1665 19.125ZM20.729 29.75H14.354V24.4375H20.729V29.75ZM22.854 20.1875H19.6665C19.3847 20.1875 19.1145 20.0756 18.9152 19.8763C18.7159 19.677 18.604 19.4068 18.604 19.125C18.604 18.8432 18.7159 18.573 18.9152 18.3737C19.1145 18.1744 19.3847 18.0625 19.6665 18.0625H22.854C23.1358 18.0625 23.406 18.1744 23.6053 18.3737C23.8046 18.573 23.9165 18.8432 23.9165 19.125C23.9165 19.4068 23.8046 19.677 23.6053 19.8763C23.406 20.0756 23.1358 20.1875 22.854 20.1875ZM22.854 14.875H19.6665C19.3847 14.875 19.1145 14.7631 18.9152 14.5638C18.7159 14.3645 18.604 14.0943 18.604 13.8125C18.604 13.5307 18.7159 13.2605 18.9152 13.0612C19.1145 12.8619 19.3847 12.75 19.6665 12.75H22.854C23.1358 12.75 23.406 12.8619 23.6053 13.0612C23.8046 13.2605 23.9165 13.5307 23.9165 13.8125C23.9165 14.0943 23.8046 14.3645 23.6053 14.5638C23.406 14.7631 23.1358 14.875 22.854 14.875ZM22.854 9.5625H19.6665C19.3847 9.5625 19.1145 9.45056 18.9152 9.2513C18.7159 9.05204 18.604 8.78179 18.604 8.5C18.604 8.21821 18.7159 7.94796 18.9152 7.7487C19.1145 7.54944 19.3847 7.4375 19.6665 7.4375H22.854C23.1358 7.4375 23.406 7.54944 23.6053 7.7487C23.8046 7.94796 23.9165 8.21821 23.9165 8.5C23.9165 8.78179 23.8046 9.05204 23.6053 9.2513C23.406 9.45056 23.1358 9.5625 22.854 9.5625Z" fill="#559944" /> </SvgIcon>
    ),
  },
  {
    value: '25+',
    label: 'Cities',
    svgIcon: (
      <SvgIcon width="35" height="34" viewBox="0 0 35 34" fill="none" > <path d="M24.3328 3.62901C23.7251 4.57336 23.1593 5.54401 22.637 6.53814C22.1632 7.44126 22.098 8.53706 22.5832 9.49756C22.6819 9.69211 22.7976 9.87179 22.9303 10.0366C22.782 10.3313 22.6427 10.616 22.5124 10.8908C22.0945 11.7741 22.0548 12.8281 22.5301 13.7525C22.6052 13.8989 22.6902 14.0368 22.7851 14.1662H4.83237C4.71101 14.1662 4.58988 14.1709 4.46899 14.1803C5.78224 11.8287 7.56866 9.04989 9.30195 7.0616C10.3276 5.88506 12.0871 5.88506 13.1128 7.0616C13.3503 7.33454 13.5883 7.62071 13.8268 7.9201C15.4453 5.65697 17.219 3.4661 18.9183 1.83339C19.4141 1.35157 20.0782 1.08203 20.7695 1.08203C21.4609 1.08203 22.125 1.35157 22.6207 1.83339C23.186 2.37597 23.7597 2.98089 24.3328 3.62901Z" fill="#8FBFFA" /> <path fillRule="evenodd" clipRule="evenodd" d="M4.83194 15.9375C3.11989 15.9375 1.53323 17.3648 1.80523 19.2688C2.90669 26.9967 9.54944 32.9375 17.5819 32.9375C25.6144 32.9375 32.2572 26.9967 33.3594 19.2688C33.6306 17.3648 32.0447 15.9375 30.3319 15.9375H4.83194Z" fill="#8FBFFA" /> <path fillRule="evenodd" clipRule="evenodd" d="M17.9857 15.9375H30.3319C32.0447 15.9375 33.6306 17.3648 33.3594 19.2688C32.5051 25.2563 28.3252 30.1715 22.7492 32.0811C21.4501 29.609 22.6834 27.569 23.7034 25.8832C24.3656 24.786 24.9387 23.8397 24.6653 23.0208C24.2899 22.185 23.2274 21.9038 22.0515 21.5921C19.9478 21.034 17.4821 20.3809 17.9361 16.2917C17.9493 16.1736 17.9659 16.0556 17.9857 15.9375ZM10.8315 15.9375C12.0661 17.4349 12.7001 19.1307 11.9153 20.8958C11.3033 22.2728 10.109 22.8933 8.89352 23.5237C7.41877 24.2887 5.91144 25.0715 5.37169 27.2425C3.46025 24.9706 2.2246 22.208 1.80523 19.2688C1.53323 17.3648 3.11989 15.9375 4.83194 15.9375H10.8315Z" fill="#2859C5" /> <path d="M28.1454 1.56813C28.5272 1.18563 29.1371 1.18563 29.5196 1.56813C30.9206 2.97204 32.4684 5.46892 33.4593 7.35946C33.6931 7.80571 33.7037 8.29658 33.5011 8.69821C33.3006 9.09488 32.9089 9.36971 32.4103 9.42567C32.8132 10.1546 33.1936 10.8959 33.5507 11.6484C33.7575 12.084 33.7582 12.5565 33.5599 12.9432C33.3587 13.3343 32.972 13.6034 32.4783 13.6572C31.8762 13.7217 31.0418 13.7791 29.895 13.8018V16.9992C29.895 17.281 29.783 17.5512 29.5838 17.7505C29.3845 17.9497 29.1143 18.0617 28.8325 18.0617C28.5507 18.0617 28.2804 17.9497 28.0812 17.7505C27.8819 17.5512 27.77 17.281 27.77 16.9992V13.8018C26.6225 13.7791 25.7874 13.7217 25.186 13.6572C24.693 13.6034 24.3055 13.3343 24.1051 12.9432C23.9067 12.5565 23.9067 12.084 24.1129 11.6484C24.47 10.8959 24.8503 10.1546 25.2533 9.42567C24.756 9.36971 24.3643 9.09488 24.1639 8.69821C23.9606 8.29658 23.9712 7.80571 24.2049 7.35946C25.1959 5.46892 26.7436 2.97204 28.1454 1.56813Z" fill="#2859C5" /> </SvgIcon>
    ),
  },
  {
    value: '25+',
    label: 'Years Experience',
    svgIcon: (
      <SvgIcon width="35" height="34" viewBox="0 0 35 34" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M12.2297 2.125C12.0629 2.12499 11.8984 2.16427 11.7496 2.23965C11.6008 2.31503 11.4718 2.42439 11.3731 2.55889C11.2744 2.69339 11.2087 2.84924 11.1815 3.01383C11.1542 3.17841 11.1661 3.34711 11.2161 3.50625L11.4499 4.25H7.97974C7.69794 4.25 7.42769 4.36194 7.22844 4.5612C7.02918 4.76046 6.91724 5.03071 6.91724 5.3125V30.8125C6.91724 31.0943 7.02918 31.3645 7.22844 31.5638C7.42769 31.7631 7.69794 31.875 7.97974 31.875H27.1047C27.3865 31.875 27.6568 31.7631 27.856 31.5638C28.0553 31.3645 28.1672 31.0943 28.1672 30.8125V5.3125C28.1672 5.03071 28.0553 4.76046 27.856 4.5612C27.6568 4.36194 27.3865 4.25 27.1047 4.25H23.6367L23.8705 3.50625C23.9206 3.34694 23.9324 3.17805 23.905 3.0133C23.8777 2.84855 23.8118 2.69258 23.7129 2.55803C23.614 2.42349 23.4847 2.31416 23.3356 2.23893C23.1865 2.16369 23.0217 2.12466 22.8547 2.125H12.2297ZM13.6747 4.25H21.4097L20.7446 6.375H14.3399L13.6747 4.25ZM23.9172 14.875H11.1672V12.75H23.9172V14.875ZM23.9172 20.1875H11.1672V18.0625H23.9172V20.1875ZM11.1672 25.5H19.6672V23.375H11.1672V25.5Z" fill="#FFC107" /> </SvgIcon>
    ),
  }
];

const HeroBanner = ({ costEstimatorRef }) => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bannerImages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToCostEstimator = () => {
    if (costEstimatorRef?.current) {
      const offset = 100;
      const elementTop = costEstimatorRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <BannerContainer style={{ backgroundImage: `url('${bannerImages[bgIndex]}')` }}>
        <BannerContent>
          <BannerHeading className="universal-fs-h13 universal-font-extra-bold" style={{ marginBottom: "0.25rem" }}>Interiors That Truly  </BannerHeading>
          <BannerHeading className="universal-fs-h13 universal-font-extra-bold">Reflect You.</BannerHeading>
          <BannerDescription className="universal-fs-h3 universal-font-semibold">Personalised designs tailored to your taste </BannerDescription>
          <ActionButtonsContainer>
            <Button primary className='universal-fs-h3 primary-button' onClick={handleScrollToCostEstimator}>Get Free Quote</Button>
            <ImageWithLabel>
              <img src={"https://res.cloudinary.com/sevfdaro/image/upload/v1782657695/local_assets_migrated/home/hero/user-list.webp"} alt="profile" loading="lazy"  />
              <span className="universal-fs-h3 universal-font-medium">Trusted by 10,000+ families</span>
            </ImageWithLabel>
          </ActionButtonsContainer>
          <DotsContainer>
            {bannerImages.map((_, index) => (
              <Dot key={index} $active={index === bgIndex} />
            ))}
          </DotsContainer>
        </BannerContent>
      </BannerContainer>
      <StatsContainer>
        {statsConfig.map((stat, index) => (
          <StatItem key={index}>
            <StatIcon>{stat.svgIcon}</StatIcon>
            <StatValueHolder>
              <StatValue className="universal-fs-h6 universal-font-medium">{stat.value}</StatValue>
              <StatLabel className="universal-fs-h3 universal-font-medium">{stat.label}</StatLabel>
            </StatValueHolder>
          </StatItem>
        ))}
      </StatsContainer>

    </>
  );
};

export default HeroBanner; 

