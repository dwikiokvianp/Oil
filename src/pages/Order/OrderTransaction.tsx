import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getVehicle } from "../../api/vehicle.service.api.ts";
import { useState } from "react";
import { getOil } from "../../api/oil.service.api.ts";
import { postOrder } from "../../api/order.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";
import { getOfficer, getUserById } from "../../api/users.service.api.ts";
import { DetailTransaction, quantity } from "./constant/order.constant.ts";
import {
  getRegionProvince,
  getRegionProvinceById,
} from "../../api/region.service.api.ts";
import { getDrivers } from "../../api/driver.service.api.ts";

export function OrderTransaction() {
  const [selectedShip, setSelectedShip] = useState(1);
  const [selectedOil] = useState(2);
  const [selectedQuantity] = useState(8000);
  const [selectedDriver, setSelectedDriver] = useState(1);
  const [selectedOfficer, setSelectedOfficer] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [selectedProvince, setSelectedProvince] = useState(1);
  const [selectedCity, setSelectedCity] = useState(selectedProvince);

  const [detailTransaction, setDetailTransaction] = useState<
    DetailTransaction[]
  >([{ quantity: 8000, oil_id: 1 }]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: Ships } = useQuery({
    queryKey: ["ship"],
    queryFn: getVehicle,
  });
  const { data: Oil } = useQuery({
    queryKey: ["oil"],
    queryFn: getOil,
  });

  const { data: Officer } = useQuery({
    queryKey: ["officer"],
    queryFn: getOfficer,
  });

  const { data: Province } = useQuery({
    queryKey: ["province"],
    queryFn: getRegionProvince,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { data: Drivers } = useQuery({
    queryKey: ["driver"],
    queryFn: getDrivers,
  });

  const { data: City } = useQuery({
    queryKey: ["province", selectedProvince],
    queryFn: () => getRegionProvinceById(selectedProvince),
    onSuccess: (data) => {
      console.log(data, "ini dari province dimana ", selectedProvince);
    },
  });

  const { data: User } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(Number(id)),
  });

  const mutation = useMutation({
    mutationFn: postOrder,
    onMutate: () => {
      addNotification("info", "Please wait...");
    },
    onSuccess: (data) => {
      console.log(data, "ini dari mutation");
      addNotification("success", data.message);
      navigate("/travel");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage = error.response.data.message;
      addNotification("error", errorMessage);
    },
    onSettled: (data, error, variables, context) => {
      console.log(data, error, variables, context);
    },
  });

  const [isPickup, setIsPickup] = useState(true);

  return (
    <div className="ml-8 space-y-10 divide-y divide-gray-900/10 w-full">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              driver_id: Number(selectedDriver),
              oil_id: Number(selectedOil),
              vehicle_id: Number(selectedShip),
              id: Number(id),
              email: User?.data.email as string,
              quantity: selectedQuantity,
              officer_id: selectedOfficer,
              date: new Date(selectedDate).toISOString(),
              city_id: selectedCity,
              province_id: selectedProvince,
              transaction_detail: detailTransaction,
            });
          }}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="flex justify-center items-center gap-6 mb-5">
              <div
                onClick={() => {
                  setIsPickup(true);
                }}
                className={`${
                  isPickup
                    ? "bg-indigo-900 text-white"
                    : "bg-white text-black border-2"
                } py-1 px-6  rounded-lg flex flex-col items-center cursor-pointer`}
              >
                <PickupIcon />
                <p className="text-sm">Pickup</p>
              </div>
              <div
                onClick={() => {
                  setIsPickup(false);
                }}
                className={`${
                  !isPickup
                    ? "bg-indigo-900 text-white"
                    : "bg-white text-black border-2"
                } py-1 px-6  rounded-lg flex flex-col items-center cursor-pointer`}
              >
                <DeliveryIcon />
                <p className="text-xs">Delivery</p>
              </div>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-slate-500 "
                >
                  Ship
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectedShip}
                    onChange={(e) => {
                      setSelectedShip(Number(e.target.value));
                    }}
                  >
                    {Ships?.data.map((ship) => (
                      <option key={ship.id} value={ship.id}>
                        {ship.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="drivers"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Driver
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectedDriver}
                    onChange={(e) => {
                      setSelectedDriver(Number(e.target.value));
                    }}
                  >
                    {Drivers?.data.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {detailTransaction.map((_, index) => (
                <div className="sm:col-span-6 grid grid-cols-7 gap-5">
                  <div className="sm:col-span-3">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium mt-5 text-gray-900"
                      >
                        Oil
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={detailTransaction[index].oil_id}
                          onChange={(e) => {
                            const newDetailTransaction = [...detailTransaction];
                            newDetailTransaction[index].oil_id = Number(
                              e.target.value
                            );
                            setDetailTransaction(newDetailTransaction);
                          }}
                        >
                          {Oil?.data.map((ship) => (
                            <option key={ship.id} value={ship.id}>
                              {ship.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3 mt-5">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Quantity
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={detailTransaction[index].quantity}
                        onChange={(e) => {
                          const newDetailTransaction = [...detailTransaction];
                          newDetailTransaction[index].quantity = Number(
                            e.target.value
                          );
                          setDetailTransaction(newDetailTransaction);
                        }}
                      >
                        {quantity.map((ship) => (
                          <option key={ship.id} value={ship.id}>
                            {ship.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-end">
                    <div className="flex gap-x-2">
                      <div
                        className="cursor-pointer text-red-500 px-2 py-1 rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          const newDetailTransaction = [...detailTransaction];
                          newDetailTransaction.splice(index, 1);
                          setDetailTransaction(newDetailTransaction);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="sm:col-span-6 flex justify-end items-center">
                <div
                  className="cursor-pointer  px-2 py-1 rounded-md flex gap-x-2 items-center bg-indigo-800 text-white "
                  onClick={(e) => {
                    e.preventDefault();
                    setDetailTransaction((prev) => {
                      return [...prev, { quantity: 8000, oil_id: 1 }];
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  <p className="text-sm">Add Item</p>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Transaction
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                    }}
                    type="date"
                    id="date"
                    name="birthday"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={selectedDate}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Officer
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectedOfficer}
                    onChange={(e) => {
                      setSelectedOfficer(Number(e.target.value));
                    }}
                  >
                    {Officer?.data.map((ship) => (
                      <option key={ship.id} value={ship.id}>
                        {ship.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {!isPickup ? (
                <>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Province
                    </label>
                    <div className="mt-2">
                      <select
                        id="province"
                        name="province"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={selectedProvince}
                        onChange={(e) => {
                          setSelectedProvince(Number(e.target.value));
                        }}
                      >
                        {Province?.data.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <select
                        id="city"
                        name="city"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(Number(e.target.value));
                        }}
                      >
                        {City?.data.city.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Proceed Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeliveryIcon() {
  return (
    <div className="flex gap-x-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    </div>
  );
}

function PickupIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}
