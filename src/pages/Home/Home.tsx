import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import type { UserNavigationType } from "./constant/home.constant.ts";
import { navigation, NavigationType } from "./constant/home.constant.ts";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../store/login.slice.ts";
import {
  LocalStorageKeys,
  removeLocalStorage,
} from "../../utils/local.storage.utils.ts";
import { Container } from "../../components/templates/Container.tsx";
import { NavigationDrawerMobile } from "../../components/organisms/NavigationDrawerMobile.tsx";
import { RootHeader } from "../../components/templates/RootHeader.tsx";
import {
  addNotification,
  addNotificationWithConfirm,
} from "../../utils/notification.utils.ts";

export default function Home() {
  const navigate = useNavigate();
  const role = useLoginStore((state) => state.role);

  let filteredNavigation = [{}];
  if (role === "ADMIN_SALES") {
    filteredNavigation = navigation.slice(0, 3);
  } else if (role === "ADMIN_PUSAT") {
    filteredNavigation = navigation.slice(0, 3);
  }

  const [navigationBar, setNavigationBar] = useState(filteredNavigation);

  const handleSignOut = (nav: UserNavigationType) => {
    if (nav.name !== "Sign out") {
      addNotification("info", `Coming soon ${nav.name} feature`);
    } else {
      addNotificationWithConfirm().then((result) => {
        if (result.isConfirmed) {
          removeLocalStorage(LocalStorageKeys.token);
          removeLocalStorage(LocalStorageKeys.role);
          removeLocalStorage(LocalStorageKeys.name);
          navigate("/login");
          addNotification("success", "Sign out success");
        } else {
          addNotification("info", "Sign out canceled");
        }
      });
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
