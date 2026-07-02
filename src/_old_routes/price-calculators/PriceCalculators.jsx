"use client";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from '@/utils/react-router-dom';
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/button/js/Button.jsx";
import Modal from "../../components/modal/js/Modal.jsx";
import ConsultationFormContent from "@/_old_routes/home/ConsultationFormContent.jsx";
import YouTubeReviews from "../home/sections/YouTubeReviews";
import Services from "./Services";
import Footer from "../../components/layout/Footer";

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
  font-size: var(--universal-fs-h8);
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
    font-size: var(--universal-fs-h7);
  }

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    font-size: var(--universal-fs-h6);
  }
`;

// ------------------ Styled Components ------------------ //
const KitchenCalculatorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

// Wrapper to allow embedded sections (like YouTubeReviews) to use full width
const ReviewsWrapper = styled.div`
  /* Expand beyond page padding and include YouTubeReviews' 24px side paddings */
  width: calc(100% + 4rem + 48px);
  margin-left: calc(-2rem - 24px);
  margin-right: calc(-2rem - 24px);
  padding: 0;
  overflow: visible;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

// CalculatorHeader unused – removed

const LayoutSelectionSection = styled.section`
  margin-bottom: 4rem;
  margin-left: -2.5rem;
  padding: 1rem 1rem 0.5rem -5rem;
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

const LayoutImage = styled.div`
  position: relative;
  height: 180px;
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

const CheckboxCircle = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.selected ? "#d50f25" : "white")};
  border: 2px solid ${(props) => (props.selected ? "#d50f25" : "#333")};
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LayoutContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LayoutTitle = styled.h3`
  margin-top: -1rem;
  font-size: var(--universal-fs-h4);
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const LayoutDescription = styled.p`
  color: #718096;
  font-size: var(--universal-fs-h14);
  text-align: center;
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h3);
  }
`;

const DimensionsSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h3`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: var(--universal-fs-h14);
  color: #888888;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap; /* keep on a single line */
  overflow: visible; /* don't cut off */
  text-overflow: unset;
`;

const DimensionCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const DimensionCard = styled.div`
  background: #ffffff;
  padding: 1.5rem;
`;

const DimensionHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const DimensionTitle = styled.h3`
  font-size: var(--universal-fs-h8);
  color: #333;
  margin-bottom: 1rem;
`;

const BlueprintContainer = styled.div`
  background: #ffffff;
  padding: 1rem;
  margin-bottom: 0.5rem;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlueprintPlaceholder = styled.div`
  width: 100%;
  height: 120px;
  background: #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: var(--universal-fs-h3);
`;

const DimensionDescription = styled.p`
  color: #888888;
  font-size: var(--universal-fs-h3);
  line-height: 1.6;
  text-align: center;
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
  background-color: #d50f25;
  color: #fff;
  font-family: var(--universal-font-semibold);
  font-size: var(--universal-fs-h4);
  padding: 8px 16px; /* slightly smaller */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 112px; /* shorter button */
  box-shadow: 0 6px 18px rgba(213, 15, 37, 0.25);

  &:hover {
    background-color: #c10e21;
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(213, 15, 37, 0.35);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 16px rgba(213, 15, 37, 0.28);
  }

  &:disabled {
    background: #f79aa6;
    box-shadow: none;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h3);
    padding: 8px 16px;
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

const BackButton1 = styled.button`
  background-color: #fff;
  color: #d50f25;
  font-family: var(--universal-font-semibold);
  font-size: var(--universal-fs-h4);
  padding: 8px 16px; /* slightly smaller */
  border: 2px solid #d50f25;
  border-radius: 10px;
  cursor: pointer;
  min-width: 112px; /* shorter button */
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #fff5f6;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h3);
    padding: 8px 16px;
  }
`;

const ContinueButton1 = styled.button`
  background-color: #d50f25;
  color: #fff;
  font-family: var(--universal-font-semibold);
  font-size: var(--universal-fs-h4);
  padding: 0.5rem 1rem;
  width: 1px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 120px;
  margin-right: 100px;

  &:hover {
    background-color: #b71c1c;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h3);
    padding: 10px 22px;
  }
