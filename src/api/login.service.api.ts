import axios from "axios";
import { LoginInput, LoginResponse } from "../pages/Login/login.type";

const userService = axios.create({
  baseURL: import.meta.env.USER_SERVICE_URL,
});

export const submitLogin = async (
  userLogin: LoginInput
): Promise<LoginResponse> => {
  const { data } = await userService.post(
    "http://13.250.44.129:8081/api/auth/login",
    { ...userLogin }
  );
  return data;
};
