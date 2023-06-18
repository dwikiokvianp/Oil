interface OrderBarInformation {
  company_name: string;
  phone_number: string;
  status: "pending" | "done";
  date: string;
  quantity: number;
}
export function OrderBarInformation({
  company_name,
  phone_number,
  status,
  date,
  quantity,
}: OrderBarInformation) {
  return (
    <div className="border-[1px] rounded-xl shadow-xl my-2">
      <div className="p-4">
        <header className="flex justify-between items-center">
          <div className="text-sm font-semibold">{company_name}</div>
          {status === "done" ? (
            <div className="text-xs font-semibold text-white bg-[#3AB600] px-2 py-1 rounded">
              {"SUCCESS"}
            </div>
          ) : (
            <div className="text-xs font-semibold text-white bg-[#FF5C00] px-2 py-1 rounded">
              {"PENDING"}
            </div>
          )}
        </header>
        <div className="text-xs text-[#B2B2B2]">
          <div>{phone_number}</div>
          <div className="flex gap-6">
            <div>Filling Schedule</div>
            <div>Filling Schedule</div>
          </div>
          <div className="flex gap-6 text-sm font-semibold text-black">
            <div>{date}</div>
            <div>{quantity} Liter</div>
          </div>
        </div>
      </div>
    </div>
  );
}