`;
// Additional styled components for KitchenSizeStep
const SizeStep = styled.section`
  margin-bottom: 1rem;
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr 280px;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
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

const SizeMiddle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  margin-top: 2rem;
  transform: translateX(20px);
`;

const SizeFieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 520px;
  margin-left: 50px;
  margin-top: 20px; /* 👈 move it down */
`;

const DimLabel = styled.span`
  font-size: 0.95rem;
  color: #333;
  background: white;
  border: 1px solid red;
  border-radius: 6px;
  padding: 6px 10px;
  min-width: 28px;
  text-align: center;
`;
const DimLabel1 = styled.span`
  font-size: 0.95rem;
  color: #333;
  background: white;
  border: 1px solid green;
  border-radius: 6px;
  padding: 6px 10px;
  min-width: 28px;
  text-align: center;
`;

const SizeFieldGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
`;

const DimensionSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #d50f25;
  }
`;

const SizeRight = styled.aside`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const BlueprintCaption = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
`;

const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
`;

const LegendDot = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
`;

// Checklist styles
const ChecklistSection = styled.section`
  padding: 2rem;
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

const ChecklistSubtitle = styled.p`
  line-height: 1.6;
  text-align: center;
  font-size: var(--universal-fs-h4);
  color: #666;
  margin: 0;
  margin-bottom: -1rem;
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

const ChecklistContent = styled.ul`
  display: grid;
  grid-template-columns: auto 1fr; // icon column auto-sized
  border-right: 1px solid #878787;
`;

const ChecklistItem = styled.li`
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
    font-family: var(--universal-font-bold);
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
  font-size: var(--universal-fs-h4);
  color: #212121;

  ${({ $isLast }) => $isLast && `border-bottom: none;`}
`;
const ChecklistImage = styled.div`
  background: ${(props) => `url(${props.$image}) center/cover no-repeat`};
  height: auto;
  min-height: 100%;
`;

// ------------------ Step 3: Package Table styles ------------------ //
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
  font-size: var(--universal-fs-h3);
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
  font-size: var(--universal-fs-h3);
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
  font-size: var(--universal-fs-h3);
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

// ------------------ Step 3  table styles ------------------ //
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
  font-size: var(--universal-fs-h12);
  line-height: 1.25;
  text-align: center;
  margin: 0 0 8px 0;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: var(--universal-fs-h9);
  }
`;

const TipsSubheading = styled.p`
  text-align: center;
  color: #364152;
  margin: 0 0 28px 0;
  font-size: var(--universal-fs-h3);
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  font-size: var(--universal-fs-h4);
  color: #0f172a;
`;

const TipDesc = styled.p`
  margin: 0;
  color: rgb(39, 43, 49);
  font-size: var(--universal-fs-h3);
  line-height: 1.55;
  text-align: left; // Ensures alignment starts from the left
`;
//#endregion

// ------------------ Price Calculator Selector Landing Page Styles ------------------ //
const LandingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 16px 60px 16px;
  }
`;

const LandingHeader = styled.div`
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    margin-bottom: 35px;
  }
`;

const LandingTitle = styled.h1`
  margin-bottom: 16px;
  color: #1a1a1a;
`;

