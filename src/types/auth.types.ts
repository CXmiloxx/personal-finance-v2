export interface LoginTypeAuth {
  email: string;
  password: string;
}

export interface UserTypeAuth {
  id: string;
  name: string;
  lastname: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
