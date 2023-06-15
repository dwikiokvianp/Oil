import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function EmbeddedLink({
  link,
  fileName,
}: {
  link: string;
  fileName: string;
}) {
  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        <PaperClipIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">
            <a href={link}>{fileName}.png</a>
          </span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <a
          href={link}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Download
        </a>
      </div>
    </li>
  );
}
