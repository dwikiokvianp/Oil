import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createVehicle } from "../api/vehicle.service.api.ts";
import { addNotification } from "../utils/notification.utils.ts";

export default function ModalAddVehicle({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState("1");

  const mutate = useMutation({
    mutationFn: createVehicle,
    onSuccess: (data) => {
      addNotification("success", data.message).then(() => {
        queryClient.invalidateQueries("vehicle");
      });
      setOpen(false);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  useEffect(() => {
    console.log("name", name);
    console.log("selectedType", selectedType);
  }, [name, selectedType]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add Vehicle Form
                    </Dialog.Title>
                    <div className="mt-2">
                      <form>
                        <div>
                          <label
                            htmlFor="email"
                            className="text-start block text-sm font-medium leading-6 text-gray-900"
                          >
                            Vehicle Name
                          </label>
                          <input
                            type="email"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="you@example.com"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="location"
                            className="text-start block text-sm font-medium leading-6 text-gray-900"
                          >
                            Vehicle Type
                          </label>
                          <select
                            id="location"
                            name="location"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue="Canada"
                            onChange={(e) => setSelectedType(e.target.value)}
                          >
                            <option value={1}>SHIP</option>
                            <option value={2}>TRUCK</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={(e) => {
                      e.preventDefault();
                      mutate.mutate({
                        name: name,
                        vehicle_type_id: Number(selectedType),
                      });
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
