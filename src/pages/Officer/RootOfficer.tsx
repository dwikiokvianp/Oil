import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { useEffect, useState } from "react";
import Scan from "../Scan/Scan.tsx";
import { OfficerNavigation } from "../../components/organisms/OfficerNavigation.tsx";
import {
  getLocalStorage,
  LocalStorageKeys,
  removeLocalStorage,
} from "../../utils/local.storage.utils.ts";
import { classNames } from "../../utils/class.mapper.utils.ts";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import {
  addNotification,
  addNotificationWithConfirm,
} from "../../utils/notification.utils.ts";
import { useQuery } from "react-query";
import { getTransactionById } from "../../api/transaction.service.api.ts";
import { Checkbox } from "../../components/atoms/Checkbox.tsx";
import ModalTemplateCamera from "../../components/atoms/ModalTemplateCamera.tsx";

const officerNavigation = [
  {
    id: 1,
    name: "Fuel In",
    icon: "/fuel_in_svg.svg",
    navigate: "/fuel-in",
  },
  {
    id: 2,
    name: "Fuel Out",
    icon: "/fuel_out.svg",
    navigate: "/fuel-out",
  },
  {
    id: 3,
    name: "today order",
    icon: "/today_order.svg",
    navigate: "/today-order",
  },
  {
    id: 4,
    name: "list order",
    icon: "/list_order.svg",
    navigate: "/list-order",
  },
  {
    id: 5,
    name: "Hand over list",
    icon: "/checklist.svg",
    navigate: "/hand-over-list",
  },
];

export function RootOfficer() {
  const [open, setOpen] = useState(false);

  const [isValidData, setIsValidData] = useState(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (!open) {
      setIsValidData(false);
    }
  }, [open]);

  const navigate = useNavigate();

  return (
    <main className="m-8">
      <header className="mb-10 flex justify-between">
        <h1 className="font-semibold text-xl">
          Hello, {getLocalStorage(LocalStorageKeys.name)?.toUpperCase()}
        </h1>
        <section>
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        addNotificationWithConfirm(
                          "Are you sure want to logout?"
                        ).then((res) => {
                          if (res.isConfirmed) {
                            removeLocalStorage(LocalStorageKeys.name);
                            removeLocalStorage(LocalStorageKeys.token);
                            removeLocalStorage(LocalStorageKeys.role);
                            removeLocalStorage(LocalStorageKeys.email);
                            addNotification("success", "Logout success");
                            navigate("/login");
                          } else {
                            addNotification("info", "Logout canceled");
                          }
                        });
                      }}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        addNotification("info", "Setting feature Coming soon");
                      }}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}
                    >
                      Setting
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </section>
      </header>
      <section>
        <div className="grid grid-cols-2 gap-4 ">
          {officerNavigation.map((item) => {
            if (item.id !== 5) {
              return (
                <div key={item.id} className="flex justify-center">
                  <OfficerNavigation
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                    navigate={item.navigate}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className=" mx-auto">
          <div
            onClick={() => {
              navigate("/handover");
            }}
            className="mt-4  border-2 flex justify-center items-center shadow-xl rounded-xl h-[140px] w-full"
          >
            <img
              className="p-4"
              src={officerNavigation[4].icon}
              alt={officerNavigation[4].name}
            />
            <div className="font-semibold text-sm">Handover List</div>
          </div>
        </div>
      </section>
      <section>
        <div className="absolute bottom-5 right-5 bg-[#5243DF] rounded-full w-[75px] flex justify-center items-center">
          <img
            onClick={() => {
              setOpen(true);
            }}
            className="p-4"
            src="/qr_code_scanner.svg"
            alt="qr_code_scanner"
          />
        </div>
      </section>
      <ModalTemplateCamera
        open={open}
        setOpen={setOpen}
        innerComponent={Scan({ setIsValidData, setId })}
      />
      <ModalTemplate
        open={isValidData}
        setOpen={setIsValidData}
        innerComponent={DetailData({ id })}
      />
    </main>
  );
}
export function DetailData({ id }: { id: number }) {
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
