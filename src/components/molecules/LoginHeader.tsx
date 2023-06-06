export function AuthHeader({ loginState }: { loginState: string }) {
  return (
    <section className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
        {loginState}
      </h2>
    </section>
  );
}
