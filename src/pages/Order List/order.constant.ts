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
