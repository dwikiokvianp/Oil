import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { useEffect, useState } from "react";
import Scan from "../Scan/Scan.tsx";
import { OfficerNavigation } from "../../components/organisms/OfficerNavigation.tsx";

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
        <h1 className="font-semibold text-xl">Hello, Aceng</h1>
        <img src="../../../public/dotted.svg" alt="" />
      </header>
      <section>
        <div className="grid grid-cols-2 gap-6">
          {officerNavigation.map((item) => (
            <OfficerNavigation
              key={item.id}
              name={item.name}
              icon={item.icon}
              navigate={item.navigate}
            />
          ))}
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 flex items-center mt-4 justify-between">
        <section className="font-Montserrat">
          <button className="bg-[#FFADAD] p-2  rounded px-6 hover:bg-pink-500 py-3">
            <p className="text-xs ">SCAN QR</p>
          </button>
        </section>
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
