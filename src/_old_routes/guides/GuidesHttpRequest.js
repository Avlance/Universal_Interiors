"use client";
import { apiService } from "../../services/api.jsx";
import { GUIDES_API_URL } from "./GuidesHttpUrls";

export async function getGuides() {
    return apiService.get(GUIDES_API_URL);
  }
  
  export async function getGuidesItems(category, subCategory, offset = 0) {
    return apiService.get(`${GUIDES_API_URL}/${category}/${subCategory}?offset=${offset}`);
  }
  
  export async function getParticularGuides(category, subCategory, designId) {
    return apiService.get(`${GUIDES_API_URL}/${category}/${subCategory}/${designId}`);
  } 

