import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginCredentials, Role } from '../types';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Alert from '../components/ui/Alert';

const Login: React.FC = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>('patient');
  const [formData, setFormData] = useState({
    // Admin fields
    username: '',
    
    // Doctor fields
    email: '',
    
    // Common fields
    password: '',
    
    // Patient fields
    patientId: '',
    name: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setFormError(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validateForm = (): boolean => {
    setFormError(null);
    
    if (selectedRole === 'admin') {
      if (!formData.username.trim() || !formData.password.trim()) {
        setFormError('Username and password are required');
        return false;
      }
    } else if (selectedRole === 'doctor') {
      if (!formData.email.trim() || !formData.password.trim()) {
        setFormError('Email and password are required');
        return false;
      }
    } else if (selectedRole === 'patient') {
      if (!formData.patientId.trim() || !formData.name.trim()) {
        setFormError('Patient ID and name are required');
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const credentials: LoginCredentials = {
      role: selectedRole,
    };
    
    if (selectedRole === 'admin') {
      credentials.username = formData.username;
      credentials.password = formData.password;
    } else if (selectedRole === 'doctor') {
      credentials.email = formData.email;
      credentials.password = formData.password;
    } else if (selectedRole === 'patient') {
      credentials.patientId = formData.patientId;
      credentials.name = formData.name;
    }
    
    try {
      const success = await login(credentials);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-700 to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Electronic Health Record System
          </h2>
          <p className="mt-2 text-center text-sm text-cyan-100">
            Sign in to access your healthcare dashboard
          </p>
        </div>
        
        <Card className="transition-all duration-300 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {(error || formError) && (
              <Alert 
                type="error" 
                message={formError || error || 'Authentication failed'} 
                className="mb-4"
              />
            )}
            
            <div className="mb-4">
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`px-4 py-2 w-1/3 text-sm font-medium text-center 
                    ${selectedRole === 'admin' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} 
                    rounded-l-md transition-colors`}
                  onClick={() => handleRoleChange('admin')}
                >
                  Admin
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 w-1/3 text-sm font-medium text-center 
                    ${selectedRole === 'doctor' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} 
                    transition-colors`}
                  onClick={() => handleRoleChange('doctor')}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 w-1/3 text-sm font-medium text-center 
                    ${selectedRole === 'patient' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} 
                    rounded-r-md transition-colors`}
                  onClick={() => handleRoleChange('patient')}
                >
                  Patient
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedRole === 'admin' && (
                <>
                  <Input
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter admin username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              
              {selectedRole === 'doctor' && (
                <>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              
              {selectedRole === 'patient' && (
                <>
                  <Input
                    label="Patient ID"
                    name="patientId"
                    type="text"
                    placeholder="Enter your patient ID"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Demo credentials: <br />
                Admin: admin / admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;