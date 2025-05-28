import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllEhrRecords, createEhrRecord, updateEhrRecord } from '../../services/api';
import { EhrRecord } from '../../types';
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import { Plus, Edit, Eye } from 'lucide-react';

const RecordsPage: React.FC = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<EhrRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EhrRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  
  // Form state for create/edit
  const [recordForm, setRecordForm] = useState<Partial<EhrRecord>>({
    patientId: '',
    name: '',
    age: 0,
    gender: '',
    email: '',
    phoneNumber: '',
    diagnosis: '',
    treatmentPlan: '',
    symptoms: '',
    medications: '',
    allergies: '',
    doctorName: user?.name || '',
    doctorId: user?.id || '',
  });
  
  useEffect(() => {
    if (user?.role !== 'doctor') return;
    fetchRecords();
  }, [user]);
  
  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getAllEhrRecords();
      if (response.success && response.data) {
        setRecords(response.data);
      } else {
        setError(response.message || 'Failed to fetch records');
      }
    } catch (err) {
      setError('An error occurred while fetching records');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecordForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setRecordForm((prev) => ({ ...prev, [field]: value }));
  };
  
  const validateForm = (): boolean => {
    setFormError(null);
    
    const requiredFields = [
      'patientId', 'name', 'age', 'gender', 'email', 
      'phoneNumber', 'diagnosis', 'treatmentPlan'
    ];
    
    for (const field of requiredFields) {
      if (!recordForm[field as keyof typeof recordForm]) {
        setFormError(`All required fields must be filled`);
        return false;
      }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recordForm.email || '')) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  const resetForm = () => {
    setRecordForm({
      patientId: '',
      name: '',
      age: 0,
      gender: '',
      email: '',
      phoneNumber: '',
      diagnosis: '',
      treatmentPlan: '',
      symptoms: '',
      medications: '',
      allergies: '',
      doctorName: user?.name || '',
      doctorId: user?.id || '',
    });
    setFormError(null);
  };
  
  const handleCreateRecord = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await createEhrRecord(recordForm as EhrRecord);
      
      if (response.success) {
        setIsCreateModalOpen(false);
        resetForm();
        fetchRecords();
      } else {
        setFormError(response.message || 'Failed to create record');
      }
    } catch (err) {
      setFormError('An error occurred while creating the record');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditRecord = async () => {
    if (!validateForm() || !selectedRecord) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await updateEhrRecord({
        ...recordForm,
        patientId: selectedRecord.patientId,
      });
      
      if (response.success) {
        setIsEditModalOpen(false);
        setSelectedRecord(null);
        fetchRecords();
      } else {
        setFormError(response.message || 'Failed to update record');
      }
    } catch (err) {
      setFormError('An error occurred while updating the record');
    } finally {
      setIsLoading(false);
    }
  };
  
  const openViewModal = (record: EhrRecord) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };
  
  const openEditModal = (record: EhrRecord) => {
    setSelectedRecord(record);
    setRecordForm({
      patientId: record.patientId,
      name: record.name,
      age: record.age,
      gender: record.gender,
      email: record.email,
      phoneNumber: record.phoneNumber,
      diagnosis: record.diagnosis,
      treatmentPlan: record.treatmentPlan,
      symptoms: record.symptoms,
      medications: record.medications,
      allergies: record.allergies,
      doctorName: user?.name || '',
      doctorId: user?.id || '',
    });
    setIsEditModalOpen(true);
  };
  
  const filteredRecords = records.filter(record => 
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (user?.role !== 'doctor') {
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
        <h1 className="text-2xl font-semibold text-gray-900">Patient Records</h1>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Record
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
            placeholder="Search records by patient name, ID or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </CardContent>
      </Card>
      
      {isLoading && records.length === 0 ? (
        <div className="text-center p-8">
          <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading records...</p>
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecords.map((record) => (
            <Card key={record.patientId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{record.name}</CardTitle>
                <p className="text-sm text-gray-500">ID: {record.patientId}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Age:</span> {record.age}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Gender:</span> {record.gender}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">Diagnosis:</span> {record.diagnosis}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => openViewModal(record)}
                  className="flex-1 flex items-center justify-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => openEditModal(record)}
                  className="flex-1 flex items-center justify-center"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-600">No records found.</p>
        </div>
      )}
      
      {/* Create Record Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Patient Record"
        size="xl"
        footer={
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRecord}
              isLoading={isLoading}
            >
              Create Record
            </Button>
          </div>
        }
      >
        {formError && <Alert type="error" message={formError} className="mb-4" />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Patient ID *"
            name="patientId"
            value={recordForm.patientId || ''}
            onChange={handleInputChange}
            placeholder="Enter patient ID"
            required
          />
          <Input
            label="Full Name *"
            name="name"
            value={recordForm.name || ''}
            onChange={handleInputChange}
            placeholder="Enter patient name"
            required
          />
          <Input
            label="Age *"
            name="age"
            type="number"
            value={recordForm.age || ''}
            onChange={handleInputChange}
            placeholder="Enter age"
            required
          />
          <Select
            label="Gender *"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            value={recordForm.gender || ''}
            onChange={(value) => handleSelectChange('gender', value)}
            required
          />
          <Input
            label="Email *"
            name="email"
            type="email"
            value={recordForm.email || ''}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
          <Input
            label="Phone Number *"
            name="phoneNumber"
            value={recordForm.phoneNumber || ''}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        
        <div className="mt-4">
          <TextArea
            label="Diagnosis *"
            name="diagnosis"
            value={recordForm.diagnosis || ''}
            onChange={handleInputChange}
            placeholder="Enter diagnosis"
            required
          />
          <TextArea
            label="Treatment Plan *"
            name="treatmentPlan"
            value={recordForm.treatmentPlan || ''}
            onChange={handleInputChange}
            placeholder="Enter treatment plan"
            required
          />
          <TextArea
            label="Symptoms"
            name="symptoms"
            value={recordForm.symptoms || ''}
            onChange={handleInputChange}
            placeholder="Enter symptoms"
          />
          <TextArea
            label="Medications"
            name="medications"
            value={recordForm.medications || ''}
            onChange={handleInputChange}
            placeholder="Enter medications"
          />
          <TextArea
            label="Allergies"
            name="allergies"
            value={recordForm.allergies || ''}
            onChange={handleInputChange}
            placeholder="Enter allergies"
          />
        </div>
      </Modal>
      
      {/* View Record Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Patient Record Details"
        size="lg"
        footer={
          <Button
            variant="outline"
            onClick={() => setIsViewModalOpen(false)}
          >
            Close
          </Button>
        }
      >
        {selectedRecord && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Patient ID</h3>
                <p>{selectedRecord.patientId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p>{selectedRecord.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age</h3>
                <p>{selectedRecord.age}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p>{selectedRecord.gender}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{selectedRecord.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p>{selectedRecord.phoneNumber}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">Diagnosis</h3>
                <p className="mt-1">{selectedRecord.diagnosis}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">Treatment Plan</h3>
                <p className="mt-1">{selectedRecord.treatmentPlan}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">Symptoms</h3>
                <p className="mt-1">{selectedRecord.symptoms || "None recorded"}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">Medications</h3>
                <p className="mt-1">{selectedRecord.medications || "None recorded"}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
                <p className="mt-1">{selectedRecord.allergies || "None recorded"}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-500">Attending Doctor</h3>
                <p className="mt-1">{selectedRecord.doctorName}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Edit Record Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient Record"
        size="xl"
        footer={
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditRecord}
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        }
      >
        {formError && <Alert type="error" message={formError} className="mb-4" />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Patient ID"
            value={selectedRecord?.patientId || ''}
            disabled
          />
          <Input
            label="Full Name *"
            name="name"
            value={recordForm.name || ''}
            onChange={handleInputChange}
            placeholder="Enter patient name"
            required
          />
          <Input
            label="Age *"
            name="age"
            type="number"
            value={recordForm.age || ''}
            onChange={handleInputChange}
            placeholder="Enter age"
            required
          />
          <Select
            label="Gender *"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            value={recordForm.gender || ''}
            onChange={(value) => handleSelectChange('gender', value)}
            required
          />
          <Input
            label="Email *"
            name="email"
            type="email"
            value={recordForm.email || ''}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
          <Input
            label="Phone Number *"
            name="phoneNumber"
            value={recordForm.phoneNumber || ''}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        
        <div className="mt-4">
          <TextArea
            label="Diagnosis *"
            name="diagnosis"
            value={recordForm.diagnosis || ''}
            onChange={handleInputChange}
            placeholder="Enter diagnosis"
            required
          />
          <TextArea
            label="Treatment Plan *"
            name="treatmentPlan"
            value={recordForm.treatmentPlan || ''}
            onChange={handleInputChange}
            placeholder="Enter treatment plan"
            required
          />
          <TextArea
            label="Symptoms"
            name="symptoms"
            value={recordForm.symptoms || ''}
            onChange={handleInputChange}
            placeholder="Enter symptoms"
          />
          <TextArea
            label="Medications"
            name="medications"
            value={recordForm.medications || ''}
            onChange={handleInputChange}
            placeholder="Enter medications"
          />
          <TextArea
            label="Allergies"
            name="allergies"
            value={recordForm.allergies || ''}
            onChange={handleInputChange}
            placeholder="Enter allergies"
          />
        </div>
      </Modal>
    </AppLayout>
  );
};

export default RecordsPage;