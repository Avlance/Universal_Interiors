"use client";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from '@/utils/react-router-dom';
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";
import ConsultationFormContent from "@/_old_routes/home/ConsultationFormContent.jsx";
import Modal from "../../components/modal/js/Modal";

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

const GradientBackground = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) -3.99%,
    rgb(232, 238, 253) 30.25%,
    rgb(232, 238, 253) 65.14%,
    rgba(255, 255, 255, 0) 100%
  );
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

// #region - Modular Kitchen and Wardrobe Design - Guide Styles

//#region first section styles

const SectionWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 5% 3rem;
  background: #ffffff;

  @media (max-width: 1024px) {
    padding: 3rem 2rem;
    flex-direction: column;
    text-align: center;
  }
`;

const ContentBox = styled.div`
  min-width: fit-content; /* 👈 Ensures it grows to fit content */
  max-width: 100%; /* 👈 Prevents overflow beyond parent */
  flex: 0 1 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 750; /* Bold */
  color: #1c1c1c;
  margin-bottom: 1rem;
  line-height: 1.2;
  white-space: nowrap; /* 👈 Prevents wrapping */
  overflow: hidden; /* 👈 Hides overflow if needed */

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: #1c1c1c;
  margin-bottom: 2rem;
  font-weight: 400; /* Normal weight */
`;

const Button = styled.button`
  background: #d50f25;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  overflow: hidden;
  width: 50%;

  &:disabled {
    background: #999;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    height: 44px;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    height: 42px;
    margin-top: 4px;
  }
`;

const ButtonText = styled.span`
  flex-grow: 0.5;
  text-align: center;
`;

const RibbonWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroImage = styled.img`
  width: 380px; /* Slightly larger for desktop */
  height: auto;
  display: block; /* Removes inline gaps */

  @media (max-width: 1024px) {
    width: 300px;
    margin-top: 2rem;
  }
`;
//#endregion

//#region second section styles
const LayoutSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1c1c1c;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: #1c1c1c;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const LayoutCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Force 5 columns
  gap: 2rem;
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

const LayoutCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 160px;
  background: ${(props) => `url(${props.$image}) center/cover`};
  position: relative;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ReadMoreButton = styled.button`
  background: var(--universal-blue-theme-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 550;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 180px;

  &:hover {
    background: #4a7cff;
  }
`;
// Modal styles
const PopupContainer = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  width: 1100px;
  max-width: 98vw;
  height: 700px; // or auto with max-height
  max-height: 90vh;
  overflow: hidden;
`;

const PopupImageSide = styled.div`
  background: #ffffff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // align image to left
  justify-content: flex-start; // push image to top
  height: 100%;
  overflow-y: auto;
`;

const PopupImage = styled.img`
  width: 380px; // or 240px if you want tighter
  height: auto;
  object-fit: contain;
  margin: 50px 0 0 70px;
`;

const PopupContent = styled.div`
  padding: 22px 24px;
  position: relative;
  overflow-y: auto;
  max-height: 100%;
`;
const Header = styled.div`
  display: flex;
  top: 0;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  padding: -30px 8px;
  z-index: 10;
  background: white; // optional, prevents overlap
`;

const CloseBtn = styled.button`
  position: sticky;
  top: 0;
  margin-left: auto;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: transform 0.15s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const PopupTitle = styled.h3`
  margin: 1px 0 10px 0;
  font-size: 1.1rem;
  color: #1c1c1c;
`;

const PopupDesc = styled.p`
  font-size: 0.85rem;
  color: #212121;
  line-height: 1.45;
  text-align: left; // Ensures alignment starts from the left
  direction: ltr;
`;

// CTA row and controls inside popup
const PopupButton = styled.button`
  background: #d50f25;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  overflow: hidden;
  width: 60%; // or 60–70% if you want it tighter
  min-width: 280px;

  &:disabled {
    background: #999;
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    height: 44px;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    height: 42px;
    margin-top: 4px;
  }
`;

const PopupButtonText = styled.span`
  font-size: 0.7rem; // Smaller font
  line-height: 1.2;
  white-space: nowrap; // Prevent wrapping
  overflow: hidden;
  flex-grow: 0.5;
  text-align: center;
`;
const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 12px 0 20px 0;
`;

const SecondaryCta = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: none;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  top: 3px;
`;

const BenefitTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #1c1c1c;
  margin-bottom: 10px;
`;
const DrawbacksTitle = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #1c1c1c;
  margin-bottom: 10px;
`;

const BenefitDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #5485ee;
  border-radius: 50%;
  margin-right: -2px;
`;
const DrawbackDot = styled(BenefitDot)`
  background: #ffc107;
`;
const BenefitItem = styled.div`
  font-size: 0.85rem;
  color: #333;
  margin: 10px 0 0 26px;
`;

const BenefitSub = styled.div`
  font-size: 0.85rem;
  color: #6b6b6b;
  line-height: 1.4;
  margin-left: 16px;
  margin-top: 6px;
`;
const BenefitHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #1c1c1c;
`;

const BenefitRule = styled.hr`
  border: none;
  border-top: 1px solid #999999;
  margin: 12px auto 16px 10px;
  width: 80%;
`;
//#endregion

//#region third section style
const ComparisonSection3 = styled.section`
  padding: 1.5rem 0.75rem;
  background: white;
`;

const SectionContainer3 = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  box-shadow: none;
`;

const ComparisonTitle3 = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--universal-black);
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const ComparisonTable3 = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: none; /* ⬅️ explicitly remove shadow */
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 8rem; /* Adjust based on your header height */
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      #ffffff 0%,
      #999999 8%,
      #999999 92%,
      #ffffff 100%
    );
    pointer-events: none;
    z-index: 2;
  }
`;

const TableHeader3 = styled.th`
  background: #ffffff;
  padding: 1rem;
  font-weight: 700;
  color: var(--universal-black);
  font-size: 1.1rem;
  text-align: center;
  position: relative;
  &:last-child {
    border-right: none;
  }
`;

const IconContainer3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ImageIcon3 = styled.img`
  width: 62px;
  height: 62px;
  object-fit: contain;
`;

const TableRow3 = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid #a9a9a9;
  }

  &:last-child td {
    border-bottom: none;
  }

  position: relative;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      #ffffff 0%,
      #999999 8%,
      #999999 92%,
      #ffffff 100%
    );
    pointer-events: none;
  }
`;

const TableCell3 = styled.td`
  padding: 1.5rem;
  color: block;
  line-height: 1.6;
  text-align: center;
  &:last-child {
    border-right: none;
  }
`;
const VerticalDivider = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    #ffffff 0%,
    #999999 8%,
    #999999 92%,
    #ffffff 100%
  );
  pointer-events: none;
`;
const FeatureCell3 = styled(TableCell3)`
  color: var(--universal-black);
  white-space: nowrap;
