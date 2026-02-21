import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/**
 * Subscribe email for early access.
 * @param {string} email
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function subscribeEmail(email) {
  const { data } = await api.post('/subscribe', { email });
  return data;
}

/**
 * Get contact config (e.g. WhatsApp number) for support.
 * @returns {Promise<{ success: boolean, whatsappNumber: string }>}
 */
export async function getContact() {
  const { data } = await api.get('/contact');
  return data;
}

export default api;
