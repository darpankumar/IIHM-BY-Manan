import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAppointments, updateAppointment, deleteAppointment } from '../../utils/api';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointment(id, { status: newStatus });
      setAppointments(appointments.map(appt => 
        appt.id === id ? { ...appt, status: newStatus } : appt
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter(appt => appt.id !== id));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-appointments-title">
                All Appointments
              </h1>
              <p className="text-sm text-gray-600">Manage customer appointments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No appointments yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="appointments-table">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} data-testid={`appointment-row-${appointment.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{appointment.service}</div>
                        {appointment.message && (
                          <div className="text-xs text-gray-500 mt-1">{appointment.message}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.phone}</div>
                        {appointment.email && (
                          <div className="text-xs text-gray-500">{appointment.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Select
                          value={appointment.status}
                          onValueChange={(value) => handleStatusUpdate(appointment.id, value)}
                        >
                          <SelectTrigger className="w-32" data-testid={`status-select-${appointment.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-700"
                          data-testid={`delete-appointment-${appointment.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
