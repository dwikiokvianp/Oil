import { InformationBar } from "../atoms/InformationBar.tsx";

export function HeaderBarToday() {
  return (
    <header className="mx-8 grid sm:grid-cols-3 gap-4">
      <InformationBar />
      <InformationBar />
      <InformationBar />
    </header>
  );
}
