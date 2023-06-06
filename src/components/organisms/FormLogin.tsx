import { LoginForm } from "../../pages/Login/login.constant.ts";
import { ButtonAuth } from "../atoms/ButtonAuth.tsx";
import { FormEvent } from "react";
import { LoginInput } from "../../pages/Login/login.type";

interface FormLoginProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>, loginData: LoginInput) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: LoginInput;
}

export function FormLogin({
  handleSubmit,
  handleOnChange,
  data,
}: FormLoginProps) {
  return (
    <form onSubmit={(event) => handleSubmit(event, data)} className="space-y-6">
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
                onChange={(e) => handleOnChange(e)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        );
      })}
      <ButtonAuth name={"Login"} />
    </form>
  );
}
