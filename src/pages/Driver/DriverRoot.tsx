import {
  getLocalStorage,
  LocalStorageKeys,
  removeLocalStorage,
} from "../../utils/local.storage.utils.ts";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import {
  addNotification,
  addNotificationWithConfirm,
} from "../../utils/notification.utils.ts";
import { classNames } from "../../utils/class.mapper.utils.ts";
import { OfficerNavigation } from "../../components/organisms/OfficerNavigation.tsx";
import { officerNavigation } from "../Officer/constant/officer.constant.ts";
import { useNavigate } from "react-router-dom";

export default function DriverRoot() {
  const navigate = useNavigate();
  return (
    <main className="m-8">
      <header className="mb-10 flex justify-between">
        <h1 className="font-semibold text-xl">
          Hello, {getLocalStorage(LocalStorageKeys.name)?.toUpperCase()}
        </h1>
        <section>
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
                        addNotificationWithConfirm(
                          "Are you sure want to logout?"
                        ).then((res) => {
                          if (res.isConfirmed) {
                            removeLocalStorage(LocalStorageKeys.name);
                            removeLocalStorage(LocalStorageKeys.token);
                            removeLocalStorage(LocalStorageKeys.role);
                            removeLocalStorage(LocalStorageKeys.email);
                            addNotification("success", "Logout success");
                            navigate("/login");
                          } else {
                            addNotification("info", "Logout canceled");
                          }
                        });
                      }}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        addNotification("info", "Setting feature Coming soon");
                      }}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}
                    >
                      Setting
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </section>
      </header>
      <section>
        <div className="grid grid-cols-2 gap-4 ">
          {officerNavigation.map((item) => {
            if (item.id !== 5) {
              return (
                <div key={item.id} className="flex justify-center">
                  <OfficerNavigation
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                    navigate={item.navigate}
                  />
                </div>
              );
            }
          })}
        </div>
      </section>
      <section>
        <div className="absolute bottom-5 right-5 bg-[#5243DF] rounded-full w-[75px] flex justify-center items-center">
          <img
            className="p-4"
            src="/qr_code_scanner.svg"
            alt="qr_code_scanner"
          />
        </div>
      </section>
    </main>
  );
}
