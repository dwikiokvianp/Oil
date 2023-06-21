import { TransactionUser } from "../Transaction/TransactionUser.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserById } from "../../api/users.service.api.ts";
import { formatUnixTimestamp } from "../../utils/day.converter.ts";
import { OrderTransaction } from "./OrderTransaction.tsx";

export function OrderForm() {
  const params = useParams();

  const { data: User, isLoading } = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: () => getUserById(Number(params.id)),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <div className="divide-y divide-gray-900/10 sm:block lg:flex">
        <div className="gap-x-8 gap-y-4 md:grid-cols-3">
          <div className="px-4 sm:px-3">
            <h1
              className="text-base font-semibold text-gray-900"
              style={{ fontSize: "25px" }}
            >
              Personal Information
            </h1>
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
                    <label
                      className={`block rounded text-medium font-medium leading-10 text-black-900`}
                      style={{ fontSize: "25px" }}
                    >
                      {isLoading ? <SkeletonForm /> : User?.data.username}
                    </label>
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
                    <label
                      className="block text-medium font-medium leading-10 text-black-900"
                      style={{ fontSize: "23px" }}
                    >
                      {isLoading ? (
                        <SkeletonForm />
                      ) : (
                        User?.data.company.companyName
                      )}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-medium font-medium leading-6 text-gray-400"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <label
                      className="block text-medium font-medium leading-10 text-black-900"
                      style={{ fontSize: "23px" }}
                    >
                      {isLoading ? <SkeletonForm /> : User?.data.email}
                    </label>
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
                    <label
                      className="block text-medium font-medium leading-6 text-black-900"
                      style={{ fontSize: "22px" }}
                    >
                      {isLoading ? <SkeletonForm /> : User?.data.detail.balance}
                    </label>
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
                    <label
                      className="block text-medium font-medium leading-6 text-black-900"
                      style={{ fontSize: "22px" }}
                    >
                      {isLoading ? <SkeletonForm /> : User?.data.detail.credit}
                    </label>
                  </div>
                </div>
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="city"
                    className="block text-medium font-medium leading-6 text-gray-400"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <label
                      className="block text-medium font-medium leading-10 text-black-900"
                      style={{ fontSize: "22px" }}
                    >
                      {isLoading ? <SkeletonForm /> : User?.data.phone}
                    </label>
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
                    <label
                      className="block text-medium font-medium leading-6 text-black-900"
                      style={{ fontSize: "22px" }}
                    >
                      {isLoading ? (
                        <SkeletonForm />
                      ) : (
                        formatUnixTimestamp(User?.data.created_at as number)
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <TransactionUser />
          <OrderTransaction />
        </div>
      </div>
    </>
  );
}

export function SkeletonForm() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded "></div>
    </div>
  );
}
