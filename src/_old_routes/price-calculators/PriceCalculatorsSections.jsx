"use client";
import React from "react";
import { useParams } from '@/utils/react-router-dom';
import PriceCalculators from "./PriceCalculators";

const PriceCalculatorsSections = () => {
  const { category } = useParams();

  // This component handles different price calculator sections
  // It renders the main PriceCalculators component which handles the routing logic internally

  return <PriceCalculators />;
};

export default PriceCalculatorsSections;


