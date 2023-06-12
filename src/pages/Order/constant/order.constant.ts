export interface Role {
  id: number;
  role: string;
}

export interface UserDetail {
  id: number;
  balance: number;
  credit: number;
}
export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  detail: UserDetail;
  created_at: number;
}

export interface GetUser {
  data: User[];
}

export interface GetUserById {
  data: User;
}
