import { useState } from "react";
import { LoginInput } from "./login.type";
import { useMutation } from "react-query";
import { submitRegister } from "../../api/login.service.api.ts";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import type { CustomErrorType } from "../../type/axios.type";
import { FormLogin } from "../../components/organisms/FormLogin.tsx";
import { AuthHeader } from "../../components/molecules/LoginHeader.tsx";

export default function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<LoginInput>({
    name: "",
    password: "",
  });
  const mutation = useMutation({
    mutationFn: submitRegister,
    onMutate: () => {
      toast.loading("Register your account", {
        id: "register",
      });
    },
    onSuccess: (data) => {
      toast.success(data.user.name + " registered!");
      console.log("success", data.user);
      navigate("/login");
    },
    onError: (error: AxiosError<CustomErrorType>) => {
      const message = error.response?.data.error;
      console.log("error", message);
      toast.error(message as string);
    },
    onSettled: () => {
      toast.dismiss("register");
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthHeader loginState={"Register New Account"} />

        <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <FormLogin
              handleSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(registerData);
              }}
              handleOnChange={(e) => {
                e.preventDefault();
                const { name, value } = e.target;
                setRegisterData({ ...registerData, [name]: value });
              }}
              data={registerData}
            />
            <Toaster />
          </div>
        </section>
      </div>
    </>
  );
}
