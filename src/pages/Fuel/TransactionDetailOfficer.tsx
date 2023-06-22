import { DetailTransaction } from "../Transaction/DetailTransaction.tsx";
import { HeaderOfficerTitle } from "../../components/molecules/HeaderOfficerTitle.tsx";

export function TransactionDetailOfficer() {
  return (
    <div className="m-2">
      <HeaderOfficerTitle title={"Detail Transaction"} />
      <div className="mt-8">
        <DetailTransaction />
      </div>
    </div>
  );
}
