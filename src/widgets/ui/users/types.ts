export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface User {
  id: string;
  email: string;
  department_name: string;
  position_name: string;
  profile: Profile;
  icon: string;
  role: 'Employee' | 'Admin';
}
