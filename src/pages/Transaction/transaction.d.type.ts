export interface TransactionData {
  id: number;
  user_id: number;
  email: string;
  User: User;
  vehicle_id: number;
  Vehicle: Vehicle;
  oil_id: number;
  Oil: Oil;
  created_at: number;
  updated_at: number;
  quantity: number;
  officer_id: number;
  Officer: Officer;
  issued_at: string;
  company: Company;
  qr_code_url;
  status: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role_id: number;
  role: Role;
  detail_id: number;
  detail: UserDetail;
  company: Company;
  company_id: number;
  created_at: number;
  phone: string;
}

interface Role {
  id: number;
  role: string;
}

interface UserDetail {
  id: number;
  balance: number;
  credit: number;
}

interface Company {
  id: number;
  username: string;
  password: string;
  company_detail: string;
  company_zip_code: number;
  created_at: number;
}

interface Vehicle {
  id: number;
  name: string;
  vehicle_photo: string;
  vehicle_type_id: number;
  VehicleType: VehicleType;
}

interface VehicleType {
  id: number;
  name: string;
}

interface Oil {
  id: number;
  name: string;
}

interface Officer {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: number;
}
