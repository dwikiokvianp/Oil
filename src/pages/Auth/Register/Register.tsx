import { AuthHeader } from "../../../components/molecules/LoginHeader.tsx";
import { useLoginStore } from "../../../store/login.slice.ts";

export default function Register() {
  const isAdmin = useLoginStore((state) => state.isAdmin);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <AuthHeader loginState={`Register ${isAdmin ? "Admin" : "Petugas"}`} />
      </div>
    </>
  );
}
