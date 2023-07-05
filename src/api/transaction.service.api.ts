import axios from "axios";
import type { TransactionData } from "../pages/Transaction/transaction.d.type.ts";

export const transactionService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getTransaction = async (
  page?: number,
  status?: string
): Promise<{
  data: TransactionData[];
  page: number;
  pageSize: number;
  total: number;
}> => {
  if (status) {
    const { data } = await transactionService.get(
      `/transactions?page=${page}&status=${status}`
    );
    return data;
  } else {
    const { data } = await transactionService.get(`/transactions?page=${page}`);
    return data;
  }
};

export const getTransactionById = async (
  id: number
): Promise<{
  data: TransactionData;
}> => {
  const { data } = await transactionService.get(
    `/transactions/${id}?status=approved`
  );
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

export const todayTransaction = async (): Promise<TodayTransaction[]> => {
  const { data } = await transactionService.get("/transactions/today");
  return data;
};

export interface ProofTransaction {
  id: number;
  transaction_id: number;
  photo_ktp_url: string;
  photo_orang_url: string;
  photo_tangki_url: string;
}

export const getProofByTransactionId = async (
  id: number
): Promise<{
  data: ProofTransaction;
}> => {
  const { data } = await transactionService.get(`/proof/transaction/${id}`);
  return data;
};

interface Data {
  id: number;
  User: {
    id: number;
    name: string;
    phone: string;
    company: {
      companyName: string;
    };
  };
  quantity: number;
  status: "pending" | "done";
  date: string;
}
interface TodayTransaction {
  data: Data[];
}
export const getTodayTransactions = async (
  queryName: string
): Promise<TodayTransaction> => {
  if (!queryName) {
    const { data } = await transactionService.get("/transactions/v2/toda");
    return data;
  } else {
    const { data } = await transactionService.get(
      `/transactions/v2/toda?name=${queryName}`
    );
    return data;
  }
};

export const getTomorrowTransactions = async (): Promise<
  TodayTransaction[]
> => {
  const { data } = await transactionService.get("/transactions/tomorrow");
  return data;
};

export const getSummaryTransaction = async (): Promise<{
  oil_in: number;
  oil_out: number;
  order_done: number;
  order_today: number;
}> => {
  const { data } = await transactionService.get("/transactions/summary");
  return data;
};

interface HistoryOutTransaction {
  id: number;
  date: string;
  quantity: number;
  transaction_id: number;
}

interface HistoryInTransaction {
  date: string;
  quantity: number;
  Oil: {
    id: number;
    name: string;
  };
}

export const getHistory = async (): Promise<{
  historyOut: HistoryOutTransaction[];
  historyIn: HistoryInTransaction[];
  totalQuantity: number;
  totalIn: number;
  totalOut: number;
  totalQuantityIn: number;
  totalQuantityOut: number;
}> => {
  const { data } = await transactionService.get("/history/today");
  return data;
};
