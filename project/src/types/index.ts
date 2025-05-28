// Type definitions for the EHR system

export type Role = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  role: Role;
  token?: string;
}

export interface Admin extends User {
  role: 'admin';
  username: string;
}

export interface Doctor extends User {
  role: 'doctor';
  doctorId: string;
  email: string;
  phoneNumber: string;
  department: string;
  specialization: string;
  experience: string;
}

export interface Patient extends User {
  role: 'patient';
  patientId: string;
}

export interface EhrRecord {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  diagnosis: string;
  treatmentPlan: string;
  symptoms: string;
  medications: string;
  allergies: string;
  doctorName: string;
  doctorId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  role: Role;
  username?: string;  // for admin
  email?: string;     // for doctor
  password?: string;  // for admin and doctor
  patientId?: string; // for patient
  name?: string;      // for patient
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}