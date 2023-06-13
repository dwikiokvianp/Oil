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

export interface VehicleType {
  id: number;
  name: string;
}
export interface Vehicle {
  id: number;
  name: string;
  vehicle_type_id: number;
  VehicleType: VehicleType;
}

export interface GetVehicle {
  data: Vehicle[];
}

export interface Oil {
  id: number;
  name: string;
}

export interface GetOil {
  data: Oil[];
}

export interface OrderInput {
  id: number;
  vehicle_id: number;
  oil_id: number;
}
