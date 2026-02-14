import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGallery, createGalleryImage, deleteGalleryImage } from '../../utils/api';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState({
    category: 'salon_interior',
    image_url: '',
    title: ''
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getGallery();
      setImages(response.data);
    } catch (error) {
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'salon_interior', name: 'Salon Interior' },
    { id: 'service_work', name: 'Service Work' },
    { id: 'students', name: 'Students' },
    { id: 'certificates', name: 'Certificates' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handleAddImage = async (e) => {
    e.preventDefault();
    
    if (!newImage.image_url || !newImage.category) {
      toast.error('Please provide image URL and category');
      return;
    }

    try {
      const response = await createGalleryImage(newImage);
      setImages([...images, response.data]);
      toast.success('Image added successfully');
      setIsAddDialogOpen(false);
      setNewImage({ category: 'salon_interior', image_url: '', title: '' });
    } catch (error) {
      toast.error('Failed to add image');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await deleteGalleryImage(id);
      setImages(images.filter(img => img.id !== id));
      toast.success('Image deleted successfully');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-gallery-title">
                  Gallery Management
                </h1>
                <p className="text-sm text-gray-600">Manage gallery images by category</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary" data-testid="add-image-btn">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Image</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddImage} className="space-y-4" data-testid="add-image-form">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newImage.category}
                      onValueChange={(value) => setNewImage({ ...newImage, category: value })}
                    >
                      <SelectTrigger data-testid="image-category-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salon_interior">Salon Interior</SelectItem>
                        <SelectItem value="service_work">Service Work</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="certificates">Certificates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={newImage.image_url}
                      onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                      required
                      data-testid="image-url-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title (Optional)</Label>
                    <Input
                      type="text"
                      placeholder="Image title"
                      value={newImage.title}
                      onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                      data-testid="image-title-input"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="submit-image-btn">
                    Add Image
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              data-testid={`category-filter-${category.id}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No images in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="images-grid">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
                data-testid={`image-card-${image.id}`}
              >
                <div className="aspect-square relative">
                  <img
                    src={image.image_url}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      data-testid={`delete-image-${image.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                {image.title && (
                  <div className="p-3">
                    <p className="text-sm text-gray-700 truncate">{image.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
