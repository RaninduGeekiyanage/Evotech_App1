import TopBackground from "@/components/TopBackground";
import LoginForm from "./login-form";
import Image from "next/image";
<link
  href="https://fonts.googleapis.com/css2?family=Chewy&display=swap"
  rel="stylesheet"
/>;

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen text-black bg-slate-900 bg-[url('/back.png')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black opacity-85"></div>{" "}
      {/* Overlay for opacity */}
      <div className="relative z-10">
        <Image
          src="/z_top_gradient-01-01.svg"
          alt="top dark mode background highlight"
          width={809}
          height={877}
          className="absolute top-[-100px] hidden dark:md:block left-1/2 -translate-x-1/2"
        />

        <div>
          <p
            className="text-2xl lg:text-4xl md:text-4xl mt-20 text-center text-rose-700"
            style={{ fontFamily: "Chewy, cursive" }}
          >
            Download Latest High-Quality Movies
          </p>
          <p
            className="text-2xl lg:text-4xl md:text-4xl mt-4 pb-10  text-center text-rose-700"
            style={{ fontFamily: "Chewy, cursive" }}
          >
            M-Flix
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
