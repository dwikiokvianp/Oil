interface OfficerInformationBarProps {
  title: string;
  value: number;
  type: "liter" | "order";
}
export function OfficerInformationBar({
  title,
  value,
  type,
}: OfficerInformationBarProps) {
  return (
    <div className="border-[1px] rounded-xl shadow-lg">
      <div className="p-4">
        <h1 className="text-[#B2B2B2] text-sm font-medium"> {title}</h1>
        <h1 className="text-black font-medium text-base">
          {" "}
          {value} {type === "order" ? "order" : "liter"}
        </h1>
      </div>
    </div>
  );
}
