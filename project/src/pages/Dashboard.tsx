import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllEhrRecords, getAllDoctors } from '../services/api';
import { EhrRecord, Doctor } from '../types';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Alert from '../components/ui/Alert';
import { UserRound, Users, FileText, ClipboardCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<EhrRecord[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (user.role === 'admin' || user.role === 'doctor') {
          const recordsResponse = await getAllEhrRecords();
          if (recordsResponse.success && recordsResponse.data) {
            setRecords(recordsResponse.data);
          }
        }
        
        if (user.role === 'admin') {
          const doctorsResponse = await getAllDoctors();
          if (doctorsResponse.success && doctorsResponse.data) {
            setDoctors(doctorsResponse.data);
          }
        }
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}
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

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Stats for Admin */}
        {user?.role === 'admin' && (
          <>
            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-cyan-600 bg-opacity-25">
                    <UserRound className="h-8 w-8 text-cyan-700" />
                  </div>
                  <div className="ml-5">
                    <p className="text-gray-500 text-sm">Total Doctors</p>
                    <p className="text-2xl font-bold text-gray-800">{doctors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-emerald-600 bg-opacity-25">
                    <Users className="h-8 w-8 text-emerald-700" />
                  </div>
                  <div className="ml-5">
                    <p className="text-gray-500 text-sm">Total Patients</p>
                    <p className="text-2xl font-bold text-gray-800">{records.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-600 bg-opacity-25">
                    <FileText className="h-8 w-8 text-blue-700" />
                  </div>
                  <div className="ml-5">
                    <p className="text-gray-500 text-sm">Total Records</p>
                    <p className="text-2xl font-bold text-gray-800">{records.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-600 bg-opacity-25">
                    <ClipboardCheck className="h-8 w-8 text-purple-700" />
                  </div>
                  <div className="ml-5">
                    <p className="text-gray-500 text-sm">Active Treatments</p>
                    <p className="text-2xl font-bold text-gray-800">{records.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Stats for Doctor */}
        {user?.role === 'doctor' && (
          <>
            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-cyan-600 bg-opacity-25">
                    <Users className="h-8 w-8 text-cyan-700" />
                  </div>
                  <div className="ml-5">
                    <p className="text-gray-500 text-sm">My Patients</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {records.filter(r => r.doctorId === user.id).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-emerald-600 bg-opacity-25">
                    <FileText className="h-8 w-8 text-emerald-700" />
                  </div>
                  <div className="ml-5">
                    <p className="text-gray-500 text-sm">Total Records</p>
                    <p className="text-2xl font-bold text-gray-800">{records.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Stats for Patient */}
        {user?.role === 'patient' && (
          <>
            <Card className="col-span-full md:col-span-2 bg-gradient-to-r from-cyan-50 to-blue-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-blue-600 bg-opacity-25">
                    <FileText className="h-10 w-10 text-blue-700" />
                  </div>
                  <div className="ml-6">
                    <p className="text-gray-600 mb-1">My Medical Record</p>
                    <p className="text-2xl font-bold text-gray-800">
                      View your health information
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Access your complete health record, including diagnosis, treatment plan, and medications
                    </p>
                    <a 
                      href="/my-record" 
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Record
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent activity for Admin and Doctor */}
      {(user?.role === 'admin' || user?.role === 'doctor') && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patient Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Diagnosis
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {records.slice(0, 5).map((record) => (
                      <tr key={record.patientId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{record.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{record.age}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{record.gender}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{record.diagnosis.length > 30 
                            ? `${record.diagnosis.substring(0, 30)}...` 
                            : record.diagnosis}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">Dr. {record.doctorName}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {records.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500">No records found</p>
                </div>
              )}
              
              {records.length > 5 && (
                <div className="mt-4 flex justify-center">
                  <a 
                    href={user?.role === 'admin' ? '/patients' : '/records'} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all records
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;