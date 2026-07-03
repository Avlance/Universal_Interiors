import React from 'react';
import CatalogGallery from '@/components/CatalogGallery';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const metadata = {
  title: 'Premium Design Catalogs | Universal Interiors',
  description: 'Explore our latest collections of interior designs in our interactive 3D flipbook viewer.',
};

// Revalidate every hour
export const revalidate = 3600; 

const customCovers = {
  "CATCH PLUS 0.8MM compressed": "https://res.cloudinary.com/sevfdaro/image/upload/v1783099839/Screenshot_2026-07-03_225718_xguudb.png",
  "Calplus Ecatalogue": "https://res.cloudinary.com/sevfdaro/image/upload/v1783099839/Screenshot_2026-07-03_225751_iedui0.png",
  "collective 0.8mm": "https://res.cloudinary.com/sevfdaro/image/upload/v1783099839/Screenshot_2026-07-03_225954_ba1dkn.png",
  "Merino Laminates Play E Catalogue 2025": "https://res.cloudinary.com/sevfdaro/image/upload/v1783099840/Screenshot_2026-07-03_225923_onleyb.png"
};

async function fetchCatalogs() {
  try {
    const res = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('public_id', 'asc')
      .max_results(500)
      .execute();
      
    const catalogsMap = {};
    
    res.resources.forEach(r => {
      // Grouping logic based on Universal Interiors specific Cloudinary naming convention
      if (r.public_id.includes('_page-')) {
        const parts = r.public_id.split('_page-');
        const catalogName = parts[0];
        
        if (!catalogsMap[catalogName]) {
          catalogsMap[catalogName] = {
            title: catalogName.replace(/-/g, ' ').replace(/_/g, ' '),
            pages: []
          };
        }
        catalogsMap[catalogName].pages.push(r.secure_url);
      }
    });

    const catalogsArray = Object.keys(catalogsMap).map((key, index) => {
      const catalog = catalogsMap[key];
      catalog.pages.sort();
      return {
        id: index + 1,
        title: catalog.title,
        coverImageUrl: customCovers[catalog.title] || catalog.pages[0],
        pages: catalog.pages
      };
    });

    return catalogsArray;
  } catch (error) {
    console.error("Failed to fetch catalogs from Cloudinary:", error);
    return [];
  }
}

export default async function CatalogsPage() {
  const catalogs = await fetchCatalogs();

  return (
    <main className="min-h-screen bg-white pt-24">
      {catalogs.length > 0 ? (
        <CatalogGallery initialCatalogs={catalogs} />
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-gray-500 text-lg">No catalogs available right now. Please check back later.</p>
        </div>
      )}
    </main>
  );
}
