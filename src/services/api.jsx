/**
 * API Service for handling HTTP requests
 */
class ApiService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  }

  /**
   * Get auth headers
   * @returns {Object} Headers with authorization
   */
  getAuthHeaders() {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('user_token');
    }
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Make HTTP request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  async request(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        throw new Error(errorData?.message || `API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // GET request
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  // POST request
  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

export const apiService = new ApiService(); 
