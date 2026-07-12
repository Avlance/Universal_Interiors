"use client";
import React, { useState } from 'react';
import { useParams, useLocation } from '@/utils/react-router-dom';
import Layout from '../components/layout/Layout';
import styled from 'styled-components';
import Modal from '../components/modal/js/Modal.jsx';
import ConsultationFormContent from './home/ConsultationFormContent.jsx';

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

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const SupportCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  color: inherit;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const SupportCardLink = styled.a`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  color: inherit;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4286F5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 15px;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h3`
  margin: 0;
  color: #222222;
  font-size: 1.2rem;
`;

const ContactText = styled.p`
  margin: 5px 0 0 0;
  color: #666666;
  font-size: 1rem;
`;

const FAQSection = styled.div`
  margin-top: 20px;
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #4286F5;
`;

const FAQQuestion = styled.h4`
  margin: 0 0 10px 0;
  color: #222222;
  font-size: 1.1rem;
`;

const FAQAnswer = styled.p`
  margin: 0;
  color: #666666;
  line-height: 1.6;
`;

const CustomerSupport = () => {
  const { city } = useParams();
  const location = useLocation();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const getPageTitle = () => {
    if (pathSegments.length === 0) return 'Customer Support';

    const lastSegment = pathSegments[pathSegments.length - 1];

    const nameMap = {
      'bangalore': 'Bangalore Support',
      'delhi': 'Delhi Support'
    };

    return nameMap[lastSegment] || 'Customer Support';
  };

  const getPageDescription = () => {
    const title = getPageTitle();

    if (title === 'Customer Support') {
      return 'Get the help you need with your Universal Interiors project. Our dedicated support team is here to assist you with any questions or concerns.';
    }

    return `Get local support for your Universal Interiors project in ${title.replace(' Support', '')}. Our team is here to help with consultation, project updates, and any questions you may have.`;
  };

  const supportOptions = [
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: '📞',
      details: '+91 94444 03550'
    },
    {
      title: 'Email Support',
      description: 'Send us your queries via email',
      icon: '✉️',
      details: 'universalinteriorr@gmail.com'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: '💬',
      details: 'Available 9 AM - 8 PM'
    },
    {
      title: 'WhatsApp',
      description: 'Quick support on WhatsApp',
      icon: '📱',
      details: '+91 94444 03550'
    }
  ];

  const faqs = [
    {
      question: 'How long does an interior design project take?',
      answer: 'Project timelines vary based on scope and complexity. A single room renovation typically takes 2-4 weeks, while complete home interiors may take 6-12 weeks. We provide detailed timelines during consultation.'
    },
    {
      question: 'Do you provide free consultation?',
      answer: 'Yes, we offer free initial consultation to understand your requirements and provide design recommendations. This includes site visit and basic design discussion.'
    },
    {
      question: 'What is included in your interior design packages?',
      answer: 'Our packages include design consultation, 3D visualization, material selection, project management, and installation. We offer customized packages based on your specific needs.'
    },
    {
      question: 'Do you work with specific budgets?',
      answer: 'Yes, we work with various budgets and provide cost-effective solutions. We\'ll discuss your budget during consultation and suggest options that fit your requirements.'
    },
    {
      question: 'What warranty do you provide?',
      answer: 'We provide warranty on all our installations and materials. The warranty period varies based on the product and service, typically ranging from 1-5 years.'
    }
  ];

  const getHrefForOption = (option) => {
    if (option.title === 'Phone Support') {
      return `tel:${option.details.replace(/\s+/g, '')}`;
    }
    if (option.title === 'Email Support') {
      return `mailto:${option.details}`;
    }
    if (option.title === 'WhatsApp') {
      return `https://wa.me/${option.details.replace(/[^0-9]/g, '')}`;
    }
    if (option.title === 'Live Chat') {
      return '#'; // Handled by onClick below
    }
    return null;
  };

  return (
    <Layout>
      <PageContent>
        <PageTitle>{getPageTitle()}</PageTitle>
        <PageDescription>{getPageDescription()}</PageDescription>

        <ContentSection>
          <h2>Contact Us</h2>
          <p>Get in touch with our support team through any of these channels:</p>
          <SupportGrid>
            {supportOptions.map((option, index) => {
              const href = getHrefForOption(option);
              const CardComponent = href ? SupportCardLink : SupportCard;
              return (
                <CardComponent
                  key={index}
                  href={href !== '#' ? href : undefined}
                  as={href === '#' ? 'button' : undefined}
                  onClick={href === '#' ? (e) => { e.preventDefault(); setIsConsultationOpen(true); } : undefined}
                  target={option.title === 'WhatsApp' ? '_blank' : undefined}
                  rel={option.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  style={href === '#' ? { textAlign: 'left', width: '100%', font: 'inherit' } : undefined}
                >
                  <ContactInfo>
                    <ContactIcon>{option.icon}</ContactIcon>
                    <ContactDetails>
                      <ContactTitle>{option.title}</ContactTitle>
                      <ContactText>{option.description}</ContactText>
                    </ContactDetails>
                  </ContactInfo>
                  <p style={{ margin: 0, fontWeight: 600, color: '#4286F5' }}>
                    {option.details}
                  </p>
                </CardComponent>
              );
            })}
          </SupportGrid>
        </ContentSection>

        <ContentSection>
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our services:</p>
          <FAQSection>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion>{faq.question}</FAQQuestion>
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQSection>
        </ContentSection>

        <ContentSection>
          <h2>Support Hours</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <h3>Monday - Friday</h3>
              <p>9:00 AM - 8:00 PM</p>
            </div>
            <div>
              <h3>Saturday</h3>
              <p>9:00 AM - 6:00 PM</p>
            </div>
            <div>
              <h3>Sunday</h3>
              <p>10:00 AM - 4:00 PM</p>
            </div>
            <div>
              <h3>Emergency Support</h3>
              <p>24/7 for urgent issues</p>
            </div>
          </div>
        </ContentSection>

        <ContentSection>
          <h2>Request a Callback</h2>
          <p>Prefer us to call you? Leave your details and we'll get back to you within 2 hours during business hours.</p>
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
            Request Callback
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

export default CustomerSupport;
