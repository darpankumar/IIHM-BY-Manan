import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Certificates from './pages/Certificates';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminContacts from './pages/admin/AdminContacts';
import AdminGallery from './pages/admin/AdminGallery';
import AdminServices from './pages/admin/AdminServices';
import { Toaster } from '@/components/ui/sonner';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/certificates" element={<Certificates />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/appointments" element={<ProtectedRoute><AdminAppointments /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        </Routes>
        <WhatsAppButton />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
