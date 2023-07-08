export interface LoginInput {
  name: string;
  password: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  name: string;
}
