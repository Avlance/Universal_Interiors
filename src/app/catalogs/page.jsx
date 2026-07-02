'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CatalogsLandingPage() {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/catalogs')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK' || data.statusCode === 200) {
          setCatalogs(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mt-8">
            Premium Design Catalogs
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore our exclusive, interactive design albums. Register once to unlock full access to our complete collection of masterpieces.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24 justify-items-center">
            {catalogs.map(catalog => (
              <div key={catalog.id} className="flex flex-col items-center group w-full max-w-md">
                {/* 3D Book Cover Effect (Dynamic Aspect Ratio) */}
                <Link href={`/catalogs/${catalog.slug}`} className="relative perspective-1000 w-full mb-8 transition-transform duration-300 group-hover:-translate-y-4">
                  <div className="w-full relative transform-style-3d group-hover:rotate-y-[-10deg] transition-transform duration-500 shadow-2xl rounded-xl overflow-hidden bg-white">
                    {/* Book spine lighting */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-10"></div>
                    <img 
                      src={catalog.coverImage} 
                      alt={catalog.title}
                      className="w-full h-auto block"
                    />
                  </div>
                </Link>

                <div className="flex flex-col items-center flex-grow justify-between w-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {catalog.title}
                    </h3>
                    <p className="text-base text-gray-500 px-4">
                      {catalog.description}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/catalogs/${catalog.slug}`}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-red-600 transition-colors mt-auto shadow-lg hover:shadow-xl"
                  >
                    View Catalog
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global styles for 3d perspective */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-\\[-10deg\\] { transform: rotateY(-15deg); }
      `}} />
    </div>
  );
}
