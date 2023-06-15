import { AiOutlinePlus } from "react-icons/ai";

export function AddPhoto({
  title,
  setOpen,
}: {
  title: string;
  setOpen: (value: boolean) => void;
}) {
  return (
    <div>
      <h1 className="font-Montserrat">{title}</h1>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="border-dotted border-2 flex justify-center items-center rounded w-[15vh] hover:scale-105 hover:duration-100 mt-4"
      >
        <AiOutlinePlus className="text-7xl text-[#B2B2B2] p-4" />
      </div>
    </div>
  );
}
