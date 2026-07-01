"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from '@/utils/react-router-dom';
import Layout from "../../components/layout/Layout.jsx";
import Breadcrumb from "../../components/Breadcrumb.jsx";
import styled, { keyframes } from "styled-components";
import Button from "../../components/button/js/Button.jsx";
import Modal from "../../components/modal/js/Modal.jsx";
import ConsultationFormContent from "@/_old_routes/home/ConsultationFormContent.jsx";
import HeroBanner from "./HeroBanner.jsx";
import Services from "./Services";
import YouTubeReviews from "../home/sections/YouTubeReviews.jsx";
import CustomizeModal from "./CustomizeModal.jsx";

// Modal Content Components
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
    background: rgba(255, 255, 255, 0.1);
    // color: #fff;
  }

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    font-size: 18px;
  }
`;

const StepActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  grid-column: 1 / -1;
  border-top: none;
  box-shadow: none;
  background: transparent;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LayoutCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Force 5 columns
  gap: 1rem;
  margin-bottom: 4rem;
  width: 1180px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
`;

const KitchenLayoutCardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 230px;
  min-width: 230px;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;
const SizeLeft = styled.aside`
  display: flex;
  justify-content: center;
`;
const LayoutPreviewCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 230px;
  min-width: 230px;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const LayoutImage = styled.div`
  position: relative;
  height: 169px;
  overflow: hidden;
  border-bottom: 1px solid #f0f0f0;
`;

const LayoutImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;

  ${KitchenLayoutCardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const LayoutContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardTitle = styled.h3`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.68rem;
  color: #888888;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap; /* keep on a single line */
  overflow: visible; /* don't cut off */
  text-overflow: unset;
`;

const LayoutCheckbox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;
const OuterBox = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid ${(props) => (props.selected ? "#d50f25" : "#999999")};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.selected ? "#d50f25" : "white")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
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

// Tips Section (inline styles)
// #region 3rd page 2nd section table styles
const TipsSectionContainer = styled.section`
  width: 100%;
  background: #ffffff;
  margin: 40px 0 20px 0;

  @media (max-width: 768px) {
    margin: 24px 0 12px 0;
  }
`;

const TipsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const TipsHeading = styled.h2`
  font-size: 32px;
  line-height: 1.25;
  text-align: center;
  margin: 0 0 8px 0;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const TipsSubheading = styled.p`
  text-align: center;
  color: #364152;
  margin: 0 0 28px 0;
  font-size: 14px;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const TipsColumn = styled.div`
  padding: 16px 18px;
`;

const TipItem = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 4px;
  padding: 14px 0;

  &:first-child {
    padding-top: 0;
  }
`;
const HorizontalLine = styled.div`
  width: calc(100% - 30px);
  max-width: 450px;
  height: 0;
  border: 0.5px solid #999999;
  margin-left: 30px;
`;

const TipDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f5b400; /* warm yellow like screenshot */
  margin-top: 8px;
`;

const TipTitle = styled.h4`
  margin: 0 0 6px 0;
  font-size: 16px;
  color: #0f172a;
`;

const TipDesc = styled.p`
  margin: 0;
  color: rgb(39, 43, 49);
  font-size: 14px;
  line-height: 1.55;
  text-align: left; // Ensures alignment starts from the left
  direction: 1tr;
  max-width: 480px;
`;
//#endregion

// #region 3rd page 2nd section table
const TipsSection = () => {
  const leftTips = [
    {
      title: "Know Your Property Type & Scope",
      desc: "Different home sizes demand different work scopes. Selecting the right combination (kitchen, wardrobe, furniture, etc.) ensures a practical and optimized plan.",
    },
    {
      title: "Set a Realistic Budget Range",
      desc: "Understand how interior cost varies with finish type, materials, and scale. Our calculator helps you estimate smarter.",
    },
    {
      title: "Match Design to Your Lifestyle",
      desc: "A rental setup? Or a full-fledged move-in? We help tailor your interiors based on how you plan to use the space.",
    },
    {
      title: "Choose Modular vs. Custom Wisely",
      desc: "Modular designs are quicker and cost‑efficient, while custom carpentry offers unique personalization. Pick what fits your needs.",
    },
    {
      title: "Understand Finish Grades",
      desc: "From matte laminates to high‑gloss acrylics and PU paint, your finish affects both aesthetics and cost.",
    },
  ];

  const rightTips = [
    {
      title: "Don't Overlook Accessories",
      desc: "From pull‑out trays to corner units, the little things matter. They improve functionality and long‑term usability.",
    },
    {
      title: "Know What's Included",
      desc: "Get clarity on cabinets, countertops, furniture, and fittings — what's included, and what's extra — before finalizing.",
    },
    {
      title: "Think About Room‑by‑Room Costing",
      desc: "Every room has its own demands — wardrobes in bedrooms, TV units in living rooms, and false ceilings in select zones.",
    },
    {
      title: "Look for Warranty & Quality",
      desc: "Universal Interiors packages come with material clarity and long‑term usage in mind — perfect for peace of mind.",
    },
    {
      title: "Consult with Experts",
      desc: "Use our free consultation to get a detailed estimate breakdown and refine your selections with expert help.",
    },
  ];

  return (
    <TipsSectionContainer>
      <TipsInner>
        <TipsHeading className="universal-fs-h12 universal-font-bold">
          Make Smart Interior Choices with Universal Interiors
        </TipsHeading>
        <TipsSubheading className="universal-fs-h3 universal-font-medium">
          10 Things to Know Before Estimating Your Home Interiors
        </TipsSubheading>
        <TipsGrid>
          <TipsColumn>
            {leftTips.map((tip, index) => (
              <React.Fragment key={`left-tip-${index}`}>
                <TipItem>
                  <TipDot />
                  <div>
                    <TipTitle className="universal-fs-h4 universal-font-semibold">
                      {tip.title}
                    </TipTitle>
                    <TipDesc className="universal-fs-h3 universal-font-medium">
                      {tip.desc}
                    </TipDesc>
                  </div>
                </TipItem>
                {index !== leftTips.length - 1 && <HorizontalLine />}
              </React.Fragment>
            ))}
          </TipsColumn>
          <TipsColumn>
            {rightTips.map((tip, index) => (
              <React.Fragment key={`right-tip-${index}`}>
                <TipItem>
                  <TipDot />
                  <div>
                    <TipTitle className="universal-fs-h4 universal-font-semibold">
                      {tip.title}
                    </TipTitle>
                    <TipDesc className="universal-fs-h3 universal-font-medium">
                      {tip.desc}
                    </TipDesc>
                  </div>
                </TipItem>
                {index !== leftTips.length - 1 && <HorizontalLine />}
              </React.Fragment>
            ))}
          </TipsColumn>
        </TipsGrid>
      </TipsInner>
    </TipsSectionContainer>
  );
};

// Property Type Selector Section
const PropertyTypeContainer = styled.section`
  margin-bottom: 4rem;
`;

const PropertyTypeInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
  gap: 0.25rem;
`;

const KitchenCalculatorContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const LayoutSelectionSection = styled.section`
  margin-bottom: 4rem;
  margin-left: -2.5rem;
  padding: 1rem 1rem 0.5rem -5rem;
`;

const StepNumber = styled.div`
  background: linear-gradient(to bottom, #d50f25, #f7baba00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const PropertyTypeTitle = styled.h1`
  text-align: center; /* ✅ center everything inside */
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const PropertyTypeDescription = styled.p`
  text-align: center;
  max-width: 760px;
  margin: 0.25rem auto 0;
  color: #6b7280;
  white-space: nowrap;
`;
const PropertyTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 320px;
    margin: 32px auto 0;
  }
`;

const PropertyTypeCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: #ff6b6b;
  }

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const PropertyTypeImage = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  margin-bottom: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 768px) {
    height: 140px;
  }
`;

const CheckboxCircle = styled.div`
  width: 20px;
  height: 20px;
  // background: ${(props) => (props.selected ? "#d50f25" : "white")};
  // border: 2px solid ${(props) => (props.selected ? "#d50f25" : "#333")};
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PropertyTypeLabel = styled.h3`
  text-align: center;
`;

const PropertyTypeCardDescription = styled.p`
  font-size: 0.68rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap; /* keep on a single line */
  overflow: visible; /* don't cut off */
  text-overflow: unset;
`;

const NextButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #ffffff;
  padding: 8px 0; /* reduced height */
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 -12px 24px rgba(0, 0, 0, 0.06), 0 12px 24px rgba(0, 0, 0, 0.06);
  width: 100vw;

  @media (max-width: 768px) {
    bottom: 60px;
  }

  @media (max-width: 480px) {
    bottom: 55px;
  }
`;

const NextButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  width: 100%;
  grid-column: 1 / -1;
  border-top: none;
  box-shadow: none;
  background: transparent;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1rem;
    padding: 0 16px;
  }
`;

const NextButton = styled.button`
  background: #d50f25;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  letter-spacing: 0.5px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: fit-content;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 10%;

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: var(--universal-fs-h3);
    height: 36px;
    min-height: 36px;
    border-radius: 4px;
    letter-spacing: 0.3px;
    transition: all 0.05s ease;
  }
`;

const ButtonText = styled.span`
  flex-grow: 0.5;
  text-align: center;
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PackageCardWrapper = styled.div`
  background: ${(props) => (props.$selected ? props.$accent : "#ffffff")};
  border: 2px solid
    ${(props) => (props.$selected ? props.$accent : props.$accent)};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.$selected
      ? "0 8px 24px rgba(0,0,0,0.12)"
      : "0 2px 10px rgba(0,0,0,0.06)"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
  }
`;

const PackageHeader = styled.div`
  background: ${(props) => props.$accent};
  color: #ffffff;
  padding: 16px 18px 14px 18px;
`;

const PackageTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
`;

const PackageSubtitle = styled.div`
  font-size: 14px;
  opacity: 0.95;
  line-height: 2;
  margin-top: 6px;
`;

const PackagePrice = styled.div`
  padding: 12px 18px;
  font-weight: 800;
  margin-left: -16px;
  color: ${(props) => (props.$selected ? "#ffffff" : "#ffffff")};
`;

const ApproxText = styled.span`
  color: ${(props) => (props.$selected ? "ffffff" : "#ffffff")};
  font-weight: 300;
  margin-left: 1px;
  font-size: 14px;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 18px 18px 18px;
`;

const FeatureRow = styled.li`
  display: grid;
  grid-template-columns: 14px 1fr;
  column-gap: 12px;
  align-items: start;
  color: ${(props) => (props.$selected ? "#ffffff" : "#888888")};
  font-size: 14px;
  line-height: 1.7;
  padding: 14px 0;
  border-bottom: ${(props) =>
    props.$isLast
      ? "none"
      : props.$selected
      ? "1px solid #D0D0D0"
      : "1px solid #8692A6"};
`;

const BulletDot = styled.span`
  width: 6px;
  height: 6px;
  margin-top: 10px;
  border-radius: 50%;
  background: ${(props) => (props.$selected ? "#ffffff" : "#9CA3AF")};
  display: inline-block;
`;

const FeatureText = styled.span`
  display: block;
