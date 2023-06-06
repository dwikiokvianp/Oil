import { Disclosure } from "@headlessui/react";
import { classNames } from "../../utils/class.mapper.utils.ts";
import {
  NavigationType,
  UserNavigationType,
} from "../../pages/Home/constant/home.constant.ts";
import { UserBadgeMobile } from "../molecules/UserBadgeMobile.tsx";
import { UserDropdownMobile } from "../molecules/UserDropdownMobile.tsx";

export function NavigationDrawerMobile({
  navigationBar,
  handleOnChangeNavigation,
  handleSignOut,
}: {
  navigationBar: NavigationType[];
  handleOnChangeNavigation: (item: NavigationType) => void;
  handleSignOut: (nav: UserNavigationType) => void;
}) {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 pb-3 pt-2">
        {navigationBar.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            onClick={() => handleOnChangeNavigation(item)}
            className={classNames(
              item.current
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
              "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-200 pb-3 pt-4">
        <UserBadgeMobile />
        <UserDropdownMobile handleSignOut={handleSignOut} />
      </div>
    </Disclosure.Panel>
  );
}
