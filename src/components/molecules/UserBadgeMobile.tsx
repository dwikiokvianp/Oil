import { user } from "../../pages/admin/AdminNavigation/constant/home.constant.ts";
import {
  getLocalStorage,
  LocalStorageKeys,
} from "../../utils/local.storage.utils.ts";
import { BellIcon } from "@heroicons/react/24/outline";

export function UserBadgeMobile() {
  return (
    <div className="flex items-center px-4">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
      </div>
      <div className="ml-3">
        <div className="text-base font-medium text-gray-800">
          {getLocalStorage(LocalStorageKeys.name)}
        </div>
        <div className="text-sm font-medium text-gray-500">
          {getLocalStorage(LocalStorageKeys.email)}
        </div>
      </div>
      <button
        type="button"
        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
