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
import { Loader2 } from "lucide-react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";
//import { registerUser } from "@/lib/apis/server";

// import { ToastAction } from "@/components/ui/toast";
import { FaRegThumbsUp } from "react-icons/fa";

import { signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

//functional component
export default function RegisterForm() {
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setIsLoading] = useState(false);
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
    const name = formData.get("name").toString() ?? "";
    const email = formData.get("email").toString() ?? "";
    const password = formData.get("password").toString() ?? "";
    const confirmPassword = formData.get("confirm-password") ?? "";

    // if (name && email && password && confirmPassword) {
    if (password === confirmPassword) {
      setError(DEFAULT_ERROR);
      
      setIsLoading(true);
      const { data, error } = await signUp.email(
        {
          email: email,
          password: password,
          name: name,
          image: undefined,
        },
        {
          onRequest: () => {
            //console log("onRequest", ctx);
          },
          onSuccess: (ctx) => {
            // console.log("onSuccesst", ctx);
            //redirect("/login")
            toast({
              variant: "success",
              title: (
                <div className="flex flex-row">
                  Registration successful..{" "}
                  <span className="pl-2">
                    <FaRegThumbsUp className="text-green-400 h-4 w-4" />
                  </span>
                </div>
              ),
              description: "Plese continue with login",
              
            });
            redirect("/login")
          },
          onError: (ctx) => {
            // console.log("onError", ctx);
            if (ctx) {
              setError({ error: true, message: ctx.error.message });
            }
          },
        }
      );
      setIsLoading(false);
      if (data) {
        console.log("data:", data);
      }
    } else {
      setError({ error: true, message: "Password dosn't match..!" });
      toast.error(message)
    }
    // }
    // console.log("Error!", error);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50/90 w-[350px]">
        <CardHeader>
          <CardTitle className="font-semibold text-xl font-sans text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-xs text-center">
            Enter Your Information to get Start
          </CardDescription>
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
                  // required={true}
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
                  // required={true}
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
                <Link
                  href="/login"
                  className="text-green-600  hover:underline font-semibold"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="flex-1 text-green-400"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
