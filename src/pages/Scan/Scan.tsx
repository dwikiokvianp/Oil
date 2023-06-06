import BarcodeScannerComponent from "react-qr-barcode-scanner";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ModalScan from "../../components/ModalScan.tsx";
export default function Scan() {
  const [stopStream, setStopStream] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

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
              width={600}
              height={500}
              stopStream={stopStream}
              facingMode={"environment"}
              onUpdate={(err, result) => {
                if (result) {
                  toast.dismiss("scan");
                  toast.success("Found your QR Code!");
                  setStopStream(true);
                  const scanData = result.getText();
                  setData(scanData);
                  setOpen(true);
                } else {
                  console.log(err);
                }
              }}
            />
          </div>
        </div>
        <Toaster />
        <ModalScan open={open} setOpen={setOpen} data={data} />
      </div>
    </div>
  );
}
