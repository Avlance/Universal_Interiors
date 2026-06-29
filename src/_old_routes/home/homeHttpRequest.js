"use client";
import { apiService } from '../../services/api.jsx';
import {
  COST_ESTIMATION_URL,
  LIVE_CONSULTATION,
  YOUTUBE_REVIEWS_API_URL,
  REVIEWS_API_URL,
  BOOK_CONSULTATION_API_URL,
  SEND_OTP_API_URL,
  VERIFY_OTP_API_URL
} from "./homeHttpUrls";

export async function submitEstimation(payload) {
  return apiService.post(COST_ESTIMATION_URL, payload);
}

export async function getGoogleReviews() {
  return apiService.get(REVIEWS_API_URL);
}

export async function getYoutubeReviews() {
  return apiService.get(YOUTUBE_REVIEWS_API_URL);
}

export async function liveConsultation(payload) {
  return await apiService.post(LIVE_CONSULTATION, payload);
}

export async function sendOTP(payload) {
  // payload must include { phone, channel: 'sms' | 'whatsapp' }
  return apiService.post(SEND_OTP_API_URL, payload);
}

export async function verifyOTP(payload) {
  return apiService.post(VERIFY_OTP_API_URL, payload);
}

export async function freeConsultation(payload) {
  return apiService.post(BOOK_CONSULTATION_API_URL, payload);
}
