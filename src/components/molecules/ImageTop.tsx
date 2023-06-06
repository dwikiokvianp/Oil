import { CustomImage } from "../atoms/CustomImage.tsx";

export function ImageTop() {
  const imageUrl =
    "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600";
  const altText = "Your Company";
  return (
    <div className="flex flex-shrink-0 items-center">
      <CustomImage
        className={"block h-8 w-auto "}
        src={imageUrl}
        alt={altText}
      />
    </div>
  );
}