`;
//#endregion

//#region fourth section Modular Kitchen Gallery
const GallerySection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const SectionContainer4 = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const GalleryHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderTextBlock = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const GalleryTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1c1c1c;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
const SectionSubtitle4 = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const ViewMoreLink = styled.a`
  position: absolute;
  top: 2.5rem;
  right: -13rem;
  color: var(--universal-red-theme-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #b30000;
  }

  @media (max-width: 768px) {
    position: static;
    display: block;
    margin-top: 1rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // Force 5 columns
  gap: 2rem;
  margin-bottom: 0rem;
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

const GalleryCard = styled(Link)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 160px;
  background: ${(props) => `url(${props.$image}) center/cover`};
  position: relative;
`;

const GalleryCardContent = styled.div`
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const GalleryCardTitle = styled.h3`
  margin-top: 0.8rem;
  font-size: 1.1rem;
  font-weight: normal;
  color: var(--universal-black);
  margin-bottom: 0.5rem;
  text-align: left;
`;

const SaveIcon = styled.div`
  position: absolute;
  bottom: -1.2rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: #333; /* You can change this to match your theme */
  }
`;

// Estimation CTA Section
const EstimationCard = styled(Link)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

// Top black section
const EstimationTop = styled.div`
  background: #000c26;
  color: #fff; /* White text */
  padding: 3.3rem 1rem;
  text-align: left;
`;

const EstimationTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
`;

// Bottom white section
const EstimationBottom = styled.div`
  background: #fff;
  padding: 1.2rem 1rem;
  position: relative; /* anchor for the arrow */
`;

const EstimationLink = styled.div`
  margin-top: 0.8rem;
  color: #d50f25;
  font-weight: 550;
  font-size: 0.8rem;
  text-decoration: none;
  display: flex; /* 👈 Align text and icon horizontally */
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:hover {
    // text-decoration: underline;
    color: #d50f25;
  }
`;
//#endregion

//#region fifth section Checklist
const ChecklistSection = styled.section`
  padding: 2rem 0;
  background: #ffffff;
`;

const ChecklistWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ChecklistHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ChecklistContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 0.5fr; // balanced layout
  border: 1px solid #878787;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  max-width: 1100px; // or 800px depending on your design
  margin: 0 auto; // center the box horizontally
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
`;

const ChecklistContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; // icon column auto-sized
  border-right: 1px solid #878787;
`;

const ChecklistTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1c1c1c;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ChecklistSubtitle = styled.p`
  line-height: 1.6;
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin: 0;
  margin-bottom: -1rem;
`;

const ChecklistItem = styled.div`
  display: contents; /* Allows children to act as table cells */
`;

const CheckIconCell = styled.div`
  border-bottom: 1px solid #878787;
  border-right: 1px solid #878787;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 1rem;

  & > div {
    width: 24px;
    height: 24px;
    background: var(--universal-green-theme-color);
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${({ $isLast }) => $isLast && `border-bottom: none;`}
`;

const ChecklistTextCell = styled.div`
  border-bottom: 1px solid #878787;
  display: flex;
  align-items: center; // Vertical centering
  justify-content: center; // Horizontal centering
  padding: 1rem;
  font-size: 1.1rem;
  color: #212121;

  ${({ $isLast }) => $isLast && `border-bottom: none;`}
`;

const ChecklistImage = styled.div`
  background: ${(props) => `url(${props.$image}) center/cover no-repeat`};
  height: auto;
  min-height: 100%;
`;
//#endregion

//#endregion



//Modular Kitchen Layout cards data /section 2
const layoutCards = [
  {
    title: "L-Shaped",
    description: "Ideal for small to medium homes",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664261/azure_migrated/guides/kitchen-guide/l-shaped.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664262/azure_migrated/guides/kitchen-guide/l-shaped-kitchen-frame.webp",
      details: {
        title: "What is an L-Shaped Kitchen Layout?",
        description: `An L-shaped kitchen is a layout where cabinets and countertops are arranged along two adjoining walls that form a 90-degree angle — resembling the shape of the letter "L". This design is popular in both compact and open-plan homes, as it offers an efficient and visually clean workspace by utilizing corner space and leaving one wall or side open.`,
        benefits: [
          {
            title: "Efficient Workflow",
            sub: "Supports the classic kitchen triangle (sink, stove, fridge) for better movement",
          },
          {
            title: "Open & Spacious",
            sub: "Leaves one wall open, ideal for open-plan homes or dining integration",
          },
          {
            title: "Maximizes Corner Space",
            sub: "Utilizes often-wasted corner areas with storage or corner accessories.",
          },
          {
            title: "Flexible Seating",
            sub: "Allows the addition of a breakfast counter, island, or bar stools.",
          },
          {
            title: "Easy to Customize",
            sub: "Works well for modular units, modern appliances, and multiple finishes.",
          },
          {
            title: "Good for Multiple Cooks",
            sub: "Provides clear zones for prep and cooking, reducing clutter.",
          },
        ],
        drawbacks: [
          {
            title: "Corner Cabinets Can Be Inconvenient",
            sub: "Hard-to-reach spaces unless equipped with special fittings like Lazy Susans.",
          },
          {
            title: "Not Ideal for Very Large Spaces",
            sub: "In big kitchens, the distance between appliances may be too far, making cooking less efficient.",
          },
          {
            title: "Less Wall Storage",
            sub: "With only two walls used, there’s limited space for overhead cabinets compared to U- or parallel kitchens.",
          },
          {
            title: "Tricky Appliance Placement",
            sub: "Fitting in the stove, fridge, and sink can be challenging without careful planning, which may lead to clutter.",
          },
        ],
      },
    },
    {
      title: "U-Shaped",
      description: "Perfect for storage-heavy needs",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664263/azure_migrated/guides/kitchen-guide/u-shaped.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664264/azure_migrated/guides/kitchen-guide/u-shaped-kitchen-frame.webp",
      details: {
        title: "What is a U-Shaped Kitchen Layout?",
        description:
          "A U-shaped kitchen features countertops and cabinets along three adjoining walls, forming a “U” shape. It creates an efficient, enclosed workspace that surrounds the cook from three sides. This design is ideal for medium to large kitchens, offering maximum storage and counter space.",
        benefits: [
          {
            title: "Highly Efficient Workflow",
            sub: "Creates a compact work triangle with minimal movement needed.",
          },
          {
            title: "Maximum Storage",
            sub: "Cabinets on three sides offer abundant storage options.",
          },
          {
            title: "Ample Counter Space",
            sub: "Ideal for multitasking or cooking complex meals.",
          },
          {
            title: "Can Fit Multiple Cooks",
            sub: "Large layout provides distinct zones for more than one person.",
          },
          {
            title: "Great for Closed Kitchens",
            sub: "Offers privacy and separation from dining/living areas.",
          },
        ],
        drawbacks: [
          {
            title: "May Feel Cramped in Small Spaces",
            sub: "Can be overwhelming if kitchen area is small or not well-lit.",
          },
          {
            title: "Corner Access Issues",
            sub: "Like L-shaped kitchens, corners need special storage solutions.",
          },
          {
            title: "Limited Open Plan Integration",
            sub: "Not ideal for open-concept homes without modifications.",
          },
          {
            title: "Less Space for Dining or Islands",
            sub: "Layout typically doesn’t allow room for an island or breakfast bar.",
          },
        ],
      },
    },
    {
      title: "Parallel",
      description: "Best for narrow kitchen spaces",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664266/azure_migrated/guides/kitchen-guide/parallel.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664267/azure_migrated/guides/kitchen-guide/parallel-kitchen-frame.webp",
      details: {
        title: "What is a Parallel Kitchen Layout?",
        description:
          "Also known as a galley kitchen, this layout features two parallel counters with a walkway in between. It’s a practical and space-saving solution, especially suited for compact homes or apartments with limited space.",
        benefits: [
          {
            title: "Compact & Efficient",
            sub: "Keeps appliances and work zones within close reach.",
          },
          {
            title: "Best Use of Narrow Spaces",
            sub: "Ideal for long, narrow kitchens or small apartments.",
          },
          {
            title: "Good Separation of Zones",
            sub: "Easy to keep prep and cooking areas separate.",
          },
          {
            title: "Cost-Effective",
            sub: "Typically uses fewer materials, keeping costs lower.",
          },
          {
            title: "Minimal Wastage of Space",
            sub: "No unused corners or awkward transitions.",
          },
        ],
        drawbacks: [
          {
            title: "Limited Movement for Multiple Users",
            sub: "Tight space can get crowded with more than one person.",
          },
          {
            title: "Less Natural Light",
            sub: "Depending on wall placement, it can feel closed off.",
          },
          {
            title: "No Space for Island or Dining",
            sub: "Usually doesn’t support add-ons like breakfast counters.",
          },
          {
            title: "May Feel Cramped Without Good Ventilation",
            sub: "Requires proper lighting and airflow for comfort.",
          },
        ],
      },
    },
    {
      title: "Island Kitchen",
      description: "Luxury layout with open space",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664268/azure_migrated/guides/kitchen-guide/island.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664269/azure_migrated/guides/kitchen-guide/island-kitchen-frame.webp",
      details: {
        title: "What is an Island Kitchen Layout?",
        description:
          "An island kitchen includes a freestanding countertop unit placed in the center of the kitchen. Often combined with L-shaped or U-shaped designs, the island serves as an extra workspace, dining area, or storage hub. It’s best suited for large kitchens and open-plan layouts.",
        benefits: [
          {
            title: "Multi-functional Centerpiece",
            sub: "Offers extra space for prep, cooking, dining, or even entertaining.",
          },
          {
            title: "Great for Open Layouts",
            sub: "Enhances flow and visibility in open-plan homes.",
          },
          {
            title: "Increases Storage & Seating",
            sub: "Can house drawers, cabinets, and seating options.",
          },
          {
            title: "Improves Workflow",
            sub: "Acts as an additional station within the kitchen triangle.",
          },
          {
            title: "Social Cooking Experience",
            sub: "Makes it easier to cook while engaging with family or guests.",
          },
        ],
        drawbacks: [
          {
            title: "Requires Large Space",
            sub: "Not suitable for compact or narrow kitchens.",
          },
          {
            title: "May Disrupt Workflow if Poorly Planned",
            sub: "Placement needs to be strategic to avoid movement inefficiency.",
          },
          {
            title: "Higher Installation Cost",
            sub: "Plumbing or electrical needs for sinks or appliances add to budget.",
          },
          {
            title: "Maintenance & Cleaning",
            sub: "More surfaces to clean and maintain.",
          },
        ],
      },
    },
    {
      title: "Straight Kitchen",
      description: "Compact and efficient",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664270/azure_migrated/guides/kitchen-guide/straight.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664271/azure_migrated/guides/kitchen-guide/stright-kitchen-frame.webp",
      details: {
        title: "What is a Straight Kitchen Layout?",
        description:
          "A straight kitchen layout places all cabinets, appliances, and countertops along a single wall. It’s the most space-saving and minimalist kitchen design, perfect for studio apartments or compact homes.",
        benefits: [
          {
            title: "Space-Saving Design",
            sub: "Ideal for small spaces, uses minimum square footage.",
          },
          {
            title: "Minimalist Look",
            sub: "Clean, linear design suits modern interiors.",
          },
          {
            title: "Cost-Efficient Setup",
            sub: "Fewer materials and simpler planning reduce overall cost.",
          },
          {
            title: "Easy to Install & Maintain",
            sub: "All utilities are in one line, simplifying setup.",
          },
          {
            title: "Great for Open Layouts",
            sub: "Doesn’t block views or light in open-plan spaces.",
          },
        ],
        drawbacks: [
          {
            title: "Limited Storage & Counter Space",
            sub: "Offers the least amount of workspace compared to other layouts.",
          },
          {
            title: "Less Efficient Workflow",
            sub: "Appliances and sink may not follow the ideal work triangle.",
          },
          {
            title: "Not Suited for Heavy Cooking",
            sub: "Better for light or occasional cooking due to space limitations.",
          },
          {
            title: "No Room for Additional Features",
            sub: "Cannot accommodate islands or bar counters.",
          },
        ],
      },
    },
  ];

//Modular kitchen Gallery cards data /section 4
const galleryCards = [
    {
      title: "Smart Space Urban Kitchen Concept",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657661/local_assets_migrated/guides/ModularKitchenGallery/ImageBadge1.webp",
    },
    {
      title: "Warm Wood Compact Kitchen Design",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657662/local_assets_migrated/guides/ModularKitchenGallery/ImageBadge2.webp",
    },
    {
      title: "Bold Tones Contemporary Kitchen",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657663/local_assets_migrated/guides/ModularKitchenGallery/ImageBadge3.webp",
    },
    {
      title: "Minimal Luxe White Kitchen Setup",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657664/local_assets_migrated/guides/ModularKitchenGallery/ImageBadge4.webp",
    },
  ];

//Modular Kitchen Checklist items / section 5
const checklistItems = [
    "Understand your cooking and storage needs clearly.",
    "Measure the kitchen space precisely to plan layouts efficiently.",
    "Select a layout type that best suits your space (L-shape, U-shape, Island, etc.).",
    "Choose materials that are durable, heat-resistant, and easy to maintain.",
    "Opt for finishes and colors that reflect your style and enhance the kitchen's ambiance.",
    "Focus on proper lighting, ventilation, and appliance placements.",
    "Plan your budget wisely without compromising on functionality or quality.",
  ];

//Wardrobe Layout Cards data /section 2
const WardrobelayoutCards = [
    {
      title: "Sliding Wardrobe",
      description: "Ideal for compact rooms with limited space.",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664272/azure_migrated/guides/wardrobe-guide/sliding.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664273/azure_migrated/guides/wardrobe-guide/sliding-door-wardrobe-frame.webp",
      details: {
        title: "What is a Sliding Door Wardrobe?",
        description:
          "A sliding door wardrobe features horizontally gliding doors that move on tracks rather than swinging open. This sleek, space-saving design is ideal for compact rooms or areas where clearance for hinged doors isn’t feasible. Modern and minimal, it seamlessly blends into any interior style.",
        benefits: [
          {
            title: "Space-Saving Design",
            sub: "Ideal for small bedrooms as the doors don’t require extra space to open.",
          },
          {
            title: "Sleek & Contemporary Look",
            sub: "Offers a clean, modern appearance that complements minimalistic interiors.",
          },
          {
            title: "Customizable Interiors",
            sub: "Easy to personalize with shelves, drawers, and hanging sections.",
          },
          {
            title: "Smooth Functionality",
            sub: "High-quality rollers ensure quiet, seamless sliding.",
          },
          {
            title: "Mirror Options",
            sub: "Sliding doors often integrate mirrors, enhancing room brightness and utility.",
          },
        ],
        drawbacks: [
          {
            title: "Limited Door Access",
            sub: "Only one section can be accessed at a time due to overlapping doors.",
          },
          {
            title: "Track Maintenance",
            sub: "Tracks may gather dust or derail if not cleaned regularly.",
          },
          {
            title: "Not Ideal for Tight Wall Spaces",
            sub: "Requires enough linear wall space to accommodate full door travel.",
          },
        ],
      },
    },
    {
      title: "Hinged Door Wardrobe",
      description: "Classic and versatile, fits most bedroom styles.",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664275/azure_migrated/guides/wardrobe-guide/hinged.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664280/azure_migrated/guides/wardrobe-guide/hinged-door-wardrobe-frame.webp",
      details: {
        title: "What is a Hinged Door Wardrobe?",
        description:
          "A hinged door wardrobe uses traditional outward-opening doors, attached via side hinges. Timeless and versatile, this design suits both classic and modern interiors, offering full interior access at once.",
        benefits: [
          {
            title: "Full Access",
            sub: "Opens wide, allowing complete view and access to the wardrobe.",
          },
          {
            title: "Flexible Interior Design",
            sub: "Supports add-ons like door hooks, mirrors, or inner organizers.",
          },
          {
            title: "Classic Appeal",
            sub: "Works well with a variety of design styles, from vintage to modern.",
          },
          {
            title: "Better Seal",
            sub: "Offers a tighter seal, which helps keep dust and pests out.",
          },
          {
            title: "Cost-Effective",
            sub: "Usually more affordable compared to sliding door mechanisms.",
          },
        ],
        drawbacks: [
          {
            title: "Requires Clearance Space",
            sub: "Needs space in front of the wardrobe for door swing.",
          },
          {
            title: "Can Look Bulky in Small Rooms",
            sub: "May visually shrink smaller spaces if not designed thoughtfully",
          },
          {
            title: "Hardware Wear Over Time",
            sub: "Hinges can loosen or squeak with heavy use.",
          },
        ],
      },
    },
    {
      title: "Walk-in Wardrobe",
      description: "Perfect for large spaces with luxury storage needs.",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664281/azure_migrated/guides/wardrobe-guide/walk-in.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664282/azure_migrated/guides/wardrobe-guide/walkin-wardrobe-frame.webp",
      details: {
        title: "What is a Walk-in Wardrobe?",
        description:
          "A walk-in wardrobe is a dedicated space—often a small room or large enclosure—designed for storing clothes, accessories, and more. It’s the epitome of luxury and organization, offering maximum storage and dressing space.",
        benefits: [
          {
            title: "Spacious Storage",
            sub: "Ample room for clothing, shoes, accessories, and more.",
          },
          {
            title: "Private Dressing Area",
            sub: "Doubles as a personal dressing space with mirrors and seating.",
          },
          {
            title: "Highly Customizable",
            sub: "Tailored compartments, lighting, and even decor can be added.",
          },
          {
            title: "Decluttered Bedroom",
            sub: "Keeps the bedroom minimal and organized.",
          },
          {
            title: "Luxury Appeal",
            sub: "Adds value and elegance to any home.",
          },
        ],
        drawbacks: [
          {
            title: "Space Requirement",
            sub: "Needs substantial space, not ideal for compact homes.",
          },
          {
            title: "Higher Cost",
            sub: "Requires more material, labor, and customization—can be expensive.",
          },
          {
            title: "May Need Additional Ventilation",
            sub: "Enclosed spaces may require airflow planning to prevent mustiness.",
          },
        ],
      },
    },
    {
      title: "L-Shaped Wardrobe",
      description: "Great for corner utilization and maximizing storage.",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664284/azure_migrated/guides/wardrobe-guide/l-shaped-wardrobe.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664285/azure_migrated/guides/wardrobe-guide/l-shaped-wardrobe-frame.webp",
      details: {
        title: "What is an L-Shaped Wardrobe?",
        description:
          "An L-shaped wardrobe fits into the corner of a room, extending along two adjacent walls to form an “L” layout. It maximizes storage by utilizing otherwise dead space and is especially effective for rooms with corners or irregular shapes.",
        benefits: [
          {
            title: "Utilizes Corner Space",
            sub: "Makes use of awkward or unused corners for smart storage.",
          },
          {
            title: "Spacious & Efficient",
            sub: "Offers extensive storage without crowding the room.",
          },
          {
            title: "Open Layout",
            sub: "Keeps one side of the room free, improving flow.",
          },
          {
            title: "Design Versatility",
            sub: "Works well with sliding, hinged, or open shelving configurations.",
          },
          {
            title: "Good for Shared Spaces",
            sub: "Ideal for couples or roommates with separate zones.",
          },
        ],
        drawbacks: [
          {
            title: "Corner Accessibility Issues",
            sub: "Deep corners may require pull-outs or Lazy Susans.Custom Fittings Needed",
          },
          {
            title: "Custom Fittings Needed",
            sub: "May not suit off-the-shelf wardrobes due to its layout.",
          },
          {
            title: "Wall Dependence",
            sub: "Needs two solid walls for proper installation.",
          },
        ],
      },
    },
    {
      title: "Built-in Wardrobe",
      description: "Custom-fit wardrobe that blends into your wall.",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664286/azure_migrated/guides/wardrobe-guide/built-in.webp",
      popupImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664287/azure_migrated/guides/wardrobe-guide/builtin-wardrobe-frame.webp",
      details: {
        title: "What is a Built-in Wardrobe?",
        description:
          "A built-in wardrobe is custom-fitted into a wall or niche, becoming a seamless part of the room’s structure. It provides a permanent and tailored storage solution, making full use of vertical and horizontal space.",
        benefits: [
          {
            title: "Seamless Integration",
            sub: "Blends with the architecture, creating a sleek, clean look.",
          },
          {
            title: "Maximized Storage",
            sub: "Custom-fit to ceilings and corners for no wasted space.",
          },
          {
            title: "Personalized Design",
            sub: "Interiors, doors, and finishes tailored to user needs.",
          },
          {
            title: "Adds Property Value",
            sub: "Increases home appeal and resale potential.",
          },
          {
            title: "Low Visual Impact",
            sub: "Doesn’t overwhelm the room with bulky furniture.",
          },
        ],
        drawbacks: [
          {
            title: "Permanent Installation",
            sub: "Can’t be moved or repurposed easily.",
          },
          {
            title: "Higher Initial Cost",
            sub: "Custom carpentry can be more expensive upfront.",
          },
          {
            title: "Requires Professional Planning",
            sub: "Precise measurements and design are crucial to avoid errors.",
          },
        ],
      },
    },
  ];

//Wardrobe Gallery cards data /section 4
const WardrobegalleryCards = [
    {
      title: "Contemporary Sliding Wardrobe Style",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657665/local_assets_migrated/guides/WardrobeGallery/Image1.webp",
    },
    {
      title: "Warm Wooden Hinged Wardrobe Setup",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657666/local_assets_migrated/guides/WardrobeGallery/Image2.webp",
    },
    {
      title: "Luxury Walk-In Wardrobe Look",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657667/local_assets_migrated/guides/WardrobeGallery/Image3.webp",
    },
    {
      title: "Compact Built-In Wardrobe Design",
      image: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657668/local_assets_migrated/guides/WardrobeGallery/Image4.webp",
    },
  ];

//Wardrobe Checklist items / section 5
const WardrobechecklistItems = [
    "Determine the utility and frequency of use.",
    "Measure the space accurately to choose the right size.",
    "Choose a layout that suits your room (sliding, hinged, walk-in, etc.).",
    "Plan internal sections — shelves, drawers, hanging space, mirrors.",
    "Go for a finish that matches your room’s theme.",
    "Keep functionality and future storage in mind",
    "Define your budget but do not compromise on quality.",
  ];

const GuidesSections = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeGuide, setActiveGuide] = useState("Modular Kitchen Guide");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const guideCategories = ["Modular Kitchen Guide", "Wardrobe Design Guide"];

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const matchedGuide = guideCategories.find((category) => {
      const urlFriendly = category.toLowerCase().replace(/\s+/g, "-");
      return urlFriendly === lastSegment;
    });
    setActiveGuide(matchedGuide || guideCategories[0]);
  }, [location.pathname]);

  return (
    <Layout>
      <Breadcrumb />

      {activeGuide === "Modular Kitchen Guide" && (
        <>
          {/* //#region  --- *Modular Kitchen Guide* - webpage 1  */}
          {/* first section Design Modern kitchen  */}
          <SectionWrapper>
            <ContentBox>
              <Title className="universal-fs-h16 universal-font-extra-bold">
                Design Your Dream Modular Kitchen
              </Title>
              <Subtitle className="universal-fs-h3 universal-font">
                Explore layouts, finishes, materials & cost insights tailored
                for Indian homes.
              </Subtitle>
              <Button onClick={() => setIsConsultationOpen(true)}>
                <ButtonText className="universal-fs-h4 universal-font-semibold">
                  Book a Free Consultation
                </ButtonText>
                <RibbonWrapper>
                  <svg
                    width="51"
                    height="46"
                    viewBox="0 0 51 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g clipPath="url(#clip0_373_12689)">
                      {" "}
                      <path
                        d="M11.25 37.5628V2.27433C11.25 1.10346 11.6423 0.126617 12.4268 -0.656217C13.2113 -1.43905 14.1882 -1.83131 15.3573 -1.83301H37.6452C38.8144 -1.83301 39.7912 -1.44074 40.5758 -0.656217C41.3603 0.128311 41.7517 1.10516 41.75 2.27433V37.5628L26.5 31.013L11.25 37.5628Z"
                        fill="url(#paint0_linear_373_12689)"
                      />{" "}
                      <path
                        d="M20.85 15.54H18.2V16.89H20.8V18.43H18.2V21H16.6V14H20.85V15.54ZM25.4753 21L24.1553 18.7H23.3953V21H21.7953V14H24.5953C25.262 14 25.8286 14.2333 26.2953 14.7C26.762 15.1667 26.9953 15.7333 26.9953 16.4C26.9953 16.8267 26.8753 17.2233 26.6353 17.59C26.402 17.95 26.092 18.23 25.7053 18.43L27.1953 21H25.4753ZM23.3953 15.5V17.3H24.5953C24.8153 17.3 25.002 17.2133 25.1553 17.04C25.3153 16.8667 25.3953 16.6533 25.3953 16.4C25.3953 16.1467 25.3153 15.9333 25.1553 15.76C25.002 15.5867 24.8153 15.5 24.5953 15.5H23.3953ZM29.5477 19.46H32.3477V21H27.9477V14H32.2977V15.54H29.5477V16.7H32.0477V18.22H29.5477V19.46ZM34.8504 19.46H37.6504V21H33.2504V14H37.6004V15.54H34.8504V16.7H37.3504V18.22H34.8504V19.46Z"
                        fill="#1D1D1D"
                      />{" "}
                    </g>{" "}
                    <defs>
                      {" "}
                      <linearGradient
                        id="paint0_linear_373_12689"
                        x1="26.5"
                        y1="-1.83301"
                        x2="26.5"
                        y2="37.5628"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="#D4AF37" />{" "}
                        <stop offset="1" stopColor="#FFD700" />{" "}
                      </linearGradient>{" "}
                      <clipPath id="clip0_373_12689">
                        {" "}
                        <rect width="51" height="46" fill="white" />{" "}
                      </clipPath>{" "}
                    </defs>{" "}
                  </svg>
                </RibbonWrapper>
              </Button>
            </ContentBox>
            <HeroImage
              src={"https://res.cloudinary.com/sevfdaro/image/upload/v1782664288/azure_migrated/guides/kitchen-guide/color-isometric-concept-kitchen.webp"}
              alt="Modular Kitchen"
            />
          </SectionWrapper>

          {/* second section kitchen layout */}
          <LayoutSection>
            <SectionContainer>
              <SectionTitle className="universal-fs-h12 universal-font-bold">
                Kitchen Layout{" "}
                <span style={{ color: "var(--universal-blue-theme-color)" }}>
                  Types
                </span>
              </SectionTitle>
              <SectionSubtitle className="universal-fs-h3 universal-font-medium">
                Every home has a different flow. Pick a layout that suits your
                lifestyle and space.
              </SectionSubtitle>

              <LayoutCardsContainer>
                {layoutCards.map((card, index) => (
                  <LayoutCard key={index}>
                    <CardImage $image={card.image} />
                    <CardContent>
                      <CardTitle className="universal-fs-h3 universal-font-medium">
                        {card.title}
                      </CardTitle>
                      <CardDescription className="universal-fs-h14 universal-font-medium">
                        {card.description}
                      </CardDescription>
                      <ReadMoreButton
                        className="universal-fs-h3 universal-font-medium"
                        onClick={() => {
                          setSelectedLayout(card);
                          setIsPopupOpen(true);
                        }}
                      >
                        Read More
                      </ReadMoreButton>
                    </CardContent>
                  </LayoutCard>
                ))}
              </LayoutCardsContainer>
              {/* Popup for layout details */}
              <Modal open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                {selectedLayout && (
                  <PopupContainer>
                    <PopupImageSide>
                      <PopupImage
                        src={selectedLayout.popupImage}
                        alt={selectedLayout.title}
                      />
                    </PopupImageSide>
                    <PopupContent>
                      <Header>
                        <CloseBtn
                          aria-label="Close"
                          onClick={() => setIsPopupOpen(false)}
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.9992 20.1L10.6492 27.45C10.3742 27.725 10.0242 27.8625 9.59922 27.8625C9.17422 27.8625 8.82422 27.725 8.54922 27.45C8.27422 27.175 8.13672 26.825 8.13672 26.4C8.13672 25.975 8.27422 25.625 8.54922 25.35L15.8992 18L8.54922 10.65C8.27422 10.375 8.13672 10.025 8.13672 9.60001C8.13672 9.17501 8.27422 8.82501 8.54922 8.55001C8.82422 8.27501 9.17422 8.13751 9.59922 8.13751C10.0242 8.13751 10.3742 8.27501 10.6492 8.55001L17.9992 15.9L25.3492 8.55001C25.6242 8.27501 25.9742 8.13751 26.3992 8.13751C26.8242 8.13751 27.1742 8.27501 27.4492 8.55001C27.7242 8.82501 27.8617 9.17501 27.8617 9.60001C27.8617 10.025 27.7242 10.375 27.4492 10.65L20.0992 18L27.4492 25.35C27.7242 25.625 27.8617 25.975 27.8617 26.4C27.8617 26.825 27.7242 27.175 27.4492 27.45C27.1742 27.725 26.8242 27.8625 26.3992 27.8625C25.9742 27.8625 25.6242 27.725 25.3492 27.45L17.9992 20.1Z"
                              fill="#999999"
                            />
                          </svg>
                        </CloseBtn>
                      </Header>

                      <PopupTitle>{selectedLayout.details.title}</PopupTitle>
                      <PopupDesc>
                        {selectedLayout.details.description
                          .split(".")
                          .filter((sentence) => sentence.trim() !== "")
                          .map((sentence, index) => (
                            <PopupDesc key={index}>
                              {sentence.trim()}.
                            </PopupDesc>
                          ))}
                      </PopupDesc>
                      <CtaRow>
                        <PopupButton onClick={() => navigate("/price-calculators/kitchen-price-calculation")}>
                          <PopupButtonText className="universal-fs-h3 universal-font-semibold">
                            Calculate your Price Estimation
                          </PopupButtonText>
                          <RibbonWrapper>
                            <svg
                              width="51"
                              height="46"
                              viewBox="0 0 51 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <g clipPath="url(#clip0_373_12689)">
                                {" "}
                                <path
                                  d="M11.25 37.5628V2.27433C11.25 1.10346 11.6423 0.126617 12.4268 -0.656217C13.2113 -1.43905 14.1882 -1.83131 15.3573 -1.83301H37.6452C38.8144 -1.83301 39.7912 -1.44074 40.5758 -0.656217C41.3603 0.128311 41.7517 1.10516 41.75 2.27433V37.5628L26.5 31.013L11.25 37.5628Z"
                                  fill="url(#paint0_linear_373_12689)"
                                />{" "}
                                <path
                                  d="M20.85 15.54H18.2V16.89H20.8V18.43H18.2V21H16.6V14H20.85V15.54ZM25.4753 21L24.1553 18.7H23.3953V21H21.7953V14H24.5953C25.262 14 25.8286 14.2333 26.2953 14.7C26.762 15.1667 26.9953 15.7333 26.9953 16.4C26.9953 16.8267 26.8753 17.2233 26.6353 17.59C26.402 17.95 26.092 18.23 25.7053 18.43L27.1953 21H25.4753ZM23.3953 15.5V17.3H24.5953C24.8153 17.3 25.002 17.2133 25.1553 17.04C25.3153 16.8667 25.3953 16.6533 25.3953 16.4C25.3953 16.1467 25.3153 15.9333 25.1553 15.76C25.002 15.5867 24.8153 15.5 24.5953 15.5H23.3953ZM29.5477 19.46H32.3477V21H27.9477V14H32.2977V15.54H29.5477V16.7H32.0477V18.22H29.5477V19.46ZM34.8504 19.46H37.6504V21H33.2504V14H37.6004V15.54H34.8504V16.7H37.3504V18.22H34.8504V19.46Z"
                                  fill="#1D1D1D"
                                />{" "}
                              </g>{" "}
                              <defs>
                                {" "}
                                <linearGradient
                                  id="paint0_linear_373_12689"
                                  x1="26.5"
                                  y1="-1.83301"
                                  x2="26.5"
                                  y2="37.5628"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  {" "}
                                  <stop stopColor="#D4AF37" />{" "}
                                  <stop offset="1" stopColor="#FFD700" />{" "}
                                </linearGradient>{" "}
                                <clipPath id="clip0_373_12689">
                                  {" "}
                                  <rect
                                    width="51"
                                    height="46"
                                    fill="white"
                                  />{" "}
                                </clipPath>{" "}
                              </defs>{" "}
                            </svg>
                          </RibbonWrapper>
                        </PopupButton>
                        <SecondaryCta aria-label="Share">
                          <svg
                            width="55"
                            height="56"
                            viewBox="0 0 55 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.5"
                              y="0.545471"
                              width="54"
                              height="54"
                              rx="9.5"
                              stroke="#999999"
                              strokeOpacity="0.4"
                            />
                            <path
                              d="M35.7225 27.5458L30.75 22.5733V25.2383L29.8183 25.3791C25.1492 26.04 21.9858 28.4883 20.1767 32.2366C22.69 30.46 25.81 29.6041 29.6667 29.6041H30.75V32.5183M28.5833 30.7091C23.7408 30.9366 20.2742 32.6808 17.75 36.2125C18.8333 30.7958 22.0833 25.3791 29.6667 24.2958V19.9625L37.25 27.5458L29.6667 35.1291V30.6875C29.3092 30.6875 28.9517 30.6983 28.5833 30.7091Z"
                              fill="#999999"
                            />
                          </svg>
                        </SecondaryCta>
                      </CtaRow>

                      <BenefitTitle>
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 28 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1033_14605)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M27.8544 3.09848C27.7915 2.90978 27.6733 2.74435 27.5152 2.62368C27.3571 2.503 27.1663 2.43267 26.9677 2.42181C26.57 2.45162 26.197 2.62591 25.9189 2.91181C24.4887 4.35958 23.1756 5.91847 21.9919 7.57381C19.0776 11.4436 15.5577 16.5956 13.9851 18.9722L13.4134 19.8472C11.8243 19.27 10.1738 18.8785 8.49473 18.6805C7.72015 18.5505 6.9273 18.5783 6.16373 18.7621C6.06102 18.8032 5.96774 18.8647 5.88952 18.9429C5.81131 19.0212 5.7498 19.1144 5.70873 19.2171C5.67043 19.4472 5.68408 19.6829 5.74868 19.9069C5.81327 20.131 5.92718 20.3378 6.08206 20.5121C6.88074 21.4898 7.79242 22.3694 8.79806 23.1325C11.0124 24.9152 13.8101 26.629 14.8122 26.7573C14.8908 26.7669 14.9705 26.7527 15.041 26.7165C15.1114 26.6803 15.1694 26.6238 15.2073 26.5543C15.2453 26.4848 15.2615 26.4055 15.2539 26.3267C15.2463 26.2478 15.2151 26.1731 15.1646 26.1122C15.0972 26.0293 15 25.9761 14.8939 25.964C13.1829 25.3015 11.6041 24.3387 10.2319 23.1208C9.03469 22.2306 7.94371 21.2057 6.98039 20.0665C6.89086 19.9474 6.80903 19.8227 6.73539 19.6931C6.82598 19.6623 6.92002 19.6427 7.01539 19.6348C8.19723 19.6803 9.36972 19.86 10.5119 20.1715C11.4802 20.3932 12.4252 20.7082 13.3317 21.1165C13.4305 21.1756 13.5451 21.2028 13.6599 21.1945C13.7747 21.1861 13.8842 21.1426 13.9734 21.0698C14.0736 21.0111 14.1516 20.9209 14.1951 20.8131V20.7548C14.3234 20.5565 14.5801 20.1598 14.9639 19.5882C16.5599 17.2583 20.1147 12.1763 23.0291 8.34148C24.3346 6.61715 25.5001 5.13665 26.3156 4.28615C26.4206 4.17648 26.5372 4.07926 26.6656 3.99448C26.6072 4.32115 26.4672 4.75281 26.3622 5.16115C25.3673 8.29426 24.1118 11.3386 22.6091 14.2623C20.8393 17.9981 18.802 21.6012 16.5132 25.0435C16.4856 25.0803 16.4656 25.1221 16.4542 25.1666C16.4428 25.2111 16.4402 25.2575 16.4467 25.303C16.4532 25.3485 16.4686 25.3923 16.4921 25.4318C16.5155 25.4714 16.5465 25.5059 16.5832 25.5335C16.6594 25.5898 16.7546 25.6141 16.8484 25.601C16.9422 25.5879 17.0271 25.5385 17.0849 25.4635C20.9028 19.9579 24.1556 14.0812 26.7939 7.92265C27.3002 6.80031 27.6922 5.62898 27.9594 4.42615C28.0411 3.98281 28.0049 3.52315 27.8544 3.09731"
                              fill="#559944"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.6046 16.4906C12.0722 14.4735 14.0999 11.8286 16.0004 9.38097L18.3314 6.34997C19.4969 4.91731 20.3824 3.70514 21.0346 3.00514C21.1512 2.88847 21.2562 2.74847 21.3496 2.64347C21.3612 2.70258 21.3612 2.76092 21.3496 2.81847C21.3202 3.32429 21.2341 3.82521 21.0929 4.31181C20.9646 5.03397 20.6729 5.91947 20.3241 6.85164C20.2957 6.89583 20.2776 6.94583 20.2712 6.99796C20.2647 7.05008 20.2701 7.10298 20.2869 7.15274C20.3037 7.20251 20.3315 7.24785 20.3682 7.28542C20.4049 7.32298 20.4495 7.35181 20.4989 7.36976C20.5483 7.3877 20.601 7.39432 20.6533 7.3891C20.7055 7.38388 20.756 7.36697 20.8008 7.33962C20.8456 7.31227 20.8837 7.27518 20.9123 7.2311C20.9408 7.18701 20.9591 7.13707 20.9657 7.08497C21.6191 5.75264 22.1021 4.34331 22.3984 2.88847C22.4917 1.93297 22.0834 1.47914 21.5479 1.42081C21.2177 1.42709 20.9016 1.55601 20.6612 1.78247C19.4126 2.91571 18.2735 4.16412 17.2592 5.51114C16.5242 6.44447 15.7321 7.50381 14.9282 8.59931C13.0977 11.1403 11.2801 13.938 9.91622 16.0356C9.87532 16.1233 9.86689 16.2227 9.89243 16.316C9.91798 16.4094 9.97584 16.4906 10.0557 16.5452C10.1356 16.5999 10.2322 16.6244 10.3285 16.6144C10.4247 16.6044 10.5143 16.5605 10.5812 16.4906H10.6046ZM7.74855 25.733C7.09522 25.6046 5.88422 24.2163 4.64872 22.632C4.14705 22.002 3.65705 21.3148 3.19155 20.6743C2.72489 20.0326 2.21155 19.2638 1.85105 18.6583C1.60231 18.2896 1.38754 17.8991 1.20939 17.4916V17.4333C2.26603 17.4153 3.31935 17.5569 4.33372 17.8533C4.41046 17.8815 4.49458 17.8822 4.57176 17.8553C4.64895 17.8284 4.71444 17.7756 4.75708 17.7058C4.79972 17.6361 4.81687 17.5538 4.80562 17.4728C4.79438 17.3918 4.75542 17.3173 4.69539 17.2618C4.66165 17.2302 4.622 17.2056 4.57872 17.1895C3.54594 16.7747 2.45865 16.5115 1.35055 16.4078C1.01067 16.3574 0.66348 16.4018 0.347221 16.5361C0.223023 16.6036 0.124594 16.7103 0.0672208 16.8395C-0.00825825 17.155 -0.0203118 17.4824 0.0317598 17.8027C0.0838313 18.1229 0.198991 18.4296 0.370554 18.705C0.872221 19.7316 1.47772 20.7035 2.17772 21.6065C4.01872 24.0425 6.58305 26.4435 7.60855 26.5951C7.6599 26.6053 7.71274 26.6052 7.76404 26.5948C7.81534 26.5845 7.86409 26.5641 7.90747 26.5348C7.95084 26.5055 7.988 26.4679 8.01679 26.4242C8.04558 26.3805 8.06544 26.3316 8.07522 26.2801C8.09926 26.2229 8.10953 26.1608 8.1052 26.0989C8.10086 26.0369 8.08205 25.9769 8.05027 25.9235C8.0185 25.8702 7.97464 25.8251 7.92224 25.7918C7.86983 25.7585 7.81034 25.7391 7.74855 25.733Z"
                              fill="#559944"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1033_14605">
                              <rect
                                width="28"
                                height="28"
                                fill="white"
                                transform="translate(0 0.0908203)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Benefits
                      </BenefitTitle>
                      {selectedLayout.details.benefits.map((b, i) => (
                        <BenefitItem key={i}>
                          <BenefitHeader>
                            <BenefitDot />
                            {b.title}
                          </BenefitHeader>
                          <BenefitSub>{b.sub}</BenefitSub>
                          {i !== selectedLayout.details.benefits.length - 1 && (
                            <BenefitRule />
                          )}
                        </BenefitItem>
                      ))}
                      <DrawbacksTitle>
                        <svg
                          width="28"
                          height="29"
                          viewBox="0 0 28 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3007 15.0113L15.7507 12.5613L18.2007 15.0113L19.0033 14.2075L16.5533 11.7575L19.0033 9.30749L18.2007 8.50366L15.7507 10.9537L13.3007 8.50366L12.498 9.30749L14.948 11.7575L12.498 14.2075L13.3007 15.0113ZM9.46932 19.9242C8.93187 19.9242 8.48348 19.7445 8.12415 19.3852C7.76482 19.0258 7.58476 18.5774 7.58398 18.04V5.47499C7.58398 4.93832 7.76404 4.48993 8.12415 4.12982C8.48426 3.76971 8.93265 3.59005 9.46932 3.59082H22.0332C22.5698 3.59082 23.0182 3.77049 23.3783 4.12982C23.7384 4.48916 23.9181 4.93754 23.9173 5.47499V18.04C23.9173 18.5767 23.7377 19.0247 23.3783 19.384C23.019 19.7433 22.5702 19.9234 22.032 19.9242H9.46932ZM5.96932 23.4242C5.43187 23.4242 4.98348 23.2445 4.62415 22.8852C4.26482 22.5258 4.08476 22.0774 4.08398 21.54V7.80832H5.25065V21.54C5.25065 21.7189 5.32532 21.8834 5.47465 22.0335C5.62398 22.1836 5.78848 22.2583 5.96815 22.2575H19.6998V23.4242H5.96932Z"
                            fill="#D50F25"
                          />
                        </svg>
                        Drawbacks
                      </DrawbacksTitle>
                      {selectedLayout.details.drawbacks?.map((d, i) => (
                        <BenefitItem key={i}>
                          <BenefitHeader>
                            <DrawbackDot /> {d.title}
                          </BenefitHeader>
                          <BenefitSub>{d.sub}</BenefitSub>
                          {i !==
                            selectedLayout.details.drawbacks.length - 1 && (
                            <BenefitRule />
                          )}
                        </BenefitItem>
                      ))}
                    </PopupContent>
                  </PopupContainer>
                )}
              </Modal>
            </SectionContainer>
          </LayoutSection>

          {/* third section Modular and carpenter */}
          <ComparisonSection3>
            <SectionContainer3>
              <ComparisonTitle3 className="universal-fs-h9 universal-font-bold">
                Modular Kitchen <span style={{ color: "#549943" }}>vs</span>{" "}
                Carpenter-Made Kitchen
              </ComparisonTitle3>
              <div style={{ position: "relative" }}>
                <ComparisonTable3>
                  <thead>
                    <tr>
                      <TableHeader3 className="universal-fs-h5 universal-font-semibold">
                        Features
                      </TableHeader3>
                      <TableHeader3>
                        <IconContainer3 className="universal-fs-h5 universal-font-semibold">
                          <ImageIcon3
                            src={
                              "/assets/guides/MK-icon.svg"
                            }
                            alt="Carpenter Icon"
                          />
                          Modular Kitchen
                        </IconContainer3>
                      </TableHeader3>
                      <TableHeader3>
                        <IconContainer3 className="universal-fs-h5 universal-font-semibold">
                          <ImageIcon3
                            src={
                              "/assets/guides/CMK-icon.svg"
                            }
                            alt="Carpenter Icon"
                          />
                          Carpenter Made Kitchen
                        </IconContainer3>
                      </TableHeader3>
                    </tr>
                  </thead>
                  <tbody className="universal-fs-h4 universal-font-medium">
                    <TableRow3>
                      <FeatureCell3>Build Process</FeatureCell3>
                      <TableCell3>
                        Factory-made units with precise machine-cut finishes
                      </TableCell3>
                      <TableCell3>
                        Built on-site by local carpenters; manual process
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Installation Time</FeatureCell3>
                      <TableCell3>
                        Quick installation within a few days
                      </TableCell3>
                      <TableCell3>
                        Takes longer due to on-site construction
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Design Consistency</FeatureCell3>
                      <TableCell3>
                        High consistency in design, finish, and quality
                      </TableCell3>
                      <TableCell3>
                        May vary depending on carpenter's skill
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Customization</FeatureCell3>
                      <TableCell3>
                        Limited to modular flexibility; predefined modules
                      </TableCell3>
                      <TableCell3>
                        Fully customizable based on client preference
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Finish Quality</FeatureCell3>
                      <TableCell3>
                        Seamless, factory-laminated or acrylic finishes
                      </TableCell3>
                      <TableCell3>
                        Varies; usually laminate or polish finishes done by hand
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Durability</FeatureCell3>
                      <TableCell3>
                        Durable with standardized fittings and tested materials
                      </TableCell3>
                      <TableCell3>
                        Durability depends on workmanship and material quality
                        used
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Cost</FeatureCell3>
                      <TableCell3>
                        Slightly higher due to manufacturing and brand value
                      </TableCell3>
                      <TableCell3>
                        Can be budget-friendly but may lack finishing finesse
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>After-Sales Support</FeatureCell3>
                      <TableCell3>
                        Usually includes warranty, AMC, and service support from
                        the brand
                      </TableCell3>
                      <TableCell3>
                        Typically no structured support or warranty
                      </TableCell3>
                    </TableRow3>
                  </tbody>
                </ComparisonTable3>
                {/* Vertical dividers (full column height) */}
                <VerticalDivider style={{ left: "18%" }} />{" "}
                {/* between Features + Modular */}
                <VerticalDivider style={{ left: "61%" }} />{" "}
                {/* between Modular + Carpenter */}
              </div>
            </SectionContainer3>
          </ComparisonSection3>

          {/* fourth section Modular Kitchen Gallery */}
          <GallerySection>
            <SectionContainer4>
              <GalleryHeader>
                <HeaderTextBlock>
                  <GalleryTitle className="universal-fs-h10 universal-font-bold">
                    Explore Our{" "}
                    <span
                      style={{ color: "var(--universal-blue-theme-color)" }}
                    >
                      Modular Kitchen
                    </span>{" "}
                    Gallery
                  </GalleryTitle>
                  <SectionSubtitle4 className="universal-fs-h4 universal-font-medium">
                    Browse real spaces designed to blend function and beauty —
                    tailored to your lifestyle.
                  </SectionSubtitle4>
                </HeaderTextBlock>

                <ViewMoreLink
                  className="universal-fs-h4 universal-font-medium"
                  href="/design-gallery/kitchen-designs/modular-kitchen"
                >
                  <svg
                    width="85"
                    height="21"
                    viewBox="0 0 85 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.596 14.4985L0.596 6.09853H1.796L4.232 13.1065L6.656 6.09853H7.868L4.856 14.4985H3.596ZM9.03875 7.40653C8.83875 7.40653 8.67075 7.33853 8.53475 7.20253C8.39875 7.06653 8.33075 6.90253 8.33075 6.71053C8.33075 6.51853 8.39875 6.35453 8.53475 6.21853C8.67075 6.07453 8.83875 6.00254 9.03875 6.00254C9.23075 6.00254 9.39475 6.07453 9.53075 6.21853C9.66675 6.35453 9.73475 6.51853 9.73475 6.71053C9.73475 6.90253 9.66675 7.06653 9.53075 7.20253C9.39475 7.33853 9.23075 7.40653 9.03875 7.40653ZM8.51075 14.4985V8.49854H9.55475V14.4985H8.51075ZM11.8795 11.9785C11.9835 12.5145 12.2275 12.9305 12.6115 13.2265C13.0035 13.5225 13.4835 13.6705 14.0515 13.6705C14.8435 13.6705 15.4195 13.3785 15.7795 12.7945L16.6675 13.2985C16.0835 14.2025 15.2035 14.6545 14.0275 14.6545C13.0755 14.6545 12.2995 14.3585 11.6995 13.7665C11.1075 13.1665 10.8115 12.4105 10.8115 11.4985C10.8115 10.5945 11.1035 9.84254 11.6875 9.24253C12.2715 8.64253 13.0275 8.34254 13.9555 8.34254C14.8355 8.34254 15.5515 8.65453 16.1035 9.27853C16.6635 9.89453 16.9435 10.6385 16.9435 11.5105C16.9435 11.6625 16.9315 11.8185 16.9075 11.9785H11.8795ZM13.9555 9.32653C13.3955 9.32653 12.9315 9.48653 12.5635 9.80653C12.1955 10.1185 11.9675 10.5385 11.8795 11.0665H15.8875C15.7995 10.4985 15.5755 10.0665 15.2155 9.77053C14.8555 9.47453 14.4355 9.32653 13.9555 9.32653ZM24.9772 8.49854H26.0692L24.2092 14.4985H23.1412L21.7372 10.0585L20.3332 14.4985H19.2652L17.4052 8.49854H18.4972L19.8172 13.0585L21.2332 8.49854H22.2412L23.6572 13.0705L24.9772 8.49854ZM38.1116 6.09853V14.4985H37.0076V7.93453L34.2596 12.5065H34.1156L31.3676 7.94654V14.4985H30.2516V6.09853H31.5116L34.1876 10.5385L36.8516 6.09853H38.1116ZM44.8638 13.7425C44.2478 14.3505 43.4998 14.6545 42.6198 14.6545C41.7398 14.6545 40.9918 14.3505 40.3758 13.7425C39.7678 13.1345 39.4638 12.3865 39.4638 11.4985C39.4638 10.6105 39.7678 9.86253 40.3758 9.25454C40.9918 8.64654 41.7398 8.34254 42.6198 8.34254C43.4998 8.34254 44.2478 8.64654 44.8638 9.25454C45.4798 9.86253 45.7878 10.6105 45.7878 11.4985C45.7878 12.3865 45.4798 13.1345 44.8638 13.7425ZM42.6198 13.6345C43.2198 13.6345 43.7238 13.4305 44.1318 13.0225C44.5398 12.6145 44.7438 12.1065 44.7438 11.4985C44.7438 10.8905 44.5398 10.3825 44.1318 9.97454C43.7238 9.56653 43.2198 9.36253 42.6198 9.36253C42.0278 9.36253 41.5278 9.56653 41.1198 9.97454C40.7118 10.3825 40.5078 10.8905 40.5078 11.4985C40.5078 12.1065 40.7118 12.6145 41.1198 13.0225C41.5278 13.4305 42.0278 13.6345 42.6198 13.6345ZM48.0626 9.50654C48.4066 8.76254 49.0306 8.39054 49.9346 8.39054V9.48254C49.4226 9.45853 48.9826 9.59453 48.6146 9.89054C48.2466 10.1865 48.0626 10.6625 48.0626 11.3185V14.4985H47.0186V8.49854H48.0626V9.50654ZM51.3599 11.9785C51.4639 12.5145 51.7079 12.9305 52.0919 13.2265C52.4839 13.5225 52.9639 13.6705 53.5319 13.6705C54.3239 13.6705 54.8999 13.3785 55.2599 12.7945L56.1479 13.2985C55.5639 14.2025 54.6839 14.6545 53.5079 14.6545C52.5559 14.6545 51.7799 14.3585 51.1799 13.7665C50.5879 13.1665 50.2919 12.4105 50.2919 11.4985C50.2919 10.5945 50.5839 9.84254 51.1679 9.24253C51.7519 8.64253 52.5079 8.34254 53.4359 8.34254C54.3159 8.34254 55.0319 8.65453 55.5839 9.27853C56.1439 9.89453 56.4239 10.6385 56.4239 11.5105C56.4239 11.6625 56.4119 11.8185 56.3879 11.9785H51.3599ZM53.4359 9.32653C52.8759 9.32653 52.4119 9.48653 52.0439 9.80653C51.6759 10.1185 51.4479 10.5385 51.3599 11.0665H55.3679C55.2799 10.4985 55.0559 10.0665 54.6959 9.77053C54.3359 9.47453 53.9159 9.32653 53.4359 9.32653Z"
                      fill="#D50F25"
                    />
                    <path
                      d="M72.9336 13.5295L76.3789 10.0842L72.9336 6.63892L73.9883 5.58423L78.4883 10.0842L73.9883 14.5842L72.9336 13.5295Z"
                      fill="#D50F25"
                    />
                  </svg>
                </ViewMoreLink>
              </GalleryHeader>
              <GalleryGrid>
                {galleryCards.map((card, index) => (
                  <GalleryCard key={index} to="/design-gallery/kitchen-designs/modular-kitchen">
                    <GalleryImage $image={card.image}>
                      <SaveIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                        >
                          <path d="M 7 5 L 7 28 L 8.59375 26.8125 L 16 21.25 L 23.40625 26.8125 L 25 28 L 25 5 Z M 9 7 L 23 7 L 23 24 L 16.59375 19.1875 L 16 18.75 L 15.40625 19.1875 L 9 24 Z" />
                        </svg>
                      </SaveIcon>
                    </GalleryImage>
                    <GalleryCardContent>
                      <GalleryCardTitle className="universal-fs-h4 universal-font-medium">
                        {card.title}
                      </GalleryCardTitle>
                    </GalleryCardContent>
                  </GalleryCard>
                ))}
                <EstimationCard to="/price-calculators/kitchen-price-calculation">
                  <EstimationTop>
                    <EstimationTitle className="universal-fs-h8 universal-font-medium">
                      Get Your Free Estimation
                    </EstimationTitle>
                  </EstimationTop>
                  <EstimationBottom>
                    <EstimationLink className="universal-fs-h3 universal-font-semibold">
                      Calculate your Modular Kitchen Estimation
                      <svg
                        width="18"
                        height="25"
                        viewBox="0 0 13 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.6569 13.4592L4.99994 19.1162L3.58594 17.7022L8.53594 12.7522L3.58594 7.80218L4.99994 6.38818L10.6569 12.0452C10.8444 12.2327 10.9497 12.487 10.9497 12.7522C10.9497 13.0173 10.8444 13.2717 10.6569 13.4592Z"
                          fill="#D50F25"
                        />
                      </svg>
                    </EstimationLink>
                  </EstimationBottom>
                </EstimationCard>
              </GalleryGrid>
            </SectionContainer4>
          </GallerySection>

          {/* fifth section Checklist */}
          <ChecklistSection>
            <ChecklistWrapper>
              <ChecklistHeader>
                <ChecklistTitle className="universal-fs-h10 universal-font-bold">
                  How Do I{" "}
                  <span style={{ color: "var(--universal-green-theme-color)" }}>
                    Choose
                  </span>{" "}
                  a Modular Kitchen Design?
                </ChecklistTitle>
                <ChecklistSubtitle className="universal-fs-h3 universal-font-medium">
                  Follow these essential tips for a well-planned and beautiful
                  modular kitchen.
                </ChecklistSubtitle>
              </ChecklistHeader>

              <ChecklistContainer className="universal-fs-h3 universal-font-medium">
                <ChecklistContent>
                  {checklistItems.map((item, index) => {
                    const isLast = index === checklistItems.length - 1;
                    return (
                      <ChecklistItem key={index}>
                        <CheckIconCell $isLast={isLast}>
                          {/* <div>✓</div> */}
                          <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.6667 19.4152L5.83333 13.5818L7.47833 11.9252L11.6667 16.1135L20.5217 7.2585L22.1667 8.91516M22.1667 1.91516H5.83333C4.53833 1.91516 3.5 2.95349 3.5 4.24849V19.3335C3.5 20.1385 3.90833 20.8502 4.52667 21.2702L14 27.5818L23.4617 21.2702C24.08 20.8502 24.5 20.1385 24.5 19.3335V4.24849C24.5 3.62966 24.2542 3.03616 23.8166 2.59858C23.379 2.16099 22.7855 1.91516 22.1667 1.91516Z"
                              fill="#559944"
                            />
                          </svg>
                        </CheckIconCell>
                        <ChecklistTextCell $isLast={isLast}>
                          {item}
                        </ChecklistTextCell>
                      </ChecklistItem>
                    );
                  })}
                </ChecklistContent>

                <ChecklistImage $image="https://res.cloudinary.com/sevfdaro/image/upload/v1782664260/azure_migrated/guides/kitchen-guide/kitchen-rectangle.webp" />
              </ChecklistContainer>
            </ChecklistWrapper>
          </ChecklistSection>
          {/* //#endregion */}
        </>
      )}

      {activeGuide === "Wardrobe Design Guide" && (
        <>
          {/* //#region --- *Wardrobe Design Guide* - webpage 2 */}

          {/* first section  Wardrobe Design  */}
          <SectionWrapper>
            <ContentBox>
              <Title className="universal-fs-h16 universal-font-extra-bold">
                Design Your Dream Wardrobe
              </Title>
              <Subtitle className="universal-fs-h3 universal-font">
                Explore layouts, finishes, materials & smart storage solutions
                designed for Indian bedrooms.
              </Subtitle>
              <Button onClick={() => setIsConsultationOpen(true)}>
                <ButtonText className="universal-fs-h4 universal-font-semibold">
                  Book a Free Consultation
                </ButtonText>
                <RibbonWrapper>
                  <svg
                    width="51"
                    height="46"
                    viewBox="0 0 51 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <g clipPath="url(#clip0_373_12689)">
                      {" "}
                      <path
                        d="M11.25 37.5628V2.27433C11.25 1.10346 11.6423 0.126617 12.4268 -0.656217C13.2113 -1.43905 14.1882 -1.83131 15.3573 -1.83301H37.6452C38.8144 -1.83301 39.7912 -1.44074 40.5758 -0.656217C41.3603 0.128311 41.7517 1.10516 41.75 2.27433V37.5628L26.5 31.013L11.25 37.5628Z"
                        fill="url(#paint0_linear_373_12689)"
                      />{" "}
                      <path
                        d="M20.85 15.54H18.2V16.89H20.8V18.43H18.2V21H16.6V14H20.85V15.54ZM25.4753 21L24.1553 18.7H23.3953V21H21.7953V14H24.5953C25.262 14 25.8286 14.2333 26.2953 14.7C26.762 15.1667 26.9953 15.7333 26.9953 16.4C26.9953 16.8267 26.8753 17.2233 26.6353 17.59C26.402 17.95 26.092 18.23 25.7053 18.43L27.1953 21H25.4753ZM23.3953 15.5V17.3H24.5953C24.8153 17.3 25.002 17.2133 25.1553 17.04C25.3153 16.8667 25.3953 16.6533 25.3953 16.4C25.3953 16.1467 25.3153 15.9333 25.1553 15.76C25.002 15.5867 24.8153 15.5 24.5953 15.5H23.3953ZM29.5477 19.46H32.3477V21H27.9477V14H32.2977V15.54H29.5477V16.7H32.0477V18.22H29.5477V19.46ZM34.8504 19.46H37.6504V21H33.2504V14H37.6004V15.54H34.8504V16.7H37.3504V18.22H34.8504V19.46Z"
                        fill="#1D1D1D"
                      />{" "}
                    </g>{" "}
                    <defs>
                      {" "}
                      <linearGradient
                        id="paint0_linear_373_12689"
                        x1="26.5"
                        y1="-1.83301"
                        x2="26.5"
                        y2="37.5628"
                        gradientUnits="userSpaceOnUse"
                      >
                        {" "}
                        <stop stopColor="#D4AF37" />{" "}
                        <stop offset="1" stopColor="#FFD700" />{" "}
                      </linearGradient>{" "}
                      <clipPath id="clip0_373_12689">
                        {" "}
                        <rect width="51" height="46" fill="white" />{" "}
                      </clipPath>{" "}
                    </defs>{" "}
                  </svg>
                </RibbonWrapper>
              </Button>
            </ContentBox>
            <HeroImage
              src={"https://res.cloudinary.com/sevfdaro/image/upload/v1782664290/azure_migrated/guides/wardrobe-guide/bedroom-isometric.webp"}
              alt="Wardrobe Design"
            />
          </SectionWrapper>

          {/* second section Wardrobe layout */}
          <LayoutSection>
            <SectionContainer>
              <SectionTitle className="universal-fs-h12 universal-font-bold">
                Wardrobe Layout{" "}
                <span style={{ color: "var(--universal-blue-theme-color)" }}>
                  Types
                </span>
              </SectionTitle>
              <SectionSubtitle className="universal-fs-h3 universal-font-medium">
                Every bedroom is unique. Pick a wardrobe layout that suits your
                space and storage needs.
              </SectionSubtitle>

              <LayoutCardsContainer>
                {WardrobelayoutCards.map((card, index) => (
                  <LayoutCard key={index}>
                    <CardImage $image={card.image} />
                    <CardContent>
                      <CardTitle className="universal-fs-h3 universal-font-medium">
                        {card.title}
                      </CardTitle>
                      <CardDescription className="universal-fs-h14 universal-font-medium">
                        {card.description}
                      </CardDescription>
                      <ReadMoreButton
                        className="universal-fs-h3 universal-font-medium"
                        onClick={() => {
                          setSelectedLayout(card);
                          setIsPopupOpen(true);
                        }}
                      >
                        Read More
                      </ReadMoreButton>
                    </CardContent>
                  </LayoutCard>
                ))}
              </LayoutCardsContainer>

              {/* Wardrobe Popup for layout details */}
              <Modal open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                {selectedLayout && (
                  <PopupContainer>
                    <PopupImageSide>
                      <PopupImage
                        src={selectedLayout.popupImage}
                        alt={selectedLayout.title}
                      />
                    </PopupImageSide>
                    <PopupContent>
                      <Header>
                        <CloseBtn
                          aria-label="Close"
                          onClick={() => setIsPopupOpen(false)}
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.9992 20.1L10.6492 27.45C10.3742 27.725 10.0242 27.8625 9.59922 27.8625C9.17422 27.8625 8.82422 27.725 8.54922 27.45C8.27422 27.175 8.13672 26.825 8.13672 26.4C8.13672 25.975 8.27422 25.625 8.54922 25.35L15.8992 18L8.54922 10.65C8.27422 10.375 8.13672 10.025 8.13672 9.60001C8.13672 9.17501 8.27422 8.82501 8.54922 8.55001C8.82422 8.27501 9.17422 8.13751 9.59922 8.13751C10.0242 8.13751 10.3742 8.27501 10.6492 8.55001L17.9992 15.9L25.3492 8.55001C25.6242 8.27501 25.9742 8.13751 26.3992 8.13751C26.8242 8.13751 27.1742 8.27501 27.4492 8.55001C27.7242 8.82501 27.8617 9.17501 27.8617 9.60001C27.8617 10.025 27.7242 10.375 27.4492 10.65L20.0992 18L27.4492 25.35C27.7242 25.625 27.8617 25.975 27.8617 26.4C27.8617 26.825 27.7242 27.175 27.4492 27.45C27.1742 27.725 26.8242 27.8625 26.3992 27.8625C25.9742 27.8625 25.6242 27.725 25.3492 27.45L17.9992 20.1Z"
                              fill="#999999"
                            />
                          </svg>
                        </CloseBtn>
                      </Header>
                      <PopupTitle>{selectedLayout.details.title}</PopupTitle>
                      <PopupDesc>
                        {selectedLayout.details.description
                          .split(".")
                          .filter((sentence) => sentence.trim() !== "")
                          .map((sentence, index) => (
                            <PopupDesc key={index}>
                              {sentence.trim()}.
                            </PopupDesc>
                          ))}
                      </PopupDesc>
                      <CtaRow>
                        <PopupButton onClick={() => navigate("/price-calculators/home-interior-calculation")}>
                          <PopupButtonText className="universal-fs-h3 universal-font-semibold">
                            Calculate your Price Estimation
                          </PopupButtonText>
                          <RibbonWrapper>
                            <svg
                              width="51"
                              height="46"
                              viewBox="0 0 51 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <g clipPath="url(#clip0_373_12689)">
                                {" "}
                                <path
                                  d="M11.25 37.5628V2.27433C11.25 1.10346 11.6423 0.126617 12.4268 -0.656217C13.2113 -1.43905 14.1882 -1.83131 15.3573 -1.83301H37.6452C38.8144 -1.83301 39.7912 -1.44074 40.5758 -0.656217C41.3603 0.128311 41.7517 1.10516 41.75 2.27433V37.5628L26.5 31.013L11.25 37.5628Z"
                                  fill="url(#paint0_linear_373_12689)"
                                />{" "}
                                <path
                                  d="M20.85 15.54H18.2V16.89H20.8V18.43H18.2V21H16.6V14H20.85V15.54ZM25.4753 21L24.1553 18.7H23.3953V21H21.7953V14H24.5953C25.262 14 25.8286 14.2333 26.2953 14.7C26.762 15.1667 26.9953 15.7333 26.9953 16.4C26.9953 16.8267 26.8753 17.2233 26.6353 17.59C26.402 17.95 26.092 18.23 25.7053 18.43L27.1953 21H25.4753ZM23.3953 15.5V17.3H24.5953C24.8153 17.3 25.002 17.2133 25.1553 17.04C25.3153 16.8667 25.3953 16.6533 25.3953 16.4C25.3953 16.1467 25.3153 15.9333 25.1553 15.76C25.002 15.5867 24.8153 15.5 24.5953 15.5H23.3953ZM29.5477 19.46H32.3477V21H27.9477V14H32.2977V15.54H29.5477V16.7H32.0477V18.22H29.5477V19.46ZM34.8504 19.46H37.6504V21H33.2504V14H37.6004V15.54H34.8504V16.7H37.3504V18.22H34.8504V19.46Z"
                                  fill="#1D1D1D"
                                />{" "}
                              </g>{" "}
                              <defs>
                                {" "}
                                <linearGradient
                                  id="paint0_linear_373_12689"
                                  x1="26.5"
                                  y1="-1.83301"
                                  x2="26.5"
                                  y2="37.5628"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  {" "}
                                  <stop stopColor="#D4AF37" />{" "}
                                  <stop offset="1" stopColor="#FFD700" />{" "}
                                </linearGradient>{" "}
                                <clipPath id="clip0_373_12689">
                                  {" "}
                                  <rect
                                    width="51"
                                    height="46"
                                    fill="white"
                                  />{" "}
                                </clipPath>{" "}
                              </defs>{" "}
                            </svg>
                          </RibbonWrapper>
                        </PopupButton>
                        <SecondaryCta aria-label="Share">
                          <svg
                            width="55"
                            height="56"
                            viewBox="0 0 55 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.5"
                              y="0.545471"
                              width="54"
                              height="54"
                              rx="9.5"
                              stroke="#999999"
                              strokeOpacity="0.4"
                            />
                            <path
                              d="M35.7225 27.5458L30.75 22.5733V25.2383L29.8183 25.3791C25.1492 26.04 21.9858 28.4883 20.1767 32.2366C22.69 30.46 25.81 29.6041 29.6667 29.6041H30.75V32.5183M28.5833 30.7091C23.7408 30.9366 20.2742 32.6808 17.75 36.2125C18.8333 30.7958 22.0833 25.3791 29.6667 24.2958V19.9625L37.25 27.5458L29.6667 35.1291V30.6875C29.3092 30.6875 28.9517 30.6983 28.5833 30.7091Z"
                              fill="#999999"
                            />
                          </svg>
                        </SecondaryCta>
                      </CtaRow>

                      <BenefitTitle>
                        <svg
                          width="20"
                          height="21"
                          viewBox="0 0 28 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1033_14605)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M27.8544 3.09848C27.7915 2.90978 27.6733 2.74435 27.5152 2.62368C27.3571 2.503 27.1663 2.43267 26.9677 2.42181C26.57 2.45162 26.197 2.62591 25.9189 2.91181C24.4887 4.35958 23.1756 5.91847 21.9919 7.57381C19.0776 11.4436 15.5577 16.5956 13.9851 18.9722L13.4134 19.8472C11.8243 19.27 10.1738 18.8785 8.49473 18.6805C7.72015 18.5505 6.9273 18.5783 6.16373 18.7621C6.06102 18.8032 5.96774 18.8647 5.88952 18.9429C5.81131 19.0212 5.7498 19.1144 5.70873 19.2171C5.67043 19.4472 5.68408 19.6829 5.74868 19.9069C5.81327 20.131 5.92718 20.3378 6.08206 20.5121C6.88074 21.4898 7.79242 22.3694 8.79806 23.1325C11.0124 24.9152 13.8101 26.629 14.8122 26.7573C14.8908 26.7669 14.9705 26.7527 15.041 26.7165C15.1114 26.6803 15.1694 26.6238 15.2073 26.5543C15.2453 26.4848 15.2615 26.4055 15.2539 26.3267C15.2463 26.2478 15.2151 26.1731 15.1646 26.1122C15.0972 26.0293 15 25.9761 14.8939 25.964C13.1829 25.3015 11.6041 24.3387 10.2319 23.1208C9.03469 22.2306 7.94371 21.2057 6.98039 20.0665C6.89086 19.9474 6.80903 19.8227 6.73539 19.6931C6.82598 19.6623 6.92002 19.6427 7.01539 19.6348C8.19723 19.6803 9.36972 19.86 10.5119 20.1715C11.4802 20.3932 12.4252 20.7082 13.3317 21.1165C13.4305 21.1756 13.5451 21.2028 13.6599 21.1945C13.7747 21.1861 13.8842 21.1426 13.9734 21.0698C14.0736 21.0111 14.1516 20.9209 14.1951 20.8131V20.7548C14.3234 20.5565 14.5801 20.1598 14.9639 19.5882C16.5599 17.2583 20.1147 12.1763 23.0291 8.34148C24.3346 6.61715 25.5001 5.13665 26.3156 4.28615C26.4206 4.17648 26.5372 4.07926 26.6656 3.99448C26.6072 4.32115 26.4672 4.75281 26.3622 5.16115C25.3673 8.29426 24.1118 11.3386 22.6091 14.2623C20.8393 17.9981 18.802 21.6012 16.5132 25.0435C16.4856 25.0803 16.4656 25.1221 16.4542 25.1666C16.4428 25.2111 16.4402 25.2575 16.4467 25.303C16.4532 25.3485 16.4686 25.3923 16.4921 25.4318C16.5155 25.4714 16.5465 25.5059 16.5832 25.5335C16.6594 25.5898 16.7546 25.6141 16.8484 25.601C16.9422 25.5879 17.0271 25.5385 17.0849 25.4635C20.9028 19.9579 24.1556 14.0812 26.7939 7.92265C27.3002 6.80031 27.6922 5.62898 27.9594 4.42615C28.0411 3.98281 28.0049 3.52315 27.8544 3.09731"
                              fill="#559944"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.6046 16.4906C12.0722 14.4735 14.0999 11.8286 16.0004 9.38097L18.3314 6.34997C19.4969 4.91731 20.3824 3.70514 21.0346 3.00514C21.1512 2.88847 21.2562 2.74847 21.3496 2.64347C21.3612 2.70258 21.3612 2.76092 21.3496 2.81847C21.3202 3.32429 21.2341 3.82521 21.0929 4.31181C20.9646 5.03397 20.6729 5.91947 20.3241 6.85164C20.2957 6.89583 20.2776 6.94583 20.2712 6.99796C20.2647 7.05008 20.2701 7.10298 20.2869 7.15274C20.3037 7.20251 20.3315 7.24785 20.3682 7.28542C20.4049 7.32298 20.4495 7.35181 20.4989 7.36976C20.5483 7.3877 20.601 7.39432 20.6533 7.3891C20.7055 7.38388 20.756 7.36697 20.8008 7.33962C20.8456 7.31227 20.8837 7.27518 20.9123 7.2311C20.9408 7.18701 20.9591 7.13707 20.9657 7.08497C21.6191 5.75264 22.1021 4.34331 22.3984 2.88847C22.4917 1.93297 22.0834 1.47914 21.5479 1.42081C21.2177 1.42709 20.9016 1.55601 20.6612 1.78247C19.4126 2.91571 18.2735 4.16412 17.2592 5.51114C16.5242 6.44447 15.7321 7.50381 14.9282 8.59931C13.0977 11.1403 11.2801 13.938 9.91622 16.0356C9.87532 16.1233 9.86689 16.2227 9.89243 16.316C9.91798 16.4094 9.97584 16.4906 10.0557 16.5452C10.1356 16.5999 10.2322 16.6244 10.3285 16.6144C10.4247 16.6044 10.5143 16.5605 10.5812 16.4906H10.6046ZM7.74855 25.733C7.09522 25.6046 5.88422 24.2163 4.64872 22.632C4.14705 22.002 3.65705 21.3148 3.19155 20.6743C2.72489 20.0326 2.21155 19.2638 1.85105 18.6583C1.60231 18.2896 1.38754 17.8991 1.20939 17.4916V17.4333C2.26603 17.4153 3.31935 17.5569 4.33372 17.8533C4.41046 17.8815 4.49458 17.8822 4.57176 17.8553C4.64895 17.8284 4.71444 17.7756 4.75708 17.7058C4.79972 17.6361 4.81687 17.5538 4.80562 17.4728C4.79438 17.3918 4.75542 17.3173 4.69539 17.2618C4.66165 17.2302 4.622 17.2056 4.57872 17.1895C3.54594 16.7747 2.45865 16.5115 1.35055 16.4078C1.01067 16.3574 0.66348 16.4018 0.347221 16.5361C0.223023 16.6036 0.124594 16.7103 0.0672208 16.8395C-0.00825825 17.155 -0.0203118 17.4824 0.0317598 17.8027C0.0838313 18.1229 0.198991 18.4296 0.370554 18.705C0.872221 19.7316 1.47772 20.7035 2.17772 21.6065C4.01872 24.0425 6.58305 26.4435 7.60855 26.5951C7.6599 26.6053 7.71274 26.6052 7.76404 26.5948C7.81534 26.5845 7.86409 26.5641 7.90747 26.5348C7.95084 26.5055 7.988 26.4679 8.01679 26.4242C8.04558 26.3805 8.06544 26.3316 8.07522 26.2801C8.09926 26.2229 8.10953 26.1608 8.1052 26.0989C8.10086 26.0369 8.08205 25.9769 8.05027 25.9235C8.0185 25.8702 7.97464 25.8251 7.92224 25.7918C7.86983 25.7585 7.81034 25.7391 7.74855 25.733Z"
                              fill="#559944"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1033_14605">
                              <rect
                                width="28"
                                height="28"
                                fill="white"
                                transform="translate(0 0.0908203)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Benefits
                      </BenefitTitle>
                      {selectedLayout.details.benefits.map((b, i) => (
                        <BenefitItem key={i}>
                          <BenefitHeader>
                            <BenefitDot />
                            {b.title}
                          </BenefitHeader>
                          <BenefitSub>{b.sub}</BenefitSub>
                          {i !== selectedLayout.details.benefits.length - 1 && (
                            <BenefitRule />
                          )}
                        </BenefitItem>
                      ))}
                      <DrawbacksTitle>
                        <svg
                          width="28"
                          height="29"
                          viewBox="0 0 28 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3007 15.0113L15.7507 12.5613L18.2007 15.0113L19.0033 14.2075L16.5533 11.7575L19.0033 9.30749L18.2007 8.50366L15.7507 10.9537L13.3007 8.50366L12.498 9.30749L14.948 11.7575L12.498 14.2075L13.3007 15.0113ZM9.46932 19.9242C8.93187 19.9242 8.48348 19.7445 8.12415 19.3852C7.76482 19.0258 7.58476 18.5774 7.58398 18.04V5.47499C7.58398 4.93832 7.76404 4.48993 8.12415 4.12982C8.48426 3.76971 8.93265 3.59005 9.46932 3.59082H22.0332C22.5698 3.59082 23.0182 3.77049 23.3783 4.12982C23.7384 4.48916 23.9181 4.93754 23.9173 5.47499V18.04C23.9173 18.5767 23.7377 19.0247 23.3783 19.384C23.019 19.7433 22.5702 19.9234 22.032 19.9242H9.46932ZM5.96932 23.4242C5.43187 23.4242 4.98348 23.2445 4.62415 22.8852C4.26482 22.5258 4.08476 22.0774 4.08398 21.54V7.80832H5.25065V21.54C5.25065 21.7189 5.32532 21.8834 5.47465 22.0335C5.62398 22.1836 5.78848 22.2583 5.96815 22.2575H19.6998V23.4242H5.96932Z"
                            fill="#D50F25"
                          />
                        </svg>
                        Drawbacks
                      </DrawbacksTitle>
                      {selectedLayout.details.drawbacks?.map((d, i) => (
                        <BenefitItem key={i}>
                          <BenefitHeader>
                            <DrawbackDot /> {d.title}
                          </BenefitHeader>
                          <BenefitSub>{d.sub}</BenefitSub>
                          {i !==
                            selectedLayout.details.drawbacks.length - 1 && (
                            <BenefitRule />
                          )}
                        </BenefitItem>
                      ))}
                    </PopupContent>
                  </PopupContainer>
                )}
              </Modal>
            </SectionContainer>
          </LayoutSection>

          {/* third section Wardrobe and carpenter */}
          <ComparisonSection3>
            <SectionContainer3>
              <ComparisonTitle3 className="universal-fs-h9 universal-font-bold">
                Modular Wardrobe <span style={{ color: "#549943" }}>vs</span>{" "}
                Carpenter-Made Wardrobe
              </ComparisonTitle3>
              <div style={{ position: "relative" }}>
                <ComparisonTable3>
                  <thead>
                    <tr>
                      <TableHeader3 className="universal-fs-h5 universal-font-semibold">
                        Features
                      </TableHeader3>
                      <TableHeader3>
                        <IconContainer3 className="universal-fs-h5 universal-font-semibold">
                          <ImageIcon3
                            src={
                              "/assets/guides/MW-icon.svg"
                            }
                            alt="Carpenter Icon"
                          />
                          Modular Wardrobe
                        </IconContainer3>
                      </TableHeader3>
                      <TableHeader3>
                        <IconContainer3 className="universal-fs-h5 universal-font-semibold">
                          <ImageIcon3
                            src={
                              "/assets/guides/CMK-icon.svg"
                            }
                            alt="Carpenter Icon"
                          />
                          Carpenter Made Wardrobe
                        </IconContainer3>
                      </TableHeader3>
                    </tr>
                  </thead>
                  <tbody className="universal-fs-h4 universal-font-medium">
                    <TableRow3>
                      <FeatureCell3>Build Process</FeatureCell3>
                      <TableCell3>
                        Factory-made with precision machine finishes
                      </TableCell3>
                      <TableCell3>
                        Hand-built on-site by local carpenters
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Installation Time</FeatureCell3>
                      <TableCell3>Fast installation within days</TableCell3>
                      <TableCell3>
                        Time-consuming and depends on site conditions
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Design Consistency</FeatureCell3>
                      <TableCell3>
                        High consistency in finish and quality
                      </TableCell3>
                      <TableCell3>
                        May vary based on carpenter’s skills
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Customization</FeatureCell3>
                      <TableCell3>
                        Modular flexibility with standard units
                      </TableCell3>
                      <TableCell3>
                        Fully customized based on your preferences
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Finish Quality</FeatureCell3>
                      <TableCell3>
                        Seamless laminate, glass or acrylic finishes
                      </TableCell3>
                      <TableCell3>
                        Typically hand-polished or laminate
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Durability</FeatureCell3>
                      <TableCell3>
                        Long-lasting with tested fittings and boards
                      </TableCell3>
                      <TableCell3>
                        Depends on material choice and craftsmanship
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>Cost</FeatureCell3>
                      <TableCell3>
                        Slightly higher but includes brand assurance
                      </TableCell3>
                      <TableCell3>
                        May be cost-effective but varies in finish
                      </TableCell3>
                    </TableRow3>
                    <TableRow3>
                      <FeatureCell3>After-Sales Support</FeatureCell3>
                      <TableCell3>
                        Warranty, AMC & service support included
                      </TableCell3>
                      <TableCell3>
                        Rarely includes structured support
                      </TableCell3>
                    </TableRow3>
                  </tbody>
                </ComparisonTable3>
                {/* Vertical dividers (full column height) */}
                <VerticalDivider style={{ left: "20%" }} />{" "}
                {/* between Features + Wardrobe */}
                <VerticalDivider style={{ left: "60%" }} />{" "}
                {/* between Wardrobe + Carpenter */}
              </div>
            </SectionContainer3>
          </ComparisonSection3>

          {/* fourth section Wardrobe Gallery */}
          <GallerySection>
            <SectionContainer4>
              <GalleryHeader>
                <HeaderTextBlock>
                  <GalleryTitle className="universal-fs-h10 universal-font-bold">
                    Explore Our{" "}
                    <span
                      style={{ color: "var(--universal-blue-theme-color)" }}
                    >
                      Modular Wardrobe
                    </span>{" "}
                    Gallery
                  </GalleryTitle>
                  <SectionSubtitle4 className="universal-fs-h4 universal-font-medium">
                    See beautifully designed wardrobes that combine aesthetics
                    with intelligent organization.
                  </SectionSubtitle4>
                </HeaderTextBlock>

                <ViewMoreLink
                  className="universal-fs-h4 universal-font-medium"
                  href="/design-gallery/rooms-and-spaces/wardrobe"
                >
                  <svg
                    width="85"
                    height="21"
                    viewBox="0 0 85 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.596 14.4985L0.596 6.09853H1.796L4.232 13.1065L6.656 6.09853H7.868L4.856 14.4985H3.596ZM9.03875 7.40653C8.83875 7.40653 8.67075 7.33853 8.53475 7.20253C8.39875 7.06653 8.33075 6.90253 8.33075 6.71053C8.33075 6.51853 8.39875 6.35453 8.53475 6.21853C8.67075 6.07453 8.83875 6.00254 9.03875 6.00254C9.23075 6.00254 9.39475 6.07453 9.53075 6.21853C9.66675 6.35453 9.73475 6.51853 9.73475 6.71053C9.73475 6.90253 9.66675 7.06653 9.53075 7.20253C9.39475 7.33853 9.23075 7.40653 9.03875 7.40653ZM8.51075 14.4985V8.49854H9.55475V14.4985H8.51075ZM11.8795 11.9785C11.9835 12.5145 12.2275 12.9305 12.6115 13.2265C13.0035 13.5225 13.4835 13.6705 14.0515 13.6705C14.8435 13.6705 15.4195 13.3785 15.7795 12.7945L16.6675 13.2985C16.0835 14.2025 15.2035 14.6545 14.0275 14.6545C13.0755 14.6545 12.2995 14.3585 11.6995 13.7665C11.1075 13.1665 10.8115 12.4105 10.8115 11.4985C10.8115 10.5945 11.1035 9.84254 11.6875 9.24253C12.2715 8.64253 13.0275 8.34254 13.9555 8.34254C14.8355 8.34254 15.5515 8.65453 16.1035 9.27853C16.6635 9.89453 16.9435 10.6385 16.9435 11.5105C16.9435 11.6625 16.9315 11.8185 16.9075 11.9785H11.8795ZM13.9555 9.32653C13.3955 9.32653 12.9315 9.48653 12.5635 9.80653C12.1955 10.1185 11.9675 10.5385 11.8795 11.0665H15.8875C15.7995 10.4985 15.5755 10.0665 15.2155 9.77053C14.8555 9.47453 14.4355 9.32653 13.9555 9.32653ZM24.9772 8.49854H26.0692L24.2092 14.4985H23.1412L21.7372 10.0585L20.3332 14.4985H19.2652L17.4052 8.49854H18.4972L19.8172 13.0585L21.2332 8.49854H22.2412L23.6572 13.0705L24.9772 8.49854ZM38.1116 6.09853V14.4985H37.0076V7.93453L34.2596 12.5065H34.1156L31.3676 7.94654V14.4985H30.2516V6.09853H31.5116L34.1876 10.5385L36.8516 6.09853H38.1116ZM44.8638 13.7425C44.2478 14.3505 43.4998 14.6545 42.6198 14.6545C41.7398 14.6545 40.9918 14.3505 40.3758 13.7425C39.7678 13.1345 39.4638 12.3865 39.4638 11.4985C39.4638 10.6105 39.7678 9.86253 40.3758 9.25454C40.9918 8.64654 41.7398 8.34254 42.6198 8.34254C43.4998 8.34254 44.2478 8.64654 44.8638 9.25454C45.4798 9.86253 45.7878 10.6105 45.7878 11.4985C45.7878 12.3865 45.4798 13.1345 44.8638 13.7425ZM42.6198 13.6345C43.2198 13.6345 43.7238 13.4305 44.1318 13.0225C44.5398 12.6145 44.7438 12.1065 44.7438 11.4985C44.7438 10.8905 44.5398 10.3825 44.1318 9.97454C43.7238 9.56653 43.2198 9.36253 42.6198 9.36253C42.0278 9.36253 41.5278 9.56653 41.1198 9.97454C40.7118 10.3825 40.5078 10.8905 40.5078 11.4985C40.5078 12.1065 40.7118 12.6145 41.1198 13.0225C41.5278 13.4305 42.0278 13.6345 42.6198 13.6345ZM48.0626 9.50654C48.4066 8.76254 49.0306 8.39054 49.9346 8.39054V9.48254C49.4226 9.45853 48.9826 9.59453 48.6146 9.89054C48.2466 10.1865 48.0626 10.6625 48.0626 11.3185V14.4985H47.0186V8.49854H48.0626V9.50654ZM51.3599 11.9785C51.4639 12.5145 51.7079 12.9305 52.0919 13.2265C52.4839 13.5225 52.9639 13.6705 53.5319 13.6705C54.3239 13.6705 54.8999 13.3785 55.2599 12.7945L56.1479 13.2985C55.5639 14.2025 54.6839 14.6545 53.5079 14.6545C52.5559 14.6545 51.7799 14.3585 51.1799 13.7665C50.5879 13.1665 50.2919 12.4105 50.2919 11.4985C50.2919 10.5945 50.5839 9.84254 51.1679 9.24253C51.7519 8.64253 52.5079 8.34254 53.4359 8.34254C54.3159 8.34254 55.0319 8.65453 55.5839 9.27853C56.1439 9.89453 56.4239 10.6385 56.4239 11.5105C56.4239 11.6625 56.4119 11.8185 56.3879 11.9785H51.3599ZM53.4359 9.32653C52.8759 9.32653 52.4119 9.48653 52.0439 9.80653C51.6759 10.1185 51.4479 10.5385 51.3599 11.0665H55.3679C55.2799 10.4985 55.0559 10.0665 54.6959 9.77053C54.3359 9.47453 53.9159 9.32653 53.4359 9.32653Z"
                      fill="#D50F25"
                    />
                    <path
                      d="M72.9336 13.5295L76.3789 10.0842L72.9336 6.63892L73.9883 5.58423L78.4883 10.0842L73.9883 14.5842L72.9336 13.5295Z"
                      fill="#D50F25"
                    />
                  </svg>
                </ViewMoreLink>
              </GalleryHeader>
              <GalleryGrid>
                {WardrobegalleryCards.map((card, index) => (
                  <GalleryCard key={index} to="/design-gallery/rooms-and-spaces/wardrobe">
                    <GalleryImage $image={card.image}>
                      <SaveIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                        >
                          <path d="M 7 5 L 7 28 L 8.59375 26.8125 L 16 21.25 L 23.40625 26.8125 L 25 28 L 25 5 Z M 9 7 L 23 7 L 23 24 L 16.59375 19.1875 L 16 18.75 L 15.40625 19.1875 L 9 24 Z" />
                        </svg>
                      </SaveIcon>
                    </GalleryImage>
                    <GalleryCardContent>
                      <GalleryCardTitle className="universal-fs-h4 universal-font-medium">
                        {card.title}
                      </GalleryCardTitle>
                    </GalleryCardContent>
                  </GalleryCard>
                ))}
                <EstimationCard to="/price-calculators/home-interior-calculation">
                  <EstimationTop>
                    <EstimationTitle className="universal-fs-h8 universal-font-medium">
                      Get Your Free Estimation
                    </EstimationTitle>
                  </EstimationTop>
                  <EstimationBottom>
                    <EstimationLink className="universal-fs-h3 universal-font-semibold">
                      Calculate your Modular Wardrobe Estimation
                      <svg
                        width="18"
                        height="25"
                        viewBox="0 0 13 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.6569 13.4592L4.99994 19.1162L3.58594 17.7022L8.53594 12.7522L3.58594 7.80218L4.99994 6.38818L10.6569 12.0452C10.8444 12.2327 10.9497 12.487 10.9497 12.7522C10.9497 13.0173 10.8444 13.2717 10.6569 13.4592Z"
                          fill="#D50F25"
                        />
                      </svg>
                    </EstimationLink>
                  </EstimationBottom>
                </EstimationCard>
              </GalleryGrid>
            </SectionContainer4>
          </GallerySection>

          {/* fifth section Wardrobe Checklist */}
          <ChecklistSection>
            <ChecklistWrapper>
              <ChecklistHeader>
                <ChecklistTitle className="universal-fs-h10 universal-font-bold">
                  How Do I{" "}
                  <span style={{ color: "var(--universal-green-theme-color)" }}>
                    Choose
                  </span>{" "}
                  a Modular Wardrobe Design?
                </ChecklistTitle>
                <ChecklistSubtitle className="universal-fs-h3 universal-font-medium">
                  Follow these essential tips for a well-planned and functional
                  wardrobe.
                </ChecklistSubtitle>
              </ChecklistHeader>

              <ChecklistContainer className="universal-fs-h3 universal-font-medium">
                <ChecklistContent>
                  {WardrobechecklistItems.map((item, index) => {
                    const isLast = index === WardrobechecklistItems.length - 1;
                    return (
                      <ChecklistItem key={index}>
                        <CheckIconCell $isLast={isLast}>
                          {/* <div>✓</div> */}
                          <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.6667 19.4152L5.83333 13.5818L7.47833 11.9252L11.6667 16.1135L20.5217 7.2585L22.1667 8.91516M22.1667 1.91516H5.83333C4.53833 1.91516 3.5 2.95349 3.5 4.24849V19.3335C3.5 20.1385 3.90833 20.8502 4.52667 21.2702L14 27.5818L23.4617 21.2702C24.08 20.8502 24.5 20.1385 24.5 19.3335V4.24849C24.5 3.62966 24.2542 3.03616 23.8166 2.59858C23.379 2.16099 22.7855 1.91516 22.1667 1.91516Z"
                              fill="#559944"
                            />
                          </svg>
                        </CheckIconCell>
                        <ChecklistTextCell $isLast={isLast}>
                          {item}
                        </ChecklistTextCell>
                      </ChecklistItem>
                    );
                  })}
                </ChecklistContent>

                <ChecklistImage $image="https://res.cloudinary.com/sevfdaro/image/upload/v1782664292/azure_migrated/guides/wardrobe-guide/wardrobe-rectangle.webp" />
              </ChecklistContainer>
            </ChecklistWrapper>
          </ChecklistSection>

          {/* //#endregion */}
        </>
      )}

      <GradientBackground>
        <ConsultationFormContent />
      </GradientBackground>

      <Modal open={isConsultationOpen} onClose={() => setIsConsultationOpen(false)}>
        <CloseButton onClick={() => setIsConsultationOpen(false)} className="universal-fs-h8 universal-font">&times;</CloseButton>
        <ConsultationFormContent onSuccess={() => setIsConsultationOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default GuidesSections;


