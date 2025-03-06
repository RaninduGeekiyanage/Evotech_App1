
import { FaFilm } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MdDashboard,
  },
  {
    title: "Movie Managment",
    url: "/dashboard/movies",
    icon: FaFilm ,
  },
  {
    title: "Add Movies",
    url: "/dashboard/add-movie",
    icon: FaFileVideo,
  },  
  {
    title: "Movies Client",
    url: "/public-movies",
    icon: BiSolidMoviePlay ,
  },
 
  {
    title: "Users",
    url: "/dashboard/users",
    icon: FaUsers,
  },
  {
    title: "Profile",
    url: "#",
    icon: RiAccountPinCircleFill,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-20 text-lg">Welcome</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-14 hover:bg-slate-300 dark:hover:bg-slate-700">                    
                    <Link href={item.url} className="font-lightl">                    
                      <item.icon  className="text-green-600 dark:text-green-400 "/>
                      <span className="text-slate-800 dark:text-slate-300">{item.title}</span>                    
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