`;

const PropertyTypeSelector = ({ onPropertySelect, onProceedNext }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("moveIn");
  const [dimensions, setDimensions] = useState({
    // 'moveIn' or 'rental'
    length: { feet: 12, inches: 10 },
  });

  const propertyTypes = [
    {
      id: "1bhk",
      label: "1 BHK",
      description: "Ideal for small to medium homes",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657678/local_assets_migrated/home/design-ideas/living-room-1.webp",
    },
    {
      id: "2bhk",
      label: "2 BHK",
      description: "Best for narrow kitchen spaces",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657680/local_assets_migrated/home/design-ideas/living-room-2.webp",
    },
    {
      id: "3bhk",
      label: "3 BHK",
      description: "Luxury layout with open space",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657681/local_assets_migrated/home/design-ideas/living-room-3.webp",
    },
    {
      id: "4bhk",
      label: "4 BHK",
      description: "Compact and efficient",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657682/local_assets_migrated/home/design-ideas/living-room-4.webp",
    },
  ];

  const popupOptions = [
    {
      id: "moveIn",
      label: "Move In",
      description: "Full setup with all essentials",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2940_7259)">
            <path d="M24 48L0 33.6V14.4L24 28.8V48Z" fill="#89664C" />
            <path d="M24 28.8V48L48 33.6V14.4L24 28.8Z" fill="#FED0AC" />
            <path d="M0 14.4L24 28.8L48 14.4L24 0L0 14.4Z" fill="#D3976E" />
            <path
              d="M38.175 20.25L14.25 5.84998L9.75 8.54997L33.75 22.95L38.175 20.25Z"
              fill="#89664C"
            />
            <path
              d="M29.4766 5.09999L24.1516 1.79999L19.7266 4.49999L25.0516 7.72499L29.4766 5.09999Z"
              fill="#D0D0D0"
            />
            <path
              d="M38.0984 20.325L33.8984 22.875V29.775L38.0984 27.225V20.325Z"
              fill="#D3976E"
            />
            <path
              d="M46.8758 16.575L42.6008 19.125V26.025L46.8758 23.475V16.575ZM31.2008 32.625L25.4258 36.075V45.525L31.2008 42V32.625Z"
              fill="white"
            />
            <path
              d="M33.8984 42.075L38.0984 39.525V32.625L33.8984 35.175V42.075Z"
              fill="#D3976E"
            />
          </g>
          <defs>
            <clipPath id="clip0_2940_7259">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: "rental",
      label: "Rental",
      description: "Budget-friendly functional setup",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.98047 28.0544H44.9595V44.9999H2.98047V28.0544Z"
            fill="url(#paint0_linear_2940_6804)"
          />
          <path
            d="M6.16556 9.76499C6.16556 9.62575 6.22087 9.49222 6.31933 9.39376C6.41779 9.2953 6.55132 9.23999 6.69056 9.23999H8.60156C8.7408 9.23999 8.87434 9.2953 8.97279 9.39376C9.07125 9.49222 9.12656 9.62575 9.12656 9.76499V17.808H6.16406L6.16556 9.76499Z"
            fill="url(#paint1_radial_2940_6804)"
          />
          <path
            d="M6.16556 9.76499C6.16556 9.62575 6.22087 9.49222 6.31933 9.39376C6.41779 9.2953 6.55132 9.23999 6.69056 9.23999H8.60156C8.7408 9.23999 8.87434 9.2953 8.97279 9.39376C9.07125 9.49222 9.12656 9.62575 9.12656 9.76499V17.808H6.16406L6.16556 9.76499Z"
            fill="url(#paint2_linear_2940_6804)"
          />
          <path
            d="M6.16556 9.76499C6.16556 9.62575 6.22087 9.49222 6.31933 9.39376C6.41779 9.2953 6.55132 9.23999 6.69056 9.23999H8.60156C8.7408 9.23999 8.87434 9.2953 8.97279 9.39376C9.07125 9.49222 9.12656 9.62575 9.12656 9.76499V17.808H6.16406L6.16556 9.76499Z"
            fill="url(#paint3_linear_2940_6804)"
          />
          <path
            d="M6.16556 9.76499C6.16556 9.62575 6.22087 9.49222 6.31933 9.39376C6.41779 9.2953 6.55132 9.23999 6.69056 9.23999H8.60156C8.7408 9.23999 8.87434 9.2953 8.97279 9.39376C9.07125 9.49222 9.12656 9.62575 9.12656 9.76499V17.808H6.16406L6.16556 9.76499Z"
            fill="url(#paint4_linear_2940_6804)"
          />
          <path
            d="M6.16556 9.76499C6.16556 9.62575 6.22087 9.49222 6.31933 9.39376C6.41779 9.2953 6.55132 9.23999 6.69056 9.23999H8.60156C8.7408 9.23999 8.87434 9.2953 8.97279 9.39376C9.07125 9.49222 9.12656 9.62575 9.12656 9.76499V17.808H6.16406L6.16556 9.76499Z"
            fill="url(#paint5_radial_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint6_linear_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint7_linear_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint8_radial_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint9_linear_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint10_radial_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint11_linear_2940_6804)"
          />
          <path
            d="M21.1571 28.5465H4.64062V18.027L12.8996 9.612L21.1571 18.027V28.5465Z"
            fill="url(#paint12_linear_2940_6804)"
          />
          <path
            d="M23.1708 18.402L13.4028 8.77947C13.2284 8.60544 12.9922 8.50769 12.7458 8.50769C12.4995 8.50769 12.2632 8.60544 12.0888 8.77947C12.0888 8.77947 12.0798 8.77947 12.0798 8.78997L2.29081 18.423C2.20491 18.5073 2.13668 18.6079 2.0901 18.7189C2.04352 18.8299 2.01953 18.9491 2.01953 19.0695C2.01953 19.1899 2.04352 19.309 2.0901 19.42C2.13668 19.531 2.20491 19.6316 2.29081 19.716C2.46649 19.8875 2.70228 19.9835 2.94781 19.9835C3.19333 19.9835 3.42912 19.8875 3.60481 19.716L12.4788 10.974C12.5489 10.9053 12.6432 10.8668 12.7413 10.8668C12.8395 10.8668 12.9337 10.9053 13.0038 10.974L21.8463 19.6845C22.0207 19.8585 22.257 19.9563 22.5033 19.9563C22.7497 19.9563 22.9859 19.8585 23.1603 19.6845C23.247 19.602 23.3161 19.5029 23.3637 19.3931C23.4113 19.2833 23.4363 19.1651 23.4373 19.0454C23.4383 18.9258 23.4152 18.8072 23.3694 18.6966C23.3236 18.5861 23.2561 18.4859 23.1708 18.402Z"
            fill="url(#paint13_linear_2940_6804)"
          />
          <g filter="url(#filter0_f_2940_6804)">
            <path
              d="M12.8984 9.23999L22.6934 18.885"
              stroke="url(#paint14_linear_2940_6804)"
              strokeWidth="0.15"
              strokeLinecap="round"
            />
          </g>
          <g filter="url(#filter1_f_2940_6804)">
            <path
              d="M12.9005 9.23999L3.10547 18.885"
              stroke="url(#paint15_linear_2940_6804)"
              strokeOpacity="0.5"
              strokeWidth="0.15"
              strokeLinecap="round"
            />
          </g>
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint16_radial_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint17_linear_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint18_linear_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint19_linear_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint20_radial_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint21_radial_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint22_linear_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint23_linear_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint24_linear_2940_6804)"
          />
          <path
            d="M28.7109 9.76499C28.7109 9.62575 28.7662 9.49222 28.8647 9.39376C28.9632 9.2953 29.0967 9.23999 29.2359 9.23999H31.1484C31.2174 9.23999 31.2857 9.25357 31.3493 9.27995C31.413 9.30634 31.4709 9.34501 31.5197 9.39376C31.5684 9.44251 31.6071 9.50039 31.6335 9.56408C31.6599 9.62778 31.6734 9.69605 31.6734 9.76499V17.808H28.7109V9.76499Z"
            fill="url(#paint25_radial_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint26_linear_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint27_linear_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint28_radial_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint29_linear_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint30_radial_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint31_linear_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint32_linear_2940_6804)"
          />
          <path
            d="M43.7055 28.5465H27.1875V18.027L35.4465 9.612L43.704 18.027L43.7055 28.5465Z"
            fill="url(#paint33_radial_2940_6804)"
          />
          <path
            d="M45.7162 18.402L35.9497 8.77947C35.7753 8.60544 35.539 8.50769 35.2927 8.50769C35.0463 8.50769 34.81 8.60544 34.6357 8.77947C34.6357 8.77947 34.6252 8.77947 34.6252 8.78997L24.8377 18.423C24.7518 18.5073 24.6836 18.6079 24.637 18.7189C24.5904 18.8299 24.5664 18.9491 24.5664 19.0695C24.5664 19.1899 24.5904 19.309 24.637 19.42C24.6836 19.531 24.7518 19.6316 24.8377 19.716C25.0133 19.887 25.2488 19.9828 25.4939 19.9828C25.7391 19.9828 25.9746 19.887 26.1502 19.716L35.0242 10.974C35.0943 10.9053 35.1885 10.8668 35.2867 10.8668C35.3848 10.8668 35.4791 10.9053 35.5492 10.974L44.3917 19.6845C44.566 19.8585 44.8023 19.9563 45.0487 19.9563C45.295 19.9563 45.5313 19.8585 45.7057 19.6845C45.7921 19.6019 45.8611 19.5027 45.9086 19.393C45.9561 19.2832 45.981 19.165 45.982 19.0454C45.983 18.9259 45.96 18.8073 45.9143 18.6968C45.8687 18.5862 45.8013 18.486 45.7162 18.402Z"
            fill="url(#paint34_linear_2940_6804)"
          />
          <g filter="url(#filter2_f_2940_6804)">
            <path
              d="M35.4453 9.23999L45.2403 18.885"
              stroke="url(#paint35_linear_2940_6804)"
              strokeWidth="0.15"
              strokeLinecap="round"
            />
          </g>
          <g filter="url(#filter3_f_2940_6804)">
            <path
              d="M35.4434 9.23999L25.6484 18.885"
              stroke="url(#paint36_linear_2940_6804)"
              strokeOpacity="0.5"
              strokeWidth="0.15"
              strokeLinecap="round"
            />
          </g>
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint37_linear_2940_6804)"
          />
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint38_linear_2940_6804)"
          />
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint39_radial_2940_6804)"
          />
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint40_linear_2940_6804)"
          />
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint41_radial_2940_6804)"
          />
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint42_linear_2940_6804)"
          />
          <path
            d="M36.3978 39.1439H11.8203V23.8109L24.1083 11.5439L36.3978 23.8109V39.1439Z"
            fill="url(#paint43_linear_2940_6804)"
          />
          <g filter="url(#filter4_f_2940_6804)">
            <path
              d="M22.877 38.718H14.957V27.822C14.957 26.9925 15.563 26.31 16.3025 26.31H21.53C22.268 26.31 22.8755 26.9925 22.8755 27.8235L22.877 38.718Z"
              fill="url(#paint44_linear_2940_6804)"
            />
          </g>
          <g filter="url(#filter5_i_2940_6804)">
            <path
              d="M32.6666 32.5575H27.8891C27.7636 32.5575 27.6394 32.5328 27.5234 32.4848C27.4075 32.4367 27.3022 32.3664 27.2135 32.2776C27.1247 32.1889 27.0543 32.0836 27.0063 31.9676C26.9583 31.8517 26.9336 31.7275 26.9336 31.602V26.823C26.9336 26.286 27.3686 25.8675 27.8891 25.8675H32.6666C33.2021 25.8675 33.6221 26.3025 33.6221 26.823V31.602C33.6235 31.7279 33.5997 31.8527 33.5522 31.9693C33.5047 32.0859 33.4344 32.1918 33.3454 32.2808C33.2564 32.3698 33.1505 32.4401 33.0339 32.4876C32.9173 32.5351 32.7925 32.5589 32.6666 32.5575Z"
              fill="url(#paint45_linear_2940_6804)"
            />
            <path
              d="M32.6666 32.5575H27.8891C27.7636 32.5575 27.6394 32.5328 27.5234 32.4848C27.4075 32.4367 27.3022 32.3664 27.2135 32.2776C27.1247 32.1889 27.0543 32.0836 27.0063 31.9676C26.9583 31.8517 26.9336 31.7275 26.9336 31.602V26.823C26.9336 26.286 27.3686 25.8675 27.8891 25.8675H32.6666C33.2021 25.8675 33.6221 26.3025 33.6221 26.823V31.602C33.6235 31.7279 33.5997 31.8527 33.5522 31.9693C33.5047 32.0859 33.4344 32.1918 33.3454 32.2808C33.2564 32.3698 33.1505 32.4401 33.0339 32.4876C32.9173 32.5351 32.7925 32.5589 32.6666 32.5575Z"
              fill="url(#paint46_linear_2940_6804)"
            />
          </g>
          <path
            d="M32.6666 32.5575H27.8891C27.7636 32.5575 27.6394 32.5328 27.5234 32.4848C27.4075 32.4367 27.3022 32.3664 27.2135 32.2776C27.1247 32.1889 27.0543 32.0836 27.0063 31.9676C26.9583 31.8517 26.9336 31.7275 26.9336 31.602V26.823C26.9336 26.286 27.3686 25.8675 27.8891 25.8675H32.6666C33.2021 25.8675 33.6221 26.3025 33.6221 26.823V31.602C33.6235 31.7279 33.5997 31.8527 33.5522 31.9693C33.5047 32.0859 33.4344 32.1918 33.3454 32.2808C33.2564 32.3698 33.1505 32.4401 33.0339 32.4876C32.9173 32.5351 32.7925 32.5589 32.6666 32.5575Z"
            fill="url(#paint47_linear_2940_6804)"
          />
          <path
            d="M32.6666 32.5575H27.8891C27.7636 32.5575 27.6394 32.5328 27.5234 32.4848C27.4075 32.4367 27.3022 32.3664 27.2135 32.2776C27.1247 32.1889 27.0543 32.0836 27.0063 31.9676C26.9583 31.8517 26.9336 31.7275 26.9336 31.602V26.823C26.9336 26.286 27.3686 25.8675 27.8891 25.8675H32.6666C33.2021 25.8675 33.6221 26.3025 33.6221 26.823V31.602C33.6235 31.7279 33.5997 31.8527 33.5522 31.9693C33.5047 32.0859 33.4344 32.1918 33.3454 32.2808C33.2564 32.3698 33.1505 32.4401 33.0339 32.4876C32.9173 32.5351 32.7925 32.5589 32.6666 32.5575Z"
            fill="url(#paint48_linear_2940_6804)"
          />
          <g filter="url(#filter6_ii_2940_6804)">
            <path
              d="M24.2358 37.8525H15.4023V27.1695C15.4071 26.7745 15.5674 26.3974 15.8485 26.1199C16.1296 25.8425 16.5089 25.6871 16.9038 25.6875H22.7343C23.1291 25.6875 23.5079 25.843 23.7887 26.1205C24.0695 26.3979 24.2296 26.7748 24.2343 27.1695L24.2358 37.8525Z"
              fill="url(#paint49_linear_2940_6804)"
            />
          </g>
          <g filter="url(#filter7_f_2940_6804)">
            <path
              d="M22.0235 32.619C22.1923 32.619 22.3543 32.5519 22.4737 32.4325C22.5931 32.313 22.6602 32.1511 22.6602 31.9822C22.6602 31.8133 22.5931 31.6514 22.4737 31.532C22.3543 31.4125 22.1923 31.3455 22.0235 31.3455C21.8546 31.3455 21.6926 31.4125 21.5732 31.532C21.4538 31.6514 21.3867 31.8133 21.3867 31.9822C21.3867 32.1511 21.4538 32.313 21.5732 32.4325C21.6926 32.5519 21.8546 32.619 22.0235 32.619Z"
              fill="#62393D"
            />
          </g>
          <path
            d="M39.6133 23.9564L25.0783 9.63894C24.8187 9.38036 24.4673 9.23517 24.101 9.23517C23.7347 9.23517 23.3832 9.38036 23.1237 9.63894C23.1237 9.63894 23.1087 9.63894 23.1087 9.65394L8.54375 23.9879C8.41608 24.1136 8.31469 24.2634 8.24548 24.4286C8.17627 24.5938 8.14063 24.7711 8.14063 24.9502C8.14062 25.1293 8.17627 25.3066 8.24548 25.4718C8.31469 25.637 8.41608 25.7868 8.54375 25.9124C8.80458 26.1685 9.15549 26.312 9.521 26.312C9.88651 26.312 10.2374 26.1685 10.4982 25.9124L23.8302 12.7769C23.9003 12.7082 23.9946 12.6697 24.0928 12.6697C24.1909 12.6697 24.2852 12.7082 24.3552 12.7769L37.6423 25.8659C38.1822 26.4059 39.0582 26.4059 39.5967 25.8659C40.1367 25.3259 40.1517 24.4799 39.6117 23.9564"
            fill="url(#paint50_linear_2940_6804)"
          />
          <g filter="url(#filter8_ii_2940_6804)">
            <path
              d="M22.1867 32.5229C22.2737 32.5271 22.3606 32.5136 22.4423 32.4832C22.5239 32.4528 22.5986 32.4062 22.6616 32.3461C22.7247 32.286 22.7749 32.2137 22.8092 32.1336C22.8435 32.0535 22.8612 31.9673 22.8612 31.8802C22.8612 31.7931 22.8435 31.7069 22.8092 31.6268C22.7749 31.5467 22.7247 31.4744 22.6616 31.4143C22.5986 31.3542 22.5239 31.3076 22.4423 31.2771C22.3606 31.2467 22.2737 31.2332 22.1867 31.2374C22.0216 31.2454 21.8659 31.3166 21.7518 31.4363C21.6378 31.556 21.5742 31.7149 21.5742 31.8802C21.5742 32.0455 21.6378 32.2044 21.7518 32.3241C21.8659 32.4438 22.0216 32.515 22.1867 32.5229Z"
              fill="#895D56"
            />
          </g>
          <path
            d="M14.2632 38.9775C14.2632 38.6791 14.3817 38.393 14.5927 38.182C14.8037 37.971 15.0899 37.8525 15.3882 37.8525H24.1422C24.4406 37.8525 24.7267 37.971 24.9377 38.182C25.1487 38.393 25.2672 38.6791 25.2672 38.9775V39.1425H14.2617L14.2632 38.9775Z"
            fill="url(#paint51_linear_2940_6804)"
          />
          <path
            d="M14.2632 38.9775C14.2632 38.6791 14.3817 38.393 14.5927 38.182C14.8037 37.971 15.0899 37.8525 15.3882 37.8525H24.1422C24.4406 37.8525 24.7267 37.971 24.9377 38.182C25.1487 38.393 25.2672 38.6791 25.2672 38.9775V39.1425H14.2617L14.2632 38.9775Z"
            fill="url(#paint52_linear_2940_6804)"
          />
          <path
            d="M14.2632 38.9775C14.2632 38.6791 14.3817 38.393 14.5927 38.182C14.8037 37.971 15.0899 37.8525 15.3882 37.8525H24.1422C24.4406 37.8525 24.7267 37.971 24.9377 38.182C25.1487 38.393 25.2672 38.6791 25.2672 38.9775V39.1425H14.2617L14.2632 38.9775Z"
            fill="url(#paint53_linear_2940_6804)"
          />
          <g filter="url(#filter9_f_2940_6804)">
            <path
              d="M24.3281 10.3245L38.9036 24.6765"
              stroke="url(#paint54_linear_2940_6804)"
              strokeWidth="0.15"
              strokeLinecap="round"
            />
          </g>
          <g filter="url(#filter10_f_2940_6804)">
            <path
              d="M24.3279 10.3245L9.75391 24.6765"
              stroke="url(#paint55_linear_2940_6804)"
              strokeOpacity="0.5"
              strokeWidth="0.15"
              strokeLinecap="round"
            />
          </g>
          <g filter="url(#filter11_i_2940_6804)">
            <path
              d="M39.7559 39.12C40.5672 38.8288 41.2692 38.295 41.7667 37.5911C42.2642 36.8873 42.5331 36.0474 42.5369 35.1855C42.5369 32.8695 40.6304 30.9915 38.2769 30.9915C37.6186 30.9899 36.9687 31.1405 36.3781 31.4314C35.7875 31.7222 35.272 32.1456 34.8719 32.6685C34.3319 33.375 33.5759 33.966 32.8514 34.4835C32.481 34.7458 32.1785 35.0928 31.9693 35.4957C31.76 35.8985 31.65 36.3455 31.6484 36.7995C31.6484 37.755 32.1239 38.5995 32.8544 39.12H39.7559Z"
              fill="#2EAD69"
            />
            <path
              d="M39.7559 39.12C40.5672 38.8288 41.2692 38.295 41.7667 37.5911C42.2642 36.8873 42.5331 36.0474 42.5369 35.1855C42.5369 32.8695 40.6304 30.9915 38.2769 30.9915C37.6186 30.9899 36.9687 31.1405 36.3781 31.4314C35.7875 31.7222 35.272 32.1456 34.8719 32.6685C34.3319 33.375 33.5759 33.966 32.8514 34.4835C32.481 34.7458 32.1785 35.0928 31.9693 35.4957C31.76 35.8985 31.65 36.3455 31.6484 36.7995C31.6484 37.755 32.1239 38.5995 32.8544 39.12H39.7559Z"
              fill="url(#paint56_linear_2940_6804)"
            />
            <path
              d="M39.7559 39.12C40.5672 38.8288 41.2692 38.295 41.7667 37.5911C42.2642 36.8873 42.5331 36.0474 42.5369 35.1855C42.5369 32.8695 40.6304 30.9915 38.2769 30.9915C37.6186 30.9899 36.9687 31.1405 36.3781 31.4314C35.7875 31.7222 35.272 32.1456 34.8719 32.6685C34.3319 33.375 33.5759 33.966 32.8514 34.4835C32.481 34.7458 32.1785 35.0928 31.9693 35.4957C31.76 35.8985 31.65 36.3455 31.6484 36.7995C31.6484 37.755 32.1239 38.5995 32.8544 39.12H39.7559Z"
              fill="url(#paint57_radial_2940_6804)"
            />
            <path
              d="M39.7559 39.12C40.5672 38.8288 41.2692 38.295 41.7667 37.5911C42.2642 36.8873 42.5331 36.0474 42.5369 35.1855C42.5369 32.8695 40.6304 30.9915 38.2769 30.9915C37.6186 30.9899 36.9687 31.1405 36.3781 31.4314C35.7875 31.7222 35.272 32.1456 34.8719 32.6685C34.3319 33.375 33.5759 33.966 32.8514 34.4835C32.481 34.7458 32.1785 35.0928 31.9693 35.4957C31.76 35.8985 31.65 36.3455 31.6484 36.7995C31.6484 37.755 32.1239 38.5995 32.8544 39.12H39.7559Z"
              fill="url(#paint58_radial_2940_6804)"
            />
          </g>
          <g filter="url(#filter12_i_2940_6804)">
            <path
              d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
              fill="#2EAD69"
            />
            <path
              d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
              fill="url(#paint59_linear_2940_6804)"
            />
            <path
              d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
              fill="url(#paint60_radial_2940_6804)"
            />
            <path
              d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
              fill="url(#paint61_radial_2940_6804)"
            />
          </g>
          <g filter="url(#filter13_i_2940_6804)">
            <path
              d="M43.4378 30.15C43.882 29.9909 44.2664 29.6987 44.5385 29.3132C44.8107 28.9278 44.9574 28.4678 44.9588 27.996C44.9588 26.7285 43.9163 25.701 42.6278 25.701C41.7518 25.701 40.9898 26.1765 40.5908 26.88C40.4367 27.1365 40.2058 27.338 39.9308 27.456C39.6792 27.5671 39.4616 27.743 39.3001 27.9657C39.1386 28.1884 39.0391 28.4499 39.0117 28.7236C38.9842 28.9973 39.0298 29.2734 39.1439 29.5237C39.2579 29.774 39.4363 29.9896 39.6608 30.1485L43.4378 30.15Z"
              fill="#3ABD6C"
            />
            <path
              d="M43.4378 30.15C43.882 29.9909 44.2664 29.6987 44.5385 29.3132C44.8107 28.9278 44.9574 28.4678 44.9588 27.996C44.9588 26.7285 43.9163 25.701 42.6278 25.701C41.7518 25.701 40.9898 26.1765 40.5908 26.88C40.4367 27.1365 40.2058 27.338 39.9308 27.456C39.6792 27.5671 39.4616 27.743 39.3001 27.9657C39.1386 28.1884 39.0391 28.4499 39.0117 28.7236C38.9842 28.9973 39.0298 29.2734 39.1439 29.5237C39.2579 29.774 39.4363 29.9896 39.6608 30.1485L43.4378 30.15Z"
              fill="url(#paint62_linear_2940_6804)"
            />
            <path
              d="M43.4378 30.15C43.882 29.9909 44.2664 29.6987 44.5385 29.3132C44.8107 28.9278 44.9574 28.4678 44.9588 27.996C44.9588 26.7285 43.9163 25.701 42.6278 25.701C41.7518 25.701 40.9898 26.1765 40.5908 26.88C40.4367 27.1365 40.2058 27.338 39.9308 27.456C39.6792 27.5671 39.4616 27.743 39.3001 27.9657C39.1386 28.1884 39.0391 28.4499 39.0117 28.7236C38.9842 28.9973 39.0298 29.2734 39.1439 29.5237C39.2579 29.774 39.4363 29.9896 39.6608 30.1485L43.4378 30.15Z"
              fill="url(#paint63_radial_2940_6804)"
            />
            <path
              d="M43.4378 30.15C43.882 29.9909 44.2664 29.6987 44.5385 29.3132C44.8107 28.9278 44.9574 28.4678 44.9588 27.996C44.9588 26.7285 43.9163 25.701 42.6278 25.701C41.7518 25.701 40.9898 26.1765 40.5908 26.88C40.4367 27.1365 40.2058 27.338 39.9308 27.456C39.6792 27.5671 39.4616 27.743 39.3001 27.9657C39.1386 28.1884 39.0391 28.4499 39.0117 28.7236C38.9842 28.9973 39.0298 29.2734 39.1439 29.5237C39.2579 29.774 39.4363 29.9896 39.6608 30.1485L43.4378 30.15Z"
              fill="url(#paint64_radial_2940_6804)"
            />
          </g>
          <g filter="url(#filter14_i_2940_6804)">
            <path
              d="M4.71 30.15C4.26552 29.9911 3.88083 29.699 3.60838 29.3136C3.33593 28.9281 3.18896 28.468 3.1875 27.996C3.1875 26.7285 4.2315 25.701 5.5185 25.701C6.3945 25.701 7.1565 26.1765 7.5555 26.88C7.70996 27.1368 7.94142 27.3383 8.217 27.456C8.7645 27.7035 9.147 28.248 9.147 28.881C9.147 29.403 8.886 29.865 8.487 30.15H4.71Z"
              fill="#2BA75C"
            />
            <path
              d="M4.71 30.15C4.26552 29.9911 3.88083 29.699 3.60838 29.3136C3.33593 28.9281 3.18896 28.468 3.1875 27.996C3.1875 26.7285 4.2315 25.701 5.5185 25.701C6.3945 25.701 7.1565 26.1765 7.5555 26.88C7.70996 27.1368 7.94142 27.3383 8.217 27.456C8.7645 27.7035 9.147 28.248 9.147 28.881C9.147 29.403 8.886 29.865 8.487 30.15H4.71Z"
              fill="url(#paint65_linear_2940_6804)"
            />
            <path
              d="M4.71 30.15C4.26552 29.9911 3.88083 29.699 3.60838 29.3136C3.33593 28.9281 3.18896 28.468 3.1875 27.996C3.1875 26.7285 4.2315 25.701 5.5185 25.701C6.3945 25.701 7.1565 26.1765 7.5555 26.88C7.70996 27.1368 7.94142 27.3383 8.217 27.456C8.7645 27.7035 9.147 28.248 9.147 28.881C9.147 29.403 8.886 29.865 8.487 30.15H4.71Z"
              fill="url(#paint66_radial_2940_6804)"
            />
          </g>
          <path
            d="M39.7559 39.12C40.5672 38.8288 41.2692 38.295 41.7667 37.5911C42.2642 36.8873 42.5331 36.0474 42.5369 35.1855C42.5369 32.8695 40.6304 30.9915 38.2769 30.9915C37.6186 30.9899 36.9687 31.1405 36.3781 31.4314C35.7875 31.7222 35.272 32.1456 34.8719 32.6685C34.3319 33.375 33.5759 33.966 32.8514 34.4835C32.481 34.7458 32.1785 35.0928 31.9693 35.4957C31.76 35.8985 31.65 36.3455 31.6484 36.7995C31.6484 37.755 32.1239 38.5995 32.8544 39.12H39.7559Z"
            fill="url(#paint67_radial_2940_6804)"
          />
          <path
            d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
            fill="url(#paint68_radial_2940_6804)"
          />
          <path
            d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
            fill="url(#paint69_linear_2940_6804)"
          />
          <path
            d="M8.46309 39.12C7.65212 38.8285 6.95042 38.2946 6.4532 37.5908C5.95597 36.887 5.68729 36.0472 5.68359 35.1855C5.68359 32.8695 7.59009 30.9915 9.94359 30.9915C11.3356 30.9915 12.5731 31.65 13.3486 32.6685C13.8886 33.375 14.6446 33.966 15.3691 34.4835C16.0981 35.0025 16.5706 35.847 16.5706 36.7995C16.5706 37.755 16.0966 38.5995 15.3661 39.12H8.46309Z"
            fill="url(#paint70_radial_2940_6804)"
          />
          <path
            d="M43.4378 30.15C43.882 29.9909 44.2664 29.6987 44.5385 29.3132C44.8107 28.9278 44.9574 28.4678 44.9588 27.996C44.9588 26.7285 43.9163 25.701 42.6278 25.701C41.7518 25.701 40.9898 26.1765 40.5908 26.88C40.4367 27.1365 40.2058 27.338 39.9308 27.456C39.6792 27.5671 39.4616 27.743 39.3001 27.9657C39.1386 28.1884 39.0391 28.4499 39.0117 28.7236C38.9842 28.9973 39.0298 29.2734 39.1439 29.5237C39.2579 29.774 39.4363 29.9896 39.6608 30.1485L43.4378 30.15Z"
            fill="url(#paint71_radial_2940_6804)"
          />
          <path
            d="M4.71 30.15C4.26552 29.9911 3.88083 29.699 3.60838 29.3136C3.33593 28.9281 3.18896 28.468 3.1875 27.996C3.1875 26.7285 4.2315 25.701 5.5185 25.701C6.3945 25.701 7.1565 26.1765 7.5555 26.88C7.70996 27.1368 7.94142 27.3383 8.217 27.456C8.7645 27.7035 9.147 28.248 9.147 28.881C9.147 29.403 8.886 29.865 8.487 30.15H4.71Z"
            fill="url(#paint72_radial_2940_6804)"
          />
          <g filter="url(#filter15_f_2940_6804)">
            <path
              d="M36.1055 38.0489C35.4423 37.193 34.9785 36.1999 34.748 35.142C34.7105 34.962 34.52 34.8465 34.3475 34.9125L34.103 35.004C33.7199 35.1494 33.3998 35.4245 33.1986 35.7814C32.9973 36.1384 32.9275 36.5546 33.0013 36.9576C33.0752 37.3607 33.288 37.7252 33.6027 37.9876C33.9174 38.25 34.3142 38.3938 34.724 38.394H35.9465C36.1205 38.394 36.2135 38.1839 36.1055 38.0489Z"
              fill="#31B570"
            />
          </g>
          <g filter="url(#filter16_f_2940_6804)">
            <path
              d="M41.4397 29.565C40.9972 29.007 40.7797 28.365 40.6972 27.9735C40.6762 27.8745 40.5727 27.8115 40.4782 27.8475L40.3447 27.8985C40.1371 27.9797 39.9642 28.1306 39.8557 28.3254C39.7472 28.5202 39.7099 28.7466 39.7502 28.9659C39.7904 29.1852 39.9058 29.3836 40.0764 29.5271C40.247 29.6707 40.4622 29.7503 40.6852 29.7525H41.3542C41.4487 29.7525 41.4997 29.64 41.4397 29.565Z"
              fill="#31B570"
            />
          </g>
          <g filter="url(#filter17_f_2940_6804)">
            <path
              d="M6.70941 29.565C7.15191 29.007 7.36941 28.365 7.45191 27.9735C7.47291 27.8745 7.57641 27.8115 7.67091 27.8475L7.80591 27.8985C8.01515 27.9783 8.18982 28.1289 8.2996 28.3241C8.40938 28.5193 8.44734 28.7468 8.40688 28.9671C8.36643 29.1874 8.25011 29.3865 8.07813 29.53C7.90616 29.6734 7.68937 29.7522 7.46541 29.7525H6.79641C6.70041 29.7525 6.64941 29.64 6.70941 29.565Z"
              fill="#31B570"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2940_6804"
              x="12.5242"
              y="8.86498"
              width="10.5453"
              height="10.395"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.15"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter1_f_2940_6804"
              x="2.73125"
              y="8.86498"
              width="10.5453"
              height="10.395"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.15"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter2_f_2940_6804"
              x="35.0711"
              y="8.86498"
              width="10.5453"
              height="10.395"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.15"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter3_f_2940_6804"
              x="25.2742"
              y="8.86498"
              width="10.5453"
              height="10.395"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.15"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter4_f_2940_6804"
              x="14.707"
              y="26.06"
              width="8.42188"
              height="12.908"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.125"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter5_i_2940_6804"
              x="26.6836"
              y="25.8675"
              width="6.9375"
              height="6.94006"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.25" dy="0.25" />
              <feGaussianBlur stdDeviation="0.125" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0470588 0 0 0 0 0.47451 0 0 0 0 0.792157 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter6_ii_2940_6804"
              x="15.3023"
              y="25.6875"
              width="9.05703"
              height="12.165"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.125" />
              <feGaussianBlur stdDeviation="0.125" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.254902 0 0 0 0 0.188235 0 0 0 0 0.141176 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.1" />
              <feGaussianBlur stdDeviation="0.075" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.694118 0 0 0 0 0.470588 0 0 0 0 0.407843 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_2940_6804"
                result="effect2_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter7_f_2940_6804"
              x="21.3117"
              y="31.2705"
              width="1.42344"
              height="1.4235"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.0375"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter8_ii_2940_6804"
              x="21.5242"
              y="31.2367"
              width="1.38516"
              height="1.28699"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.05" />
              <feGaussianBlur stdDeviation="0.05" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.694118 0 0 0 0 0.482353 0 0 0 0 0.419608 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.05" />
              <feGaussianBlur stdDeviation="0.05" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.290196 0 0 0 0 0.184314 0 0 0 0 0.164706 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_innerShadow_2940_6804"
                result="effect2_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter9_f_2940_6804"
              x="23.9539"
              y="9.94945"
              width="15.3266"
              height="15.102"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.15"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter10_f_2940_6804"
              x="9.37969"
              y="9.94945"
              width="15.3227"
              height="15.102"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.15"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter11_i_2940_6804"
              x="31.6484"
              y="30.9915"
              width="10.9867"
              height="8.22854"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.1" dy="0.1" />
              <feGaussianBlur stdDeviation="0.15" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter12_i_2940_6804"
              x="5.68359"
              y="30.9915"
              width="10.9867"
              height="8.22848"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.1" dy="0.1" />
              <feGaussianBlur stdDeviation="0.15" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter13_i_2940_6804"
              x="39.0039"
              y="25.701"
              width="6.05313"
              height="4.54897"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.1" dy="0.1" />
              <feGaussianBlur stdDeviation="0.15" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter14_i_2940_6804"
              x="3.1875"
              y="25.701"
              width="6.06094"
              height="4.54897"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.1" dy="0.1" />
              <feGaussianBlur stdDeviation="0.15" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.309804 0 0 0 0 0.564706 0 0 0 0 0.329412 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2940_6804"
              />
            </filter>
            <filter
              id="filter15_f_2940_6804"
              x="32.5977"
              y="34.5187"
              width="3.92969"
              height="4.25031"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.1875"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter16_f_2940_6804"
              x="39.3594"
              y="27.4622"
              width="2.48047"
              height="2.66522"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.1875"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <filter
              id="filter17_f_2940_6804"
              x="6.30859"
              y="27.4622"
              width="2.48828"
              height="2.66522"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="0.1875"
                result="effect1_foregroundBlur_2940_6804"
              />
            </filter>
            <linearGradient
              id="paint0_linear_2940_6804"
              x1="5.32497"
              y1="40.2659"
              x2="44.043"
              y2="40.2659"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#42CF80" />
              <stop offset="1" stopColor="#50DB92" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(8.72606 9.71999) rotate(90) scale(3.80433 1.88877)"
            >
              <stop stopColor="#D39364" />
              <stop offset="1" stopColor="#9F6941" />
            </radialGradient>
            <linearGradient
              id="paint2_linear_2940_6804"
              x1="5.96006"
              y1="12.549"
              x2="7.19906"
              y2="12.549"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8E694B" />
              <stop offset="1" stopColor="#8E694B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_2940_6804"
              x1="8.38556"
              y1="13.524"
              x2="7.84406"
              y2="12.885"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C77958" />
              <stop offset="1" stopColor="#C77958" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_2940_6804"
              x1="7.64456"
              y1="9.19349"
              x2="7.64456"
              y2="9.33299"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D5AD80" />
              <stop offset="1" stopColor="#D5AD80" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint5_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(9.47306 9.39449) rotate(180) scale(2.05207 0.441105)"
            >
              <stop stopColor="#EAAA75" />
              <stop offset="1" stopColor="#EAAA75" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint6_linear_2940_6804"
              x1="12.8996"
              y1="25.4535"
              x2="8.98162"
              y2="21.516"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.164" stopColor="#836444" />
              <stop offset="1" stopColor="#D38157" />
            </linearGradient>
            <linearGradient
              id="paint7_linear_2940_6804"
              x1="5.67563"
              y1="28.9875"
              x2="11.9051"
              y2="20.1945"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BA8951" />
              <stop offset="1" stopColor="#BA8951" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint8_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(-1.32702 -2.6322 3.14539 -1.58575 16.0676 27.936)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BEAB75" />
              <stop offset="1" stopColor="#BEAB75" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint9_linear_2940_6804"
              x1="21.1571"
              y1="24.5685"
              x2="20.6261"
              y2="24.5685"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE6B1" />
              <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint10_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(21.3521 17.4) rotate(90) scale(3.69192 0.76497)"
            >
              <stop offset="0.35" stopColor="#9E413E" />
              <stop offset="1" stopColor="#9E413E" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint11_linear_2940_6804"
              x1="15.6791"
              y1="12.87"
              x2="14.3876"
              y2="14.364"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9D3C3A" />
              <stop offset="1" stopColor="#9D3C3A" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint12_linear_2940_6804"
              x1="4.53863"
              y1="26.376"
              x2="5.10262"
              y2="26.376"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#845F3D" />
              <stop offset="1" stopColor="#845F3D" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint13_linear_2940_6804"
              x1="12.7278"
              y1="8.50797"
              x2="12.7278"
              y2="16.23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E85430" />
              <stop offset="1" stopColor="#C11C2A" />
            </linearGradient>
            <linearGradient
              id="paint14_linear_2940_6804"
              x1="12.5969"
              y1="9.09149"
              x2="23.1029"
              y2="19.9065"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8337" />
              <stop offset="1" stopColor="#F24747" />
            </linearGradient>
            <linearGradient
              id="paint15_linear_2940_6804"
              x1="13.2005"
              y1="9.09149"
              x2="2.69597"
              y2="19.9065"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8337" />
              <stop offset="1" stopColor="#F24747" />
            </linearGradient>
            <radialGradient
              id="paint16_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(31.2714 9.72386) rotate(90) scale(3.80433 1.88877)"
            >
              <stop stopColor="#FFD1A3" />
              <stop offset="1" stopColor="#DFA276" />
            </radialGradient>
            <linearGradient
              id="paint17_linear_2940_6804"
              x1="28.5069"
              y1="12.549"
              x2="29.7459"
              y2="12.549"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8E694B" />
              <stop offset="1" stopColor="#8E694B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint18_linear_2940_6804"
              x1="30.9339"
              y1="13.524"
              x2="30.3909"
              y2="12.885"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C77958" />
              <stop offset="1" stopColor="#C77958" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint19_linear_2940_6804"
              x1="30.1929"
              y1="9.19349"
              x2="30.1929"
              y2="9.33299"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D5AD80" />
              <stop offset="1" stopColor="#D5AD80" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint20_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(32.0214 9.39449) rotate(180) scale(2.05208 0.441105)"
            >
              <stop stopColor="#FFE9B1" />
              <stop offset="1" stopColor="#FFE9B1" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint21_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(31.2714 9.72386) rotate(90) scale(3.80433 1.88877)"
            >
              <stop stopColor="#D39364" />
              <stop offset="1" stopColor="#9F6941" />
            </radialGradient>
            <linearGradient
              id="paint22_linear_2940_6804"
              x1="28.5069"
              y1="12.549"
              x2="29.7459"
              y2="12.549"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8E694B" />
              <stop offset="1" stopColor="#8E694B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint23_linear_2940_6804"
              x1="30.9339"
              y1="13.524"
              x2="30.3909"
              y2="12.885"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C77958" />
              <stop offset="1" stopColor="#C77958" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint24_linear_2940_6804"
              x1="30.1929"
              y1="9.19349"
              x2="30.1929"
              y2="9.33299"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D5AD80" />
              <stop offset="1" stopColor="#D5AD80" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint25_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(32.0214 9.39449) rotate(180) scale(2.05208 0.441105)"
            >
              <stop stopColor="#EAAA75" />
              <stop offset="1" stopColor="#EAAA75" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint26_linear_2940_6804"
              x1="32.4195"
              y1="21.987"
              x2="43.2495"
              y2="21.987"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E39162" />
              <stop offset="1" stopColor="#EBB48C" />
            </linearGradient>
            <linearGradient
              id="paint27_linear_2940_6804"
              x1="28.224"
              y1="28.9875"
              x2="34.452"
              y2="20.1945"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BA8951" />
              <stop offset="1" stopColor="#BA8951" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint28_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(-1.32702 -2.6322 3.1454 -1.58576 38.6145 27.936)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BEAB75" />
              <stop offset="1" stopColor="#BEAB75" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint29_linear_2940_6804"
              x1="43.704"
              y1="24.5685"
              x2="43.1745"
              y2="24.5685"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE6B1" />
              <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint30_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(43.9005 17.4) rotate(90) scale(3.69192 0.76497)"
            >
              <stop offset="0.35" stopColor="#9E413E" />
              <stop offset="1" stopColor="#9E413E" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint31_linear_2940_6804"
              x1="37.974"
              y1="13.101"
              x2="37.0395"
              y2="14.067"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B55852" />
              <stop offset="1" stopColor="#B55852" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint32_linear_2940_6804"
              x1="27.0855"
              y1="26.376"
              x2="27.6495"
              y2="26.376"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#845F3D" />
              <stop offset="1" stopColor="#845F3D" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint33_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(35.4465 26.2965) scale(4.4732 5.24002)"
            >
              <stop stopColor="#BB825C" />
              <stop offset="1" stopColor="#BB825C" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint34_linear_2940_6804"
              x1="35.2747"
              y1="8.50797"
              x2="35.2747"
              y2="15.108"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EA6D2E" />
              <stop offset="1" stopColor="#CA222B" />
            </linearGradient>
            <linearGradient
              id="paint35_linear_2940_6804"
              x1="35.1438"
              y1="9.09149"
              x2="45.6498"
              y2="19.9065"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8337" />
              <stop offset="1" stopColor="#F24747" />
            </linearGradient>
            <linearGradient
              id="paint36_linear_2940_6804"
              x1="35.7434"
              y1="9.09149"
              x2="25.2389"
              y2="19.9065"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8337" />
              <stop offset="1" stopColor="#F24747" />
            </linearGradient>
            <linearGradient
              id="paint37_linear_2940_6804"
              x1="12.7143"
              y1="29.5814"
              x2="35.7198"
              y2="29.5814"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D7905F" />
              <stop offset="1" stopColor="#E8BC97" />
            </linearGradient>
            <linearGradient
              id="paint38_linear_2940_6804"
              x1="13.3608"
              y1="39.7844"
              x2="22.3758"
              y2="26.7929"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BA8951" />
              <stop offset="1" stopColor="#BA8951" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint39_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(28.8249 38.2525) rotate(-117.235) scale(4.31489 5.21931)"
            >
              <stop stopColor="#BEAB75" />
              <stop offset="1" stopColor="#BEAB75" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint40_linear_2940_6804"
              x1="36.3978"
              y1="33.3449"
              x2="35.6088"
              y2="33.3449"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE6B1" />
              <stop offset="1" stopColor="#FFE6B1" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint41_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(36.6888 22.8944) rotate(90) scale(5.38112 1.1383)"
            >
              <stop offset="0.35" stopColor="#9E413E" />
              <stop offset="1" stopColor="#9E413E" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint42_linear_2940_6804"
              x1="28.2453"
              y1="16.2929"
              x2="27.7158"
              y2="16.8224"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B55852" />
              <stop offset="1" stopColor="#B55852" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint43_linear_2940_6804"
              x1="11.6688"
              y1="35.9789"
              x2="12.5073"
              y2="35.9789"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#845F3D" />
              <stop offset="1" stopColor="#845F3D" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint44_linear_2940_6804"
              x1="18.9155"
              y1="26.31"
              x2="18.9155"
              y2="38.718"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#805139" />
              <stop offset="1" stopColor="#6D4D2F" />
            </linearGradient>
            <linearGradient
              id="paint45_linear_2940_6804"
              x1="26.9336"
              y1="33.063"
              x2="34.1516"
              y2="25.8675"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4CCCFF" />
              <stop offset="1" stopColor="#3A9EE6" />
            </linearGradient>
            <linearGradient
              id="paint46_linear_2940_6804"
              x1="30.2771"
              y1="32.9775"
              x2="30.2771"
              y2="31.6605"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1E9FE4" />
              <stop offset="1" stopColor="#1E9FE4" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint47_linear_2940_6804"
              x1="26.9336"
              y1="30.8565"
              x2="28.2761"
              y2="30.8565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#48E0FF" />
              <stop offset="1" stopColor="#48E0FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint48_linear_2940_6804"
              x1="27.9446"
              y1="24.6975"
              x2="28.8446"
              y2="27.3975"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#43B3F2" />
              <stop offset="1" stopColor="#43B3F2" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint49_linear_2940_6804"
              x1="15.4023"
              y1="33.3165"
              x2="24.2358"
              y2="33.2595"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#70504D" />
              <stop offset="1" stopColor="#9B665E" />
            </linearGradient>
            <linearGradient
              id="paint50_linear_2940_6804"
              x1="24.0747"
              y1="9.23394"
              x2="24.0747"
              y2="26.3114"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EA6D2E" />
              <stop offset="1" stopColor="#CA222B" />
            </linearGradient>
            <linearGradient
              id="paint51_linear_2940_6804"
              x1="14.5602"
              y1="39.144"
              x2="24.8652"
              y2="39.144"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9FA1A3" />
              <stop offset="1" stopColor="#C4C1C7" />
            </linearGradient>
            <linearGradient
              id="paint52_linear_2940_6804"
              x1="14.0787"
              y1="39.144"
              x2="15.3912"
              y2="39.144"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#59675C" />
              <stop offset="1" stopColor="#59675C" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint53_linear_2940_6804"
              x1="25.2657"
              y1="38.4975"
              x2="24.0477"
              y2="39.144"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C8CAC6" />
              <stop offset="1" stopColor="#C8CAC6" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint54_linear_2940_6804"
              x1="23.8796"
              y1="10.1025"
              x2="39.5126"
              y2="26.1975"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8337" />
              <stop offset="1" stopColor="#F24747" />
            </linearGradient>
            <linearGradient
              id="paint55_linear_2940_6804"
              x1="24.7764"
              y1="10.1025"
              x2="9.1434"
              y2="26.1975"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF8337" />
              <stop offset="1" stopColor="#F24747" />
            </linearGradient>
            <linearGradient
              id="paint56_linear_2940_6804"
              x1="35.8544"
              y1="39.9465"
              x2="35.8544"
              y2="37.1295"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B8478" />
              <stop offset="1" stopColor="#3B8478" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint57_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(38.5687 43.1794) rotate(-110.329) scale(9.28737 4.23052)"
            >
              <stop stopColor="#2C785B" />
              <stop offset="1" stopColor="#2C785B" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint58_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(39.9599 33.8415) rotate(142.112) scale(10.3369 13.9913)"
            >
              <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" />
              <stop offset="0.966" stopColor="#2C785B" />
            </radialGradient>
            <linearGradient
              id="paint59_linear_2940_6804"
              x1="12.3661"
              y1="39.9465"
              x2="12.3661"
              y2="37.1295"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B8478" />
              <stop offset="1" stopColor="#3B8478" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint60_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(3.2265 -8.7089 3.96702 1.4697 9.65109 43.1805)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2C785B" />
              <stop offset="1" stopColor="#2C785B" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint61_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(8.15805 6.34805 -8.59229 11.0422 8.26059 33.8415)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" />
              <stop offset="0.966" stopColor="#2C785B" />
            </radialGradient>
            <linearGradient
              id="paint62_linear_2940_6804"
              x1="41.3018"
              y1="30.603"
              x2="41.3018"
              y2="29.061"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B8478" />
              <stop offset="1" stopColor="#3B8478" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint63_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(-1.76587 -4.76637 2.17116 -0.80439 42.7883 32.3715)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2C785B" />
              <stop offset="1" stopColor="#2C785B" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint64_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(43.5493 27.2626) rotate(142.112) scale(5.65738 7.65744)"
            >
              <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" />
              <stop offset="0.966" stopColor="#2C785B" />
            </radialGradient>
            <linearGradient
              id="paint65_linear_2940_6804"
              x1="6.8445"
              y1="30.603"
              x2="6.8445"
              y2="29.061"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B8478" />
              <stop offset="1" stopColor="#3B8478" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint66_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(4.59765 27.2609) rotate(37.888) scale(5.65738 7.65744)"
            >
              <stop offset="0.641" stopColor="#2C785B" stopOpacity="0" />
              <stop offset="0.966" stopColor="#2C785B" />
            </radialGradient>
            <radialGradient
              id="paint67_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(-5.04429 3.04484 -2.8986 -4.80204 42.1379 33.0015)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#60FB9A" />
              <stop offset="1" stopColor="#60FB9A" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint68_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(14.7015 33.1397) rotate(133.452) scale(7.36101 10.4167)"
            >
              <stop stopColor="#60FB9A" />
              <stop offset="1" stopColor="#60FB9A" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint69_linear_2940_6804"
              x1="12.3661"
              y1="39.7965"
              x2="12.3661"
              y2="37.1295"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B8478" />
              <stop offset="0.819" stopColor="#3B8478" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint70_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(15.1696 33.7035) rotate(157.166) scale(9.66352 12.9438)"
            >
              <stop offset="0.591" stopColor="#39895B" stopOpacity="0" />
              <stop offset="1" stopColor="#39895B" />
            </radialGradient>
            <radialGradient
              id="paint71_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(44.7398 26.802) rotate(148.884) scale(3.22471 3.06983)"
            >
              <stop stopColor="#60FB9A" />
              <stop offset="1" stopColor="#60FB9A" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint72_radial_2940_6804"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(-2.20313 2.95312 -2.8113 -2.09731 8.0415 26.25)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#60FB9A" />
              <stop offset="1" stopColor="#60FB9A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      ),
    },
  ];

  const handlePropertySelect = (propertyId) => {
    setSelectedProperty(selectedProperty === propertyId ? null : propertyId);
    if (onPropertySelect) {
      onPropertySelect(propertyId);
    }
  };

  const handleNext = () => {
    console.log(
      "Moving to next step with selected property:",
      selectedProperty
    );
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handlePopupNext = () => {
    console.log(
      "Continuing with property:",
      selectedProperty,
      "and option:",
      selectedOption
    );
    setIsPopupOpen(false);
    if (onProceedNext) onProceedNext();
  };

  return (
    <KitchenCalculatorContainer>
      <LayoutSelectionSection>
        <StepHeader>
          <StepNumberLarge className="universal-fs-h13 universal-font-extra-bold">
            01
          </StepNumberLarge>
          <StepTitle className="universal-fs-h12 universal-font-bold">
            Select Your Property Type
          </StepTitle>
          <StepTitleDec className="universal-fs-h3 universal-font-medium">
            Choose the size of your home and the purpose of your interior
            project. This helps us give you a more accurate cost estimate.
          </StepTitleDec>
        </StepHeader>

        <LayoutCardsContainer>
          {propertyTypes.map((property) => (
            <KitchenLayoutCardWrapper
              key={property.id}
              onClick={() => handlePropertySelect(property.id)}
            >
              <LayoutImage>
                <LayoutImageImg src={property.image} alt={property.name} />
              </LayoutImage>

              <LayoutCheckbox>
                <OuterBox selected={selectedProperty === property.id}>
                  <InnerBox selected={selectedProperty === property.id}>
                    {selectedProperty === property.id && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </InnerBox>
                </OuterBox>
              </LayoutCheckbox>

              <LayoutContent>
                <CardTitle className="universal-fs-h3 universal-font-semibold">
                  {property.label}
                </CardTitle>
                <CardDescription className="universal-fs-h14 universal-font-medium">
                  {property.description}
                </CardDescription>
              </LayoutContent>
            </KitchenLayoutCardWrapper>
          ))}
        </LayoutCardsContainer>

        {selectedProperty && (
          <NextButtonWrapper>
            <NextButtonContainer>
              <Button
                primary
                onClick={handleNext}
                style={{ marginRight: "10px", width: "130px" }}
              >
                Next
              </Button>
            </NextButtonContainer>
          </NextButtonWrapper>
        )}
      </LayoutSelectionSection>

      {isPopupOpen && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupModal onClick={(e) => e.stopPropagation()}>
            <PopupOptions>
              {popupOptions.map((option) => (
                <PopupOption
                  key={option.id}
                  selected={selectedOption === option.id}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <RadioInput
                    type="radio"
                    name="layout"
                    selected={selectedOption === option.id}
                    checked={selectedOption === option.id}
                  />

                  <OptionIcon>{option.icon}</OptionIcon>
                  <OptionContent>
                    <OptionLabel>{option.label}</OptionLabel>
                    <OptionDescription>{option.description}</OptionDescription>
                  </OptionContent>
                </PopupOption>
              ))}
            </PopupOptions>

            {/* <PopupNextButton onClick={handlePopupNext}>Next</PopupNextButton> */}

            <Button
              primary
              onClick={handlePopupNext}
              style={{ marginLeft: "220px", width: "130px" }}
            >
              Next
            </Button>
          </PopupModal>
        </PopupOverlay>
      )}
    </KitchenCalculatorContainer>
  );
};

// Popup Modal Components
// #region 1 pop styles
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// display: flex;
// flex-direction: column;
// gap: 1rem;
// border: 1px solid #999999;
// width: 450px;
// margin: 2rem auto;
// padding: 2rem;
// border-radius: 0.5rem;
// margin-bottom: 1.5rem;
// background: #fff;
// min-height: 530px;

const PopupModal = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 16px;
    max-width: calc(100% - 32px);
    border-radius: 12px;
  }
`;

const PopupOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const PopupOption = styled.div`
  border: 2px solid ${(props) => (props.selected ? "#D50F25" : "#D6D6D6")};
  // border-radius: 12px;
  border-radius: 0.5rem;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  &:hover {
    border-color: #d50f25;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
    border-radius: 10px;
  }
`;

const RadioOption = styled.label`
  // display: flex;
  // align-items: center;
  // padding: 5px 0px 0 130px;
  // cursor: pointer;
  // transition: all 0.2s;
  // justify-content: center;
  border: 2px solid ${(props) => (props.selected ? "#d50f25" : "#D6D6D6")};
  border-radius: 50%;
  width: 16px;
  height: 16px;
`;

const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #d50f25;
`;

const OptionIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const OptionContent = styled.div`
  flex: 1;
  text-align: left;
`;

const OptionLabel = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #222222;
  margin: 0 0 4px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const OptionDescription = styled.p`
  font-size: 14px;
  color: #222222;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// #endregion

// #region other styles
const ScopeContainer = styled.section`
  margin-bottom: 4rem;
`;

const ScopeInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
  gap: 0.25rem;
`;

const ScopeStep = styled.div`
  background: linear-gradient(to bottom, #d50f25, #f7baba00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const StepHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: center;
  gap: 0.25rem;
`;

const StepNumberLarge = styled.div`
  background: linear-gradient(180deg, #d50f25 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const StepTitle = styled.div`
  text-align: center; /* ✅ center everything inside */
  margin-bottom: 0.5rem;
  line-height: 0.5;
`;
const StepTitleDec = styled.p`
  text-align: center;
  max-width: 760px;
  margin: 1rem auto 0;
  color: #222222;
  white-space: nowrap;
`;

const ScopeTitle = styled.h2`
  text-align: center; /* ✅ center everything inside */
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;
const ScopeSubtitle = styled.p`
  text-align: center;
  max-width: 760px;
  margin: 0.25rem auto 0;
  color: #6b7280;
  white-space: nowrap;
`;

const ScopeGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 70px;
  gap: 50px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SelectedPreview = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ScopeList = styled.div`
  background: #fff;
  padding: 0px 12px;
  margin-left: 38px;
  margin-right: -128px;
`;

const ScopeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 18px;
  //  margin-left: 58px;
`;

const ScopeRowLabel = styled.div`
  // color: red;
  // font-weight: 600;
  margin-right: 58px;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
`;

const CounterBtn = styled.button`
  padding: 0.2rem 0.7rem;
  border: 1px solid #999999;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.5rem;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CounterVal = styled.div`
  min-width: 24px;
  text-align: center;
  display: inline-block;
`;

const ScopeActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;

const BackBtn = styled.button`
  flex: 1;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #111827;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
`;

const PrimaryNextBtn = styled.button`
  flex: 1;
  border: none;
  background: #d50f25;
  color: #fff;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
`;
// #endregion

const PROPERTY_TYPES = [
  {
    id: "1bhk",
    label: "1 BHK",
    description: "Ideal for small to medium homes",
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657678/local_assets_migrated/home/design-ideas/living-room-1.webp",
  },
  {
    id: "2bhk",
    label: "2 BHK",
    description: "Best for narrow kitchen spaces",
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657680/local_assets_migrated/home/design-ideas/living-room-2.webp",
  },
  {
    id: "3bhk",
    label: "3 BHK",
    description: "Luxury layout with open space",
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657681/local_assets_migrated/home/design-ideas/living-room-3.webp",
  },
  {
    id: "4bhk",
    label: "4 BHK",
    description: "Compact and efficient",
    image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657682/local_assets_migrated/home/design-ideas/living-room-4.webp",
  },
];

const SelectedPreviewCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid #e2e8f0;
`;

const SelectedImage = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 14px;
`;

const SelectedCheck = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ff6b6b;
  background: #ff6b6b;
  border-radius: 4px;
  margin: 0 auto 10px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const SelectedLabel = styled.div`
  display: grid;
  place-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px;
  color: #111827;
  font-weight: 600;
`;

const ScopeOfWorkSelector = ({ onBack, onNext, selectedPropertyId }) => {
  const selected =
    PROPERTY_TYPES.find((p) => p.id === selectedPropertyId) ||
    PROPERTY_TYPES[0];
  const [items, setItems] = useState({
    modularKitchen: 0,
    wardrobe: 1,
    entertainmentUnit: 3,
    looseFurniture: 10,
    falseCeiling: 0,
    painting: 0,
  });

  const change = (key, delta) => {
    setItems((prev) => {
      const next = Math.max(0, (prev[key] || 0) + delta);
      return { ...prev, [key]: next };
    });
  };

  return (
    <ScopeContainer>
      <ScopeInner>
        <StepHeader>
          <StepNumberLarge className="universal-fs-h13 universal-font-extra-bold">
            02
          </StepNumberLarge>
          <StepTitle className="universal-fs-h12 universal-font-bold">
            Select Scope of Work
          </StepTitle>
          <StepTitleDec className="universal-fs-h3 universal-font-semibold">
            Pick the elements you'd like to include in your home interiors. This
            helps us build a personalized estimate based on your needs.
          </StepTitleDec>
        </StepHeader>

        <ScopeGrid>
          <SizeLeft>
            <LayoutPreviewCard>
              <LayoutImage>
                {selected?.image && (
                  <LayoutImageImg src={selected?.image} alt={selected?.name} />
                )}
              </LayoutImage>
              {/* ✅ Checkbox Overlay */}
              <LayoutCheckbox>
                <OuterBox selected={!!selected}>
                  <InnerBox selected={!!selected}>
                    {selected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </InnerBox>
                </OuterBox>
              </LayoutCheckbox>

              <LayoutContent>
                <CardTitle className="universal-fs-h3 universal-font-semibold">
                  {selected?.label}
                </CardTitle>
                <CardDescription className="universal-fs-h14 universal-font-medium">
                  {selected?.description}
                </CardDescription>
              </LayoutContent>
            </LayoutPreviewCard>
          </SizeLeft>

          <ScopeList className="universal-fs-h4 universal-font-medium">
            <ScopeRow>
              <ScopeRowLabel>Modular Kitchen</ScopeRowLabel>
              <Counter>
                <CounterBtn onClick={() => change("modularKitchen", -1)}>
                  −
                </CounterBtn>
                <CounterVal>{items.modularKitchen}</CounterVal>
                <CounterBtn onClick={() => change("modularKitchen", 1)}>
                  +
                </CounterBtn>
              </Counter>
            </ScopeRow>
            <ScopeRow>
              <ScopeRowLabel>Wardrobe</ScopeRowLabel>
              <Counter>
                <CounterBtn onClick={() => change("wardrobe", -1)}>
                  −
                </CounterBtn>
                <CounterVal>{items.wardrobe}</CounterVal>
                <CounterBtn onClick={() => change("wardrobe", 1)}>+</CounterBtn>
              </Counter>
            </ScopeRow>
            <ScopeRow>
              <ScopeRowLabel>Entertainment Unit</ScopeRowLabel>
              <Counter>
                <CounterBtn onClick={() => change("entertainmentUnit", -1)}>
                  −
                </CounterBtn>
                <CounterVal>{items.entertainmentUnit}</CounterVal>
                <CounterBtn onClick={() => change("entertainmentUnit", 1)}>
                  +
                </CounterBtn>
              </Counter>
            </ScopeRow>
            <ScopeRow>
              <ScopeRowLabel>Loose Furniture</ScopeRowLabel>
              <Counter>
                <CounterBtn onClick={() => change("looseFurniture", -1)}>
                  −
                </CounterBtn>
                <CounterVal>{items.looseFurniture}</CounterVal>
                <CounterBtn onClick={() => change("looseFurniture", 1)}>
                  +
                </CounterBtn>
              </Counter>
            </ScopeRow>
            <ScopeRow>
              <ScopeRowLabel>False Ceiling</ScopeRowLabel>
              <Counter>
                <CounterBtn onClick={() => change("falseCeiling", -1)}>
                  −
                </CounterBtn>
                <CounterVal>{items.falseCeiling}</CounterVal>
                <CounterBtn onClick={() => change("falseCeiling", 1)}>
                  +
                </CounterBtn>
              </Counter>
            </ScopeRow>
            <ScopeRow>
              <ScopeRowLabel>Painting</ScopeRowLabel>
              <Counter>
                <CounterBtn onClick={() => change("painting", -1)}>
                  −
                </CounterBtn>
                <CounterVal>{items.painting}</CounterVal>
                <CounterBtn onClick={() => change("painting", 1)}>+</CounterBtn>
              </Counter>
            </ScopeRow>
          </ScopeList>

          <div />
        </ScopeGrid>
      </ScopeInner>

      <NextButtonWrapper>
        <StepActions>
          <Button
            primary
            onClick={onBack}
            style={{
              marginRight: "10px",
              width: "130px",
              backgroundColor: "#fff",
              color: "#d50f25",
              border: "1px solid #d50f25",
            }}
          >
            Back
          </Button>
          <Button
            primary
            onClick={onNext}
            style={{ marginRight: "10px", width: "130px" }}
          >
            Next
          </Button>
        </StepActions>
      </NextButtonWrapper>
    </ScopeContainer>
  );
};

const HomePriceCalculatorsSections = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for property type selection
  const [open, setOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [showOtherSections, setShowOtherSections] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = property, 2 = scope, 3 = customize
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [isEstimationView, setIsEstimationView] = useState(false);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const [isPackageConfirmed, setIsPackageConfirmed] = useState(false);

  // Extract the path segments to determine what content to show
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // Handle property selection at parent level (used by PropertyTypeSelector)
  const handlePropertySelect = (propertyId) => {
    setSelectedPropertyType((prev) =>
      prev === propertyId ? null : propertyId
    );
  };

  // State for dynamic categories and designs
  const [designCategories, setDesignCategories] = useState([]);
  const [dynamicDesigns, setDynamicDesigns] = useState({});

  // Infinite scroll state
  const [hasMore, setHasMore] = useState({});
  const [loadingMore, setLoadingMore] = useState({});
  const [offsets, setOffsets] = useState({});

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  // Image loading state
  const getActiveTabFromUrl = () => {
    if (pathSegments.length === 0) return null;

    // Use the last path segment to determine the active tab
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Find the matching category item by subCategory
    const matchingCategoryItem = designCategories.find((category) => {
      // Convert category name to URL-friendly format for comparison
      const urlFriendlyName = category.toLowerCase().replace(/\s+/g, "-");
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
    if (pathSegments.length >= 2 && pathSegments[0] === "design-gallery") {
      return pathSegments[1]; // e.g., 'rooms-and-spaces'
    }
    return "rooms-and-spaces"; // default fallback
  };

  // Fetch design gallery data and populate categories
  useEffect(() => {
    const loadDesignGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        //const result = await fetchAndTransformDesignGallery();

        if (result.data && result.data.length > 0) {
          const currentCategory = getCurrentCategory();

          // Find the matching category from API data
          const matchingCategory = result.data.find(
            (cat) => cat.category === currentCategory
          );

          if (matchingCategory) {
            // Extract category items as tab names
            const categoryNames = matchingCategory.designs.map(
              (design) => design.title
            );
            setDesignCategories(categoryNames);

            // Initialize empty designs object - will be populated when tabs are clicked
            const designsForCategory = {};
            categoryNames.forEach((categoryName) => {
              designsForCategory[categoryName] = [];
            });
            // setDynamicDesigns(designsForCategory);
          } else {
            // No matching category found
            setError("Design category not found");
          }
        } else {
          // No data received from API
          setError("No design gallery data available");
        }
      } catch (err) {
        setError("Failed to load design gallery data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDesignGalleryData();
  }, [location.pathname]); // Re-run when URL changes

  // Function to fetch design items for a specific tab
  const fetchDesignItemsForTab = async (tabName, isLoadMore = false) => {
    if (
      !isLoadMore &&
      dynamicDesigns[tabName] &&
      dynamicDesigns[tabName].length > 0
    ) {
      // Already loaded, no need to fetch again
      return;
    }

    // Don't load more if already loading or no more data
    if (isLoadMore && (loadingMore[tabName] || !hasMore[tabName])) {
      return;
    }

    // Set loading state
    if (isLoadMore) {
      setLoadingMore((prev) => ({ ...prev, [tabName]: true }));
    } else {
      // Reset image loading states for new data
      setLoadedImages(new Set());
      setFailedImages(new Set());
    }

    try {
      const currentCategory = getCurrentCategory();
      const subCategory = tabName.toLowerCase().replace(/\s+/g, "-");
      const currentOffset = isLoadMore ? offsets[tabName] || 0 : 0;

      console.log("Fetching designs for:", {
        category: currentCategory,
        subCategory,
        tabName,
        offset: currentOffset,
        isLoadMore,
      });

      //const result = await fetchAndTransformDesignGalleryItems(currentCategory, subCategory, currentOffset);

      console.log("Fetch result:", result);

      if (result.data && result.data.length > 0) {
        console.log("Setting designs for tab:", tabName, result.data);

        if (isLoadMore) {
          // Append to existing data
          setDynamicDesigns((prev) => ({
            ...prev,
            [tabName]: [...(prev[tabName] || []), ...result.data],
          }));
        } else {
          // Replace existing data
          setDynamicDesigns((prev) => ({
            ...prev,
            [tabName]: result.data,
          }));
        }

        // Update pagination state
        setHasMore((prev) => ({ ...prev, [tabName]: result.hasMore }));
        setOffsets((prev) => ({
          ...prev,
          [tabName]: currentOffset + result.data.length,
        }));
      } else {
        console.log("No data received for tab:", tabName);
        if (!isLoadMore) {
          // Only set empty array for initial load
          setDynamicDesigns((prev) => ({
            ...prev,
            [tabName]: [],
          }));
        }
        setHasMore((prev) => ({ ...prev, [tabName]: false }));
      }
    } catch (err) {
      console.error("Error fetching designs for tab:", tabName, err);
      if (!isLoadMore) {
        // Only set empty array for initial load
        setDynamicDesigns((prev) => ({
          ...prev,
          [tabName]: [],
        }));
      }
    } finally {
      if (isLoadMore) {
        setLoadingMore((prev) => ({ ...prev, [tabName]: false }));
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
    if (
      pathSegments.length === 2 &&
      pathSegments[0] === "design-gallery" &&
      designCategories.length > 0
    ) {
      const firstTab = designCategories[0];
      const urlSegment = firstTab.toLowerCase().replace(/\s+/g, "-");
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
        if (
          entry.isIntersecting &&
          hasMore[activeTab] &&
          !loadingMore[activeTab]
        ) {
          console.log("Loading more designs for:", activeTab);
          fetchDesignItemsForTab(activeTab, true);
        }
      },
      {
        root: null,
        rootMargin: "100px", // Start loading 100px before reaching the bottom
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    // Observe the last design card for infinite scrolling
    const designCards = document.querySelectorAll("[data-design-card]");
    if (designCards.length > 0) {
      const lastCard = designCards[designCards.length - 1];
      observer.observe(lastCard);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    activeTab,
    hasMore[activeTab],
    loadingMore[activeTab],
    filteredDesigns.length,
  ]);

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

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDesign(null);
  };

  // const scrollTabs = (dir) => {
  //   if (tabsRef.current) {
  //     const scrollAmount = 120;
  //     tabsRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  //   }
  // };
  const handleFormSuccess = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Breadcrumb />

      {!isEstimationView &&
        (currentStep === 1 ? (
          <PropertyTypeSelector
            onPropertySelect={handlePropertySelect}
            onProceedNext={() => {
              setCurrentStep(2);
              setShowOtherSections(true);
            }}
          />
        ) : (
          <ScopeOfWorkSelector
            onBack={() => setCurrentStep(1)}
            onNext={() => setShowCustomizeModal(true)}
            selectedPropertyId={selectedPropertyType}
          />
        ))}

      {showCustomizeModal && (
        <CustomizeModal
          onClose={() => setShowCustomizeModal(false)}
          onProceed={() => {
            setShowCustomizeModal(false);
            // Switch to estimation view; hide initial background sections
            setIsEstimationView(true);
            setSelectedPackageIndex(null);
            setIsPackageConfirmed(false);
          }}
        />
      )}

      {/* {(showOtherSections || !selectedPropertyType) && ( */}
      <>
        {!isEstimationView && <HeroBanner />}

        {isEstimationView && (
          <section
            style={{
              width: "100%",
              background: "#ffffff",
              padding: "24px 0 0 0",
            }}
          >
            <div
              style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}
            >
              <StepHeader>
                <StepNumberLarge className="universal-fs-h13 universal-font-extra-bold">
                  03
                </StepNumberLarge>
                <StepTitle className="universal-fs-h12 universal-font-bold">
                  Select Package
                </StepTitle>
                <StepTitleDec className="universal-fs-h3 universal-font-medium">
                  Select a Package That Fits Your Dream Home interior Style &
                  Budget
                </StepTitleDec>
              </StepHeader>

              {/* Package cards */}
              <PackagesGrid>
                {[
                  {
                    icon: (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.0025 14.02C7.1676 14.2702 7.39389 14.4742 7.6599 14.6124C7.92591 14.7507 8.22283 14.8187 8.5225 14.81M8.5225 14.81C8.9318 14.8462 9.33887 14.7195 9.6553 14.4574C9.97173 14.1953 10.172 13.8189 10.2125 13.41C10.1744 12.9993 9.97525 12.6204 9.65855 12.3562C9.34184 12.0919 8.93337 11.9639 8.5225 12C8.11327 12.0334 7.70738 11.904 7.39288 11.6401C7.07838 11.3761 6.88062 10.9988 6.8425 10.59C6.88308 10.183 7.08189 9.80819 7.39612 9.54634C7.71034 9.28449 8.11484 9.15652 8.5225 9.19M8.5225 14.81V15.75M8.5225 9.19C8.82264 9.1784 9.12063 9.24514 9.38714 9.38366C9.65366 9.52218 9.87952 9.7277 10.0425 9.98M8.5225 9.19V8.25M14.3125 15.75V12.75M17.8125 15.75V9.75M1.8125 1.25H22.8125C22.8125 1.25 23.5625 1.25 23.5625 2V4.5C23.5625 4.5 23.5625 5.25 22.8125 5.25H1.8125C1.8125 5.25 1.0625 5.25 1.0625 4.5V2C1.0625 2 1.0625 1.25 1.8125 1.25Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.3125 22.75V18.5M12.3125 22.75C13.1425 22.75 13.8125 23.2 13.8125 23.75M12.3125 22.75C11.4825 22.75 10.8125 23.2 10.8125 23.75M1.0625 18.5H23.5625M2.5625 5.25H22.0625V18.5H2.5625V5.25Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    title: "Essential Package",
                    accent: "#559944",
                    approx: "4.5 Lakh",
                    note: "(Approximately)",
                    subtitle:
                      "Smart value interiors with practical functionality — ideal for everyday needs.",
                    features: [
                      "Rooms Covered: 1 Kitchen, 2 Wardrobes, Basic TV Unit",
                      "Materials: MDF / Pre‑Laminated Particle Board",
                      "Finish: Matte Laminate",
                      "Furniture: Essential bed + sofa + dining (Pre‑fab)",
                      "Accessories: Standard handles, basic internal fittings",
                      "Lighting & Ceiling: Basic ceiling lights, no false ceiling",
                      "Ideal For: Compact homes, first‑time buyers, rental properties",
                    ],
                  },
                  {
                    icon: (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 6.5C3.5 6.35082 3.55926 6.20774 3.66475 6.10225C3.77024 5.99676 3.91332 5.9375 4.0625 5.9375H20.5625C20.7117 5.9375 20.8548 5.99676 20.9602 6.10225C21.0657 6.20774 21.125 6.35082 21.125 6.5C21.125 6.64918 21.0657 6.79226 20.9602 6.89775C20.8548 7.00324 20.7117 7.0625 20.5625 7.0625H4.0625C3.91332 7.0625 3.77024 7.00324 3.66475 6.89775C3.55926 6.79226 3.5 6.64918 3.5 6.5ZM4.0625 13.0625H9.3125C9.46168 13.0625 9.60476 13.0032 9.71025 12.8977C9.81574 12.7923 9.875 12.6492 9.875 12.5C9.875 12.3508 9.81574 12.2077 9.71025 12.1023C9.60476 11.9968 9.46168 11.9375 9.3125 11.9375H4.0625C3.91332 11.9375 3.77024 11.9968 3.66475 12.1023C3.55926 12.2077 3.5 12.3508 3.5 12.5C3.5 12.6492 3.55926 12.7923 3.66475 12.8977C3.77024 13.0032 3.91332 13.0625 4.0625 13.0625ZM10.8125 17.9375H4.0625C3.91332 17.9375 3.77024 17.9968 3.66475 18.1023C3.55926 18.2077 3.5 18.3508 3.5 18.5C3.5 18.6492 3.55926 18.7923 3.66475 18.8977C3.77024 19.0032 3.91332 19.0625 4.0625 19.0625H10.8125C10.9617 19.0625 11.1048 19.0032 11.2102 18.8977C11.3157 18.7923 11.375 18.6492 11.375 18.5C11.375 18.3508 11.3157 18.2077 11.2102 18.1023C11.1048 17.9968 10.9617 17.9375 10.8125 17.9375ZM22.4206 13.835L20.2184 15.6528L20.8897 18.365C20.9163 18.4725 20.9105 18.5855 20.8732 18.6897C20.8358 18.794 20.7686 18.8849 20.6798 18.9511C20.591 19.0172 20.4846 19.0557 20.374 19.0617C20.2634 19.0677 20.1535 19.0409 20.0581 18.9847L17.5625 17.5156L15.0669 18.9847C14.9715 19.0409 14.8616 19.0677 14.751 19.0617C14.6404 19.0557 14.534 19.0172 14.4452 18.9511C14.3565 18.8849 14.2892 18.794 14.2518 18.6897C14.2145 18.5855 14.2087 18.4725 14.2353 18.365L14.9066 15.6528L12.7044 13.835C12.6179 13.7636 12.5547 13.668 12.5229 13.5604C12.4912 13.4529 12.4923 13.3383 12.5262 13.2313C12.56 13.1244 12.6251 13.0301 12.713 12.9604C12.8008 12.8907 12.9075 12.8489 13.0194 12.8403L15.9256 12.6153L17.0422 10.0269C17.0859 9.92651 17.158 9.8411 17.2496 9.78112C17.3412 9.72113 17.4483 9.68918 17.5578 9.68918C17.6673 9.68918 17.7744 9.72113 17.866 9.78112C17.9576 9.8411 18.0297 9.92651 18.0734 10.0269L19.19 12.6153L22.0963 12.8403C22.2081 12.8489 22.3148 12.8907 22.4027 12.9604C22.4906 13.0301 22.5556 13.1244 22.5895 13.2313C22.6233 13.3383 22.6244 13.4529 22.5927 13.5604C22.5609 13.668 22.4978 13.7636 22.4113 13.835H22.4206ZM20.63 13.8547L18.7709 13.7112C18.6695 13.7025 18.5723 13.6665 18.4898 13.6069C18.4072 13.5473 18.3424 13.4664 18.3022 13.3728L17.5625 11.6694L16.8275 13.3728C16.7873 13.4664 16.7225 13.5473 16.6399 13.6069C16.5574 13.6665 16.4602 13.7025 16.3588 13.7112L14.4997 13.8547L15.9003 15.0106C15.982 15.0782 16.043 15.1674 16.0761 15.2681C16.1093 15.3688 16.1134 15.4768 16.0878 15.5797L15.6538 17.3366L17.2813 16.3784C17.3676 16.3277 17.466 16.3009 17.5663 16.3009C17.6665 16.3009 17.7649 16.3277 17.8513 16.3784L19.4797 17.3366L19.0456 15.5797C19.0201 15.4768 19.0241 15.3688 19.0573 15.2681C19.0905 15.1674 19.1514 15.0782 19.2331 15.0106L20.63 13.8547Z"
                          fill="white"
                        />
                      </svg>
                    ),
                    title: "Signature Package",
                    accent: "#4286F5",
                    approx: "7.5 Lakh",
                    note: "(Approximately)",
                    subtitle:
                      "Balanced interiors with better finishes and upgraded features.",
                    features: [
                      "Rooms Covered: 1 Kitchen, 3 Wardrobes, TV Unit, Shoe Rack",
                      "Materials: HDHMR / BWP Plywood (Modular)",
                      "Finish: High‑Gloss Laminate / Membrane",
                      "Furniture: Modular storage beds, premium sofa, wall‑mounted dining",
                      "Accessories: Soft‑close hinges, cutlery organizers, lift‑up shutters",
                      "Lighting & Ceiling: Cove lighting, partial false ceiling",
                      "Ideal For: Growing families, mid‑size homes",
                    ],
                  },
                  {
                    icon: (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2814_5289)">
                          <path
                            d="M19.8125 3.5H4.8125L0.3125 8.75L12.3125 23L24.3125 8.75L19.8125 3.5ZM7.2725 8H2.9375L5.2175 5.33L7.2725 8ZM9.9425 8L12.3125 5.24L14.6825 8H9.9425ZM15.3125 9.5L12.3125 19.52L9.3125 9.5H15.3125ZM8.2025 9.5L11.0375 19.16L2.9075 9.5H8.2025ZM16.4375 9.5H21.7325L13.5875 19.16L16.4375 9.5ZM17.3675 8L19.4225 5.33L21.6875 8H17.3375H17.3675ZM18.3125 5L16.1525 7.715L13.9625 5H18.3125ZM8.4575 7.745L6.3125 5H10.6625L8.4575 7.745Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2814_5289">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.3125 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    ),
                    title: "Elite Luxe Package",
                    accent: "#D50F25",
                    approx: "11+ Lakh",
                    note: "(Approximately)",
                    subtitle:
                      "Premium design, top‑tier finishes, and smart features for high‑end interiors.",
                    features: [
                      "Rooms Covered: Full Kitchen, 4+ Wardrobes, Bar Unit, Study, Foyer",
                      "Materials: BWP Marine Plywood / HDMR with PU & Acrylic finishes",
                      "Finish: Acrylic / PU Coated / Glass",
                      "Furniture: Designer modular furniture, customized loose furniture",
                      "Accessories: Tandem drawers, corner magic units, LED lighting",
                      "Lighting & Ceiling: Designer false ceilings, strip lighting, mood lights",
                      "Ideal For: Premium apartments, villas, luxury buyers",
                    ],
                  },
                ].map((pkg, idx, arr) => {
                  const isSelected = selectedPackageIndex === idx;
                  return (
                    <PackageCardWrapper
                      key={pkg.title}
                      $selected={isSelected}
                      $accent={pkg.accent}
                      onClick={() => {
                        setSelectedPackageIndex(idx);
                        setIsPackageConfirmed(false);
                      }}
                    >
                      <PackageHeader
                        $accent={pkg.accent}
                        $selected={isSelected}
                      >
                        <PackageTitle className="universal-fs-h5">
                          {pkg.icon}
                          {pkg.title}
                        </PackageTitle>
                        <PackageSubtitle className="universal-fs-h4">
                          {pkg.subtitle}
                        </PackageSubtitle>
                        <PackagePrice
                          className="universal-fs-h5"
                          $selected={isSelected}
                        >
                          {pkg.approx}{" "}
                          <ApproxText $selected={isSelected}>
                            {pkg.note}
                          </ApproxText>
                        </PackagePrice>
                      </PackageHeader>

                      <FeatureList>
                        {pkg.features.map((f, i) => (
                          <FeatureRow
                            key={i}
                            $isLast={i === pkg.features.length - 1}
                            $selected={isSelected}
                          >
                            <BulletDot $selected={isSelected} />
                            <FeatureText>{f}</FeatureText>
                          </FeatureRow>
                        ))}
                      </FeatureList>
                    </PackageCardWrapper>
                  );
                })}
              </PackagesGrid>
              <NextButtonWrapper>
                <StepActions>
                  <Button
                    primary
                    onClick={() => {
                      setIsEstimationView(false);
                      setShowCustomizeModal(true);
                    }}
                    style={{
                      marginRight: "10px",
                      width: "130px",
                      backgroundColor: "#fff",
                      color: "#d50f25",
                      border: "1px solid #d50f25",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    primary
                    onClick={() => setOpen(true)}
                    style={{ marginRight: "10px", width: "130px" }}
                  >
                    Next
                  </Button>

                  <Modal
                    open={open}
                    onClose={() => {
                      setOpen(false);
                      resetFormState();
                    }}
                  >
                    <CloseButton
                      onClick={() => {
                        setOpen(false);
                        resetFormState();
                      }}
                      className="universal-fs-h8 universal-font"
                    >
                      &times;
                    </CloseButton>
                    <ConsultationFormContent onSuccess={handleFormSuccess} />
                  </Modal>
                </StepActions>
              </NextButtonWrapper>
            </div>
          </section>
        )}

        <TipsSection />
        <Services />
        <YouTubeReviews />
      </>
      {/* )} */}
    </Layout>
  );
};

export default HomePriceCalculatorsSections;


