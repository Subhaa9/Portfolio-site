import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllDoctors, addDoctor, deleteDoctor } from '../../services/api';
import { Doctor } from '../../types';
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import { Plus, Trash2, User } from 'lucide-react';

const DoctorsPage: React.FC = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDoctorData, setNewDoctorData] = useState({
    doctorId: '',
    name: '',
    email: '',
    phoneNumber: '',
    department: '',
    specialization: '',
    experience: '',
    password: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchDoctors();
  }, [user]);

  const fetchDoctors = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getAllDoctors();
      if (response.success && response.data) {
        setDoctors(response.data);
      } else {
        setError(response.message || 'Failed to fetch doctors');
      }
    } catch (err) {
      setError('An error occurred while fetching doctors');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDoctorForm = (): boolean => {
    setFormError(null);
    
    const requiredFields = [
      'doctorId', 'name', 'email', 'phoneNumber', 
      'department', 'specialization', 'password'
    ];
    
    for (const field of requiredFields) {
      if (!newDoctorData[field as keyof typeof newDoctorData].trim()) {
        setFormError(`All fields are required`);
        return false;
      }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newDoctorData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    if (newDoctorData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleAddDoctor = async () => {
    if (!validateDoctorForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await addDoctor(newDoctorData);
      
      if (response.success) {
        setIsAddModalOpen(false);
        setNewDoctorData({
          doctorId: '',
          name: '',
          email: '',
          phoneNumber: '',
          department: '',
          specialization: '',
          experience: '',
          password: '',
        });
        fetchDoctors();
      } else {
        setFormError(response.message || 'Failed to add doctor');
      }
    } catch (err) {
      setFormError('An error occurred while adding the doctor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDoctor = async () => {
    if (!selectedDoctor) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await deleteDoctor(selectedDoctor.doctorId);
      
      if (response.success) {
        setIsDeleteModalOpen(false);
        setSelectedDoctor(null);
        fetchDoctors();
      } else {
        setError(response.message || 'Failed to delete doctor');
      }
    } catch (err) {
      setError('An error occurred while deleting the doctor');
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== 'admin') {
    return (
      <AppLayout>
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-red-600">Access Denied</h2>
          <p className="mt-2">You don't have permission to access this page.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Doctor Management</h1>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Doctor
        </Button>
      </div>

      {error && (
        <Alert 
          type="error" 
          message={error} 
          className="mb-6" 
          onClose={() => setError(null)}
        />
      )}

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Input
            placeholder="Search doctors by name, email, department or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </CardContent>
      </Card>

      {isLoading && doctors.length === 0 ? (
        <div className="text-center p-8">
          <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading doctors...</p>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.doctorId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{doctor.specialization}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Email:</span> {doctor.email}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Phone:</span> {doctor.phoneNumber}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Department:</span> {doctor.department}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Experience:</span> {doctor.experience}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">ID:</span> {doctor.doctorId}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-100">
                  <Button 
                    variant="danger"
                    className="w-full mt-2 flex items-center justify-center"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-600">No doctors found.</p>
        </div>
      )}

      {/* Add Doctor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Doctor"
        size="lg"
        footer={
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDoctor}
              isLoading={isLoading}
            >
              Add Doctor
            </Button>
          </div>
        }
      >
        {formError && <Alert type="error" message={formError} className="mb-4" />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Doctor ID"
            name="doctorId"
            value={newDoctorData.doctorId}
            onChange={handleInputChange}
            placeholder="Enter unique doctor ID"
            required
          />
          <Input
            label="Full Name"
            name="name"
            value={newDoctorData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={newDoctorData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={newDoctorData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />
          <Input
            label="Department"
            name="department"
            value={newDoctorData.department}
            onChange={handleInputChange}
            placeholder="Enter department"
            required
          />
          <Input
            label="Specialization"
            name="specialization"
            value={newDoctorData.specialization}
            onChange={handleInputChange}
            placeholder="Enter specialization"
            required
          />
          <Input
            label="Experience"
            name="experience"
            value={newDoctorData.experience}
            onChange={handleInputChange}
            placeholder="Enter years of experience"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={newDoctorData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
        footer={
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteDoctor}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete Dr. {selectedDoctor?.name}?</p>
        <p className="mt-2 text-sm text-red-600">This action cannot be undone.</p>
      </Modal>
    </AppLayout>
  );
};

export default DoctorsPage;