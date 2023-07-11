import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getTransactionById,
  photo,
} from "../../../../api/transaction.service.api.ts";
import EmbeddedLink from "../../../../components/EmbeddedLink.tsx";
import { formatUnixTimestamp } from "../../../../utils/day.converter.ts";
export function DetailTransaction() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["detail-transaction", id],
    queryFn: () => getTransactionById(Number(id)),
  });

  const { data: Photo, isError: isPhotoError } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => photo(Number(id)),
    retry: false,
  });

  return (
    <>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Detail Transaction Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.User?.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.User?.email}
              </dd>
            </div>
            {data?.data.transaction_detail.map((item, index) => (
              <div key={index}>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Product {index + 1}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {item.oil.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Quantity {index + 1}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {item.quantity}
                  </dd>
                </div>
              </div>
            ))}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.status === "pending" ? (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    {data?.data.status}
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {data?.data.status}
                  </span>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Company Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.User.company.username} Liter
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Quantity
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.quantity} Liter
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Ship Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.Vehicle.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Officer Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data?.data.Officer.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Created At
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formatUnixTimestamp(data?.data.created_at as number)}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {!isPhotoError ? (
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <EmbeddedLink
                      link={Photo?.data.photo_ktp_url as string}
                      fileName={`bukti petugas`}
                    />
                    <EmbeddedLink
                      link={Photo?.data.photo_tangki_url as string}
                      fileName={`bukti tangki`}
                    />
                    <EmbeddedLink
                      link={Photo?.data.photo_orang_url as string}
                      fileName={`bukti orang`}
                    />
                  </ul>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <span className="text-sm text-gray-500">
                        No attachments
                      </span>
                    </div>
                  </>
                )}
                {data?.data.qr_code_url ? (
                  <EmbeddedLink
                    link={data?.data.qr_code_url as string}
                    fileName={`Qr code`}
                  />
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <span className="text-sm text-gray-500">
                        No attachments
                      </span>
                    </div>
                  </div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
