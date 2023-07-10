import { useQuery } from "react-query";
import { getTransaction } from "../../../../api/transaction.service.api.ts";
import { formatIndonesianTime } from "../../../../utils/day.converter.ts";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export function Transaction() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("approved");
  const { data: Transactions, isLoading } = useQuery({
    queryKey: ["transactions", page, status],
    queryFn: () => getTransaction(page, status),
    keepPreviousData: true,
  });

  return (
    <div className="flex justify-end">
      <div className="w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4">
            <div className="sm:flex sm:items-center col-span-3">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Transaction
                </h1>
                <p className="mt-2 text-sm text-gray-700">Get transaction</p>
              </div>
            </div>
            <div>
              <label
                htmlFor="select"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <select
                id="status"
                name="status"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value={"pending"}>Pending</option>
                <option value={"approved"}> Approved</option>
                <option value={"pickup"}> Pickup</option>
              </select>
            </div>
          </div>
          <div className="mt-8 flow-root ">
            {Transactions?.data.length === 0 ? (
              <div className=" flex justify-center items-center h-full">
                <p className="text-2xl font-semibold text-gray-500">
                  No transaction found
                </p>
              </div>
            ) : (
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
                            No
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Customer Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Company Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Ship Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Delivery Date
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
                        {Transactions?.data.map((transaction, index) => (
                          <tr key={transaction.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {page === 1
                                ? index + 1
                                : index + 1 + 10 * (page - 1)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {transaction.User.username}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {transaction.User.company.companyName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {transaction.Vehicle.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatIndonesianTime(transaction.date)}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                onClick={() => {
                                  navigate(`/transaction/${transaction.id}`);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                              >
                                Transaction Detail
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          {Transactions?.data.length === 0 ? null : (
            <ReactPaginate
              breakLabel="..."
              previousLabel={<ChevronLeftIcon className="w-5 h-5" />}
              nextLabel={<ChevronRightIcon className="w-5 h-5" />}
              pageCount={isLoading ? 0 : (Transactions?.total as number)}
              onPageChange={(e) => {
                setPage(e.selected + 1);
              }}
              containerClassName="flex justify-center gap-x-2 mt-4"
              pageClassName="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
