import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandBar } from '../components/home/BrandBar';
import { FlashSale } from '../components/home/FlashSale';
import { CategoryHighlights } from '../components/home/CategoryHighlights';
import { ServiceCommitment } from '../components/home/ServiceCommitment';
import { TechNews } from '../components/home/TechNews';

export const HomePage = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner Carousel */}
      <HeroBanner />

      {/* Service Highlights */}
      <ServiceCommitment />

      {/* Brand Logos Strip */}
      <BrandBar />

      {/* Flash Sale Section */}
      <FlashSale />

      {/* Category Tabbed Showcase */}
      <CategoryHighlights />

      {/* Tech News & Blog */}
      <TechNews />
    </div>
  );
};
