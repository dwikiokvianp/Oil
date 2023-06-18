import { useNavigate } from "react-router-dom";

interface OfficerNavigationProps {
  name: string;
  icon: string;
  navigate: string;
}
export function OfficerNavigation({
  name,
  icon,
  navigate,
}: OfficerNavigationProps) {
  const navigateTo = useNavigate();
  return (
    <div
      onClick={() => {
        console.log(navigate);
        navigateTo(navigate);
      }}
      className="border-2 flex justify-center items-center shadow-xl rounded-xl"
    >
      <img className="p-4" src={icon} alt={name} />
    </div>
  );
}
