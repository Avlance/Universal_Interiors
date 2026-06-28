"use client";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getYoutubeReviews } from '../homeHttpRequest.js';
import EmptyPage from '../../../components/EmptyPage.jsx';

const ReviewsContainer = styled.section`
  margin-bottom: 40px;
  padding: 10px 0 20px 0;
  background-color: #ffffff;
  overflow: hidden;
  perspective: 1200px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 10px 0 10px 0;
  }
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 460px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  
  @media (max-width: 768px) {
    height: 360px;
  }
`;

const NavButton = styled.button`
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 110; /* Must be higher than any card's zIndex */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: #333;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &.left {
    left: -40px;
  }

  &.right {
    right: -40px;
  }

  @media (max-width: 1200px) {
    &.left { left: -10px; }
    &.right { right: -10px; }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    &.left { left: -5px; }
    &.right { right: -5px; }
  }
`;

const ReviewsGrid = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
`;

const ReviewCardWrapper = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  height: 380px;
  width: 320px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  /* Smooth transitions for all properties */
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), 
              opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
              box-shadow 0.3s ease;
              
  transform: translate3d(${props => props.$tx}px, 0, ${props => props.$tz}px) 
             rotateY(${props => props.$ry}deg) 
             scale(${props => props.$scale});
  z-index: ${props => props.$zIndex};
  opacity: ${props => props.$opacity};
  pointer-events: ${props => props.$isActive ? 'auto' : 'none'};

  &:hover {
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 240px;
    height: 300px;
  }
`;

const ReviewImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
    position: relative;
    z-index: 1;
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .place-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    z-index: 3;
    pointer-events: none;
    background: #D50F25;
  }

  ${ReviewCardWrapper}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 140px;
    .play-icon {
      width: 40px;
      height: 40px;
    }
  }
`;

const ReviewContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ReviewerName = styled.h3`
  margin: 0 0 8px 0;
  color: #1a1a1a;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ReviewDescription = styled.p`
  color: #666;
  line-height: 1.5;
  text-align: left;
  margin: 0;
  flex: 1;
  font-size: 14px;
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 4 !important;
  -webkit-box-orient: vertical !important;
  text-overflow: ellipsis !important;
  
  @media (max-width: 768px) {
    font-size: 12px;
    -webkit-line-clamp: 3 !important;
  }
`;

const VideoModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoModalContent = styled.div`
  background: #111;
  border-radius: 12px;
  padding: 0;
  max-width: 90vw;
  max-height: 80vh;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
  padding: 0 8px;
  line-height: 1;
`;

const ResponsiveIframe = styled.iframe`
  width: 70vw;
  height: 40vw;
  max-width: 900px;
  max-height: 500px;
  min-width: 320px;
  min-height: 180px;
  border: none;
  border-radius: 12px;
  background: #000;
