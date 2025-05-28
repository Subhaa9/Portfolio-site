import { LoginCredentials, EhrRecord, Doctor, ApiResponse } from '../types';

// Base URL for the API
const API_URL = 'http://localhost:3000/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return {
      success: false,
      message: errorData.message || `Error: ${response.status} ${response.statusText}`,
    };
  }
  
  const data = await response.json();
  return { success: true, data };
}

// Function to get the auth headers
function getAuthHeaders() {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user).token : null;
  
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
}

// Authentication
export async function apiLogin(credentials: LoginCredentials): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    return handleResponse(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// EHR Records
export async function createEhrRecord(record: EhrRecord): Promise<ApiResponse<EhrRecord>> {
  try {
    const response = await fetch(`${API_URL}/ehr/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(record),
    });
    
    return handleResponse<EhrRecord>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export async function getEhrRecord(patientId: string): Promise<ApiResponse<EhrRecord>> {
  try {
    const response = await fetch(`${API_URL}/ehr/record/${patientId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse<EhrRecord>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export async function getAllEhrRecords(): Promise<ApiResponse<EhrRecord[]>> {
  try {
    const response = await fetch(`${API_URL}/ehr/queryAll`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse<EhrRecord[]>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export async function updateEhrRecord(record: Partial<EhrRecord>): Promise<ApiResponse<EhrRecord>> {
  try {
    const response = await fetch(`${API_URL}/ehr/update`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(record),
    });
    
    return handleResponse<EhrRecord>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Doctor Management
export async function addDoctor(doctor: Omit<Doctor, 'role' | 'id'> & { password: string }): Promise<ApiResponse<Doctor>> {
  try {
    const response = await fetch(`${API_URL}/ehr/doctor/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(doctor),
    });
    
    return handleResponse<Doctor>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export async function getAllDoctors(): Promise<ApiResponse<Doctor[]>> {
  try {
    const response = await fetch(`${API_URL}/ehr/doctor/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse<Doctor[]>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export async function deleteDoctor(doctorId: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/ehr/doctor/delete/${doctorId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse<void>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Patient Management
export async function deletePatient(patientId: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/ehr/patient/delete/${patientId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse<void>(response);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}