"use client";
import React from 'react';
import { Link } from '@/utils/react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #222222;
  color: #fff;
  padding: 60px 0 30px;
  margin-top: auto;
  
      /* Full-bleed background */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  
  @media (max-width: 768px) {
    padding: 40px 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 0 15px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
  
  @media (max-width: 480px) {
    padding: 0 8px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 40px auto;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
    margin-bottom: 24px;
  }
`;

const FooterLogoSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 180px;
  
  @media (max-width: 768px) {
    min-width: auto;
    justify-content: center;
    width: 100%;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 32px 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 40px auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 16px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
    margin-bottom: 24px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    text-align: left;
  }
`;

const FooterHeader = styled.h4`
  color: #D50F25;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const FooterSubtitle = styled.div`
  color: #999999;
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 5px;
  }
`;

const FooterItem = styled.li`
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px;
  }
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const FooterSubtitleLink = styled(Link)`
  color: #999999;
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-block;
  
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 5px;
  }
`;

const FooterSubtitleExternalLink = styled.a`
  color: #999999;
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-block;
  
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 5px;
  }
`;

const FooterHeaderLink = styled(Link)`
  color: #D50F25;
  margin-bottom: 16px;
  text-decoration: none;
  font-weight: bold;
  display: block;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff334b;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #333;
  
  @media (max-width: 768px) {
    padding-top: 24px;
  }
  
  @media (max-width: 480px) {
    padding-top: 20px;
  }
`;

const AppDownload = styled.div`
  margin-top: 20px;
  
  @media (max-width: 768px) {
    margin-top: 16px;
  }
  
  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;

const AppStoreButton = styled.div`
  display: inline-block;
  margin-right: 10px;
  
  img {
    height: 40px;
  }
  
  @media (max-width: 768px) {
    margin-right: 8px;
    
    img {
      height: 36px;
    }
  }
  
  @media (max-width: 480px) {
    margin-right: 6px;
    
    img {
      height: 32px;
    }
  }
`;

const ContactInfo = styled.div`
  margin-top: 20px;
  
  @media (max-width: 768px) {
    margin-top: 16px;
  }
  
  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;

// Example data for 4 sections, each with 5 subtitles
const footerSections = [
  {
    header: 'Overview',
    subtitles: ['Trends', 'Review', '360-degree views']
  },
  {
    header: 'Rooms & Spaces',
    subtitles: ['Living Room', 'Master Bedroom', 'Kids Bedroom', 'Bathroom', 'Home Office', 'Wardrobe', 'Space-Saving']
  },
  {
    header: 'Kitchen Designs ',
    subtitles: ['Modular Kitchen', 'Custom Kitchen', 'Wall Tiles', 'Kitchen Ceiling']
  },
  {
    header: 'More',
    subtitles: ['Commercial interiors', 'Privacy Policy', 'Contact Us', 'Lending Partners', 'Refer And Earn', 'Careers']
  },
  // Add 4 more sections for the second row if needed
  {
    header: 'Contact Us',
    subtitles: ['Call us on', '+91 94444 03550', 'Write to us at', 'universalinteriorr@gmail.com']
  },
  {
    header: 'Address',
    subtitles: ['180, 144, Medavakkam Main Rd', 'Parthasarathy Nagar, Adambakkam', 'Chennai, Tamil Nadu 600088 ']
  },
  {
    header: 'Social Media',
    subtitles: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E']
  }
];

