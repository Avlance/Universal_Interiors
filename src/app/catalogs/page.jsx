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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Premium Design Catalogs
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore our exclusive, interactive design albums. Register once to unlock full access to our complete collection of masterpieces.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {catalogs.map(catalog => (
              <div key={catalog.id} className="flex flex-col items-center group">
                {/* 3D Book Cover Effect */}
                <Link href={`/catalogs/${catalog.slug}`} className="relative perspective-1000 w-64 h-80 mb-6 transition-transform duration-300 group-hover:-translate-y-4">
                  <div className="w-full h-full absolute transform-style-3d group-hover:rotate-y-[-10deg] transition-transform duration-500 shadow-2xl rounded-r-lg rounded-l-sm overflow-hidden bg-white">
                    {/* Book spine lighting */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
                    <img 
                      src={catalog.coverImage} 
                      alt={catalog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {catalog.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-4 px-2">
                  {catalog.description}
                </p>
                
                <Link 
                  href={`/catalogs/${catalog.slug}`}
                  className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  View Catalog
                </Link>
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
