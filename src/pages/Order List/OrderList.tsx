import { useQuery } from "react-query";
import { getOrder } from "../../api/order.service.api.ts";
import { getTime } from "../../utils/day.converter.ts";
import { Toaster } from "react-hot-toast";
import ModalDetail from "../../components/ModalDetail.tsx";
import { useState } from "react";

export function OrderList() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(1);
  const { data } = useQuery({
    queryKey: "orderList",
    queryFn: getOrder,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {data?.orders.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {project.name}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  Created on{" "}
                  <time dateTime={project.created_at}>
                    {getTime(project.created_at)}
                  </time>
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate"> Total Order {project.liter} Liters</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <p
                onClick={() => {
                  setOpen(true);
                  setId(project.id);
                }}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View project
                <span className="sr-only">, {project.email}</span>
              </p>
              <Toaster />
            </div>
          </li>
        ))}
        {open ? <ModalDetail open={open} setOpen={setOpen} id={id} /> : null}
      </ul>
    </>
  );
}
