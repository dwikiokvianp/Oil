import axios from "axios";
import { LoginInput, LoginResponse } from "../pages/Login/login.type";

const userService = axios.create({
  baseURL: "http://13.250.44.129:8081/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitLogin = async (userLogin: LoginInput) => {
  console.log(userLogin, "terpanggil");
  const { data } = await userService.post("/login", userLogin);
  return data;
};
