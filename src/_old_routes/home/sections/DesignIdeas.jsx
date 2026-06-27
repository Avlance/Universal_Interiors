"use client";
import Button from "../../../components/button/js/Button.jsx";
import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from '@/utils/react-router-dom';
import { fetchAndTransformDesignGallery, fetchAndTransformDesignGalleryItems } from '../../design-gallery/DesignGalleryUtils';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const DesignIdeasContainer = styled.section`
  margin-bottom: 80px;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
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
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--universal-black);
  
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

const TabsWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
  margin-right: 20px;
  margin-left: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    gap: 10px;
    padding: 0 32px;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    padding: 0;
    align-items: center;
  }
`;

const ScrollButton = styled.button`
  height: 40px;
  width: 40px;
  min-width: 40px;
  min-height: 40px;
  background-color: #F2F2F3;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  touch-action: manipulation;
  
  &.left {
    left: 8px;
  }
  &.right {
    right: 8px;
  }
  
  &:hover {
    background-color: #e5e5e5;
    color: #000000;
  }
  
  @media (max-width: 768px) {
    height: 36px;
    width: 36px;
    min-width: 36px;
    min-height: 36px;
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
    min-width: 32px;
    min-height: 32px;
    border-radius: 6px;
    padding: 10px;
  }
`;

const Tab = styled.button`
  height: 40px;
  padding: 0 24px;
  background-color: ${props => props.active ? '#D50F25' : '#F2F2F3'};
  color: ${props => props.active ? '#FFFFFF' : '#000000'};
  border: none;
  border-radius: 8px;
  font-size: var(--universal-fs-h3);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: fit-content;
  
  &:hover {
    background-color: ${props => props.active ? '#D50F25' : '#e5e5e5'};
    color: ${props => props.active ? '#FFFFFF' : '#000000'};
  }
  
  @media (max-width: 768px) {
    height: 36px;
    padding: 0 16px;
    text-align: center;
    align-items: center;
    justify-content: center;
    min-height: 36px;
  }
  
  @media (max-width: 480px) {
    height: 32px;
    padding: 0 12px;
    font-size: var(--universal-fs-h15);
    text-align: center;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }
`;

const DesignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 15px;
    scroll-behavior: smooth;
    width: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    & > * {
      flex-shrink: 0;
    }
  }
  
  @media (max-width: 480px) {
    gap: 15px;
    padding: 10px;
  }
`;

const DesignCard = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  @media (max-width: 768px) {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 1.6px 6px 0px #00000029;
    overflow: hidden;
    width: 250px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  
  @media (max-width: 600px) {
    max-width: 320px;
    height: 270px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 400px) {
    height: 260px;
  }
`;

const DesignImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${DesignCard}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    ${DesignCard}:hover & img {
      transform: scale(1.05);
    }
  }
`;

const DesignInfo = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  // background: rgba(34, 34, 34, 0.85);
  padding: 12px 20px;
  color: white;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 2;

  ${DesignCard}:hover & {
    // opacity: 1;
    // pointer-events: auto;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DesignTitle = styled.h3`
  margin-bottom: 0;
  color: #000000;
  
  @media (max-width: 1024px) {
    margin: 0 0 6px 0;
    color: #1a1a1a;
    text-align: left;
    font-weight: 600;
    line-height: 1.3;
  }
  
  @media (max-width: 768px) {
    margin: 0 0 8px 0;
    color: #1a1a1a;
    text-align: left;
    font-weight: 600;
    line-height: 1.3;
  }
  
  @media (max-width: 640px) {
    margin: 0 0 6px 0;
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    margin: 0 0 6px 0;
    line-height: 1.2;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    border-radius: 4px;
  }
`;

const ImageErrorContainer = styled.div`
  width: 100%;
  height: 100%;
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
    padding: 16px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
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

