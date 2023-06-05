export interface SalesInput {
  name: string;
  address: string;
  email: string;
  liter: number;
  phone: string;
}

export interface SalesResponse {
  kode: string;
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
