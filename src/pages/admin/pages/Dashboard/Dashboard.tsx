import { useQuery } from "react-query";
import {
  getHistory,
  getTransaction,
} from "../../../../api/transaction.service.api.ts";
import type { TransactionData } from "../Transaction/transaction.d.type.ts";
import { formatUnixTimestamp } from "../../../../utils/day.converter.ts";

export default function Dashboard() {
  const { data: History, isLoading: isHistoryLoading } = useQuery({
    queryKey: "history",
    queryFn: getHistory,
  });
  const { data: PendingCustomer } = useQuery({
    queryKey: "PendingCustomer",
    queryFn: () => getTransaction(1, "pending", 3),
  });
  const { data: ApprovedCustomer } = useQuery({
    queryKey: "ApprovedCustomer",
    queryFn: () => getTransaction(1, "approved", 3),
  });

  const { data: PickupCustomer } = useQuery({
    queryKey: "PickupCustomer",
    queryFn: () => getTransaction(1, "pickup", 3),
  });
  return (
    <>
      <div className="mb-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Last 30 days
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover:scale-105 duration-100">
            <dt className="truncate text-sm font-medium text-gray-500">
              Total Fuel Out
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {!isHistoryLoading ? (
                (History?.totalQuantityOut as number) / 1000
              ) : (
                <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-24"></div>
              )}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover:scale-105 duration-100">
            <dt className="truncate text-sm font-medium text-gray-500">
              Total Fuel In
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {!isHistoryLoading ? (
                (History?.totalQuantityIn as number) / 1000
              ) : (
                <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-24"></div>
              )}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover:scale-105 duration-100">
            <dt className="truncate text-sm font-medium text-gray-500">
              Total Quantity Out
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {!isHistoryLoading ? (
                (History?.totalQuantityOut as number) / 1000
              ) : (
                <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-24"></div>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="grid grid-cols-9 gap-5">
        {(PendingCustomer?.data.length as number) > 0 ? (
          <TransactionStatus
            title={"Pending Transaction"}
            data={PendingCustomer?.data as TransactionData[]}
          />
        ) : (
          <TransactionStatusEmpty title={"Pending Transaction"} />
        )}
        {(ApprovedCustomer?.data.length as number) > 0 ? (
          <TransactionStatus
            title={"Latest Approved Transaction"}
            data={ApprovedCustomer?.data as TransactionData[]}
          />
        ) : (
          <TransactionStatusEmpty title={"Latest Approved Transaction"} />
        )}
        {(PickupCustomer?.data.length as number) > 0 ? (
          <TransactionStatus
            title={"Latest Pickup Transaction"}
            data={PickupCustomer?.data as TransactionData[]}
          />
        ) : (
          <TransactionStatusEmpty title={"Pickup Transaction"} />
        )}
      </div>
    </>
  );
}

interface TransactionStatusProps {
  title: string;
  data: TransactionData[];
}

function TransactionStatus(props: TransactionStatusProps) {
  return (
    <div className="mt-4 col-span-3">
      <header>
        <h1 className="font-semibold">{props.title}</h1>
      </header>

      <main className="mt-4">
        <div className="rounded-xl border shadow-xl">
          <div className="m-3">
            {props.data.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-2  ${
                  index === 1 ? "border-y-2" : null
                }`}
              >
                <div className="p-4">
                  <div>
                    <p className="text-slate-400 font-light">Customer Name</p>
                    <p className="font-semibold">{item.User.username}</p>
                    <p className="text-slate-400 font-light mt-4">Quantity</p>
                    <p className="font-semibold">
                      {item.transaction_detail.map((item) => {
                        return item.quantity;
                      })}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between items-end">
                  <p>{formatUnixTimestamp(item.created_at)}</p>
                  <p className="text-blue-500 cursor-pointer">View Detail</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
function TransactionStatusEmpty({ title }: { title: string }) {
  return (
    <div className="col-span-3 mt-4">
      <header>
        <h1 className="font-semibold">{title}</h1>
      </header>

      <main className="mt-4">
        <div className="h-[460px] rounded-xl border shadow-xl flex justify-center items-center">
          <div className="font-semibold text-slate-700">
            <h1>{title} is empty</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
