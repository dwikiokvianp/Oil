import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { statuses } from "./constant/sales.constant.ts";
import { classNames } from "../../utils/class.mapper.utils.ts";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { confirmOrder, getSales } from "../../api/sales.service.api.ts";
import { getTime } from "../../utils/day.converter.ts";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

export default function Sales() {
  const queryClient = useQueryClient();
  const { data } = useQuery("sales", {
    queryFn: getSales,
  });

  const mutation = useMutation({
    mutationFn: confirmOrder,
    onMutate: () => {
      toast.loading("Confirming your order...", {
        id: "save",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("sales").then(() => {
        toast.success(data.message);
      });
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { error: string })?.error;
      toast.error(message);
    },
    onSettled: () => {
      toast.dismiss("save");
    },
  });

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data?.orders.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {project.customer}
              </p>
              <p
                className={classNames(
                  statuses[project.confirmed ? "confirmed" : "pending"],
                  "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {project.confirmed ? "Confirmed" : "Pending"}
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
              <p className="truncate">Created by {project.customer}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <p className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
              View project<span className="sr-only">, {project.customer}</span>
            </p>
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          mutation.mutate(project.id);
                        }}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        Approve
                        <span className="sr-only">, {project.customer}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <Toaster />
          </div>
        </li>
      ))}
    </ul>
  );
}