const DesignContent = styled.div`
  padding: 16px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

// Default category for home page design ideas
const DEFAULT_CATEGORY = 'rooms-and-spaces';

const DesignIdeas = () => {
  const navigate = useNavigate();
  
  // State for dynamic categories and designs
  const [designCategories, setDesignCategories] = useState([]);
  const [dynamicDesigns, setDynamicDesigns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const tabsRef = useRef();
  const designGridRef = useRef();

  // Image loading state
  const [failedImages, setFailedImages] = useState(new Set());

  // Fetch design gallery data and populate categories
  useEffect(() => {
    const loadDesignGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchAndTransformDesignGallery();

        if (result.data && result.data.length > 0) {
          // Find the matching category from API data
          const matchingCategory = result.data.find(cat => cat.category === DEFAULT_CATEGORY);

          if (matchingCategory) {
            // Extract category items as tab names
            const categoryNames = matchingCategory.designs.map(design => design.title);
            setDesignCategories(categoryNames);

            // Set first category as active tab
            if (categoryNames.length > 0) {
              setActiveTab(categoryNames[0]);
            }
          } else {
            // No matching category found
            setError('Design category not found');
          }
        } else {
          // No data received from API
          setError('No design gallery data available');
        }
      } catch (err) {
        setError('Failed to load design gallery data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDesignGalleryData();
  }, []);

  // Function to fetch design items for a specific tab
  const fetchDesignItemsForTab = async (tabName) => {
    if (dynamicDesigns[tabName] && dynamicDesigns[tabName].length > 0) {
      // Already loaded, no need to fetch again
      return;
    }

    // Reset image loading states for new data
    setFailedImages(new Set());

    try {
      // Convert tab name to URL-friendly format
      const subCategory = tabName.toLowerCase().replace(/\s+/g, '-');

      console.log('Fetching designs for:', { category: DEFAULT_CATEGORY, subCategory, tabName });

      const result = await fetchAndTransformDesignGalleryItems(DEFAULT_CATEGORY, subCategory);

      console.log('Fetch result:', result);

      if (result.data && result.data.length > 0) {
        console.log('Setting designs for tab:', tabName, result.data);
        setDynamicDesigns(prev => ({
          ...prev,
          [tabName]: result.data
        }));
      } else {
        console.log('No data received for tab:', tabName);
        // No data from API, set empty array
        setDynamicDesigns(prev => ({
          ...prev,
          [tabName]: []
        }));
      }
    } catch (err) {
      console.error('Error fetching designs for tab:', tabName, err);
      // Set empty array on error
      setDynamicDesigns(prev => ({
        ...prev,
        [tabName]: []
      }));
    }
  };

  // Fetch design items when active tab changes
  useEffect(() => {
    if (activeTab) {
      fetchDesignItemsForTab(activeTab);
    }
  }, [activeTab]);

  const filteredDesigns = (dynamicDesigns[activeTab] || []).slice(0, 10);

  // Ensure mobile scroll starts at the beginning when designs are loaded
  useEffect(() => {
    if (filteredDesigns.length > 0 && designGridRef.current) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Force scroll to start position on mobile
        designGridRef.current.scrollLeft = 0;
      }
    }
  }, [filteredDesigns]);

  // Reset scroll position to 0 when activeTab changes
  useEffect(() => {
    const resetScroll = () => {
      if (designGridRef.current) {
        // Only reset scroll on desktop/tablet (grid layout), not on mobile (horizontal scroll)
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
          designGridRef.current.scrollLeft = 0;
        }
      }
    };

    // Immediate reset
    resetScroll();

    // Additional reset after a short delay to ensure it works
    const timeoutId = setTimeout(resetScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [activeTab]); // Add activeTab to dependency array

  // Reset scroll position when component mounts
  useEffect(() => {
    const resetScroll = () => {
      if (designGridRef.current) {
        // Only reset scroll on desktop/tablet (grid layout), not on mobile (horizontal scroll)
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
          designGridRef.current.scrollLeft = 0;
        }
      }
    };

    // Immediate reset
    resetScroll();

    // Additional reset after a short delay
    const timeoutId = setTimeout(resetScroll, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleImageError = (imageId) => {
    setFailedImages(prev => new Set([...prev, imageId]));
  };

  const handleTabClick = (category) => {
    setActiveTab(category);

    // Reset image loading states for new tab
    setFailedImages(new Set());

    // Force scroll reset after tab change (only on desktop/tablet)
    setTimeout(() => {
      if (designGridRef.current) {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
          designGridRef.current.scrollLeft = 0;
        }
      }
    }, 50);
  };

  const scrollTabs = (dir) => {
    if (tabsRef.current) {
      const scrollAmount = 120;
      tabsRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSeeMoreDesigns = () => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate('/design-gallery');
  };

  return (
    <DesignIdeasContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle className='universal-fs-h8 universal-font-bold'>
            Design Ideas for  <span style={{ color: "#5485EE" }}> Every Space</span>
          </SectionTitle>
          <SectionDescription className='universal-fs-h3 universal-font-medium'>
            Because every corner holds a unique design potential.
          </SectionDescription>
        </SectionHeader>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '16px', color: '#666' }}>Loading design categories...</div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '16px', color: '#d50f25' }}>{error}</div>
          </div>
        ) : designCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '16px', color: '#666' }}>No design categories available</div>
          </div>
        ) : (
          <>
            <TabsWrapper>
              <ScrollButton className="left" onClick={() => scrollTabs('left')} aria-label="Scroll left">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.25 15L6.75 9L11.25 3" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </ScrollButton>
              <TabsContainer ref={tabsRef}>
                {designCategories.map(category => (
                  <Tab className='universal-fs-h15 universal-font-medium'
                    key={category}
                    active={activeTab === category}
                    onClick={() => handleTabClick(category)}
                  >
                    {category}
                  </Tab>
                ))}
              </TabsContainer>
              <ScrollButton className="right" onClick={() => scrollTabs('right')} aria-label="Scroll right">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 3L11.25 9L6.75 15" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </ScrollButton>
            </TabsWrapper>

            <DesignGrid ref={designGridRef} key={activeTab}>
              {filteredDesigns.length === 0 ? (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '40px 0',
                  fontSize: '16px',
                  color: '#666'
                }}>
                  {activeTab ? 'Loading designs...' : 'Select a category to view designs'}
                </div>
              ) : (
                filteredDesigns.map(design => {
                  const isImageFailed = failedImages.has(design.id);

                  return (
                    <DesignCard key={design.id}>
                      <DesignImage>
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
                            src={design.image}
                            alt={design.title}
                            loading="lazy"
                            onError={() => handleImageError(design.id)}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                        )}
                      </DesignImage>
                      <DesignContent>
                        <DesignTitle className='universal-fs-h4 universal-font-semibold'>{design.title}</DesignTitle>
                      </DesignContent>
                      <DesignInfo>
                        <DesignTitle className='universal-fs-h3 universal-font-semibold'>{design.title}</DesignTitle>
                      </DesignInfo>
                    </DesignCard>
                  );
                })
              )}
            </DesignGrid>
          </>
        )}

        <ButtonContainer>
          <Button primary onClick={handleSeeMoreDesigns}>See More Designs</Button>
        </ButtonContainer>
      </ContentWrapper>
    </DesignIdeasContainer>
  );
};

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;

`;

export default DesignIdeas;


