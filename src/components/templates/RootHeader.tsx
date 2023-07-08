import { ImageTop } from "../molecules/ImageTop.tsx";
import { NavigationTop } from "../organisms/NavigationTop.tsx";
import { NotificationIcon } from "../atoms/NotificationIcon.tsx";
import { ProfileDropdown } from "../organisms/ProfileDropdown.tsx";
import { MobileMenuIcon } from "../molecules/MobileMenuIcon.tsx";
import {
  NavigationType,
  UserNavigationType,
} from "../../pages/admin/AdminNavigation/constant/home.constant.ts";

interface RootHeaderProps {
  navigationBar: NavigationType[];
  handleOnChangeNavigation: (item: NavigationType) => void;
  handleSignOut: (nav: UserNavigationType) => void;
  open: boolean;
}
export function RootHeader({
  navigationBar,
  handleOnChangeNavigation,
  handleSignOut,
  open,
}: RootHeaderProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <ImageTop />
          <NavigationTop
            navigationBar={navigationBar}
            handleOnChangeNavigation={handleOnChangeNavigation}
          />
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <NotificationIcon />
          <ProfileDropdown handleSignOut={handleSignOut} />
        </div>
        <MobileMenuIcon open={open} />
      </div>
    </div>
  );
}
