import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, createService, updateService, deleteService } from '../../utils/api';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Edit2, Trash2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    category: 'hair',
    description: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'hair', name: 'Hair Services' },
    { id: 'grooming', name: 'Grooming' },
    { id: 'bridal', name: 'Bridal & Makeup' },
    { id: 'academy', name: 'Academy' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const handleAddService = async (e) => {
    e.preventDefault();
    
    if (!newService.name || !newService.category) {
      toast.error('Please provide service name and category');
      return;
    }

    try {
      const serviceData = {
        ...newService,
        price: newService.price ? parseFloat(newService.price) : null
      };
      const response = await createService(serviceData);
      setServices([...services, response.data]);
      toast.success('Service added successfully');
      setIsAddDialogOpen(false);
      setNewService({ name: '', category: 'hair', description: '', price: '', duration: '' });
    } catch (error) {
      toast.error('Failed to add service');
    }
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    
    if (!editingService) return;

    try {
      const updateData = {
        name: editingService.name,
        description: editingService.description,
        price: editingService.price ? parseFloat(editingService.price) : null,
        duration: editingService.duration
      };
      const response = await updateService(editingService.id, updateData);
      setServices(services.map(s => s.id === editingService.id ? response.data : s));
      toast.success('Service updated successfully');
      setIsEditDialogOpen(false);
      setEditingService(null);
    } catch (error) {
      toast.error('Failed to update service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await deleteService(id);
      setServices(services.filter(s => s.id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const openEditDialog = (service) => {
    setEditingService({
      ...service,
      price: service.price || ''
    });
    setIsEditDialogOpen(true);
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
                <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-services-title">
                  Services & Pricing
                </h1>
                <p className="text-sm text-gray-600">Manage services and their pricing</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary" data-testid="add-service-btn">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddService} className="space-y-4" data-testid="add-service-form">
                  <div className="space-y-2">
                    <Label>Service Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g., Hair Cut"
                      value={newService.name}
                      onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                      required
                      data-testid="service-name-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newService.category}
                      onValueChange={(value) => setNewService({ ...newService, category: value })}
                    >
                      <SelectTrigger data-testid="service-category-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hair">Hair Services</SelectItem>
                        <SelectItem value="grooming">Grooming</SelectItem>
                        <SelectItem value="bridal">Bridal & Makeup</SelectItem>
                        <SelectItem value="academy">Academy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Service description"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      rows={3}
                      data-testid="service-description-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 500"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        data-testid="service-price-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        type="text"
                        placeholder="e.g., 30 mins"
                        value={newService.duration}
                        onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                        data-testid="service-duration-input"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" data-testid="submit-service-btn">
                    Add Service
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

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No services in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md p-6"
                data-testid={`service-card-${service.id}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(service)}
                      data-testid={`edit-service-${service.id}`}
                    >
                      <Edit2 className="w-4 h-4 text-amber-700" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      data-testid={`delete-service-${service.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
                {service.description && (
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                )}
                <div className="space-y-2 text-sm">
                  {service.price && (
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="w-4 h-4 mr-2 text-amber-700" />
                      <span className="font-semibold">₹{service.price}</span>
                    </div>
                  )}
                  {service.duration && (
                    <div className="text-gray-600">
                      Duration: {service.duration}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <form onSubmit={handleEditService} className="space-y-4" data-testid="edit-service-form">
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  required
                  data-testid="edit-service-name"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={3}
                  data-testid="edit-service-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                    data-testid="edit-service-price"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    type="text"
                    value={editingService.duration || ''}
                    onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                    data-testid="edit-service-duration"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" data-testid="update-service-btn">
                Update Service
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
