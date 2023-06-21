import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import { getUser } from "../../api/users.service.api.ts";
import { formatUnixTimestamp } from "../../utils/day.converter.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { FormAddUser } from "../../components/FormAddUser.tsx";

export default function Order() {
  const [selectedPage, setSelectedPage] = useState(0);
  const [queryName, setQueryName] = useState("");
  const { data: Users, isLoading } = useQuery({
    queryKey: ["users", selectedPage, queryName],
    keepPreviousData: true,
    queryFn: () =>
      getUser({
        page: selectedPage,
        queryName: queryName,
      }),
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAdminPusat, setIsAdminPusat] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "ADMIN_PUSAT") {
      setIsAdminPusat(true);
    }
  }, []);
  return (
    <>
      <div className="grid grid-cols-6 gap-2">
        <form className="col-span-6 md:col-span-4">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search for users"
              onChange={(e) => {
                setSelectedPage(1);
                setQueryName(e.target.value);
              }}
            />
            <button
              type="submit"
              className="hidden text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
        {isAdminPusat ? (
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="col-span-6 py-3 bg-slate-500 md:col-span-2 hover:bg-slate-700 rounded-xl text-white"
          >
            Add User
          </button>
        ) : null}
      </div>
      <ul role="list" className="divide-y divide-gray-100 mt-2">
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
                  <div className="mt-1 text-xs leading-5 text-gray-500">
                    <div>Member since </div>
                    <time>{formatUnixTimestamp(person.created_at)}</time>
                  </div>
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
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageCount={isLoading ? 0 : (Users?.total as number)}
          onPageChange={(e) => {
            setSelectedPage(e.selected + 1);
          }}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center gap-x-2 mt-4"
          pageClassName="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer"
        />
      </ul>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        innerComponent={FormAddUser()}
      />
    </>
  );
}
