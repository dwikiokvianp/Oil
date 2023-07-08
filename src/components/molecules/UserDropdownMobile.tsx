import {
  userNavigation,
  UserNavigationType,
} from "../../pages/admin/AdminNavigation/constant/home.constant.ts";
import { Disclosure } from "@headlessui/react";

export function UserDropdownMobile({
  handleSignOut,
}: {
  handleSignOut: (nav: UserNavigationType) => void;
}) {
  return (
    <div className="mt-3 space-y-1">
      {userNavigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          onClick={() => {
            handleSignOut(item);
          }}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
}
