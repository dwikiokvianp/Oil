import * as React from "react";
import { FormEvent, useState } from "react";
import { LoginInput } from "./login.type";
import { useMutation } from "react-query";
import { submitLogin } from "../../api/login.service.api.ts";
import {
  LocalStorageKeys,
  setLocalStorage,
} from "../../utils/local.storage.utils.ts";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../store/login.slice.ts";

export default function Login() {
  const switchUser = useLoginStore((state) => state.setReverse);
  const LoginForm = [
    {
      id: 1,
      label: "Username",
      name: "name",
      type: "text",
    },
    {
      id: 2,
      label: "Password",
      name: "password",
      type: "password",
    },
  ];
  const navigate = useNavigate();
  const [loginData, setLogin] = useState<LoginInput>({
    name: "",
    password: "",
  });
  const [loginState, setLoginState] = useState("Admin Login");
  const mutation = useMutation({
    mutationFn: submitLogin,
    onMutate: () => {
      toast.loading("Logging in...", {
        id: "login",
      });
    },
    onSuccess: (data) => {
      setLocalStorage(LocalStorageKeys.token, data.token);
      console.log(data);
      toast.success("Register successful!");
      navigate("/");
    },
    onError: (error: any) => {
      const message = error.response.data.error;
      toast.error(message);
    },
    onSettled: () => {
      toast.dismiss("login");
    },
  });

  const handleOnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...loginData, [name]: value });
  };

  const handleSubmitLogin = (
    e: FormEvent<HTMLFormElement>,
    loginData: LoginInput
  ) => {
    e.preventDefault();
    mutation.mutate(loginData);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <section className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            {loginState}
          </h2>
        </section>

        <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                handleSubmitLogin(e, loginData);
              }}
              className="space-y-6"
            >
              {LoginForm.map((item) => {
                return (
                  <div key={item.id}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {item.label}
                    </label>
                    <div className="mt-2">
                      <input
                        id={item.name}
                        name={item.name}
                        type={item.type}
                        autoComplete={item.name}
                        onChange={(e) => handleOnChangeLogin(e)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                );
              })}
              <section>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </section>
            </form>
            <div className="text-sm leading-6 mt-4">
              <button
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  if (loginState === "Admin Login") {
                    setLoginState("Employee Login");
                  } else {
                    setLoginState("Admin Login");
                  }
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
                haDon't have an account? Register here
              </button>
            </div>
            <Toaster />
          </div>
        </section>
      </div>
    </>
  );
}
