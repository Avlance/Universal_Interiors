"use client";
import React, { useState, useEffect } from 'react';
import { Link } from '@/utils/react-router-dom';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import styled, { keyframes } from 'styled-components';
import { fetchAndTransformDesignGallery } from './DesignGalleryUtils';
import ConsultationFormContent from '@/_old_routes/home/ConsultationFormContent.jsx';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const PageContent = styled.div`
  padding: 0px;
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

const CategorySection = styled.section`
  margin-bottom: 40px;
  padding: 0;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 50px;
  }
  @media (max-width: 480px) {
    padding: 0;
    margin-bottom: 50px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const SectionTitle = styled.h2`
  padding-left: 10px;
  color: #1a1a1a;
  margin-bottom: 15px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const SectionDescription = styled.p`
  color: #222222;
  margin: 0 auto 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ServicesGrid = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 10px;
  scroll-behavior: smooth;
  width: 100%;
   
  /* Calculate width dynamically based on card count */
  max-width: ${props => {
    const cardCount = Math.min(props.$cardCount || 5, 5); // Max 5 cards visible
    const cardWidth = 270;
    const gapWidth = 30;
    const gaps = cardCount - 1;
    return `calc(${cardCount} * ${cardWidth}px + ${gaps} * ${gapWidth}px)`;
  }};
  /* margin: 0 auto; */
  margin-bottom: 0px;

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
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
    padding: 10px;
    margin-bottom: 30px;
  }
`;

const GradientBackground = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) -3.99%, rgb(232, 238, 253) 30.25%, rgb(232, 238, 253) 65.14%, rgba(255, 255, 255, 0) 100%);
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

const ServiceCard = ({ image, title, description, link, fill = "#5485EE" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setImageFailed(true);
  };

  const showSkeleton = !imageLoaded && !imageFailed;

  return (
    <ServiceCardWrapper>
      <ServiceImage>
        {showSkeleton ? (
          <SkeletonImage />
        ) : imageFailed ? (
          <ImageErrorContainer>
            <ErrorIcon>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor" />
              </svg>
            </ErrorIcon>
            <ErrorText>Image failed to load</ErrorText>
          </ImageErrorContainer>
        ) : null}
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            opacity: (showSkeleton || imageFailed) ? 0 : 1,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </ServiceImage>
      <ServiceContent>
        <ServiceTitle className="universal-fs-h4 universal-font-medium">{title}</ServiceTitle>
        <ServiceDescription className="universal-fs-h3">{description}</ServiceDescription>
        <ServiceIconWrapper>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" >
            <rect x="0.25" width="32" height="32" rx="16" fill={fill} />
            <g clipPath="url(#clip0_93_237)">
              <path d="M14.2344 10L12.8281 11.4062L17.4219 16L12.8281 20.5938L14.2344 22L20.2344 16L14.2344 10Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_93_237">
                <rect width="24" height="24" fill="white" transform="translate(4.25 4)" />
              </clipPath>
            </defs>
          </svg>
        </ServiceIconWrapper>
      </ServiceContent>
    </ServiceCardWrapper>
  );
};

const ServiceCardWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 1.6px 6px 0px #00000029;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 1.6px 6px 0px #00000029;
  }

  @media (max-width: 900px) {
    height: 360px;
  }

  @media (max-width: 600px) {
    max-width: 320px;
    height: 350px;
    margin-bottom: 24px;
    &:hover {
      transform: none;
      box-shadow: 0px 1.6px 6px 0px #00000029;
    }
  }

  @media (max-width: 400px) {
    height: 260px;
  }
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  ${ServiceCardWrapper}:hover & img {
    transform: scale(1.05);
  }
`;

const ServiceContent = styled.div`
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const ServiceTitle = styled.h3`
  margin-bottom: 0px;
  color: #1a1a1a;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ServiceIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;

  @media (max-width: 768px) {
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    margin-top: 8px;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
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
`;

const ErrorText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  line-height: 1.4;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #4286F5 0%, #D50F25 100%);
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(66, 134, 245, 0.3);
  }
`;

const DesignGallery = () => {
  const [designCategories, setDesignCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDesignGallery = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors

        const result = await fetchAndTransformDesignGallery();

        setDesignCategories(result.data);
        setError(result.error);
      } catch (err) {
        console.error('Error in loadDesignGallery:', err);
        setError('Failed to load design gallery. Please try again later.');
        setDesignCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadDesignGallery();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Breadcrumb />
        <PageContent>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading design gallery...</p>
          </div>
        </PageContent>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Breadcrumb />
        <PageContent>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        </PageContent>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb />
      <PageContent>
        <SectionHeader>
          <SectionTitle className="universal-fs-h8 universal-font-bold">
            Explore Our <span style={{ color: "#5485EE" }}>Design Gallery</span>
          </SectionTitle>
          <SectionDescription className="universal-fs-h3 universal-font-medium">
            Select a category to explore design options and book a meeting with our experts.
          </SectionDescription>
        </SectionHeader>

        {designCategories.map((category) => (
          <CategorySection key={category.title}>
            <ContentWrapper>
              <SectionHeader>
                <SectionTitle className="universal-fs-h6 universal-font-bold" style={{ textAlign: 'left', color: '#D50F25', marginBottom: '5px' }}>{category.title}</SectionTitle>
              </SectionHeader>
              <ServicesGrid $cardCount={category.designs.length}>
                {category.designs.map((design, index) => {
                  const colors = ['#D50F25', '#559944', '#FAC73D', '#5485EE'];
                  const fillColor = colors[index % colors.length];
                  
                  return (
                    <StyledLink
                      key={design.title}
                      to={design.link}
                    >
                      <ServiceCard
                        image={design.previewImage}
                        title={design.title}
                        description={design.description}
                        link={design.link}
                        fill={fillColor}
                      />
                    </StyledLink>
                  );
                })}
              </ServicesGrid>
            </ContentWrapper>
          </CategorySection>
        ))}
      </PageContent>

      <GradientBackground>
        <ConsultationFormContent />
      </GradientBackground>
    </Layout>
  );
};

export default DesignGallery; 


