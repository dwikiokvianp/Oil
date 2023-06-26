import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getVehicle } from "../../api/vehicle.service.api.ts";
import { useState } from "react";
import { getOil } from "../../api/oil.service.api.ts";
import { postOrder } from "../../api/order.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";
import { getOfficer, getUserById } from "../../api/users.service.api.ts";
import { quantity } from "./constant/order.constant.ts";
import {
  getRegionProvince,
  getRegionProvinceById,
} from "../../api/region.service.api.ts";

export function OrderTransaction() {
  const [selectedShip, setSelectedShip] = useState(1);
  const [selectedOil, setSelectedOil] = useState(2);
  const [selectedQuantity, setSelectedQuantity] = useState(8000);
  const [selectedOfficer, setSelectedOfficer] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(1);
  const [selectedCity, setSelectedCity] = useState(selectedProvince);
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
      addNotification("success", data.message);
      navigate("/transaction");
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
            console.log({
              oil_id: Number(selectedOil),
              vehicle_id: Number(selectedShip),
              id: Number(id),
              email: User?.data.email as string,
              quantity: selectedQuantity,
              officer_id: selectedOfficer,
            });

            mutation.mutate({
              oil_id: Number(selectedOil),
              vehicle_id: Number(selectedShip),
              id: Number(id),
              email: User?.data.email as string,
              quantity: selectedQuantity,
              officer_id: selectedOfficer,
              date: new Date(selectedDate).toISOString(),
              city_id: selectedCity,
              province_id: selectedProvince,
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
                    defaultValue={1}
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
                    value={selectedOil}
                    defaultValue={1}
                    onChange={(e) => {
                      setSelectedOil(Number(e.target.value));
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
                    defaultValue={1}
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
                    defaultValue={1}
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
                    value={selectedQuantity}
                    defaultValue={1}
                    onChange={(e) => {
                      setSelectedQuantity(Number(e.target.value));
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
                    defaultValue={1}
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
