"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getGoogleReviews } from '../homeHttpRequest.js';
import useApiLoader from '../../../hooks/useApiLoader';
import EmptyPage from '../../../components/EmptyPage.jsx';


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
    margin-bottom: 0px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 15px;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const SectionDescription = styled.p`
  color: #222222;
  margin: 0 auto 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
  margin-bottom: 0px;
  }
    @media (max-width: 480px) {
      margin-bottom: 0px;
    }
`;


const TestimonialGrid = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 60px 0px;
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
    
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
  }
`;

const GoogleReviewsContainer = styled.div`
  max-width: 1200px;
  margin: auto; 
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const OverallReviewContainer = styled.div`
  margin: 40px 0px 16px;
  text-align: center;
  width: 300px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    margin: 30px 0px 12px;
  }
`;

const GoogleReviewsGrid = styled.div`
  display: flex;
  gap: 24px;
  // padding: 1rem;
  overflow-x: scroll;
  
  align-items: center;
  margin: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    overflow-x: visible;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const GoogleReviewCard = styled.div`
  height: 235px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 24px;
  text-align: left;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border: 0.5px solid #3686F7;
  min-width: 350px;
  width: 350px;
  background: linear-gradient(126.27deg, #FFD8F7 -11.56%, #FFFFFF 16.68%, #FFFFFF 73.72%, #D6E7FF 134.39%);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(54, 134, 247, 0.18);
    border-color: #3686F7;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    min-width: 100%;
    width: 100%;
    height: auto;
    min-height: 200px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 10px;
    min-height: 180px;
  }
`;

const ReadMoreHint = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #3686F7;
  margin-top: 10px;
  transition: gap 0.2s ease, color 0.2s ease;
  
  ${GoogleReviewCard}:hover & {
    gap: 8px;
    color: #1a5fd4;
  }
`;

