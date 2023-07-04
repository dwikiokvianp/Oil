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
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
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
      navigate("/transaction");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage = error.response.data.message;
      addNotification("error", errorMessage);
    },
    onSettled: (data, error, variables, context) => {
      console.log(data, error, variables, context);
    },
  });

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
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
              <div className="sm:col-span-4">
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
                <div className="sm:col-span-4">
                  <div className="sm:col-span-4">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
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
                      <div className="flex">
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            setDetailTransaction((prev) => {
                              return [...prev, { quantity: 8000, oil_id: 1 }];
                            });
                          }}
                        >
                          <AiFillPlusCircle />
                        </div>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            const newDetailTransaction = [...detailTransaction];
                            newDetailTransaction.splice(index, 1);
                            setDetailTransaction(newDetailTransaction);
                          }}
                        >
                          <AiFillMinusCircle />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
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
                </div>
              ))}
              <div className="sm:col-span-4">
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
              <div className="sm:col-span-4">
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
              <div className="sm:col-span-4">
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
                    defaultValue={selectedDate}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
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
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Proceed Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
