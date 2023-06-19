import { useState } from "react";
import { LoginInput } from "./login.type";
import { useMutation } from "react-query";
import { submitLogin } from "../../api/login.service.api.ts";
import {
  LocalStorageKeys,
  setLocalStorage,
} from "../../utils/local.storage.utils.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { CustomErrorType } from "../../type/axios.type";
import { AuthHeader } from "../../components/molecules/LoginHeader.tsx";
import { FormLogin } from "../../components/organisms/FormLogin.tsx";
import { addNotification } from "../../utils/notification.utils.ts";
import { useLoginStore } from "../../store/login.slice.ts";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLogin] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const loginState = useLoginStore((state) => state.setRole);

  const mutation = useMutation({
    mutationFn: submitLogin,
    onMutate: () => {
      addNotification("info", "Please wait...");
    },
    onSuccess: (data) => {
      setLocalStorage(LocalStorageKeys.access_token, data.token.access_token);
      setLocalStorage(LocalStorageKeys.email, data.token.email);
      setLocalStorage(LocalStorageKeys.role, data.token.role);
      setLocalStorage(LocalStorageKeys.name, data.token.name);
      console.log(data.token);
      addNotification("success", "Login success");
      if (data.token.role === "ADMIN_SALES") {
        loginState("ADMIN_SALES");
        navigate("/");
      } else if (data.token.role === "OFFICER") {
        loginState("OFFICER");
        navigate("/officer");
      } else if (data.token.role === "ADMIN_PUSAT") {
        loginState("ADMIN_PUSAT");
        navigate("/order");
      } else {
        loginState("USER");
      }
    },
    onError: (error: AxiosError<CustomErrorType>) => {
      const message = error.response?.data.message;
      addNotification("error", message as string);
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthHeader loginState={"Login User"} />
        <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <FormLogin
              handleSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(loginData);
              }}
              handleOnChange={(e) => {
                e.preventDefault();
                const { name, value } = e.target;
                setLogin({ ...loginData, [name]: value });
              }}
              data={loginData}
            />
            <div className="text-sm leading-6 mt-4"></div>
          </div>
        </section>
      </div>
    </>
  );
}
