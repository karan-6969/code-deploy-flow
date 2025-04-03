
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  type: "signin" | "signup";
}

const AuthLayout = ({ children, title, subtitle, type }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col p-4 md:p-10 justify-center">
        <div className="max-w-md mx-auto w-full">
          <Link to="/" className="flex items-center mb-6">
            <div className="h-8 w-8 bg-gradient-to-br from-brand-600 to-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="ml-2 text-xl font-bold">TecXi</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold tracking-tight mb-2">{title}</h1>
            <p className="text-muted-foreground mb-8">{subtitle}</p>

            {children}

            <div className="mt-6 text-center text-sm">
              {type === "signin" ? (
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-brand-800 via-brand-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
        <div className="relative h-full flex flex-col justify-center p-12 text-white">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Deploy Your Code with Confidence
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                TecXi streamlines your deployment process, letting you focus on what matters most - your code.
              </p>
              
              {/* Code terminal */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 font-mono text-sm">
                <p className="text-green-400">$ tecxi deploy</p>
                <p className="text-blue-300">✓ Deployed to production</p>
                <p className="text-gray-400">Your app is live at:</p>
                <p className="text-white">https://myapp.tecxi.app</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
