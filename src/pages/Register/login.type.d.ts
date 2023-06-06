export interface LoginInput {
  name: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  name: string;
}
