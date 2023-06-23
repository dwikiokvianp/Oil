import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from "react";
import { addNotification } from "../../utils/notification.utils.ts";
import { useQuery } from "react-query";
import { getTransactionById } from "../../api/transaction.service.api.ts";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";

export default function Scan({
  setIsValidData,
  setId,
}: {
  setIsValidData: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isCameraFront, setIsCameraFront] = useState(false);
  const [userIdVerification, setUserIdVerification] = useState(-1);
  const { refetch } = useQuery({
    queryKey: ["detail", userIdVerification],
    queryFn: () => getTransactionById(userIdVerification),
    onSuccess: (data) => {
      if (data.data.status === "done") {
        addNotification(
          "warning",
          "Order has been finished, Please contact the admin"
        );
      } else {
        addNotification("success", "Order has been found");
        setIsValidData(true);
        setStopStream(true);
      }
    },
    enabled: false,
  });
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
                  facingMode={!isCameraFront ? "user" : "environment"}
                  onUpdate={(err, result) => {
                    if (result) {
                      const scanData = result.getText();
                      setUserIdVerification(Number(scanData));
                      setId(Number(scanData));
                      refetch();
                    } else {
                      console.log(err);
                    }
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => setIsCameraFront(!isCameraFront)}
              className="bg-blue-500 mt-4 gap-2 w-full hover:bg-blue-900 text-white flex justify-center items-center"
            >
              <div>Rotate Camera</div>
              <MdOutlineFlipCameraAndroid className="text-md" />
            </button>
          </>
        </div>
      </div>
    </div>
  );
}
