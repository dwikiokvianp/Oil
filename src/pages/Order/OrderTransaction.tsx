import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getVehicle } from "../../api/vehicle.service.api.ts";
import { useState } from "react";
import { getOil } from "../../api/oil.service.api.ts";
import { postOrder } from "../../api/order.service.api.ts";
import { addNotification } from "../../utils/notification.utils.ts";

export function OrderTransaction() {
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
  const [selectedShip, setSelectedShip] = useState("");
  const [selectedOil, setSelectedOil] = useState("");
  const mutation = useMutation({
    mutationFn: postOrder,
    onMutate: () => {
      addNotification("info", "Please wait...");
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      addNotification("success", data.message);
      navigate("/order");
    },
    onSettled: (data, error, variables, context) => {
      console.log(data, error, variables, context);
    },
  });
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Order Transaction
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Fill in the form below to proceed with the transaction.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              oil_id: Number(selectedOil),
              vehicle_id: Number(selectedShip),
              id: Number(id),
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
                      setSelectedShip(e.target.value);
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
                    onChange={(e) => {
                      setSelectedOil(e.target.value);
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