// Example SVG icons for the 7th section
const footerIcons = [
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none"> <g clipPath="url(#clip0_218_6506)"> <g clipPath="url(#clip1_218_6506)"> <g clipPath="url(#clip2_218_6506)"> <path d="M13.75 0.5H6.25C4.5924 0.5 3.00269 1.15848 1.83058 2.33058C0.65848 3.50269 0 5.0924 0 6.75L0 14.25C0 15.9076 0.65848 17.4973 1.83058 18.6694C3.00269 19.8415 4.5924 20.5 6.25 20.5H13.75C15.4076 20.5 16.9973 19.8415 18.1694 18.6694C19.3415 17.4973 20 15.9076 20 14.25V6.75C20 5.0924 19.3415 3.50269 18.1694 2.33058C16.9973 1.15848 15.4076 0.5 13.75 0.5ZM18.125 14.25C18.1237 15.4099 17.6623 16.5219 16.8421 17.3421C16.0219 18.1623 14.9099 18.6237 13.75 18.625H6.25C5.09008 18.6237 3.97805 18.1623 3.15787 17.3421C2.33768 16.5219 1.87632 15.4099 1.875 14.25V6.75C1.87632 5.59008 2.33768 4.47805 3.15787 3.65787C3.97805 2.83768 5.09008 2.37632 6.25 2.375H13.75C14.9099 2.37632 16.0219 2.83768 16.8421 3.65787C17.6623 4.47805 18.1237 5.59008 18.125 6.75V14.25Z" fill="#999999" /> <path d="M10 5.49998C8.67392 5.49998 7.40215 6.02677 6.46447 6.96445C5.52678 7.90213 5 9.1739 5 10.5C5 11.8261 5.52678 13.0978 6.46447 14.0355C7.40215 14.9732 8.67392 15.5 10 15.5C11.3261 15.5 12.5979 14.9732 13.5355 14.0355C14.4732 13.0978 15 11.8261 15 10.5C15 9.1739 14.4732 7.90213 13.5355 6.96445C12.5979 6.02677 11.3261 5.49998 10 5.49998ZM10 13.625C9.1716 13.6237 8.37752 13.294 7.79175 12.7082C7.20599 12.1225 6.87632 11.3284 6.875 10.5C6.87606 9.67151 7.20564 8.87727 7.79146 8.29144C8.37728 7.70562 9.17152 7.37604 10 7.37498C10.8285 7.37604 11.6227 7.70562 12.2085 8.29144C12.7944 8.87727 13.1239 9.67151 13.125 10.5C13.1237 11.3284 12.794 12.1225 12.2082 12.7082C11.6225 13.294 10.8284 13.6237 10 13.625ZM15.375 5.79098C15.5516 5.79098 15.721 5.72082 15.8459 5.59592C15.9708 5.47102 16.041 5.30162 16.041 5.12498C16.041 4.94835 15.9708 4.77895 15.8459 4.65405C15.721 4.52915 15.5516 4.45898 15.375 4.45898C15.1984 4.45898 15.029 4.52915 14.9041 4.65405C14.7792 4.77895 14.709 4.94835 14.709 5.12498C14.709 5.30162 14.7792 5.47102 14.9041 5.59592C15.029 5.72082 15.1984 5.79098 15.375 5.79098Z" fill="#999999" /> </g> </g> </g> <defs> <clipPath id="clip0_218_6506"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip1_218_6506"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip2_218_6506"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> </defs> </svg>,
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none"> <g clipPath="url(#clip0_218_6511)"> <g clipPath="url(#clip1_218_6511)"> <g clipPath="url(#clip2_218_6511)"> <path d="M17.5 0.5H2.5C1.8372 0.500794 1.20178 0.764441 0.73311 1.23311C0.264441 1.70178 0.000793929 2.3372 0 3L0 18C0 19.379 1.121 20.5 2.5 20.5H10V13.625H7.5V10.5H10V8C10 7.00544 10.3951 6.05161 11.0983 5.34835C11.8016 4.64509 12.7554 4.25 13.75 4.25H16.25V7.375H15C14.31 7.375 13.75 7.31 13.75 8V10.5H16.875L15.625 13.625H13.75V20.5H17.5C18.879 20.5 20 19.379 20 18V3C20 1.621 18.879 0.5 17.5 0.5Z" fill="#999999" /> </g> </g> </g> <defs> <clipPath id="clip0_218_6511"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip1_218_6511"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip2_218_6511"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> </defs> </svg>,
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none"> <g clipPath="url(#clip0_218_6515)"> <g clipPath="url(#clip1_218_6515)"> <g clipPath="url(#clip2_218_6515)"> <path d="M19.995 20.5L20 20.499V13.164C20 9.576 19.228 6.812 15.033 6.812C13.016 6.812 11.663 7.918 11.11 8.967H11.052V7.147H7.074V20.499H11.216V13.887C11.216 12.147 11.546 10.463 13.702 10.463C15.826 10.463 15.858 12.45 15.858 13.999V20.499L19.995 20.5ZM0.33 7.147H4.477V20.5H0.33V7.147ZM2.402 0.5C1.76495 0.5 1.15399 0.753067 0.70353 1.20353C0.253067 1.65399 0 2.26495 0 2.902C0 4.227 1.076 5.326 2.402 5.326C3.727 5.326 4.803 4.228 4.803 2.902C4.80274 2.2652 4.54972 1.65455 4.09953 1.20418C3.64934 0.753799 3.0388 0.50053 2.402 0.5Z" fill="#999999" /> </g> </g> </g> <defs> <clipPath id="clip0_218_6515"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip1_218_6515"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip2_218_6515"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> </defs> </svg>,
  // <svg width="20" height="21" viewBox="0 0 20 21" fill="none"> <g clipPath="url(#clip0_218_6519)"> <g clipPath="url(#clip1_218_6519)"> <g clipPath="url(#clip2_218_6519)"> <path d="M19.9964 10.7991C20.0364 9.44856 19.8024 8.10389 19.3085 6.84623C18.8146 5.58858 18.0711 4.444 17.1227 3.48156C16.1744 2.51912 15.0409 1.75875 13.7907 1.24634C12.5405 0.733926 11.1994 0.480083 9.84842 0.500124C4.37542 0.576124 -0.0495804 5.10012 0.000419594 10.5741C0.0254196 14.4981 2.32542 17.8721 5.62442 19.4971C5.82442 19.5971 6.04942 19.4471 6.02442 19.2221C5.99942 18.5721 6.02442 17.8971 6.14942 17.3471C6.27442 16.7971 6.77442 14.6981 7.09942 13.3231C7.24942 12.6481 7.27442 11.9491 7.14942 11.2731C7.09615 11.019 7.07099 10.7598 7.07442 10.5001C7.07442 9.02512 7.92442 7.92512 8.99942 7.92512C9.89942 7.92512 10.3494 8.60012 10.3494 9.42512C10.3494 10.3251 9.77342 11.7001 9.47442 12.9751C9.22442 14.0251 9.99842 14.8991 11.0484 14.8991C12.9484 14.8991 14.3984 12.8991 14.3984 10.0251C14.3984 7.47512 12.5734 5.70112 9.94842 5.70112C6.92442 5.70112 5.14942 7.97512 5.14942 10.3251C5.14942 11.2501 5.49942 12.2251 5.94942 12.7491C6.02442 12.8491 6.04942 12.9491 6.02442 13.0491C5.94942 13.3741 5.77442 14.0991 5.72442 14.2491C5.67442 14.4491 5.57442 14.4741 5.37442 14.3991C4.05042 13.7491 3.20042 11.7991 3.20042 10.2491C3.20042 6.90112 5.62442 3.82612 10.2234 3.82612C13.8984 3.82612 16.7734 6.45112 16.7734 9.97512C16.7734 13.6491 14.4734 16.5741 11.2484 16.5741C10.3984 16.5741 9.59842 16.2241 9.12442 15.7491C9.09086 15.7155 9.04896 15.6913 9.003 15.6792C8.95704 15.6671 8.90868 15.6674 8.86289 15.6801C8.81709 15.6928 8.7755 15.7175 8.74238 15.7516C8.70926 15.7857 8.68581 15.828 8.67442 15.8741C8.49942 16.4991 8.24942 17.5481 8.14942 17.8741C7.99942 18.4741 7.67442 19.1741 7.32442 19.7981C7.22442 19.9481 7.32442 20.1731 7.49942 20.1981C8.32442 20.3981 9.17442 20.5231 10.0494 20.4981C15.3474 20.4481 19.8464 16.0481 19.9964 10.8001V10.7991Z" fill="#999999" /> </g> </g> </g> <defs> <clipPath id="clip0_218_6519"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip1_218_6519"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> <clipPath id="clip2_218_6519"> <rect width="20" height="20" fill="white" transform="translate(0 0.5)" /> </clipPath> </defs> </svg>,
  <svg width="25" height="19" viewBox="0 0 25 19" fill="none"> <g clipPath="url(#clip0_218_6523)"> <g clipPath="url(#clip1_218_6523)"> <g clipPath="url(#clip2_218_6523)"> <path d="M23.9887 3.44601C23.7146 2.35226 22.911 1.49065 21.8905 1.1969C20.0271 0.651367 12.5744 0.651367 12.5744 0.651367C12.5744 0.651367 5.12171 0.651367 3.25921 1.17637C2.25921 1.47101 1.4351 2.35315 1.16099 3.44601C0.669922 5.44155 0.669922 9.57994 0.669922 9.57994C0.669922 9.57994 0.669922 13.7398 1.16099 15.7139C1.4351 16.8067 2.23867 17.6683 3.25921 17.9621C5.14135 18.5085 12.5744 18.5085 12.5744 18.5085C12.5744 18.5085 20.0271 18.5085 21.8905 17.9835C22.9101 17.6889 23.7146 16.8282 23.9887 15.7353C24.4797 13.7398 24.4797 9.60137 24.4797 9.60137C24.4797 9.60137 24.4985 5.44065 23.9887 3.44512V3.44601Z" fill="#999999" /> <path d="M10.2012 13.4042L16.3985 9.58094L10.2021 5.75684L10.2012 13.4042Z" fill="#373737" /> </g> </g> </g> <defs> <clipPath id="clip0_218_6523"> <rect width="25" height="17.84" fill="white" transform="translate(0 0.660156)" /> </clipPath> <clipPath id="clip1_218_6523"> <rect width="25" height="17.84" fill="white" transform="translate(0 0.660156)" /> </clipPath> <clipPath id="clip2_218_6523"> <rect width="25" height="17.8571" fill="white" transform="translate(0 0.651367)" /> </clipPath> </defs> </svg>];

const footerIconLinks = [
  'https://www.instagram.com/universal_interiors_chennai/',
  'https://www.facebook.com/universal.Interiors.che/',
  'https://www.linkedin.com/in/universal-interiors-8a52b4256/',
  'https://www.youtube.com/@universalInteriorr',
  'https://www.youtube.com/@universalInteriorr',
];

const FooterIconsRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    gap: 12px;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const headerLinks = {
  'Rooms & Spaces': '/design-gallery',
  'Kitchen Designs': '/design-gallery',
  'More': '/more',
  'Contact Us': '/support'
};

const getLinkForText = (text) => {
  const mapping = {
    // Overview
    'Overview': '/',
    'Trends': '/design-gallery',
    'Review': '/reviews',
    '360-degree views': '/design-gallery',

    // Rooms & Spaces
    'Rooms & Spaces': '/design-gallery',
    'Living Room': '/design-gallery/rooms-and-spaces/living-room',
    'Master Bedroom': '/design-gallery/rooms-and-spaces/master-bedroom',
    'Kids Bedroom': '/design-gallery/rooms-and-spaces/kids-bedroom',
    'Bathroom': '/design-gallery/rooms-and-spaces/bathroom',
    'Home Office': '/design-gallery/rooms-and-spaces/home-office',
    'Wardrobe': '/design-gallery/rooms-and-spaces/wardrobe',
    'Space-Saving': '/design-gallery/rooms-and-spaces/space-saving',

    // Kitchen Designs
    'Kitchen Designs': '/design-gallery',
    'Modular Kitchen': '/design-gallery/kitchen-designs/modular-kitchen',
    'Custom Kitchen': '/design-gallery/kitchen-designs/custom-kitchen',
    'Wall Tiles': '/design-gallery/kitchen-designs/wall-tiles',
    'Kitchen Ceiling': '/design-gallery/kitchen-designs/kitchen-ceiling',

    // More
    'More': '/more',
    'Commercial interiors': '/design-gallery',
    'Privacy Policy': '/more',
    'Contact Us': '/support',
    'Lending Partners': '/more',
    'Refer And Earn': '/more',
    'Careers': '/more'
  };

  return mapping[text] || '#';
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterLogoSection>
            <svg width="120" height="28" viewBox="0 0 120 28" fill="none"> <g clipPath="url(#clip0_218_6453)"> <path d="M0 20.7127V11.9647L4.54203 9.33789V20.7127H0Z" fill="white" /> <path d="M12.815 20.7038V11.3371L11.063 10.0718L9.44881 11.3371V17.0723H4.54199V20.7038H12.815Z" fill="white" /> <path d="M11.0361 5.78283V0.500977L22.5184 7.16071V11.9833L11.0361 5.78283Z" fill="white" /> <path d="M11.0312 5.784V0.500977L0.000609398 7.16219V11.9858L11.0312 5.784Z" fill="white" /> <path d="M10.998 26.1639V21.6219L18.3843 17.8412V9.75L22.5179 11.9837V20.1062L10.998 26.1639Z" fill="white" /> <path d="M8.43555 10.7857L10.9985 8.80664L13.4642 10.4937" stroke="white" strokeWidth="0.74619" strokeLinecap="round" /> <path d="M56.7803 0.5H58.8407C59.0715 0.5 59.2586 0.687095 59.2586 0.917889V2.63277H56.7803V0.5Z" fill="white" /> <path d="M112.771 3.93262H115.356V11.6435H119.654V13.658H112.771V3.93262Z" fill="white" /> <path d="M103.206 11.7834L103.39 9.99113H108.697L108.865 11.7834H103.206ZM106.005 7.5042L104.506 10.6441L104.629 11.1582L103.298 13.659H100.377L106.005 3.32227L111.649 13.659H108.713L107.428 11.2554L107.52 10.658L106.005 7.5042Z" fill="white" /> <path d="M93.1446 10.2409C93.3587 10.5928 93.5983 10.8985 93.8635 11.1578C94.1388 11.4172 94.4345 11.6163 94.7505 11.7552C95.0768 11.8942 95.4184 11.9637 95.7753 11.9637C96.1525 11.9637 96.4635 11.8803 96.7083 11.7136C96.953 11.5376 97.0753 11.3014 97.0753 11.005C97.0753 10.7549 97.0039 10.5558 96.8612 10.4076C96.7184 10.2501 96.489 10.1019 96.1729 9.96299C95.8568 9.82406 95.4388 9.6666 94.9188 9.49062C94.6639 9.40726 94.3682 9.29148 94.0317 9.14328C93.7054 8.99508 93.3944 8.80521 93.0987 8.57365C92.803 8.33283 92.5583 8.0457 92.3646 7.71225C92.1709 7.36955 92.074 6.95738 92.074 6.47574C92.074 5.90147 92.2371 5.40594 92.5634 4.98914C92.8999 4.57233 93.3485 4.25741 93.9093 4.04438C94.4803 3.82209 95.1125 3.71094 95.8059 3.71094C96.5196 3.71094 97.1365 3.81745 97.6565 4.03049C98.1867 4.24352 98.6252 4.51213 98.9718 4.83631C99.3185 5.16049 99.5836 5.4893 99.7672 5.82274L97.7942 6.82307L97.6412 6.59151 97.4628 6.39237 97.2589 6.22565C97.0651 6.04967 96.8459 5.91537 96.6012 5.82274C96.3667 5.72086 96.1118 5.66991 95.8365 5.66991C95.4694 5.66991 95.189 5.74401 94.9953 5.89221C94.8015 6.03114 94.7047 6.20713 94.7047 6.42016C94.7047 6.64246 94.7964 6.83697 94.98 7.00369C95.1737 7.17041 95.4439 7.32324 95.7906 7.46217C96.1474 7.60111 96.5757 7.7493 97.0753 7.90676C97.4526 8.03643 97.8044 8.18926 98.1306 8.36525C98.4569 8.53197 98.7424 8.73574 98.9871 8.97656C99.2421 9.21738 99.4409 9.49525 99.5836 9.81016C99.7264 10.1251 99.7978 10.4863 99.7978 10.8939C99.7978 11.3848 99.6856 11.8247 99.4613 12.2137C99.2471 12.5935 98.9515 12.913 98.5742 13.1724C98.2071 13.4317 97.784 13.6262 97.3047 13.7559C96.8357 13.8948 96.3514 13.9643 95.8518 13.9643C95.1584 13.9643 94.5109 13.8532 93.9093 13.6309C93.3179 13.3993 92.803 13.089 92.3646 12.7C91.9261 12.311 91.5846 11.8849 91.3398 11.4218L93.1446 10.2409Z" fill="white" /> <path d="M84.741 9.25381H87.4176L90.7671 13.658H87.7388L84.741 9.25381ZM82.0645 3.93262H84.6492V13.658H82.0645V3.93262ZM83.6857 5.91938V3.93262H85.9646C86.8823 3.93262 87.647 4.06692 88.2588 4.33553C88.8706 4.60413 89.3345 4.97926 89.6506 5.4609C89.9667 5.93327 90.1247 6.48438 90.1247 7.11422C90.1247 7.73479 89.9667 8.2859 89.6506 8.76754C89.3345 9.23992 88.8706 9.61041 88.2588 9.87902C87.647 10.1476 86.8823 10.2819 85.9646 10.2819H83.6857V8.46188H85.781C86.1277 8.46188 86.4234 8.41557 86.6681 8.32295C86.923 8.22106 87.1168 8.0775 87.2493 7.89225C87.3819 7.69774 87.4482 7.46619 87.4482 7.19758C87.4482 6.92897 87.3819 6.70205 87.2493 6.5168C87.1168 6.32229 86.923 6.17409 86.6681 6.07221C86.4234 5.97032 86.1277 5.91938 85.781 5.91938H83.6857Z" fill="white" /> <path d="M74.5665 13.658V11.7268H79.9655V13.658H74.5665ZM74.5665 5.86381V3.93262H79.9655V5.86381H74.5665ZM74.5665 9.49V7.60049H79.6596V9.49H74.5665ZM72.8535 3.93262H75.3312V13.658H72.8535V3.93262Z" fill="white" /> <path d="M66.0874 9.74008L68.7028 3.93262H71.7311L66.0874 14.2694L60.459 3.93262H63.472L66.0874 9.74008Z" fill="white" /> <path d="M56.707 3.93262H59.3377V13.658H56.707V3.93262Z" fill="white" /> <path d="M51.9469 3.93158H54.4399V14.1433L47.0373 8.18298V13.657H44.5596V3.44531L51.9469 9.40561V3.93158Z" fill="white" /> <path d="M33.7617 3.93262H36.3465V10.2958C36.3465 10.7867 36.4893 11.185 36.7748 11.4907C37.0603 11.7963 37.4885 11.9491 38.0595 11.9491C38.6407 11.9491 39.074 11.7963 39.3595 11.4907C39.645 11.185 39.7878 10.7867 39.7878 10.2958V3.93262H42.3726V10.4625C42.3726 11.0739 42.2604 11.6064 42.0361 12.0603C41.822 12.5141 41.5161 12.8893 41.1184 13.1857C40.731 13.4728 40.2721 13.6905 39.7419 13.8387C39.2219 13.9868 38.6611 14.0609 38.0595 14.0609C37.4579 14.0609 36.8971 13.9868 36.3771 13.8387C35.8571 13.6905 35.3982 13.4728 35.0006 13.1857C34.6131 12.8893 34.3072 12.5141 34.0829 12.0603C33.8688 11.6064 33.7617 11.0739 33.7617 10.4625V3.93262Z" fill="white" /> <path d="M37.3674 19.282H38.0508V24.9102H37.3674V19.282ZM48.7452 19.282H49.4286V25.1916L45.1673 20.7212V24.9102H44.4839V19.0006L48.7452 23.471V19.282ZM55.3011 19.9252V19.282H58.879V19.9252H57.4318V24.9102H56.7483V19.9252H55.3011ZM65.125 24.9102V24.2669H67.9632V24.9102H65.125ZM65.125 19.9252V19.282H67.9632V19.9252H65.125ZM65.125 22.1765V21.5333H67.8024V22.1765H65.125ZM64.7471 19.282H65.4305V24.9102H64.7471V19.282ZM75.3184 22.1363H76.0822L78.0922 24.9102H77.248L75.3184 22.1363ZM74.3133 19.282H74.9968V24.9102H74.3133V19.282ZM74.6912 19.885V19.282H75.841C76.2055 19.282 76.5298 19.3517 76.8138 19.4911C77.1033 19.6251 77.3311 19.818 77.4973 20.07C77.6688 20.3219 77.7546 20.6221 77.7546 20.9705C77.7546 21.3135 77.6688 21.6137 77.4973 21.871C77.3311 22.1229 77.1033 22.3185 76.8138 22.4579C76.5298 22.5919 76.2055 22.6589 75.841 22.6589H74.6912V22.0559H75.841C76.0822 22.0559 76.2939 22.013 76.4762 21.9272C76.6638 21.8415 76.8085 21.7182 76.9103 21.5574C77.0175 21.3966 77.0711 21.2009 77.0711 20.9705C77.0711 20.74 77.0175 20.5443 76.9103 20.3835C76.8085 20.2227 76.6638 20.0994 76.4762 20.0137C76.2939 19.9279 76.0822 19.885 75.841 19.885H74.6912ZM83.9581 19.282H84.6415V24.9102H83.9581V19.282ZM91.4766 22.0961C91.4766 22.5195 91.5678 22.8974 91.75 23.2298C91.9376 23.5621 92.1922 23.8247 92.5138 24.0177C92.8354 24.2107 93.1999 24.3071 93.6073 24.3071C94.02 24.3071 94.3845 24.2107 94.7008 24.0177C95.0224 23.8247 95.2743 23.5621 95.4565 23.2298C95.6441 22.8974 95.738 22.5195 95.738 22.0961C95.738 21.6726 95.6441 21.2947 95.4565 20.9624C95.2743 20.6301 95.0224 20.3674 94.7008 20.1745C94.3845 19.9815 94.02 19.885 93.6073 19.885C93.1999 19.885 92.8354 19.9815 92.5138 20.1745C92.1922 20.3674 91.9376 20.6301 91.75 20.9624C91.5678 21.2947 91.4766 21.6726 91.4766 22.0961ZM90.753 22.0961C90.753 21.6834 90.8227 21.3028 90.9621 20.9544C91.1068 20.6006 91.3078 20.2951 91.5651 20.0378C91.8224 19.7752 92.1252 19.5715 92.4736 19.4267C92.822 19.2767 93.1999 19.2016 93.6073 19.2016C94.02 19.2016 94.3979 19.2767 94.741 19.4267C95.0894 19.5715 95.3922 19.7752 95.6495 20.0378C95.9068 20.2951 96.1051 20.6006 96.2445 20.9544C96.3892 21.3028 96.4616 21.6834 96.4616 22.0961C96.4616 22.5035 96.3892 22.884 96.2445 23.2378C96.1051 23.5916 95.9068 23.8998 95.6495 24.1624C95.3922 24.4197 95.0894 24.6234 94.741 24.7735C94.3979 24.9182 94.02 24.9906 93.6073 24.9906C93.1999 24.9906 92.822 24.9182 92.4736 24.7735C92.1252 24.6234 91.8224 24.4197 91.5651 24.1624C91.3078 23.8998 91.1068 23.5916 90.9621 23.2378C90.8227 22.884 90.753 22.5035 90.753 22.0961ZM103.577 22.1363H104.341L106.351 24.9102H105.507L103.577 22.1363ZM102.572 19.282H103.256V24.9102H102.572V19.282ZM102.95 19.885V19.282H104.1C104.465 19.282 104.789 19.3517 105.073 19.4911C105.362 19.6251 105.59 19.818 105.756 20.07C105.928 20.3219 106.014 20.6221 106.014 20.9705C106.014 21.3135 105.928 21.6137 105.756 21.871C105.59 22.1229 105.362 22.3185 105.073 22.4579C104.789 22.5919 104.465 22.6589 104.1 22.6589H102.95V22.0559H104.1C104.341 22.0559 104.553 22.013 104.735 21.9272C104.923 21.8415 105.068 21.7182 105.169 21.5574C105.277 21.3966 105.33 21.2009 105.33 20.9705C105.33 20.74 105.277 20.5443 105.169 20.3835C105.068 20.2227 104.923 20.0994 104.735 20.0137C104.553 19.9279 104.341 19.885 104.1 19.885H102.95ZM112.426 23.2056C112.555 23.4308 112.689 23.6291 112.828 23.8006C112.973 23.9721 113.134 24.1061 113.311 24.2026C113.488 24.2991 113.689 24.3473 113.914 24.3473C114.214 24.3473 114.455 24.2643 114.637 24.0981C114.82 23.9319 114.911 23.7202 114.911 23.4629C114.911 23.211 114.852 23.01 114.734 22.8599C114.616 22.7098 114.46 22.5892 114.267 22.4981C114.08 22.4016 113.879 22.3159 113.664 22.2408C113.525 22.1926 113.37 22.1309 113.198 22.0559C113.027 21.9755 112.863 21.8763 112.708 21.7584C112.552 21.6351 112.424 21.485 112.322 21.3081C112.225 21.1313 112.177 20.9142 112.177 20.6569C112.177 20.3782 112.247 20.1289 112.386 19.9092C112.525 19.6894 112.718 19.5179 112.965 19.3946C113.212 19.2659 113.493 19.2016 113.809 19.2016C114.115 19.2016 114.38 19.2606 114.605 19.3785C114.836 19.4911 115.031 19.6385 115.192 19.8207C115.353 19.9976 115.479 20.1852 115.57 20.3835L114.983 20.7212C114.913 20.5819 114.825 20.4452 114.718 20.3112C114.611 20.1772 114.479 20.0673 114.324 19.9815C114.174 19.8958 113.989 19.8529 113.769 19.8529C113.463 19.8529 113.241 19.9279 113.102 20.078C112.962 20.2227 112.893 20.3862 112.893 20.5685C112.893 20.7239 112.933 20.8686 113.013 21.0026C113.094 21.1313 113.228 21.2545 113.415 21.3725C113.608 21.485 114.195 21.7102C114.345 21.7638 114.503 21.8334 114.669 21.9192C114.836 22.005 114.988 22.1148 115.128 22.2489C115.272 22.3775 115.39 22.5356 115.482 22.7232C115.573 22.9055 115.618 23.1252 115.618 23.3825C115.618 23.6291 115.57 23.8515 115.473 24.0499C115.382 24.2482 115.254 24.417 115.088 24.5564C114.927 24.6958 114.742 24.803 114.533 24.878C114.329 24.953 114.115 24.9906 113.89 24.9906C113.584 24.9906 113.3 24.9262 113.037 24.7976C112.78 24.6636 112.552 24.4894 112.354 24.275C112.161 24.0552 112.003 23.822 111.88 23.5755L112.426 23.2056Z" fill="white" /> </g> <defs> <clipPath id="clip0_218_6453"> <rect width="120" height="27.4102" fill="white" transform="translate(0 0.5)" /> </clipPath> </defs> </svg>
          </FooterLogoSection>
          <FooterGrid>
            {footerSections.slice(0, 7).map((section, idx) => (
              <FooterSection key={idx}>
                {headerLinks[section.header] ? (
                  <FooterHeaderLink to={headerLinks[section.header]} className='universal-font-bold universal-fs-h4'>
                    {section.header}
                  </FooterHeaderLink>
                ) : (
                  <FooterHeader className='universal-font-bold universal-fs-h4'>{section.header}</FooterHeader>
                )}
                {idx === 6 ? (
                  <FooterIconsRow>
                    {footerIcons.map((icon, iconIdx) => (
                      <a
                        key={iconIdx}
                        href={footerIconLinks[iconIdx]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Footer Social Icon ${iconIdx + 1}`}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        {icon}
                      </a>
                    ))}
                  </FooterIconsRow>
                                ) : (
                  section.subtitles.map((subtitle, subIdx) => {
                    if (idx === 4) {
                      if (subtitle === '+91 94444 03550') {
                        return (
                          <FooterSubtitleExternalLink
                            key={subIdx}
                            href="tel:+919444403550"
                            className='universal-font-medium universal-fs-h3'
                            style={{ display: 'block' }}
                          >
                            {subtitle}
                          </FooterSubtitleExternalLink>
                        );
                      } else if (subtitle === 'universalinteriorr@gmail.com') {
                        return (
                          <FooterSubtitleExternalLink
                            key={subIdx}
                            href="mailto:universalinteriorr@gmail.com"
                            className='universal-font-medium universal-fs-h3'
                            style={{ display: 'block' }}
                          >
                            {subtitle}
                          </FooterSubtitleExternalLink>
                        );
                      } else {
                        return (
                          <FooterSubtitle key={subIdx} className='universal-font-medium universal-fs-h3'>
                            {subtitle}
                          </FooterSubtitle>
                        );
                      }
                    } else if (idx === 5) {
                      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        'Universal Interiors, 180, 144, Medavakkam Main Rd, Parthasarathy Nagar, Adambakkam, Chennai, Tamil Nadu 600088'
                      )}`;
                      return (
                        <FooterSubtitleExternalLink
                          key={subIdx}
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='universal-font-medium universal-fs-h3'
                          style={{ display: 'block' }}
                        >
                          {subtitle}
                        </FooterSubtitleExternalLink>
                      );
                    } else {
                      const toLink = getLinkForText(subtitle);
                      return (
                        <FooterSubtitleLink
                          key={subIdx}
                          to={toLink}
                          className='universal-font-medium universal-fs-h3'
                          style={{ display: 'block' }}
                        >
                          {subtitle}
                        </FooterSubtitleLink>
                      );
                    }
                  })
                )}
              </FooterSection>
            ))}
          </FooterGrid>
        </FooterTop>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 


