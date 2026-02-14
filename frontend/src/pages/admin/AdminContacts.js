import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllContacts, deleteContact } from '../../utils/api';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getAllContacts();
      setContacts(response.data);
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await deleteContact(id);
      setContacts(contacts.filter(contact => contact.id !== id));
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error('Failed to delete contact');
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
              <h1 className="text-2xl font-bold text-gray-900" data-testid="admin-contacts-title">
                Contact Submissions
              </h1>
              <p className="text-sm text-gray-600">Manage customer inquiries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No contact submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="contacts-list">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-xl shadow-md p-6"
                data-testid={`contact-${contact.id}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p><strong>Email:</strong> {contact.email}</p>
                      <p><strong>Phone:</strong> {contact.phone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{contact.message}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-600 hover:text-red-700 ml-4"
                    data-testid={`delete-contact-${contact.id}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
