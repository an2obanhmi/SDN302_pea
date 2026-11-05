export interface UserResponse {
  id: string;
  email: string;
}

export interface RegisterInput {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginInput {
  email?: string;
  password?: string;
}
