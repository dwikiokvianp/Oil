import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from "react";
import { addNotification } from "../../utils/notification.utils.ts";

export default function Scan({
  setIsValidData,
  setId,
}: {
  setIsValidData: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [stopStream, setStopStream] = useState(false);
  return (
    <div>
      <div className="justify-center flex flex-col h-[23vh] items-center">
        <div className=" rounded">
          <>
            <div>
              <div className="font-semibold text-sm text-center mb-4">
                Scan your QR order
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-100">
                <BarcodeScannerComponent
                  width={260}
                  height={260}
                  stopStream={stopStream}
                  facingMode={"environment"}
                  onUpdate={(err, result) => {
                    if (result) {
                      const scanData = result.getText();
                      setId(Number(scanData));
                      setStopStream(true);
                      addNotification(
                        "success",
                        "Data found!, Please confirm the data"
                      );
                      setIsValidData(true);
                    } else {
                      console.log(err);
                    }
                  }}
                />
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
