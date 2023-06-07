import { useState, useEffect } from "react";
import { LoginInput } from "./login.type";
import { useMutation } from "react-query";
import { submitLogin } from "../../api/login.service.api.ts";
import {
  LocalStorageKeys,
  setLocalStorage,
} from "../../utils/local.storage.utils.ts";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../store/login.slice.ts";
import { AxiosError } from "axios";
import { CustomErrorType } from "../../type/axios.type";
import { AuthHeader } from "../../components/molecules/LoginHeader.tsx";
import { FormLogin } from "../../components/organisms/FormLogin.tsx";
import { addNotification } from "../../utils/notification.utils.ts";

export default function Login() {
  const switchUser = useLoginStore((state) => state.setReverse);
  const isAdmin = useLoginStore((state) => state.isAdmin);
  const navigate = useNavigate();
  const [loginData, setLogin] = useState<LoginInput>({
    name: "",
    password: "",
    role: isAdmin ? "ADMIN" : "PETUGAS",
  });

  const [loginState, setLoginState] = useState("Admin Login");
  const mutation = useMutation({
    mutationFn: submitLogin,
    onMutate: () => {
      addNotification("info", "Please wait...");
    },
    onSuccess: ({ token, name }) => {
      setLocalStorage(LocalStorageKeys.token, token);
      setLocalStorage(LocalStorageKeys.name, name);
      addNotification("success", "Login success");
      navigate("/");
    },
    onError: (error: AxiosError<CustomErrorType>) => {
      const message = error.response?.data.message;
      addNotification("error", message as string);
    },
  });

  useEffect(() => {
    if (loginState === "Admin Login") {
      setLogin((prev) => ({ ...prev, role: "ADMIN" }));
    } else {
      setLogin((prev) => ({ ...prev, role: "PETUGAS" }));
    }
  }, [loginState]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthHeader loginState={loginState} />
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
            <div className="text-sm leading-6 mt-4">
              <button
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  setLoginState(
                    loginState === "Admin Login"
                      ? "Employee Login"
                      : "Admin Login"
                  );
                  switchUser();
                }}
              >
                {loginState === "Admin Login"
                  ? "Go To Employee Login"
                  : "Go To Admin Login"}
              </button>
            </div>
            <div className="text-sm leading-6 mt-4">
              <button
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Don't have an account? Register here
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
