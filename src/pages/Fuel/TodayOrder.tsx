import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";
import { OfficerInformationBar } from "../../components/molecules/OfficerInformationBar.tsx";
import { OrderBarInformation } from "../../components/molecules/OrderBarInformation.tsx";
import { AiOutlineSearch } from "react-icons/ai";

export function TodayOrder() {
  return (
    <div className="m-6">
      <HeaderOfficerTitle title={"Today Order"} />
      <section className="grid grid-cols-1 gap-4 mt-8">
        <OfficerInformationBar
          title={"Total Order Today"}
          value={250}
          type={"order"}
        />
      </section>
      <section className="flex rounded-2xl border-2 overflow-hidden border-[#B2B2B2] items-center mt-8">
        <input
          type="text"
          className="w-full border-none italic font-normal text-xs focus:outline-none"
          placeholder="Search Order"
        />
        <AiOutlineSearch className="text-[#B2B2B2] bg-white text-xl mr-2" />
      </section>
      <section className="mt-6">
        <OrderBarInformation
          date={"14 June 2023"}
          company_name={"PT XYZ"}
          quantity={8000}
          status={"done"}
          phone_number={"089677166800"}
        />
        <OrderBarInformation
          date={"14 June 2023"}
          company_name={"PT XYZ"}
          quantity={8000}
          status={"pending"}
          phone_number={"089677166800"}
        />
      </section>
    </div>
  );
}
