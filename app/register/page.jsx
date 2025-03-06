import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RegisterForm from "./register-form";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard ");
  }

  return (
    // <div className="flex flex-col justify-center items-center min-h-screen text-black">
    <div className="mx-auto bg-neutral-900">
      {/* <RegisterPage />; */}
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
