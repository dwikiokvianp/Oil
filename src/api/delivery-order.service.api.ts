import axios from "axios";
import type { TransactionData } from "../pages/admin/pages/Transaction/transaction.d.type.ts";

const deliveryOrderServiceApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

interface DeliveryOrder {
  id: number;
  travel_order_id: number;
  oil_id: number;
}

interface TravelOrder {
  id: number;
  pickup_location: string;
  quantity: number;
  departure_date: string;
}

interface RecipientTravelOrder {
  id: number;
  transaction: TransactionData;
}

interface getDeliveryOrdersResponse {
  travel_order: TravelOrder;
  delivery_order: DeliveryOrder;
  recipient: RecipientTravelOrder[];
}

export const getDeliveryOrdersMobile = async (
  id: number
): Promise<getDeliveryOrdersResponse> => {
  const { data } = await deliveryOrderServiceApi.get(`/delivery-order/${id}`);
  return data;
};
