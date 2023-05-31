import { FormEvent, useState } from "react";
import { LoginInput } from "./login.type";
import { useMutation } from "react-query";
import { submitLogin } from "../../api/login.service.api.ts";
import * as React from "react";
export default function Login() {
  const [loginData, setLogin] = useState<LoginInput>({
    name: "",
    password: "",
  });
  const [loginState, setLoginState] = useState("Admin Login");
  const mutation = useMutation({
    mutationFn: submitLogin,
    onMutate: (data) => {
      console.log(data);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
    },
  });

  const handleOnChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...loginData, [name]: value });
    console.log(loginData);
  };

  const handleSubmitLogin = (
    e: FormEvent<HTMLFormElement>,
    loginData: LoginInput
  ) => {
    console.log(loginData);
    e.preventDefault();
    mutation.mutate(loginData);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            {loginState}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                handleSubmitLogin(e, loginData);
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    onChange={(e) => handleOnChangeLogin(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => handleOnChangeLogin(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
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
                }}
              >
                {loginState === "Admin Login"
                  ? "Go To Employee Login"
                  : "Go To Admin Login"}
              </button>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
