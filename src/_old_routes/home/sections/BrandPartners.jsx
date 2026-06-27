"use client";
import React from 'react';
import styled from 'styled-components';

const DesignerInfoContainer = styled.section`
  padding: 0;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    padding: 32px 0 24px 0;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 0 16px 0;
    margin-bottom: 16px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
  
  @media (max-width: 768px) {
    padding: 0 8px;
  }
  @media (max-width: 480px) {
    padding: 0 4px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
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
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0px;
  margin-top: 10px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 16px;
    margin-top: 8px;
  }
`;

const BlogCard = styled.div`
  overflow: hidden;
  padding: 20px;
  text-align: center;
  `;

const BlogImage = styled.div`
  // width: 40px;
  // height: 40px;
  overflow: hidden;
  margin: 0 auto 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`;

const blogPosts = [
  {
    id: 1,
    image: '/images/home/brand-partners/logo-1.webp'
  },
  {
    id: 2,
    image: '/images/home/brand-partners/logo-2.webp'
  },
  {
    id: 3,
    image: '/images/home/brand-partners/logo-3.webp'
  },
  {
    id: 4,
    image: '/images/home/brand-partners/logo-4.webp'
  },
  {
    id: 5,
    image: '/images/home/brand-partners/logo-5.webp'
  },
  {
    id: 6,
    image: '/images/home/brand-partners/logo-6.webp'
  }
];

const DesignerInfo = () => {
  return (
    <DesignerInfoContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle className='universal-fs-h8 universal-font-bold'>
            Our Brand<span style={{ color: "#D50F25" }}> Partners</span>
          </SectionTitle>
          <SectionDescription className='universal-fs-h3 universal-font-medium'>
            With us, you experience the power of ideas, design and craftsmanship come alive.
          </SectionDescription>
        </SectionHeader>


        <BlogGrid>
          {blogPosts.map(post => (
            <BlogCard key={post.id}>
              <BlogImage>
                <img src={post.image} alt={post.title} loading="lazy" />
              </BlogImage>
            </BlogCard>
          ))}
        </BlogGrid>
      </ContentWrapper>
    </DesignerInfoContainer>
  );
};

export default DesignerInfo; 

