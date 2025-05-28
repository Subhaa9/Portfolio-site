import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllEhrRecords, deletePatient } from '../../services/api';
import { EhrRecord } from '../../types';
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import { Trash2, User } from 'lucide-react';

const PatientsPage: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<EhrRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<EhrRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchPatients();
  }, [user]);

  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getAllEhrRecords();
      if (response.success && response.data) {
        setPatients(response.data);
      } else {
        setError(response.message || 'Failed to fetch patients');
      }
    } catch (err) {
      setError('An error occurred while fetching patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePatient = async () => {
    if (!selectedPatient) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await deletePatient(selectedPatient.patientId);
      
      if (response.success) {
        setIsDeleteModalOpen(false);
        setSelectedPatient(null);
        fetchPatients();
      } else {
        setError(response.message || 'Failed to delete patient');
      }
    } catch (err) {
      setError('An error occurred while deleting the patient');
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-semibold text-gray-900">Patient Management</h1>
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
            placeholder="Search patients by name, ID, email or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </CardContent>
      </Card>

      {isLoading && patients.length === 0 ? (
        <div className="text-center p-8">
          <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading patients...</p>
        </div>
      ) : filteredPatients.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.patientId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {patient.age} years, {patient.gender}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <User className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Patient ID:</span> {patient.patientId}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Email:</span> {patient.email}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Phone:</span> {patient.phoneNumber}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Diagnosis:</span> {patient.diagnosis}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Doctor:</span> {patient.doctorName}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-100">
                  <Button 
                    variant="danger"
                    className="w-full mt-2 flex items-center justify-center"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Patient
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-600">No patients found.</p>
        </div>
      )}

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
              onClick={handleDeletePatient}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete patient {selectedPatient?.name}?</p>
        <p className="mt-2 text-sm text-red-600">This action cannot be undone.</p>
      </Modal>
    </AppLayout>
  );
};

export default PatientsPage;