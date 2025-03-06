import SidePanel from "./components/side-panel";
import UserNav from "./components/user-nav";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";


const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <DashboardSidebar /> */}
      <SidebarInset>
        <main className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-6">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-blue-800">Download latest Mflix Movies..</h1>
            </div>           
            
              <div className="flex gap-2 items-center">
                <div>
                  <ThemeToggle />
                </div>
                <div>
                  <UserNav /> 
                </div>
              </div>
            
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
