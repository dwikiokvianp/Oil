import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { useEffect, useState } from "react";
import Scan from "../Scan/Scan.tsx";
import { OfficerNavigation } from "../../components/organisms/OfficerNavigation.tsx";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../../utils/local.storage.utils.ts";

const officerNavigation = [
  {
    id: 1,
    name: "Fuel In",
    icon: "../../../public/fuel_in_svg.svg",
    navigate: "/fuel-in",
  },
  {
    id: 2,
    name: "Fuel Out",
    icon: "../../../public/fuel_out.svg",
    navigate: "/fuel-out",
  },
  {
    id: 3,
    name: "today order",
    icon: "../../../public/today_order.svg",
    navigate: "/today-order",
  },
  {
    id: 4,
    name: "list order",
    icon: "../../../public/list_order.svg",
    navigate: "/list-order",
  },
];

export function RootOfficer() {
  const [open, setOpen] = useState(false);

  const [isValidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsValidData(false);
    }
  }, [open]);

  return (
    <main className="m-8">
      <header className="mb-10 flex justify-between">
        <h1 className="font-semibold text-xl">
          Hello, {getLocalStorage(LocalStorageKeys.name)?.toUpperCase()}
        </h1>
        <img src="../../../public/dotted.svg" alt="" />
      </header>
      <section>
        <div className="grid grid-cols-2 gap-4 ">
          {officerNavigation.map((item) => (
            <div key={item.id} className="flex justify-center">
              <OfficerNavigation
                key={item.id}
                name={item.name}
                icon={item.icon}
                navigate={item.navigate}
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="absolute bottom-5 right-5 bg-[#5243DF] rounded-full w-[75px] flex justify-center items-center">
          <img
            onClick={() => {
              setOpen(true);
            }}
            className="p-4"
            src="../../../public/qr_code_scanner.svg"
            alt="qr_code_scanner"
          />
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
