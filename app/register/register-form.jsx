"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

//functional component
export default function RegisterForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [name, setName] = useState("");
  const [error, setError] = useState(DEFAULT_ERROR);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmitForm = async (event) => {
    event?.preventDefault();

    const formData = new FormData(event?.currentTarget);
    const name = formData.get("name") ?? "";
    const email = formData.get("email") ?? "";
    const password = formData.get("password") ?? "";
    const confirmPassword = formData.get("confirm-password") ?? "";

    // console.log("submitted!", { name, email, password, confirmPassword });

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setError(DEFAULT_ERROR);
      } else {
        setError({ error: true, message: "Password dosn't match..!" });
      }
    }
    console.log("Error!", error);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50/90 w-[350px]">
        <CardHeader>
          <CardTitle className="font-semibold text-xl font-sans">
            Create an Account
          </CardTitle>
          <CardDescription>Enter Your Information to get Start</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitForm} className="font-sans">
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-sm font-normal">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required={true}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-sm font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  required={true}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-sm font-normal">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                    required={true}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-2 flex items-center"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-4 w-4 text-orange-500" />
                    ) : (
                      <LuEye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-normal"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    // value={confirmPassword}
                    // onChange={(event) => setConfirmPassword(event.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    className="pr-10"
                    required={true}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-2 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <LuEyeOff className="h-4 w-4 text-orange-500" />
                    ) : (
                      <LuEye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* form errors */}

              <div className="flex justify-center">
                {error.error && (
                  <span className="text-orange-500 text-xs text-center blink">
                    {error.message}
                  </span>
                )}
              </div>

              <div className="flex justify-center gap-1 text-xs">
                Alredy Have an Account?{" "}
                <Link href="/login" className="text-blue-600  hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="flex-1" type="submit">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