const LandingSub = styled.p`
  color: #666;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CalculatorCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const LandingCalculatorCard = styled(Link)`
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 40px 30px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(213, 15, 37, 0.12);
    border-color: #d50f25;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const LandingCardIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fdf2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #d50f25;
  transition: all 0.3s ease;

  ${LandingCalculatorCard}:hover & {
    background: #d50f25;
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const LandingCardTitle = styled.h2`
  margin-bottom: 12px;
  color: #1a1a1a;
`;

const LandingCardDesc = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const LandingCardButton = styled.span`
  background: #d50f25;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${LandingCalculatorCard}:hover & {
    background: #111111;
  }
`;

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

// ------------------ Reusable Components ------------------ //
const KitchenLayoutCard = ({ layout, selected, onSelect }) => (
  <KitchenLayoutCardWrapper
    selected={selected}
    onClick={() => onSelect(layout.id)}
  >
    <LayoutImage>
      <LayoutImageImg src={layout.image} alt={layout.name} />
    </LayoutImage>

    <LayoutCheckbox onClick={() => setSelected(!selected)}>
      <OuterBox selected={selected}>
        <InnerBox selected={selected}>
          {selected && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
        {layout.name}
      </CardTitle>
      <CardDescription className="universal-fs-h14 universal-font-medium">
        {layout.description}
      </CardDescription>
    </LayoutContent>
  </KitchenLayoutCardWrapper>
);

const DimensionCardComponent = ({ layout }) => (
  <DimensionCard>
    <DimensionHeader>
      <BlueprintContainer>
        {layout?.dimensions?.image ? (
          <img
            src={layout.dimensions.image}
            alt={`${layout.name} blueprint`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            loading="lazy"
          />
        ) : (
          <BlueprintPlaceholder>📐 Blueprint Diagram</BlueprintPlaceholder>
        )}
      </BlueprintContainer>
      <DimensionTitle className="universal-fs-h5 universal-font-semibold">
        {layout.name}
      </DimensionTitle>
      <DimensionDescription className="universal-fs-h3 universal-font-medium">
        {layout.dimensions.description}
      </DimensionDescription>
    </DimensionHeader>
  </DimensionCard>
);

// ------------------ Step 2 Component ------------------ //
const KitchenSizeStep = ({
  selectedLayout,
  dimensions,
  onDimensionsChange,
  onBack,
  onNext,
}) => {
  const feetOptions = Array.from({ length: 31 }, (_, i) => i); // 0-30 ft
  const inchOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 in

  return (
    <SizeStep>
      <StepHeader>
        <StepNumberLarge className="universal-fs-h13 universal-font-extra-bold">
          02
        </StepNumberLarge>
        <StepTitle className="universal-fs-h12 universal-font-bold">
          Enter Your Kitchen Size{" "}
        </StepTitle>
        <StepTitleDec className="universal-fs-h3 universal-font-semibold">
          Accurate measurements help us generate the most precise cost estimate.
          Don't worry—defaults are available if you're unsure!
        </StepTitleDec>
      </StepHeader>

      <SizeGrid>
        <SizeLeft>
          <LayoutPreviewCard>
            <LayoutImage>
              {selectedLayout?.image && (
                <LayoutImageImg
                  src={selectedLayout.image}
                  alt={selectedLayout?.name}
                />
              )}
            </LayoutImage>
            {/* ✅ Checkbox Overlay */}
            <LayoutCheckbox>
              <OuterBox selected={!!selectedLayout}>
                <InnerBox selected={!!selectedLayout}>
                  {selectedLayout && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
                {selectedLayout?.name}
              </CardTitle>
              <CardDescription className="universal-fs-h14 universal-font-medium">
                {selectedLayout?.description}
              </CardDescription>
            </LayoutContent>
          </LayoutPreviewCard>
        </SizeLeft>

        <SizeMiddle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <SizeFieldRow>
              <DimLabel>A</DimLabel>
              <SizeFieldGroup>
                <DimensionSelect
                  value={dimensions.length.feet}
                  onChange={(e) =>
                    onDimensionsChange("length", "feet", Number(e.target.value))
                  }
                >
                  {feetOptions.map((ft) => (
                    <option key={ft} value={ft}>{`${ft} ft`}</option>
                  ))}
                </DimensionSelect>
                <DimensionSelect
                  value={dimensions.length.inches}
                  onChange={(e) =>
                    onDimensionsChange(
                      "length",
                      "inches",
                      Number(e.target.value)
                    )
                  }
                >
                  {inchOptions.map((inch) => (
                    <option key={inch} value={inch}>{`${inch} in`}</option>
                  ))}
                </DimensionSelect>
              </SizeFieldGroup>
            </SizeFieldRow>

            <SizeFieldRow>
              <DimLabel1>B</DimLabel1>
              <SizeFieldGroup>
                <DimensionSelect
                  value={dimensions.width.feet}
                  onChange={(e) =>
                    onDimensionsChange("width", "feet", Number(e.target.value))
                  }
                >
                  {feetOptions.map((ft) => (
                    <option key={ft} value={ft}>{`${ft} ft`}</option>
                  ))}
                </DimensionSelect>
                <DimensionSelect
                  value={dimensions.width.inches}
                  onChange={(e) =>
                    onDimensionsChange(
                      "width",
                      "inches",
                      Number(e.target.value)
                    )
                  }
                >
                  {inchOptions.map((inch) => (
                    <option key={inch} value={inch}>{`${inch} in`}</option>
                  ))}
                </DimensionSelect>
              </SizeFieldGroup>
            </SizeFieldRow>
          </div>
        </SizeMiddle>

        <SizeRight>
          <BlueprintContainer style={{ width: "100%" }}>
            {selectedLayout?.dimensions?.image ? (
              <img
                src={selectedLayout.dimensions.image}
                alt={(selectedLayout?.name || "") + " blueprint"}
                style={{ width: "100%", height: "auto" }}
                loading="lazy"
              />
            ) : (
              <BlueprintPlaceholder>📐 Blueprint Diagram</BlueprintPlaceholder>
            )}
          </BlueprintContainer>
          <BlueprintCaption>
            <div style={{ fontWeight: 600 }}>{selectedLayout?.name}</div>
            <LegendRow>
              <LegendItem>
                <LegendDot style={{ background: "#e53935" }} /> A
              </LegendItem>
              <LegendItem>
                <LegendDot style={{ background: "#43a047" }} /> B
              </LegendItem>
            </LegendRow>
          </BlueprintCaption>
        </SizeRight>

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
      </SizeGrid>

      {/* Checklist under Step 2 */}
      <ChecklistSection>
        <ChecklistWrapper>
          <ChecklistHeader>
            <ChecklistSubtitle className="universal-fs-h3 universal-font-medium">
              Follow these essential tips for a well-planned and beautiful
              modular kitchen.
            </ChecklistSubtitle>
          </ChecklistHeader>

          <ChecklistContainer className="universal-fs-h3 universal-font-medium">
            <ChecklistContent>
              {[
                "Understand your cooking and storage needs clearly.",
                "Measure the kitchen space precisely to plan layouts efficiently.",
                "Select a layout type that best suits your space (L-shape, U-shape, Island, etc.).",
                "Choose materials that are durable, heat-resistant, and easy to maintain.",
                "Opt for finishes and colors that reflect your style and enhance the kitchen’s ambiance.",
                "Focus on proper lighting, ventilation, and appliance placements.",
                "Plan your budget wisely without compromising on functionality or quality.",
              ].map((item, index, arr) => (
                <ChecklistItem key={index} $isLast={index === arr.length - 1}>
                  <CheckIconCell $isLast={index === arr.length - 1}>
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
                  <ChecklistTextCell
                    $isLast={index === arr.length - 1}
                    className="universal-fs-h3 universal-font-medium"
                  >
                    {item}
                  </ChecklistTextCell>
                </ChecklistItem>
              ))}
            </ChecklistContent>

            <ChecklistImage
              $image={
                "https://res.cloudinary.com/sevfdaro/image/upload/v1782664260/azure_migrated/guides/kitchen-guide/kitchen-rectangle.webp"
              }
              alt="Kitchen Rectangle"
            />
          </ChecklistContainer>
        </ChecklistWrapper>
      </ChecklistSection>
    </SizeStep>
  );
};

// ------------------ Main Component ------------------ //
const PriceCalculators = () => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [isPackageConfirmed, setIsPackageConfirmed] = useState(false);
  const [selectedLayouts, setSelectedLayouts] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [kitchenDimensions, setKitchenDimensions] = useState({
    length: { feet: 12, inches: 10 },
    width: { feet: 8, inches: 2 },
    depth: { feet: 6, inches: 0 },
  });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const isKitchenCalculator = location.pathname.includes(
    "kitchen-price-calculation"
  );

  // Always scroll to top when step changes
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Fallback for browsers without smooth scroll support
      setTimeout(() => window.scrollTo(0, 0), 0);
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // Kitchen Layouts
  const kitchenLayouts = [
    {
      id: "l-shaped",
      name: "L-Shaped",
      description: "Ideal for small to medium homes",
      image:
        "https://res.cloudinary.com/sevfdaro/image/upload/v1782664261/azure_migrated/guides/kitchen-guide/l-shaped.webp",
      dimensions: {
        image:
          "https://res.cloudinary.com/sevfdaro/image/upload/v1782664309/azure_migrated/guides/kitchen-guide/l-shaped-kitchen-frame-blue.webp",
        description:
          "A space-saving layout that tucks neatly into corners, forming an L with two adjacent walls. Ideal for open-plan designs and efficient workflows.",
      },
    },
    {
      id: "u-shaped",
      name: "U-Shaped",
      description: "Ideal for small to medium homes",
      image:
        "https://res.cloudinary.com/sevfdaro/image/upload/v1782664263/azure_migrated/guides/kitchen-guide/u-shaped.webp",
      dimensions: {
        image:
          "https://res.cloudinary.com/sevfdaro/image/upload/v1782664310/azure_migrated/guides/kitchen-guide/u-shaped-kitchen-frame-blue.webp",
        description:
          "Features cabinetry on three sides for maximum storage and counter space. Perfect for large families and avid home cooks.",
      },
    },
    {
      id: "parallel",
      name: "Parallel",
      description: "Best for narrow kitchen spaces",
      image:
        "https://res.cloudinary.com/sevfdaro/image/upload/v1782664266/azure_migrated/guides/kitchen-guide/parallel.webp",
      dimensions: {
        image:
          "https://res.cloudinary.com/sevfdaro/image/upload/v1782664311/azure_migrated/guides/kitchen-guide/island-kitchen-frame-blue.webp",
        description:
          "Two facing countertops create a streamlined cooking corridor. Efficient and ergonomic, ideal for compact to medium-sized spaces.",
      },
    },
    {
      id: "island-kitchen",
      name: "Island Kitchen",
      description: "Luxury layout with open space",
      image:
        "https://res.cloudinary.com/sevfdaro/image/upload/v1782664268/azure_migrated/guides/kitchen-guide/island.webp",
      dimensions: {
        image:
          "https://res.cloudinary.com/sevfdaro/image/upload/v1782664311/azure_migrated/guides/kitchen-guide/prallel-kitchen-frame-blue.webp",
        description:
          "Combines a central island with surrounding counters for added workspace and seating. Best suited for spacious, open kitchens.",
      },
    },
    {
      id: "straight-kitchen",
      name: "Straight Kitchen",
      description: "Compact and efficient",
      image:
        "https://res.cloudinary.com/sevfdaro/image/upload/v1782664270/azure_migrated/guides/kitchen-guide/straight.webp",
      dimensions: {
        image:
          "https://res.cloudinary.com/sevfdaro/image/upload/v1782664312/azure_migrated/guides/kitchen-guide/straight-kitchen-frame-blue.webp",
        description:
          "A single-wall kitchen layout that keeps everything within arm's reach. Great for studio apartments and minimalist homes.",
      },
    },
  ];

  const handleLayoutSelect = (layoutId) => {
    setSelectedLayouts((prev) =>
      prev.includes(layoutId)
        ? prev.filter((id) => id !== layoutId)
        : [layoutId]
    );
  };

  const handleDimensionsChange = (dimension, unit, value) => {
    setKitchenDimensions((prev) => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        [unit]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (selectedLayouts.length > 0) {
        setCurrentStep(2); // go to next page
      } else {
        // stay on same page
        alert("Please select a layout before continuing.");
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };
  const handleFormSuccess = () => {
    setOpen(false);
  };

  const isLandingPage = location.pathname === "/price-calculators";

  if (isLandingPage) {
    return (
      <Layout>
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            {
              label: "Price Estimators",
              to: "/price-calculators",
            },
          ]}
        />
        <LandingContainer>
          <LandingHeader>
            <LandingTitle className="universal-fs-h12 universal-font-extra-bold">
              Select Your <span style={{ color: "#D50F25" }}>Price Estimator</span>
            </LandingTitle>
            <LandingSub className="universal-fs-h3 universal-font-medium">
              Choose a specialized calculator below to estimate the exact cost of your home interior design project in minutes.
            </LandingSub>
          </LandingHeader>
          <CalculatorCardGrid>
            <LandingCalculatorCard to="/price-calculators/kitchen-price-calculation">
              <LandingCardIconContainer>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18h12M6 14h12M6 10h12M3 22h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1z" />
                  <circle cx="9" cy="6" r="1" />
                  <circle cx="15" cy="6" r="1" />
                </svg>
              </LandingCardIconContainer>
              <LandingCardTitle className="universal-fs-h8 universal-font-bold">Modular Kitchen Calculator</LandingCardTitle>
              <LandingCardDesc className="universal-fs-h3 universal-font-medium">
                Calculate custom pricing based on layout shapes (L-shaped, U-shaped, Straight, Parallel), sizes, base cabinet options, and premium accessories.
              </LandingCardDesc>
              <LandingCardButton className="universal-fs-h3 universal-font-semibold">
                Start Estimating <span>→</span>
              </LandingCardButton>
            </LandingCalculatorCard>

            <LandingCalculatorCard to="/price-calculators/home-interior-calculation">
              <LandingCardIconContainer>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </LandingCardIconContainer>
              <LandingCardTitle className="universal-fs-h8 universal-font-bold">Home Interior Calculator</LandingCardTitle>
              <LandingCardDesc className="universal-fs-h3 universal-font-medium">
                Estimate full home design costs based on BHK size, layout configurations, premium wardrobes, living room setups, and essential furniture.
              </LandingCardDesc>
              <LandingCardButton className="universal-fs-h3 universal-font-semibold">
                Start Estimating <span>→</span>
              </LandingCardButton>
            </LandingCalculatorCard>
          </CalculatorCardGrid>
        </LandingContainer>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          {
            label: "Kitchen Price Calculator",
            to: "/price-calculators/kitchen-price-calculation",
          },
        ]}
      />
      <KitchenCalculatorContainer>
        {/* Section 1: Select Kitchen Layout */}
        {currentStep === 1 && (
          <LayoutSelectionSection>
            <StepHeader>
              <StepNumberLarge className="universal-fs-h13 universal-font-extra-bold">
                01
              </StepNumberLarge>
              <StepTitle className="universal-fs-h12 universal-font-bold">
                Select kitchen layout
              </StepTitle>
              <StepTitleDec className="universal-fs-h3 universal-font-medium">
                Choose the shape and size that best matches your kitchen space.
                This helps us estimate accurately.
              </StepTitleDec>
            </StepHeader>

            <LayoutCardsContainer>
              {kitchenLayouts.map((layout) => (
                <KitchenLayoutCard
                  key={layout.id}
                  layout={layout}
                  selected={selectedLayouts.includes(layout.id)}
                  onSelect={handleLayoutSelect}
                />
              ))}
            </LayoutCardsContainer>

            {/* Next Button - appears when any card is selected */}
            {selectedLayouts.length > 0 && (
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
        )}

        {/* Render different steps based on currentStep */}
        {currentStep === 1 && (
          <DimensionsSection>
            <StepHeader>
              <StepTitle className="universal-fs-h12 universal-font-bold">
                Explore Layout Dimensions
              </StepTitle>
              <StepTitleDec className="universal-fs-h3 universal-font-semibold">
                Visualize your kitchen with precise dimensions. Choose a layout
                that fits your space and cooking style seamlessly.
              </StepTitleDec>
            </StepHeader>

            <DimensionCardsGrid>
              {kitchenLayouts.map((layout) => (
                <DimensionCardComponent key={layout.id} layout={layout} />
              ))}
            </DimensionCardsGrid>
          </DimensionsSection>
        )}

        {currentStep === 2 && (
          <KitchenSizeStep
            selectedLayout={kitchenLayouts.find(
              (l) => l.id === selectedLayouts[0]
            )}
            dimensions={kitchenDimensions}
            onDimensionsChange={handleDimensionsChange}
            onBack={handleBack}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <>
            <StepHeader>
              <StepNumberLarge className="universal-fs-h13 universal-font-extra-bold">
                03
              </StepNumberLarge>
              <StepTitle className="universal-fs-h12 universal-font-bold">
                Select Package{" "}
              </StepTitle>
              <StepTitleDec className="universal-fs-h3 universal-font-semibold">
                Select a kitchen package that fits your style & budget
              </StepTitleDec>
            </StepHeader>

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
                      approx: "0.6 Lakh",
                      note: "(Approximately)",
                      subtitle:
                        "Smart value, practical design – everything you need to get started.",
                      features: [
                        "Materials: MDF / Pre‑Laminated Particle Board",
                        "Countertop: Yes Granite (16 mm) – Jet Black / Steel Grey",
                        "Finish: Matte Laminate",
                        "Accessories: Standard handles, basic drawers",
                        "Ideal For: Compact homes, rental properties, starter kitchens",
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
                      approx: "1.2 Lakh",
                      note: "(Approximately)",
                      subtitle:
                        "Balanced performance, refined finishes, and popular accessories.",
                      features: [
                        "Material: BWP Plywood / HDHMR",
                        "Countertop: Yes Quartz (18 mm) – Galaxy Black / Classic White",
                        "Finish: High-Gloss Laminate or Membrane",
                        "Accessories: Soft-close drawers, cutlery organizer, overhead lift-up shutters",
                        "Ideal For: Family kitchens, urban apartments, everyday use",
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
                      approx: "1.8 Lakh",
                      note: "(Approximately)",
                      subtitle:
                        "Premium design, flawless functionality, and luxe finishes.",
                      features: [
                        "Material: BWP Marine Grade Plywood",
                        "Countertop: Yes Quartz / Nano White / Italian Marble (20 mm)",
                        "Finish: Acrylic / PU Coated Shutters / Glass Finish",
                        "Accessories: Tandem drawers, bottle pull-outs, magic corner unit, LED strip lighting",
                        "deal For: Designer homes, premium interiors, open kitchens",
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
                              <FeatureText className="universal-fs-h3 universal-font-medium">
                                {f}
                              </FeatureText>
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
                        if (currentStep > 1) {
                          setCurrentStep(currentStep - 1);
                        }
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

                    {/* <BackButton1
                      onClick={() => {
                        if (currentStep > 1) {
                          setCurrentStep(currentStep - 1);
                        }
                      }}
                    >
                      Back
                    </BackButton1>
                    <ContinueButton1
                      onClick={() => {
                        if (selectedPackageIndex !== null) {
                          setIsPackageConfirmed(true);
                        }
                      }}
                      style={{
                        opacity: selectedPackageIndex === null ? 0.6 : 1,
                        cursor:
                          selectedPackageIndex === null
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                    
                      Next
                    </ContinueButton1> */}
                  </StepActions>
                </NextButtonWrapper>
              </div>
            </section>
          </>
        )}

        {currentStep === 3 && (
          <>
            <TipsSection />
            <Services />
            <ReviewsWrapper>
              <YouTubeReviews />
            </ReviewsWrapper>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Services />
            <ReviewsWrapper>
              <YouTubeReviews />
            </ReviewsWrapper>
          </>
        )}

        {currentStep === 1 && (
          <>
            <Services />
            <ReviewsWrapper>
              <YouTubeReviews />
            </ReviewsWrapper>
          </>
        )}
      </KitchenCalculatorContainer>
    </Layout>
  );
};

export default PriceCalculators;


