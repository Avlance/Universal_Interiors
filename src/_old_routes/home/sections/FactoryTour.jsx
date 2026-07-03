"use client";
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const FactoryTourContainer = styled.section`
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
padding: 3rem;
padding-bottom: 5rem;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) -3.99%, rgb(232, 238, 253) 30.25%, rgb(232, 238, 253) 65.14%, rgba(255, 255, 255, 0) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const VideoContainer = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 20px;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  // width: 100%;
  
  /* Calculate width dynamically based on card count */
  
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
  width: 100%;
    gap: 20px;
    padding: 15px;
    max-width: ${props => {
    const cardCount = Math.min(props.$cardCount || 3, 4); // Max 4 cards visible
    const cardWidth = 280;
    const gapWidth = 20;
    const gaps = cardCount - 1;
    return `calc(${cardCount} * ${cardWidth}px + ${gaps} * ${gapWidth}px)`;
  }};
  }
  
  @media (max-width: 480px) {
  width: 100%;
    gap: 15px;
    padding: 10px;
    max-width: ${props => {
    const cardCount = Math.min(props.$cardCount || 3, 4); // Max 4 cards visible
    const cardWidth = 260;
    const gapWidth = 15;
    const gaps = cardCount - 1;
    return `calc(${cardCount} * ${cardWidth}px + ${gaps} * ${gapWidth}px)`;
  }};
  }
`;

const VideoTitle = styled.div`
  color: #fff;
  text-align: left;
  margin-bottom: 4px;
`;

const VideoDescription = styled.div`
  color: #fff;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  padding-right: 60px;
`;

const VideoTextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.85));
  padding: 18px 16px 18px 16px;
  z-index: 5;
  display: flex;
  flex-direction: column;
`;

const BottomRightIcon = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 6;
  display: none;
  align-items: center;
  justify-content: center;

  .active & {
    display: flex;
  }
`;

const VideoPlaceholderWrapper = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    // transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  &.active {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    width: 600px;

    @media (max-width: 768px) {
      width: 280px;
    }

    @media (max-width: 480px) {
      width: 260px;
    }

    .video-svg-icon {
      display: flex;
    }
  }
  
  .video-svg-icon {
      position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: none;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:active img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));
  }
  
  @media (max-width: 1400px) {
    width: 300px;
  }
  
  @media (max-width: 1200px) {
    width: 300px;
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 350px;
  }
  
  @media (max-width: 480px) {
    width: 260px;
    height: 320px;
  }
`;


const videoData = [
  {
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664296/azure_migrated/home-page/tour/360-card-1.webp",
    hoverImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664299/azure_migrated/home-page/tour/360-Minimize-1.webp",
    title: "Urban Heights",
    description: "A modern residential apartment complex with sleek interiors, neutral tones, open layouts, and smart space-saving solutions designed for urban living.",
    altText: "Factory Tour 1"
  },
  {
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664302/azure_migrated/home-page/tour/360-card-2.webp",
    hoverImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664303/azure_migrated/home-page/tour/360-Minimize-2.webp",
    title: "The Heritage Villa",
    description: "A luxury independent home that blends traditional craftsmanship with an ...More",
    altText: "Factory Tour 2"
  },
  {
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664307/azure_migrated/home-page/tour/360-card-3.webp",
    hoverImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664308/azure_migrated/home-page/tour/360-Minimize-3.webp",
    title: "Serenity Retreat",
    description: "Interiors inspired by nature, with earthy textures, soft lighting, indoor green...More",
    altText: "Factory Tour 3"
  }
];

const VideoPlaceholder = ({ image, hoverImage, title, description, altText, isActive, hover }) => {
  const descRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (descRef.current) {
      setShowMore(descRef.current.scrollHeight > descRef.current.clientHeight + 1);
    }
  }, [description, isActive]);

  return (
    <VideoPlaceholderWrapper
      className={isActive ? 'active' : ''}
      onMouseEnter={() => { setIsHovered(true); hover && hover(); }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={isHovered ? hoverImage : image} alt={altText} loading="lazy" />
      <VideoTextContainer>
        <VideoTitle className='universal-font-bold universal-fs-h4'>{title}</VideoTitle>
        <VideoDescription ref={descRef} className='universal-font-medium universal-fs-h2'>
          {description}
          {showMore && <span style={{ color: '#fff', fontWeight: 600 }}>...More</span>}
        </VideoDescription>
      </VideoTextContainer>
      <div className="video-svg-icon">
        <svg width="87" height="57" viewBox="0 0 87 57" fill="none">
          <path d="M43.5003 0.0834961C19.5803 0.0834961 0.166992 9.79016 0.166992 21.7502C0.166992 31.4568 12.907 39.6468 30.5003 42.4202V56.4168L47.8337 39.0835L30.5003 21.7502V33.5802C16.8503 31.1535 8.83366 25.3468 8.83366 21.7502C8.83366 17.1568 22.007 8.75016 43.5003 8.75016C64.9937 8.75016 78.167 17.1568 78.167 21.7502C78.167 24.9135 71.8403 29.9402 60.8337 32.7135V41.5968C76.1303 38.2602 86.8337 30.6335 86.8337 21.7502C86.8337 9.79016 67.4203 0.0834961 43.5003 0.0834961Z" fill="white" />
        </svg>
      </div>
      <BottomRightIcon>
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none">
          <rect x="0.5" y="0.75" width="40" height="40" rx="6" fill="#222222" />
          <path d="M12.5 28.75V24.327H13.5V27.75H16.923V28.75H12.5ZM24.096 28.75V27.75H27.519V24.327H28.519V28.75H24.096ZM12.5 17.173V12.75H16.923V13.75H13.5V17.173H12.5ZM27.52 17.173V13.75H24.096V12.75H28.519V17.173H27.52Z" fill="white" />
        </svg>
      </BottomRightIcon>
    </VideoPlaceholderWrapper>
  );
};



const FactoryTour = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <FactoryTourContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle className='universal-fs-h8 universal-font-bold'>
            Take a Tour of Our <span style={{ color: "#D50F25" }}> Interiors</span>
          </SectionTitle>
          <SectionDescription className='universal-fs-h3 universal-font-medium'>
            Modern Interiors, Hassle-Free Execution
          </SectionDescription>
        </SectionHeader>
        <VideoContainer $cardCount={videoData.length}>
          {videoData.map((video, index) => (
            <VideoPlaceholder
              key={index}
              image={video.image}
              hoverImage={video.hoverImage}
              title={video.title}
              description={video.description}
              altText={video.altText}
              isActive={activeIndex === index}
              hover={() => setActiveIndex(index)}
            />
          ))}
        </VideoContainer>
      </ContentWrapper>
    </FactoryTourContainer>
  );
};

export default FactoryTour;

