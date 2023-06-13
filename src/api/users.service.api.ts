import axios from "axios";
import {
  GetOfficer,
  GetUser,
  GetUserById,
} from "../pages/Order/constant/order.constant.ts";

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

export const getUserById = async (id: number): Promise<GetUserById> => {
  const { data } = await userService.get(`/users/${id}`);
  return data;
};

export const getOfficer = async (): Promise<GetOfficer> => {
  const { data } = await userService.get(`/officer/`);
  return data;
};
