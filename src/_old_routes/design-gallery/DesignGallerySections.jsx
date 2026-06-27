"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from '@/utils/react-router-dom';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import ConsultationFormContent from '@/_old_routes/home/ConsultationFormContent.jsx';
import EmptyPage from '../../components/EmptyPage.jsx';
import SkeletonLoader from '../../components/SkeletonLoader.jsx';
import styled, { keyframes } from 'styled-components';
import { fetchAndTransformDesignGallery, fetchAndTransformDesignGalleryItems } from './DesignGalleryUtils';
import ParticularDesignGallery from './ParticularDesignGallery';

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
  min-height: 450px;
  
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 40px;
    min-height: 270px;
  }
  @media (max-width: 480px) {
    padding: 0;
    margin-bottom: 30px;
    min-height: 300px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--universal-black);
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

const SectionDescription = styled.p`
  color: #222222;
  margin: 0 auto 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    margin: 0 auto 20px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    margin: 0 auto 16px;
    font-size: 14px;
  }
`;

const TabsWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
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
  margin: auto;
  padding: 0 10px;

  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    gap: 8px;
    padding: 0 8px;
    margin: 0;
    width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    padding: 0 4px;
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
    font-size: 14px;
    text-align: center;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    height: 32px;
    padding: 0 12px;
    font-size: 13px;
    text-align: center;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    border-radius: 6px;
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

const DesignGrid = styled.div`
  display: ${props => props.showEmptyPage ? 'flex' : 'grid'};
  ${props => !props.showEmptyPage && `
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    
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
  `}
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
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

const BookmarkIcon = styled.div`
  display: none;
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

const DesignTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #222222;
  
  @media (max-width: 768px) {
    margin-bottom: 0px;
    color: #1a1a1a;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

const DesignDescription = styled.p`
  margin: 0;
  color: #666666;
  font-size: 0.9rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    color: #666;
    line-height: 1.6;
    text-align: center;
    font-size: 13px;
  }
`;



const DesignInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px 16px 16px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${DesignCard}:hover & {
  }
  
  @media (max-width: 768px) {
    padding: 16px 12px 12px;
    
    ${DesignCard}:hover & {
      transform: translateY(100%);
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px 10px 10px;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    height: 160px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    height: 140px;
    border-radius: 4px;
  }
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
  
  @media (max-width: 768px) {
    height: 160px;
    padding: 16px;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    height: 140px;
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

const SkeletonTitle = styled.div`
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  width: 80%;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    height: 18px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    height: 16px;
    margin-bottom: 4px;
  }
`;

const SkeletonDescription = styled.div`
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  width: 60%;
  
  @media (max-width: 768px) {
    height: 14px;
  }
  
  @media (max-width: 480px) {
    height: 12px;
  }
`;

const MobileOptimizedCard = styled.div`
  @media (max-width: 768px) {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

const DesignGallerySections = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the path segments to determine what content to show
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // State for dynamic categories and designs
  const [designCategories, setDesignCategories] = useState([]);
  const [dynamicDesigns, setDynamicDesigns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Infinite scroll state
  const [hasMore, setHasMore] = useState({});
  const [loadingMore, setLoadingMore] = useState({});
  const [offsets, setOffsets] = useState({});

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  // Image loading state
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  const getActiveTabFromUrl = () => {
    if (pathSegments.length === 0) return null;

    // If URL only has main category (e.g., /design-gallery/rooms-and-spaces), activate the first tab
    if (pathSegments.length === 2 && pathSegments[0] === 'design-gallery') {
      return designCategories.length > 0 ? designCategories[0] : null;
    }

    // Use the last path segment to determine the active tab
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Find the matching category item by subCategory
    const matchingCategoryItem = designCategories.find(category => {
      // Convert category name to URL-friendly format for comparison
      const urlFriendlyName = category.toLowerCase().replace(/\s+/g, '-');
      return urlFriendlyName === lastSegment;
    });

    if (matchingCategoryItem) {
      return matchingCategoryItem;
    }

    // If no matching tab found, activate the first tab as fallback
    return designCategories.length > 0 ? designCategories[0] : null;
  };

  const [activeTab, setActiveTab] = useState(null);
  const tabsRef = useRef();
  const designGridRef = useRef();
  const observerRef = useRef();

  // Get current category from URL
  const getCurrentCategory = () => {
    if (pathSegments.length >= 2 && pathSegments[0] === 'design-gallery') {
      return pathSegments[1]; // e.g., 'rooms-and-spaces'
    }
    return 'rooms-and-spaces'; // default fallback
  };

  // Fetch design gallery data and populate categories
  useEffect(() => {
    const loadDesignGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchAndTransformDesignGallery();

        if (result.data && result.data.length > 0) {
          const currentCategory = getCurrentCategory();

          // Find the matching category from API data
          const matchingCategory = result.data.find(cat => cat.category === currentCategory);

          if (matchingCategory) {
            // Extract category items as tab names
            const categoryNames = matchingCategory.designs.map(design => design.title);
            setDesignCategories(categoryNames);

            // Initialize empty designs object - will be populated when tabs are clicked
            const designsForCategory = {};
            categoryNames.forEach(categoryName => {
              designsForCategory[categoryName] = [];
            });
            // setDynamicDesigns(designsForCategory);
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
  }, [location.pathname]); // Re-run when URL changes

  // Function to fetch design items for a specific tab
  const fetchDesignItemsForTab = async (tabName, isLoadMore = false) => {
    if (!isLoadMore && dynamicDesigns[tabName] && dynamicDesigns[tabName].length > 0) {
      // Already loaded, no need to fetch again
      return;
    }

    // Don't load more if already loading or no more data
    if (isLoadMore && (loadingMore[tabName] || !hasMore[tabName])) {
      return;
    }

    // Set loading state
    if (isLoadMore) {
      setLoadingMore(prev => ({ ...prev, [tabName]: true }));
    } else {
      // Reset image loading states for new data
      setLoadedImages(new Set());
      setFailedImages(new Set());
    }

    try {
      const currentCategory = getCurrentCategory();
      const subCategory = tabName.toLowerCase().replace(/\s+/g, '-');
      const currentOffset = isLoadMore ? (offsets[tabName] || 0) : 0;

      console.log('Fetching designs for:', { 
        category: currentCategory, 
        subCategory, 
        tabName, 
        offset: currentOffset,
        isLoadMore 
      });

      const result = await fetchAndTransformDesignGalleryItems(currentCategory, subCategory, currentOffset);

      console.log('Fetch result:', result);

      if (result.data && result.data.length > 0) {
        console.log('Setting designs for tab:', tabName, result.data);
        
        if (isLoadMore) {
          // Append to existing data
          setDynamicDesigns(prev => ({
            ...prev,
            [tabName]: [...(prev[tabName] || []), ...result.data]
          }));
        } else {
          // Replace existing data
          setDynamicDesigns(prev => ({
            ...prev,
            [tabName]: result.data
          }));
        }

        // Update pagination state
        setHasMore(prev => ({ ...prev, [tabName]: result.hasMore }));
        setOffsets(prev => ({ 
          ...prev, 
          [tabName]: currentOffset + result.data.length 
        }));
      } else {
        console.log('No data received for tab:', tabName);
        if (!isLoadMore) {
          // Only set empty array for initial load
          setDynamicDesigns(prev => ({
            ...prev,
            [tabName]: []
          }));
        }
        setHasMore(prev => ({ ...prev, [tabName]: false }));
      }
    } catch (err) {
      console.error('Error fetching designs for tab:', tabName, err);
      if (!isLoadMore) {
        // Only set empty array for initial load
        setDynamicDesigns(prev => ({
          ...prev,
          [tabName]: []
        }));
      }
    } finally {
      if (isLoadMore) {
        setLoadingMore(prev => ({ ...prev, [tabName]: false }));
      }
    }
  };


  // Combined effect to handle active tab updates and design fetching
  useEffect(() => {
    // Update active tab when route or categories change
    const newActiveTab = getActiveTabFromUrl();
    setActiveTab(newActiveTab);

    // Fetch design items when active tab changes and categories are loaded
    if (newActiveTab && designCategories.length > 0) {
      fetchDesignItemsForTab(newActiveTab);
    }

    // Auto-navigate to first tab if we're on main category URL and categories are loaded
    if (pathSegments.length === 2 && pathSegments[0] === 'design-gallery' && designCategories.length > 0) {
      const firstTab = designCategories[0];
      const urlSegment = firstTab.toLowerCase().replace(/\s+/g, '-');
      const mainCategory = pathSegments[1];
      const newUrl = `/design-gallery/${mainCategory}/${urlSegment}`;
      navigate(newUrl, { replace: true }); // Use replace to avoid adding to history
    }
  }, [location.pathname, designCategories]);


  const filteredDesigns = dynamicDesigns[activeTab] || [];

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!activeTab || !hasMore[activeTab] || loadingMore[activeTab]) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore[activeTab] && !loadingMore[activeTab]) {
          console.log('Loading more designs for:', activeTab);
          fetchDesignItemsForTab(activeTab, true);
        }
      },
      {
        root: null,
        rootMargin: '100px', // Start loading 100px before reaching the bottom
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    // Observe the last design card for infinite scrolling
    const designCards = document.querySelectorAll('[data-design-card]');
    if (designCards.length > 0) {
      const lastCard = designCards[designCards.length - 1];
      observer.observe(lastCard);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeTab, hasMore[activeTab], loadingMore[activeTab], filteredDesigns.length]);

  // Reset scroll position when activeTab changes or component mounts
  useEffect(() => {
    const resetScroll = () => {
      if (designGridRef.current) {
        designGridRef.current.scrollLeft = 0;
      }
    };

    // Immediate reset
    resetScroll();

    // Additional reset after a short delay to ensure it works
    const timeoutId = setTimeout(resetScroll, 100);

    return () => clearTimeout(timeoutId);
  }, [activeTab]);

  const handleTabClick = (category) => {
    setActiveTab(category);

    // Convert category name to URL-friendly format
    const urlSegment = category.toLowerCase().replace(/\s+/g, '-');

    // Get the current main category from the URL
    // For /design-gallery/rooms-and-spaces, pathSegments = ['design-gallery', 'rooms-and-spaces']
    let mainCategory = 'rooms-and-spaces'; // default fallback

    if (pathSegments.length === 2 && pathSegments[0] === 'design-gallery') {
      // URL is /design-gallery/rooms-and-spaces
      mainCategory = pathSegments[1];
    } else if (pathSegments.length >= 3 && pathSegments[0] === 'design-gallery') {
      mainCategory = pathSegments[1];
    }

    // Navigate to the new URL
    const newUrl = `/design-gallery/${mainCategory}/${urlSegment}`;
    navigate(newUrl);

    // Force scroll reset after tab change
    setTimeout(() => {
      if (designGridRef.current) {
        designGridRef.current.scrollLeft = 0;
      }
    }, 50);
  };

  const handleDesignCardClick = (design) => {
    setSelectedDesign(design);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDesign(null);
  };

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const handleImageError = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
    setFailedImages(prev => new Set([...prev, imageId]));
  };

  // const scrollTabs = (dir) => {
  //   if (tabsRef.current) {
  //     const scrollAmount = 120;
  //     tabsRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  //   }
  // };

  // Show error state
  if (error) {
    return (
      <Layout>
        <Breadcrumb />
        <DesignIdeasContainer>
          <ContentWrapper>
            <EmptyPage
              title="Failed to load Design Gallery"
              subtitle={error || 'We\'re working to restore this section. Please check back soon.'}
            />
          </ContentWrapper>
        </DesignIdeasContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb />
      <DesignIdeasContainer>
        <ContentWrapper>
          <TabsWrapper>
            {/* <ScrollButton className="left" onClick={() => scrollTabs('left')} aria-label="Scroll left">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.25 15L6.75 9L11.25 3" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </ScrollButton> */}
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
            {/* <ScrollButton className="right" onClick={() => scrollTabs('right')} aria-label="Scroll right">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 3L11.25 9L6.75 15" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </ScrollButton> */}
          </TabsWrapper>

          {loading ? (
            <DesignGrid
              ref={designGridRef}
              key="skeleton"
              showEmptyPage={false}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <DesignCard key={`skeleton-${index}`}>
                  <DesignImage>
                    <SkeletonImage />
                    <BookmarkIcon>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M11.5215 13.9562L6.92773 10.8062L2.33398 13.9562V0H11.5215V13.9562ZM6.92773 9.75625L10.6465 12.2938V0.875H3.20898V12.2938L6.92773 9.75625Z" fill="#272626" /> </svg>
                    </BookmarkIcon>
                  </DesignImage>
                  <DesignContent>
                    <SkeletonTitle />
                  </DesignContent>
                  <DesignInfo>
                    <SkeletonTitle />
                  </DesignInfo>
                </DesignCard>
              ))}
            </DesignGrid>
          ) : (
            <DesignGrid
              ref={designGridRef}
              key={activeTab}
              showEmptyPage={
                !activeTab ||
                (!!activeTab &&
                  dynamicDesigns[activeTab] !== undefined &&
                  Array.isArray(dynamicDesigns[activeTab]) &&
                  dynamicDesigns[activeTab].length === 0)
              }
            >
              {!activeTab ? (
                <div style={{ textAlign: 'center', padding: '50px', width: '100%' }}>
                  <p>Please select a category to view designs.</p>
                </div>
              ) : (activeTab && dynamicDesigns[activeTab] && Array.isArray(dynamicDesigns[activeTab]) && filteredDesigns.length > 0) ? (
                filteredDesigns.map((design, index) => {
                  const isImageLoaded = loadedImages.has(design.id);
                  const isImageFailed = failedImages.has(design.id);
                  const showSkeleton = !isImageLoaded && !isImageFailed;
                  const isLastCard = index === filteredDesigns.length - 1;

                  return (
                    <DesignCard 
                      key={design.id} 
                      onClick={() => handleDesignCardClick(design)}
                      data-design-card={isLastCard ? 'last' : undefined}
                    >
                      <DesignImage>
                        {showSkeleton ? (
                          <SkeletonImage />
                        ) : isImageFailed ? (
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
                          src={design.image}
                          alt={design.title}
                          loading="lazy"
                          onLoad={() => handleImageLoad(design.id)}
                          onError={() => handleImageError(design.id)}
                          style={{
                            opacity: (showSkeleton || isImageFailed) ? 0 : 1,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                        />
                        <BookmarkIcon>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M11.5215 13.9562L6.92773 10.8062L2.33398 13.9562V0H11.5215V13.9562ZM6.92773 9.75625L10.6465 12.2938V0.875H3.20898V12.2938L6.92773 9.75625Z" fill="#272626" /> </svg>
                        </BookmarkIcon>
                      </DesignImage>
                      <DesignContent>
                        <DesignTitle className='universal-fs-h4 universal-font-semibold'>{design.title}</DesignTitle>
                        {/* <DesignDescription className='universal-fs-h3'>
                          Beautiful {activeTab.toLowerCase()} design with modern aesthetics and functional layout.
                        </DesignDescription> */}

                      </DesignContent>
                      <DesignInfo>
                        <DesignTitle className='universal-fs-h3 universal-font-semibold'>{design.title}</DesignTitle>
                      </DesignInfo>
                    </DesignCard>
                  );
                })
              ) : (activeTab && dynamicDesigns[activeTab] && Array.isArray(dynamicDesigns[activeTab])) ? (
                <div style={{ width: '100%' }}>
                  <EmptyPage
                    title="No Design Items Found"
                    subtitle="No design items are available for this category at the moment."
                  />
                </div>
              ) : null}
              
              {/* Loading more indicator */}
              {loadingMore[activeTab] && (
                <div style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  padding: '20px',
                  gridColumn: '1 / -1'
                }}>
                  <SkeletonLoader />
                </div>
              )}
            </DesignGrid>
          )}

        </ContentWrapper>
      </DesignIdeasContainer>

      <GradientBackground>
        <ConsultationFormContent />
      </GradientBackground>

      <ParticularDesignGallery
        open={modalOpen}
        onClose={handleCloseModal}
        design={selectedDesign}
      />
    </Layout>
  );
};

export default DesignGallerySections;