/* ── Modal Styled Components ── */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  touch-action: none;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  animation: grFadeIn 0.2s ease-out;
  
  @keyframes grFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 560px;
  max-height: 82svh;
  overflow-y: auto;
  padding: 32px;
  position: relative;
  animation: grScaleIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @keyframes grScaleIn {
    from { transform: scale(0.94) translateY(12px); opacity: 0; }
    to   { transform: scale(1) translateY(0);       opacity: 1; }
  }
  
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
  &::-webkit-scrollbar-thumb { background: #3686F7; border-radius: 10px; }
  
  @media (max-width: 480px) {
    padding: 22px 18px;
    border-radius: 12px;
  }
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  color: #555;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  
  &:hover {
    background: #3686F7;
    color: #fff;
    transform: rotate(90deg) scale(1.1);
  }
`;

const ModalReviewerName = styled.h3`
  margin: 0 0 3px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
`;

const ModalReviewText = styled.p`
  color: #333;
  line-height: 1.75;
  font-size: 0.97rem;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const ReviewerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`;

const ReviewerDetails = styled.div``;

const ReviewerName = styled.h5`
  margin: 0 0 2px;
  color: #1a1a1a;
  
  @media (max-width: 480px) {
    font-size: var(--universal-fs-h3);
  }
`;

const ReviewDate = styled.p`
  color: #999;
  margin: 0;
`;

const ReviewStars = styled.div`
  display: flex;
  margin-bottom: 10px;
  
  svg {
    color: #FBBC05;
    width: 16px;
    height: 16px;
    margin-right: 2px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ReviewText = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    line-height: 1.5;
    -webkit-line-clamp: 3;
  }
  
  @media (max-width: 480px) {
    line-height: 1.4;
    -webkit-line-clamp: 2;
  }
`;

const StarIcon = ({ color = "#FBBC05" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={color} />
  </svg>
);

// Add styled component for the top right icon in ReviewerInfo
const ReviewerTopRightIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 4px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

// Add a HalfStarIcon for half ratings
const HalfStarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="half-gradient" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="50%" stopColor="#FBBC05" />
        <stop offset="50%" stopColor="#ccc" />
      </linearGradient>
    </defs>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half-gradient)" />
  </svg>
);

const GoogleReviews = () => {
  const [googleReviews, setGoogleReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedReview]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getGoogleReviews();
        if (response?.status === 'OK' && response?.data) {
          setGoogleReviews(response.data);
        } else {
          setError(response?.message ?? 'Failed to fetch reviews');
        }
      } catch (err) {
        setError('Error loading reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);


  if (loading) {
    return (
      <TestimonialsContainer>
        <ContentWrapper>
          <LoadingSpinner className="universal-fs-h5">Loading YouTube Reviews...</LoadingSpinner>
        </ContentWrapper>
      </TestimonialsContainer>
    );
  }

  if (error) {
    return (
      <TestimonialsContainer>
        <ContentWrapper>
          <EmptyPage title="Failed to load YouTube Reviews." subtitle={error || 'We\'re working to restore this section. Please check back soon.'} />
        </ContentWrapper>
      </TestimonialsContainer>
    );
  }

  return (
    <TestimonialsContainer>
      <ContentWrapper>

        <TestimonialGrid>
          <SectionHeader>
            <SectionTitle className='universal-fs-h16 universal-font-bold'>
              What Our <span style={{ color: "#D50F25" }}>Customers</span> Say
            </SectionTitle>
            <SectionDescription className='universal-fs-h3 universal-font-medium'>
              Real reviews and testimonials from happy homeowners who designed with us
            </SectionDescription>
          </SectionHeader>
        </TestimonialGrid>


        <GoogleReviewsContainer>
          <OverallReviewContainer>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg width="177" height="37" viewBox="0 0 177 37" fill="none"> <g clipPath="url(#clip0_218_5956)"> <path d="M125.976 22.2076C126.396 22.2076 126.765 22.1574 127.086 22.0576C127.41 21.9526 127.68 21.8079 127.896 21.6226C128.115 21.4329 128.28 21.2079 128.391 20.9476C128.501 20.6874 128.556 20.4001 128.556 20.0851C128.556 19.4454 128.346 18.9624 127.926 18.6376C127.506 18.3129 126.876 18.1501 126.036 18.1501H124.446V22.2076H125.976ZM130.941 27.7501H129.651C129.386 27.7501 129.191 27.6474 129.066 27.4426L126.276 23.6026C126.205 23.4961 126.11 23.4085 125.998 23.3476C125.903 23.2929 125.753 23.2651 125.548 23.2651H124.446V27.7501H122.998V17.0026H126.036C126.716 17.0026 127.303 17.0724 127.798 17.2126C128.293 17.3476 128.7 17.5449 129.021 17.8051C129.345 18.0654 129.585 18.3804 129.741 18.7501C129.896 19.1154 129.973 19.5249 129.973 19.9801C129.973 20.3604 129.913 20.7151 129.793 21.0451C129.673 21.3751 129.498 21.6729 129.268 21.9376C129.043 22.1979 128.766 22.4199 128.436 22.6051C128.088 22.7987 127.714 22.9402 127.326 23.0251C127.511 23.1301 127.671 23.2824 127.806 23.4826L130.941 27.7501ZM136.689 23.1226C136.689 22.8129 136.644 22.5301 136.554 22.2751C136.476 22.0278 136.346 21.8001 136.172 21.6076C136.006 21.4171 135.798 21.2681 135.564 21.1726C135.324 21.0676 135.051 21.0151 134.747 21.0151C134.106 21.0151 133.599 21.2026 133.224 21.5776C132.854 21.9474 132.624 22.4626 132.534 23.1226H136.689ZM137.769 26.6851C137.604 26.8854 137.406 27.0601 137.177 27.2101C136.943 27.3568 136.694 27.4775 136.434 27.5701C136.172 27.6658 135.9 27.7361 135.624 27.7801C135.344 27.8304 135.066 27.8551 134.792 27.8551C134.267 27.8551 133.782 27.7674 133.337 27.5926C132.903 27.4171 132.512 27.1512 132.189 26.8126C131.869 26.4676 131.619 26.0424 131.439 25.5376C131.259 25.0329 131.169 24.4524 131.169 23.7976C131.169 23.2674 131.249 22.7724 131.409 22.3126C131.574 21.8529 131.809 21.4554 132.114 21.1201C132.424 20.7764 132.806 20.505 133.232 20.3251C133.671 20.1301 134.166 20.0326 134.717 20.0326C135.171 20.0326 135.591 20.1099 135.977 20.2651C136.367 20.4151 136.701 20.6349 136.982 20.9251C137.267 21.2101 137.489 21.5649 137.649 21.9901C137.809 22.4101 137.889 22.8901 137.889 23.4301C137.889 23.6401 137.867 23.7804 137.822 23.8501C137.777 23.9199 137.691 23.9551 137.567 23.9551H132.489C132.504 24.4351 132.569 24.8529 132.684 25.2076C132.804 25.5624 132.969 25.8601 133.179 26.1001C133.389 26.3349 133.639 26.5126 133.929 26.6326C134.219 26.7474 134.544 26.8051 134.904 26.8051C135.239 26.8051 135.527 26.7676 135.767 26.6926C136.143 26.5739 136.501 26.4049 136.832 26.1901C136.952 26.1099 137.054 26.0701 137.139 26.0701C137.249 26.0701 137.334 26.1129 137.394 26.1976L137.769 26.6851ZM145.878 20.1526L142.78 27.7501H141.58L138.483 20.1526H139.57C139.66 20.1477 139.748 20.1722 139.823 20.2222C139.897 20.2723 139.953 20.3453 139.983 20.4301L141.91 25.3201C141.97 25.5054 142.023 25.6854 142.068 25.8601C142.113 26.0349 142.155 26.2104 142.195 26.3851C142.235 26.2104 142.278 26.0349 142.323 25.8601C142.368 25.6854 142.422 25.5054 142.488 25.3201L144.438 20.4301C144.467 20.3514 144.519 20.2835 144.588 20.2351C144.658 20.1799 144.745 20.1507 144.835 20.1526H145.878ZM148.512 20.1526V27.7501H147.177V20.1526H148.512ZM148.797 17.7676C148.797 17.8974 148.77 18.0204 148.715 18.1351C148.665 18.2454 148.595 18.3451 148.505 18.4351C148.419 18.5199 148.317 18.5874 148.197 18.6376C148.082 18.6879 147.96 18.7126 147.83 18.7126C147.707 18.7135 147.585 18.6893 147.471 18.6416C147.358 18.5939 147.255 18.5236 147.17 18.4351C147.086 18.3473 147.017 18.2459 146.967 18.1351C146.917 18.0192 146.891 17.894 146.892 17.7676C146.892 17.6379 146.917 17.5149 146.967 17.4001C147.017 17.2801 147.084 17.1774 147.17 17.0926C147.255 17.0026 147.352 16.9329 147.462 16.8826C147.577 16.8324 147.699 16.8076 147.83 16.8076C147.96 16.8076 148.082 16.8324 148.197 16.8826C148.317 16.9329 148.419 17.0026 148.505 17.0926C148.595 17.1774 148.665 17.2801 148.715 17.4001C148.77 17.5149 148.797 17.6379 148.797 17.7676ZM155.79 23.1226C155.79 22.8129 155.745 22.5301 155.655 22.2751C155.578 22.0275 155.447 21.7998 155.273 21.6076C155.107 21.4171 154.899 21.2681 154.665 21.1726C154.425 21.0676 154.153 21.0151 153.848 21.0151C153.208 21.0151 152.7 21.2026 152.325 21.5776C151.956 21.9474 151.725 22.4626 151.635 23.1226H155.79ZM156.87 26.6851C156.705 26.8854 156.508 27.0601 156.278 27.2101C156.044 27.357 155.795 27.4778 155.535 27.5701C155.276 27.6654 155.006 27.7351 154.725 27.7801C154.446 27.8304 154.168 27.8551 153.893 27.8551C153.368 27.8551 152.883 27.7674 152.438 27.5926C152.004 27.4168 151.613 27.1509 151.29 26.8126C150.971 26.4676 150.72 26.0424 150.54 25.5376C150.36 25.0329 150.27 24.4524 150.27 23.7976C150.27 23.2674 150.351 22.7724 150.51 22.3126C150.675 21.8529 150.911 21.4554 151.215 21.1201C151.525 20.7768 151.907 20.5054 152.333 20.3251C152.773 20.1301 153.268 20.0326 153.818 20.0326C154.273 20.0326 154.693 20.1099 155.078 20.2651C155.468 20.4151 155.803 20.6349 156.083 20.9251C156.368 21.2101 156.591 21.5649 156.75 21.9901C156.911 22.4101 156.99 22.8901 156.99 23.4301C156.99 23.6401 156.968 23.7804 156.923 23.8501C156.878 23.9199 156.793 23.9551 156.668 23.9551H151.59C151.605 24.4351 151.671 24.8529 151.785 25.2076C151.905 25.5624 152.07 25.8601 152.28 26.1001C152.49 26.3349 152.741 26.5126 153.03 26.6326C153.321 26.7474 153.645 26.8051 154.005 26.8051C154.341 26.8051 154.628 26.7676 154.868 26.6926C155.113 26.6124 155.323 26.5276 155.498 26.4376C155.673 26.3476 155.818 26.2651 155.933 26.1901C156.053 26.1099 156.156 26.0701 156.24 26.0701C156.351 26.0701 156.435 26.1129 156.495 26.1976L156.87 26.6851ZM169.035 20.1526L166.575 27.7501H165.517C165.387 27.7501 165.297 27.6654 165.247 27.4951L163.567 22.3426C163.528 22.2297 163.495 22.1145 163.47 21.9976C163.445 21.8776 163.419 21.7599 163.395 21.6451C163.37 21.7599 163.344 21.8776 163.32 21.9976C163.295 22.1124 163.262 22.2301 163.222 22.3501L161.512 27.4951C161.467 27.6654 161.367 27.7501 161.212 27.7501H160.207L157.747 20.1526H158.797C158.902 20.1526 158.99 20.1804 159.06 20.2351C159.135 20.2899 159.185 20.3551 159.21 20.4301L160.665 25.3201C160.749 25.6801 160.817 26.0199 160.867 26.3401L161.002 25.8376C161.052 25.6674 161.105 25.4949 161.16 25.3201L162.765 20.4001C162.788 20.3268 162.833 20.2617 162.892 20.2126C162.957 20.1624 163.035 20.1376 163.125 20.1376H163.71C163.809 20.1376 163.892 20.1624 163.957 20.2126C164.022 20.2629 164.067 20.3251 164.092 20.4001L165.66 25.3201C165.714 25.4949 165.765 25.6674 165.81 25.8376C165.855 26.0079 165.897 26.1751 165.937 26.3401C165.962 26.1751 165.992 26.0101 166.027 25.8451C166.067 25.6749 166.11 25.5001 166.155 25.3201L167.64 20.4301C167.664 20.351 167.714 20.2823 167.782 20.2351C167.853 20.1799 167.94 20.1507 168.03 20.1526H169.035ZM174.701 21.4051C174.676 21.4566 174.636 21.4996 174.587 21.5289C174.537 21.5582 174.481 21.5725 174.423 21.5701C174.333 21.5652 174.245 21.5368 174.168 21.4876C174.053 21.4225 173.936 21.3624 173.816 21.3076C173.66 21.2295 173.496 21.1667 173.328 21.1201C173.109 21.056 172.882 21.0257 172.653 21.0301C172.428 21.0301 172.226 21.0601 172.046 21.1201C171.866 21.1749 171.711 21.2529 171.581 21.3526C171.456 21.4524 171.358 21.5701 171.288 21.7051C171.223 21.8349 171.191 21.9774 171.191 22.1326C171.191 22.3276 171.246 22.4904 171.356 22.6201C171.471 22.7499 171.621 22.8624 171.806 22.9576C171.991 23.0529 172.201 23.1376 172.436 23.2126C172.671 23.2824 172.911 23.3604 173.156 23.4451C173.406 23.5254 173.649 23.6154 173.883 23.7151C174.118 23.8149 174.328 23.9401 174.513 24.0901C174.699 24.2401 174.846 24.4254 174.956 24.6451C175.071 24.8604 175.128 25.1199 175.128 25.4251C175.128 25.7754 175.066 26.1001 174.941 26.4001C174.815 26.6956 174.626 26.9595 174.386 27.1726C174.121 27.3987 173.816 27.5718 173.486 27.6826C173.131 27.8079 172.721 27.8701 172.256 27.8701C171.726 27.8701 171.246 27.7854 170.816 27.6151C170.415 27.4579 170.044 27.232 169.721 26.9476L170.036 26.4376C170.071 26.3774 170.12 26.3261 170.178 26.2876C170.242 26.2504 170.315 26.2322 170.388 26.2351C170.492 26.2399 170.591 26.2766 170.673 26.3401C170.773 26.4099 170.893 26.4879 171.033 26.5726C171.178 26.6574 171.354 26.7354 171.558 26.8051C171.763 26.8749 172.018 26.9101 172.323 26.9101C172.584 26.9101 172.811 26.8779 173.006 26.8126C173.201 26.7429 173.364 26.6499 173.493 26.5351C173.623 26.4204 173.718 26.2876 173.778 26.1376C173.844 25.9876 173.876 25.8279 173.876 25.6576C173.876 25.4476 173.818 25.2751 173.703 25.1401C173.583 24.9919 173.432 24.8716 173.261 24.7876C173.058 24.6804 172.844 24.595 172.623 24.5326L171.896 24.3001C171.65 24.2198 171.407 24.1297 171.168 24.0301C170.941 23.9299 170.729 23.7987 170.538 23.6401C170.351 23.4827 170.198 23.2887 170.088 23.0701C169.978 22.8399 169.923 22.5624 169.923 22.2376C169.923 21.9474 169.983 21.6699 170.103 21.4051C170.223 21.1351 170.398 20.9004 170.628 20.7001C170.859 20.4954 171.141 20.3326 171.476 20.2126C171.811 20.0926 172.194 20.0326 172.623 20.0326C173.124 20.0326 173.571 20.1129 173.966 20.2726C174.366 20.4279 174.711 20.6424 175.001 20.9176L174.701 21.4051Z" fill="#222222" /> <path d="M46.9775 19.6955C46.9775 24.875 42.92 28.691 37.9415 28.691C32.963 28.691 28.9062 24.875 28.9062 19.6955C28.9062 14.4792 32.963 10.6992 37.9415 10.6992C42.92 10.6992 46.9775 14.4792 46.9775 19.6955ZM43.022 19.6955C43.022 16.4585 40.6708 14.2445 37.9415 14.2445C35.213 14.2445 32.8617 16.4585 32.8617 19.6955C32.8617 22.8995 35.213 25.1465 37.9415 25.1465C40.6708 25.1465 43.022 22.8957 43.022 19.6955Z" fill="#EA4335" /> <path d="M66.4826 19.6955C66.4826 24.875 62.4259 28.691 57.4474 28.691C52.4689 28.691 48.4121 24.875 48.4121 19.6955C48.4121 14.483 52.4689 10.6992 57.4474 10.6992C62.4259 10.6992 66.4826 14.4792 66.4826 19.6955ZM62.5271 19.6955C62.5271 16.4585 60.1759 14.2445 57.4474 14.2445C54.7181 14.2445 52.3669 16.4585 52.3669 19.6955C52.3669 22.8995 54.7181 25.1465 57.4474 25.1465C60.1759 25.1465 62.5271 22.8957 62.5271 19.6955Z" fill="#FBBC05" /> <path d="M85.1552 11.243V27.3935C85.1552 34.037 81.2319 36.7505 76.5947 36.7505C72.2297 36.7505 69.6024 33.8345 68.6109 31.4495L72.0549 30.017C72.6677 31.4817 74.1699 33.2097 76.5909 33.2097C79.5594 33.2097 81.3984 31.3797 81.3984 27.9372V26.6427H81.2604C80.3754 27.734 78.6699 28.6872 76.5174 28.6872C72.0144 28.6872 67.8887 24.7692 67.8887 19.7277C67.8887 14.6502 72.0137 10.6992 76.5174 10.6992C78.6654 10.6992 80.3717 11.6525 81.2604 12.7107H81.3984V11.2467H85.1552V11.243ZM81.6789 19.7277C81.6789 16.5597 79.5632 14.2445 76.8707 14.2445C74.1422 14.2445 71.8554 16.5597 71.8554 19.7277C71.8554 22.8627 74.1422 25.1465 76.8707 25.1465C79.5632 25.1465 81.6789 22.8627 81.6789 19.7277Z" fill="#4285F4" /> <path d="M91.3397 1.77539V28.1379H87.4824V1.77614L91.3397 1.77539Z" fill="#34A853" /> <path d="M106.385 22.6563L109.456 24.7001C108.464 26.1641 106.077 28.6871 101.951 28.6871C96.8349 28.6871 93.0137 24.7368 93.0137 19.6908C93.0137 14.3411 96.8672 10.6953 101.509 10.6953C106.183 10.6953 108.469 14.4101 109.216 16.4178L109.626 17.4401L97.5857 22.4201C98.5074 24.2253 99.9414 25.1463 101.951 25.1463C103.965 25.1463 105.362 24.1563 106.385 22.6563ZM96.9362 19.4193L104.984 16.0818C104.542 14.9576 103.21 14.1753 101.642 14.1753C99.6324 14.1753 96.8349 15.9476 96.9362 19.4193Z" fill="#EA4335" /> <path d="M14.3097 17.355V13.5375H27.1865C27.3125 14.2027 27.377 14.9895 27.377 15.8415C27.377 18.705 26.5933 22.2457 24.068 24.768C21.611 27.3232 18.4715 28.686 14.3135 28.686C6.60575 28.6875 0.125 22.4175 0.125 14.7188C0.125 7.02 6.60575 0.75 14.3135 0.75C18.5772 0.75 21.6147 2.421 23.897 4.599L21.2008 7.2915C19.5642 5.76 17.3472 4.5675 14.3097 4.5675C8.681 4.5675 4.27925 9.0975 4.27925 14.7195C4.27925 20.3407 8.68175 24.8715 14.3097 24.8715C17.96 24.8715 20.0397 23.4067 21.371 22.077C22.451 20.9978 23.162 19.4565 23.4425 17.352L14.3097 17.3558V17.355Z" fill="#4285F4" /> </g> <defs> <clipPath id="clip0_218_5956"> <rect width="176.25" height="36" fill="white" transform="translate(0.125 0.75)" /> </clipPath> </defs> </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="universal-fs-h6" style={{ color: '#FBBC05', marginRight: 2 }}><StarIcon /></span>
                ))}
                <span className="universal-font-extra-bold universal-fs-h12" style={{ margin: "5px" }}>{googleReviews?.overallRating || 0}/5</span>
              </div>
              <ReviewStars>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} color="#FBBC05" />
                ))}
              </ReviewStars>
              <div className="universal-font-medium universal-fs-h3" style={{ color: '#666' }}>Based on {googleReviews?.totalReviews || 0} Reviews</div>
            </div>
          </OverallReviewContainer>

          <GoogleReviewsGrid>
            {loading ? (
              <div>Loading reviews...</div>
            ) : error ? (
              <EmptyPage title="Failed to load Google Reviews." subtitle={error || 'We\'re working to restore this section. Please check back soon.'} />
            ) : (() => {
              try {
                if (!Array.isArray(googleReviews?.data)) throw new Error('No reviews found');
                return googleReviews?.data?.map((review, idx) => (
                  <GoogleReviewCard key={idx} onClick={() => setSelectedReview(review)}>
                    <div>
                      <ReviewerInfo>
                        <ReviewerAvatar>
                          <img src={review.profilePhoto} alt={review.customerName} loading="lazy" referrerPolicy="no-referrer" />
                        </ReviewerAvatar>
                        <ReviewerDetails>
                          <ReviewerName className='universal-font-bold universal-fs-h3'>{review.customerName}</ReviewerName>
                          <ReviewDate className='universal-fs-h2'>{review.date}</ReviewDate>
                        </ReviewerDetails>
                        <ReviewerTopRightIcon>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M17.1041 8.49792H16.5V8.4668H9.75V11.4668H13.9886C13.3703 13.2132 11.7086 14.4668 9.75 14.4668C7.26487 14.4668 5.25 12.4519 5.25 9.9668C5.25 7.48167 7.26487 5.4668 9.75 5.4668C10.8971 5.4668 11.9408 5.89955 12.7354 6.60642L14.8568 4.48505C13.5173 3.23667 11.7255 2.4668 9.75 2.4668C5.60812 2.4668 2.25 5.82492 2.25 9.9668C2.25 14.1087 5.60812 17.4668 9.75 17.4668C13.8919 17.4668 17.25 14.1087 17.25 9.9668C17.25 9.46392 17.1982 8.97305 17.1041 8.49792Z" fill="#FFC107" />
                            <path d="M3.11523 6.47592L5.57936 8.28305C6.24611 6.6323 7.86086 5.4668 9.75048 5.4668C10.8976 5.4668 11.9412 5.89955 12.7359 6.60642L14.8572 4.48505C13.5177 3.23667 11.726 2.4668 9.75048 2.4668C6.86973 2.4668 4.37148 4.09317 3.11523 6.47592Z" fill="#FF3D00" />
                            <path d="M9.75012 17.4671C11.6874 17.4671 13.4476 16.7257 14.7785 15.5201L12.4572 13.5558C11.6791 14.1479 10.728 14.4681 9.75012 14.4671C7.79937 14.4671 6.14299 13.2232 5.51899 11.4873L3.07324 13.3717C4.31449 15.8006 6.83524 17.4671 9.75012 17.4671Z" fill="#4CAF50" />
                            <path d="M17.1041 8.49792H16.5V8.4668H9.75V11.4668H13.9886C13.6928 12.298 13.16 13.0242 12.456 13.5559L12.4571 13.5552L14.7784 15.5194C14.6141 15.6687 17.25 13.7168 17.25 9.9668C17.25 9.46392 17.1982 8.97305 17.1041 8.49792Z" fill="#1976D2" />
                          </svg>
                        </ReviewerTopRightIcon>
                      </ReviewerInfo>
                      <ReviewStars>
                        {(() => {
                          const fullStars = Math.floor(review.rating);
                          const hasHalfStar = review.rating % 1 >= 0.5;
                          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                          return (
                            <>
                              {[...Array(fullStars)].map((_, i) => (
                                <StarIcon key={"filled-" + i} color="#FBBC05" />
                              ))}
                              {hasHalfStar && <HalfStarIcon key="half" />}
                              {[...Array(emptyStars)].map((_, i) => (
                                <StarIcon key={"empty-" + i} color="#ccc" />
                              ))}
                            </>
                          );
                        })()}
                      </ReviewStars>
                      <ReviewText className='universal-font-medium universal-fs-h3'>
                        {review.review}
                      </ReviewText>
                    </div>
                    <ReadMoreHint className='universal-fs-h2'>Read Full Review <span>→</span></ReadMoreHint>
                  </GoogleReviewCard>
                ));
              } catch (err) {
                return (
                  <>
                    <div className="universal-fs-h4" style={{ color: '#D50F25', textAlign: 'center', margin: '24px 0' }}>{err.message}</div>
                    <EmptyPage title="Failed to load Google Reviews." subtitle={err.message || 'We\'re working to restore this section. Please check back soon.'} />
                  </>
                );
              }
            })()}
          </GoogleReviewsGrid>

        </GoogleReviewsContainer>



        {/* <ViewMoreButton>View All Customer Stories</ViewMoreButton> */}
      </ContentWrapper>

      {/* ── Full Review Popup Modal ── */}
      {selectedReview && (
        <ModalOverlay onClick={() => setSelectedReview(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => setSelectedReview(null)}>&#x2715;</ModalCloseBtn>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '18px', paddingRight: '24px' }}>
              <ReviewerAvatar style={{ width: 56, height: 56, marginRight: 14 }}>
                <img src={selectedReview.profilePhoto} alt={selectedReview.customerName} loading="lazy" referrerPolicy="no-referrer" />
              </ReviewerAvatar>
              <div>
                <ModalReviewerName>{selectedReview.customerName}</ModalReviewerName>
                <ReviewDate className='universal-fs-h2'>{selectedReview.date}</ReviewDate>
              </div>
            </div>

            {/* Stars */}
            <ReviewStars style={{ marginBottom: 14 }}>
              {(() => {
                const fullStars = Math.floor(selectedReview.rating);
                const hasHalfStar = selectedReview.rating % 1 >= 0.5;
                const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                return (
                  <>
                    {[...Array(fullStars)].map((_, i) => <StarIcon key={'f' + i} color="#FBBC05" />)}
                    {hasHalfStar && <HalfStarIcon key="half" />}
                    {[...Array(emptyStars)].map((_, i) => <StarIcon key={'e' + i} color="#ccc" />)}
                  </>
                );
              })()}
            </ReviewStars>

            {/* Full review text */}
            <ModalReviewText className='universal-font-medium universal-fs-h3'>
              {selectedReview.review}
            </ModalReviewText>
          </ModalCard>
        </ModalOverlay>
      )}
    </TestimonialsContainer>
  );
};

export default GoogleReviews;

