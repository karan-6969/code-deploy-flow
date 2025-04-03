
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, isLoaded: clerkLoaded } = useSignUp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clerkLoaded || !signUp) {
      toast({
        title: "Error",
        description: "Verification service not loaded yet. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if we actually have a sign up attempt in progress
    if (!signUp.status) {
      toast({
        title: "Error",
        description: "No sign up attempt in progress. Please start the sign up process again.",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      
      if (result.status === "complete") {
        toast({
          title: "Email verified",
          description: "Your account has been created and you are now signed in.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Verification incomplete",
          description: "There are more steps to complete before your account is active.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast({
        title: "Verification failed",
        description: error.errors?.[0]?.message || "Please check the verification code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!clerkLoaded || !signUp) return;
    
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast({
        title: "Code resent",
        description: "We've sent a new verification code to your email address.",
      });
    } catch (error) {
      console.error("Error resending code:", error);
      toast({
        title: "Failed to resend code",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout 
      title="Verify your email"
      subtitle="We've sent a verification code to your email. Enter it below to verify your account."
    >
      <form onSubmit={handleVerification} className="space-y-6">
        <div className="space-y-2">
          <Input 
            placeholder="Verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>
        
        <div className="text-center">
          <Button 
            variant="link" 
            type="button" 
            onClick={handleResendCode}
            disabled={isLoading}
          >
            Didn't receive a code? Click to resend
          </Button>
        </div>
        
        <div className="text-center">
          <Button
            variant="link"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Start over with a different email
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
