export interface UserRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string;
}
