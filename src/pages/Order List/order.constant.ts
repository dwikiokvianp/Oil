interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  liter: number;
  price: number;
  created_at: string;
}

export interface OrderData {
  orders: Order[];
}

export interface OrderResponse {
  order: Order;
}

interface OrderTwo {
  id: number;
  user_id: number;
  customer: string;
  liter: number;
  email: string;
  phone: string;
  address: string;
  price: number;
  created_at: string;
  confirmed: boolean;
  otp: string;
  qrcode_url: string;
}

export interface OrderTwoResponse {
  order: OrderTwo;
}
