import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.access_token);
      toast.success('Login successful!');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900" data-testid="admin-login-title">
            Admin Login
          </h1>
          <p className="text-gray-600 mt-2">IIHM By Manan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="admin-login-form">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-700" />
              <span>Email</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="admin-login-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Password</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="admin-login-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-primary text-lg py-6"
            disabled={loading}
            data-testid="admin-login-submit"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-amber-700 hover:text-amber-800 transition-colors text-sm">
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
