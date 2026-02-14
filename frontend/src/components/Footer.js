import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">IIHM By Manan</h3>
            <p className="text-gray-400 text-sm">
              Premium salon and academy in Ambala City, offering professional hair services,
              grooming, bridal makeup, and beauty courses.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">
                  IIhm By Manan, near Surya Hotel, Old Town, Ambala, Haryana 134003, India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500" />
                <p className="text-gray-400">+91 7206975263</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500" />
                <p className="text-gray-400">manansingh800@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <p className="text-gray-400">10:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/services" className="block text-gray-400 hover:text-amber-500 transition-colors">
                Services
              </a>
              {/* <a href="/booking" className="block text-gray-400 hover:text-amber-500 transition-colors">
                Book Appointment
              </a> */}
              <a href="/gallery" className="block text-gray-400 hover:text-amber-500 transition-colors">
                Gallery
              </a>
              <a href="/contact" className="block text-gray-400 hover:text-amber-500 transition-colors">
                Contact Us
              </a>
              <a href="/admin/login" className="block text-gray-400 hover:text-amber-500 transition-colors">
                Admin Login
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} IIHM By Manan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
