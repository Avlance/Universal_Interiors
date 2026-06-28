"use client";
import { apiService } from '../../services/api.jsx';
import { DESIGN_GALLERY_API_URL } from "./DesignGalleryHttpUrls";

export async function getDesignGallery() {
  try {
    return await apiService.get(DESIGN_GALLERY_API_URL);
  } catch (error) {
    console.warn("Backend unavailable, using mock data for Design Gallery");
    return {
      data: [
        {
          name: "Rooms & Spaces",
          category: "rooms-and-spaces",
          categoryItems: [
            { name: "Living Room", count: 10, subCategory: "living-room", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657665/local_assets_migrated/guides/WardrobeGallery/Image1.webp" },
            { name: "Master Bedroom", count: 15, subCategory: "master-bedroom", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657666/local_assets_migrated/guides/WardrobeGallery/Image2.webp" },
            { name: "Kids Bedroom", count: 5, subCategory: "kids-bedroom", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657667/local_assets_migrated/guides/WardrobeGallery/Image3.webp" }
          ]
        },
        {
          name: "Kitchen Designs",
          category: "kitchen-designs",
          categoryItems: [
            { name: "Modular Kitchen", count: 20, subCategory: "modular-kitchen", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664260/azure_migrated/guides/kitchen-guide/kitchen-rectangle.webp" },
            { name: "Custom Kitchen", count: 12, subCategory: "custom-kitchen", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782664260/azure_migrated/guides/kitchen-guide/kitchen-rectangle.webp" }
          ]
        }
      ]
    };
  }
}

export async function getDesignGalleryItems(category, subCategory, offset = 0) {
  try {
    return await apiService.get(`${DESIGN_GALLERY_API_URL}/${category}/${subCategory}?offset=${offset}`);
  } catch (error) {
    console.warn("Backend unavailable, using mock data for Design Gallery Items");
    return {
      data: {
        items: [
           { id: "1", name: "Modern Concept 1", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657665/local_assets_migrated/guides/WardrobeGallery/Image1.webp" },
           { id: "2", name: "Elegant Design 2", previewImage: "https://res.cloudinary.com/sevfdaro/image/upload/v1782657666/local_assets_migrated/guides/WardrobeGallery/Image2.webp" }
        ],
        hasMore: false
      }
    };
  }
}

export async function getParticularDesigns(category, subCategory, designId) {
  return apiService.get(`${DESIGN_GALLERY_API_URL}/${category}/${subCategory}/${designId}`);
} 

