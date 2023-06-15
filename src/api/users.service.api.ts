import axios from "axios";
import { GetOfficer, GetUser } from "../pages/Order/constant/order.constant.ts";

const userService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export const getUser = async (userData: {
  page: number;
  queryName?: string;
}): Promise<GetUser> => {
  userData.page = userData.page || 1;
  if (userData.queryName) {
    const { data } = await userService.get(
      `/users?role=3&page=${userData.page}&username=${userData.queryName}`
    );
    return data;
  } else {
    const { data } = await userService.get(
      `/users?role=3&page=${userData.page}`
    );
    return data;
  }
};

export const getUserById = async (
  id: number
): Promise<{
  data: User;
}> => {
  const { data } = await userService.get(`/users/${id}`);
  return data;
};

export const getOfficer = async (): Promise<GetOfficer> => {
  const { data } = await userService.get(`/officer/`);
  return data;
};

interface Company {
  id: number;
  username: string;
  password: string;
  company_detail: string;
  company_zip_code: number;
  created_at: number;
}

interface Role {
  id: number;
  role: string;
}

interface Detail {
  id: number;
  balance: number;
  credit: number;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role_id: number;
  role: Role;
  detail_id: number;
  detail: Detail;
  company: Company;
  company_id: number;
  created_at: number;
  phone: string;
}
