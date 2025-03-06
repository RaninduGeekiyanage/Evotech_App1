"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { IoMdLogOut, IoIosSettings } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// connect the user session from useSession
export default function UserNav() {
  const { data: session } = useSession();
  //console.log(session);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-blue-500">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56  bg-slate-200 dark:bg-neutral-900 text-gray-800 dark:text-gray-400"  align="end" forceMount>
        <DropdownMenuLabel className="font-light">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-primary-400">
              {session?.user.name}
            </p>
            <p className="text-xs font-medium leading-none text-primary-400 pt-1">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="pt-2">
          <DropdownMenuItem>
            <FaRegUserCircle className="mr-2 h-4 w-4 text-primary-400" />
            <span>Profile</span>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>

        <DropdownMenuItem onClick={handleLogout}>
          <IoMdLogOut className="mr-2 h-4 w-4 text-primary-400" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
