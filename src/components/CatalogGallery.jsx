"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { BookOpen } from 'lucide-react';

// Dynamically import the flipbook component to prevent SSR issues
const ImageFlipbook = dynamic(() => import('./ImageFlipbook'), { ssr: false });

export default function CatalogGallery({ initialCatalogs = [] }) {
  const [selectedCatalog, setSelectedCatalog] = useState(null);

  return (
    <div className="w-full min-h-screen bg-white py-16 md:py-24 flex flex-col items-center">

      {/* 1. HEADER SECTION */}
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight universal-font-bold">
          Premium Design Catalogs
        </h2>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed universal-font-medium">
          Explore our latest collections of interior designs. Click on any catalog to read it in our immersive 3D viewer.
        </p>
      </div>

      {/* 
        FOOLPROOF SPACER: 
        This empty div forces a strict 6rem (96px) gap on desktop and 4rem (64px) gap on mobile. 
        It cannot collapse or be ignored by Tailwind. 
      */}
      <div className="w-full h-16 md:h-24 flex-none"></div>

      {/* 2. GRID WRAPPER */}
      <div className="w-full px-4 flex justify-center">

        {/* 3. THE GRID: 2 columns, centered, with maximum width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">

          {initialCatalogs.map((catalog) => (
            <div
              key={catalog.id}
              className="group relative cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col overflow-hidden mx-auto w-full max-w-[420px]"
              onClick={() => setSelectedCatalog(catalog)}
            >

              {/* 4. UNIFORM COVERS */}
              <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden flex-shrink-0">
                <img
                  src={catalog.coverImageUrl}
                  alt={catalog.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center">
                    <span className="bg-white text-black p-4 rounded-full mb-4 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      <BookOpen size={28} className="stroke-[1.5]" />
                    </span>
                    <span className="text-white font-semibold text-lg tracking-wide drop-shadow-md universal-font-semibold">
                      Read Catalog
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. REFINED TITLE TAB */}
              <div className="p-6 flex-grow border-t border-gray-100 flex flex-col items-center justify-center bg-white min-h-[96px]">
                <h3 className="text-lg font-bold text-gray-900 text-center line-clamp-2 leading-snug tracking-wide universal-font-semibold">
                  {catalog.title}
                </h3>
                <span className="mt-2 text-xs font-bold text-amber-700 tracking-widest uppercase universal-font-medium">
                  {catalog.pages ? `${catalog.pages.length} Pages` : '0 Pages'}
                </span>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Renders the flipbook when a catalog is clicked */}
      {selectedCatalog && (
        <ImageFlipbook
          pages={selectedCatalog.pages}
          onClose={() => setSelectedCatalog(null)}
        />
      )}
    </div>
  );
}