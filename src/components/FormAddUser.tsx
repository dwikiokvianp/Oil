import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addNotification } from "../utils/notification.utils.ts";
import { getCompany, registerUser } from "../api/users.service.api.ts";
import { CustomErrorType } from "../type/axios.type";
export function FormAddUser() {
  const queryClient = useQueryClient();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    company_id: 1,
  });

  const mutation = useMutation({
    mutationFn: () => registerUser(registerForm),
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      addNotification("success", data.message);
    },
    onError: (e: CustomErrorType) => {
      console.log(e);
      addNotification("error", e.error);
    },
  });

  const { data: User } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl ">Register New User</h1>
      </div>
      <div className="my-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            type="email"
            name="email"
            onChange={onChange}
            id="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="my-2">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            type="text"
            onChange={onChange}
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="my-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            type="password"
            onChange={onChange}
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="my-2">
        <label
          htmlFor="company_id"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Select Company Name
        </label>
        <select
          id="company_id"
          name="company_id"
          defaultValue={0}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => {
            setRegisterForm({
              ...registerForm,
              [e.target.name]: e.target.value,
            });
          }}
        >
          <option value={0}>Select Company</option>
          {User?.data.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          mutation.mutate();
        }}
        className="bg-slate-700 text-white w-full rounded-xl my-4 p-3"
      >
        Register New User
      </button>
    </div>
  );
}
