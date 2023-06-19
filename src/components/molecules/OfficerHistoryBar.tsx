interface OfficerHistoryBar {
  type: string;
  date: string;
  quantity: number;
}
export function OfficerHistoryBar({ type, date, quantity }: OfficerHistoryBar) {
  return (
    <div className="border-[1px] shadow-md rounded-xl my-2">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-[#5243DF] font-semibold text-sm">{type}</div>
          <div className="text-[#B2B2B2] font-medium text-xs">{date}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-md">{quantity} Liter</div>
          <div className="text-[#00A3FF] text-xs"> Detail</div>
        </div>
      </div>
    </div>
  );
}
