export default function InputGroup({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  return (
    <>
      <div className="grid grid-cols-2 m-2 items-center rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label
          htmlFor="name"
          className=" text-start text-xs font-bold text-gray-900"
        >
          {name}
        </label>
        <input
          type="text"
          name={name}
          id={name}
          className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Jane Smith"
          value={value}
          disabled={true}
        />
      </div>
    </>
  );
}
