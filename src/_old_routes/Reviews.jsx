"use client";
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import styled from 'styled-components';

const PageContent = styled.div`
  padding: 40px 20px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  
  @media (max-width: 1024px) {
    padding: 30px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #222222;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #666666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ContentSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const OverallRatingBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 12px;
    padding: 16px;
  }
`;

const RatingNumber = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: #222;

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
  font-size: 1.6rem;
  color: #ffc107;
`;

const TotalReviews = styled.span`
  font-size: 1rem;
  color: #666;
`;

const GoogleBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #444;
  font-weight: 500;

  img {
    width: 20px;
    height: 20px;
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ReviewerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  background: #4286F5;
`;

const ReviewerInfo = styled.div`
  flex: 1;
`;

const ReviewerName = styled.h4`
  margin: 0;
  color: #222222;
  font-size: 1.1rem;
`;

const ReviewDate = styled.p`
  margin: 5px 0 0 0;
  color: #666666;
  font-size: 0.9rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 15px;
`;

const Star = styled.span`
  color: #ffc107;
  font-size: 1.2rem;
`;

const ReviewText = styled.p`
  color: #444444;
  line-height: 1.6;
  margin: 0;
`;

const WriteReviewButton = styled.a`
  display: inline-block;
  margin-top: 15px;
  padding: 12px 24px;
  background-color: #D50F25;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b00d1f;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.1rem;
  color: #666;
`;

const Reviews = () => {
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setReviewData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
      });
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index}>
        {index < rating ? '★' : '☆'}
      </Star>
    ));
  };

  const renderOverallStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalf) stars.push('★');
    while (stars.length < 5) stars.push('☆');
    return stars.join('');
  };

  const googleWriteReviewUrl = reviewData?.placeId
    ? `https://search.google.com/local/writereview?placeid=${reviewData.placeId}`
    : '#';

  return (
    <Layout>
      <PageContent>
        <PageTitle>Customer Reviews</PageTitle>
        <PageDescription>
          Read what our satisfied customers have to say about their experience with Universal Interiors.
          We take pride in delivering exceptional interior design solutions that exceed expectations.
        </PageDescription>

        {loading && (
          <LoadingSpinner>Loading Google Reviews...</LoadingSpinner>
        )}

        {error && (
          <ContentSection>
            <p style={{ color: '#999', textAlign: 'center' }}>{error}</p>
          </ContentSection>
        )}

        {reviewData && (
          <>
            <OverallRatingBanner>
              <RatingNumber>{reviewData.overallRating}</RatingNumber>
              <div>
                <RatingStars>{renderOverallStars(reviewData.overallRating)}</RatingStars>
                <TotalReviews>{reviewData.totalReviews} Google Reviews</TotalReviews>
              </div>
              <GoogleBadge>
                <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                Verified Google Reviews
              </GoogleBadge>
            </OverallRatingBanner>

            <ContentSection>
              <h2>What Our Customers Say</h2>
              <p>Real reviews from our valued customers on Google:</p>
              <ReviewsGrid>
                {reviewData.reviews.map((review, index) => (
                  <ReviewCard key={index}>
                    <ReviewHeader>
                      <ReviewerAvatar
                        src={review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=random`}
                        alt={review.author_name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=random`;
                        }}
                      />
                      <ReviewerInfo>
                        <ReviewerName>{review.author_name}</ReviewerName>
                        <ReviewDate>{review.relative_time_description}</ReviewDate>
                      </ReviewerInfo>
                    </ReviewHeader>
                    <StarRating>
                      {renderStars(review.rating)}
                    </StarRating>
                    <ReviewText>{review.text}</ReviewText>
                  </ReviewCard>
                ))}
              </ReviewsGrid>
            </ContentSection>
          </>
        )}

        <ContentSection>
          <h2>Why Choose Universal Interiors?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <h3>Expert Design Team</h3>
              <p>Our experienced designers understand your vision and translate it into beautiful, functional spaces.</p>
            </div>
            <div>
              <h3>Quality Materials</h3>
              <p>We use only premium materials and work with trusted vendors to ensure lasting quality.</p>
            </div>
            <div>
              <h3>Timely Delivery</h3>
              <p>We respect your time and complete projects within the agreed timeline without compromising quality.</p>
            </div>
            <div>
              <h3>Customer Satisfaction</h3>
              <p>Your satisfaction is our priority. We work closely with you throughout the project to ensure perfect results.</p>
            </div>
          </div>
        </ContentSection>

        <ContentSection>
          <h2>Share Your Experience</h2>
          <p>Had a great experience with us? We'd love to hear about it! Leave us a review on Google and help others discover the quality of our services.</p>
          <WriteReviewButton
            href={googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Write a Review on Google
          </WriteReviewButton>
        </ContentSection>
      </PageContent>
    </Layout>
  );
};

export default Reviews;
