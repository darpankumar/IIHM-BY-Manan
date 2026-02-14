import axios from 'axios';
import gallery from './gallery.json';
import services from './services.json';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const getCurrentUser = () => api.get('/auth/me');

// Public Appointments
export const createAppointment = (data) => api.post('/appointments', data);

// Public Contacts
export const createContact = (data) => api.post('/contacts', data);

// Public Gallery
// export const getGallery = (category) => api.get('/gallery', { params: { category } });



export const getGallery = async (category) => Promise.resolve(gallery);

// Public Services
//export const getServices = (category) => api.get('/services', { params: { category } });

console.log("services", services);

export const getServices = (category) => Promise.resolve(services);

// Admin Appointments
export const getAllAppointments = () => api.get('/admin/appointments');
export const getTodayAppointments = () => api.get('/admin/appointments/today');
export const updateAppointment = (id, data) => api.patch(`/admin/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/admin/appointments/${id}`);

// Admin Contacts
export const getAllContacts = () => api.get('/admin/contacts');
export const deleteContact = (id) => api.delete(`/admin/contacts/${id}`);

// Admin Gallery
export const createGalleryImage = (data) => api.post('/admin/gallery', data);
export const deleteGalleryImage = (id) => api.delete(`/admin/gallery/${id}`);

// Admin Services
export const createService = (data) => api.post('/admin/services', data);
export const updateService = (id, data) => api.patch(`/admin/services/${id}`, data);
export const deleteService = (id) => api.delete(`/admin/services/${id}`);
