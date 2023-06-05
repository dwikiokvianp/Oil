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

export interface Sales {
  id: number;
  user_id: number;
  customer: string;
  liter: number;
  price: number;
  created_at: string;
  confirmed: boolean;
}

export interface SalesResponseUpdated {
  orders: Sales[];
}
