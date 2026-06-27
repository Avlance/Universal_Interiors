"use client";
import React, { useState } from 'react';
import { useLocation, Link } from '@/utils/react-router-dom';
import Layout from '../components/layout/Layout';
import styled from 'styled-components';
import Modal from '../components/modal/js/Modal.jsx';
import ConsultationFormContent from './home/ConsultationFormContent.jsx';

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  &:hover { background: rgba(0,0,0,0.05); }
`;

const PageContent = styled.div`
  padding: 40px 20px;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  @media (max-width: 1024px) { padding: 30px 16px; }
  @media (max-width: 480px) { padding: 20px 12px; }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #222222;
  margin-bottom: 10px;
  @media (max-width: 768px) { font-size: 2rem; }
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

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
`;

const SectionDesc = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const ResourceCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    border-color: #D50F25;
  }
`;

const ResourceCardLink = styled(Link)`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    border-color: #D50F25;
  }
`;

const ResourceIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg || '#4286F5'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  margin-bottom: 16px;
`;

const ResourceTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #222222;
  font-size: 1.15rem;
  font-weight: 600;
`;

const ResourceDescription = styled.p`
  margin: 0;
  color: #666666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const ServiceCard = styled.div`
  padding: 22px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-color: #D50F25;
  }
`;

const ServiceCardTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #222222;
  font-size: 1.05rem;
  font-weight: 600;
`;

const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
`;

const DownloadCard = styled.a`
  padding: 18px;
  background: #e8f4fd;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;
  border: 1px solid #b8d9f5;
  &:hover {
    background: #d1eaf9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const DownloadTitle = styled.h4`
  margin: 0 0 6px 0;
  color: #1565c0;
  font-size: 1rem;
`;

const DownloadSub = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #555;
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const SocialButton = styled.a`
  padding: 14px 22px;
  background: ${({ $bg }) => $bg || '#333'};
  color: white;
  border-radius: 10px;
  min-width: 130px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  }
