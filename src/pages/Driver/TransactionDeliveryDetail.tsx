import { DetailTransaction } from "../admin/pages/Transaction/DetailTransaction.tsx";
import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";

export const TransactionDeliveryDetail = () => {
  return (
    <div className="m-5">
      <HeaderOfficerTitle title={"Delivery Point"} />
      <div className="mt-8">
        <DetailTransaction />
      </div>
    </div>
  );
};
