import React from 'react';
import SplashScreen from '@/components/layout/SplashScreen';

export default function Loading() {
  // Next.js will automatically show this loading component
  // globally while any server component is fetching data.
  return <SplashScreen />;
}
