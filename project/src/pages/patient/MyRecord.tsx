import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getEhrRecord } from '../../services/api';
import { EhrRecord } from '../../types';
import AppLayout from '../../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import { Pill, Activity, User, Calendar, Stethoscope } from 'lucide-react';

const MyRecordPage: React.FC = () => {
  const { user } = useAuth();
  const [record, setRecord] = useState<EhrRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== 'patient' || !user.patientId) return;
    fetchMyRecord();
  }, [user]);

  const fetchMyRecord = async () => {
    if (!user?.patientId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getEhrRecord(user.patientId);
      if (response.success && response.data) {
        setRecord(response.data);
      } else {
        setError(response.message || 'Failed to fetch your medical record');
      }
    } catch (err) {
      setError('An error occurred while fetching your medical record');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== 'patient') {
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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Medical Record</h1>
        <p className="text-gray-600 mt-1">
          View your personal health information
        </p>
      </div>

      {error && (
        <Alert 
          type="error" 
          message={error} 
          className="mb-6" 
          onClose={() => setError(null)}
        />
      )}

      {isLoading ? (
        <div className="text-center p-8">
          <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading your medical record...</p>
        </div>
      ) : record ? (
        <div className="space-y-6">
          <Card className="overflow-hidden border-t-4 border-cyan-600">
            <CardHeader className="bg-gray-50">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mr-4">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{record.name}</h2>
                  <p className="text-gray-600">
                    {record.age} years, {record.gender}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient ID</p>
                  <p>{record.patientId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{record.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p>{record.phoneNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-t-4 border-green-600">
            <CardHeader className="bg-gray-50">
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-1">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Diagnosis</h3>
                    <p className="text-gray-800 mt-1">{record.diagnosis}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-1">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Treatment Plan</h3>
                    <p className="text-gray-800 mt-1">{record.treatmentPlan}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3 mt-1">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Symptoms</h3>
                    <p className="text-gray-800 mt-1">{record.symptoms || "None recorded"}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 mt-1">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Medications</h3>
                    <p className="text-gray-800 mt-1">{record.medications || "None prescribed"}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3 mt-1">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Allergies</h3>
                    <p className="text-gray-800 mt-1">{record.allergies || "No known allergies"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-t-4 border-indigo-600">
            <CardHeader className="bg-gray-50">
              <CardTitle>Attending Doctor</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Dr. {record.doctorName}</h3>
                  <p className="text-gray-600 mt-1">ID: {record.doctorId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-lg text-gray-600">No medical record found.</p>
        </div>
      )}
    </AppLayout>
  );
};

export default MyRecordPage;

// Helper component for the alert icon
const AlertCircle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);