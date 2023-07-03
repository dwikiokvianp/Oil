import axios from "axios";

const travelDeliveryServiceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

interface DriverData {
  id: number;
  username: string;
}
export const getDrivers = async (): Promise<{
  data: DriverData[];
}> => {
  const { data } = await travelDeliveryServiceApi.get("/drivers");
  return data;
};

export interface TravelDeliveryInput {
  driverId: number;
  pickup_location: string;
  departure_date: string;
  message: string;
  officer_id: number;
  oil_id: number;
  status: string;
  vehicle_id: number;
  quantity: number;
  recipient_detail: RecipientDetail[];
  warehouse_detail: WarehouseDetail[];
}

interface RecipientDetail {
  user_id: number;
  email: string;
  quantity: number;
  province_id: number;
  city_id: number;
}

interface WarehouseDetail {
  warehouse_id: number;
  quantity: number;
}

export const createTravelDelivery = async (inputForm: TravelDeliveryInput) => {
  const { data } = await travelDeliveryServiceApi.post(
    "/travel-delivery",
    inputForm
  );
  return data;
};
