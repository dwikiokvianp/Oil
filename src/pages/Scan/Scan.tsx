import BarcodeScannerComponent from "react-qr-barcode-scanner";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
export default function Scan() {
  const [stopStream, setStopStream] = useState(false);

  useEffect(() => {
    toast.loading("Scanning...", {
      id: "scan",
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900">Scan</h1>
      <div className="bg-black justify-center flex">
        <BarcodeScannerComponent
          width={700}
          height={500}
          stopStream={stopStream}
          onUpdate={(err, result: any) => {
            if (result) {
              toast.dismiss("scan");
              toast.success("Found your QR Code!");
              setStopStream(true);
            }
          }}
        />
        <Toaster />
      </div>
    </div>
  );
}
