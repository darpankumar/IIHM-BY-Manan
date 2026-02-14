import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getServices } from '../utils/api';
import { Scissors, Users, Sparkles, GraduationCap, Clock, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      console.log('asdas', response);
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Services', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'hair', name: 'Hair Services', icon: <Scissors className="w-5 h-5" /> },
    { id: 'grooming', name: 'Grooming', icon: <Users className="w-5 h-5" /> },
    { id: 'bridal', name: 'Bridal & Makeup', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'academy', name: 'Academy', icon: <GraduationCap className="w-5 h-5" /> }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="services-title">
            Our Services
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Explore our comprehensive range of professional beauty and grooming services
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white shadow-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`category-${category.id}`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-gray-50" data-testid="services-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No services found in this category.</p>
              <p className="text-gray-500 mt-2">Contact us to learn more about our offerings!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  data-testid={`service-item-${service.id}`}
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    {service.description && (
                      <p className="text-gray-600 mb-4">{service.description}</p>
                    )}
                    <div className="space-y-2">
                      {service.duration && (
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-4 h-4 mr-2 text-amber-700" />
                          <span className="text-sm">{service.duration}</span>
                        </div>
                      )}
                      {service.price && (
                        <div className="flex items-center text-gray-700">
                          <IndianRupee className="w-4 h-4 mr-2 text-amber-700" />
                          <span className="text-sm font-semibold">₹{service.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link
                      to="/booking"
                      className="block w-full text-center btn-primary"
                      data-testid={`book-service-${service.id}`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Book?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Schedule your appointment today and experience premium beauty services
          </p>
          {/* <Link to="/booking" className="btn-primary" data-testid="cta-booking-btn">
            Book Appointment
          </Link> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
