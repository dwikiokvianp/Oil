import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from "react";
import { useQuery } from "react-query";
import { getTransactionById } from "../../api/transaction.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";
import { Checkbox } from "../../components/atoms/Checkbox.tsx";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/molecules/LoadingSpinner.tsx";

export default function Scan({
  isValidData,
  setIsValidData,
}: {
  isValidData: boolean;
  setIsValidData: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [stopStream, setStopStream] = useState(false);
  const [id, setId] = useState(0);
  const [isScanReady, setIsScanReady] = useState(false);

  return (
    <div>
      <div className="justify-center flex flex-col h-[23vh] items-center">
        <div className=" rounded">
          {isValidData ? (
            <DetailData id={id} />
          ) : (
            <>
              <div style={{ display: !isScanReady ? "block" : "none" }}>
                <LoadingSpinner />
              </div>
              <div>
                <div className="font-semibold text-sm text-center mb-4">
                  Scan your QR order
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <BarcodeScannerComponent
                    width={260}
                    height={260}
                    stopStream={stopStream}
                    facingMode={"environment"}
                    onUpdate={(err, result) => {
                      setIsScanReady(true);
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
          )}
        </div>
      </div>
    </div>
  );
}

function DetailData({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => getTransactionById(id),
  });
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);

  const [checkedFour, setCheckedFour] = useState(false);
  const [checkedFive, setCheckedFive] = useState(false);
  const [checkedSix, setCheckedSix] = useState(false);
  const [checkedSeven, setCheckedSeven] = useState(false);

  const [isConfirm, setIsConfirm] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {isConfirm ? (
        <div>
          <div className="my-4 text-2xl font-bold text-center">
            Procedural Operation Confirmation
          </div>
          <Checkbox
            label={"I already check the product"}
            checked={checkedFour}
            setChecked={setCheckedFour}
          />
          <Checkbox
            label={"User already validate the product"}
            checked={checkedFive}
            setChecked={setCheckedFive}
          />
          <Checkbox
            label={"I already check and validate the product"}
            checked={checkedSix}
            setChecked={setCheckedSix}
          />
          <Checkbox
            label={"I agree to the terms and conditions"}
            checked={checkedSeven}
            setChecked={setCheckedSeven}
          />
          <button
            className={`w-full px-2 py-2 mt-4 ${
              checkedFour && checkedFive && checkedSix && checkedSeven
                ? "bg-blue-500"
                : "bg-gray-300"
            } ${
              checkedFour && checkedFive && checkedSix && checkedSeven
                ? "hover:bg-blue-600"
                : "hover:bg-gray-400"
            } text-sm font-medium text-white rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            onClick={() => {
              if (checkedFour && checkedFive && checkedSix && checkedSeven) {
                addNotification("success", "Transaction success");
                navigate(`/camera/${id}`);
              } else {
                addNotification("error", "Please check all checkbox");
              }
            }}
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="m-2">
          <div className="shadow-md sm:rounded-lg p-8">
            <h1>
              <div className="my-4 text-sm sm:text-md font-bold text-center">
                Transaction Detail
              </div>
            </h1>
            <table className="w-full text-xs text-left text-gray-500">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                  >
                    Name
                  </th>
                  <td className="px-6 py-4">{data?.data.User.username}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                  >
                    Product
                  </th>
                  <td className="px-6 py-4">{data?.data.Oil.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                  >
                    Company
                  </th>
                  <td className="px-6 py-4">{"halo"}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                  >
                    Quantity
                  </th>
                  <td className="px-6 py-4">{data?.data.quantity}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                  >
                    Ship Name
                  </th>
                  <td className="px-6 py-4">{data?.data.Vehicle.name}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                  >
                    Officer Name
                  </th>
                  <td className="px-6 py-4">Red</td>
                </tr>
              </tbody>
            </table>
          </div>
          <section className="mt-2">
            <form>
              <Checkbox
                label={"I agree to the terms and conditions"}
                checked={checkedOne}
                setChecked={setCheckedOne}
              />
              <Checkbox
                label={"I have read the privacy policy"}
                checked={checkedTwo}
                setChecked={setCheckedTwo}
              />
              <Checkbox
                label={"I confirm that the data is correct"}
                checked={checkedThree}
                setChecked={setCheckedThree}
              />
            </form>
          </section>
          <button
            className={`w-full my-4 px-4 py-2 mt-4 text-sm font-medium text-white ${
              checkedOne && checkedTwo && checkedThree
                ? "bg-blue-500"
                : "bg-gray-300"
            } ${
              checkedOne && checkedTwo && checkedThree
                ? "hover:bg-blue-600"
                : "hover:bg-gray-400"
            }  rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            onClick={() => {
              if (checkedOne && checkedTwo && checkedThree) {
                addNotification("success", "Data confirmed");
                setIsConfirm(true);
              } else {
                addNotification("error", "Please check all the checkbox");
              }
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
}
