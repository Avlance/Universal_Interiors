"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from '@/utils/react-router-dom';
import styled from "styled-components";
import TopHeader from "./TopHeader.jsx";
import ConsultationForm from "@/_old_routes/home/ConsultationForm.jsx";
import ConsultationFormContent from "@/_old_routes/home/ConsultationFormContent.jsx";
import Modal from "../modal/js/Modal.jsx";
import ConfirmationAlert from "../ConfirmationAlert.jsx";
import { fetchAndTransformDesignGallery } from "@/_old_routes/design-gallery/DesignGalleryUtils";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    top: 0;
  }

  @media (max-width: 480px) {
    top: 0;
  }
`;

const MainHeader = styled.div`
  background-color: #ffffff;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0px;
  height: 65px;

  @media (max-width: 1024px) {
    padding: 0 16px;
    height: 70px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
    height: 60px;
  }
`;

const MobileOverlay = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: ${({ isNavOpen }) => (isNavOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1002;
    backdrop-filter: blur(2px);
    transition: opacity 0.3s ease-in-out;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
  flex-shrink: 0;

  a {
    color: #222222;
    text-decoration: none;
  }

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;

    svg {
      width: 140px;
      height: 30px;
    }
  }
`;

const MainNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    top: 65px;
    left: ${({ isOpen }) => (isOpen ? "0" : "-80%")};
    right: auto;
    bottom: 0;
    width: 80%;
    background-color: #ffffff;
    padding: 24px 16px;
    flex-direction: column;
    align-items: flex-start;
    z-index: 1002;
    overflow-y: auto;
    margin-left: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;
    padding-top: 80px;
  }

  @media (max-width: 768px) {
    top: 70px;
  }

  @media (max-width: 480px) {
    top: 0px;
    padding: 24px;
    padding-top: 70px;
    justify-content: flex-start;
    background-color: #ffffff;
  }
`;

const SidebarOverlay = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "block")};
    position: fixed;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: opacity 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    top: 70px;
  }

  @media (max-width: 480px) {
    top: 60px;
  }
`;

const MobileLogo = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: absolute;
    top: 20px;
    left: 20px;
    align-items: center;
    justify-content: center;
    z-index: 1001;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    svg {
      width: 140px;
      height: 30px;
    }
  }

  @media (max-width: 480px) {
    top: 24px;
    left: 24px;

    svg {
      width: 140px;
      height: 35px;
    }
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #222222;
    z-index: 1001;
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 480px) {
    top: 15px;
    right: 24px;
    min-width: 40px;
    min-height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 30px;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    gap: 0;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    gap: 0;
    padding: 6px 0;
    border-radius: 6px;
    box-shadow: none;
  }
`;

const NavItem = styled.li`
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    border-bottom: 1px solid #e9ecef;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
    margin: 0 8px;
    border-radius: 6px;

    &:last-child {
      border-bottom: none;
    }

    /* Add active state for mobile */
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
      // transform: scale(0.98);
    }

    /* Remove hover effects on mobile */
    &:hover {
      background-color: transparent;
    }
  }

  @media (max-width: 480px) {
    margin: 0 6px;
    border-radius: 4px;
  }
