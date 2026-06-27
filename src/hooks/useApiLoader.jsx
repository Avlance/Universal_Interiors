"use client";
import { useState, useCallback } from 'react';

/**
 * useApiLoader - A hook to manage loading and error state for API calls
 * @returns {Object} { loading, error, callApi }
 *
 * Usage:
 *   const { loading, error, callApi } = useApiLoader();
 *   useEffect(() => {
 *     callApi(() => apiService.getReviews()).then(setData);
 *   }, []);
 */
export default function useApiLoader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (apiFn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setLoading(false);
      return result;
    } catch (err) {
      if (err?.message && err.status === 'error') {
        setError(err.message);
      } else if (err?.message) {
        setError(err.message);
      } else if (err?.response?.message) {
        setError(err.response.message);
      } else {
        setError('API call failed');
      }
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, callApi };
} 

