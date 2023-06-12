import axios from "axios";
import {
  GetUser,
  GetUserById,
} from "../pages/Order/constant/order.constant.ts";

const userService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export const getUser = async (): Promise<GetUser> => {
  const { data } = await userService.get("/users?role=4");
  return data;
};

export const getUserById = async (id: number): Promise<GetUserById> => {
  const { data } = await userService.get(`/users/${id}`);
  return data;
};
