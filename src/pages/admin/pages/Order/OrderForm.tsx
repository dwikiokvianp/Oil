import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserById } from "../../../../api/users.service.api.ts";
import { formatIndonesianTime } from "../../../../utils/day.converter.ts";
import { OrderTransaction } from "./OrderTransaction.tsx";
import { getTransactionByUserId } from "../../../../api/transaction.service.api.ts";
import { classNames } from "../../../../utils/class.mapper.utils.ts";
import React from "react";

export function OrderForm() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: User, isLoading } = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: () => getUserById(Number(params.id)),
  });

  const {
    data: HistoryTransaction,
    isLoading: isHistoryLoading,
    error: HistoryError,
  } = useQuery({
    queryKey: ["history", params.id],
    queryFn: () => getTransactionByUserId(Number(params.id)),
    onSuccess: (data) => {
      console.log(data.data.length > 0);
    },
    retry: false,
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
                      {isLoading ? <SkeletonForm /> : <p>7 Juli 2023</p>}
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
        <div className="col-span-2 w-full mt-4">
          <h1 className="text-lg font-bold text-gray-900 mr-20">
            History Transaction
          </h1>
          <main className="h-80 rounded">
            <div className="px-4 sm:px-6 lg:px-1">
              <div className=" mt-2 ring-1 ring-gray-900/10 sm:mx-0 sm:rounded-lg">
                <table className="w-full divide-y divide-gray-900/2">
                  {isHistoryLoading ? (
                    <>
                      <tr>
                        <td>
                          <SkeletonForm />
                        </td>
                        <td>
                          <SkeletonForm />
                        </td>
                        <td>
                          <SkeletonForm />
                        </td>
                        <td>
                          <SkeletonForm />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tbody>
                        {HistoryError ? (
                          <React.Fragment>
                            <h1>
                              No History Transaction, Please Make a Transaction
                            </h1>
                          </React.Fragment>
                        ) : (
                          <>
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
                            {HistoryTransaction?.data.map((plan, planIdx) => (
                              <tr key={plan.id}>
                                <td
                                  className={classNames(
                                    planIdx === 0
                                      ? ""
                                      : "border-t border-transparent",
                                    "relative py-4 pl-4 pr-3 text-xs sm:pl-6"
                                  )}
                                >
                                  {plan.transaction_detail.map((item) => (
                                    <div key={item.id}>{item.oil.name}</div>
                                  ))}
                                </td>
                                <td>
                                  <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                    <span>
                                      {plan.transaction_detail.map((item) => (
                                        <div key={item.id}>{item.oil.id}</div>
                                      ))}
                                    </span>
                                  </div>
                                </td>
                                <td
                                  className={classNames(
                                    planIdx === 0
                                      ? ""
                                      : "border-t border-gray-200",
                                    "hidden px-3 py-1 text-sm text-gray-500 lg:table-cell"
                                  )}
                                >
                                  {plan.transaction_detail.map((item) => (
                                    <div key={item.id}>{item.quantity}</div>
                                  ))}
                                </td>
                                <td
                                  className={classNames(
                                    planIdx === 0
                                      ? ""
                                      : "border-t border-gray-200",
                                    "hidden px-3 py-1 text-sm text-gray-500 lg:table-cell"
                                  )}
                                >
                                  {formatIndonesianTime(plan.date)}
                                </td>
                                <td
                                  className={classNames(
                                    planIdx === 0
                                      ? ""
                                      : "border-t border-transparent",
                                    "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                                  )}
                                >
                                  <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(`/transaction/${plan.id}`);
                                    }}
                                  >
                                    Detail
                                  </button>
                                  {planIdx !== 0 ? (
                                    <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                                  ) : null}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </>
                  )}
                </table>
              </div>
            </div>
          </main>
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

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];

export default function HistoryUserTransaction() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
