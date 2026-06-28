"use client";
import { getDesignGallery, getDesignGalleryItems } from './DesignGalleryHttpRequest';

/**
 * Fetches design gallery data from API and transforms it
 * @returns {Promise<Object>} Object containing transformed data, loading state, and error
 */
export const fetchAndTransformDesignGallery = async () => {
  try {
    const response = await getDesignGallery();

    if (response?.data) {
      const transformedCategories = transformCategories(response.data);
      return {
        data: transformedCategories,
        loading: false,
        error: null
      };
    } else {
      return {
        data: [],
        loading: false,
        error: 'No data received from API'
      };
    }
  } catch (err) {
    console.error('Error fetching design gallery:', err);
    return {
      data: [],
      loading: false,
      error: 'Failed to load design gallery'
    };
  }
};

/**
 * Transforms API response data to match the component's expected structure
 * @param {Array} apiData - The data array from API response
 * @returns {Array} Transformed categories with designs
 */
export const transformCategories = (apiData) => {
  return apiData.map(category => ({
    title: category.name,
    description: `${category.name.toLowerCase()}`,
    icon: category.name === 'Rooms & Spaces' ? '🏠' : '🍳',
    category: category.category, // Add category field for URL generation
    designs: category.categoryItems.map((item, index) => ({
      title: item.name,
      description: `${item.count || '50'}+ Designs Available`,
      link: `/design-gallery/${category.category}/${item.subCategory}`,
      image: `https://res.cloudinary.com/sevfdaro/image/upload/v1/local_assets_migrated/home/design-ideas/living-room-${index + 1}.webp`,
      fill: index % 2 === 0 ? '#D50F25' : '#5485EE',
      subCategory: item.subCategory, // Add subCategory field for reference
      count: item.count,
      previewImage: item.previewImage
    }))
  }));
};

/**
 * Gets category icon based on category name
 * @param {string} categoryName - The name of the category
 * @returns {string} Emoji icon for the category
 */
export const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'Rooms & Spaces': '🏠',
    'Kitchen Designs': '🍳',
    'Specialty Designs': '✨',
    'Apartment Layouts': '🏢'
  };
  return iconMap[categoryName] || '🏠';
};

/**
 * Generates design card fill color based on index
 * @param {number} index - The index of the design item
 * @returns {string} Hex color code
 */
export const getDesignFillColor = (index) => {
  const colors = ['#D50F25', '#5485EE', '#559944', '#FAC73D'];
  return colors[index % colors.length];
};

/**
 * Fetches design gallery items for a specific category and subcategory
 * @param {string} category - The main category (e.g., 'rooms-and-spaces')
 * @param {string} subCategory - The subcategory (e.g., 'master-bedroom')
 * @param {number} offset - Pagination offset
 * @returns {Promise<Object>} Object containing transformed items, loading state, and error
 */
export const fetchAndTransformDesignGalleryItems = async (category, subCategory, offset = 0) => {
  try {
    const response = await getDesignGalleryItems(category, subCategory, offset);

    if (response?.data?.items) {
      const transformedItems = response.data.items.map((item, index) => ({
        id: item.id,
        title: item.name,
        image: item.previewImage,
        description: `Beautiful ${subCategory.replace('-', ' ')} design with modern aesthetics and functional layout.`,
        fill: getDesignFillColor(index),
        category: category, // Add category for modal
        subCategory: subCategory, // Add subCategory for modal
        name: item.name, // Add name for modal
        previewImage: item.previewImage // Add previewImage for modal
      }));

      return {
        data: transformedItems,
        hasMore: response.data.hasMore,
        loading: false,
        error: null
      };
    } else {
      return {
        data: [],
        hasMore: false,
        loading: false,
        error: 'No items received from API'
      };
    }
  } catch (err) {
    console.error('Error fetching design gallery items:', err);
    return {
      data: [],
      hasMore: false,
      loading: false,
      error: 'Failed to load design gallery items'
    };
  }
}; 

