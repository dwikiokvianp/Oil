import { classNames } from "../../utils/class.mapper.utils.ts";
import { NavigationType } from "../../pages/Home/constant/home.constant.ts";

export function NavigationTop({
  navigationBar,
  handleOnChangeNavigation,
}: {
  navigationBar: NavigationType[];
  handleOnChangeNavigation: (item: NavigationType) => void;
}) {
  return (
    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
      {navigationBar.map((item) => (
        <a
          key={item.name}
          onClick={() => handleOnChangeNavigation(item)}
          className={classNames(
            item.current
              ? "border-indigo-500 text-gray-900"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}
