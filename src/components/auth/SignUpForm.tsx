
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Github } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock registration - to be replaced with real auth
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Account created",
        description: "Welcome to TecXi! You are now signed in.",
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  const handleGitHubSignUp = () => {
    setIsLoading(true);
    
    // Mock GitHub auth - to be replaced with real OAuth
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Signed up with GitHub",
        description: "Your account has been created successfully!",
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        type="button" 
        disabled={isLoading} 
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
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
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
        
        <Button type="submit" className="w-full" disabled={isLoading}>
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
