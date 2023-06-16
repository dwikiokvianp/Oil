import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { addNotification } from "../utils/notification.utils.ts";
export function FormAddUser() {
  const mutation = useMutation({
    mutationFn: () => {
      registerForm.company_id = Number(registerForm.company_id);
      const { data } = axios.post(
        "http://localhost:8080/auth/register",
        registerForm
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      addNotification("success", "User added successfully");
    },
    onError: () => {
      addNotification("error", "Failed to add user");
    },
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    company_id: 1,
  });
  const onChange = (e) => {
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={onChange}
        >
          <option selected>Choose a compnay</option>
          <option value="1">Donnelly-Donnelly</option>
          <option value="2">Berge, Berge and Berge</option>
          <option value="3">Collins-Collins</option>
          <option value="4">Langosh, Langosh and Langosh</option>
          <option value="5">Herzog Ltd</option>
          <option value="6">Bartell Inc</option>
          <option value="7">Hegmann, Hegmann and Hegmann</option>
          <option value="8">Kub-Kub</option>
          <option value="9">Bradtke, Bradtke and Bradtke</option>
          <option value="10">Osinski and Sons</option>
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
