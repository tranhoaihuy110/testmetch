import { SidebarProvider, useSidebar } from "../../context/index";
import { Outlet } from "react-router";
import { AppHeader } from "../app-header/index";
import { Backdrop } from "../Backdrop/index";
import { AppSidebar } from "../app-sidebar/index";

export const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};
