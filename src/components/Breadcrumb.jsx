"use client";
import React from 'react';
import { Link, useLocation } from '@/utils/react-router-dom';
import styled from 'styled-components';

const BreadcrumbContainer = styled.nav`
  padding: 30px 65px;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    padding: 15px 16px;
    margin-bottom: 20px;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 1500px;
  margin: 0 auto;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  color: #999999;
`;

const BreadcrumbLink = styled(Link)`
  color: #999999;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #2c5aa0;
    text-decoration: underline;
  }
  
  &.active {
    color: #6c757d;
    cursor: default;
    
    &:hover {
      text-decoration: none;
    }
  }
`;

const BreadcrumbText = styled.span`
  color: #D50F25;
`;

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // For design gallery routes, ignore the last path segment
  const displayPathnames = pathnames[0] === 'design-gallery' && pathnames.length > 2
    ? pathnames.slice(0, -1)
    : pathnames;

  const getBreadcrumbName = (path) => {
    const breadcrumbMap = {
      'design-gallery': 'Design Gallery',
      'rooms-and-spaces': 'Rooms & Spaces',
      'kitchen-designs': 'Kitchen Designs',
      'specialty-designs': 'Specialty Designs',
      'apartment-layouts': 'Apartment Layouts',
      'master-bedroom': 'Master Bedroom',
      'kids-bedroom': 'Kids Bedroom',
      'bathroom': 'Bathroom',
      'home-office': 'Home Office',
      'wardrobe': 'Wardrobe',
      'space-saving': 'Space Saving',
      'custom-kitchen': 'Custom Kitchen',
      'wall-tiles': 'Wall Tiles',
      'modular-kitchen': 'Modular Kitchen',
      'kitchen-ceiling': 'Kitchen Ceiling',
      'tv-unit': 'TV Unit',
      'balcony': 'Balcony',
      'dining-room': 'Dining Room',
      'pooja-mandir': 'Pooja Mandir',
      'wall-designs': 'Wall Designs',
      'window-designs': 'Window Designs',
      'tiles': 'Tiles',
      'staircase': 'Staircase',
      '1-bhk': '1 BHK',
      '2-bhk': '2 BHK',
      '3-bhk': '3 BHK'
    };

    return breadcrumbMap[path] || path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const buildBreadcrumbPath = (index) => {
    return '/' + displayPathnames.slice(0, index + 1).join('/');
  };

  if (displayPathnames.length === 0) {
    return null;
  }

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/" className="universal-fs-h3 universal-font-medium">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {displayPathnames.length > 0 && (
          <BreadcrumbItem style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
            <svg width="8" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.15694 7.71065L1.49994 13.3676L0.0859375 11.9536L5.03594 7.00365L0.0859375 2.05365L1.49994 0.639648L7.15694 6.29665C7.34441 6.48418 7.44972 6.73848 7.44972 7.00365C7.44972 7.26881 7.34441 7.52312 7.15694 7.71065Z" fill="#999999" />
            </svg>
          </BreadcrumbItem>
        )}

        {displayPathnames.map((name, index) => {
          const routeTo = buildBreadcrumbPath(index);
          const isLast = index === displayPathnames.length - 1;

          return (
            <React.Fragment key={name}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbText className="universal-fs-h3 universal-font-bold">{getBreadcrumbName(name)}</BreadcrumbText>
                ) : (
                  <BreadcrumbLink to={routeTo} className="universal-fs-h3 universal-font-medium">
                    {getBreadcrumbName(name)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbItem style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
                  <svg width="8" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.15694 7.71065L1.49994 13.3676L0.0859375 11.9536L5.03594 7.00365L0.0859375 2.05365L1.49994 0.639648L7.15694 6.29665C7.34441 6.48418 7.44972 6.73848 7.44972 7.00365C7.44972 7.26881 7.34441 7.52312 7.15694 7.71065Z" fill="#999999" />
                  </svg>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb; 


