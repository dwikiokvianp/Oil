import { HeaderBarToday } from "../../components/organisms/HeaderBarToday.tsx";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "react-query";
import { todayTransaction } from "../../api/transaction.service.api.ts";
import { TableHead } from "../../components/organisms/TableHead.tsx";
import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { useEffect, useState } from "react";
import Scan from "../Scan/Scan.tsx";

const tableHeadTransaction = [
  "ID Order",
  "Name",
  "Phone Number",
  "Transaction Date",
  "Status",
];

export function TodayTransaction() {
  const { data } = useQuery({
    queryKey: "getTodayTransaction",
    queryFn: todayTransaction,
  });
  const [open, setOpen] = useState(false);

  const [isValidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsValidData(false);
    }
  }, [open]);

  return (
    <main>
      <HeaderBarToday />
      <section className="px-4 sm:px-6 lg:px-8 flex items-center mt-4 justify-between">
        <section className="border-[#B2B2B2] border-[1px] rounded-lg flex items-center overflow-hidden">
          <div className="p-2">
            <BsSearch />
          </div>
          <input
            type="text"
            className="text-[12px] font-Montserrat text-[#B2B2B2]  border-none w-full outline-none"
            placeholder="Search ...."
          />
        </section>
        <section className="font-Montserrat">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-[#FFADAD] p-2  rounded px-6 hover:bg-pink-500 py-3"
          >
            <p className="text-xs">SCAN QR</p>
          </button>
        </section>
      </section>
      <section>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <TableHead tableHeadTransaction={tableHeadTransaction} />
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data?.map((person) => (
                        <tr key={person.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.phone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.date}
                          </td>
                          <td className=" relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="w-full flex justify-center">
                              {person.status === "pending" ? (
                                <span className="bg-red-500 text-white text-xs font-medium mr-2 px-2 py-1 rounded ">
                                  Pending
                                </span>
                              ) : (
                                <span className="bg-green-700 text-white text-xs font-medium mr-2 px-4 py-1 rounded ">
                                  Done
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        innerComponent={Scan({ isValidData, setIsValidData })}
      />
    </main>
  );
}
