interface OfficerNavigationProps {
  name: string;
  icon: string;
}
export function OfficerNavigation({ name, icon }: OfficerNavigationProps) {
  return (
    <div className="border-2 flex justify-center items-center shadow-xl rounded-xl">
      <img className="p-4" src={icon} alt={name} />
    </div>
  );
}
