import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { useEffect, useState } from "react";
import Scan from "../Scan/Scan.tsx";
import { OfficerNavigation } from "../../components/organisms/OfficerNavigation.tsx";

export function TodayTransaction() {
  const [open, setOpen] = useState(false);

  const [isValidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsValidData(false);
    }
  }, [open]);

  return (
    <main>
      <section className="m-8">
        <div className="grid grid-cols-2 gap-6">
          <OfficerNavigation />
          <OfficerNavigation />
          <OfficerNavigation />
          <OfficerNavigation />
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 flex items-center mt-4 justify-between">
        <section className="font-Montserrat">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-[#FFADAD] p-2  rounded px-6 hover:bg-pink-500 py-3"
          >
            <p className="text-xs ">SCAN QR</p>
          </button>
        </section>
      </section>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        innerComponent={Scan({ isValidData, setIsValidData })}
      />
    </main>
  );
}
