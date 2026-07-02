'use client';
import React, { useState, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { toast } from 'react-hot-toast';
import { FaWhatsapp, FaInfoCircle, FaLock } from 'react-icons/fa';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page bg-white shadow-lg overflow-hidden relative" ref={ref} onContextMenu={(e) => e.preventDefault()}>
      <div className="w-full h-full relative group">
        <img 
          src={props.image} 
          alt={`Page ${props.number}`} 
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable="false"
        />
        
        {/* Anti-theft watermark */}
        {props.watermark && (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none transform -rotate-45 text-3xl font-bold whitespace-nowrap z-10 overflow-hidden">
            <span>UNIVERSAL INTERIORS</span>
            <span>{props.watermark}</span>
          </div>
        )}

        {/* Lock Overlay for Teaser Mode */}
        {props.isLocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <FaLock className="text-white text-5xl mb-4" />
            <h3 className="text-white text-2xl font-bold mb-2">Premium Content</h3>
            <p className="text-gray-200 text-center px-6 mb-6">Register to view the rest of this premium design catalog.</p>
            <button 
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); props.onUnlock(); }}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition relative z-50 cursor-pointer pointer-events-auto"
            >
              Unlock Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
Page.displayName = 'Page';

export default function FlipbookViewer({ catalog, userPhone, onUnlockRequest }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1000);
  const flipBook = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onPage = (e) => {
    setCurrentPage(e.data);
  };

  const handleInquire = async () => {
    try {
      const res = await fetch('/api/catalogs/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: userPhone || 'Guest',
          catalogSlug: catalog.slug,
          pageIndex: currentPage,
        })
      });
      if (res.ok) {
        toast.success("Inquiry sent! Our team will contact you about this design.");
      } else {
        toast.error("Failed to send inquiry.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out this amazing design catalog from Universal Interiors! ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const isMobile = windowWidth < 768;
  const bookWidth = isMobile ? windowWidth : Math.min(windowWidth * 0.9, 1200) / 2;
  // Adjusted for landscape PDF pages (width > height). Assuming a standard 16:9 or 4:3 landscape ratio per page.
  const bookHeight = isMobile ? windowWidth * 0.75 : bookWidth * 0.75;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full py-8 relative">
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 md:bottom-8 right-8 flex flex-col gap-4 z-[9999] items-end pointer-events-none">
        <button 
          onTouchStart={(e) => e.stopPropagation()}
          onClick={handleInquire}
          className="bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center hover:scale-110 pointer-events-auto"
          title="Inquire about this design"
        >
          <FaInfoCircle className="text-2xl" />
        </button>
        <button 
          onTouchStart={(e) => e.stopPropagation()}
          onClick={handleShare}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1ebe5d] transition-all flex items-center justify-center hover:scale-110 pointer-events-auto"
          title="Share via WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </button>
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{catalog.title}</h1>
        <p className="text-gray-500 mt-2">
          Page {currentPage + 1} of {catalog.pages.length}
        </p>
      </div>

      {/* react-pageflip requires precise dimension handling */}
      <div className="w-full max-w-[1200px] mx-auto flex justify-center items-center shadow-2xl bg-gray-50/50 p-4 rounded-xl">
        <HTMLFlipBook 
          width={bookWidth} 
          height={bookHeight} 
          size="stretch"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="flip-book"
          ref={flipBook}
          usePortrait={isMobile}
          flippingTime={1000}
        >
          {catalog.pages.map((imgUrl, i) => {
            const isLocked = !catalog.isAuthorized && i >= catalog.teaserLimit;
            return (
              <Page 
                key={i} 
                number={i + 1} 
                image={imgUrl} 
                watermark={userPhone} 
                isLocked={isLocked}
                onUnlock={onUnlockRequest}
              />
            );
          })}
        </HTMLFlipBook>
      </div>
      
      <div className="mt-8 text-gray-400 text-sm flex gap-4">
        <span>Click or drag page corners to turn</span>
      </div>
    </div>
  );
}
