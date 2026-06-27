"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getYoutubeReviews } from '../homeHttpRequest.js';
import EmptyPage from '../../../components/EmptyPage.jsx';

const ReviewsContainer = styled.section`
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
  // max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const SectionHeader = styled.div`
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1a1a1a;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const ReviewsGrid = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 20px;
  scroll-behavior: smooth;
  width: 100%;
  
  /* Calculate width dynamically based on card count */
  max-width: ${props => {
    const cardCount = Math.min(props.$cardCount, 4); // Max 4 cards visible
    const cardWidth = 280;
    const gapWidth = 30;
    const gaps = cardCount - 1;
    return `calc(${cardCount} * ${cardWidth}px + ${gaps} * ${gapWidth}px)`;
  }};
  margin: 0 auto;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  /* Ensure cards don't shrink */
  & > * {
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    padding: 15px;
    max-width: ${props => {
    const cardCount = Math.min(props.$cardCount, 4); // Max 4 cards visible
    const cardWidth = 260;
    const gapWidth = 20;
    const gaps = cardCount - 1;
    return `calc(${cardCount} * ${cardWidth}px + ${gaps} * ${gapWidth}px)`;
  }};
  }
`;

const ReviewCardWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 1.6px 6px 0px #00000029;

  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 320px;
  width: 270px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 1400px) {
    width: 270px;
  }
  
  @media (max-width: 1200px) {
    width: 270px;
  }
  
  @media (max-width: 768px) {
    width: 260px;
    height: 300px;
  }
  
  @media (max-width: 480px) {
    width: 240px;
    height: 280px;
  }
`;

const ReviewImage = styled.div`
  width: 100%;
  height: 180px;
  // overflow: hidden;
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
    height: 160px;
    
    .play-icon {
      width: 45px;
      height: 45px;
    }
    
    .place-badge {
      font-size: 10px;
      padding: 3px 6px;
    }
  }
  
  @media (max-width: 480px) {
    height: 140px;
    
    .play-icon {
      width: 40px;
      height: 40px;
    }
    
    .place-badge {
      font-size: 9px;
      padding: 2px 5px;
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
    padding: 14px;
  }
  
  @media (max-width: 480px) {
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
    font-size: 13px;
    -webkit-line-clamp: 2 !important;
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

const ReviewCard = ({ review, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    if (onClick) onClick(review);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const defaultYouTubeImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23f9f9f9'/%3E%3Cpath d='M130 70l60 40-60 40V70z' fill='%23ff0000'/%3E%3C/svg%3E";

  return (
    <ReviewCardWrapper onClick={handleCardClick}>
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
  // Handles standard and share URLs
  const regExp = /^.*(?:youtu.be\/|v=|\/v\/|embed\/|shorts\/|watch\?v=|watch\?.+&v=)([^#&?\n]+).*/;
  const match = url.match(regExp);
  return match?.[1] ? match[1] : null;
};

const YouTubeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getYoutubeReviews();

        if (response?.status === 'OK' && response?.data) {
          setReviews(response?.data);
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

  const handleCardClick = (review) => {
    setSelectedReview(review);
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

  // Try-catch for rendering reviews (in case of malformed data)
  try {
    return (
      <ReviewsContainer>
        <ContentWrapper>
          <SectionHeader>
            <SectionTitle className='universal-fs-h8 universal-font-bold'>
              Checkout some of our <span style={{ color: "#5485EE" }}>customer reviews</span>
            </SectionTitle>
          </SectionHeader>

          <ReviewsGrid $cardCount={reviews.length}>
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.reviewId || index}
                review={review}
                onClick={handleCardClick}
              />
            ))}
          </ReviewsGrid>
        </ContentWrapper>
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
      </ReviewsContainer>
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

