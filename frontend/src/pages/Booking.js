import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createAppointment } from '../utils/api';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    'Hair Cut & Styling',
    'Hair Coloring',
    'Hair Treatment',
    'Facial',
    'Skin Treatment',
    'Male Grooming',
    'Female Grooming',
    'Bridal Makeup',
    'Party Makeup',
    'Academy Course Inquiry'
  ];

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await createAppointment(formData);
      toast.success('Appointment booked successfully! We will contact you soon.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="booking-title">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Schedule your visit and experience premium beauty services
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="booking-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-amber-700" />
                    <span>Full Name *</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    data-testid="booking-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-amber-700" />
                    <span>Phone Number *</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    data-testid="booking-phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>Email (Optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  data-testid="booking-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <span>Select Service *</span>
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleChange('service', value)}
                  required
                >
                  <SelectTrigger data-testid="booking-service">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>Preferred Date *</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    min={minDate}
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                    data-testid="booking-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>Preferred Time *</span>
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => handleChange('time', value)}
                    required
                  >
                    <SelectTrigger data-testid="booking-time">
                      <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <span>Additional Message (Optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Any special requests or requirements?"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                  data-testid="booking-message"
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-primary text-lg py-6"
                disabled={loading}
                data-testid="booking-submit"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </form>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Need immediate assistance?</p>
            <a
              href="https://wa.me/917206975263?text=Hi!%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 font-semibold hover:text-amber-800 transition-colors"
              data-testid="booking-whatsapp-link"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
