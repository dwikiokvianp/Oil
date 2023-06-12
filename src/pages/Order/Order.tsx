import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import { getUser } from "../../api/users.service.api.ts";
import { formatUnixTimestamp } from "../../utils/day.converter.ts";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { data: Users } = useQuery({
    queryKey: "users",
    queryFn: getUser,
  });
  const navigate = useNavigate();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {Users?.data.map((person) => (
        <li
          key={person.id}
          className="relative flex justify-between gap-x-6 py-5"
          onClick={() => {
            navigate(`/order/${person.id}`);
          }}
        >
          <div className="flex gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src="https://img.freepik.com/free-icon/user_318-563642.jpg"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person.username}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a className="relative truncate hover:underline">
                  {person.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              {person.id ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Member since{" "}
                  <time>{formatUnixTimestamp(person.created_at)}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
