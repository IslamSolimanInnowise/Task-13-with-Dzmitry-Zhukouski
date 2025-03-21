export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  department_name: string;
  position_name: string;
  profile: Profile;
  icon: string;
  role: AuthRoles;
  position: {
    id: string;
    name: string;
  };
  department: {
    id: string;
    name: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  category_name: string;
  category_parent_name: string;
  category: {
    id: string;
    name: string;
  };
}

export interface Language {
  proficiency: string;
  name: string;
}

export enum AuthRoles {
  Employee = 'Employee',
  Admin = 'Admin',
}
