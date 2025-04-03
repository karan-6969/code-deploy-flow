
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSignUp } from "@clerk/clerk-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/auth/AuthLayout";

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!isLoaded || !signUp) {
    return <div>Loading...</div>;
  }

  // If there's no verification attempt, redirect to signup
  if (signUp.status !== "needs_email_verification") {
    navigate("/signup");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit code sent to your email.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      
      if (result.status === "complete") {
        toast({
          title: "Email verified",
          description: "Your account has been created successfully!",
        });
        navigate("/dashboard");
      } else {
        console.log("Verification result:", result);
        toast({
          title: "Verification incomplete",
          description: "Please complete the additional steps required.",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description: error.errors?.[0]?.message || "Please check the code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error("Error resending code:", error);
      toast({
        title: "Failed to resend code",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the verification code sent to your email"
      type="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={setVerificationCode}
              disabled={isSubmitting}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          <Button 
            type="button" 
            variant="link" 
            className="px-0 text-sm"
            onClick={handleResendCode}
            disabled={isSubmitting}
          >
            Didn't receive a code? Resend
          </Button>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify email"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
