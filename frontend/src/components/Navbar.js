// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Phone, Mail, MapPin } from 'lucide-react';

// const Navbar = () => {
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <Link to="/" className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-500 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-xl">IIHM</span>
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">IIHM By Manan</h1>
//               <p className="text-xs text-gray-600">Premium Salon & Academy</p>
//             </div>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               to="/"
//               className={`text-sm font-medium transition-colors ${
//                 isActive('/') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
//               }`}
//               data-testid="nav-home"
//             >
//               Home
//             </Link>
//             <Link
//               to="/services"
//               className={`text-sm font-medium transition-colors ${
//                 isActive('/services') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
//               }`}
//               data-testid="nav-services"
//             >
//               Services
//             </Link>
//             <Link
//               to="/gallery"
//               className={`text-sm font-medium transition-colors ${
//                 isActive('/gallery') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
//               }`}
//               data-testid="nav-gallery"
//             >
//               Gallery
//             </Link>
//             {/* <Link
//               to="/certificates"
//               className={`text-sm font-medium transition-colors ${
//                 isActive('/certificates') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
//               }`}
//               data-testid="nav-certificates"
//             >
//               Certificates
//             </Link> */}
//             <Link
//               to="/contact"
//               className={`text-sm font-medium transition-colors ${
//                 isActive('/contact') ? 'text-amber-700' : 'text-gray-700 hover:text-amber-700'
//               }`}
//               data-testid="nav-contact"
//             >
//               Contact
//             </Link>
//             {/* <Link
//               to="/booking"
//               className="btn-primary text-sm"
//               data-testid="nav-booking"
//             >
//               Book Now
//             </Link> */}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl tracking-wide">
                IIHM
              </span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                IIHM By Manan
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Premium Salon & Academy
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-sm font-medium group"
              >
                <span
                  className={`transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-amber-700'
                      : 'text-gray-700 group-hover:text-amber-700'
                  }`}
                >
                  {link.name}
                </span>

                {/* Animated underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-amber-700 transition-all duration-300 ${
                    isActive(link.path)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}

            {/* Premium Button */}
            <Link
              to="/booking"
              className="ml-4 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-amber-700 to-amber-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none transition-transform duration-300"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-lg border-t px-6 py-6 space-y-5">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-medium transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-amber-700'
                  : 'text-gray-700 hover:text-amber-700'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Button */}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-4 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-700 to-amber-500 rounded-full shadow-md"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
