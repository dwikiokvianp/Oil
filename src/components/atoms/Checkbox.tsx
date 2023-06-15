export function Checkbox({
  label,
  checked,
  setChecked,
}: {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center">
      <input
        id="link-checkbox"
        type="checkbox"
        required={true}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label
        htmlFor="link-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
    </div>
  );
}
