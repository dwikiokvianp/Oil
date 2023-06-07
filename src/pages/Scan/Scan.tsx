import BarcodeScannerComponent from "react-qr-barcode-scanner";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import ModalScan from "../../components/ModalScan.tsx";
export default function Scan() {
  const [stopStream, setStopStream] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const BAR_CODE_HEIGHT = 500;
  const BAR_CODE_WIDTH = 600;

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
                  toast.dismiss("scan");
                  toast.success("Found your QR Code!");
                  setStopStream(true);
                  const scanData = result.getText();
                  const regex = /\d+/;

                  const matches = scanData.match(regex);
                  const number = matches ? parseInt(matches[0]) : null;
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setData(number);
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
