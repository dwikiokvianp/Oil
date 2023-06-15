import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useState } from "react";
import { useQuery } from "react-query";
import { getTransactionById } from "../../api/transaction.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";
import { Checkbox } from "../../components/atoms/Checkbox.tsx";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const [stopStream, setStopStream] = useState(false);
  const BAR_CODE_HEIGHT = 500;
  const BAR_CODE_WIDTH = 600;
  const [isValidData, setIsValidData] = useState(false);
  const [id, setId] = useState(0);

  return (
    <div>
      <div className="justify-center flex flex-col h-[50vh] items-center">
        <div className=" rounded">
          {isValidData ? (
            <DetailData id={id} />
          ) : (
            <div className="p-1">
              <BarcodeScannerComponent
                width={BAR_CODE_WIDTH}
                height={BAR_CODE_HEIGHT}
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
        <>
          <Checkbox
            label={"I agree to the terms and conditions"}
            checked={checkedFour}
            setChecked={setCheckedFour}
          />
          <Checkbox
            label={"I agree to the terms and conditions"}
            checked={checkedFive}
            setChecked={setCheckedFive}
          />
          <Checkbox
            label={"I agree to the terms and conditions"}
            checked={checkedSix}
            setChecked={setCheckedSix}
          />
          <Checkbox
            label={"I agree to the terms and conditions"}
            checked={checkedSeven}
            setChecked={setCheckedSeven}
          />
          <button
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
        </>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-gray-50 ">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Value
                  </th>
                </tr>
              </thead>
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
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
        </>
      )}
    </>
  );
}
