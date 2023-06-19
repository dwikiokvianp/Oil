export interface LoginInput {
  email: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  token: {
    role: string;
    email: string;
    access_token: string;
    name: string;
  };
}
