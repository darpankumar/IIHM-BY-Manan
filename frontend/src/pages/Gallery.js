import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getGallery } from '../utils/api';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getGallery();
      setImages(response.data);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'salon_interior', name: 'Salon Interior' },
    { id: 'service_work', name: 'Our Work' },
    { id: 'students', name: 'Students' }
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? images.filter(img => img.category !== 'certificates')
      : images.filter(img => img.category === selectedCategory);

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl text-gray-100">
            Explore our salon, work, and talented students
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto py-4 flex justify-center gap-3 flex-wrap">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition ${
                selectedCategory === category.id
                  ? 'bg-amber-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">Loading gallery...</div>
          ) : (
            // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredImages.map(item => (
                <div
                  key={item.id}
                  className="relative cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.media_type === 'video' ? (
                    <>
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-xl">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-72 object-cover"
                    />
                  )}

                  {item.title && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white">{item.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {selectedMedia.media_type === 'video' ? (
            <video
              src={selectedMedia.media_url}
              controls
              autoPlay
              className="max-w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={selectedMedia.image_url}
              alt={selectedMedia.title}
              className="max-w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
