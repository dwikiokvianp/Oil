import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { MdDomainDisabled } from "react-icons/md";

export function Handover() {
  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Handover List"} />
      <div className=" w-full h-[90vh] flex justify-center items-center text-7xl">
        <MdDomainDisabled />
      </div>
    </div>
  );
}
