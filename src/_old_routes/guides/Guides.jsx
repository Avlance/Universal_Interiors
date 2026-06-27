"use client";
import React, { useState } from "react";
import { useParams, useLocation, Link } from '@/utils/react-router-dom';
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";
import Modal from "../../components/modal/js/Modal.jsx";
import ConsultationFormContent from "../home/ConsultationFormContent.jsx";

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
  font-family: var(--universal-font);
  font-size: var(--universal-fs-h12);
  font-family: var(--universal-font-semibold);
  color: #222222;
  margin-bottom: 20px;
`;

const PageDescription = styled.p`
  font-family: var(--universal-font);
  font-size: var(--universal-fs-h4);
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

const CityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CityCard = styled(Link)`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--universal-red-theme-color);
  }
`;

const Guides = () => {
  const { city, sector } = useParams();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const isRootGuides =
    pathSegments.length === 0 ||
    (pathSegments.length === 1 && (pathSegments[0] === "guides" || pathSegments[0] === "cities"));

  const getPageTitle = () => {
    if (isRootGuides || !city) return "Interior Design Guides";

    const lastSegment = pathSegments[pathSegments.length - 1]?.toLowerCase();

    const nameMap = {
      bangalore: "Bangalore",
      delhi: "Delhi",
      gurugram: "Gurugram",
      "sector-1": "Sector 1",
      "sector-2": "Sector 2",
    };

    if (lastSegment && nameMap[lastSegment]) return nameMap[lastSegment];

    if (lastSegment && lastSegment.startsWith("sector-")) {
      return lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "your area";
  };

  const getPageDescription = () => {
    if (isRootGuides || getPageTitle() === "Interior Design Guides") {
      return "Discover comprehensive interior design guides tailored for different cities and regions. Get local insights, trends, and expert advice for your area.";
    }

    const title = getPageTitle();

    if (title.includes("Sector")) {
      return `Explore interior design trends and local insights for ${title} in Gurugram. Find the best materials, contractors, and design ideas for your area.`;
    }

    if (title === "your area") {
      return "Get expert interior design guidance for your area. Discover local trends, material availability, contractor recommendations, and cost-effective solutions for your city.";
    }

    return `Get expert interior design guidance for ${title}. Discover local trends, material availability, contractor recommendations, and cost-effective solutions for your city.`;
  };

  const cities = [
    {
      name: "Bangalore",
      description:
        "Silicon Valley of India with modern apartment complexes and tech-savvy homeowners.",
    },
    {
      name: "Delhi",
      description:
        "Capital city with diverse architectural styles from traditional to contemporary.",
    },
    {
      name: "Gurugram",
      description:
        "Modern corporate hub with luxury apartments and contemporary design preferences.",
    },
  ];

  const gurugramSectors = [
    {
      name: "Sector 1",
      description:
        "Premium residential area with luxury apartments and villas.",
    },
    {
      name: "Sector 2",
      description:
        "Mixed-use development with modern amenities and contemporary designs.",
    },
  ];

  return (
    <Layout>
      <Breadcrumb />
      <PageContent>
        <PageTitle>{getPageTitle()}</PageTitle>
        <PageDescription>{getPageDescription()}</PageDescription>

        {isRootGuides && (
          <ContentSection>
            <h2>City-Specific Guides</h2>
            <p>
              Choose your city to get personalized interior design guidance:
            </p>
            <CityGrid>
              {cities.map((city, index) => (
                <CityCard key={index} to={`/cities/${city.name.toLowerCase()}`}>
                  <h3>{city.name}</h3>
                  <p>{city.description}</p>
                </CityCard>
              ))}
            </CityGrid>
          </ContentSection>
        )}

        {pathSegments.includes("gurugram") && !sector && (
          <ContentSection>
            <h2>Gurugram Sectors</h2>
            <p>
              Explore interior design guides for different sectors in Gurugram:
            </p>
            <CityGrid>
              {gurugramSectors.map((sector, index) => (
                <CityCard key={index} to={`/cities/gurugram/${sector.name.toLowerCase().replace(" ", "-")}`}>
                  <h3>{sector.name}</h3>
                  <p>{sector.description}</p>
                </CityCard>
              ))}
            </CityGrid>
          </ContentSection>
        )}

        <ContentSection>
          <h2>Local Insights</h2>
          <p>Our {isRootGuides || getPageTitle() === "your area" ? "interior design" : getPageTitle()} guide includes:</p>
          <ul>
            <li>Local material availability and costs</li>
            <li>Popular design trends in your area</li>
            <li>Recommended contractors and vendors</li>
            <li>Climate-appropriate design solutions</li>
            <li>Local building regulations and permits</li>
          </ul>
        </ContentSection>

        <ContentSection>
          <h2>Get Local Consultation</h2>
          <p>
            Connect with our local design experts {isRootGuides || getPageTitle() === "your area" ? "near you" : `in ${getPageTitle()}`} for
            personalized guidance and project consultation.
          </p>
          <button 
            onClick={() => setIsConsultationOpen(true)}
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
            Book Free Consultation
          </button>
        </ContentSection>
      </PageContent>

      <Modal open={isConsultationOpen} onClose={() => setIsConsultationOpen(false)}>
        <button 
          onClick={() => setIsConsultationOpen(false)} 
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#999', zIndex: 10, width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
        >&times;</button>
        <ConsultationFormContent onSuccess={() => setIsConsultationOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default Guides;
