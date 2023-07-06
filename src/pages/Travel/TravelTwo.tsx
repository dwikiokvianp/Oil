import { useMutation, useQuery } from "react-query";
import {
  createTravelDelivery,
  getDrivers,
  getStorage,
  patchTransactionDelivery,
  TravelDeliveryInput,
} from "../../api/travel-delivery.service.api.ts";
import React, { useState } from "react";
import { getWarehouses } from "../../api/warehouse.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";
import { useNavigate } from "react-router-dom";
import { getOil } from "../../api/oil.service.api.ts";
import {
  getTransaction,
  getTransactionById,
} from "../../api/transaction.service.api.ts";
import ModalTemplateBigger from "../../components/atoms/ModalTemplateBigger.tsx";
import { classNames } from "../../utils/class.mapper.utils.ts";
import { formatIndonesianTime } from "../../utils/day.converter.ts";
import type { TransactionData } from "../Transaction/transaction.d.type.ts";
import { getVehicle } from "../../api/vehicle.service.api.ts";

export function TravelTwo() {
  const navigate = useNavigate();
  const { data: Drivers } = useQuery({
    queryKey: "drivers",
    queryFn: getDrivers,
  });

  const { data: Warehouses } = useQuery({
    queryKey: "warehouses",
    queryFn: getWarehouses,
  });

  const { data: Oil } = useQuery({
    queryKey: "oil",
    queryFn: getOil,
  });

  const [open, setOpen] = useState(false);

  const [transactionId, setTransactionId] = useState(1);
  const [usersTransaction, setUsersTransaction] = useState<TransactionData[]>(
    []
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const [patchData, setPatchData] = useState<any>([]);
  const { data: TransactionById } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: isEnabled,
    onSuccess: (data) => {
      const { data: newData } = data;
      setUsersTransaction(usersTransaction.concat(newData));
      patchData.push({
        id: newData.id,
      });

      setTravelDeliveryInput((prevInput) => ({
        ...prevInput,
        recipient_detail: [
          ...prevInput.recipient_detail,
          {
            transaction_id: newData.id,
            email: "dwikiokvianp@gmail.com",
            quantity: 0,
            city_id: 1,
            user_id: 1,
            province_id: 1,
          },
        ],
      }));
    },
    refetchOnWindowFocus: false,
  });

  const mutationPatch = useMutation({
    mutationFn: patchTransactionDelivery,
    mutationKey: "patchTransaction",
    onSuccess: (data) => {
      travelDeliveryInput.departure_date = new Date().toISOString();
      console.log(travelDeliveryInput.departure_date, "ini departure date");
      mutation.mutate(travelDeliveryInput);
    },
    onMutate: () => {
      addNotification("info", "Please wait, we are processing your request");
    },
  });

  const { data: Vehicle } = useQuery({
    queryKey: "vehicle",
    queryFn: getVehicle,
  });

  const [travelDeliveryInput, setTravelDeliveryInput] =
    useState<TravelDeliveryInput>({
      departure_date: new Date().toISOString().substr(0, 10),
      driver_id: 1,
      message: "",
      officer_id: 1,
      oil_id: 1,
      pickup_location: "Pertamina Cilacap",
      quantity: 8000,
      recipient_detail: [],
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
      console.log(data, "ini dari travel mutation");
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

  const [usersTransactionSource, setUsersTransactionSource] = useState<{
    data: TransactionData[];
  }>();

  useQuery({
    queryKey: "transactions",
    queryFn: () => getTransaction(),
    retry: false,
    onSuccess: (data) => {
      console.log("refetch");
      setUsersTransactionSource(data);
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 border-2 shadow rounded-md">
        <div className="p-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-2.5  border-gray-900/10 pb-12 md:grid-cols-3">
            <div className="col-span-3">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="sm:col-span-2">
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
                  onChange={(e) => {
                    setTravelDeliveryInput({
                      ...travelDeliveryInput,
                      driver_id: parseInt(e.target.value),
                    });
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
            <div className="sm:col-span-1">
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
            <div className="sm:col-span-1">
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

            <div className="sm:col-span-2">
              <label
                htmlFor="pickup-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pickup Address
              </label>
              <div className="mt-2">
                <select
                  id="oil"
                  name="oil"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={"Pertamina Cilacap"}>Pertamina Cilacap</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
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
            <div className="sm:col-span-2">
              <label
                htmlFor="vehicle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Vehicle
              </label>
              <div className="mt-2">
                <select
                  id="vehicle"
                  name="vehicle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={travelDeliveryInput.vehicle_id}
                  onChange={(e) => {
                    setTravelDeliveryInput({
                      ...travelDeliveryInput,
                      vehicle_id: Number(e.target.value),
                    });
                  }}
                >
                  {Vehicle?.data.map((oil) => (
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
        </div>
        <div className="p-8">
          {travelDeliveryInput.warehouse_detail.map((detail, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-x-8 gap-y-2 border-gray-900/10 pb-12 md:grid-cols-3"
            >
              <div className="md:col-span-3">
                <div className=" text-base font-semibold leading-7 text-gray-900">
                  Warehouse Destination
                </div>
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
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 border-2 shadow my-4 rounded-md">
        <div className="sm:flex sm:items-center mt-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Travel Order
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Order information for the travel
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-slate-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Add Customer Destination
            </button>
          </div>
        </div>
        <div className="-mx-4 my-10 flow-root sm:mx-0">
          <table className="min-w-full">
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Information
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Total Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {usersTransaction.map((project) => (
                <tr key={project.id} className="border-b border-gray-200">
                  <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">
                      {project.User.username}
                    </div>
                    <div className="mt-1 truncate text-gray-500">
                      {project.User.company.companyName}
                    </div>
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    {project.transaction_detail.map((detail) => (
                      <div key={detail.id}>{detail.oil.name}</div>
                    ))}
                  </td>
                  <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                    {project.transaction_detail.map((detail) => (
                      <div key={detail.id}>{detail.quantity}</div>
                    ))}
                  </td>
                  <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                    {project.transaction_detail.reduce((acc, detail) => {
                      return acc + detail.quantity;
                    }, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  {usersTransaction.reduce((acc, project) => {
                    return (
                      acc +
                      project.transaction_detail.reduce((acc, detail) => {
                        return acc + detail.quantity;
                      }, 0)
                    );
                  }, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
          <button
            type="button"
            className="block rounded-md bg-slate-600 px-6 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              patchData.map((data, index) => {
                data.vehicle_id = travelDeliveryInput.vehicle_id;
                data.driver_id = travelDeliveryInput.driver_id;
              });
              mutationPatch.mutate(patchData);
            }}
          >
            Save
          </button>
        </div>
      </div>
      <ModalTemplateBigger
        open={open}
        setOpen={setOpen}
        innerComponent={User({
          open,
          setOpen,
          setIsEnabled,
          setTransactionId,
          Transactions: usersTransactionSource as {
            data: TransactionData[];
            page: number;
            pageSize: number;
            total: number;
          },
          setTransaction: setUsersTransactionSource as React.Dispatch<
            React.SetStateAction<{ data: TransactionData[] }>
          >,
        })}
      />
    </>
  );
}

function User({
  open,
  setOpen,
  setIsEnabled,
  setTransactionId,
  Transactions,
  setTransaction,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionId: React.Dispatch<React.SetStateAction<number>>;
  Transactions: {
    data: TransactionData[];
    page: number;
    pageSize: number;
    total: number;
  };
  setTransaction: React.Dispatch<
    React.SetStateAction<{
      data: TransactionData[];
    }>
  >;
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Received user order
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Please add the order details from the user below.
          </p>
        </div>
      </div>
      {Transactions?.data.length !== 0 ? (
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Company Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Order Date
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Order Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Destination
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Transactions?.data.map((plan, planIdx) => (
                <tr key={plan.id}>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-transparent",
                      "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {plan.User.username}
                    </div>
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                    )}
                  >
                    {plan.User.company.companyName}
                  </td>
                  <td className="border-t border-gray-200">
                    {formatIndonesianTime(plan.date)}
                  </td>
                  <td className="border-t border-gray-200">{plan.status}</td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-gray-200",
                      "px-3 py-3.5 text-sm text-gray-500"
                    )}
                  >
                    <div>
                      {plan.City.name} {","} {plan.Province.name}
                    </div>
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? "" : "border-t border-transparent",
                      "relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    )}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        console.log("clicked");
                        e.preventDefault();
                        setOpen(!open);
                        setIsEnabled(true);
                        setTransactionId(plan.id);
                        console.log(Transactions);
                        setTransaction((prev) => ({
                          ...prev,
                          data: prev.data.filter((item) => {
                            console.log(
                              item.id,
                              plan.id,
                              typeof item.id,
                              typeof plan.id
                            );
                            return item.id !== plan.id;
                          }),
                        }));
                      }}
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Select<span className="sr-only"></span>
                    </button>
                    {planIdx !== 0 ? (
                      <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-48 flex justify-center items-center">
          <h1 className="font-semibold text-lg text-slate-700">
            There is no transaction yet. Please wait for the user to order.
          </h1>
        </div>
      )}
    </div>
  );
}
