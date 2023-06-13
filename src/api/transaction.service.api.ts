import axios from "axios";
import type { TransactionData } from "../pages/Transaction/transaction.d.type.ts";

export const transactionService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getTransaction = async (): Promise<TransactionData[]> => {
  const { data } = await transactionService.get("/transactions");
  return data;
};
