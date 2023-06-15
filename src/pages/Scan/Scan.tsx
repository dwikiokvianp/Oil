import BarcodeScannerComponent from "react-qr-barcode-scanner";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ModalScan from "../../components/ModalScan.tsx";
import { useIdStore } from "../../store/id.slice.ts";
export default function Scan() {
  const [stopStream, setStopStream] = useState(false);
  const [open, setOpen] = useState(false);
  const BAR_CODE_HEIGHT = 500;
  const BAR_CODE_WIDTH = 600;
  const makeIdTo = useIdStore((state) => state.makeIdTo);

  useEffect(() => {
    toast.loading("Scanning...", {
      id: "scan",
    });
  }, []);

  return (
    <div>
      <div className="justify-center flex flex-col h-[80vh] items-center">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-2">
          Scan
        </h1>
        <div className="border-2 border-blue-700 rounded">
          <div className="p-1">
            <BarcodeScannerComponent
              width={BAR_CODE_WIDTH}
              height={BAR_CODE_HEIGHT}
              stopStream={stopStream}
              facingMode={"environment"}
              onUpdate={(err, result) => {
                if (result) {
                  const scanData = result.getText();
                  console.log(scanData);
                  makeIdTo(Number(scanData));
                  toast.dismiss("scan");
                  toast.success("Found your QR Code!");
                  setStopStream(true);
                  setOpen(true);
                } else {
                  console.log(err);
                }
              }}
            />
          </div>
        </div>
        <Toaster />
        <ModalScan
          open={open}
          setOpen={setOpen}
          data={"Data berhasil ditemukan"}
        />
      </div>
    </div>
  );
}
