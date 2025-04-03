
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Boxes, 
  Github, 
  Globe, 
  Home, 
  LogOut, 
  Menu,
  Settings, 
  User, 
  X,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: <Boxes className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Domains",
      href: "/dashboard/domains",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => isMobile && setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar border-r border-border transition-transform duration-300 ease-in-out ${
          isSidebarOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-brand-600 to-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-foreground">TecXi</span>
            </Link>
            {isMobile && (
              <button onClick={toggleSidebar} className="md:hidden">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
                onClick={closeSidebar}
              >
                <span className="mr-3 text-muted-foreground">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            <div className="pt-6">
              <Button 
                variant="default" 
                className="w-full justify-start"
                onClick={closeSidebar}
                asChild
              >
                <Link to="/dashboard/new-project">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Link>
              </Button>
            </div>
          </nav>
          
          {/* User menu */}
          <div className="border-t border-sidebar-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center rounded-md py-2 px-3 text-sm transition-colors hover:bg-sidebar-accent">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">john@example.com</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" className="flex cursor-pointer items-center" onClick={closeSidebar}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="flex cursor-pointer items-center" onClick={closeSidebar}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex cursor-pointer items-center text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="h-16 border-b border-border bg-background">
          <div className="flex h-full items-center justify-between px-4">
            {isMobile && (
              <button onClick={toggleSidebar} className="text-muted-foreground">
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <div className="flex-1" />
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Github className="mr-2 h-4 w-4" />
                Connect Repository
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer md:hidden">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="flex cursor-pointer items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings" className="flex cursor-pointer items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex cursor-pointer items-center text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
