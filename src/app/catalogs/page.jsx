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

const catalogMetadata = {
  "Calplus-Ecatalogue": {
    title: "Calplus Decorative Laminates",
    cover: "https://res.cloudinary.com/sevfdaro/image/upload/v1783099839/Screenshot_2026-07-03_225751_iedui0.png"
  },
  "CATCH_PLUS_0.8MM_compressed": {
    title: "Catchplus Decorative Laminates",
    cover: "https://res.cloudinary.com/sevfdaro/image/upload/v1783099839/Screenshot_2026-07-03_225718_xguudb.png"
  },
  "Merino-Laminates-Play-E-Catalogue-2025": {
    title: "Merino Laminates",
    cover: "https://res.cloudinary.com/sevfdaro/image/upload/v1783099840/Screenshot_2026-07-03_225923_onleyb.png"
  },
  "collective-0.8mm": {
    title: "Collective Laminates",
    cover: "https://res.cloudinary.com/sevfdaro/image/upload/v1783099839/Screenshot_2026-07-03_225954_ba1dkn.png"
  }
};

const catalogOrder = [
  "Calplus-Ecatalogue",
  "CATCH_PLUS_0.8MM_compressed",
  "Merino-Laminates-Play-E-Catalogue-2025",
  "collective-0.8mm"
];

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
        
        // Parse page number to avoid alphabetical versioning/hash shuffle
        const pageNum = parseInt(parts[1], 10);
        catalogsMap[catalogName].pages.push({
          url: r.secure_url,
          pageNum: isNaN(pageNum) ? 9999 : pageNum
        });
      }
    });

    const catalogsArray = Object.keys(catalogsMap).map((key) => {
      const catalog = catalogsMap[key];
      
      // Sort pages numerically by page number
      catalog.pages.sort((a, b) => a.pageNum - b.pageNum);
      
      const pageUrls = catalog.pages.map(p => p.url);
      const meta = catalogMetadata[key] || {
        title: key.replace(/-/g, ' ').replace(/_/g, ' '),
        cover: pageUrls[0]
      };
      
      return {
        key,
        title: meta.title,
        coverImageUrl: meta.cover,
        pages: pageUrls
      };
    });

    // Sort catalogs by their specified order
    catalogsArray.sort((a, b) => {
      const idxA = catalogOrder.indexOf(a.key);
      const idxB = catalogOrder.indexOf(b.key);
      const posA = idxA === -1 ? 9999 : idxA;
      const posB = idxB === -1 ? 9999 : idxB;
      return posA - posB;
    });

    return catalogsArray.map((c, index) => ({
      id: index + 1,
      title: c.title,
      coverImageUrl: c.coverImageUrl,
      pages: c.pages
    }));
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
