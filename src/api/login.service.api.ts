import axios from "axios";
import { LoginInput, LoginResponse } from "../pages/Login/login.type";

const userService = axios.create({
  baseURL: "http://localhost:3000",
});

export const submitLogin = async (
  userLogin: LoginInput
): Promise<LoginResponse> => {
  const { data } = await userService.post("/login", { ...userLogin });
  return data;
};
