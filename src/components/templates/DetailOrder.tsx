import { useQuery } from "react-query";
import { getTransactionById } from "../../api/transaction.service.api.ts";

export function DetailOrder({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => getTransactionById(id),
    onSuccess: (data) => {
      console.log(data, "ini data dari kamera");
    },
  });
  return (
    <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Order Detail
      </h2>
      <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
        <thead className="border-b border-gray-200 text-gray-900">
          <tr>
            <th scope="col" className="px-0 py-3 font-semibold">
              Name
            </th>
            <th
              scope="col"
              className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="max-w-0 px-0 py-3 align-top">
              <div className="truncate font-medium text-gray-900">
                Customer Name
              </div>
            </td>
            <td className="hidden py-3 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {data?.data.User.username}
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="max-w-0 px-0 py-3 align-top">
              <div className="truncate font-medium text-gray-900">Email</div>
            </td>
            <td className="hidden py-3 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {data?.data.User.email}
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="max-w-0 px-0 py-3 align-top">
              <div className="truncate font-medium text-gray-900">Phone</div>
            </td>
            <td className="hidden py-3 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {data?.data.User.phone}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
