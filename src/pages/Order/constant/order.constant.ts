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
  page: number;
  pageSize: number;
  total: number;
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

export interface DetailTransaction {
  quantity: number;
  oil_id: number;
}

export interface OrderInput {
  id: number;
  isPickup?: boolean;
  vehicle_id: number;
  oil_id: number;
  email: string;
  quantity: number;
  officer_id: number;
  driver_id: number;
  date: string;
  province_id: number;
  city_id: number;
  transaction_detail: DetailTransaction[];
}

export const quantity = [
  {
    id: 8000,
    value: 8000,
  },
  {
    id: 16000,
    value: 16000,
  },
  {
    id: 24000,
    value: 24000,
  },
  {
    id: 32000,
    value: 32000,
  },
  {
    id: 40000,
    value: 40000,
  },
];

export interface OfficerData {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: number;
}

export interface GetOfficer {
  data: OfficerData[];
}
