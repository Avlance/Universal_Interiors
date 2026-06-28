"use client";
import React, { useRef } from 'react';
import Layout from '../../components/layout/Layout.jsx';
import HeroBanner from './sections/HeroBanner.jsx';
import Services from './sections/Services.jsx';
import DesignIdeas from './sections/DesignIdeas.jsx';
import BlogSection from './sections/BlogSection.jsx';
import DesignerInfo from './sections/BrandPartners.jsx';
import ChooseUs from './sections/ChooseUs.jsx';
import CostEstimator from './sections/CostEstimator.jsx';
import GoogleReviews from './sections/GoogleReviews.jsx';
import YouTubeReviews from './sections/YouTubeReviews.jsx';
import FactoryTour from './sections/FactoryTour.jsx';
import RoadMap from './sections/Roadmap.jsx';
import ReviewSlider from '../../components/ReviewSlider.jsx';

const HomePage = () => {
  const costEstimatorRef = useRef(null);
  return (
    <Layout>
      <HeroBanner costEstimatorRef={costEstimatorRef} />
      <Services />
      <DesignIdeas />
      <ChooseUs />
      <CostEstimator ref={costEstimatorRef} />
      <YouTubeReviews />
      <FactoryTour />
      <GoogleReviews />
      <ReviewSlider />
      <RoadMap />
      <BlogSection />
      <DesignerInfo />
    </Layout>
  );
};

export default HomePage; 

