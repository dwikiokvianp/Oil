import { useQuery } from "react-query";
import {
  getDrivers,
  TravelDeliveryInput,
} from "../../api/travel-delivery.service.api.ts";
import { useState } from "react";
import { getWarehouses } from "../../api/warehouse.service.api.ts";
import { getUserWithoutPagination } from "../../api/users.service.api.ts";

export function Travel() {
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

  const [travelDeliveryInput, setTravelDeliveryInput] =
    useState<TravelDeliveryInput>({
      departure_date: "",
      driverId: 1,
      message: "",
      officer_id: 1,
      oil_id: 1,
      pickup_location: "",
      quantity: 1,
      recipient_detail: [
        {
          quantity: 1,
          city_id: 1,
          email: "",
          province_id: 1,
          user_id: 1,
        },
      ],
      status: "",
      vehicle_id: 1,
      warehouse_detail: [
        {
          warehouse_id: 1,
          quantity: 1,
        },
      ],
    });

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
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
              value={travelDeliveryInput.driverId}
              onChange={(e) =>
                setTravelDeliveryInput({
                  ...travelDeliveryInput,
                  driverId: Number(e.target.value),
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
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
                value={detail.warehouse_id} // Set the initial value for warehouse_id
                onChange={(e) => {
                  const newWarehouseDetails = [
                    ...travelDeliveryInput.warehouse_detail,
                  ];
                  newWarehouseDetails[index].warehouse_id = Number(
                    e.target.value
                  ); // Update the warehouse_id value
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
      {/*<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">*/}
      {/*  <div>*/}
      {/*    <h2 className="text-base font-semibold leading-7 text-gray-900">*/}
      {/*      Customer Information*/}
      {/*    </h2>*/}
      {/*    <p className="mt-1 text-sm leading-6 text-gray-600">*/}
      {/*      Use Customer information where you can receive the package.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  <div className="sm:col-span-3">*/}
      {/*    <label*/}
      {/*      htmlFor="warehouse"*/}
      {/*      className="block text-sm font-medium leading-6 text-gray-900"*/}
      {/*    >*/}
      {/*      Customer*/}
      {/*    </label>*/}
      {/*    <div className="mt-2">*/}
      {/*      <select*/}
      {/*        id="warehouse"*/}
      {/*        name="warehouse"*/}
      {/*        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"*/}
      {/*      >*/}
      {/*        {Warehouses?.map((driver) => (*/}
      {/*          <option key={driver.id} value={driver.id}>*/}
      {/*            {driver.name}*/}
      {/*          </option>*/}
      {/*        ))}*/}
      {/*      </select>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">*/}
      {/*    <div className="sm:col-span-3">*/}
      {/*      <label*/}
      {/*        htmlFor="quantity"*/}
      {/*        className="block text-sm font-medium leading-6 text-gray-900"*/}
      {/*      >*/}
      {/*        Quantity*/}
      {/*      </label>*/}
      {/*      <div className="mt-2">*/}
      {/*        <select*/}
      {/*          id="drivers"*/}
      {/*          name="drivers"*/}
      {/*          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"*/}
      {/*          value={warehouseDetails?.quantity}*/}
      {/*          onChange={(e) => {*/}
      {/*            setWarehouseDetails({*/}
      {/*              ...warehouseDetails,*/}
      {/*              quantity: Number(e.target.value),*/}
      {/*            });*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <option value={8000}>8000</option>*/}
      {/*          <option value={16000}>16000</option>*/}
      {/*          <option value={24000}>24000</option>*/}
      {/*          <option value={32000}>32000</option>*/}
      {/*          <option value={40000}>40000</option>*/}
      {/*          <option value={48000}>48000</option>*/}
      {/*        </select>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="sm:col-span-3">*/}
      {/*      <label*/}
      {/*        htmlFor="users"*/}
      {/*        className="block text-sm font-medium leading-6 text-gray-900"*/}
      {/*      >*/}
      {/*        Users*/}
      {/*      </label>*/}
      {/*      <div className="mt-2">*/}
      {/*        <select*/}
      {/*          id="users"*/}
      {/*          name="users"*/}
      {/*          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"*/}
      {/*          */}
      {/*          onChange={(e) => {*/}
      {/*            setWarehouseDetails({*/}
      {/*              ...warehouseDetails,*/}
      {/*              quantity: Number(e.target.value),*/}
      {/*            });*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <option value={8000}>8000</option>*/}
      {/*          <option value={16000}>16000</option>*/}
      {/*          <option value={24000}>24000</option>*/}
      {/*          <option value={32000}>32000</option>*/}
      {/*          <option value={40000}>40000</option>*/}
      {/*          <option value={48000}>48000</option>*/}
      {/*        </select>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="sm:col-span-4">*/}
      {/*      <label*/}
      {/*        htmlFor="message"*/}
      {/*        className="block text-sm font-medium leading-6 text-gray-900"*/}
      {/*      >*/}
      {/*        Message*/}
      {/*      </label>*/}
      {/*      <div className="mt-2">*/}
      {/*        <textarea*/}
      {/*          id="message"*/}
      {/*          name="message"*/}
      {/*          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
      {/*          value={message}*/}
      {/*          onChange={(e) => setMessage(e.target.value)}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
