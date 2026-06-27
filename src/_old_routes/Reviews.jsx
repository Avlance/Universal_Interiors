"use client";
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import styled from 'styled-components';
import Modal from '../components/modal/js/Modal.jsx';

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

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 30px;
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

const ReviewerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4286F5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  margin-right: 15px;
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

const ProjectType = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 15px;
  display: inline-block;
`;

const Reviews = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      date: 'December 2023',
      rating: 5,
      text: 'Amazing experience with Universal Interiors! They transformed our 2BHK apartment into a beautiful, functional space. The team was professional, punctual, and delivered exactly what we envisioned.',
      projectType: '2BHK Apartment'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      date: 'November 2023',
      rating: 5,
      text: 'Excellent kitchen renovation work. The modular kitchen design is both stylish and practical. The quality of materials used is top-notch and the installation was flawless.',
      projectType: 'Kitchen Renovation'
    },
    {
      id: 3,
      name: 'Anita Patel',
      date: 'October 2023',
      rating: 5,
      text: 'Outstanding service from start to finish. The design team understood our requirements perfectly and created a stunning master bedroom with custom wardrobe. Highly recommended!',
      projectType: 'Master Bedroom'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      date: 'September 2023',
      rating: 5,
      text: 'Professional team with great attention to detail. Our living room transformation exceeded expectations. The cost was reasonable and the timeline was maintained perfectly.',
      projectType: 'Living Room'
    },
    {
      id: 5,
      name: 'Meera Singh',
      date: 'August 2023',
      rating: 5,
      text: 'Fantastic work on our kids bedroom! The space-saving solutions and colorful design made it perfect for our children. The team was patient with our multiple revisions.',
      projectType: 'Kids Bedroom'
    },
    {
      id: 6,
      name: 'Vikram Malhotra',
      date: 'July 2023',
      rating: 5,
      text: 'Complete home interior work done beautifully. From consultation to completion, everything was handled professionally. The quality and finish are exceptional.',
      projectType: 'Complete Home'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index}>
        {index < rating ? '★' : '☆'}
      </Star>
    ));
  };

  return (
    <Layout>
      <PageContent>
        <PageTitle>Customer Reviews</PageTitle>
        <PageDescription>
          Read what our satisfied customers have to say about their experience with Universal Interiors.
          We take pride in delivering exceptional interior design solutions that exceed expectations.
        </PageDescription>

        <ContentSection>
          <h2>What Our Customers Say</h2>
          <p>Discover why homeowners choose Universal Interiors for their interior design projects:</p>
          <ReviewsGrid>
            {reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <ReviewerAvatar>
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </ReviewerAvatar>
                  <ReviewerInfo>
                    <ReviewerName>{review.name}</ReviewerName>
                    <ReviewDate>{review.date}</ReviewDate>
                  </ReviewerInfo>
                </ReviewHeader>
                <StarRating>
                  {renderStars(review.rating)}
                </StarRating>
                <ReviewText>{review.text}</ReviewText>
                <ProjectType>{review.projectType}</ProjectType>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        </ContentSection>

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
          <p>Had a great experience with us? We'd love to hear about it! Share your review and help others discover the quality of our services.</p>
          <button 
            onClick={() => setIsReviewModalOpen(true)}
            style={{
              marginTop: '15px',
              padding: '12px 24px',
              backgroundColor: '#D50F25',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Write a Review
          </button>
        </ContentSection>
      </PageContent>

      <Modal open={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
        <div style={{ padding: '30px', textAlign: 'center', maxWidth: '500px', width: '100%', boxSizing: 'border-box' }}>
          <button 
            onClick={() => setIsReviewModalOpen(false)} 
            style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' }}
          >&times;</button>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Write a Review</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>Thank you for choosing Universal Interiors! Please share your experience.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <input type="text" placeholder="Your Name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' }} />
            <input type="text" placeholder="Project Type (e.g. Kitchen Renovation)" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' }} />
            <textarea placeholder="Your review..." rows="4" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', resize: 'vertical', boxSizing: 'border-box' }}></textarea>
            <button 
              onClick={() => {
                alert('Thank you for your review! It has been submitted for moderation.');
                setIsReviewModalOpen(false);
              }}
              style={{ padding: '14px', backgroundColor: '#4286F5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
            >
              Submit Review
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Reviews;
