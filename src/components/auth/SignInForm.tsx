
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Github } from "lucide-react";
import { useSignIn } from "@clerk/clerk-react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, isLoaded: clerkLoaded } = useSignIn();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clerkLoaded) {
      toast({
        title: "Error",
        description: "Authentication service not loaded yet. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      if (result.status === "complete") {
        toast({
          title: "Signed in successfully",
          description: "Welcome back to TecXi!",
        });
        navigate("/dashboard");
      } else {
        // Handle 2FA or other flows if needed
        console.log("Additional authentication steps:", result);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    if (!clerkLoaded) return;
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      console.error("GitHub sign in error:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in with GitHub. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        type="button" 
        disabled={isLoading || !clerkLoaded} 
        className="w-full"
        onClick={handleGitHubSignIn}
      >
        <Github className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button
              variant="link"
              className="px-0 font-normal h-auto"
              size="sm"
              onClick={() => navigate("/reset-password")}
            >
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading || !clerkLoaded}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
