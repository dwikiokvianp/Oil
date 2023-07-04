import { useMutation, useQuery } from "react-query";
import {
  createTravelDelivery,
  getDrivers,
  getStorage,
  TravelDeliveryInput,
} from "../../api/travel-delivery.service.api.ts";
import { useState } from "react";
import { getWarehouses } from "../../api/warehouse.service.api.ts";
import { getUserWithoutPagination } from "../../api/users.service.api.ts";
import {
  getRegionProvince,
  getRegionProvinceById,
} from "../../api/region.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";
import { useNavigate } from "react-router-dom";
import { getOil } from "../../api/oil.service.api.ts";

export function Travel() {
  const navigate = useNavigate();
  const { data: Drivers } = useQuery({
    queryKey: "drivers",
    queryFn: getDrivers,
  });

  const { data: Warehouses } = useQuery({
    queryKey: "warehouses",
    queryFn: getWarehouses,
  });

  const { data: Users } = useQuery({
    queryKey: "users",
    queryFn: getUserWithoutPagination,
  });

  const { data: Province } = useQuery({
    queryKey: "province",
    queryFn: getRegionProvince,
  });

  const { data: Oil } = useQuery({
    queryKey: "oil",
    queryFn: getOil,
  });

  const [selectedProvince, setSelectedProvince] = useState(1);

  const { data: City } = useQuery({
    queryKey: ["city", selectedProvince],
    queryFn: () => getRegionProvinceById(selectedProvince),
  });

  const [travelDeliveryInput, setTravelDeliveryInput] =
    useState<TravelDeliveryInput>({
      departure_date: new Date().toISOString().substr(0, 10),
      driver_id: 1,
      message: "",
      officer_id: 1,
      oil_id: 1,
      pickup_location: "",
      quantity: 8000,
      recipient_detail: [
        {
          quantity: 8000,
          city_id: 1,
          email: Users?.data[0].email as string,
          province_id: 1,
          user_id: 1,
        },
      ],
      status: "pending",
      vehicle_id: 1,
      warehouse_detail: [
        {
          warehouse_id: 1,
          quantity: 1,
          storage_id: 1,
        },
      ],
    });
  const [warehouseId, setWarehouseId] = useState(1);
  const { data: Storage } = useQuery({
    queryKey: ["storage", warehouseId],
    queryFn: () => getStorage(warehouseId),
  });

  const mutation = useMutation({
    mutationFn: createTravelDelivery,
    onMutate: (data) => {
      console.log(data);
    },
    onSuccess: (data) => {
      addNotification("success", data.message);
      navigate("/transaction");
    },
    onError: (error: any) => {
      const errors = error.response.data.message;
      addNotification("error", errors);
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10  border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="drivers"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Drivers
          </label>
          <div className="mt-2">
            <select
              id="drivers"
              name="drivers"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={travelDeliveryInput.driver_id}
              onChange={(e) =>
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  driver_id: Number(e.target.value),
                })
              }
            >
              {Drivers?.data.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="pickup-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Pickup Address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="pickup-location"
              id="pickup-location"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={travelDeliveryInput.pickup_location}
              onChange={(e) =>
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  pickup_location: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="departure-date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Departure Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="departure-date"
              id="departure-date"
              value={travelDeliveryInput.departure_date}
              onChange={(e) =>
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  departure_date: e.target.value,
                })
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Quantity
          </label>
          <div className="mt-2">
            <select
              id="drivers"
              name="drivers"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={travelDeliveryInput.quantity}
              onChange={(e) => {
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  quantity: Number(e.target.value),
                });
              }}
            >
              <option value={8000}>8000</option>
              <option value={16000}>16000</option>
              <option value={24000}>24000</option>
              <option value={32000}>32000</option>
              <option value={40000}>40000</option>
              <option value={48000}>48000</option>
            </select>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="oils"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product
          </label>
          <div className="mt-2">
            <select
              id="oil"
              name="oil"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={travelDeliveryInput.oil_id}
              onChange={(e) => {
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  oil_id: Number(e.target.value),
                });
              }}
            >
              {Oil?.data.map((oil) => (
                <option key={oil.id} value={oil.id}>
                  {oil.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Message
          </label>
          <div className="mt-2">
            <textarea
              id="message"
              name="message"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={travelDeliveryInput.message}
              onChange={(e) =>
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  message: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      {travelDeliveryInput.warehouse_detail.map((detail, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 pb-12 md:grid-cols-3"
        >
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Warehouse Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use warehouse information where you can receive the package.
            </p>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="warehouse"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Warehouse
            </label>
            <div className="mt-2">
              <select
                id="warehouse"
                name="warehouse"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={detail.warehouse_id}
                onChange={(e) => {
                  setWarehouseId(Number(e.target.value));
                  const newWarehouseDetails = [
                    ...travelDeliveryInput.warehouse_detail,
                  ];
                  newWarehouseDetails[index].warehouse_id = Number(
                    e.target.value
                  );
                  setTravelDeliveryInput({
                    ...travelDeliveryInput,
                    warehouse_detail: newWarehouseDetails,
                  });
                }}
              >
                {Warehouses?.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="warehouse"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Storage
            </label>
            <div className="mt-2">
              <select
                id="warehouse"
                name="warehouse"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={detail.storage_id}
                onChange={(e) => {
                  const newWarehouseDetails = [
                    ...travelDeliveryInput.warehouse_detail,
                  ];
                  newWarehouseDetails[index].storage_id = Number(
                    e.target.value
                  );
                  setTravelDeliveryInput({
                    ...travelDeliveryInput,
                    warehouse_detail: newWarehouseDetails,
                  });
                }}
              >
                {Storage?.data.map((storage) => (
                  <option key={storage.id} value={storage.id}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Quantity
            </label>
            <div className="mt-2">
              <select
                id="drivers"
                name="drivers"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={detail.warehouse_id}
                onChange={(e) => {
                  const newWarehouseDetails = [
                    ...travelDeliveryInput.warehouse_detail,
                  ];
                  newWarehouseDetails[index].warehouse_id = Number(
                    e.target.value
                  );
                  setTravelDeliveryInput({
                    ...travelDeliveryInput,
                    warehouse_detail: newWarehouseDetails,
                  });
                }}
              >
                <option value={8000}>8000</option>
                <option value={16000}>16000</option>
                <option value={24000}>24000</option>
                <option value={32000}>32000</option>
                <option value={40000}>40000</option>
                <option value={48000}>48000</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {travelDeliveryInput.recipient_detail.map((detailUser, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 pb-12 md:grid-cols-3"
        >
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Customer Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use Customer information where you can receive the package.
            </p>
          </div>
          <div>
            {index === travelDeliveryInput.recipient_detail.length - 1 ? (
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setTravelDeliveryInput({
                    ...travelDeliveryInput,
                    recipient_detail: [
                      ...travelDeliveryInput.recipient_detail,
                      {
                        user_id: 301,
                        quantity: 8000,
                        city_id: 1,
                        province_id: 1,
                        email: "dwikiokvianp1999@gmail.com",
                      },
                    ],
                  });
                }}
              >
                Add Transaction Customer
              </button>
            ) : null}
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="warehouse"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Customer
            </label>
            <div className="mt-2">
              <select
                id="warehouse"
                name="warehouse"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={detailUser.user_id}
                onChange={(e) => {
                  const newRecipientDetails = [
                    ...travelDeliveryInput.recipient_detail,
                  ];
                  newRecipientDetails[index].user_id = Number(e.target.value);
                  newRecipientDetails[index].email = Users?.data[index]
                    .email as string;
                  setTravelDeliveryInput({
                    ...travelDeliveryInput,
                    recipient_detail: newRecipientDetails,
                  });
                }}
              >
                {Users?.data.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity
              </label>
              <div className="mt-2">
                <select
                  id="drivers"
                  name="drivers"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={8000}>8000</option>
                  <option value={16000}>16000</option>
                  <option value={24000}>24000</option>
                  <option value={32000}>32000</option>
                  <option value={40000}>40000</option>
                  <option value={48000}>48000</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={detailUser.province_id}
                  onChange={(e) => {
                    setSelectedProvince(Number(e.target.value));
                    const newRecipientDetails = [
                      ...travelDeliveryInput.recipient_detail,
                    ];
                    newRecipientDetails[index].province_id = Number(
                      e.target.value
                    );
                    setTravelDeliveryInput({
                      ...travelDeliveryInput,
                      recipient_detail: newRecipientDetails,
                    });
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
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity
              </label>
              <div className="mt-2">
                <select
                  id="city"
                  name="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={detailUser.city_id}
                  onChange={(e) => {
                    const newRecipientDetails = [
                      ...travelDeliveryInput.recipient_detail,
                    ];
                    newRecipientDetails[index].city_id = Number(e.target.value);
                    setTravelDeliveryInput({
                      ...travelDeliveryInput,
                      recipient_detail: newRecipientDetails,
                    });
                  }}
                >
                  {City?.data.city.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {
            e.preventDefault();
            travelDeliveryInput.departure_date = new Date(
              travelDeliveryInput.departure_date
            ).toISOString();
            console.log(travelDeliveryInput.recipient_detail[0].user_id);
            mutation.mutate(travelDeliveryInput);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
