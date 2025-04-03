
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Github } from "lucide-react";
import { useSignUp } from "@clerk/clerk-react";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, isLoaded: clerkLoaded } = useSignUp();

  const handleSignUp = async (e: React.FormEvent) => {
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
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });
      
      if (result.status === "complete") {
        toast({
          title: "Account created",
          description: "Welcome to TecXi! You are now signed in.",
        });
        navigate("/dashboard");
      } else {
        // Check if email verification is needed
        if (result.status === "missing_requirements" || result.status === "abandoned") {
          toast({
            title: "Additional steps required",
            description: "Please complete all requirements to finish signup.",
          });
        } else {
          // Start the email verification process
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
          
          toast({
            title: "Verification needed",
            description: "We've sent a verification code to your email address.",
          });
          
          // Navigate to verification page
          navigate("/verify-email");
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Sign up failed",
        description: error.errors?.[0]?.message || "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignUp = async () => {
    if (!clerkLoaded) return;
    
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      console.error("GitHub sign up error:", error);
      toast({
        title: "Sign up failed",
        description: "Could not sign up with GitHub. Please try again.",
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
        onClick={handleGitHubSignUp}
      >
        <Github className="mr-2 h-4 w-4" />
        Sign up with GitHub
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
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading || !clerkLoaded}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      
      <p className="text-xs text-muted-foreground text-center">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{" "}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default SignUpForm;
