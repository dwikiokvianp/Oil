import { useNavigate } from "react-router-dom";

interface HeaderOfficerTitleProps {
  title: string;
}
export function HeaderOfficerTitle({ title }: HeaderOfficerTitleProps) {
  const navigate = useNavigate();
  return (
    <header className="flex ">
      <img
        onClick={() => {
          navigate(-1);
        }}
        src="../../../public/arrow_back_ios_new.svg"
        alt=""
      />
      <h1 className="mx-auto font-semibold text-sm">{title}</h1>
    </header>
  );
}
