import axios from "axios";
import { LoginInput, LoginResponse } from "../pages/Login/login.type";

const userService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitLogin = async (
  userLogin: LoginInput
): Promise<LoginResponse> => {
  const { data } = await userService.post("/login", userLogin);
  return data;
};

interface RegisterOutput {
  id: number;
  email: string;
  name: string;
}

export const submitRegister = async (userRegister: LoginInput) => {
  const { data } = await userService.post("/register", userRegister);
  return data;
};
