export type CV = {
  id: string;
  name: string;
  education: string;
  description: string;
  user: {
    email: string;
    id: string;
  };
};

export type TableCV = {
  id: string;
  name: string;
  education: string;
  employee: string;
  description: string;
};
