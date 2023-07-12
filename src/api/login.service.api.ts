import {
  LoginInput,
  LoginResponse,
} from "../pages/Auth/pages/Login/login.type";
import { fuelApiNoAuth } from "./axios.config.ts";

export const submitLogin = async (
  userLogin: LoginInput
): Promise<LoginResponse> => {
  const { data } = await fuelApiNoAuth.post("/auth/login", userLogin);
  return data;
};

export const submitRegister = async (userRegister: LoginInput) => {
  const { data } = await fuelApiNoAuth.post("/register", userRegister);
  return data;
};
