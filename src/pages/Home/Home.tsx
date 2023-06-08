import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import type { UserNavigationType } from "./constant/home.constant.ts";
import { navigation, NavigationType } from "./constant/home.constant.ts";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../store/login.slice.ts";
import {
  getLocalStorage,
  LocalStorageKeys,
  removeLocalStorage,
} from "../../utils/local.storage.utils.ts";
import { Container } from "../../components/templates/Container.tsx";
import { NavigationDrawerMobile } from "../../components/organisms/NavigationDrawerMobile.tsx";
import { RootHeader } from "../../components/templates/RootHeader.tsx";
import { addNotification } from "../../utils/notification.utils.ts";

export default function Home() {
  const isLogin = useLoginStore((state) => state.isAdmin);
  const role = getLocalStorage(LocalStorageKeys.role);
  const reset = useLoginStore((state) => state.reset);
  const my_navigation =
    isLogin && role === "ADMIN"
      ? navigation.slice(0, 4)
      : navigation.slice(4).concat(navigation[0]);
  const [navigationBar, setNavigationBar] = useState(my_navigation);
  const navigate = useNavigate();

  const handleSignOut = (nav: UserNavigationType) => {
    if (nav.name !== "Sign out") {
      addNotification("info", `Coming soon ${nav.name} feature`);
    } else {
      removeLocalStorage(LocalStorageKeys.token);
      removeLocalStorage(LocalStorageKeys.role);
      removeLocalStorage(LocalStorageKeys.name);
      reset();
      navigate("/login");
    }
  };
  const handleOnChangeNavigation = (item: NavigationType) => {
    const updatedNavigation = navigationBar.map((navItem: NavigationType) => {
      const isDashboard = item.name === "Dashboard";
      const current = navItem.name === item.name;

      if (current) {
        navigate(isDashboard ? "/" : `/${item.name.toLowerCase()}`);
      }
      return { ...navItem, current };
    });

    setNavigationBar(updatedNavigation);
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <RootHeader
                navigationBar={navigationBar}
                handleOnChangeNavigation={handleOnChangeNavigation}
                handleSignOut={handleSignOut}
                open={open}
              />
              <NavigationDrawerMobile
                navigationBar={navigationBar}
                handleOnChangeNavigation={handleOnChangeNavigation}
                handleSignOut={handleSignOut}
              />
            </>
          )}
        </Disclosure>
        <Container />
      </div>
    </>
  );
}
