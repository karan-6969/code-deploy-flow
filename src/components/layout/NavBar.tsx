
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Menu, 
  X, 
  LogIn, 
  Home, 
  Settings, 
  BarChart3 
} from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // Will connect to auth context later

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { path: "/features", label: "Features", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
    { path: "/pricing", label: "Pricing", icon: <Settings className="mr-2 h-4 w-4" /> },
  ];
  
  const authLinks = isAuthenticated 
    ? [{ path: "/dashboard", label: "Dashboard", icon: <BarChart3 className="mr-2 h-4 w-4" /> }]
    : [
        { path: "/signin", label: "Sign In", icon: <LogIn className="mr-2 h-4 w-4" /> },
        { path: "/signup", label: "Sign Up", icon: null }
      ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-brand-600 to-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-foreground">TecXi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-2 py-1 text-sm rounded-md transition-colors ${
                    isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              {authLinks.map((link, index) => (
                link.label === "Sign Up" ? (
                  <Button key={link.path} asChild variant="default" size="sm">
                    <Link to={link.path}>{link.label}</Link>
                  </Button>
                ) : (
                  <Button key={link.path} asChild variant="ghost" size="sm">
                    <Link to={link.path} className="flex items-center">
                      {link.icon}
                      {link.label}
                    </Link>
                  </Button>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in-right">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-primary/5"
                  }`}
                  onClick={closeMenu}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <div className="border-t my-2"></div>
              {authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-primary/5"
                  }`}
                  onClick={closeMenu}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
