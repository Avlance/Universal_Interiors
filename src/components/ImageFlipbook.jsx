"use client";

import React, { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageFlipbook({ pages = [], onClose }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const flipBookRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextButtonClick = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const isMobile = windowWidth < 768;

  if (!pages || pages.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">

      {/* Top Controls Header */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-4">
        <button
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/25 rounded-full text-white backdrop-blur-md transition-all shadow-lg"
          aria-label="Close viewer"
        >
          <X size={24} />
        </button>
      </div>

      <div className="w-[95vw] md:w-[95vw] h-[90vh] max-w-none mx-auto flex justify-center items-center relative">

        {/* Desktop Previous Button */}
        {!isMobile && (
          <button
            onClick={prevButtonClick}
            className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all backdrop-blur-md hidden md:flex shadow-lg z-10 hover:scale-110"
            aria-label="Previous page"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Flipbook Container */}
        <div className="shadow-2xl drop-shadow-2xl z-0 w-[90%] md:w-[85%] h-[85%] flex justify-center items-center">
          <HTMLFlipBook
            // THE FIX: Wide Landscape dimensions to match your source images perfectly
            width={900}
            height={600}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={250}
            maxHeight={700}
            drawShadow={true}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={isMobile}
            ref={flipBookRef}
            className="bg-transparent"
            flippingTime={800}
          >
            {pages.map((imgUrl, index) => (
              // Using bg-white so the page looks like clean paper, blending with your images
              <div key={index} className="w-full h-full bg-white flex justify-center items-center overflow-hidden">
                <img
                  src={imgUrl}
                  alt={`Page ${index + 1}`}
                  // object-contain is now safe because the page shape is wide like the image
                  className="w-full h-full object-contain object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        {/* Desktop Next Button */}
        {!isMobile && (
          <button
            onClick={nextButtonClick}
            className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all backdrop-blur-md hidden md:flex shadow-lg z-10 hover:scale-110"
            aria-label="Next page"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      {/* Mobile Controls Overlay */}
      {isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 z-50 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
          <button
            onClick={prevButtonClick}
            className="p-2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="w-px h-6 bg-white/20"></div>
          <button
            onClick={nextButtonClick}
            className="p-2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}