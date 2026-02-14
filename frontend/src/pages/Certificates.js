import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getGallery } from '../utils/api';
import { toast } from 'sonner';
import { Award } from 'lucide-react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await getGallery('certificates');
      setCertificates(response.data);
    } catch (error) {
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="certificates-title">
            Certifications
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Our professional certifications and achievements
          </p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="py-16 bg-gray-50" data-testid="certificates-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
              <p className="mt-4 text-gray-600">Loading certificates...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No certificates available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  data-testid={`certificate-${cert.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.title || 'Certificate'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  {cert.title && (
                    <div className="p-4">
                      <p className="text-center font-semibold text-gray-900">{cert.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Certificates;
