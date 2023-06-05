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
      <h1 className="text-3xl font-semibold text-gray-900">Scan</h1>
      <div className="justify-center flex">
        <BarcodeScannerComponent
          width={700}
          height={500}
          stopStream={stopStream}
          onUpdate={(err, result) => {
            if (result) {
              toast.dismiss("scan");
              toast.success("Found your QR Code!");
              setStopStream(true);
              const scanData = result.getText();
              setData(scanData);
              setOpen(true);
            }
          }}
        />
        <Toaster />
        <ModalScan open={open} setOpen={setOpen} data={data} />
      </div>
    </div>
  );
}
