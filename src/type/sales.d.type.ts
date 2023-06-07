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

export interface SalesResponse {
  orders: Sales;
}

export interface SalesResponseUpdated {
  orders: Sales[];
}

export interface UpdatedStatusResponse {
  message: string;
  otp: string;
}
