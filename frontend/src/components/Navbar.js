import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">IIHM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">IIHM By Manan</h1>
              <p className="text-xs text-gray-600">Premium Salon & Academy</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                isActive('/services') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
              }`}
              data-testid="nav-services"
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className={`text-sm font-medium transition-colors ${
                isActive('/gallery') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
              }`}
              data-testid="nav-gallery"
            >
              Gallery
            </Link>
            {/* <Link
              to="/certificates"
              className={`text-sm font-medium transition-colors ${
                isActive('/certificates') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
              }`}
              data-testid="nav-certificates"
            >
              Certificates
            </Link> */}
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
              }`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
            {/* <Link
              to="/booking"
              className="btn-primary text-sm"
              data-testid="nav-booking"
            >
              Book Now
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
