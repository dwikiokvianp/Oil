import { fuelApiService } from "./axios.config.ts";

interface DeliveryOrder {
  id: number;
  driver_id: number;
  pickup_location: string;
  departure_date: string;
  message: string;
  status: string;
  officer_id: number;
  vehicle_id: number;
  quantity: number;
  recipient_detail: RecipientDetail[];
  warehouse_detail: WarehouseDetail[];
}

interface RecipientDetail {
  id: number;
  delivery_order_id: number;
  oil_id: number;
  user_id: number;
  email: string;
  quantity: number;
  province_id: number;
  city_id: number;
}

interface WarehouseDetail {
  id: number;
  delivery_order_id: number;
  warehouse_id: number;
  storage_id: number;
  quantity: number;
}

export const getDeliveryOrders = async (): Promise<{
  data: DeliveryOrder[];
}> => {
  const { data } = await fuelApiService.get("/drivers/1/transactions");
  return data;
};

interface Driver {
  id: number;
  username: string;
  password: string;
}
export const getDrivers = async (): Promise<{
  data: Driver[];
}> => {
  const { data } = await fuelApiService.get("/users?role=5");
  return data;
};
