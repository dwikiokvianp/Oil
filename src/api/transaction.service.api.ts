import axios from "axios";
import type { TransactionData } from "../pages/Transaction/transaction.d.type.ts";

export const transactionService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getTransaction = async (
  page?: number
): Promise<{
  data: TransactionData[];
  page: number;
  pageSize: number;
  total: number;
}> => {
  if (page) {
    const { data } = await transactionService.get(`/transactions?page=${page}`);
    return data;
  } else {
    const { data } = await transactionService.get("/transactions");
    return data;
  }
};

export const getTransactionById = async (
  id: number
): Promise<{
  data: TransactionData;
}> => {
  const { data } = await transactionService.get(`/transactions/${id}`);
  return data;
};

export const photo = async (
  id: number
): Promise<{
  data: {
    id: number;
    photo_ktp_url: string;
    photo_orang_url: string;
    photo_tangki_url: string;
    qr_code_url: string;
  };
}> => {
  const { data } = await transactionService.get(`/proof/transaction/${id}`);
  return data;
};

export const getTransactionByUserId = async (
  id: number
): Promise<{
  data: TransactionData[];
}> => {
  const { data } = await transactionService.get(`/transactions/user/${id}`);
  return data;
};

interface TodayTransaction {
  id: number;
  name: string;
  phone: string;
  date: string;
  quantity: number;
  status: "pending" | "done";
}

const mockService = axios.create({
  baseURL: "http://localhost:3000",
});

export const todayTransaction = async (): Promise<TodayTransaction[]> => {
  const { data } = await mockService.get("/transaction-today");
  return data;
};
