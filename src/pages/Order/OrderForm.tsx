import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserById } from "../../api/users.service.api.ts";
import { formatIndonesianTime } from "../../utils/day.converter.ts";
import { OrderTransaction } from "./OrderTransaction.tsx";
import { classNames } from "../../utils/class.mapper.utils.ts";

export function OrderForm() {
  const params = useParams();

  const { data: User, isLoading } = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: () => getUserById(Number(params.id)),
  });

  return (
    <>
      <div className="sm:block lg:grid grid-cols-4">
        <div className="gap-x-8 gap-y-4 md:grid-cols-4 col-span-2">
          <div className="px-4 sm:px-3">
            <h1 className="text-lg font-bold text-gray-900 ">
              Personal Information
            </h1>
          </div>

          <form className="mt-5 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-medium font-medium text-gray-400"
                  >
                    Username
                  </label>
                  <div>
                    <label
                      className={`block rounded text-medium font-medium text-black-900`}
                    >
                      {isLoading ? <SkeletonForm /> : User?.data.username}
                    </label>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="postal-code"
                    className="block text-medium font-medium text-gray-400"
                  >
                    Member Since
                  </label>
                  <div>
                    <label className="block text-medium font-medium text-black-900">
                      {isLoading ? (
                        <SkeletonForm />
                      ) : (
                        formatIndonesianTime(User?.data.created_at as string)
                      )}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="last-name"
                    className="block text-medium font-medium text-gray-400"
                  >
                    Company Name
                  </label>
                  <div>
                    <label className="block text-medium font-medium  text-black-900">
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
                    className="block text-medium font-medium text-gray-400"
                  >
                    Email Address
                  </label>
                  <div>
                    <label className="block text-medium font-medium  text-black-900">
                      {isLoading ? <SkeletonForm /> : User?.data.email}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-medium font-medium text-gray-400"
                  >
                    Balance
                  </label>
                  <div>
                    <label className="block text-medium font-medium text-black-900">
                      {isLoading ? <SkeletonForm /> : User?.data.detail.balance}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="postal-code"
                    className="block text-medium font-medium text-gray-400"
                  >
                    Credit
                  </label>
                  <div>
                    <label className="block text-medium font-medium text-black-900">
                      {isLoading ? <SkeletonForm /> : User?.data.detail.credit}
                    </label>
                  </div>
                </div>
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="city"
                    className="block text-medium font-medium text-gray-400"
                  >
                    Phone Number
                  </label>
                  <div>
                    <label className="block text-medium font-medium text-black-900">
                      {isLoading ? <SkeletonForm /> : User?.data.phone}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <OrderTransaction />
        </div>
        <div className="col-span-2 absolute bottom-5 w-[61vh]">
          <header>
            <h1 className="text-lg font-bold text-gray-900">
              History Transaction
            </h1>
          </header>
          <main className="h-80 rounded">
            <div className="px-4 sm:px-6 lg:px-1">
              <div className=" mt-2 ring-1 ring-gray-900/10 sm:mx-0 sm:rounded-lg">
                <table className="w-full divide-y divide-gray-900/2">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-xs font-semibold text-gray-900 lg:table-cell"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-xs font-semibold text-gray-900 lg:table-cell"
                      >
                        Transaction Date
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Select</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, planIdx) => (
                      <tr key={plan.id}>
                        <td
                          className={classNames(
                            planIdx === 0 ? "" : "border-t border-transparent",
                            "relative py-4 pl-4 pr-3 text-xs sm:pl-6"
                          )}
                        >
                          <div className="font-medium text-gray-900">
                            {plan.name}
                            {plan.isCurrent ? (
                              <span className="ml-1 text-indigo-600">
                                (Current Plan)
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                            <span>
                              {plan.memory} / {plan.cpu}
                            </span>
                            <span className="hidden sm:inline">·</span>
                            <span>{plan.storage}</span>
                          </div>
                          {planIdx !== 0 ? (
                            <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                          ) : null}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? "" : "border-t border-gray-200",
                            "hidden px-3 py-1 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {plan.memory}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? "" : "border-t border-gray-200",
                            "hidden px-3 py-1 text-sm text-gray-500 lg:table-cell"
                          )}
                        >
                          {plan.cpu}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? "" : "border-t border-gray-200",
                            "hidden px-3 py-3.5 text-sm text-gray-500"
                          )}
                        >
                          {plan.storage}
                        </td>
                        <td
                          className={classNames(
                            planIdx === 0 ? "" : "border-t border-transparent",
                            "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                          )}
                        >
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                            disabled={plan.isCurrent}
                          >
                            Detail
                            <span className="sr-only">, {plan.name}</span>
                          </button>
                          {planIdx !== 0 ? (
                            <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

const plans = [
  {
    id: 1,
    name: "Oil",
    memory: "8000",
    cpu: "24 Juni 2021",
    storage: "128 ",
    price: "$40",
    isCurrent: false,
  },
  {
    id: 2,
    name: "MFO",
    memory: "8000",
    cpu: "24 Juni 2021",
    storage: "256 ",
    price: "$80",
    isCurrent: false,
  },
  {
    id: 3,
    name: "Oil",
    memory: "8000",
    cpu: "25 Juni 2021",
    storage: "256",
    price: "$80",
    isCurrent: false,
  },
  {
    id: 4,
    name: "MFO",
    memory: "8000",
    cpu: "27 Juni 2021",
    storage: "256",
    price: "$80",
    isCurrent: false,
  },
];

export function SkeletonForm() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded "></div>
    </div>
  );
}
