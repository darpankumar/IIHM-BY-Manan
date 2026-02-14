import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createContact } from '../utils/api';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await createContact(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="contact-title">
            Contact Us
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Get in touch with us for any inquiries or assistance
          </p>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4" data-testid="contact-address">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      IIhm By Manan, near Surya Hotel,<br />
                      Old Town, Ambala, Haryana 134003, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 7206975263</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4" data-testid="contact-email">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">manansingh800@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4" data-testid="contact-hours">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">10:00 AM - 10:00 PM<br />Open All Days</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              
            </div>

            {/* Contact Form */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg" data-testid="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.1234567890123!2d76.7734567!3d30.3784567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDIyJzQyLjQiTiA3NsKwNDYnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IIHM By Manan Location"
                ></iframe>
              </div>
            {/* <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      data-testid="contact-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      data-testid="contact-email-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      data-testid="contact-phone-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      required
                      data-testid="contact-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary text-lg py-6"
                    disabled={loading}
                    data-testid="contact-submit"
                  >
                    {loading ? 'Sending...' : (
                      <span className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
