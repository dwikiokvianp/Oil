import { orderInput } from "./constant/order.constant.ts";
import { useState } from "react";
import type { SalesInput } from "../Sales/sales.d.type.ts";
import { useMutation } from "react-query";
import { postOrder } from "../../api/order.service.api.ts";
import toast, { Toaster } from "react-hot-toast";

export default function Order() {
  const [orderData, setOrderData] = useState<SalesInput>({
    name: "",
    email: "",
    phone: "",
    address: "",
    liter: 0,
  });

  const mutation = useMutation({
    mutationFn: postOrder,
    onMutate: () => {
      toast.loading("Posting your order...", {
        id: "save",
      });
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error("An error occurred");
    },
    onSettled: () => {
      toast.dismiss("save");
    },
  });

  const handleOnChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(orderData);
      }}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Order Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This is where you'll provide your order information.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {orderInput.map((item) => (
              <div className="sm:col-span-3" key={item.id}>
                <label
                  htmlFor={item.state}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {item.name}
                </label>
                <div className="mt-2">
                  <input
                    id={item.state}
                    name={item.state}
                    type={item.type}
                    autoComplete={item.state}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => handleOnChangeOrder(e)}
                    placeholder={item.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        <Toaster />
      </div>
    </form>
  );
}