`;

const ReviewCard = ({ review, tx, tz, ry, scale, zIndex, opacity, isActive, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const defaultYouTubeImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23f9f9f9'/%3E%3Cpath d='M130 70l60 40-60 40V70z' fill='%23ff0000'/%3E%3C/svg%3E";

  return (
    <ReviewCardWrapper 
      $tx={tx} 
      $tz={tz} 
      $ry={ry} 
      $scale={scale} 
      $zIndex={zIndex} 
      $opacity={opacity}
      $isActive={isActive}
      onClick={onClick}
    >
      <ReviewImage>
        <div className="place-badge universal-fs-h2">{review.place}</div>
        <div className="play-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        </div>
        <img
          src={imageError ? defaultYouTubeImage : review.thumbnail}
          alt={`Review by ${review.reviewerName}`}
          loading="lazy"
          onError={handleImageError}
        />
      </ReviewImage>
      <ReviewContent>
        <ReviewerName className="universal-fs-h4 universal-font-medium">
          {review.reviewerName}
        </ReviewerName>
        <ReviewDescription className="universal-fs-h3">
          {review.reviewDescription}
        </ReviewDescription>
      </ReviewContent>
    </ReviewCardWrapper>
  );
};

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const extractYouTubeId = (url) => {
  const regExp = /^.*(?:youtu.be\/|v=|\/v\/|embed\/|shorts\/|watch\?v=|watch\?.+&v=)([^#&?\n]+).*/;
  const match = url.match(regExp);
  return match?.[1] ? match[1] : null;
};

const YouTubeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getYoutubeReviews();

        if (response?.status === 'OK' && response?.data) {
          setReviews(response?.data);
          setActiveIndex(Math.floor(response.data.length / 2));
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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleCardClick = (index, review) => {
    if (index === activeIndex) {
      setSelectedReview(review);
    } else {
      setActiveIndex(index);
    }
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  if (loading) {
    return (
      <ReviewsContainer>
        <ContentWrapper>
          <LoadingSpinner>Loading YouTube Reviews...</LoadingSpinner>
        </ContentWrapper>
      </ReviewsContainer>
    );
  }

  if (error) {
    return (
      <ReviewsContainer>
        <ContentWrapper>
          <EmptyPage title="Failed to load YouTube Reviews." subtitle={error || 'We\'re working to restore this section. Please check back soon.'} />
        </ContentWrapper>
      </ReviewsContainer>
    );
  }

  try {
    return (
      <>
        <ReviewsContainer>
          <ContentWrapper>
            <SectionHeader>
              <SectionTitle className='universal-fs-h8 universal-font-bold'>
                Checkout some of our <span style={{ color: "#5485EE" }}>customer reviews</span>
              </SectionTitle>
            </SectionHeader>

            <CarouselWrapper>
              <NavButton className="left" onClick={handlePrev} aria-label="Previous">
                <ChevronLeft size={24} />
              </NavButton>
              
              <ReviewsGrid>
                {reviews.map((review, index) => {
                  // Calculate looping offset
                  let offset = index - activeIndex;
                  const half = Math.floor(reviews.length / 2);
                  
                  if (offset > half) offset -= reviews.length;
                  if (offset < -half) offset += reviews.length;
                  
                  const absOffset = Math.abs(offset);
                  const isMobile = windowWidth <= 768;
                  
                  // 3D positioning coordinates
                  const baseSpacing = isMobile ? 100 : 310;
                  const tx = offset * baseSpacing;
                  const tz = absOffset * -160;
                  const ry = offset * -20;
                  const scale = 1 - absOffset * 0.15;
                  const zIndex = 100 - absOffset;
                  
                  // Hide cards that are too far in the background
                  const opacity = absOffset > 2 ? 0 : (absOffset === 2 ? 0.4 : 1);
                  const isActive = offset === 0;

                  return (
                    <ReviewCard
                      key={review.reviewId || index}
                      review={review}
                      tx={tx}
                      tz={tz}
                      ry={ry}
                      scale={scale}
                      zIndex={zIndex}
                      opacity={opacity}
                      isActive={isActive}
                      onClick={() => handleCardClick(index, review)}
                    />
                  );
                })}
              </ReviewsGrid>
              
              <NavButton className="right" onClick={handleNext} aria-label="Next">
                <ChevronRight size={24} />
              </NavButton>
            </CarouselWrapper>
          </ContentWrapper>
        </ReviewsContainer>
        
        {selectedReview && (
          <VideoModalOverlay onClick={handleCloseModal}>
            <VideoModalContent onClick={e => e.stopPropagation()}>
              <VideoCloseButton onClick={handleCloseModal}>&times;</VideoCloseButton>
              {extractYouTubeId(selectedReview.youtubeLink) ? (
                <ResponsiveIframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(selectedReview.youtubeLink)}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : (
                <div style={{ color: '#fff', padding: 40 }}>Invalid YouTube Link</div>
              )}
            </VideoModalContent>
          </VideoModalOverlay>
        )}
      </>
    );
  } catch (err) {
    return (
      <ReviewsContainer>
        <ContentWrapper>
          <EmptyPage title="Failed to load YouTube Reviews." subtitle={err.message || 'We\'re working to restore this section. Please check back soon.'} />
        </ContentWrapper>
      </ReviewsContainer>
    );
  }
};

export default YouTubeReviews;
 