`;

const SocialName = styled.h4`margin: 0 0 4px 0; font-size: 1rem;`;
const SocialSub = styled.p`margin: 0; font-size: 0.85rem; opacity: 0.9;`;

const More = () => {
  const location = useLocation();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const pathSegments = location.pathname.split('/').filter(s => s);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const nameMap = { 'bangalore': 'Bangalore Resources', 'delhi': 'Delhi Resources' };
  const pageTitle = nameMap[lastSegment] || 'More Resources';
  const pageDesc = pageTitle === 'More Resources'
    ? 'Discover additional resources, tools, and information to help you with your interior design journey.'
    : `Explore local resources and information for interior design in ${pageTitle.replace(' Resources', '')}.`;

  const resources = [
    { title: 'Cost Calculator', description: 'Estimate the cost of your interior design project. Get detailed breakdowns for different rooms and materials.', icon: '💰', bg: '#D50F25', link: '/price-calculators' },
    { title: 'Design Gallery', description: 'Browse our curated collection of design ideas and inspiration. Find the perfect style for your home.', icon: '✨', bg: '#5485EE', link: '/design-gallery' },
    { title: 'Design Guides', description: 'Expert modular kitchen and wardrobe guides with layouts, materials, and cost insights tailored for Indian homes.', icon: '📖', bg: '#559944', link: '/guides/modular-kitchen-guide' },
    { title: 'Contact & Support', description: 'Reach out to our team for questions, project inquiries, and customer support.', icon: '💬', bg: '#F5A623', link: '/support' },
    { title: 'Reviews', description: 'Read what our satisfied customers say about their Universal Interiors experience.', icon: '⭐', bg: '#7B61FF', link: '/reviews' },
    { title: 'Book Consultation', description: 'Schedule a free design consultation with our expert team. Get personalized recommendations.', icon: '📅', bg: '#00897B', action: () => setIsConsultationOpen(true) },
  ];

  const additionalServices = [
    { title: '3D Visualization', description: 'See your design come to life with our 3D visualization services. Get a realistic preview before starting work.' },
    { title: 'Project Management', description: 'Let us handle the entire project from start to finish. We coordinate with vendors and ensure timely completion.' },
    { title: 'Maintenance Services', description: 'Keep your interiors looking great with our maintenance and repair services. We offer ongoing support.' },
    { title: 'Custom Furniture', description: 'Get custom furniture designed and built according to your specifications. Perfect fit for your space.' },
  ];

  const downloads = [
    { title: 'Design Checklist', sub: 'PDF Download', href: '/downloads/design-checklist.pdf' },
    { title: 'Budget Planner', sub: 'Excel Template', href: '/downloads/budget-planner.xlsx' },
    { title: 'Material Guide', sub: 'PDF Download', href: '/downloads/material-guide.pdf' },
    { title: 'Timeline Template', sub: 'Project Planner', href: '/downloads/timeline-template.xlsx' },
  ];

  const socials = [
    { name: 'Facebook', sub: 'Follow Us', bg: '#1877f2', href: 'https://www.facebook.com/universal.Interiors.che/' },
    { name: 'Instagram', sub: 'Follow Us', bg: '#e4405f', href: 'https://www.instagram.com/universal_interiors_chennai/' },
    { name: 'LinkedIn', sub: 'Follow Us', bg: '#0077b5', href: 'https://www.linkedin.com/in/universal-interiors-8a52b4256/' },
    { name: 'YouTube', sub: 'Subscribe', bg: '#ff0000', href: 'https://www.youtube.com/@universalInteriorr' },
  ];

  return (
    <Layout>
      <PageContent>
        <PageTitle>{pageTitle}</PageTitle>
        <PageDescription>{pageDesc}</PageDescription>

        <ContentSection>
          <SectionTitle>Helpful Resources</SectionTitle>
          <SectionDesc>Access tools and information to help you with your interior design project:</SectionDesc>
          <ResourcesGrid>
            {resources.map((r, i) =>
              r.link ? (
                <ResourceCardLink key={i} to={r.link}>
                  <ResourceIcon $bg={r.bg}>{r.icon}</ResourceIcon>
                  <ResourceTitle>{r.title}</ResourceTitle>
                  <ResourceDescription>{r.description}</ResourceDescription>
                </ResourceCardLink>
              ) : (
                <ResourceCard key={i} onClick={r.action}>
                  <ResourceIcon $bg={r.bg}>{r.icon}</ResourceIcon>
                  <ResourceTitle>{r.title}</ResourceTitle>
                  <ResourceDescription>{r.description}</ResourceDescription>
                </ResourceCard>
              )
            )}
          </ResourcesGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Additional Services</SectionTitle>
          <SectionDesc>Explore our comprehensive range of interior design services — click any card to book a free consultation:</SectionDesc>
          <ServiceGrid>
            {additionalServices.map((s, i) => (
              <ServiceCard key={i} onClick={() => setIsConsultationOpen(true)}>
                <ServiceCardTitle>{s.title}</ServiceCardTitle>
                <p style={{ margin: 0, color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>{s.description}</p>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Download Resources</SectionTitle>
          <SectionDesc>Get free downloads to help you plan your project:</SectionDesc>
          <DownloadGrid>
            {downloads.map((d, i) => (
              <DownloadCard key={i} href={d.href} download>
                <DownloadTitle>{d.title}</DownloadTitle>
                <DownloadSub>{d.sub}</DownloadSub>
              </DownloadCard>
            ))}
          </DownloadGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Stay Connected</SectionTitle>
          <SectionDesc>Follow us on social media for the latest updates, design inspiration, and exclusive offers:</SectionDesc>
          <SocialGrid>
            {socials.map((s, i) => (
              <SocialButton key={i} href={s.href} target="_blank" rel="noopener noreferrer" $bg={s.bg}>
                <SocialName>{s.name}</SocialName>
                <SocialSub>{s.sub}</SocialSub>
              </SocialButton>
            ))}
          </SocialGrid>
        </ContentSection>
      </PageContent>

      <Modal open={isConsultationOpen} onClose={() => setIsConsultationOpen(false)}>
        <CloseButton onClick={() => setIsConsultationOpen(false)} className="universal-fs-h8 universal-font" style={{ zIndex: 100 }}>&times;</CloseButton>
        <ConsultationFormContent onSuccess={() => setIsConsultationOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default More;


