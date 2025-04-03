
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    // You could render a loading spinner here
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
