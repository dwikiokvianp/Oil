import { orderInput, OrderInputState } from "./constant/order.constant.ts";
import { useState } from "react";

export default function Order() {
  const [orderLogin, setOrderLogin] = useState<OrderInputState>({});

  const handleOnChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOrderLogin({ ...orderLogin, [name]: value });
  };

  return (
    <form>
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
      </div>
    </form>
  );
}