`;

const NavLink = styled(Link)`
  color: #222222;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  position: relative;
  letter-spacing: 0.5px;
  cursor: pointer;

  @media (min-width: 1025px) {
    &:hover {
      color: #dc3545;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #dc3545;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    font-size: var(--universal-fs-h4);
    padding: 16px 0;
    width: 100%;
    justify-content: space-between;
    cursor: pointer;
    min-height: 44px;
    align-items: center;
    touch-action: manipulation;
    user-select: none;

    &::after {
      display: none;
    }

    /* Remove hover effects on mobile */
    &:hover {
      color: #222222;
    }

    &:hover::after {
      width: 0;
    }
  }

  @media (max-width: 480px) {
    font-size: var(--universal-fs-h3);
    padding: 14px 0;
    min-height: 40px;
    font-weight: 700; /* Bold for mobile only */
  }
`;

const DropdownArrow = styled.span`
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  svg {
    width: 18px;
    height: 20px;
    fill: currentColor;
  }
  @media (max-width: 1024px) {
    margin-left: auto;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    margin-right: 1.25rem;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const SubMenuDropdownArrow = styled.span`
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  svg {
    fill: currentColor;
  }
  @media (max-width: 1024px) {
    margin-left: auto;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #222222;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    min-width: 40px;
    min-height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const SubMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  min-width: 250px;
  border-radius: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  display: none; /* Default hidden */
  z-index: 1000;
  box-shadow: 0px 0px 10px 0px #0000000f;
  border-radius: 6px;

  /* Desktop hover - show on parent hover */
  @media (min-width: 1025px) {
    ${NavItem}:hover > & {
      display: block;
      animation: fadeIn 0.3s ease;
      box-shadow: 0px 1.6px 6px 0px #00000029;
    }
  }

  /* Mobile - show when isVisible is true */
  ${(props) =>
    props.isVisible &&
    `
    display: block;
  `}

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  @media (max-width: 1024px) {
    position: static;
    box-shadow: none;
    padding: 8px 0;
    min-width: unset;
    border-top: none;
    background-color: #ffffff;
    margin: 8px 16px 0 16px;
    border-radius: 8px;
    max-height: ${(props) => (props.isVisible ? "500px" : "0")};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
    transform: ${(props) =>
      props.isVisible ? "translateY(0)" : "translateY(-10px)"};
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

    // /* Disable hover on mobile */
    //     ${NavItem}:hover > & {

    //   display: none;
    // }

    // &::before {
    //   display: none;
    // }
  }

  @media (max-width: 480px) {
    padding: 6px 0;
    margin: 6px 12px 12px;
    border-radius: 6px;
  }
`;

const SubMenuItem = styled.div`
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media (min-width: 1025px) {
    &:hover {
      a.sub-menu-link {
        color: #dc3545;
      }
      svg {
        fill: #d50f25 !important;
      }
    }
  }

  a {
    color: #222222;
    text-decoration: none;
    font-size: 13px;
    display: block;
    transition: color 0.2s ease;
    cursor: pointer;
    flex: 1;

    @media (min-width: 1025px) {
      &:hover {
        color: #dc3545;
      }
    }

    @media (max-width: 1024px) {
      font-size: var(--universal-fs-h3);
      padding: 12px 16px;
      width: 100%;
      background-color: #f8f8f8;
      border-radius: 8px;
      margin: 4px 8px;
      flex: 1;
      transition: all 0.2s ease;

      /* Remove hover effects on mobile */
      &:hover {
        background-color: transparent;
      }

      &:hover a {
        color: #222222;
      }

      &:hover svg {
        fill: #222222 !important;
      }

      /* Add active state for mobile */
      &:active {
        background-color: #e9ecef;
        // transform: scale(0.98);
      }
    }

    @media (max-width: 480px) {
      font-size: var(--universal-fs-h2);
      padding: 10px 12px;
      margin: 2px 6px;
      border-radius: 6px;
    }
  }

  @media (max-width: 1024px) {
    padding: 0;
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;

    /* Add active state for mobile */
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
      // transform: scale(0.98);
    }

    /* Remove hover effects on mobile */
    &:hover {
      background-color: transparent;
    }

    &:hover a {
      color: #222222;
    }

    &:hover svg {
      fill: #222222 !important;
    }
  }

  @media (max-width: 480px) {
    padding: 0;
  }
`;

const NestedSubMenuContainer = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  background-color: #ffffff;
  min-width: 200px;
  border-radius: 6px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  padding: 16px 0;
  display: none; /* Default hidden */
  z-index: 1100;
  transition: opacity 0.2s;

  /* Desktop hover - show on parent hover */
  @media (min-width: 1025px) {
    ${SubMenuItem}:hover > & {
      display: block;
      animation: fadeIn 0.3s ease;
      box-shadow: 0px 1.6px 6px 0px #00000029;
    }
  }

  /* Mobile - show when isVisible is true */
  ${(props) =>
    props.isVisible &&
    `
    display: block;
  `}

  @media (max-width: 1024px) {
    position: static;
    box-shadow: none;
    padding: 6px 0;
    min-width: unset;
    border-top: none;
    background-color: #ffffff;
    margin: 6px 20px 0 20px;
    border-radius: 6px;
    max-height: ${(props) => (props.isVisible ? "300px" : "0")};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
    transform: ${(props) =>
      props.isVisible ? "translateY(0)" : "translateY(-10px)"};
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

    /* Disable hover on mobile */
    ${SubMenuItem}:hover > & {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: 4px 0;
    margin: 4px 16px 0 16px;
    border-radius: 4px;
  }
`;

const NestedSubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1024px) {
    max-height: ${(props) => (props.isVisible ? "200px" : "0")};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
    transform: ${(props) =>
      props.isVisible ? "translateY(0)" : "translateY(-5px)"};
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
    padding: 4px 0;
  }

  @media (max-width: 480px) {
    padding: 2px 0;
  }
`;

const NestedSubMenuItem = styled.li`
  @media (max-width: 1024px) {
    width: 100%;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
    margin: 2px 8px;
    border-radius: 4px;

    /* Add active state for mobile */
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
      // transform: scale(0.98);
    }

    a {
      display: block;
      padding: 10px 12px;
      background-color: #ffffff;
      border-radius: 4px;
      margin: 0;
      transition: all 0.2s ease;

      &:active {
        background-color: #e9ecef;
        // transform: scale(0.98);
      }
    }
  }

  @media (max-width: 480px) {
    margin: 1px 6px;

    a {
      padding: 8px 10px;
      font-size: var(--universal-fs-h2);
    }
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  gap: 16px;

  @media (max-width: 1024px) {
    margin-right: 0;
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 8px;

    /* Hide Book Free Consultation button on mobile */
    > *:first-child {
      display: none;
    }
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Bottom Menu Bar for Mobile
const BottomMenuBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
    height: 60px;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    height: 55px;
    padding: 0 12px;
  }
`;

const BottomMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const BottomMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 8px 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BottomMenuIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  color: ${(props) => (props.active ? "#D50F25" : "#666666")};
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const BottomMenuIconConsultation = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  color: ${(props) => (props.active ? "#D50F25" : "#666666")};
  transition: all 0.2s ease;

  svg {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;

    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const BottomMenuLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${(props) => (props.active ? "#D50F25" : "#666666")};
  text-align: center;
  line-height: 1.2;
  transition: all 0.2s ease;

  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

const BottomMenuSlider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20%;
  height: 3px;
  background: #d50f25;
  border-radius: 2px 2px 0 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${(props) => props.activeIndex * 100}%);

  @media (max-width: 480px) {
    height: 2px;
  }
`;

// Consultation Modal Components
const ConsultationCloseButton = styled.button`
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

const UserIcon = styled.img`
  width: 27px;
  height: 27px;

  @media (max-width: 1024px) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
  }
`;

const defaultNavItems = [
  {
    label: "Design Gallery",
    to: "/design-gallery",
    submenu: [
      { label: "Rooms & Spaces", to: "/design-gallery/rooms-and-spaces" },
      { label: "Kitchen Designs", to: "/design-gallery/kitchen-designs" },
      // { label: 'Specialty Designs', to: '/design-gallery/specialty-designs' },
      // { label: 'Apartment Layouts', to: '/design-gallery/apartment-layouts' }
    ],
    key: "designIdea",
  },

  {
    label: "Guides",
    to: "/guides",
    submenu: [
      { label: "Modular Kitchen Guide", to: "/guides/modular-kitchen-guide" },
      { label: "Wardrobe Design Guide", to: "/guides/wardrobe-design-guide" },

      // { label: 'Bangalore', to: '/cities/bangalore' },
      // { label: 'Delhi', to: '/cities/delhi' },
      // {
      //   label: 'Gurugram',
      //   to: '/cities/gurugram',
      //   submenu: [
      //     { label: 'Sector 1', to: '/cities/gurugram/sector-1' },
      //     { label: 'Sector 2', to: '/cities/gurugram/sector-2' },
      //   ]
      // }
    ],
    key: "guides",
  },
  {
    label: "Price Calculators",
    to: "/price-calculators",
    submenu: [
      {
        label: "Home Interior Calculation",
        to: "/price-calculators/home-interior-calculation",
      },
      {
        label: "Kitchen Price Calculation",
        to: "/price-calculators/kitchen-price-calculation",
      },
      // { label: 'Specialty Designs', to: '/design-gallery/specialty-designs' },
      // { label: 'Apartment Layouts', to: '/design-gallery/apartment-layouts' }
    ],
    key: "priceCalculators",
  },
  { label: "Reviews", to: "/reviews" },
  {
    label: "Customer Support",
    to: "/support",
    // submenu: [
    //   { label: 'Bangalore', to: '/support/bangalore' },
    //   { label: 'Delhi', to: '/support/delhi' }
    // ],
    key: "support",
  },
  {
    label: "More",
    to: "/more",
    // submenu: [
    //   { label: 'Bangalore', to: '/more/bangalore' },
    //   { label: 'Delhi', to: '/more/delhi' }
    // ],
    key: "more",
  },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth > 1024 : true);
  const [activeBottomMenu, setActiveBottomMenu] = useState(0);
  const [navItems, setNavItems] = useState(defaultNavItems);
  const [showGuidesAlert, setShowGuidesAlert] = useState(false);
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Bottom menu items
  const bottomMenuItems = [
    {
      id: 0,
      label: "Home",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
      type: "navigation",
      path: "/",
    },
    {
      id: 1,
      label: "Design Gallery",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      ),
      type: "navigation",
      path: "/design-gallery",
    },
    {
      id: 2,
      label: "",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="50" height="50" rx="25" fill="#D50F25" />
          <g clipPath="url(#clip0_1458_15028)">
            <path
              d="M34.6875 8.25H16.3125C15.6163 8.25 14.9486 8.52656 14.4563 9.01884C13.9641 9.51113 13.6875 10.1788 13.6875 10.875V39.75C13.6876 39.9842 13.7504 40.2142 13.8694 40.4159C13.9883 40.6177 14.1591 40.784 14.364 40.8975C14.5689 41.011 14.8005 41.0676 15.0346 41.0614C15.2688 41.0552 15.497 40.9865 15.6956 40.8623L25.5 34.7346L35.306 40.8623C35.5046 40.9861 35.7327 41.0544 35.9666 41.0604C36.2005 41.0664 36.4317 41.0097 36.6364 40.8962C36.841 40.7828 37.0116 40.6167 37.1305 40.4152C37.2494 40.2136 37.3122 39.984 37.3125 39.75V10.875C37.3125 10.1788 37.0359 9.51113 36.5437 9.01884C36.0514 8.52656 35.3837 8.25 34.6875 8.25ZM26.194 32.0752C25.9854 31.9448 25.7443 31.8757 25.4984 31.8757C25.2524 31.8757 25.0113 31.9448 24.8027 32.0752L16.3125 37.3826V32.6018L25.5 26.8596L34.6875 32.6018V37.3826L26.194 32.0752Z"
              fill="#F5B400"
            />
          </g>
          <path
            d="M21.2042 17.024H19.2442V18.186H21.1482V19.11H19.2442V21H18.2782V16.1H21.2042V17.024ZM24.5961 21L23.6091 19.299H22.8741V21H21.9081V16.1H23.8681C24.3208 16.1 24.7058 16.2587 25.0231 16.576C25.3405 16.8933 25.4991 17.276 25.4991 17.724C25.4991 18.0273 25.4128 18.3097 25.2401 18.571C25.0675 18.8277 24.8388 19.0213 24.5541 19.152L25.6391 21H24.5961ZM22.8741 17.003V18.452H23.8681C24.0501 18.452 24.2065 18.382 24.3371 18.242C24.4678 18.0973 24.5331 17.9247 24.5331 17.724C24.5331 17.5233 24.4678 17.353 24.3371 17.213C24.2065 17.073 24.0501 17.003 23.8681 17.003H22.8741ZM27.1739 20.076H29.2389V21H26.2079V16.1H29.2039V17.024H27.1739V18.067H29.0289V18.977H27.1739V20.076ZM30.8858 20.076H32.9508V21H29.9198V16.1H32.9158V17.024H30.8858V18.067H32.7408V18.977H30.8858V20.076Z"
            fill="black"
          />
          <defs>
            <clipPath id="clip0_1458_15028">
              <rect
                width="42"
                height="42"
                fill="white"
                transform="translate(4.5 3)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      type: "consultation",
      component: <ConsultationForm />,
    },
    {
      id: 3,
      label: "Price Estimator",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
      type: "alert",
    },
    {
      id: 4,
      label: "Profile",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      type: "alert",
    },
  ];

  // Function to determine active menu item based on current route
  const getActiveMenuIndex = (pathname) => {
    // Check for exact matches first
    if (pathname === "/") {
      return 0; // Home
    }
    if (
      pathname === "/design-gallery" ||
      pathname.startsWith("/design-gallery/")
    ) {
      return 1; // Design Gallery
    }

    // Return null if no match found - this will maintain current active state
    return null;
  };

  // Function to check if menu item should show active state
  const shouldShowActiveState = (itemId) => {
    // Book Free Consultation (id: 2) should never show active state
    if (itemId === 2) {
      return false;
    }
    return itemId === activeBottomMenu;
  };

  // Update active menu item when route changes
  useEffect(() => {
    const activeIndex = getActiveMenuIndex(location.pathname);
    // Only update if a valid route is found (not null)
    if (activeIndex !== null) {
      setActiveBottomMenu(activeIndex);
    }
  }, [location.pathname]);

  // Handle bottom menu item click
  const handleBottomMenuItemClick = (item) => {
    // Don't set active state for Book Free Consultation (id: 2)
    if (item.id !== 2) {
      setActiveBottomMenu(item.id);
    }

    switch (item.type) {
      case "navigation":
        navigate(item.path);
        break;
      case "consultation":
        setShowConsultationModal(true);
        break;
      case "alert":
        if (item.label === "Price Estimator") {
          setShowGuidesAlert(true);
        } else if (item.label === "Profile") {
          setShowProfileAlert(true);
        }
        break;
      default:
        console.log("Bottom menu clicked:", item.label);
    }
  };

  // Handle consultation form success
  const handleConsultationSuccess = () => {
    setShowConsultationModal(false);
  };

  // Reset consultation form state
  const resetConsultationForm = () => {
    // Reset is handled by ConsultationFormContent component
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleSubMenu = (e, menuName) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeSubMenu === menuName) {
      // Close the current submenu if clicking on the same menu
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
    } else {
      // Close any existing submenu and open the new one
      setActiveSubMenu(menuName);
      setActiveSubSubMenu(null);
    }
  };

  // Toggle sub-submenu for mobile compatibility
  const toggleSubSubMenu = (e, subKey) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeSubSubMenu === subKey) {
      // Close the current sub-submenu if clicking on the same item
      setActiveSubSubMenu(null);
    } else {
      // Close any existing sub-submenu and open the new one
      setActiveSubSubMenu(subKey);
    }
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if click is outside the navigation area
      const navContainer = e.target.closest(".nav-container");
      if (!navContainer) {
        setActiveSubMenu(null);
        setActiveSubSubMenu(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Prevent propagation to keep submenu open when clicking inside
  const handleSubMenuClick = (e) => {
    e.stopPropagation();
  };

  // Handle window resize and update desktop state
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);

      if (desktop) {
        setIsNavOpen(false);
        setActiveSubMenu(null);
        setActiveSubSubMenu(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  // Fetch design gallery data and update navItems
  useEffect(() => {
    async function loadDesignGalleryMenu() {
      const { data } = await fetchAndTransformDesignGallery();
      if (Array.isArray(data) && data.length > 0) {
        setNavItems((prev) =>
          prev.map((item) => {
            if (item.label === "Design Gallery") {
              // Only show categories as submenu
              const submenu = data.map((category) => ({
                label: category.title,
                to: `/design-gallery/${category.category}`,
              }));
              return { ...item, submenu };
            }
            return item;
          })
        );
      }
    }
    loadDesignGalleryMenu();
  }, []);

  // Close submenu when mouse leaves the menu area (desktop only)
  const handleMenuMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setTimeout(() => {
        setActiveSubMenu(null);
        setActiveSubSubMenu(null);
      }, 100);
    }
  };

  // Close submenu when mouse leaves specific menu item (desktop only)
  const handleNavItemMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setTimeout(() => {
        setActiveSubMenu(null);
        setActiveSubSubMenu(null);
      }, 100);
    }
  };

  // Close all menus when navigating to a link
  const handleMenuLinkClick = () => {
    setIsNavOpen(false);
    setActiveSubMenu(null);
    setActiveSubSubMenu(null);
  };

  // Handle main NavLink click for items with submenus
  const handleMainNavLinkClick = (e, item) => {
    // On desktop, if the item has a valid 'to' path, navigate to it
    if (isDesktop && item.to && item.to !== "#") {
      // Close all menus
      setIsNavOpen(false);
      setActiveSubMenu(null);
      setActiveSubSubMenu(null);
      // Let the Link component handle the navigation
      return;
    } else if (isDesktop) {
      // If no valid path, toggle submenu
      e.preventDefault();
      toggleSubMenu(e, item.key);
    }
    // On mobile, let the label navigate and arrow toggle submenu
  };

  // Handle dropdown arrow click for mobile
  const handleDropdownArrowClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSubMenu(e, item.key);
  };

  // Handle NavItem click for mobile expand/collapse
  const handleNavItemClick = (e, item) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      if (item.submenu) {
        toggleSubMenu(e, item.key);
      }
    }
  };

  // Handle SubMenuItem click for mobile expand/collapse
  const handleSubMenuItemClick = (e, subItem) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      if (subItem.submenu) {
        toggleSubSubMenu(e, subItem.label);
      }
    }
  };

  // Handle NestedSubMenuItem click for mobile expand/collapse
  const handleNestedSubMenuItemClick = (e, nestedItem) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      if (nestedItem.submenu) {
        // Handle deeper nested menus if needed
        console.log("Nested submenu clicked:", nestedItem.label);
      }
    }
  };

  return (
    <HeaderContainer>
      <MobileOverlay isNavOpen={isNavOpen} onClick={toggleNav} />
      <MainHeader>
        <NavContainer className="nav-container">
          <MobileMenuButton onClick={toggleNav} aria-label="Toggle menu">
            {isNavOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </MobileMenuButton>

          <Logo>
            <Link
              to="/"
              style={{ alignItems: "center", display: "flex", gap: "0.25rem" }}
            >
              <svg width="181" height="40" viewBox="0 0 181 40" fill="none">
                {" "}
                <path
                  d="M0 30.3201V17.1981L6.81304 13.2578V30.3201H0Z"
                  fill="#4286F5"
                />{" "}
                <path
                  d="M19.2229 30.3074V16.2573L16.5951 14.3594L14.1737 16.2573V24.8602H6.81348V30.3074H19.2229Z"
                  fill="#009925"
                />{" "}
                <path
                  d="M16.5537 7.92474V0.00195312L33.7772 9.99155V17.2254L16.5537 7.92474Z"
                  fill="#D50F25"
                />{" "}
                <path
                  d="M16.5459 7.92649V0.00195312L-6.29425e-05 9.99377V17.2292L16.5459 7.92649Z"
                  fill="#D50F25"
                />{" "}
                <path
                  d="M16.498 38.4978V31.6848L27.5774 26.0138V13.877L33.7778 17.2275V29.4113L16.498 38.4978Z"
                  fill="#F5B400"
                />{" "}
                <path
                  d="M12.6523 15.4295L16.4968 12.4609L20.1954 14.9915"
                  stroke="#D50F25"
                  strokeWidth="1.11929"
                  strokeLinecap="round"
                />{" "}
                <g clipPath="url(#clip0_302_8765)">
                  {" "}
                  <path
                    d="M85.2861 0.00012207H88.3767C88.7229 0.00012207 89.0036 0.280765 89.0036 0.626955V3.19927H85.2861V0.00012207Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M169.274 5.14844H173.152V16.7147H179.598V19.7366H169.274V5.14844Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M154.925 16.9241L155.2 14.2357H163.161L163.413 16.9241H154.925ZM159.123 10.5053L156.875 15.2152L157.059 15.9863L155.063 19.7375H150.681L159.123 4.23242L167.589 19.7375H163.184L161.257 16.1322L161.395 15.236L159.123 10.5053Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M139.833 14.6113C140.154 15.1392 140.514 15.5977 140.911 15.9867C141.324 16.3758 141.768 16.6745 142.242 16.8829C142.731 17.0913 143.244 17.1955 143.779 17.1955C144.345 17.1955 144.812 17.0704 145.179 16.8204C145.546 16.5564 145.729 16.2021 145.729 15.7575C145.729 15.3824 145.622 15.0837 145.408 14.8614C145.194 14.6252 144.85 14.4029 144.376 14.1945C143.901 13.9861 143.274 13.7499 142.494 13.4859C142.112 13.3609 141.668 13.1872 141.164 12.9649C140.674 12.7426 140.208 12.4578 139.764 12.1105C139.321 11.7492 138.954 11.3185 138.663 10.8184C138.372 10.3043 138.227 9.68606 138.227 8.9636C138.227 8.10221 138.472 7.35891 138.961 6.7337C139.466 6.1085 140.139 5.63612 140.98 5.31657C141.837 4.98313 142.785 4.81641 143.825 4.81641C144.896 4.81641 145.821 4.97618 146.601 5.29573C147.396 5.61528 148.054 6.01819 148.574 6.50446C149.094 6.99073 149.492 7.48395 149.767 7.98411L146.807 9.48461C146.578 9.13727 146.31 8.83856 146.004 8.58848C145.714 8.3245 145.385 8.12305 145.018 7.98411C144.666 7.83129 144.284 7.75487 143.871 7.75487C143.32 7.75487 142.9 7.86602 142.609 8.08832C142.318 8.29672 142.173 8.56069 142.173 8.88024C142.173 9.21369 142.311 9.50545 142.586 9.75553C142.877 10.0056 143.282 10.2349 143.802 10.4433C144.337 10.6517 144.98 10.874 145.729 11.1101C146.295 11.3047 146.823 11.5339 147.312 11.7979C147.802 12.048 148.23 12.3536 148.597 12.7148C148.979 13.0761 149.278 13.4929 149.492 13.9652C149.706 14.4376 149.813 14.9795 149.813 15.5908C149.813 16.3271 149.645 16.9871 149.308 17.5706C148.987 18.1402 148.543 18.6196 147.977 19.0086C147.427 19.3976 146.792 19.6894 146.073 19.8839C145.37 20.0923 144.643 20.1965 143.894 20.1965C142.854 20.1965 141.883 20.0297 140.98 19.6963C140.093 19.349 139.321 18.8835 138.663 18.3C138.005 17.7165 137.493 17.0774 137.126 16.3827L139.833 14.6113Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M127.227 13.1302H131.242L136.266 19.7366H131.723L127.227 13.1302ZM123.212 5.14844H127.089V19.7366H123.212V5.14844ZM125.644 8.12858V5.14844H129.062C130.439 5.14844 131.586 5.34989 132.503 5.7528C133.421 6.15571 134.117 6.7184 134.591 7.44086C135.065 8.14942 135.302 8.97608 135.302 9.92084C135.302 10.8517 135.065 11.6784 134.591 12.4008C134.117 13.1094 133.421 13.6651 132.503 14.068C131.586 14.4709 130.439 14.6724 129.062 14.6724H125.644V11.9423H128.787C129.307 11.9423 129.75 11.8729 130.117 11.7339C130.5 11.5811 130.79 11.3658 130.989 11.0879C131.188 10.7961 131.287 10.4488 131.287 10.0459C131.287 9.64297 131.188 9.30258 130.989 9.02471C130.79 8.73295 130.5 8.51065 130.117 8.35783C129.75 8.205 129.307 8.12858 128.787 8.12858H125.644Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M111.965 19.7366V16.8398H120.064V19.7366H111.965ZM111.965 8.04522V5.14844H120.064V8.04522H111.965ZM111.965 13.4845V10.6502H119.605V13.4845H111.965ZM109.396 5.14844H113.112V19.7366H109.396V5.14844Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M99.2483 13.8596L103.171 5.14844H107.714L99.2483 20.6535L90.8057 5.14844H95.3252L99.2483 13.8596Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M85.1768 5.14844H89.1228V19.7366H85.1768V5.14844Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M78.036 5.14737H81.7756V20.4649L70.6717 11.5245V19.7355H66.9551V4.41797L78.036 13.3584V5.14737Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M50.7588 5.14844H54.636V14.6932C54.636 15.4296 54.8501 16.027 55.2783 16.4855C55.7066 16.944 56.349 17.1732 57.2055 17.1732C58.0773 17.1732 58.7273 16.944 59.1555 16.4855C59.5838 16.027 59.7979 15.4296 59.7979 14.6932V5.14844H63.6751V14.9433C63.6751 15.8603 63.5069 16.6592 63.1704 17.3399C62.8492 18.0207 62.3903 18.5834 61.7939 19.028C61.2127 19.4587 60.5244 19.7852 59.7291 20.0075C58.9491 20.2298 58.1079 20.3409 57.2055 20.3409C56.3031 20.3409 55.4619 20.2298 54.6819 20.0075C53.9018 19.7852 53.2136 19.4587 52.6171 19.028C52.0359 18.5834 51.5771 18.0207 51.2406 17.3399C50.9194 16.6592 50.7588 15.8603 50.7588 14.9433V5.14844Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M56.1678 27.675H57.1929V36.1172H56.1678V27.675ZM73.2345 27.675H74.2596V36.5393L67.8677 29.8338V36.1172H66.8426V27.2529L73.2345 33.9584V27.675ZM83.0684 28.6398V27.675H88.4352V28.6398H86.2643V36.1172H85.2392V28.6398H83.0684ZM97.8042 36.1172V35.1524H102.061V36.1172H97.8042ZM97.8042 28.6398V27.675H102.061V28.6398H97.8042ZM97.8042 32.0167V31.0519H101.82V32.0167H97.8042ZM97.2373 27.675H98.2625V36.1172H97.2373V27.675ZM113.094 31.9564H114.24L117.255 36.1172H115.989L113.094 31.9564ZM111.587 27.675H112.612V36.1172H111.587V27.675ZM112.154 28.5795V27.675H113.878C114.425 27.675 114.911 27.7795 115.337 27.9886C115.772 28.1896 116.113 28.479 116.363 28.8569C116.62 29.2348 116.749 29.685 116.749 30.2076C116.749 30.7222 116.62 31.1725 116.363 31.5584C116.113 31.9363 115.772 32.2298 115.337 32.4388C114.911 32.6398 114.425 32.7403 113.878 32.7403H112.154V31.8358H113.878C114.24 31.8358 114.558 31.7715 114.831 31.6428C115.112 31.5142 115.329 31.3293 115.482 31.088C115.643 30.8468 115.723 30.5534 115.723 30.2076C115.723 29.8619 115.643 29.5684 115.482 29.3272C115.329 29.086 115.112 28.9011 114.831 28.7725C114.558 28.6438 114.24 28.5795 113.878 28.5795H112.154ZM126.054 27.675H127.079V36.1172H126.054V27.675ZM137.332 31.8961C137.332 32.5313 137.468 33.0981 137.742 33.5966C138.023 34.0951 138.405 34.489 138.887 34.7785C139.37 35.0679 139.917 35.2127 140.528 35.2127C141.147 35.2127 141.693 35.0679 142.168 34.7785C142.65 34.489 143.028 34.0951 143.302 33.5966C143.583 33.0981 143.724 32.5313 143.724 31.8961C143.724 31.2609 143.583 30.6941 143.302 30.1956C143.028 29.6971 142.65 29.3031 142.168 29.0137C141.693 28.7242 141.147 28.5795 140.528 28.5795C139.917 28.5795 139.37 28.7242 138.887 29.0137C138.405 29.3031 138.023 29.6971 137.742 30.1956C137.468 30.6941 137.332 31.2609 137.332 31.8961ZM136.246 31.8961C136.246 31.277 136.351 30.7061 136.56 30.1835C136.777 29.6529 137.078 29.1946 137.464 28.8087C137.85 28.4147 138.305 28.1092 138.827 27.8921C139.35 27.6669 139.917 27.5544 140.528 27.5544C141.147 27.5544 141.714 27.6669 142.228 27.8921C142.751 28.1092 143.205 28.4147 143.591 28.8087C143.977 29.1946 144.274 29.6529 144.483 30.1835C144.701 30.7061 144.809 31.277 144.809 31.8961C144.809 32.5071 144.701 33.078 144.483 33.6086C144.274 34.1393 143.977 34.6016 143.591 34.9956C143.205 35.3815 142.751 35.687 142.228 35.9122C141.714 36.1292 141.147 36.2378 140.528 36.2378C139.917 36.2378 139.35 36.1292 138.827 35.9122C138.305 35.687 137.85 35.3815 137.464 34.9956C137.078 34.6016 136.777 34.1393 136.56 33.6086C136.351 33.078 136.246 32.5071 136.246 31.8961ZM155.483 31.9564H156.629L159.644 36.1172H158.377L155.483 31.9564ZM153.975 27.675H155V36.1172H153.975V27.675ZM154.542 28.5795V27.675H156.267C156.814 27.675 157.3 27.7795 157.726 27.9886C158.16 28.1896 158.502 28.479 158.751 28.8569C159.009 29.2348 159.137 29.685 159.137 30.2076C159.137 30.7222 159.009 31.1725 158.751 31.5584C158.502 31.9363 158.16 32.2298 157.726 32.4388C157.3 32.6398 156.814 32.7403 156.267 32.7403H154.542V31.8358H156.267C156.629 31.8358 156.946 31.7715 157.22 31.6428C157.501 31.5142 157.718 31.3293 157.871 31.088C158.032 30.8468 158.112 30.5534 158.112 30.2076C158.112 29.8619 158.032 29.5684 157.871 29.3272C157.718 29.086 157.501 28.9011 157.22 28.7725C156.946 28.6438 156.629 28.5795 156.267 28.5795H154.542ZM168.756 33.5604C168.949 33.8981 169.15 34.1956 169.359 34.4529C169.576 34.7102 169.817 34.9112 170.083 35.0559C170.348 35.2006 170.65 35.273 170.987 35.273C171.437 35.273 171.799 35.1483 172.073 34.8991C172.346 34.6499 172.483 34.3323 172.483 33.9463C172.483 33.5684 172.394 33.2669 172.217 33.0418C172.041 32.8167 171.807 32.6358 171.518 32.4991C171.236 32.3544 170.935 32.2257 170.613 32.1132C170.404 32.0408 170.171 31.9483 169.914 31.8358C169.657 31.7152 169.411 31.5664 169.178 31.3896C168.945 31.2046 168.752 30.9795 168.599 30.7142C168.455 30.4488 168.382 30.1232 168.382 29.7373C168.382 29.3192 168.487 28.9453 168.696 28.6157C168.905 28.286 169.194 28.0288 169.564 27.8438C169.934 27.6509 170.356 27.5544 170.83 27.5544C171.289 27.5544 171.687 27.6428 172.024 27.8197C172.37 27.9885 172.664 28.2097 172.905 28.483C173.146 28.7483 173.335 29.0298 173.472 29.3272L172.591 29.8338C172.487 29.6247 172.354 29.4197 172.193 29.2187C172.032 29.0177 171.835 28.8529 171.602 28.7242C171.377 28.5956 171.1 28.5313 170.77 28.5313C170.312 28.5313 169.978 28.6438 169.769 28.869C169.56 29.086 169.456 29.3313 169.456 29.6046C169.456 29.8378 169.516 30.0549 169.636 30.2559C169.757 30.4488 169.958 30.6338 170.24 30.8107C170.529 30.9795 170.919 31.1483 171.409 31.3172C171.634 31.3976 171.872 31.5021 172.121 31.6308C172.37 31.7594 172.599 31.9242 172.808 32.1252C173.025 32.3182 173.202 32.5554 173.339 32.8368C173.476 33.1102 173.544 33.4398 173.544 33.8257C173.544 34.1956 173.472 34.5292 173.327 34.8267C173.19 35.1242 172.997 35.3775 172.748 35.5865C172.507 35.7956 172.229 35.9564 171.916 36.0689C171.61 36.1815 171.289 36.2378 170.951 36.2378C170.493 36.2378 170.067 36.1413 169.673 35.9483C169.287 35.7473 168.945 35.486 168.648 35.1644C168.358 34.8348 168.121 34.485 167.936 34.1152L168.756 33.5604Z"
                    fill="#D50F25"
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_302_8765">
                    {" "}
                    <rect
                      width="131"
                      height="40"
                      fill="white"
                      transform="translate(49.0586)"
                    />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </svg>
            </Link>
          </Logo>

          <MainNavigation
            isOpen={isNavOpen}
            onMouseLeave={isDesktop ? handleMenuMouseLeave : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            <MobileLogo>
              <Link to="/">
                <svg width="181" height="40" viewBox="0 0 181 40" fill="none">
                  {" "}
                  <path
                    d="M0 30.3201V17.1981L6.81304 13.2578V30.3201H0Z"
                    fill="#4286F5"
                  />{" "}
                  <path
                    d="M19.2229 30.3074V16.2573L16.5951 14.3594L14.1737 16.2573V24.8602H6.81348V30.3074H19.2229Z"
                    fill="#009925"
                  />{" "}
                  <path
                    d="M16.5537 7.92474V0.00195312L33.7772 9.99155V17.2254L16.5537 7.92474Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M16.5459 7.92649V0.00195312L-6.29425e-05 9.99377V17.2292L16.5459 7.92649Z"
                    fill="#D50F25"
                  />{" "}
                  <path
                    d="M16.498 38.4978V31.6848L27.5774 26.0138V13.877L33.7778 17.2275V29.4113L16.498 38.4978Z"
                    fill="#F5B400"
                  />{" "}
                  <path
                    d="M12.6523 15.4295L16.4968 12.4609L20.1954 14.9915"
                    stroke="#D50F25"
                    strokeWidth="1.11929"
                    strokeLinecap="round"
                  />{" "}
                  <g clipPath="url(#clip0_302_8765)">
                    {" "}
                    <path
                      d="M85.2861 0.00012207H88.3767C88.7229 0.00012207 89.0036 0.280765 89.0036 0.626955V3.19927H85.2861V0.00012207Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M169.274 5.14844H173.152V16.7147H179.598V19.7366H169.274V5.14844Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M154.925 16.9241L155.2 14.2357H163.161L163.413 16.9241H154.925ZM159.123 10.5053L156.875 15.2152L157.059 15.9863L155.063 19.7375H150.681L159.123 4.23242L167.589 19.7375H163.184L161.257 16.1322L161.395 15.236L159.123 10.5053Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M139.833 14.6113C140.154 15.1392 140.514 15.5977 140.911 15.9867C141.324 16.3758 141.768 16.6745 142.242 16.8829C142.731 17.0913 143.244 17.1955 143.779 17.1955C144.345 17.1955 144.812 17.0704 145.179 16.8204C145.546 16.5564 145.729 16.2021 145.729 15.7575C145.729 15.3824 145.622 15.0837 145.408 14.8614C145.194 14.6252 144.85 14.4029 144.376 14.1945C143.901 13.9861 143.274 13.7499 142.494 13.4859C142.112 13.3609 141.668 13.1872 141.164 12.9649C140.674 12.7426 140.208 12.4578 139.764 12.1105C139.321 11.7492 138.954 11.3185 138.663 10.8184C138.372 10.3043 138.227 9.68606 138.227 8.9636C138.227 8.10221 138.472 7.35891 138.961 6.7337C139.466 6.1085 140.139 5.63612 140.98 5.31657C141.837 4.98313 142.785 4.81641 143.825 4.81641C144.896 4.81641 145.821 4.97618 146.601 5.29573C147.396 5.61528 148.054 6.01819 148.574 6.50446C149.094 6.99073 149.492 7.48395 149.767 7.98411L146.807 9.48461C146.578 9.13727 146.31 8.83856 146.004 8.58848C145.714 8.3245 145.385 8.12305 145.018 7.98411C144.666 7.83129 144.284 7.75487 143.871 7.75487C143.32 7.75487 142.9 7.86602 142.609 8.08832C142.318 8.29672 142.173 8.56069 142.173 8.88024C142.173 9.21369 142.311 9.50545 142.586 9.75553C142.877 10.0056 143.282 10.2349 143.802 10.4433C144.337 10.6517 144.98 10.874 145.729 11.1101C146.295 11.3047 146.823 11.5339 147.312 11.7979C147.802 12.048 148.23 12.3536 148.597 12.7148C148.979 13.0761 149.278 13.4929 149.492 13.9652C149.706 14.4376 149.813 14.9795 149.813 15.5908C149.813 16.3271 149.645 16.9871 149.308 17.5706C148.987 18.1402 148.543 18.6196 147.977 19.0086C147.427 19.3976 146.792 19.6894 146.073 19.8839C145.37 20.0923 144.643 20.1965 143.894 20.1965C142.854 20.1965 141.883 20.0297 140.98 19.6963C140.093 19.349 139.321 18.8835 138.663 18.3C138.005 17.7165 137.493 17.0774 137.126 16.3827L139.833 14.6113Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M127.227 13.1302H131.242L136.266 19.7366H131.723L127.227 13.1302ZM123.212 5.14844H127.089V19.7366H123.212V5.14844ZM125.644 8.12858V5.14844H129.062C130.439 5.14844 131.586 5.34989 132.503 5.7528C133.421 6.15571 134.117 6.7184 134.591 7.44086C135.065 8.14942 135.302 8.97608 135.302 9.92084C135.302 10.8517 135.065 11.6784 134.591 12.4008C134.117 13.1094 133.421 13.6651 132.503 14.068C131.586 14.4709 130.439 14.6724 129.062 14.6724H125.644V11.9423H128.787C129.307 11.9423 129.75 11.8729 130.117 11.7339C130.5 11.5811 130.79 11.3658 130.989 11.0879C131.188 10.7961 131.287 10.4488 131.287 10.0459C131.287 9.64297 131.188 9.30258 130.989 9.02471C130.79 8.73295 130.5 8.51065 130.117 8.35783C129.75 8.205 129.307 8.12858 128.787 8.12858H125.644Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M111.965 19.7366V16.8398H120.064V19.7366H111.965ZM111.965 8.04522V5.14844H120.064V8.04522H111.965ZM111.965 13.4845V10.6502H119.605V13.4845H111.965ZM109.396 5.14844H113.112V19.7366H109.396V5.14844Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M99.2483 13.8596L103.171 5.14844H107.714L99.2483 20.6535L90.8057 5.14844H95.3252L99.2483 13.8596Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M85.1768 5.14844H89.1228V19.7366H85.1768V5.14844Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M78.036 5.14737H81.7756V20.4649L70.6717 11.5245V19.7355H66.9551V4.41797L78.036 13.3584V5.14737Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M50.7588 5.14844H54.636V14.6932C54.636 15.4296 54.8501 16.027 55.2783 16.4855C55.7066 16.944 56.349 17.1732 57.2055 17.1732C58.0773 17.1732 58.7273 16.944 59.1555 16.4855C59.5838 16.027 59.7979 15.4296 59.7979 14.6932V5.14844H63.6751V14.9433C63.6751 15.8603 63.5069 16.6592 63.1704 17.3399C62.8492 18.0207 62.3903 18.5834 61.7939 19.028C61.2127 19.4587 60.5244 19.7852 59.7291 20.0075C58.9491 20.2298 58.1079 20.3409 57.2055 20.3409C56.3031 20.3409 55.4619 20.2298 54.6819 20.0075C53.9018 19.7852 53.2136 19.4587 52.6171 19.028C52.0359 18.5834 51.5771 18.0207 51.2406 17.3399C50.9194 16.6592 50.7588 15.8603 50.7588 14.9433V5.14844Z"
                      fill="#D50F25"
                    />{" "}
                    <path
                      d="M56.1678 27.675H57.1929V36.1172H56.1678V27.675ZM73.2345 27.675H74.2596V36.5393L67.8677 29.8338V36.1172H66.8426V27.2529L73.2345 33.9584V27.675ZM83.0684 28.6398V27.675H88.4352V28.6398H86.2643V36.1172H85.2392V28.6398H83.0684ZM97.8042 36.1172V35.1524H102.061V36.1172H97.8042ZM97.8042 28.6398V27.675H102.061V28.6398H97.8042ZM97.8042 32.0167V31.0519H101.82V32.0167H97.8042ZM97.2373 27.675H98.2625V36.1172H97.2373V27.675ZM113.094 31.9564H114.24L117.255 36.1172H115.989L113.094 31.9564ZM111.587 27.675H112.612V36.1172H111.587V27.675ZM112.154 28.5795V27.675H113.878C114.425 27.675 114.911 27.7795 115.337 27.9886C115.772 28.1896 116.113 28.479 116.363 28.8569C116.62 29.2348 116.749 29.685 116.749 30.2076C116.749 30.7222 116.62 31.1725 116.363 31.5584C116.113 31.9363 115.772 32.2298 115.337 32.4388C114.911 32.6398 114.425 32.7403 113.878 32.7403H112.154V31.8358H113.878C114.24 31.8358 114.558 31.7715 114.831 31.6428C115.112 31.5142 115.329 31.3293 115.482 31.088C115.643 30.8468 115.723 30.5534 115.723 30.2076C115.723 29.8619 115.643 29.5684 115.482 29.3272C115.329 29.086 115.112 28.9011 114.831 28.7725C114.558 28.6438 114.24 28.5795 113.878 28.5795H112.154ZM126.054 27.675H127.079V36.1172H126.054V27.675ZM137.332 31.8961C137.332 32.5313 137.468 33.0981 137.742 33.5966C138.023 34.0951 138.405 34.489 138.887 34.7785C139.37 35.0679 139.917 35.2127 140.528 35.2127C141.147 35.2127 141.693 35.0679 142.168 34.7785C142.65 34.489 143.028 34.0951 143.302 33.5966C143.583 33.0981 143.724 32.5313 143.724 31.8961C143.724 31.2609 143.583 30.6941 143.302 30.1956C143.028 29.6971 142.65 29.3031 142.168 29.0137C141.693 28.7242 141.147 28.5795 140.528 28.5795C139.917 28.5795 139.37 28.7242 138.887 29.0137C138.405 29.3031 138.023 29.6971 137.742 30.1956C137.468 30.6941 137.332 31.2609 137.332 31.8961ZM136.246 31.8961C136.246 31.277 136.351 30.7061 136.56 30.1835C136.777 29.6529 137.078 29.1946 137.464 28.8087C137.85 28.4147 138.305 28.1092 138.827 27.8921C139.35 27.6669 139.917 27.5544 140.528 27.5544C141.147 27.5544 141.714 27.6669 142.228 27.8921C142.751 28.1092 143.205 28.4147 143.591 28.8087C143.977 29.1946 144.274 29.6529 144.483 30.1835C144.701 30.7061 144.809 31.277 144.809 31.8961C144.809 32.5071 144.701 33.078 144.483 33.6086C144.274 34.1393 143.977 34.6016 143.591 34.9956C143.205 35.3815 142.751 35.687 142.228 35.9122C141.714 36.1292 141.147 36.2378 140.528 36.2378C139.917 36.2378 139.35 36.1292 138.827 35.9122C138.305 35.687 137.85 35.3815 137.464 34.9956C137.078 34.6016 136.777 34.1393 136.56 33.6086C136.351 33.078 136.246 32.5071 136.246 31.8961ZM155.483 31.9564H156.629L159.644 36.1172H158.377L155.483 31.9564ZM153.975 27.675H155V36.1172H153.975V27.675ZM154.542 28.5795V27.675H156.267C156.814 27.675 157.3 27.7795 157.726 27.9886C158.16 28.1896 158.502 28.479 158.751 28.8569C159.009 29.2348 159.137 29.685 159.137 30.2076C159.137 30.7222 159.009 31.1725 158.751 31.5584C158.502 31.9363 158.16 32.2298 157.726 32.4388C157.3 32.6398 156.814 32.7403 156.267 32.7403H154.542V31.8358H156.267C156.629 31.8358 156.946 31.7715 157.22 31.6428C157.501 31.5142 157.718 31.3293 157.871 31.088C158.032 30.8468 158.112 30.5534 158.112 30.2076C158.112 29.8619 158.032 29.5684 157.871 29.3272C157.718 29.086 157.501 28.9011 157.22 28.7725C156.946 28.6438 156.629 28.5795 156.267 28.5795H154.542ZM168.756 33.5604C168.949 33.8981 169.15 34.1956 169.359 34.4529C169.576 34.7102 169.817 34.9112 170.083 35.0559C170.348 35.2006 170.65 35.273 170.987 35.273C171.437 35.273 171.799 35.1483 172.073 34.8991C172.346 34.6499 172.483 34.3323 172.483 33.9463C172.483 33.5684 172.394 33.2669 172.217 33.0418C172.041 32.8167 171.807 32.6358 171.518 32.4991C171.236 32.3544 170.935 32.2257 170.613 32.1132C170.404 32.0408 170.171 31.9483 169.914 31.8358C169.657 31.7152 169.411 31.5664 169.178 31.3896C168.945 31.2046 168.752 30.9795 168.599 30.7142C168.455 30.4488 168.382 30.1232 168.382 29.7373C168.382 29.3192 168.487 28.9453 168.696 28.6157C168.905 28.286 169.194 28.0288 169.564 27.8438C169.934 27.6509 170.356 27.5544 170.83 27.5544C171.289 27.5544 171.687 27.6428 172.024 27.8197C172.37 27.9885 172.664 28.2097 172.905 28.483C173.146 28.7483 173.335 29.0298 173.472 29.3272L172.591 29.8338C172.487 29.6247 172.354 29.4197 172.193 29.2187C172.032 29.0177 171.835 28.8529 171.602 28.7242C171.377 28.5956 171.1 28.5313 170.77 28.5313C170.312 28.5313 169.978 28.6438 169.769 28.869C169.56 29.086 169.456 29.3313 169.456 29.6046C169.456 29.8378 169.516 30.0549 169.636 30.2559C169.757 30.4488 169.958 30.6338 170.24 30.8107C170.529 30.9795 170.919 31.1483 171.409 31.3172C171.634 31.3976 171.872 31.5021 172.121 31.6308C172.37 31.7594 172.599 31.9242 172.808 32.1252C173.025 32.3182 173.202 32.5554 173.339 32.8368C173.476 33.1102 173.544 33.4398 173.544 33.8257C173.544 34.1956 173.472 34.5292 173.327 34.8267C173.19 35.1242 172.997 35.3775 172.748 35.5865C172.507 35.7956 172.229 35.9564 171.916 36.0689C171.61 36.1815 171.289 36.2378 170.951 36.2378C170.493 36.2378 170.067 36.1413 169.673 35.9483C169.287 35.7473 168.945 35.486 168.648 35.1644C168.358 34.8348 168.121 34.485 167.936 34.1152L168.756 33.5604Z"
                      fill="#D50F25"
                    />{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <clipPath id="clip0_302_8765">
                      {" "}
                      <rect
                        width="131"
                        height="40"
                        fill="white"
                        transform="translate(49.0586)"
                      />{" "}
                    </clipPath>{" "}
                  </defs>{" "}
                </svg>
              </Link>
            </MobileLogo>
            <CloseButton onClick={toggleNav} aria-label="Close menu">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </CloseButton>
            <NavLinks>
              {navItems.map((item, idx) =>
                item.submenu ? (
                  <NavItem
                    key={item.label}
                    onClick={(e) => handleNavItemClick(e, item)}
                    onMouseLeave={
                      isDesktop ? handleNavItemMouseLeave : undefined
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <NavLink
                        className="universal-fs-h3 universal-font-medium"
                        to={item.to || "#"}
                        onClick={(e) => handleMainNavLinkClick(e, item)}
                        style={{ flex: 1 }}
                      >
                        {item.label}
                      </NavLink>
                      {item.submenu && (
                        <DropdownArrow
                          isOpen={activeSubMenu === item.key}
                          onClick={(e) => handleDropdownArrowClick(e, item)}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            width="14"
                            height="8"
                            viewBox="0 0 20 10"
                            fill="none"
                          >
                            <path
                              d="M14.5168 2.04332L15.4001 2.92749L10.586 7.74332C10.5088 7.82095 10.4171 7.88256 10.3161 7.9246C10.215 7.96664 10.1067 7.98828 9.99721 7.98828C9.88777 7.98828 9.77942 7.96664 9.67838 7.9246C9.57733 7.88256 9.4856 7.82095 9.40846 7.74332L4.5918 2.92749L5.47513 2.04416L9.99596 6.56416L14.5168 2.04332Z"
                              fill="#222222"
                            />
                          </svg>
                        </DropdownArrow>
                      )}
                    </div>
                    <SubMenuContainer isVisible={activeSubMenu === item.key}>
                      {item.submenu.map((sub, subIdx) => (
                        <SubMenuItem
                          key={sub.to || sub.label}
                          onClick={(e) => handleSubMenuItemClick(e, sub)}
                          style={{ position: "relative" }}
                        >
                          <Link
                            className="universal-fs-h3 universal-font-medium sub-menu-link"
                            to={sub.to || "#"}
                            onClick={(e) => {
                              if (sub.submenu) {
                                e.preventDefault();
                                e.stopPropagation();
                              } else {
                                handleMenuLinkClick();
                              }
                            }}
                          >
                            {sub.label}
                          </Link>
                          {sub.submenu && (
                            <DropdownArrow
                              isOpen={activeSubSubMenu === sub.label}
                            >
                              <svg
                                width="6"
                                height="12"
                                viewBox="0 0 6 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {" "}
                                <path
                                  d="M0.0433226 1.48333L0.927489 0.599993L5.74332 5.41416C5.82095 5.4913 5.88256 5.58303 5.9246 5.68407C5.96664 5.78511 5.98828 5.89347 5.98828 6.00291C5.98828 6.11235 5.96664 6.22071 5.9246 6.32175C5.88256 6.42279 5.82095 6.51452 5.74332 6.59166L0.927489 11.4083L0.0441556 10.525L4.56416 6.00416L0.0433226 1.48333Z"
                                  fill="#222222"
                                />{" "}
                              </svg>
                            </DropdownArrow>
                          )}
                          {sub.submenu && (
                            <NestedSubMenuContainer
                              isVisible={activeSubSubMenu === sub.label}
                            >
                              <NestedSubMenuList
                                isVisible={activeSubSubMenu === sub.label}
                              >
                                {sub.submenu.map((subsub, subsubIdx) => (
                                  <NestedSubMenuItem
                                    key={subsub.to || subsub.label}
                                    onClick={(e) =>
                                      handleNestedSubMenuItemClick(e, subsub)
                                    }
                                  >
                                    <Link
                                      className="universal-fs-h3 universal-font-medium inner-menu-link"
                                      to={subsub.to || "#"}
                                      onClick={(e) => {
                                        if (subsub.submenu) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        } else {
                                          handleMenuLinkClick();
                                        }
                                      }}
                                    >
                                      {subsub.label}
                                    </Link>
                                  </NestedSubMenuItem>
                                ))}
                              </NestedSubMenuList>
                            </NestedSubMenuContainer>
                          )}
                        </SubMenuItem>
                      ))}
                    </SubMenuContainer>
                  </NavItem>
                ) : (
                  <NavItem key={item.label}>
                    <NavLink
                      className="universal-fs-h3 universal-font-medium"
                      to={item.to}
                      onClick={handleMenuLinkClick}
                    >
                      {item.label}
                    </NavLink>
                  </NavItem>
                )
              )}
            </NavLinks>
          </MainNavigation>

          <ActionButtonsContainer>
            <ConsultationForm />
            <UserIcon
              src={"/images/user-icon.webp"}
              alt={"profile"}
              loading="lazy"
              
            />
          </ActionButtonsContainer>
        </NavContainer>
      </MainHeader>
      <TopHeader />

      {/* Bottom Menu Bar for Mobile */}
      <BottomMenuBar>
        <BottomMenuContainer>
          {bottomMenuItems.map((item) => (
            <BottomMenuItem
              key={item.id}
              onClick={() => handleBottomMenuItemClick(item)}
            >
              {item.id === 2 ? (
                <BottomMenuIconConsultation
                  active={shouldShowActiveState(item.id)}
                >
                  {item.icon}
                </BottomMenuIconConsultation>
              ) : (
                <BottomMenuIcon active={shouldShowActiveState(item.id)}>
                  {item.icon}
                </BottomMenuIcon>
              )}
              <BottomMenuLabel active={shouldShowActiveState(item.id)}>
                {item.label}
              </BottomMenuLabel>
            </BottomMenuItem>
          ))}
          <BottomMenuSlider activeIndex={activeBottomMenu} />
        </BottomMenuContainer>
      </BottomMenuBar>

      {/* Consultation Modal for Bottom Menu */}
      <Modal
        open={showConsultationModal}
        onClose={() => {
          setShowConsultationModal(false);
          resetConsultationForm();
        }}
      >
        <ConsultationCloseButton
          onClick={() => {
            setShowConsultationModal(false);
            resetConsultationForm();
          }}
          className="universal-fs-h8 universal-font"
        >
          &times;
        </ConsultationCloseButton>
        <ConsultationFormContent onSuccess={handleConsultationSuccess} />
      </Modal>

      {/* Confirmation Alerts */}
      {showGuidesAlert && (
        <ConfirmationAlert
          isOpen={showGuidesAlert}
          onConfirm={() => setShowGuidesAlert(false)}
          title="Price Estimator"
          message="Price Estimator is coming soon! You'll be able to get instant cost estimates for your interior design projects."
          confirmText="OK"
          showCancel={false}
        />
      )}

      {showProfileAlert && (
        <ConfirmationAlert
          isOpen={showProfileAlert}
          onConfirm={() => setShowProfileAlert(false)}
          title="Profile"
          message="Profile section is coming soon! You'll be able to manage your account and preferences here."
          confirmText="OK"
          showCancel={false}
        />
      )}
    </HeaderContainer>
  );
};

export default Header;
