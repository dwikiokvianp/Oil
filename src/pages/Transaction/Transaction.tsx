import { useQuery } from "react-query";
import { getTransaction } from "../../api/transaction.service.api.ts";
import { formatUnixTimestamp } from "../../utils/day.converter.ts";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export function Transaction() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: Transactions, isLoading } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => getTransaction(page),
  });

  return (
    <div className="flex justify-end">
      <div className="w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Transaction
              </h1>
              <p className="mt-2 text-sm text-gray-700">Get transaction</p>
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
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Product
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
                          Created At
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
                              : index + 1 + 5 * (page - 1)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.User.username}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.Oil.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.Vehicle.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatUnixTimestamp(transaction.created_at)}
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
          </div>

          <ReactPaginate
            breakLabel="..."
            pageCount={isLoading ? 0 : (Transactions?.total as number)}
            onPageChange={(e) => {
              setPage(e.selected + 1);
            }}
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center gap-x-2 mt-4"
            pageClassName="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
