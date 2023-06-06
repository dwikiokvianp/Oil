import * as React from "react";
import { FormEvent, useState } from "react";
import { LoginInput } from "./login.type";
import { useMutation } from "react-query";
import { submitRegister } from "../../api/login.service.api.ts";
import {
  LocalStorageKeys,
  setLocalStorage,
} from "../../utils/local.storage.utils.ts";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
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
  const mutation = useMutation({
    mutationFn: submitRegister,
    onMutate: () => {
      toast.loading("Logging in...", {
        id: "login",
      });
    },
    onSuccess: (data) => {
      setLocalStorage(LocalStorageKeys.token, data.token);
      toast.success("Register successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

  const handleSubmitRegister = (
    e: FormEvent<HTMLFormElement>,
    registerData: LoginInput
  ) => {
    e.preventDefault();
    mutation.mutate(registerData);
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
            Register New Account
          </h2>
        </section>

        <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                handleSubmitRegister(e, loginData);
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
                  Register
                </button>
              </section>
            </form>
            <Toaster />
          </div>
        </section>
      </div>
    </>
  );
}
