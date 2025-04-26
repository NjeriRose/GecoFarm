export type AdminRole = {
  type: 'admin';
  position: string;
};

export type EmployeeRole = {
  type: 'employee';
  position: string;
};

export type Role = AdminRole | EmployeeRole;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profile_photo: string | null;
  created_at: string;
  updated_at: string;
} 