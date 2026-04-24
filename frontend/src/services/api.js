// src/services/api.js

// 🔴 LOCALHOST KI JAGAH RENDER WALA LINK DAAL DIYA HAI
const BASE_URL = 'https://vocallocal-lrje.onrender.com/api';

// ─── TOKEN HELPERS ─── (localStorage use karo — App.js ke saath consistent)
const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch(e) { return null; }
};

const setToken = (token) => {
  try {
    localStorage.setItem('token', token);
    console.log('✅ Token saved!');
  } catch(e) {
    console.error('❌ Token save failed:', e);
  }
};

const removeToken = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  } catch(e) {}
};

// ─── HEADERS ───
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const headers = () => ({
  'Content-Type': 'application/json',
});

// ─── AUTH APIs ───

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  setToken(data.token);
  localStorage.setItem('userData', JSON.stringify(data));
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  setToken(data.token);
  localStorage.setItem('userData', JSON.stringify(data));
  return data;
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const updateProfile = async (profileData) => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const applyProfessional = async (proData) => {
  const res = await fetch(`${BASE_URL}/auth/apply-pro`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(proData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const logoutUser = () => {
  removeToken();
};

// ─── SERVICES APIs ───

export const getProfessionals = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/services?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const getProfessionalById = async (id) => {
  const res = await fetch(`${BASE_URL}/services/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ─── BOOKING APIs ───

export const createBooking = async (bookingData) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(bookingData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const getMyBookings = async () => {
  const res = await fetch(`${BASE_URL}/bookings/my`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const cancelBooking = async (id) => {
  const res = await fetch(`${BASE_URL}/bookings/${id}/cancel`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ─── ADMIN APIs ───

export const addProfessional = async (proData) => {
  const res = await fetch(`${BASE_URL}/services`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(proData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deleteProfessional = async (id) => {
  const res = await fetch(`${BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
};

export const getAllBookings = async () => {
  const res = await fetch(`${BASE_URL}/bookings/all`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const approveExpert = async (id) => {
  const res = await fetch(`${BASE_URL}/auth/admin/approve-pro/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};