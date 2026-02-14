import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTodayAppointments } from '../../utils/api';
import { toast } from 'sonner';
import { Calendar, Users, Image, DollarSign, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodayAppointments();
  }, []);

  const fetchTodayAppointments = async () => {
    try {
      const response = await getTodayAppointments();
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: <Calendar className="w-5 h-5" />, label: 'Appointments', path: '/admin/appointments' },
    { icon: <Users className="w-5 h-5" />, label: 'Contacts', path: '/admin/contacts' },
    { icon: <Image className="w-5 h-5" />, label: 'Gallery', path: '/admin/gallery' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Services & Pricing', path: '/admin/services' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-dashboard-title">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">IIHM By Manan</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
              data-testid="admin-logout-btn"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4" data-testid="todays-appointments-title">
            Today's Appointments
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No appointments for today</p>
          ) : (
            <div className="space-y-4" data-testid="appointments-list">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  data-testid={`appointment-${appointment.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.name}</h3>
                      <p className="text-sm text-gray-600">{appointment.service}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.time} | {appointment.phone}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6">
            <Link
              to="/admin/appointments"
              className="text-amber-700 hover:text-amber-800 font-semibold"
              data-testid="view-all-appointments-link"
            >
              View All Appointments →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
