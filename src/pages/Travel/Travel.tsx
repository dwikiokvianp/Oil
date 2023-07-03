import { useQuery } from "react-query";
import { getDrivers } from "../../api/travel-delivery.service.api.ts";
import { useState } from "react";

export function Travel() {
  const { data: Drivers } = useQuery({
    queryKey: "drivers",
    queryFn: getDrivers,
  });

  const [selectedDriver, setSelectedDriver] = useState(1);
  const [pickupAddress, setPickupAddress] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
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
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(Number(e.target.value))}
            >
              {Drivers?.data.map((driver) => (
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
              htmlFor="pickup-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pickup Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="pickup-address"
                id="pickup-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
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
                type="text"
                name="departure-date"
                id="departure-date"
                value={departureDate}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
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
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(Number(e.target.value))}
            >
              {Drivers?.data.map((driver) => (
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
              htmlFor="pickup-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pickup Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="pickup-address"
                id="pickup-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
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
                type="text"
                name="departure-date"
                id="departure-date"
                value={departureDate}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
