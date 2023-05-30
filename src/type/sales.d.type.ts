export interface SalesInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  liter: number;
}

export interface ApiErrorResponse {
  error: string;
}

export interface SalesResponse {
  kode: number;
  message: string;
  order: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    liter: number;
    price: number;
    created_at: string;
  };
}
export interface GetSales {
  id: number;
  name: string;
  email: string;
  address: string;
  liter: number;
  price: number;
  created_at: string;
}
