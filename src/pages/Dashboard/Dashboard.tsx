const stats = [
  { name: "Total Pending Order", stat: "10" },
  { name: "Total Approved Order", stat: "10" },
  { name: "Total Finished Order", stat: "2" },
];

export default function Dashboard() {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Last 30 days
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 hover:scale-105 duration-100"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <TransactionStatus title={"Pending Transaction"} />
        <TransactionStatus title={"Approved Transaction"} />
        <TransactionStatus title={"Pickup Transaction"} />
      </div>
    </>
  );
}

interface TransactionStatusProps {
  title: string;
}

const data = [
  {
    id: 1,
    username: "Aceng",
    quantity: 8000,
    date: "25 Juni 2021",
  },
  {
    id: 2,
    username: "Vincent",
    quantity: 8000,
    date: "25 Juni 2021",
  },
  {
    id: 3,
    username: "Dewa",
    quantity: 8000,
    date: "25 Juni 2021",
  },
];

function TransactionStatus(props: TransactionStatusProps) {
  return (
    <div className="h-[70vh] mt-10">
      <header>
        <h1 className="font-semibold">{props.title}</h1>
      </header>

      <main className="mt-8">
        <div className="h-[55vh] rounded-xl border shadow-xl">
          <div className="m-7">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-2 mb-3 h-36 ${
                  index === 1 ? "border-y-2" : null
                }`}
              >
                <div className="p-4">
                  <div>
                    <p className="text-slate-400 font-light">Customer Name</p>
                    <p className="font-semibold">{item.username}</p>
                    <p className="text-slate-400 font-light mt-4">Quantity</p>
                    <p className="font-semibold">{item.quantity}</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between items-end">
                  <p>{item.date}</p>
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
