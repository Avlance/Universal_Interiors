"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/modal/js/Modal.jsx";
import ConsultationFormContent from "@/_old_routes/home/ConsultationFormContent.jsx";

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
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ServicesContainer = styled.section`
  margin-bottom: 80px;
  padding: 60px 0 60px 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) -3.99%,
    #e8eefd 30.25%,
    #e8eefd 65.14%,
    rgba(255, 255, 255, 0) 100%
  );

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
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: var(--universal-fs-h12);
  font-family: var(--universal-font-bold);
  margin-bottom: 15px;
  color: #1a1a1a;
  text-align: center;

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h9);
  }
`;

const SectionDescription = styled.p`
  color: #222222;
  margin: 0 auto 30px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h4);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 equal-width cards
  gap: 2rem;
  width: 1180px;
  margin: 0 auto;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
  }

  /* Optional: Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ServiceCard = ({ image, title, description, fill = "#5485EE", onClick }) => (
  <ServiceCardWrapper onClick={onClick}>
    <ServiceImage>
      <img src={image} alt={title} loading="lazy" />
    </ServiceImage>
    <ServiceContent>
      <ServiceTitle className="universal-fs-h4 universal-font-medium">
        {title}
      </ServiceTitle>
      <ServiceDescription className="universal-fs-h3">
        {description}
      </ServiceDescription>
      <ServiceIconWrapper>
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none">
          <rect x="0.25" width="32" height="32" rx="16" fill={fill} />
          <g clipPath="url(#clip0_93_237)">
            <path
              d="M14.2344 10L12.8281 11.4062L17.4219 16L12.8281 20.5938L14.2344 22L20.2344 16L14.2344 10Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_93_237">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(4.25 4)"
              />
            </clipPath>
          </defs>
        </svg>
      </ServiceIconWrapper>
    </ServiceContent>
  </ServiceCardWrapper>
);

const ServiceCardWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 1.6px 6px 0px #00000029;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  // height: 400px;
  width: 250px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 1.6px 6px 0px #00000029;
  }

  @media (max-width: 900px) {
    // width: 220px;
    height: 360px;
  }

  @media (max-width: 600px) {
    // width: 90vw;
    max-width: 320px;
    height: 350px;
    margin-bottom: 24px;
    &:hover {
      transform: none;
      box-shadow: 0px 1.6px 6px 0px #00000029;
    }
  }

  @media (max-width: 400px) {
    // width: 96vw;
    height: 260px;
  }
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // transition: transform 0.5s ease;
  }

  ${ServiceCardWrapper}:hover & img {
    // transform: scale(1.05);
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
  margin-bottom: 15px;
  color: #1a1a1a;
  text-align: center;

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h4);
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
    font-size: var(--universal-fs-h3);
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

const serviceData = [
  {
    image: "/images/home/services/service-demo-1.webp",
    title: "Design Consultation",
    description: (
      <>
        <span>Expert advice</span>
        <br />
        Bring your vision to life
      </>
    ),
    fill: "#D50F25", // Add this line
  },
  {
    image: "/images/home/services/service-demo-2.webp",
    title: "Project Execution",
    description: (
      <>
        <span>Seamless management</span>
        <br />
        From start to finish
      </>
    ),
    fill: "#559944", // Add this line
  },
  {
    image: "/images/home/services/service-demo-3.webp",
    title: "Quality Assurance",
    description: (
      <>
        <span>Top-notch quality</span>
        <br />
        In every detail
      </>
    ),
    fill: "#FAC73D", // Add this line
  },
  {
    image: "/images/home/services/service-demo-4.webp",
    title: "Custom Solutions",
    description: (
      <>
        <span>Personalized interiors</span>
        <br />
        Tailored for you
      </>
    ),
    fill: "#5485EE", // Add this line
  },
];

const Services = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <ServicesContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle className="universal-fs-h8 universal-font-bold">
            Get Inspired by Real{" "}
            <span style={{ color: "Green" }}>Kitchens</span> We’ve{" "}
            <span style={{ color: "Red" }}>Designed </span>
          </SectionTitle>
          <SectionDescription className="universal-fs-h3 universal-font-medium">
            Browse our curated kitchen design gallery featuring real homes,
            styles, and budgets — and see why our customers love us!
          </SectionDescription>
          {/* <KnowMoreButton>Know More</KnowMoreButton> */}
        </SectionHeader>

        <ServicesGrid>
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              title={service.title}
              description={service.description}
              fill={service.fill}
              onClick={() => setIsConsultationOpen(true)}
            />
          ))}
        </ServicesGrid>
      </ContentWrapper>

      <Modal open={isConsultationOpen} onClose={() => setIsConsultationOpen(false)}>
        <CloseButton onClick={() => setIsConsultationOpen(false)} className="universal-fs-h8 universal-font">&times;</CloseButton>
        <ConsultationFormContent onSuccess={() => setIsConsultationOpen(false)} />
      </Modal>
    </ServicesContainer>
  );
};

export default Services;

