export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiError {
  title: string;
  message: string;
}
