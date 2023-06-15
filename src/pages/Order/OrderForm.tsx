import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../api/users.service.api.ts";
import { formatUnixTimestamp } from "../../utils/day.converter.ts";
import { TransactionUser } from "../Transaction/TransactionUser.tsx";

export function OrderForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: User } = useQuery({
    queryKey: ["users", params.id],
    queryFn: () => getUserById(Number(params.id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return (
    <div className="divide-y divide-gray-900/10 sm:block lg:flex">
      <div className="gap-x-8 gap-y-4 md:grid-cols-3">
        <div className="px-4 sm:px-3">
          <h1 className="text-base font-semibold text-gray-900" style={{fontSize: "25px"}}>
            Personal Information
          </h1>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p> */}
        </div>

        <form className="mt-5 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Username
                </label>
                <div className="mt-2">
                  <label className="block text-medium font-medium leading-10 text-black-900" style={{fontSize: "25px"}}>Davis</label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Company Name
                </label>
                <div className="mt-2">
                 <label className="block text-medium font-medium leading-10 text-black-900" style={{fontSize: "23px"}}>Aptaworks</label>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <label className="block text-medium font-medium leading-10 text-black-900" style={{fontSize: "23px"}}>test@apta.id</label>
                </div>
              </div>

              <div className="sm:col-span-5 ">
                <label
                  htmlFor="city"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                 <label className="block text-medium font-medium leading-10 text-black-900" style={{fontSize: "22px"}}>0812812818</label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Balance
                </label>
                <div className="mt-2">
                  <label className="block text-medium font-medium leading-6 text-black-900" style={{fontSize: "22px"}}>0</label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="postal-code"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Credit
                </label>
                <div className="mt-2">
                  <label className="block text-medium font-medium leading-6 text-black-900" style={{fontSize: "22px"}}>0</label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-medium font-medium leading-6 text-gray-400"
                >
                  Member Since
                </label>
                <div className="mt-2">
                  <label className="block text-medium font-medium leading-6 text-black-900" style={{fontSize: "22px"}}>04 Juni 2023</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            {/* <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button> */}
            {/* <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                navigate(`/order/${User?.data.id}/transaction`);
              }}
            >
              Proceed Transaction
            </button> */}
          </div>
        </form>
      </div>
      <TransactionUser />
    </div>
  );
}
