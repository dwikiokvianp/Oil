import axios from "axios";
import { LoginInput, LoginResponse } from "../pages/Auth/Login/login.type";

const userService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitLogin = async (
  userLogin: LoginInput
): Promise<LoginResponse> => {
  const { data } = await userService.post("/auth/login", userLogin);
  return data;
};

export const submitRegister = async (userRegister: LoginInput) => {
  const { data } = await userService.post("/register", userRegister);
  return data;
};
